# GoLah — Agentic Architecture

## 1. Purpose

GoLah is an AI-powered travel companion delivered as a Progressive Web App (PWA). The MVP brings trip planning, travel information, communication, navigation, travel files, currency information, group travel, and travel assistance into one platform.

The agentic layer should make the trip context useful through a coordinated multi-agent system rather than treating the AI as a standalone chatbot.

The architecture is intentionally MVP-focused. LLM, STT, and TTS providers are left provider-agnostic until they are selected.

---

## 2. Agentic Design Principles

1. **Multi-agent architecture**
   - A central Orchestrator Agent coordinates specialized agents.
   - Specialized agents own specific travel domains.

2. **Context-aware assistance**
   - Agents should use relevant trip, user, group, chat, and travel-file context.
   - The AI should not treat every question as an isolated conversation.

3. **Autonomous operation**
   - Agents may inspect information, call read-only tools, reason over trip data, detect problems, and prepare recommendations without asking for approval at every step.
   - Consequential actions require human confirmation.

4. **Human approval for re-planning**
   - If an agent wants to materially re-plan an itinerary, it must present the proposed changes and obtain user approval before applying them.

5. **Human confirmation for consequential actions**
   - Booking, cancellation, payment, rebooking, or other actions with external consequences must require explicit user confirmation.

6. **Tool-first execution**
   - Agents should use application tools and APIs for current or structured information instead of relying on model memory.

7. **Least-context principle**
   - Retrieve only the context needed for the current task.

8. **MVP scope**
   - Build the architecture needed for the current GoLah version first.
   - Future features are not implementation requirements for the MVP.

---

## 3. High-Level Architecture

```text
                         ┌─────────────────────────┐
                         │        GoLah PWA        │
                         │                         │
                         │ Trip Planning           │
                         │ Travel Files            │
                         │ Smart Map                │
                         │ Currency                 │
                         │ Chat & Voice             │
                         │ Group Travel             │
                         │ Crisis Management        │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │     Backend / API        │
                         │                         │
                         │ Auth                     │
                         │ Trip Data                │
                         │ Chat                     │
                         │ Realtime                 │
                         │ File Access              │
                         │ Tool Gateway             │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │   GoLah AI Orchestrator  │
                         └────────────┬────────────┘
                                      │
             ┌────────────────────────┼────────────────────────┐
             │                        │                        │
             ▼                        ▼                        ▼
       Trip Planning             Travel Info              Group Agent
          Agent                     Agent
             │                        │                        │
             ├──────────────┐         ├──────────────┐         ├──────────────┐
             ▼              ▼         ▼              ▼         ▼              ▼
       Recommendation     Finance   Map/Places      Flight   Preferences   Expenses
          Agent             Agent      Tools          Tools     / Decisions
             │
             ▼
       Crisis Agent

                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │      Context Layer      │
                         │                         │
                         │ Trip Context             │
                         │ User Context             │
                         │ Group Context            │
                         │ Chat Context             │
                         │ Travel Files Context    │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │     AI Model Layer       │
                         │                         │
                         │ LLM                     │
                         │ STT                     │
                         │ TTS                     │
                         │ Tool Calling            │
                         └─────────────────────────┘
```

---

## 4. Agent Roles

### 4.1 Orchestrator Agent

The Orchestrator is the entry point for AI requests.

Responsibilities:

- Understand the user's request.
- Identify which specialist agent(s) are required.
- Retrieve or request relevant context.
- Delegate work.
- Combine specialist results.
- Decide whether the response is informational, a recommendation, or an action.
- Enforce approval requirements.
- Return a clear user-facing response.

The Orchestrator should not directly own every travel-domain operation.

---

### 4.2 Trip Planning Agent

Responsibilities:

- Build and update itineraries.
- Consider destinations, activities, schedules, budgets, and preferences.
- Work with recommendation and travel-information agents.
- Identify itinerary conflicts.
- Produce proposed itinerary changes.

Important rule:

> The agent may reason and prepare a new itinerary autonomously, but applying a material re-plan requires user approval.

Example:

```text
Flight delay detected
        ↓
Trip Planning Agent checks affected itinerary
        ↓
Generates revised schedule
        ↓
Shows proposed changes
        ↓
User approves
        ↓
Changes are applied
```

---

### 4.3 Travel Information Agent

Responsibilities:

- Retrieve travel-related information.
- Work with flight, map, destination, currency, translation, and booking-related tools.
- Provide current information when external APIs are available.
- Pass structured information to other agents.

It should distinguish between:
- known application data,
- external API data,
- model-generated recommendations.

---

### 4.4 Recommendation Agent

Responsibilities:

- Recommend destinations, activities, places, and routes.
- Consider interests, budget, preferences, itinerary, and group context.
- Support destination comparison.
- Support Smart Map recommendations.

The recommendation agent should use available trip context rather than making generic recommendations when contextual information exists.

---

### 4.5 Group Travel Agent

Responsibilities:

- Coordinate group preferences.
- Analyze group decisions.
- Work with shared itineraries.
- Assist with group activity and destination decisions.
- Support shared trip context.

Example:

```text
Alice → beaches
Bob → nightlife + food
Carol → budget-friendly

        ↓

Group Travel Agent

        ↓

Compare options

        ↓

Group recommendation
```

---

### 4.6 Finance Agent

Responsibilities:

- Assist with travel budgets.
- Calculate shared expenses.
- Support automatic bill splitting.
- Use currency information when required.
- Explain expense calculations.

Financially consequential actions should still require confirmation where applicable.

---

### 4.7 Travel Files Agent

Responsibilities:

- Work with structured travel information.
- Retrieve relevant passport, visa, arrival-card, boarding-pass, hotel, insurance, eSIM, and emergency-contact information.
- Handle document expiry information.
- Provide relevant travel-file context to other agents.

The agent should avoid exposing unrelated sensitive travel-file information when it is not needed for the task.

---

### 4.8 Crisis Agent

Responsibilities:

- Detect and respond to travel disruptions.
- Assist with flight delays and plan changes.
- Provide scam-related assistance.
- Assist during medical emergencies and accidents.
- Coordinate with Travel Information and Trip Planning agents.

The Crisis Agent can autonomously gather information and prepare options, but external consequential actions require confirmation.

For emergencies, the system should clearly distinguish assistance from professional emergency services.

---

### 4.9 Voice Agent

Responsibilities:

- Coordinate voice input/output.
- Convert speech into usable conversation context through STT.
- Send relevant context to the Orchestrator.
- Return AI responses through TTS.
- Support AI interaction during group voice conversations.

```text
User Speech
    ↓
STT
    ↓
Conversation Context
    ↓
Orchestrator
    ↓
Specialist Agent(s)
    ↓
LLM Response
    ↓
TTS
    ↓
AI Voice
```

---

## 5. Context Architecture

GoLah's AI context should be assembled dynamically.

### Context Sources

```text
Trip Context
├── Destination
├── Dates
├── Itinerary
├── Activities
└── Budget

User Context
├── Preferences
├── Interests
└── Relevant travel needs

Group Context
├── Members
├── Preferences
├── Decisions
└── Shared budget

Chat Context
├── Recent conversation
└── Relevant decisions

Travel Files Context
├── Visa information
├── Passport information
├── Bookings
├── eSIM information
└── Emergency contacts
```

The context layer should retrieve only information relevant to the current request.

---

## 6. Tool Architecture

Agents interact with external services through controlled application tools.

Possible tool groups:

### Maps / Places
- Destination lookup
- Place search
- Route suggestions
- Location information
- Pricing/availability where supported

### Flights
- Flight information
- Delay/status information
- Rebooking information where supported

### Currency
- Exchange rates
- Currency conversion

### Translation
- Text translation

### Booking
- Booking lookup
- Booking availability
- Booking/rebooking actions

### Travel Data
- Itinerary access
- User preferences
- Group preferences
- Expense data
- Travel-file data

Agents should not directly access arbitrary backend data. Tool access should be scoped by agent permissions.

---

## 7. Approval / Action Policy

### Read-only actions

May execute autonomously:

- Read itinerary
- Read preferences
- Search destinations
- Search places
- Retrieve flight information
- Retrieve currency rates
- Read group context
- Calculate expenses
- Generate recommendations

### Proposed actions

Require user approval before committing:

- Material itinerary re-planning
- Changing scheduled activities
- Changing group itinerary
- Major budget changes

### Consequential actions

Always require explicit confirmation:

- Booking
- Rebooking
- Cancellation
- Payment
- Any external transaction
- Any action that creates a financial or contractual commitment

Approval flow:

```text
Agent prepares action
       ↓
Explain proposed action
       ↓
Ask user for confirmation
       ↓
User confirms
       ↓
Execute tool
       ↓
Verify result
       ↓
Report result
```

---

## 8. Multi-Agent Communication

Specialist agents should return structured results to the Orchestrator.

Recommended result structure:

```text
AgentResult
├── status
├── summary
├── data
├── recommendations
├── proposedActions
├── requiresApproval
├── approvalReason
├── toolResults
└── errors
```

This allows the Orchestrator to combine multiple agents without depending on fragile free-form text.

---

## 9. Example Agent Workflows

### Example A — Context-aware question

User:

> Are we free tomorrow afternoon?

```text
User
 ↓
Orchestrator
 ↓
Context Layer
 ├── Trip Context
 ├── Itinerary
 └── Group Context
 ↓
Trip Planning Agent
 ↓
LLM
 ↓
Answer
```

### Example B — Flight delay

```text
Flight status update
 ↓
Crisis Agent
 ↓
Retrieve itinerary
 ↓
Identify affected activities
 ↓
Travel Information Agent
 ↓
Find alternatives
 ↓
Trip Planning Agent
 ↓
Generate revised itinerary
 ↓
Ask user for approval
 ↓
User approves
 ↓
Apply changes
```

### Example C — Destination decision

```text
Group preferences
 ↓
Group Travel Agent
 ↓
Recommendation Agent
 ↓
Compare destinations
 ↓
Return recommendation
```

### Example D — Rebooking

```text
Flight disruption
 ↓
Crisis Agent
 ↓
Find alternative flights
 ↓
Present options
 ↓
User selects / approves
 ↓
Booking tool
 ↓
Verify booking
 ↓
Update itinerary
```

---

## 10. Failure Handling

Agents must handle:

- External API unavailable
- Missing trip context
- Conflicting data
- Invalid tool result
- Booking failure
- Timeout
- Model failure
- Insufficient permissions
- User rejection of an action

The system should fail safely:

- Do not silently make consequential changes.
- Do not claim an action succeeded if the tool did not confirm success.
- Explain when information is unavailable.
- Preserve the existing itinerary if a proposed re-plan is rejected or fails.

---

## 11. MVP Boundary

The MVP agentic system should prioritize:

1. Orchestrator Agent
2. Trip Planning Agent
3. Travel Information Agent
4. Recommendation Agent
5. Group Travel Agent
6. Finance Agent
7. Travel Files Agent
8. Crisis Agent
9. Voice Agent where voice functionality is implemented

Future improvements such as predictive itinerary planning, price-drop alerts, AI visa checking, AI-generated packing lists, advanced conversation memory, native mobile applications, and wallet integrations are outside the MVP implementation boundary.
