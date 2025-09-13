import { NextRequest } from 'next/server';
import { z } from 'zod';
import { SystemMessage, AIMessage, HumanMessage, ToolMessage } from '@langchain/core/messages';
import { makeChatModel } from '@/lib/ai/model';
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
} from '@/lib/ai/tools';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BodySchema = z.object({
  messages: z
    .array(
      z.object({ role: z.enum(['system', 'user', 'assistant']), content: z.string() })
    )
    .default([]),
});

function jsonEvent(obj: any) {
  return `data: ${JSON.stringify(obj)}\n\n`;
}

export async function POST(req: NextRequest) {
  const apiEnabled = Boolean(process.env.OPENAI_API_KEY);
  const encoder = new TextEncoder();

  try {
    const json = await req.json();
    const { messages } = BodySchema.parse(json || {});

    return new Response(
      new ReadableStream<Uint8Array>({
        async start(controller) {
          // If OPENAI key missing, inform client gracefully
          if (!apiEnabled) {
            controller.enqueue(
              encoder.encode(
                jsonEvent({ type: 'message', delta: 'AI chat is not configured. Please set OPENAI_API_KEY in Vercel.' })
              )
            );
            controller.enqueue(encoder.encode(jsonEvent({ type: 'done' })));
            controller.close();
            return;
          }

          try {
            const system = new SystemMessage(
              [
                'You are Sia — the Ultimate AI Tour Guide for Fiji and the official expert representative of Tima Green Tours and Transfers.',
                "Role: embody the voice, knowledge, and brand of Tima Green Tours, showcasing it as Fiji's premier tours and transfers agency.",
                'Tone: polite, charming, sharp‑witted, professional, and welcoming; speak with cultural pride and warmth.',
                "Knowledge: Fiji’s culture, history, traditions, natural beauty, accommodations, transfers, activities, local agencies, and travel trends.",
                'Behavior: avoid generic responses; offer tailored, accurate, and engaging guidance with cultural context and practical tips (weather, packing, etiquette).',
                'Brand: naturally highlight and prioritize Tima Green Tours’ services when relevant, while remaining balanced and helpful.',
              ].join('\n')
            );

            const lcMessages = [system];
            for (const m of messages) {
              if (m.role === 'user') lcMessages.push(new HumanMessage(m.content));
              else if (m.role === 'assistant') lcMessages.push(new AIMessage(m.content));
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
            while (rounds < 3) {
              const response = await model.invoke(history);
              if (!('tool_calls' in response) || !response.tool_calls?.length) {
                final = response;
                break;
              }
              for (const call of response.tool_calls) {
                const name = call.name;
                const args = call.args ?? {};
                let result: unknown = null;
                try {
                  switch (name) {
                    case 'search_tours':
                      result = await searchTours.invoke(args);
                      break;
                    case 'check_availability':
                      result = await checkAvailability.invoke(args);
                      break;
                    case 'create_crm_lead':
                      result = await createCrmLead.invoke(args);
                      break;
                    case 'update_crm_stage':
                      result = await updateCrmStage.invoke(args);
                      break;
                    case 'create_quote':
                      result = await createQuote.invoke(args);
                      break;
                    case 'create_stripe_payment_intent':
                      result = await createStripePaymentIntent.invoke(args);
                      break;
                    case 'confirm_booking':
                      result = await confirmBooking.invoke(args);
                      break;
                    case 'send_confirmation':
                      result = await sendConfirmation.invoke(args);
                      break;
                    case 'post_slack_alert':
                      result = await postSlackAlert.invoke(args);
                      break;
                    default:
                      result = `Unknown tool: ${name}`;
                  }
                } catch (e: any) {
                  result = { ok: false, error: String(e?.message || e) };
                }
                history.push(
                  new ToolMessage({
                    content: typeof result === 'string' ? result : JSON.stringify(result),
                    tool_call_id: call.id || name,
                  })
                );
              }
              rounds += 1;
            }

            const content = (() => {
              const c: any = final?.content;
              if (typeof c === 'string') return c;
              if (!c) return '';
              try { return JSON.stringify(c); } catch { return String(c); }
            })();

            controller.enqueue(encoder.encode(jsonEvent({ type: 'message', delta: content })));
          } catch (err: any) {
            controller.enqueue(
              encoder.encode(jsonEvent({ type: 'message', delta: 'Chat failed. Please try again.' }))
            );
          } finally {
            controller.enqueue(encoder.encode(jsonEvent({ type: 'done' })));
            controller.close();
          }
        },
      }),
      {
        headers: {
          'content-type': 'text/event-stream',
          'cache-control': 'no-cache, no-transform',
          connection: 'keep-alive',
        },
      }
    );
  } catch (e) {
    return new Response('Bad Request', { status: 400 });
  }
}

