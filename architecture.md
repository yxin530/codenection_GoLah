# GoLah — System Architecture

> Companion doc to `README.md`. This defines the technical shape of the system so the coding agent can implement it consistently. LLM provider and several external services are intentionally abstracted (see "Provider Abstraction" below) — do not hardcode a single vendor.

---

## 1. High-Level Shape

GoLah is a **Next.js PWA** (single deployable) with:

- **Frontend**: React + Next.js (App Router) + TypeScript + Tailwind, installable as a PWA (manifest + service worker).
- **Backend**: Next.js API Routes (Node.js runtime) — no separate backend service for MVP.
- **Database/Storage/Auth/Realtime**: Supabase (Postgres, Auth, Storage, Realtime).
- **AI Layer**: a multi-agent orchestrator that sits behind the API routes, calling an LLM provider through an abstraction layer, plus tool-calling into internal data and external services.
- **External Services**: Maps, Flights, Currency, Translation, Speech-to-Text, Booking — all accessed through a single **External API Gateway** module, never called directly from route handlers.

```
Client (PWA)
   │  fetch/websocket
   ▼
Next.js API Routes  ──────────────┐
   │                              │
   ├─ Auth/Trips/Files/Groups/Chat│
   ├─ AI endpoints ───────────────┼──► GoLah AI Layer (Orchestrator + Agents)
   │                              │         │
   ▼                              ▼         ▼
Supabase (Postgres/Auth/Storage/Realtime)   External API Gateway
                                              ├─ Maps provider
                                              ├─ Flights provider
                                              ├─ Currency provider
                                              ├─ Translation provider
                                              ├─ Speech-to-Text provider
                                              └─ Booking provider (read-only in MVP)
```

---

## 2. Provider Abstraction (important — providers are TBD/pluggable)

Per team decision, exact vendors are **not locked in yet**. Every external dependency (LLM, STT, Maps, Flights, Currency, Translation, Booking) must be implemented behind a small interface in `/lib/providers/<capability>/` so swapping a vendor never touches feature code.

**Default recommendations to build against first** (free-tier friendly, swappable later):

| Capability | Default provider | Notes |
| :--- | :--- | :--- |
| LLM | Stubbed interface (`/lib/providers/llm/`), no vendor call wired yet | Implement `LLMClient.chat()` interface; wire a real vendor (Anthropic/OpenAI) once team decides. Use a mock/deterministic responder for local dev + tests. |
| Speech-to-Text | Google Cloud Speech-to-Text (free tier) | Fallback: Whisper API. |
| Maps | Mapbox (generous free tier) | Fallback: Google Maps Platform. |
| Flights | AviationStack or Amadeus Self-Service (free tier) | Read-only flight status/info only in MVP. |
| Currency | exchangerate.host or Frankfurter (free, no key) | |
| Translation | LibreTranslate (self-hostable/free) or Google Translate free tier | |
| Booking | Not integrated in MVP — UI shows "booking options" as external links only | No transactional booking calls in MVP. |

Each provider module exports a narrow interface (e.g. `getExchangeRate(from, to)`, `transcribe(audioUrl)`, `searchPlaces(query, bounds)`) so agents and routes depend on the interface, not the vendor SDK.

---

## 3. Data Model (core entities)

Implemented as Supabase/Postgres tables with RLS (row-level security) scoped by `trip_id` / `user_id` membership.

- `users` (Supabase Auth + profile extension table)
- `trips` (owner, dates, destination(s), status, budget)
- `trip_members` (trip_id, user_id, role: organizer/member)
- `itineraries` / `itinerary_items` (trip_id, day, time, type, location, source: manual/ai)
- `travel_files` (trip_id, user_id, category: passport/visa/boarding_pass/hotel/insurance/esim/emergency_contact, storage_path, structured_fields jsonb)
- `chat_channels` (trip_id, type: solo/group, name — supports "Chat Hub sections")
- `chat_messages` (channel_id, sender_id, type: text/voice/system, content, transcript, ai_context_used jsonb)
- `voice_messages` (message_id, audio_path, transcript, status)
- `bills` / `bill_splits` (trip_id, payer_id, amount, currency, split rule, participants, status)
- `group_preferences` (trip_id, user_id, budget, interests, activity_style)
- `destination_swipes` (trip_id, user_id, destination_id, vote)
- `crisis_events` (trip_id, type: delay/cancellation/accident/plan_change, status, related agent actions)
- `community_posts` (user_id, destination, content, media, visibility)
- `map_reviews` (place_id, user_id, rating, comment, photos)
- `agent_actions` (trip_id, agent_type, action_type, payload jsonb, status: proposed/approved/rejected/executed, requires_approval boolean) — **the audit trail for human-approval flow**

---

## 4. AI Layer Architecture

See `agentic-architecture.md` for full detail. In short: a single **Orchestrator Agent** receives a request (chat message, planning trigger, crisis event), assembles trip context, routes to one or more specialist agents (Trip Planning, Recommendation, Finance, Chat, Crisis), and any action with real-world consequence is written to `agent_actions` with `requires_approval = true` and surfaced to the user before execution.

---

## 5. Realtime & Async

- **Supabase Realtime** powers group chat, chat hub sections, live itinerary edits, and swipe/voting updates.
- **Voice message processing** is async: message uploads → `voice_messages` row created with `status=pending` → background job (API route triggered or Supabase Edge Function) calls STT provider → transcript written back → chat message updated → AI context refreshed.
- **Crisis detection** (e.g. flight delay) is event-driven: an external check (polling flights provider or user-reported) creates a `crisis_events` row, which the Orchestrator picks up to propose next steps.

---

## 6. Security & Approval Boundaries

- All external-facing mutation endpoints (booking, cancellation, payment, itinerary auto-replan) must check `agent_actions.requires_approval` and block execution until a user confirms.
- No endpoint may report an external action as "succeeded" without a confirmed response from the relevant provider — surface pending/unknown states explicitly instead of assuming success.
- RLS on all trip-scoped tables: a user can only read/write rows for trips they belong to.
- File uploads (travel files) go through Supabase Storage with signed URLs; sensitive documents (passport, visa) are private buckets, never public.

---

## 7. Deployment Shape (MVP)

- Single Next.js app deployed as one unit (e.g. Vercel-style or any Node host).
- Supabase as managed backend (hosted).
- Environment-driven provider selection (`.env` flags choose which provider implementation loads behind each interface) so local/dev can run on mocks.

---

## 8. Open Items For Team Decision (flag, don't block on)

- Final LLM vendor.
- Whether STT runs synchronously (small clips) vs always async.
- Booking provider integration timeline (post-MVP).
- Multi-destination trip support in `trips` schema (assumed single destination string field is extendable to array later).

If the coding agent hits a decision not covered here or in `requirements.md`, it should flag the assumption in its PR/commit description rather than silently guessing.
