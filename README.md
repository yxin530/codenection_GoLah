# GoLah by hokkienmeeisred

**Team:** Chor Yun Xin, Ang Jie Ying, Kung Xuan Yu  
**Problem Statement:** Travel Planner  
**Video Presentation:** [Unlisted Youtube Link]  
**Presentation Slides:** [Public Link]

## 1. Project Overview

**The Problem.** Planning a trip — especially with a group — forces travellers to juggle multiple disconnected applications: one for flights, another for hotels, Google Maps for navigation, a separate currency converter, a chat app for group coordination, and yet another tool for managing travel documents and itineraries. This fragmentation means travellers manually piece everything together, switching contexts constantly. For group trips, the problem compounds — everyone has different schedules, budgets, interests, and activity preferences, and there is no shared environment to coordinate them. When something changes mid-trip (a flight delay, a cancelled activity), the group has to manually reorganise across all those apps again. Existing apps like TripIt, Wanderlog, and TravelSpend each solve one slice of this problem (itinerary management, destination discovery, expense splitting respectively), but none unify the full travel experience — planning, documents, navigation, communication, currency, and intelligent assistance — into a single platform with context-aware AI.

**Our Solution.** GoLah is an AI-powered travel companion built as a Progressive Web App (PWA) that brings the essential parts of planning and managing a trip into one place. Instead of switching between multiple apps, travellers can manage their trip from a single platform — whether solo or with a group. GoLah centralises travel documents, itinerary planning, smart maps, currency conversion, group chat, voice-message transcription, expense splitting, and crisis assistance, all powered by an AI assistant that understands the user's trip context.

**Feature-set:**

- **Travel Files Management** — Centralised storage for passports, visas, boarding passes, hotel reservations, insurance, eSIM info, and emergency contacts.
- **Smart Map** — Destination exploration with AI-assisted route suggestions, live pricing and availability, booking options, trip-context-aware recommendations, and user-generated comments, reviews, and photos.
- **Currency Converter** — Live exchange rates and quick conversion built directly into the app.
- **AI Chat Hub** — Solo mode for personal AI travel assistance, and Group mode where the AI uses shared trip context (itinerary, budget, preferences, decisions) to answer questions.
- **AI Trip Planning** — Swipe-based destination discovery, AI-powered group destination debate that weighs each member's preferences, and automatic bill splitting.
- **Group Travel** — Shared trips, group chat, media sharing, preference coordination, shared itineraries, and expense management.
- **Voice Message Transcription** — Users can send voice messages, which are transcribed to text in the backend so the AI can understand what was said, use the transcription as conversation/trip context, and answer questions through normal text-based AI chat.
- **Crisis Management** — Assistance for flight delays, plan changes, and accidents — all within the same platform.

## 2. Ideation & Process

### 2.1 Ideas We Considered

Table of every distinct idea generated, with why each was kept or dropped, ordered with chosen ideas listed first.

| **Idea** | **Decision** | **Why it was dropped / kept** |
| :--- | :--- | :--- |
| Centralized AI Trip Planning | Chosen | Kept. Provides dynamic trip planning for users based on provider options, destination, dates, budget constraints, and personal preferences. |
| AI Swarm Agents Architecture | Chosen | Kept. Implements a multi-agent system where specialized agents handle distinct tasks (logistics, routing, finance, crisis) to provide tailored assistance throughout the trip. |
| Smart Map & Attraction Reviews | Chosen | Kept. Integrates AI-generated routes, live pricing, availability booking, and allows users to view and share reviews and photos for attractions. |
| Structured File Management | Chosen | Kept. Centralizes and stores critical travel documents, including hotel reservations, emergency contacts, flight details, and passes. |
| AI Travel Chatbot & Companion | Chosen | Kept, but scoped as a contextual feature layer inside GoLah rather than a generic standalone chatbot. Operates in Solo mode for personal assistance and Group mode using shared trip context. |
| Integrated Bill Splitting | Chosen | Kept. Designed for group travelers to easily split expenses directly within the app, removing manual calculation friction. |
| Voice Message Transcription | Chosen | Kept. Transcribes speech-to-text voice messages in the backend to index them into AI conversation memory, allowing the AI to understand group discussions and answer questions when tagged/mentioned. |
| Crisis Management Hub | Chosen | Kept. Provides emergency workflows and proactive support when users encounter unexpected disruptions, cancellations, or accidents during their trip. |
| Two-Way Voice Calling with AI | Dropped | Dropped because the technical implementation is overly complex and text/voice-note transcription better serves travelers' on-the-go needs without requiring live audio calls. |
| Group Memories & Photo Album | Dropped | Dropped because users already rely on native shared albums (e.g., Apple iCloud Shared Albums, Google Photos) and have no real need to open an external travel app specifically for photo sharing. |
| Group-Only Travel Coordination App | Dropped | Dropped as a standalone concept. Solo travelers experience the exact same fragmentation problem, so GoLah supports both solo and group travel rather than limiting scope. |

### 2.2 Ideation Boards

**Mindmap**

![Mindmap](docs/assets/GoLah-mindmap.png)

The mind map shows how the team's ideas expanded from the central travel-planning problem into the major GoLah feature areas.

**Problem Tree**

![Problem Tree](docs/assets/GoLah-problemtree.png)

The problem tree shows the root causes and consequences of fragmented travel planning and how the problem affects both individual and group travellers.

### 2.3 Mentor Consultation

| **Date** | **Mentor** | **Feedback Received** | **What Was Changed** |
| :--- | :--- | :--- | :--- |
| *6/9/2026* | *Looi Wei En* | Recommended developing as a native mobile app rather than a PWA, noting that several core features align closer with native application capabilities. | **No change made (retained PWA).** We intentionally chose a PWA because critical utility features (like Travel Files Management) need to be instantly accessible across any device or shared browser link without forcing an app connecting to the network. Additionally, PWAs can be easily added directly to the home screen without consuming native device storage. |

## 3. Design & Prototype

**UI Prototype:** [Public Link]

*(Check that it opens in an incognito window. Embed or link 4–8 key screens as images with captions explaining the user interactions.)*

## 4. What Makes It Different

GoLah's differentiator is that it treats the trip as the central object and layers context-aware AI on top of a unified platform — rather than offering a single travel feature in isolation.

### Novel Features

1. **Context-Aware AI Assistant** — Unlike generic travel chatbots, GoLah AI retrieves relevant information from the user's actual trip (itinerary, group preferences, travel files, chat history, and current trip context) before generating a response. A traveller can ask "Are we free tomorrow afternoon?" and the AI checks the itinerary rather than guessing.

2. **AI-Powered Group Destination Debate** — For group travel, GoLah AI can compare multiple destination options against each group member's chosen preferences (budget, interests, activity style) and produce a recommendation using AI agents — turning a potentially contentious discussion into a data-informed decision.

3. **Voice Message Transcription for Context-Aware AI** — When a user sends a voice message, GoLah converts the speech to text through speech-to-text processing. The transcription becomes part of the relevant conversation context, allowing the AI to understand the user's voice message and answer questions through normal text chat. GoLah does not require AI voice calls or AI-generated voice replies for this feature.

4. **Crisis Management Inside the Travel Platform** — Instead of forcing travellers to search across multiple apps during stressful situations such as flight delays or plan changes, GoLah provides relevant assistance within the same platform where the trip lives.

5. **Travel Files Separated from Documents for AI Access** — Structured travel information (visa expiry, flight details, hotel reservations) is stored separately from uploaded document files. This allows the AI to retrieve relevant travel information without processing entire PDFs or images every time.

6. **Smart Map with Community Travel Information** — The Smart Map combines travel discovery and trip-context-aware recommendations with live pricing and availability where supported, while allowing users to view and share comments, reviews, and photos.

7. **Swipe-Based Destination Discovery with Group Consensus** — Travellers can swipe to discover and rate destinations, while group preferences can be used to support AI-assisted destination decisions.

## 5. Technical Architecture & Feasibility

### Tech Stack

**Frontend**
- React
- Next.js
- TypeScript
- Tailwind CSS
- Progressive Web App (PWA)

**Backend**
- Node.js
- Next.js API Routes

**Database & Storage**
- Supabase
- PostgreSQL
- Supabase Storage
- Supabase Realtime where appropriate

**AI**
- LLM: **[Provider TBD]**
- Speech-to-Text: **[Provider TBD]**
- Text-to-Speech: **Not required for the current MVP**
- AI Tool Calling
- AI Context Management

**Maps & Travel Services**
- Maps API: **[Provider TBD]**
- Flight/travel information API: **[Provider TBD]**
- Currency API: **[Provider TBD]**
- Translation service: **[Provider TBD]**
- Booking service: **[Provider TBD]**

Provider choices are intentionally left open while the team evaluates suitable services, pricing, free tiers, API capabilities, and implementation constraints.

### System Architecture

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
        │ PostgreSQL    │      │ Maps                  │
        │ Auth          │      │ Flights               │
        │ Storage       │      │ Currency              │
        │ Realtime      │      │ Translation           │
        └───────┬───────┘      │ Booking               │
                │              │ Speech-to-Text        │
                │              └──────────┬───────────┘
                └────────────┬────────────┘
                             ▼
                  ┌────────────────────────┐
                  │      GoLah AI Layer    │
                  │                        │
                  │ Orchestrator Agent     │
                  │ ├─ Trip Planning       │
                  │ ├─ Travel Information  │
                  │ ├─ Recommendation      │
                  │ ├─ Group Travel        │
                  │ ├─ Finance             │
                  │ ├─ Travel Files        │
                  │ └─ Crisis              │
                  │                        │
                  │ Context + Tool Calling │
                  └────────────────────────┘
```

### Voice Message AI Flow

Voice communication with AI is **not** part of the MVP. Voice messages are treated as an input format only.

```text
User sends voice message
        ↓
Backend receives audio
        ↓
Speech-to-Text
        ↓
Transcript stored / attached to message
        ↓
Relevant Chat + Trip + Group Context
        ↓
GoLah AI
        ↓
Text response
```

### AI Agent Architecture

GoLah uses a multi-agent AI architecture.

```text
                         GoLah AI
                            │
                    Orchestrator Agent
                            │
       ┌────────────┬───────┼────────┬─────────────┐
       ▼            ▼       ▼        ▼             ▼
 Trip Planning  Travel   Recommendation  Group    Finance
    Agent      Info Agent     Agent       Agent     Agent
       │
       ├───────────────┐
       ▼               ▼
 Travel Files      Crisis Agent
    Agent
```

Agents can autonomously read relevant information, search tools, analyse the trip, generate recommendations, detect issues, and prepare actions.

However:

- **Material itinerary re-planning requires user approval before changes are applied.**
- **Booking, rebooking, cancellation, payment, and other consequential external actions require explicit human confirmation.**
- The system must not claim an external action succeeded unless the relevant tool/API confirms success.

### Build Plan & Scope

The MVP will focus on delivering the current required GoLah experience rather than implementing every possible future travel feature.

**Core MVP:**

1. User authentication and profiles.
2. Trip creation and itinerary management.
3. Travel Files management and expiry information.
4. Smart Map with travel discovery, AI-assisted routes, live pricing/availability where supported, and community comments/reviews/photos.
5. Currency conversion.
6. AI Chat Hub with solo and group modes.
7. Multi-agent AI with shared trip/group context.
8. AI-assisted trip planning and group destination decisions.
9. Group chat, shared trips, and expense splitting.
10. Voice-message transcription so AI can understand voice messages.
11. Crisis assistance focused on travel disruptions and plan changes.
12. Human approval flow for itinerary re-planning and consequential actions.

**Explicitly not part of the current MVP:**

- AI voice calls.
- AI-generated voice replies / TTS.
- Continuous background voice listening.
- Fully autonomous booking or rebooking.
- Automatic payments.
- Native iOS/Android applications.
- Future predictive travel features unless required by the organizer.

The architecture should remain modular so these capabilities can be added later without redesigning the core GoLah system.