import { ChatOpenAI } from "@langchain/openai";

// Centralized LLM factory so we can tweak defaults in one place
export function makeChatModel() {
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const temperature = process.env.OPENAI_TEMPERATURE
    ? Number(process.env.OPENAI_TEMPERATURE)
    : 0.3;

  // LangSmith tracing is enabled via env variables:
  // - LANGCHAIN_TRACING_V2=true
  // - LANGCHAIN_API_KEY=...
  // - LANGCHAIN_PROJECT=Tima Green Tours (optional)
  return new ChatOpenAI({
    model,
    temperature,
  });
}

