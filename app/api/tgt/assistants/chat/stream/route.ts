import OpenAI from "openai";
import { NextRequest } from "next/server";
import { z } from "zod";

import {
  searchTours,
  checkAvailability,
  createQuote,
  createStripePaymentIntent,
  confirmBooking,
  createCrmLead,
  updateCrmStage,
  sendConfirmation,
  postSlackAlert,
  runPostBooking,
} from "@/lib/ai/tools";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

function getClient() {
  const apiKey = process.env.TGT_OPENAI_API_KEY || process.env.OPENAI_API_KEY || "";
  return new OpenAI({ apiKey });
}

const BodySchema = z.object({
  assistantId: z.string(),
  message: z.string().min(1),
  threadId: z.string().optional(),
});

type ToolImpl = (args: any) => Promise<any>;

const toolMap: Record<string, ToolImpl> = {
  search_tours: async (args) => searchTours.invoke(args),
  check_availability: async (args) => checkAvailability.invoke(args),
  create_quote: async (args) => createQuote.invoke(args),
  create_stripe_payment_intent: async (args) => createStripePaymentIntent.invoke(args),
  confirm_booking: async (args) => confirmBooking.invoke(args),
  create_crm_lead: async (args) => createCrmLead.invoke(args),
  update_crm_stage: async (args) => updateCrmStage.invoke(args),
  send_confirmation: async (args) => sendConfirmation.invoke(args),
  post_slack_alert: async (args) => postSlackAlert.invoke(args),
  run_post_booking: async (args) => runPostBooking.invoke(args),
};

function sse(data: unknown) {
  return `data: ${JSON.stringify(data)}\n\n`;
}

function extractDeltaText(evt: any): string {
  try {
    const delta = evt?.delta || evt?.data?.delta || evt?.data;
    const content = delta?.content || [];
    let text = "";
    for (const c of content) {
      // Handle various shapes: output_text, output_text.delta, text
      if (c?.type?.includes("text") && typeof c?.text?.value === "string") {
        text += c.text.value;
      } else if (typeof c?.["value"] === "string") {
        text += c.value;
      } else if (typeof c === "string") {
        text += c;
      }
    }
    return text;
  } catch {
    return "";
  }
}

export async function POST(req: NextRequest) {
  const stream = new ReadableStream<Uint8Array>({
    start: async (controller) => {
      const encoder = new TextEncoder();
      const send = (obj: any) => controller.enqueue(encoder.encode(sse(obj)));
      try {
        if (!process.env.TGT_OPENAI_API_KEY && !process.env.OPENAI_API_KEY) {
          send({ type: "message", delta: "Assistants API not configured: missing TGT_OPENAI_API_KEY" });
          send({ type: "done" });
          controller.close();
          return;
        }

        const body = BodySchema.parse(await req.json());
        const { assistantId, message } = body;
        const client = getClient();
        const thread = body.threadId
          ? { id: body.threadId }
          : await client.beta.threads.create({ messages: [] });

        // Expose thread id early so client can persist it
        send({ type: "thread", threadId: thread.id });

        await client.beta.threads.messages.create(thread.id, {
          role: "user",
          content: message,
        });

        // Keep a bit of state for surfacing nice UI hints
        let lastSearchResult: any = null;
        let lastCalendar: any = null;

        const runStream: any = await (client as any).beta.threads.runs.createAndStream(thread.id, {
          assistant_id: assistantId,
        });

        // Text deltas
        runStream.on?.("message.delta", (evt: any) => {
          const delta = extractDeltaText(evt);
          if (delta) send({ type: "message", delta });
        });

        // Tool calls required
        runStream.on?.("requires_action", async (evt: any) => {
          try {
            const toolCalls = evt?.required_action?.submit_tool_outputs?.tool_calls || [];
            const outputs = await Promise.all(
              toolCalls.map(async (call: any) => {
                const name = call?.function?.name;
                const impl = toolMap[name];
                let args: any = {};
                try {
                  args = call?.function?.arguments ? JSON.parse(call.function.arguments) : {};
                } catch (e: any) {
                  const out = { ok: false, error: `Invalid JSON args for ${name}: ${String(e?.message || e)}` };
                  return { tool_call_id: call.id, output: JSON.stringify(out) };
                }
                try {
                  const result = impl ? await impl(args) : { ok: false, error: "tool_not_found" };
                  const output = typeof result === "string" ? result : JSON.stringify(result);

                  // Capture hints for the UI
                  if (name === "search_tours") {
                    try { lastSearchResult = JSON.parse(String(output)); } catch { lastSearchResult = null; }
                  }
                  if (name === "check_availability") {
                    try { lastCalendar = JSON.parse(String(output)); } catch { lastCalendar = null; }
                  }

                  return { tool_call_id: call.id, output };
                } catch (e: any) {
                  const out = { ok: false, error: String(e?.message || e) };
                  return { tool_call_id: call.id, output: JSON.stringify(out) };
                }
              })
            );

            await runStream.submitToolOutputs(outputs);

            // Send UI hints as soon as we have them
            if (Array.isArray(lastSearchResult) && lastSearchResult.length) {
              send({ type: "suggestions", items: lastSearchResult.slice(0, 3) });
            }
            if (lastCalendar?.embedUrl) {
              send({ type: "calendar", embedUrl: lastCalendar.embedUrl });
            }
          } catch (e) {
            // If tool submit fails, we still end the stream gracefully
          }
        });

        runStream.on?.("error", (e: any) => {
          send({ type: "message", delta: "Sorry — something went wrong." });
        });

        runStream.on?.("end", () => {
          send({ type: "done" });
          controller.close();
        });
      } catch (e: any) {
        const msg = e?.message || String(e);
        controller.enqueue(new TextEncoder().encode(sse({ type: "message", delta: msg })));
        controller.enqueue(new TextEncoder().encode(sse({ type: "done" })));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
