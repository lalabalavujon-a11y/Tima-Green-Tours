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
export const maxDuration = 60; // seconds (Vercel serverless limit override)
export const dynamic = "force-dynamic";

const BodySchema = z.object({
  assistantId: z.string(),
  message: z.string().min(1),
  threadId: z.string().optional(),
});

type ToolImpl = (args: any) => Promise<any>;

const toolMap: Record<string, ToolImpl> = {
  // Names must match those configured on the Assistant
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

export async function POST(req: NextRequest) {
  if (!process.env.TGT_OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({ ok: false, message: "Assistants API not configured: missing TGT_OPENAI_API_KEY" }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }

  try {
    const client = new OpenAI({ apiKey: process.env.TGT_OPENAI_API_KEY! });
    const body = BodySchema.parse(await req.json());
    const { assistantId, message } = body;
    const thread = body.threadId
      ? { id: body.threadId }
      : await client.beta.threads.create({ messages: [] });

    await client.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message,
    });

    let run = await client.beta.threads.runs.create(thread.id, { assistant_id: assistantId });

    const deadline = Date.now() + 55_000; // stay under maxDuration
    while (Date.now() < deadline) {
      run = await client.beta.threads.runs.retrieve(thread.id, run.id);

      if (run.status === "requires_action" && run.required_action?.submit_tool_outputs) {
        const toolCalls = run.required_action.submit_tool_outputs.tool_calls || [];
        const outputs = await Promise.all(
          toolCalls.map(async (call) => {
            const name = call.function.name;
            const impl = toolMap[name];
            let args: any = {};
            try {
              args = call.function.arguments ? JSON.parse(call.function.arguments) : {};
            } catch (e: any) {
              // If JSON parse fails, return error to the assistant
              const out = { ok: false, error: `Invalid JSON args for ${name}: ${String(e?.message || e)}` };
              return { tool_call_id: call.id, output: JSON.stringify(out) };
            }

            try {
              const result = impl ? await impl(args) : { ok: false, error: "tool_not_found" };
              const output = typeof result === "string" ? result : JSON.stringify(result);
              return { tool_call_id: call.id, output };
            } catch (e: any) {
              const out = { ok: false, error: String(e?.message || e) };
              return { tool_call_id: call.id, output: JSON.stringify(out) };
            }
          })
        );

        await client.beta.threads.runs.submitToolOutputs(thread.id, run.id, { tool_outputs: outputs });
      } else if (run.status === "completed") {
        const msgs = await client.beta.threads.messages.list(thread.id, { order: "desc", limit: 1 });
        const first = msgs.data[0];
        let reply = "[No text]";
        if (first && first.content && first.content[0] && (first.content[0] as any).type === "text") {
          reply = (first.content[0] as any).text?.value || "";
        }
        return new Response(
          JSON.stringify({ ok: true, threadId: thread.id, reply }),
          { status: 200, headers: { "content-type": "application/json" } }
        );
      } else if (["failed", "cancelled", "expired"].includes(run.status as string)) {
        return new Response(JSON.stringify(run), {
          status: 500,
          headers: { "content-type": "application/json" },
        });
      }

      await new Promise((r) => setTimeout(r, 800));
    }

    // Timed out but still running
    return new Response(
      JSON.stringify({ ok: false, message: "Run still in progress", threadId: thread.id, runId: run.id, status: run.status }),
      { status: 202, headers: { "content-type": "application/json" } }
    );
  } catch (e: any) {
    return new Response(
      JSON.stringify({ ok: false, error: e?.message || String(e) }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}

