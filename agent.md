# AGENT.md — Instructions for the Coding Agent Building GoLah

You are building **GoLah**, an AI travel companion PWA. Before writing code, read, in order:

1. `README.md` — product vision, features, what's explicitly out of scope.
2. `requirements.md` — the phased build plan. **Build in phase order (1 → 2 → 3). Do not jump ahead** to a later phase's feature even if it looks easy, unless explicitly asked.
3. `architecture.md` — system architecture, data model, provider abstraction rules.
4. `agentic-architecture.md` — the multi-agent AI layer spec.

---

## Ground Rules

1. **Work one phase at a time.** Finish and validate Phase 1's exit criteria (see `requirements.md`) before starting Phase 2 work, unless the user explicitly asks you to skip ahead.
2. **Never hardcode a single external vendor behind feature code.** LLM, Maps, Flights, Currency, Translation, Speech-to-Text, and Booking all go through the provider abstraction in `/lib/providers/<capability>/`. Feature code and agents depend on the interface, not the SDK.
3. **No agent or route may directly mutate consequential state.** Itinerary re-planning, bill split finalization, and anything booking/payment/cancellation-adjacent must go through the `agent_actions` propose → approve → execute flow. Never wire a "propose" tool straight to a DB write.
4. **Never report success on an external action without provider confirmation.** If a provider call is ambiguous, times out, or fails, surface that state explicitly — don't assume it worked.
5. **Respect RLS / trip membership on every trip-scoped table**, from the first migration onward — don't defer security to "later."
6. **Stay inside MVP scope.** Do not build: AI voice calls, AI-generated voice/TTS, continuous background listening, autonomous booking/payment, standalone expense tracking, native mobile apps. If a request seems to ask for one of these, flag it back to the user instead of building it.

---

## When You're Not Sure

If you hit a decision that isn't answered in `README.md`, `requirements.md`, or `architecture.md` (e.g. exact approval quorum rules, which LLM vendor to finally wire up, multi-destination trip schema), **do not silently guess and proceed as if it were settled**. Either:
- Ask the user directly, or
- Pick the most conservative/reversible option, implement it, and clearly flag the assumption in your summary/PR description (see "Open Questions" sections in `requirements.md` and `architecture.md` for known open items).

---

## Tech Stack Reference (do not deviate without asking)

- Frontend: React + Next.js (App Router) + TypeScript + Tailwind, PWA (manifest + service worker).
- Backend: Next.js API Routes, Node.js.
- Data: Supabase (Postgres + Auth + Storage + Realtime).
- AI: Orchestrator + specialist agents per `agentic-architecture.md`, LLM provider stubbed/pluggable.
- External services: see `architecture.md` §2 default provider table — start with the free-tier defaults listed there unless the user specifies otherwise.

---

## Suggested Working Loop

For each feature in the current phase:
1. Confirm which entities/tables it touches (add migrations if new — keep RLS in the same migration, not a follow-up).
2. Implement provider/tool interfaces it needs (if not already present).
3. Implement the API route(s).
4. Implement the UI.
5. If the feature can propose a consequential action, wire it through `agent_actions`, not a direct mutation.
6. Add/update tests per `agentic-architecture.md` §9 for anything agent-related.
7. Note in your summary: what was built, what provider/assumption was used if not yet decided, and what's still open.

---

## File Map (create if missing, keep organized under)

```
/app                    Next.js routes (App Router)
/lib/providers/<cap>/   External service abstractions (llm, maps, flights, currency, translation, stt, booking)
/lib/ai/                Orchestrator + specialist agents + tools
/lib/db/                Supabase client, query helpers
/supabase/migrations/   SQL migrations incl. RLS policies
/components/            UI components
/docs/                  This doc set (architecture.md, agentic-architecture.md, requirements.md, AGENT.md, README.md)
```

Keep this file map's docs in sync as the project evolves — if architecture decisions change, update `architecture.md`/`agentic-architecture.md` in the same PR, don't let them drift.
