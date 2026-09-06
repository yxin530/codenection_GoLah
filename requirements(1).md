# GoLah — MVP Requirements

## 1. Product Goal

GoLah is an AI-powered travel companion that brings trip planning, travel information, communication, navigation, travel files, group coordination, and travel assistance into one Progressive Web App.

The MVP should make travel planning and management less fragmented and less stressful for solo travellers and groups.

---

# 2. Functional Requirements

## FR-01 Authentication

The system shall allow users to:

- Create an account.
- Sign in.
- Sign out.
- Maintain authenticated sessions.

Authentication shall use Supabase Auth.

---

## FR-02 Trip Management

Users shall be able to:

- Create a trip.
- Store trip dates.
- Store destinations.
- Manage itinerary information.
- Access their trip from the main GoLah experience.

---

## FR-03 Trip Planning

The system shall support:

- Itinerary creation.
- Itinerary updates.
- Destination planning.
- Activity planning.
- Budget-aware planning.
- Preference-aware planning.
- AI-assisted itinerary generation.

The system should support both solo and group trips.

### Re-planning requirement

The AI may autonomously detect that an itinerary needs to change and prepare a new plan.

However:

> A material itinerary re-plan must not be applied without user approval.

---

## FR-04 Travel Files

Users shall be able to manage relevant travel information including:

- Passport information
- Visa information
- Arrival cards
- Boarding passes
- Hotel reservations
- Travel insurance
- eSIM information
- Emergency contacts
- Other travel documents

The system shall support:

- Document storage
- Document expiry alerts
- Centralized travel information

QR scanning is not part of the current requested Travel Files MVP.

---

## FR-05 Smart Map

The Smart Map shall allow users to:

- Explore destinations and locations.
- View travel-related information.
- Receive AI-assisted route suggestions.
- View live pricing and availability where supported.
- Access booking options where supported.
- View user comments/reviews/photos.
- Share comments/reviews/photos where supported.

The Smart Map should use trip context to make recommendations more relevant.

---

## FR-06 Currency Converter

The system shall provide:

- Live exchange rates.
- Multiple currency support.
- Quick currency conversion.

The currency provider is not selected yet.

---

## FR-07 AI Chat Hub

The system shall support AI interaction in:

### Solo Mode

Users can ask for:

- Travel recommendations
- Trip planning
- Destination suggestions
- Translation
- Travel-related questions
- Context-aware assistance

### Group Mode

The AI shall be able to use relevant shared information including:

- Current itinerary
- Destinations
- Budget
- Travel preferences
- Group decisions
- Travel information
- Travel files

---

## FR-08 AI Trip Planning

The system shall support:

### Destination Discovery

Users can discover destinations based on:

- Interests
- Budget
- Activities
- Travel preferences

### Group Destination Debate

The AI shall be able to compare destination options using group preferences.

### Automatic Bill Splitting

The system shall calculate how much group members owe for shared travel expenses.

---

## FR-09 Group Travel

Groups shall be able to:

- Create shared trips.
- Communicate through group chat.
- Share media.
- Coordinate preferences.
- Manage shared itineraries.
- Split expenses.
- Discuss destinations.
- Interact with GoLah AI using shared trip context.

---

## FR-10 Voice Message Transcription

The MVP shall support the following flow:

```text
Speech
 ↓
STT
 ↓
Transcript stored / attached to message
 ↓
Relevant conversation and trip context
 ↓
GoLah AI
 ↓
Normal text response
```

The system should support:

- Voice messages.
- Speech-to-text transcription.
- Shared conversation and trip context.

STT provider is not selected yet. TTS and voice calls are not required for the current MVP.

---

## FR-11 Crisis Management

The system shall provide assistance for:

- Flight delays.
- Travel plan changes.
- Scams.
- Medical emergencies.
- Accidents.

Potential assistance includes:

- Flight delay detection.
- Rebooking assistance.
- Scam prevention/response guidance.
- Medical emergency assistance.
- Accident support.

The system shall not perform consequential external actions without user confirmation.

---

# 3. AI Agent Requirements

## AR-01 Multi-Agent System

GoLah AI shall use a multi-agent architecture.

Required MVP agents:

- Orchestrator Agent
- Trip Planning Agent
- Travel Information Agent
- Recommendation Agent
- Group Travel Agent
- Finance Agent
- Travel Files Agent
- Crisis Agent

---

## AR-02 Orchestration

The Orchestrator shall:

- Receive AI requests.
- Determine which specialist agent is required.
- Retrieve relevant context.
- Delegate tasks.
- Combine agent results.
- Manage approval requirements.
- Produce the final response.

---

## AR-03 Autonomous Agent Behavior

Agents may autonomously:

- Read relevant trip information.
- Search destinations.
- Retrieve external information.
- Analyze itineraries.
- Compare options.
- Calculate expenses.
- Detect potential disruptions.
- Prepare recommendations.
- Prepare proposed itinerary changes.

---

## AR-04 Re-planning Approval

If an agent proposes a material change to the user's itinerary:

1. Generate the proposed change.
2. Explain what will change.
3. Present the proposal to the user.
4. Wait for approval.
5. Apply the change only after approval.

---

## AR-05 Consequential Action Approval

The system shall require explicit human confirmation before:

- Booking.
- Rebooking.
- Cancellation.
- Payment.
- Financially consequential actions.
- Other external actions with meaningful consequences.

---

## AR-06 Context Awareness

The AI shall be able to retrieve relevant:

- Trip context.
- User context.
- Group context.
- Chat context.
- Travel files context.

The system should avoid sending irrelevant context to the AI.

---

## AR-07 Tool Calling

Agents shall interact with application functionality and external services through controlled tools.

Tools may provide:

- Map information.
- Flight information.
- Currency information.
- Translation.
- Booking information.
- Itinerary operations.
- User preferences.
- Group data.
- Expense calculations.
- Travel-file information.

---

## AR-08 Tool Result Verification

Agents shall not claim an external action succeeded unless the corresponding tool/API confirms success.

---

# 4. Non-Functional Requirements

## NFR-01 Security

The system shall:

- Keep secrets server-side.
- Authenticate requests.
- Authorize access to trips and groups.
- Protect travel files.
- Restrict AI access to relevant data.
- Validate tool inputs.
- Require confirmation for consequential actions.

---

## NFR-02 Reliability

If an external service fails:

- The user should receive a clear error or fallback response.
- The system should not silently modify the itinerary.
- Failed actions should not be reported as successful.

---

## NFR-03 Maintainability

The system should keep:

- Frontend logic
- Backend logic
- AI orchestration
- Agents
- Context retrieval
- External API integrations

reasonably separated.

External providers should be replaceable without redesigning the entire application.

---

## NFR-04 Performance

The application should avoid unnecessary AI calls.

Context should be retrieved only when relevant.

The system should avoid sending complete conversation histories or unrelated travel data when a smaller context is sufficient.

---

## NFR-05 Progressive Web App

The MVP shall be usable through a modern browser and installable as a PWA where supported.

---

## NFR-06 Realtime

Realtime functionality should support:

- Group chat.
- Shared trip updates.
- Relevant AI response events.
- Voice-message processing.

---

# 5. Technical Requirements

## Frontend

- React
- Next.js
- TypeScript
- Tailwind CSS
- PWA

## Backend

- Node.js
- Next.js API Routes

## Database / Storage

- Supabase
- PostgreSQL
- Supabase Storage

## Authentication

- Supabase Auth

## Maps

- Maps API: provider TBD

## Realtime

- Socket.io and/or Supabase Realtime

## AI

- LLM
- STT
- AI Tool Calling
- AI Context Management

Providers are intentionally undecided.

## External Services

Potential integrations:

- Flight information APIs
- Currency exchange APIs
- Maps APIs
- Translation services
- Booking services

---

# 6. Data Requirements

The MVP should support data concepts for:

### Users

- Account identity
- Travel preferences
- Interests

### Trips

- Trip details
- Destinations
- Dates
- Itinerary
- Budget

### Groups

- Members
- Preferences
- Decisions
- Shared trip information

### Expenses

- Expense records
- Participants
- Amounts
- Split calculations

### Travel Files

- Structured travel information
- Uploaded documents
- Expiry information
- Emergency contacts

### Chat

- Solo conversations
- Group conversations
- Relevant conversation context

---

# 7. AI Safety / Approval Requirements

The coding agent must implement approval boundaries as first-class application behavior.

### Allowed without approval

```text
Read data
Search
Analyze
Calculate
Recommend
Prepare changes
```

### Requires approval

```text
Apply itinerary re-plan
Book
Rebook
Cancel
Pay
Execute consequential external action
```

The approval state should be explicit rather than inferred from natural-language responses.

---

# 8. MVP Acceptance Criteria

The MVP should be considered functionally aligned when:

1. A user can authenticate.
2. A user can create and manage a trip.
3. A user can manage travel information/files.
4. A user can use the Smart Map.
5. A user can convert currencies.
6. A user can communicate with GoLah AI.
7. The AI can retrieve relevant trip context.
8. Group travel data can be shared.
9. Group expenses can be split.
10. Voice messages can be transcribed through STT and used as context for normal text-based AI responses.
11. Crisis-related information can be surfaced.
12. AI agents can work as a coordinated multi-agent system.
13. AI can autonomously analyze and prepare actions.
14. Material itinerary re-planning requires user approval.
15. Consequential external actions require human confirmation.
16. The system does not claim failed external actions succeeded.

---

# 9. Out of Scope for Current MVP

The following should not be required for the current implementation:

- Native iOS/Android applications.
- Apple Wallet integration.
- Google Wallet integration.
- Predictive itinerary planning.
- Automatic price-drop alert systems.
- AI visa checking.
- AI-generated packing lists.
- Advanced long-term AI memory.
- Additional travel integrations not required by the current MVP.

These can be added later without changing the core product concept.
