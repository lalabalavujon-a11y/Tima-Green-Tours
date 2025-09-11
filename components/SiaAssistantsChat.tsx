"use client";
import { useEffect, useRef, useState } from "react";
import { SuggestedTours, AvailabilityLink, Suggestion as CommonSuggestion, StartersRow, DEFAULT_STARTERS } from "@/components/SiaCommon";

type Msg = { role: "user" | "assistant"; content: string };
type Suggestion = CommonSuggestion;

const STARTERS = DEFAULT_STARTERS;

export default function SiaAssistantsChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{
    role: "assistant",
    content: "Bula! I’m Sia — your Fiji tour expert at Tima Green Tours. How can I help plan your perfect island escape?",
  }]);
  const [suggestions, setSuggestions] = useState<Suggestion[] | null>(null);
  const [calendarEmbedUrl, setCalendarEmbedUrl] = useState<string | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const assistantId = process.env.NEXT_PUBLIC_TGT_ASSISTANT_ID || "";
  const threadKey = "tgt_sia_thread_id";
  const [threadId, setThreadId] = useState<string | null>(null);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem(threadKey) : null;
    if (saved) setThreadId(saved);
  }, []);

  useEffect(() => {
    if (!open) return;
    const el = scrollerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  async function send(content?: string) {
    const text = (content ?? input).trim();
    if (!text || !assistantId) return;
    setInput("");
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setSuggestions(null);
    setCalendarEmbedUrl(null);
    setBusy(true);
    try {
      const res = await fetch("/api/tgt/assistants/chat/stream", {
        method: "POST",
        headers: { "content-type": "application/json", accept: "text/event-stream" },
        body: JSON.stringify({ assistantId, message: text, threadId: threadId || undefined }),
      });
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      // Start an empty assistant message to progressively fill
      setMessages((m) => [...m, { role: "assistant", content: "" }]);
      let buffer = "";
      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let idx;
        while ((idx = buffer.indexOf("\n\n")) !== -1) {
          const raw = buffer.slice(0, idx).trim();
          buffer = buffer.slice(idx + 2);
          if (!raw.startsWith("data:")) continue;
          const jsonStr = raw.slice(5).trim();
          if (!jsonStr) continue;
          try {
            const evt = JSON.parse(jsonStr);
            if (evt.type === "thread" && evt.threadId) {
              if (!threadId) {
                setThreadId(evt.threadId);
                try { window.localStorage.setItem(threadKey, evt.threadId); } catch {}
              }
            } else if (evt.type === "message") {
              const delta = String(evt.delta || "");
              setMessages((m) => {
                const copy = [...m];
                const last = copy[copy.length - 1];
                if (last && last.role === "assistant") last.content += delta;
                return copy;
              });
            } else if (evt.type === "suggestions" && Array.isArray(evt.items)) {
              setSuggestions(evt.items as Suggestion[]);
            } else if (evt.type === "calendar" && evt.embedUrl) {
              setCalendarEmbedUrl(String(evt.embedUrl));
            } else if (evt.type === "done") {
              // Finished
            }
          } catch {
            // ignore
          }
        }
      }
    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "I hit a snag reaching the assistant. Please try again." },
      ]);
    } finally {
      setBusy(false);
    }
  }

  function checkNextWeek() {
    const now = new Date();
    const start = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const end = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000);
    const prompt = `Can you check availability between ${start.toISOString()} and ${end.toISOString()}?`;
    void send(prompt);
  }

  function resetThread() {
    setThreadId(null);
    try { window.localStorage.removeItem(threadKey); } catch {}
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed right-6 md:bottom-6 bottom-24 z-50 rounded-full shadow-lg text-white w-14 h-14 flex items-center justify-center"
        style={{ backgroundColor: '#00ee5e' }}
        aria-label="Open Sia chat (Assistants)"
      >
        <span className="font-semibold">S</span>
      </button>

      {open && (
        <div className="fixed right-6 md:bottom-24 bottom-40 z-50 w-[92vw] max-w-md h-[70vh] rounded-xl border border-gray-200 bg-white shadow-xl flex flex-col">
          <div className="px-4 py-3 border-b text-white rounded-t-xl flex items-center justify-between" style={{ background: 'linear-gradient(90deg, #00ee5e, #007707)' }}>
            <div>
              <div className="text-base font-semibold">Sia — Booking Concierge (Assistants)</div>
              <div className="text-xs opacity-90">Uses OpenAI Assistants + tools</div>
            </div>
            <div className="flex items-center gap-2">
              {threadId && (
                <button onClick={resetThread} className="rounded-md bg-white/10 hover:bg-white/20 px-2 py-1 text-xs">New chat</button>
              )}
              <button onClick={() => setOpen(false)} className="rounded-md bg-white/10 hover:bg-white/20 px-2 py-1 text-sm" aria-label="Close">✕</button>
            </div>
          </div>

          <div ref={scrollerRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                <div className={'inline-block max-w-[85%] rounded-lg px-3 py-2 text-sm ' + (m.role === 'user' ? 'text-white' : 'bg-white border')} style={m.role === 'user' ? { backgroundColor: '#007707' } : undefined}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          <StartersRow starters={STARTERS} onSend={(m) => void send(m)} disabled={busy} showCheckNextWeek />

          {suggestions && suggestions.length > 0 && (<SuggestedTours items={suggestions} />)}
          {calendarEmbedUrl && (<AvailabilityLink embedUrl={calendarEmbedUrl} />)}

          <form onSubmit={(e) => { e.preventDefault(); void send(); }} className="p-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={!assistantId ? 'Set NEXT_PUBLIC_TGT_ASSISTANT_ID' : (busy ? 'Sia is thinking…' : 'Ask Sia anything')}
              disabled={busy || !assistantId}
              className="flex-1 border rounded-md px-3 py-2 text-sm"
            />
            <button type="submit" disabled={busy || !assistantId} className="rounded-md px-4 py-2 text-sm text-white" style={{ backgroundColor: '#00ee5e' }}>Send</button>
          </form>
        </div>
      )}
    </>
  );
}
