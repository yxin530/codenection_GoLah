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

Table of every distinct idea generated, with why each was kept or dropped, order it so that chosen ideas are listed first.

| **Idea** | **Why it was dropped / kept** |
| --- | --- |
| AI travel chatbot (Chosen) | Kept, but scoped as a feature layer inside GoLah rather than a standalone product. The AI uses trip context, such as itinerary, group preference, and travel files, to provide contextual assistance, which is far more useful than a generic travel chatbot. |
| B (Chosen) | <br> |
| Group only travel coordination app | Dropped as a standalone concept. Group coordination is important, but solo travelers also face the fragmentation problem. GoLah supports both solo and group modes instead of limiting scope to groups only. |
| <br> | <br> |

### 2.2 Ideation Boards

You can embed the images directly (recommended) or have links to your ideation board. Don’t feel forced to add as many diagrams as you can for “more marks”. The reviewers want to know how your team put their minds together to create your solution. It can be messy, with a lot of small dropped ideas. Add 1–2 lines under each explaining what it shows.

**Mindmap**

![Mindmap](mindmap.png)

The mind map shows how the team's ideas expanded from the central travel-planning problem into the major GoLah feature areas.

**Problem Tree**

![Problem Tree](problem-tree.png)

The problem tree shows the root causes and consequences of fragmented travel planning and how the problem affects both individual and group travellers.

**IMPORTANT:** You can express this in any way you like, including but not limited to:

1. Mindmaps
2. Problem trees
3. Flowcharts
4. User flows
5. Crazy eights
6. Affinity diagrams
7. SCAMPER grids
8. Fishbone diagrams
9. 5 Whys chains
10. Any other scribbles :)

You can embed images in markdown like so:

```markdown
![Mindmap](mindmap.png)
```

### 2.3 Mentor Consultation

| **Date** | **Mentor** | **Feedback Received** | **What Was Changed** |
| --- | --- | --- | --- |
| <br> | <br> | <br> | <br> |

Even if you disagreed with a piece of feedback, you can say so and explain why. You will not be penalised for doing something against a mentor’s advice, it will still count as engaging with it.

## 3. Design & Prototype

**UI Prototype:** [ Public Link ]

Check that it opens in an incognito window. This can be a link to Figma, Canva, Netlify, Vercel or any other board where you showcase your UI. It can be clickable with hyperlinks or simply ordered screenshots.

We recommend you embed or link 4–8 key screens as images, with a caption on each explaining the interaction.

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
