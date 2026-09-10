# ✈️ GoLah

> **One app. One trip. Your AI travel companion.**

**Team:** Chor Yun Xin · Ang Jie Ying · Kung Xuan Yu  
**Problem Statement:** Travel Planner  
**Video Presentation:** [Unlisted YouTube Link]  
**Presentation Slides:** [Public Link]

---

## 📑 Table of Contents

- [1. 🚀 Project Overview](#1--project-overview)
- [2. 💡 Ideation & Process](#2--ideation--process)
  - [2.1 Ideas We Considered](#21-ideas-we-considered)
  - [2.2 Ideation Boards](#22-ideation-boards)
  - [2.3 Mentor Consultation](#23-mentor-consultation)
- [3. 🎨 Design & Prototype](#3--design--prototype)
- [4. ✨ What Makes It Different](#4--what-makes-it-different)
- [5. 🛠️ Technical Architecture & Feasibility](#5--technical-architecture--feasibility)
  - [Tech Stack](#tech-stack)
  - [System Architecture](#system-architecture)
  - [Voice Message AI Flow](#voice-message-ai-flow)
  - [AI Agent Architecture](#ai-agent-architecture)
  - [Build Plan & Scope](#build-plan--scope)

---

# 1. 🚀 Project Overview

**GoLah** is an AI-powered travel companion built as a **Progressive Web App (PWA)** that brings trip planning, travel information, communication, and essential travel tools into one platform. Instead of switching between separate apps for itineraries, maps, documents, currency, and group coordination, travellers can manage their trip from one shared space. GoLah combines **context-aware AI, smart maps, travel files, group chat, voice-message transcription, AI bill splitting, and crisis assistance** to support travellers before and during their trip. Whether travelling solo or with a group, GoLah keeps the trip context in one place so the AI can provide more relevant assistance.

### 🌟 Key Features

| Feature | What it does |
| :--- | :--- |
| 📁 **Travel Files Management** | Centralised storage for passports, visas, boarding passes, hotel reservations, insurance, eSIM info, and emergency contacts. |
| 🗺️ **Smart Map** | Destination exploration with AI-assisted routes, live pricing/availability where supported, booking options, trip-context recommendations, and community comments, reviews, and photos. |
| 💱 **Currency Converter** | Live exchange rates and quick currency conversion. |
| 🤖 **AI Chat Hub** | Solo and Group modes with AI that understands relevant trip context. |
| 🧳 **AI Trip Planning** | Swipe-based destination discovery, AI-powered group destination decisions, and automatic bill splitting. |
| 💬 **Group Travel** | Shared trips, group chat, media sharing, preference coordination, shared itineraries, and AI-assisted bill splitting. |
| 🎙️ **Voice Message Transcription** | Voice messages are transcribed in the backend so GoLah AI can understand them as conversation and trip context. |
| 🚨 **Crisis Management** | Assistance for flight delays, plan changes, cancellations, and accidents within the same platform. |
| 📝 **Travel Status & Posts** | Users can share travel-related posts or statuses, helping others discover ideas when they are unsure where or what to travel. |
| #️⃣ **Chat Hub Sections** | Users can organise important conversations into sections inside the Chat Hub, inspired by Discord-style channels while keeping everything within the trip chat. |

---

# 2. 💡 Ideation & Process

## 2.1 Ideas We Considered

The following ideas were evaluated during ideation, with the selected concepts listed first.

| 💡 Idea | Decision | Reason |
| :--- | :--- | :--- |
| **Centralized AI Trip Planning** | ✅ Chosen | Dynamic trip planning based on destination, dates, budget, provider options, and personal preferences. |
| **AI Swarm Agents Architecture** | ✅ Chosen | Specialized agents handle tasks such as logistics, routing, finance, crisis, and recommendations. |
| **Smart Map & Attraction Reviews** | ✅ Chosen | Combines AI routes, live pricing/availability where supported, booking options, and community reviews/photos. |
| **Structured File Management** | ✅ Chosen | Keeps important travel information and documents organised in one place. |
| **AI Travel Chatbot & Companion** | ✅ Chosen | Context-aware AI available in Solo and Group modes instead of as a standalone generic chatbot. |
| **Integrated Bill Splitting** | ✅ Chosen | Lets group travellers split bills directly with AI assistance. |
| **Voice Message Transcription** | ✅ Chosen | Converts voice messages to text so the AI can understand and use them as conversation/trip context. |
| **Crisis Management Hub** | ✅ Chosen | Provides support during disruptions, cancellations, accidents, and unexpected travel problems. |
| **Travel Status & Community Posts** | ✅ Chosen | Lets users share travel ideas, statuses, and posts so others can discover destinations and activities when they have no idea where to go. |
| **Chat Hub Sections** | ✅ Chosen | Adds Discord-inspired sections/channels inside the Chat Hub so users can separate and find important conversations more easily. |
| **Two-Way Voice Calling with AI** | ❌ Dropped | Too technically complex; voice-message transcription provides useful AI access without live AI calls. |
| **Group Memories & Photo Album** | ❌ Dropped | Users can already rely on native shared albums such as Apple iCloud Shared Albums or Google Photos. |
| **Group-Only Travel Coordination App** | ❌ Dropped | Solo travellers face the same fragmentation problem, so GoLah supports both solo and group travel. |
| **Standalone Expense Tracking** | ❌ Dropped | AI bill splitting and currency conversion already cover the core financial needs for the current scope, making a separate expense-tracking feature unnecessary. |

## 2.2 Ideation Boards

### 🧠 Mindmap

![Mindmap](docs/assets/GoLah-mindmap.png)

The mind map shows how the team's ideas expanded from the central travel-planning problem into GoLah's major feature areas.

### 🌳 Problem Tree

![Problem Tree](docs/assets/GoLah-problemtree.png)

The problem tree shows the root causes and consequences of fragmented travel planning and how the problem affects both individual and group travellers.

## 2.3 Mentor Consultation

| 📅 Date | 👤 Mentor | 💬 Key Feedback | 🔄 Our Decision |
| :--- | :--- | :--- | :--- |
| *6/9/2026* | *Looi Wei En* | Recommended a native mobile app because several core features are well suited to native capabilities. | **Retained PWA.** We prioritised instant cross-device access and easy sharing, while keeping the app installable from the browser without requiring a traditional app-store installation. |

---

# 3. 🎨 Design & Prototype

**UI Prototype:** [Public Link]

> 💡 *Check that the prototype opens in an incognito window. Embed or link 4–8 key screens with short captions explaining the main interactions.*

---

# 4. ✨ What Makes It Different

GoLah treats the **trip as the central object** and layers context-aware AI on top of a unified travel platform, rather than solving only one part of the travel experience.

## 🌟 Novel Features

### 1. 🤖 Context-Aware AI Assistant
Unlike generic travel chatbots, GoLah AI retrieves relevant information from the user's actual trip — such as itinerary, group preferences, travel files, chat history, and current trip context — before generating a response.

> Example: *“Are we free tomorrow afternoon?”* → GoLah checks the itinerary instead of guessing.

### 2. 🗳️ AI-Powered Group Destination Debate
GoLah AI compares destination options against each group member's preferences, such as budget, interests, and activity style, to support a more data-informed group decision.

### 3. 🎙️ Voice Message Transcription for AI Context
Users can send voice messages, which are converted to text through speech-to-text processing. The transcript becomes part of the relevant conversation context, allowing the AI to understand voice messages and respond through normal text chat.

> **Note:** AI voice calls and AI-generated voice replies are not part of the current MVP.

### 4. 🚨 Crisis Management Inside the Travel Platform
Instead of searching across multiple apps during stressful situations such as flight delays or plan changes, GoLah provides relevant assistance inside the same platform where the trip is managed.

### 5. 📂 Structured Travel Information + Files
Structured travel information such as flight details, and hotel reservations is stored separately from uploaded documents.

### 6. 🗺️ Smart Map with Community Travel Information
The Smart Map combines travel discovery, trip-context recommendations, live pricing/availability where supported, and community-generated comments, reviews, and photos.

### 7. 👥 Swipe-Based Discovery with Group Consensus
Travellers can swipe through destinations and rate them, while group preferences can be used to support AI-assisted destination decisions.

### 8. 📝 Community Travel Status & Posts
Users can share travel experiences, ideas, statuses, or destinations they are considering. This gives travellers who are **unsure where to go and do** a source of inspiration from other users.

### 9. #️⃣ Organised Chat Hub Sections
The Chat Hub introduces Discord-inspired sections inside the group conversation, allowing users to separate important topics and make key messages easier to find without leaving the Chat Hub.

---

# 5. 🛠️ Technical Architecture & Feasibility

## Tech Stack

### 💻 Frontend
- React
- Next.js
- TypeScript
- Tailwind CSS
- Progressive Web App (PWA)

### ⚙️ Backend
- Node.js
- Next.js API Routes

### 🗄️ Database & Storage
- Supabase
- PostgreSQL
- Supabase Storage
- Supabase Realtime where appropriate

### 🧠 AI
- LLM: **[Provider TBD]**
- Speech-to-Text: **[Provider TBD]**
- AI Tool Calling
- AI Context Management

### 🗺️ Maps & Travel Services
- Maps API: **[Provider TBD]**
- Flight/travel information API: **[Provider TBD]**
- Currency API: **[Provider TBD]**
- Translation service: **[Provider TBD]**
- Booking service: **[Provider TBD]**

> Provider choices are intentionally left open while the team evaluates suitable services, pricing, free tiers, API capabilities, and implementation constraints.

## System Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                         GoLah PWA                            │
│                                                             │
│ Travel Files │ Smart Map │ Currency │ AI Chat │ Group Travel│
│ Trip Planning │ Voice Messages │ Crisis Assistance          │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                      Backend / API                          │
│                                                             │
│ Auth │ Trips │ Itineraries │ Files │ Groups │ Chat │ AI      │
│ Voice Message Processing │ External API Gateway              │
└───────────────┬──────────────────────┬──────────────────────┘
                │                      │
                ▼                      ▼
        ┌───────────────┐      ┌──────────────────────┐
        │    Supabase   │      │   External Services  │
        │               │      │                      │
        │ PostgreSQL    │      │ Maps                 │
        │ Auth          │      │ Flights              │
        │ Storage       │      │ Currency             │
        │ Realtime      │      │ Translation          │
        └───────┬───────┘      │ Speech-to-Text       │
                │              │                      │
                │              └──────────┬───────────┘
                └────────────┬────────────┘
                             ▼
                  ┌────────────────────────┐
                  │      GoLah AI Layer    │
                  │                        │
                  │ Orchestrator Agent     │
                  │ ├─ Trip Planning       │
                  │ ├─ Recommendation      │
                  │ ├─ Finance             │
                  │ ├─ Chat                │
                  │                        │
                  │ Context + Tool Calling │
                  └────────────────────────┘
```

## AI Agent Architecture

GoLah uses a **multi-agent AI architecture**.

```text
                         GoLah AI
                            │
                     Orchestrator Agent
                            │
       ┌────────────┬───────┼────────┬─────────────┐
       ▼            ▼                ▼             ▼
 Trip Planning  Recommendation    Finance       Chat Agent
    Agent           Agent          Agent  

```

Agents can read relevant information, use tools, analyse the trip, generate recommendations, detect issues, and prepare actions.

### 🔐 Human Approval & Safety

- **Material itinerary re-planning requires user approval** before changes are applied.
- **Booking, rebooking, cancellation, payment, and other consequential external actions require explicit confirmation.**
- The system must **not claim an external action succeeded** unless the relevant tool/API confirms success.

## Build Plan & Scope

The MVP focuses on delivering the required GoLah experience rather than implementing every possible future travel feature.

### 🚀 Core MVP

1. User authentication and profiles.
2. Trip creation and itinerary management.
3. Travel Files management.
4. Smart Map with travel discovery, AI-assisted routes, live pricing/availability where supported, and community comments/reviews/photos.
5. Currency conversion.
6. AI Chat Hub with Solo and Group modes.
7. Multi-agent AI with shared trip/group context.
8. AI-assisted trip planning and group destination decisions.
9. Group chat, shared trips, and **AI-assisted bill splitting**.
10. Voice-message transcription so AI can understand voice messages.
11. Crisis assistance focused on travel disruptions and plan changes.
12. Community travel status/posts for destination inspiration.
13. Organised Chat Hub sections for topic-based conversations.
14. Human approval flow for itinerary re-planning and consequential actions.

### 🚫 Explicitly Not Part of the Current MVP

- AI voice calls.
- AI-generated voice replies / TTS.
- Continuous background voice listening.
- Fully autonomous booking or rebooking.
- Automatic payments.
- Standalone expense tracking.
- Native iOS/Android applications.
- Future predictive travel features unless required by the organizer.

---

> 🧩 **GoLah is designed to stay modular**, allowing future capabilities to be added without redesigning the core system.


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
