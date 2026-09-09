# GoLah — Agentic Architecture

> Detailed design of the multi-agent AI layer referenced in `architecture.md` §4. This is the spec the coding agent should follow when implementing `/lib/ai/`.

---

## 1. Design Principle

GoLah AI is **context-first, not generic-chatbot-first**. Every agent call starts by assembling relevant trip state (itinerary, group preferences, files metadata, recent chat, trip status) before generating a response — never answers from a blank slate.

All agents share the same LLM provider abstraction (`/lib/providers/llm/`) but differ in: system prompt, allowed tools, and output shape.

---

## 2. Orchestrator Agent

**Role**: single entry point for all AI-driven requests. Does not do the specialist work itself — it classifies intent, gathers shared context, and routes to one or more specialist agents, then merges/returns the result.

**Inputs**: user message (text — including voice transcripts), trigger type (`chat`, `planning_request`, `crisis_event`, `bill_split_request`, `destination_debate`), trip_id, user_id, mode (`solo` | `group`).

**Responsibilities**:
1. Load shared context bundle (see §5).
2. Classify which specialist agent(s) the request needs (can be more than one, e.g. a message that mentions both a schedule question and a cost question).
3. Call specialist agent(s) with the relevant context slice + user request.
4. If a specialist proposes an action with real-world consequence, write it to `agent_actions` as `proposed` rather than executing directly.
5. Merge specialist output(s) into a single response for the Chat UI.
6. Log the interaction (which agents used, tools called, context used) for debuggability — stored alongside the chat message (`ai_context_used` field).

**Not responsible for**: domain reasoning (that's the specialists), direct external API calls (that's tools, called by specialists).

---

## 3. Specialist Agents

| Agent | Responsibility | Key tools | Can propose actions requiring approval? |
| :--- | :--- | :--- | :--- |
| **Trip Planning Agent** | Builds/edits itinerary drafts, sequences activities against dates/budget/preferences, supports AI-assisted group destination decisions and swipe-based discovery aggregation. | `get_itinerary`, `propose_itinerary_change`, `get_group_preferences`, `search_places` (maps), `get_flight_info` | Yes — itinerary re-planning requires approval. |
| **Recommendation Agent** | Suggests destinations, activities, routes; surfaces community reviews/photos relevant to trip context; powers Smart Map contextual suggestions. | `search_places`, `get_reviews`, `get_community_posts`, `get_group_preferences` | No (suggestions only, no state change). |
| **Finance Agent** | AI-assisted bill splitting, currency conversion in context, cost estimates against budget. | `get_currency_rate`, `create_bill_split_proposal`, `get_trip_budget` | Yes — bill split proposals require participant confirmation before finalizing. |
| **Chat Agent** | General conversational responses in Solo/Group Chat Hub, answers trip-context questions ("are we free tomorrow?"), delegates to other agents when the question is really planning/finance/crisis. | `get_itinerary`, `get_chat_history`, `get_travel_files_metadata` | No. |
| **Crisis Agent** *(triggered by Orchestrator on `crisis_event`, not a menu choice)* | Handles flight delays, cancellations, plan changes, accidents — proposes alternative plans, relevant emergency contacts/files, next steps. | `get_flight_info`, `get_itinerary`, `propose_itinerary_change`, `get_emergency_contacts`, `get_crisis_playbook` | Yes — any resulting plan change or external action requires approval. |

> Note: the README's diagram lists four agents (Trip Planning, Recommendation, Finance, Chat). Crisis Management is implemented as a specialization invoked by the Orchestrator on crisis events — reusing Trip Planning + Chat tools rather than a fifth persistent "menu" agent — to keep MVP scope contained. Flag to the team if a fully separate Crisis Agent is preferred instead.

---

## 4. Tools (function-calling surface)

Tools are the only way agents touch data or external services — no agent should be given raw DB or provider client access. Each tool is a typed function registered with the LLM provider's tool-calling interface.

Read tools (safe, no approval needed): `get_itinerary`, `get_group_preferences`, `get_chat_history`, `get_travel_files_metadata`, `search_places`, `get_reviews`, `get_community_posts`, `get_currency_rate`, `get_flight_info`, `get_trip_budget`, `get_emergency_contacts`, `get_crisis_playbook`.

Write/propose tools (**always create an `agent_actions` row with `requires_approval=true`, never mutate directly**): `propose_itinerary_change`, `create_bill_split_proposal`.

No MVP tool performs booking, payment, or cancellation directly — those are explicitly out of scope per README §5 Build Plan.

---

## 5. Shared Context Bundle

Assembled once per Orchestrator invocation, passed down to specialists (trimmed to what each agent needs):

- Trip summary (destination(s), dates, budget, status)
- Current itinerary (upcoming items relevant to the time window of the request)
- Group members + their preferences (group mode only)
- Recent relevant chat history (channel-scoped, last N messages incl. voice transcripts)
- Relevant travel files **metadata only** (never raw document contents/images unless a tool explicitly fetches one for a specific reason)
- Any open crisis_events for the trip

Context assembly must respect RLS — an agent never sees data for a trip the requesting user isn't a member of.

---

## 6. Human Approval & Safety Flow

1. Specialist agent determines an action has real-world/material consequence (itinerary re-plan, bill split finalization, anything touching booking/payment/cancellation).
2. Agent calls a `propose_*` tool → row inserted into `agent_actions` with `status=proposed`.
3. Orchestrator returns the proposal to the chat UI as a distinct "action card" (not plain text) — user(s) see exactly what will change.
4. User approves or rejects. Group actions may require majority/organizer approval — mirror `trips`/`trip_members` roles (defer exact quorum rule to `requirements.md` / team decision).
5. Only on approval does a backend handler apply the change (update itinerary, finalize bill split) and set `status=approved` → `executed`.
6. If a tool call to an external provider fails or is ambiguous, the system must show a pending/failed state — **never claim success without provider confirmation**.

---

## 7. Voice Message → AI Context Flow

1. User sends voice message in a chat channel → uploaded to Storage, `voice_messages` row (`status=pending`).
2. Async STT job transcribes (see architecture.md §5) → `transcript` saved, `chat_messages.content` populated, `status=done`.
3. Transcript is now a normal chat message and flows into the Chat Agent's context exactly like typed text — no special-casing downstream.
4. MVP explicitly excludes: live/two-way voice calls, AI-generated voice (TTS) replies, continuous background listening.

---

## 8. Failure & Ambiguity Handling

- If context is insufficient to answer confidently (e.g. no itinerary yet), agents should ask a clarifying question rather than fabricate trip details.
- If a tool call fails, the agent surfaces that plainly to the user rather than guessing an outcome.
- Orchestrator should degrade gracefully if the LLM provider is unavailable (stub/mock mode) — return a clear "AI temporarily unavailable" state, not a crash.

---

## 9. Testing Strategy for Agents

- Unit test each tool function against mocked provider responses.
- Test Orchestrator routing logic with fixture requests (does it pick the right specialist(s)?).
- Test approval flow end-to-end: propose → agent_actions row → approve → executed; propose → reject → no side effect.
- Golden-response tests for Chat Agent context assembly (given fixture trip data, does the assembled context contain the right slices?) rather than asserting exact LLM text output.
