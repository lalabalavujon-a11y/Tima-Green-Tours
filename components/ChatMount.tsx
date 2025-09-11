"use client";

import dynamic from 'next/dynamic';

const SiaAssistantsChat = dynamic(() => import('@/components/SiaAssistantsChat'), { ssr: false });
const SiaChat = dynamic(() => import('@/components/SiaChat'), { ssr: false });

export default function ChatMount() {
  // Mount immediately; prefer Assistants if configured, else classic chat
  return process.env.NEXT_PUBLIC_TGT_ASSISTANT_ID ? <SiaAssistantsChat /> : <SiaChat />;
}

