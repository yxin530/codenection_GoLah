# GoLah — Requirements & Phased Build Plan

> Derived from `README.md` §5 Build Plan. The team wants **everything in the MVP eventually**, split into phases so the coding agent builds in a sensible, testable order instead of attempting all 14 features at once.

---

## Phasing Rationale

Phase 1 establishes the foundation every other feature depends on (auth, trip object, one working AI path, approval mechanism). Phase 2 adds the group/social/AI-depth layer. Phase 3 adds discovery, crisis, and community features that depend on Phase 1+2 data existing. This order minimizes rework — e.g. bill splitting (Phase 2) needs trips+groups (Phase 1); crisis management (Phase 3) needs itineraries+chat (Phase 1) and the multi-agent pattern proven (Phase 2).

---

## Phase 1 — Foundation & Solo Core Loop

**Goal**: a single user can sign up, create a trip, manage a basic itinerary, store travel files, convert currency, and chat with a context-aware AI (Solo mode) — with the human-approval mechanism working end-to-end for at least one action type.

1. **Auth & profiles** — Supabase Auth (email or OAuth), profile table, session handling in Next.js.
2. **Trip creation & itinerary management** — create/edit/delete trip, add/edit/reorder itinerary items, basic itinerary view.
3. **Travel Files management** — upload/categorize/view files (structured fields + document storage), private per-user/per-trip.
4. **Currency conversion** — simple converter UI backed by the currency provider abstraction.
5. **AI Chat Hub — Solo mode only** — Orchestrator + Chat Agent + Trip Planning Agent wired to real trip data, using the LLM provider abstraction (stub/mock provider acceptable if vendor not chosen yet — must be swappable without touching agent code).
6. **Human approval flow (v1)** — `agent_actions` table + itinerary re-planning proposal/approval end-to-end (this is the pattern Phase 2/3 actions will reuse).

**Explicitly deferred to later phases**: groups, group chat, bill splitting, voice messages, smart map, crisis, community posts, chat sections, swipe discovery, destination debate.

**Exit criteria**: a solo user can create a trip, ask the AI to adjust the itinerary, see a proposed change, approve it, and see it applied — with files and currency conversion also functional.

---

## Phase 2 — Group Layer & AI Depth

**Goal**: everything becomes usable by a group, bill splitting and voice work, and the full agent roster (Recommendation, Finance) is live.

7. **Group Travel** — shared trips, `trip_members`, group preferences, shared itinerary (multi-editor with realtime sync).
8. **Group chat** — group-mode Chat Hub, media sharing, Supabase Realtime.
9. **AI Chat Hub — Group mode** — Orchestrator context assembly extended to group preferences/multi-member data.
10. **AI-assisted bill splitting** — Finance Agent, `create_bill_split_proposal` tool, approval flow reused from Phase 1.
11. **Voice message transcription** — upload → async STT → transcript → chat context (per agentic-architecture.md §7).
12. **AI-powered group destination decisions** — Recommendation Agent comparing preferences (feeds into Phase 3 swipe UI, but the AI comparison logic belongs here).

**Exit criteria**: a group of users can share a trip, chat together, split a bill with AI assistance and mutual confirmation, send voice messages the AI understands, and get AI destination comparisons based on combined preferences.

---

## Phase 3 — Discovery, Crisis & Community

**Goal**: the remaining "discovery and resilience" layer — Smart Map, crisis handling, community content, and chat organization.

13. **Smart Map** — destination exploration, AI-assisted routes, live pricing/availability where supported, booking options as links, community comments/reviews/photos.
14. **Swipe-based destination discovery** — swipe UI backed by `destination_swipes`, feeding the Phase 2 Recommendation Agent comparison.
15. **Crisis Management** — Crisis event detection/reporting, Crisis Agent flow (delays, cancellations, accidents, plan changes), reusing approval flow for any resulting itinerary changes.
16. **Community travel status & posts** — post creation/feed, visibility rules.
17. **Organised Chat Hub sections** — channel/section model within a trip's Chat Hub (Discord-style), built on the Phase 2 chat infrastructure.

**Exit criteria**: all 14 MVP features from the README are present and integrated; crisis events can be raised and produce agent-proposed responses; community posts and map reviews are browsable.

---

## Cross-Cutting Requirements (apply to every phase)

- **Never claim an external action succeeded without provider confirmation** (architecture.md §6).
- **Material itinerary changes and any booking/payment/cancellation-adjacent action require explicit user approval** — no silent autonomous execution, in any phase.
- **RLS on all trip-scoped data** — implement from Phase 1 onward, not retrofitted later.
- **Provider abstraction** — every external service call goes through `/lib/providers/<capability>/`, regardless of which phase introduces it.
- **PWA installability** — manifest + service worker should exist from Phase 1 so it's not a late bolt-on.

## Explicitly Out of Scope (all phases, per README)

AI voice calls, AI-generated voice/TTS replies, continuous background voice listening, fully autonomous booking/rebooking, automatic payments, standalone expense tracking, native iOS/Android apps, predictive travel features not requested by the organizer.

---

## Open Questions for the Team (agent should flag, not guess, if hit)

- Exact quorum rule for group approval of proposed actions (single organizer vs majority vs all members).
- Whether Phase 1 ships with a real LLM vendor wired or stays fully mocked until the team decides.
- Multi-destination trip support (single destination assumed for Phase 1 schema, per architecture.md §8).
