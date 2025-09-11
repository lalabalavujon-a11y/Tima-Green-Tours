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

export async function POST(req: NextRequest) {
  const apiEnabled = Boolean(process.env.OPENAI_API_KEY);

  try {
    const json = await req.json();
    const { messages } = BodySchema.parse(json || {});

    // Fallback: if OPENAI_API_KEY is missing, return a helpful message
    if (!apiEnabled) {
      return new Response(
        JSON.stringify({
          ok: false,
          message:
            "AI chat is not configured. Please set OPENAI_API_KEY, LANGCHAIN_TRACING_V2=true and LANGCHAIN_API_KEY in your environment.",
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
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

    // Simple tool-call loop (max 3 rounds)
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

      // Execute tool calls sequentially
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

    const messageContent = (() => {
      const c: any = final?.content;
      if (typeof c === 'string') return c;
      if (!c) return "";
      try {
        return JSON.stringify(c);
      } catch {
        return String(c);
      }
    })();

    const payload = {
      ok: true,
      message: messageContent,
    };

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    console.error("/api/chat error", err);
    return new Response(
      JSON.stringify({ ok: false, message: "Failed to process chat request" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
