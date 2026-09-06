# GoLah — Coding Agent Instructions

## 1. What You Are Building

GoLah is an AI-powered travel companion built as a Progressive Web App.

The core product idea is:

> One app. One trip. Less planning, more travelling.

GoLah brings trip planning, travel information, communication, navigation, travel files, group coordination, currency conversion, and travel assistance into one platform.

The trip should be treated as the central object of the application.

The AI is a contextual intelligence layer across the application, not a standalone chatbot.

---

# 2. Current Development Priority

Build the **MVP/current version only**.

Do not implement future features simply because they appear in the README's future-improvements section.

Prioritize:

1. Authentication
2. Trip management
3. Trip planning
4. Travel files
5. Smart Map
6. Currency converter
7. AI Chat Hub
8. Group travel
9. Voice-message transcription
10. Crisis management
11. Multi-agent AI
12. Shared AI context

---

# 3. Core Product Model

Think of GoLah as:

```text
                    GoLah
                      │
       ┌──────────────┼──────────────┐
       │              │              │
   Plan Trip      Manage Trip     Travel
       │              │              │
       └──────────────┼──────────────┘
                      │
                Shared Context
                      │
                  GoLah AI
                      │
       ┌──────────────┼──────────────┐
       │              │              │
      Solo          Group          Crisis
      Help          Travel         Support
```

The application should avoid recreating the same information in disconnected modules.

---

# 4. AI Architecture

Use a **multi-agent architecture**.

```text
User
 ↓
Orchestrator Agent
 ↓
Select Specialist
 ↓
Retrieve Context
 ↓
Use Tools
 ↓
Reason
 ↓
Approval Check
 ↓
Response / Action
```

Required specialist agents:

- Trip Planning Agent
- Travel Information Agent
- Recommendation Agent
- Group Travel Agent
- Finance Agent
- Travel Files Agent
- Crisis Agent

---

# 5. Agent Behavior

Agents are allowed to be autonomous.

They can:

- Retrieve information.
- Search external services.
- Analyze the user's trip.
- Compare options.
- Detect problems.
- Calculate expenses.
- Prepare recommendations.
- Prepare itinerary changes.

However, autonomy has a strict boundary.

## Re-planning

If the AI wants to materially re-plan the itinerary:

```text
Detect problem
 ↓
Generate new plan
 ↓
Explain changes
 ↓
Ask user for approval
 ↓
Only then apply changes
```

Never silently replace an approved itinerary.

## Consequential actions

Always ask for confirmation before:

- Booking
- Rebooking
- Cancellation
- Payment
- Financial commitments
- Other consequential external actions

---

# 6. Context

The AI should use relevant context from:

```text
Trip Context
User Context
Group Context
Chat Context
Travel Files Context
```

Example:

User:

> Are we free tomorrow afternoon?

Do not answer only from general model knowledge.

Retrieve:

```text
Trip
 ↓
Itinerary
 ↓
Group context if relevant
 ↓
AI
```

Then answer using the actual trip.

---

# 7. Smart Map

The Smart Map is more than a navigation screen.

It should support:

- Destination exploration.
- Location information.
- AI route suggestions.
- Live pricing and availability where supported.
- Booking options where supported.
- Comments.
- Reviews.
- Photos.
- Sharing user-generated travel information.

Do not include QR scanning under Travel Files.

---

# 8. Travel Files

Travel Files should support:

- Passport
- Visa
- Arrival cards
- Boarding passes
- Hotel reservations
- Travel insurance
- eSIM information
- Emergency contacts
- Other travel documents
- Expiry alerts

Keep structured travel information separate from uploaded files where practical.

The AI should retrieve structured information when possible rather than unnecessarily processing complete uploaded documents.

---

# 9. Group Travel

Group functionality should support:

- Shared trips
- Group chat
- Media sharing
- Preferences
- Shared itineraries
- Group decisions
- Shared budget
- Expense splitting
- AI using shared trip context

The system must distinguish between information that is safe to read and actions that require permission/approval.

---

# 10. Voice Messages

The intended flow is:

```text
User voice message
 ↓
STT
 ↓
Conversation Context
 ↓
GoLah AI
 ↓
Normal text response
```

Voice messages are transcribed to text and handled through normal text-based AI chat. Voice calls, WebRTC, TTS, and AI-generated voice replies are outside the current MVP.

The LLM/STT providers are intentionally **not selected yet**.

Do not hard-code a provider into the architecture unless explicitly instructed later.

---

# 11. External Integrations

External APIs should normally be accessed through the backend/tool layer.

Potential services:

- Maps
- Flights
- Currency
- Translation
- Booking
- AI

Keep provider-specific implementation isolated so providers can be changed later.

---

# 12. Security Rules

Never:

- Put private API keys in frontend code.
- Give agents unrestricted database access.
- Expose unrelated travel files.
- Claim an external action succeeded without tool confirmation.
- Apply a material itinerary re-plan without user approval.
- Perform booking/payment/rebooking/cancellation without confirmation.

---

# 13. Coding Style / Architecture Rules

When implementing features:

1. Keep frontend and backend responsibilities separated.
2. Keep AI orchestration separate from individual agents.
3. Keep agents focused on their domain.
4. Keep external API integrations behind backend tools.
5. Prefer structured data between agents.
6. Avoid duplicating trip data.
7. Keep approval state explicit.
8. Handle API failures safely.
9. Do not invent unavailable external data.
10. Keep the implementation MVP-sized.

---

# 14. Agent Result Contract

When possible, specialist agents should return a structured result similar to:

```text
{
  status,
  summary,
  data,
  recommendations,
  proposedActions,
  requiresApproval,
  approvalReason,
  toolResults,
  errors
}
```

The exact implementation can use TypeScript interfaces/types.

---

# 15. Failure Behavior

If an API or tool fails:

- Do not pretend it worked.
- Return a useful error.
- Preserve existing data.
- Do not partially apply dangerous actions.
- Allow the user to retry where appropriate.

If context is missing:

- Retrieve it if possible.
- If it cannot be retrieved, clearly state that the answer may be limited.

---

# 16. MVP Definition

The goal is not to build a perfect autonomous travel super-agent.

The goal is to build a working MVP where:

```text
Trip
 ↓
Shared Data
 ↓
Context
 ↓
Multi-Agent AI
 ↓
Useful Assistance
```

works reliably.

The system should demonstrate that GoLah can unify travel information and use it intelligently.

---

# 17. Future Features

Do not implement these unless explicitly requested later:

- Predictive itinerary planning
- Automatic price-drop alerts
- AI visa checking
- AI-generated packing lists
- Advanced AI memory
- Native mobile applications
- Apple Wallet
- Google Wallet
- Additional booking integrations

---

# 18. Source of Truth

The GoLah README defines the product scope.

When implementing, preserve the product terminology and current MVP scope described in the README and these architecture/requirements documents.

If a requirement is ambiguous or conflicts with an explicit user instruction, ask for clarification rather than silently inventing behavior.
