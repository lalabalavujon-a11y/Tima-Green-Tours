"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const SiaAssistantsChat = dynamic(() => import('@/components/SiaAssistantsChat'), { ssr: false });
const SiaChat = dynamic(() => import('@/components/SiaChat'), { ssr: false });

export default function ChatMount() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 3000);
    return () => clearTimeout(t);
  }, []);
  if (!ready) return null;
  return process.env.NEXT_PUBLIC_TGT_ASSISTANT_ID ? <SiaAssistantsChat /> : <SiaChat />;
}


