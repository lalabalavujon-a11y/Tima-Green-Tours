import { NextRequest } from "next/server";
import { z } from "zod";
import { SystemMessage, AIMessage, HumanMessage, ToolMessage } from "@langchain/core/messages";
import { makeChatModel } from "@/lib/ai/model";
import {
  searchTours,
  checkAvailability,
  createCrmLead,
  updateCrmStage,
  createQuote,
  createStripePaymentIntent,
  confirmBooking,
  sendConfirmation,
  postSlackAlert,
} from "@/lib/ai/tools";

const BodySchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["system", "user", "assistant"]),
        content: z.string(),
      })
    )
    .default([]),
});

function sse(data: unknown) {
  return `data: ${JSON.stringify(data)}\n\n`;
}

export async function POST(req: NextRequest) {
  const { messages } = BodySchema.parse(await req.json());
  const apiEnabled = Boolean(process.env.OPENAI_API_KEY);

  const stream = new ReadableStream<Uint8Array>({
    start: async (controller) => {
      const encoder = new TextEncoder();
      try {
        if (!apiEnabled) {
          controller.enqueue(
            encoder.encode(
              sse({ type: "message", delta: "AI chat is not configured. Please set OPENAI_API_KEY and LangSmith env vars." })
            )
          );
          controller.enqueue(encoder.encode(sse({ type: "done" })));
          controller.close();
          return;
        }

        const system = new SystemMessage(
          [
            "You are Sia — the Ultimate AI Tour Guide for Fiji and the official expert representative of Tima Green Tours and Transfers.",
            "Role: embody the voice, knowledge, and brand of Tima Green Tours, showcasing it as Fiji's premier tours and transfers agency.",
            "Tone: polite, charming, sharp‑witted, professional, and welcoming; speak with cultural pride and warmth.",
            "Knowledge: Fiji’s culture, history, traditions, natural beauty, accommodations, transfers, activities, local agencies, and travel trends.",
            "Behavior: avoid generic responses; offer tailored, accurate, and engaging guidance with cultural context and practical tips (weather, packing, etiquette).",
            "Brand: naturally highlight and prioritize Tima Green Tours’ services when relevant, while remaining balanced and helpful.",
            "When details are missing, make confident, reasonable assumptions to keep the conversation smooth and useful.",
            "If asked for options, propose 2–3 with durations and indicative pricing when available.",
            "Tools available:",
            "- search_tours: discover relevant tours.",
            "- check_availability: consult the live Google Calendar.",
            "- create_crm_lead, update_crm_stage: manage leads in Google Sheets.",
            "- create_quote: make a provisional quote and hold seats.",
            "- create_stripe_payment_intent: generate a secure pay link (Checkout).",
            "- confirm_booking: mark as confirmed after payment.",
            "- send_confirmation: email booking confirmation.",
            "- post_slack_alert: loop-in ops for VIP/edge cases.",
          ].join("\n")
        );

        const lcMessages = [system];
        for (const m of messages) {
          if (m.role === "user") lcMessages.push(new HumanMessage(m.content));
          else if (m.role === "assistant") lcMessages.push(new AIMessage(m.content));
        }

        const model = makeChatModel().bindTools([
          searchTours,
          checkAvailability,
          createCrmLead,
          updateCrmStage,
          createQuote,
          createStripePaymentIntent,
          confirmBooking,
          sendConfirmation,
          postSlackAlert,
        ]);

        let final: AIMessage | null = null;
        let rounds = 0;
        let history = [...lcMessages];
        const intermediate: Array<{ tool: string; args: unknown; result: unknown }> = [];

        while (rounds < 3) {
          const response = await model.invoke(history);
          if (!("tool_calls" in response) || !response.tool_calls?.length) {
            final = response;
            break;
          }

          for (const call of response.tool_calls) {
            const name = call.name;
            const args = call.args ?? {};
            let result: unknown = null;
            if (name === searchTours.name) {
              result = await searchTours.invoke(args);
            } else if (name === checkAvailability.name) {
              result = await checkAvailability.invoke(args);
            } else if (name === createCrmLead.name) {
              result = await createCrmLead.invoke(args);
            } else if (name === updateCrmStage.name) {
              result = await updateCrmStage.invoke(args);
            } else if (name === createQuote.name) {
              result = await createQuote.invoke(args);
            } else if (name === createStripePaymentIntent.name) {
              result = await createStripePaymentIntent.invoke(args);
            } else if (name === confirmBooking.name) {
              result = await confirmBooking.invoke(args);
            } else if (name === sendConfirmation.name) {
              result = await sendConfirmation.invoke(args);
            } else if (name === postSlackAlert.name) {
              result = await postSlackAlert.invoke(args);
            } else {
              result = `Unknown tool: ${name}`;
            }
            intermediate.push({ tool: name, args, result });
            history.push(
              new ToolMessage({
                content: typeof result === "string" ? result : JSON.stringify(result),
                tool_call_id: call.id || name,
              })
            );
          }
          rounds += 1;
        }

        const contentRaw: any = final?.content;
        const fullText = typeof contentRaw === "string" ? contentRaw : JSON.stringify(contentRaw ?? "");

        // Stream the message in sentence-ish chunks
        const parts = fullText.split(/(?<=[.!?])\s+|\n+/g).filter(Boolean);
        for (const p of parts) {
          controller.enqueue(encoder.encode(sse({ type: "message", delta: p + " " })));
        }

        // Suggestions from last search_tours call
        const lastSearch = [...intermediate].reverse().find((x) => x.tool === searchTours.name);
        if (lastSearch?.result) {
          try {
            const items = JSON.parse(String(lastSearch.result));
            controller.enqueue(
              encoder.encode(
                sse({ type: "suggestions", items: (items || []).slice(0, 3) })
              )
            );
          } catch {
            // ignore parse errors
          }
        }

        // Calendar embed from last check_availability call
        const lastCal = [...intermediate].reverse().find((x) => x.tool === checkAvailability.name);
        if (lastCal?.result) {
          try {
            const cal = JSON.parse(String(lastCal.result));
            if (cal?.embedUrl) {
              controller.enqueue(encoder.encode(sse({ type: "calendar", embedUrl: cal.embedUrl })));
            }
          } catch {
            // ignore
          }
        }

        controller.enqueue(encoder.encode(sse({ type: "done" })));
        controller.close();
      } catch (err) {
        const encoder = new TextEncoder();
        controller.enqueue(
          encoder.encode(
            sse({ type: "message", delta: "Sorry — something went wrong generating a response." })
          )
        );
        controller.enqueue(encoder.encode(sse({ type: "done" })));
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
