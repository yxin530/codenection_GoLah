# GoLah — Architecture

## 1. Overview

GoLah is an AI-powered travel companion built as a Progressive Web App (PWA).

The MVP provides a unified platform for:

- Trip planning
- Travel files
- Smart Map
- Currency conversion
- AI Chat Hub
- Group travel
- Voice communication
- Crisis management
- AI-powered travel assistance

The system is designed around the trip as the central object rather than around separate travel applications.

---

## 2. Architecture Goals

### Primary goals

- Centralize travel information.
- Support both solo and group travel.
- Share relevant trip context across modules.
- Allow AI to interact with application data through tools.
- Support real-time communication.
- Keep consequential AI actions behind human confirmation.
- Provide a foundation that can be extended later without overbuilding the MVP.

### Non-goals for MVP

The architecture does not require:

- Native mobile applications
- Wallet integrations
- Predictive itinerary systems
- Advanced price-drop prediction
- AI visa checking
- AI-generated packing-list systems
- Fully autonomous financial transactions

---

## 3. System Architecture

```text
┌──────────────────────────────────────────────────────────────┐
│                         GoLah PWA                            │
│                                                              │
│  Travel Files │ Smart Map │ Currency │ Chat │ Trip Planning │
│  Group Travel │ Voice     │ Crisis   │ AI Assistant          │
└──────────────────────────────┬───────────────────────────────┘
                               │ HTTPS / WebSocket
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                        Backend API                            │
│                                                              │
│ Authentication │ Users │ Trips │ Itineraries │ Files         │
│ Chat │ Voice │ Groups │ Expenses │ AI Orchestration            │
│ External API Gateway │ Tool Authorization                     │
└──────────────┬───────────────────────────┬───────────────────┘
               │                           │
               ▼                           ▼
┌──────────────────────────┐     ┌─────────────────────────────┐
│        Supabase          │     │       External APIs          │
│                          │     │                             │
│ PostgreSQL               │     │ Maps                        │
│ Authentication           │     │ Flights                     │
│ Storage                  │     │ Currency                    │
│ Realtime                 │     │ Translation                 │
└──────────────────────────┘     │ Booking                     │
                                 └─────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────────────────────┐
│                       GoLah AI Layer                          │
│                                                              │
│ Orchestrator                                                 │
│ ├── Trip Planning Agent                                      │
│ ├── Travel Information Agent                                 │
│ ├── Recommendation Agent                                     │
│ ├── Group Travel Agent                                       │
│ ├── Finance Agent                                             │
│ ├── Travel Files Agent                                       │
│ ├── Crisis Agent                                              │
│ └── Voice Agent                                               │
│                                                              │
│ Context Layer │ Tool Calling │ Approval Management            │
└──────────────────────────────────────────────────────────────┘
```

---

## 4. Frontend

### Technology

- React
- Next.js
- TypeScript
- Tailwind CSS
- Progressive Web App

### Responsibilities

The frontend provides the user-facing experience for:

- Authentication
- Trip creation and management
- Itinerary management
- Travel files
- Smart Map
- Currency conversion
- AI Chat Hub
- Group chat
- Voice interaction
- Expense splitting
- Crisis assistance
- AI approval prompts

The frontend should not contain secrets or privileged API credentials.

---

## 5. Backend

### Technology

- Node.js
- Next.js API Routes

### Responsibilities

The backend acts as the central integration layer.

It should handle:

- Authentication
- User and trip data
- Group data
- Itinerary data
- File management
- Chat
- Voice/realtime coordination
- AI orchestration
- AI context retrieval
- External API access
- Tool authorization
- Approval-controlled actions

The backend should prevent direct client access to privileged external APIs where credentials must remain secret.

---

## 6. Database and Storage

### Supabase

Use Supabase for:

- PostgreSQL database
- Authentication
- Storage
- Realtime

### Core data concepts

The exact schema can evolve, but the MVP should support concepts equivalent to:

```text
User
 ├── Preferences
 └── Travel Information

Trip
 ├── Members
 ├── Destinations
 ├── Itinerary
 ├── Budget
 ├── Expenses
 ├── Travel Files
 └── Chat Context

Group
 ├── Members
 ├── Preferences
 ├── Decisions
 └── Shared Trip Data
```

---

## 7. AI Architecture

The AI is a feature layer inside GoLah rather than the entire application.

```text
User Request
    ↓
AI Orchestrator
    ↓
Context Retrieval
    ↓
Agent Selection
    ↓
Specialist Agent
    ↓
Tool Calls
    ↓
External / Application Data
    ↓
Agent Reasoning
    ↓
Approval Check
    ↓
Action or Response
```

The AI should use relevant application context before generating contextual responses.

---

## 8. AI Context Layer

Supported context categories:

- Trip Context
- User Context
- Chat Context
- Group Context
- Travel Files Context

Example:

```text
"Are we free tomorrow afternoon?"
             ↓
       Context Layer
             ↓
 ┌───────────┼────────────┐
 │           │            │
Trip       Itinerary     Group
Context                  Context
             ↓
          AI Model
             ↓
    Contextual Response
```

---

## 9. Smart Map Architecture

The Smart Map combines navigation and travel planning.

MVP capabilities include:

- Destination exploration
- Travel-related location information
- AI route suggestions
- Live pricing and availability where supported
- Booking options where supported
- User-generated comments/reviews/photos

The Smart Map should integrate with trip context so recommendations can reflect the current trip.

---

## 10. Travel Files Architecture

Travel Files provides a centralized space for:

- Passport information
- Visa information
- Arrival cards
- Boarding passes
- Hotel reservations
- Travel insurance
- eSIM information
- Emergency contacts
- Other travel documents
- Document expiry alerts

Structured travel information should be separated from uploaded files where practical so AI tools can retrieve relevant information without processing the entire file every time.

---

## 11. Group Travel Architecture

Group Travel supports:

- Shared trips
- Group chat
- Media sharing
- Preference coordination
- Shared itineraries
- Expense splitting
- Destination discussions
- Group decisions
- AI interaction using shared trip context

Group permissions should distinguish between:

- Viewing shared information
- Editing shared trip information
- Approving major changes

---

## 12. Voice Architecture

The README specifies:

- WebRTC
- Socket.io / Supabase Realtime
- STT
- LLM
- TTS

Provider selection is intentionally left blank for now.

```text
User A ─┐
User B ─┼──> Voice Room
User C ─┘        │
                 ▼
                STT
                 │
                 ▼
        Conversation Context
                 │
                 ▼
           GoLah AI
                 │
                 ▼
                TTS
                 │
                 ▼
             AI Voice
```

The AI should respond when addressed and should use relevant recent conversation context rather than permanently storing every second of a voice conversation.

---

## 13. Currency Architecture

The Currency Converter provides:

- Live exchange rates
- Multiple currencies
- Quick conversion

Currency data should come from an external currency provider through the backend.

Provider is intentionally unspecified for MVP.

---

## 14. Crisis Management Architecture

Crisis Management covers:

- Flight delays
- Travel plan changes
- Scams
- Medical emergencies
- Accidents
- Rebooking assistance

The system should gather relevant information and provide assistance.

Actions with external consequences must follow the approval policy.

---

## 15. External API Gateway

External services should be accessed through backend-controlled integrations.

```text
GoLah Feature / Agent
          ↓
     Backend Tool
          ↓
    External API
          ↓
    Normalized Data
          ↓
     GoLah / Agent
```

This allows providers to be replaced later without rewriting the entire application.

Providers are currently unspecified for:

- LLM
- STT
- TTS
- Maps
- Flights
- Currency
- Translation
- Booking

---

## 16. Security Boundaries

The architecture must:

- Keep API secrets on the server.
- Authenticate users.
- Authorize access to trips and groups.
- Scope access to travel files.
- Avoid exposing unrelated personal travel information.
- Require confirmation before consequential actions.
- Validate tool inputs and outputs.
- Never claim an external action succeeded without confirmation from the external service.

---

## 17. Realtime Architecture

Realtime functionality can use:

- WebRTC for voice communication.
- Socket.io and/or Supabase Realtime for realtime application events.

Realtime events may include:

- Group chat messages
- Shared itinerary updates
- Group decisions
- Expense updates
- Voice state
- AI response events

---

## 18. MVP Architecture Boundary

Build the current GoLah experience first.

Core MVP modules:

```text
GoLah
├── Authentication
├── Trip Management
├── Trip Planning
├── Travel Files
├── Smart Map
├── Currency Converter
├── AI Chat Hub
├── Group Travel
├── Voice Communication
├── Crisis Management
└── AI Agent Layer
```

Future improvements documented in the README should not block the MVP.

---

## 19. Architecture Principle

The core architectural idea is:

> The trip is the central object, and the AI is the contextual intelligence layer that helps users use the information inside that trip.
