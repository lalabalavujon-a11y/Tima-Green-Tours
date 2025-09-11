Tima Green Tours — LangChain & LangSmith Integration

Overview
- Conversational booking assistant wired via LangChain (OpenAI provider), with a tour search tool.
- LangSmith tracing enabled for monitoring, debugging, and evaluation.
- CI workflow (GitHub Actions) builds on every push; deployment via Vercel Action on main.

Key Files
- `app/api/chat/route.ts`: Stateless chat endpoint with tool calling.
- `lib/ai/model.ts`: Centralized ChatOpenAI configuration.
- `lib/ai/tools.ts`: `search_tours` tool querying catalog data.
- `.github/workflows/ci.yml`: Lint, type-check, build, and Vercel deploy.
- `env.example`: Adds `OPENAI_*` and `LANGCHAIN_*` variables.
 - `app/api/tgt/assistants/chat/route.ts`: OpenAI Assistants API route with server-side tool calls.
 - `assistants/tgt/*.yaml`: Assistant specs synced via `npm run assistants:sync`.
 - `components/SiaAssistantsChat.tsx`: Optional widget wired to the Assistants route.

Prerequisites
- Vercel project created and linked to this repo.
- Secrets in GitHub repo settings → Secrets and variables → Actions:
  - `VERCEL_TOKEN`
  - `VERCEL_ORG_ID`
  - `VERCEL_PROJECT_ID`
  - Optionally: `OPENAI_API_KEY` if you run server-side checks in CI (not required).

Local Setup
1) Copy `env.example` → `.env.local` and fill values:
   - `OPENAI_API_KEY=...`
   - `LANGCHAIN_TRACING_V2=true`
   - `LANGCHAIN_API_KEY=...` (create at https://smith.langchain.com)
   - `LANGCHAIN_PROJECT=Tima Green Tours` (optional project name)
2) Install deps and run dev:
   - `npm install`
   - `npm run dev`

How It Works
- The assistant receives chat messages at `POST /api/chat` with `{ messages: [{ role, content }] }`.
- It runs a system prompt tailored for Tima Green Tours and binds the `search_tours` tool.
- If the model requests a tool call, the server executes it and feeds the result back until a final response is produced (≤3 rounds).
- Results and latency are traced to LangSmith when env vars are set.

Example Request
```
curl -X POST http://localhost:3000/api/chat \
  -H 'Content-Type: application/json' \
  -d '{
    "messages": [
      { "role": "user", "content": "What waterfall tours do you offer near Sigatoka under FJD 150?" }
    ]
  }'
```

Example Prompts
- "What tours do you have in Fiji?"
- "Can you customize a three-day tour for me?"
- "Family-friendly options near Nadi with a budget under FJD 200?"

Extending The Agent
- Add new tools in `lib/ai/tools.ts` (e.g., availability lookup, booking handoff, pricing calculators).
- Bind them in `app/api/chat/route.ts` alongside `search_tours`.
- For streaming responses, swap to an SSE or `ReadableStream` implementation and progressively yield tokens.

LangSmith Tips
- Set `LANGCHAIN_TRACING_V2=true`, `LANGCHAIN_API_KEY`, and (optionally) `LANGCHAIN_PROJECT`.
- View traces: https://smith.langchain.com (inspect chains, latencies, LLM tokens, tool calls).
- Create datasets and run evals against transcripts to measure quality over time.

OpenAI Assistants (Optional)
- Define Assistant YAML under `assistants/tgt/` (e.g., `Sia_BookingConcierge_v1.yaml`).
- Set `TGT_OPENAI_API_KEY` locally, then run `npm run assistants:sync` to upsert.
- Put the resulting Assistant ID into `NEXT_PUBLIC_TGT_ASSISTANT_ID`.
- Call `POST /api/tgt/assistants/chat` with `{ assistantId, message, threadId? }`.
- Tools map to server implementations in `lib/ai/tools.ts`.
- Includes `run_post_booking` to trigger LangChain orchestrator (traced in LangSmith).

CI/CD
- On each PR/commit, GitHub Actions runs lint, typecheck, and build.
- On `main`, a Vercel deployment runs using repo secrets.
- Prefer Vercel’s Git Integration for preview deployments; the action here ensures consistency and a predictable prod deploy.

Security & Compliance
- Do not commit secrets. Use `.env.local` for local dev, GitHub Actions secrets in CI.
- If capturing user PII in conversation, log minimally and follow GDPR best practices.

Assistant Sync (Optional)
- Place assistant YAML specs in `assistants/tgt` (e.g., `sia.yaml`).
- Add `TGT_OPENAI_API_KEY` to your env (see `env.example`).
- Run `npm run assistants:sync` to upsert by name via OpenAI Assistants API.
