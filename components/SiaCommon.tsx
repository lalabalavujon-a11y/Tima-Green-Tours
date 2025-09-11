"use client";
import React from "react";

export type Suggestion = {
  slug: string;
  name: string;
  priceFromFJD?: number;
  paymentLinks?: { adult?: string; child?: string };
};

export const DEFAULT_STARTERS = [
  "Tell me about the best tours in Fiji?",
  "Which transfer options are available with Tima Green Tours?",
  "What’s a hidden gem in Fiji most tourists miss?",
  "What are future travel trends for Fiji?",
];

export function StartersRow({
  starters,
  onSend,
  disabled,
  showCheckNextWeek,
}: {
  starters: string[];
  onSend: (message: string) => void | Promise<void>;
  disabled?: boolean;
  showCheckNextWeek?: boolean;
}) {
  function checkNextWeek() {
    const now = new Date();
    const start = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const end = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000);
    const prompt = `Can you check availability between ${start.toISOString()} and ${end.toISOString()}?`;
    void onSend(prompt);
  }

  return (
    <div className="px-3 pt-3 flex flex-wrap gap-2">
      {starters.map((s) => (
        <button
          key={s}
          onClick={() => onSend(s)}
          disabled={disabled}
          className="text-xs bg-gray-100 hover:bg-gray-200 disabled:opacity-60 rounded-full px-3 py-1"
        >
          {s}
        </button>
      ))}
      {showCheckNextWeek && (
        <button
          onClick={checkNextWeek}
          disabled={disabled}
          className="text-xs bg-emerald-100 hover:bg-emerald-200 disabled:opacity-60 rounded-full px-3 py-1"
        >
          Check availability (next week)
        </button>
      )}
    </div>
  );
}

export function SuggestedTours({ items }: { items: Suggestion[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="px-3 pt-2 pb-1">
      <div className="text-xs text-gray-500 mb-1">Suggested tours</div>
      <div className="flex flex-col gap-2">
        {items.map((s) => (
          <div key={s.slug} className="rounded-lg border bg-white p-3">
            <div className="text-sm font-semibold">{s.name}</div>
            {typeof s.priceFromFJD === 'number' && s.priceFromFJD > 0 && (
              <div className="text-xs text-gray-600">From FJD {s.priceFromFJD}</div>
            )}
            <div className="mt-2 flex gap-2">
              {s.paymentLinks?.adult && (
                <a
                  href={s.paymentLinks.adult}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white rounded-md px-3 py-1"
                  style={{ backgroundColor: '#00ee5e' }}
                >Book now</a>
              )}
              <a
                href={`/tours/${s.slug}`}
                className="text-xs border border-gray-300 hover:bg-gray-50 rounded-md px-3 py-1"
              >View details</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AvailabilityLink({ embedUrl }: { embedUrl: string }) {
  if (!embedUrl) return null;
  return (
    <div className="px-3 pt-2 pb-1">
      <a
        href={embedUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs inline-block bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-md px-3 py-1 border border-emerald-200"
      >
        View availability calendar
      </a>
    </div>
  );
}
