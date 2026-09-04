# codenection_GoLah

# ✈️ GoLah

> **One app. One trip. Less planning, more travelling.**

GoLah is an AI-powered travel companion built as a Progressive Web App (PWA) that brings the essential parts of planning and managing a trip into one place.

Instead of switching between multiple applications for travel documents, maps, currency conversion, trip planning, group communication, and travel assistance, GoLah provides a unified travel experience where travellers can manage their trip from a single platform.

GoLah is designed for both solo travellers and groups, helping users plan trips, coordinate preferences, manage travel information, communicate with travel companions, and adapt when plans change.

---

# 1. Description

GoLah is an AI-powered travel companion designed to simplify the entire travel experience by bringing trip planning, travel information, communication, navigation, and travel assistance into one platform.

Planning a trip often requires travellers to use several different applications for flights, hotels, maps, currency conversion, travel documents, group communication, and itinerary management.

GoLah aims to reduce this fragmentation by providing a centralized travel platform where users can manage their trip and interact with an AI assistant that understands their travel context.

For group travel, GoLah helps travellers coordinate schedules, budgets, preferences, activities, and expenses in one shared environment.

The AI assistant acts as an additional layer across the platform, allowing users to interact with their trip information through natural language and receive context-aware assistance.

Whether travelling alone, with friends, or with family, GoLah aims to make planning faster, simpler, and less stressful.

---

# 2. Table of Contents

- [1. Description](#1-description)
- [2. Table of Contents](#2-table-of-contents)
- [3. Problem Statement](#3-problem-statement)
- [4. Inspiration](#4-inspiration)
- [5. What It Does](#5-what-it-does)
  - [Travel Files Management](#travel-files-management)
  - [Smart Map](#smart-map)
  - [Currency Converter](#currency-converter)
  - [AI Chat Hub](#ai-chat-hub)
  - [AI Trip Planning](#ai-trip-planning)
  - [Group Travel](#group-travel)
  - [Voice Communication](#voice-communication)
  - [Crisis Management](#crisis-management)
- [6. Architecture](#6-architecture)
- [7. Tech Stack](#7-tech-stack)
- [8. Prerequisites](#8-prerequisites)

---

# 3. Problem Statement

## Lifestyle Track: Planning an Escape

Planning a trip means dealing with flights, places to stay, budgets, activities, and whatever everyone in the group actually wants to do.

Before the trip even begins, travellers often need to gather information from several different applications and coordinate everything through a group chat.

Most travel applications focus on only one part of the travel experience, such as bookings, budgeting, navigation, or itineraries.

As a result, travellers have to manually piece everything together themselves.

This becomes even more difficult for group trips because everyone may have different:

- Schedules
- Budgets
- Interests
- Activity preferences
- Travel priorities

Getting everyone's preferences to line up can be difficult, and when something changes during the trip, such as a flight delay or an unavailable activity, travellers often have to manually reorganize their plans again.

## What the Solution Should Solve

GoLah aims to provide a single platform that helps travellers plan and manage a trip from start to finish.

The platform aims to help users:

- Build and manage itineraries
- Plan around budgets
- Coordinate group preferences
- Discover destinations
- Manage travel documents
- Navigate destinations
- Communicate with travel companions
- Split travel expenses
- Access currency information
- Adjust plans when circumstances change
- Receive AI-powered travel assistance

The goal is to make trip planning faster and less stressful while supporting both solo and group travel.

---

# 4. Inspiration

The inspiration behind GoLah comes from a simple problem:

> **Why does planning one trip require so many different applications?**

A typical trip can involve:

```text
        Flight App
             ↓
        Hotel App
             ↓
           Maps
             ↓
    Currency Converter
             ↓
         Chat App
             ↓
    Travel Documents
             ↓
     Translation App
             ↓
     Booking Services
```

For a group trip, the problem becomes even more complicated.

Travellers have to coordinate their individual schedules, budgets, preferences, and decisions while keeping track of information across different platforms.

We wanted to create a system where the trip itself becomes the central focus rather than the individual applications used to manage it.

Instead of forcing travellers to move between different services, GoLah brings the essential travel functions into one place.

The AI component was introduced to make this unified information more useful.

Rather than acting as a standalone chatbot, GoLah AI can use relevant information from the user's trip, group conversation, itinerary, and travel files to provide more contextual assistance.

For example, instead of asking an AI:

> "What should I do in Bangkok?"

a traveller could ask:

> "What can we do tomorrow afternoon?"

GoLah can use the group's existing itinerary and trip context to provide a more relevant response.

This is the core idea behind GoLah:

> **Bring the trip together, then make the information within it easier to use.**

---

# 5. What It Does

GoLah combines multiple travel-related functions into one Progressive Web App.

## 🔐 Travel Files Management

GoLah provides a centralized space for travellers to store and access important travel information and documents.

Users can manage:

- Passport information
- Visa information
- Arrival cards
- Boarding passes
- Hotel reservations
- Travel insurance
- eSIM information
- Emergency contacts
- Other travel documents

Additional functionality includes:

- Document expiry alerts
- Centralized travel information

Travel information is separated from uploaded document files so that structured information can be accessed directly when required.

For example, GoLah AI can use relevant travel information when answering questions about a user's trip.

---

## 🗺️ Smart Map

The Smart Map combines navigation with travel planning.

Users can:

- Explore destinations and locations
- View travel-related information
- Receive AI-assisted route suggestions
- View live pricing information
- Access booking options
- Interact with locations directly from the map

The Smart Map can also work together with the user's existing trip information to provide more relevant recommendations.

---

## 💱 Currency Converter

GoLah provides a built-in currency converter so travellers do not need to switch to another application while travelling.

Features include:

- Live currency exchange rates
- Multiple currency support
- Quick currency conversion

This allows users to check prices and manage travel expenses directly within GoLah.

---

## 💬 AI Chat Hub

The AI Chat Hub combines communication and AI assistance in one place.

### Solo Mode

Travellers can communicate directly with GoLah AI for:

- Travel recommendations
- Trip planning
- Destination suggestions
- Translation
- Travel-related questions
- Context-aware assistance

The AI can use relevant information from the user's trip when generating responses.

### Group Mode

Groups can communicate within a shared travel conversation.

GoLah AI can use relevant shared trip information such as:

- Current itinerary
- Destinations
- Budget
- Travel preferences
- Group decisions
- Travel information
- Travel files

This allows the AI to provide responses based on the group's current trip context rather than treating every question as an isolated conversation.

---

## 🎯 AI Trip Planning

GoLah uses AI to make trip planning more interactive and personalized.

### Swipe-Based Destination Discovery

Users can explore potential destinations using a swipe-based interface.

Destinations can be evaluated based on factors such as:

- Interests
- Budget
- Activities
- Travel preferences

This allows travellers to quickly discover destinations that match their interests.

### AI Destination Debate

For group travel, GoLah AI can help compare different destinations and assist the group in reaching a decision.

For example:

```text
Group Preferences

Alice  → Beaches + Relaxing
Bob    → Nightlife + Food
Carol  → Budget-friendly

             ↓

         GoLah AI

             ↓

     Compare Destinations

             ↓

      Group Recommendation
```

The AI can consider different group members' preferences when comparing destinations.

### Automatic Bill Splitting

GoLah can help groups divide travel expenses and calculate how much each member owes.

This allows users to manage shared travel expenses without requiring a separate application.

---

## 👥 Group Travel

GoLah is designed to support the additional complexity of travelling with other people.

Groups can:

- Create shared trips
- Communicate through group chat
- Share media
- Coordinate preferences
- Manage shared itineraries
- Split expenses
- Discuss destinations
- Interact with GoLah AI using shared trip context

The shared context allows GoLah AI to understand the group's current plans and provide more relevant recommendations.

---

## 📞 Voice Communication

GoLah extends group communication beyond text.

The Chat Hub can support:

- Voice messages
- Voice calls
- AI-assisted voice interactions
- Shared conversation context

During a group voice conversation, speech can be converted into text and added to the conversation context.

When users directly address GoLah AI, the AI can use the recent discussion together with relevant trip information to generate a contextual response.

```text
                    Group Voice Call
                           │
             ┌─────────────┼─────────────┐
             │             │             │
          User A        User B        User C
             │             │             │
             └─────────────┼─────────────┘
                           │
                           ▼
                      Voice Room
                           │
                           ▼
                     GoLah AI
                           │
                  ┌────────┼────────┐
                  │        │        │
                 STT      LLM      TTS
                  │        │        │
                  ▼        ▼        ▼
              Speech → Context → AI Voice
```

The AI does not need to permanently remember every second of a conversation.

Instead, relevant conversation history can be converted into context and combined with trip information when the AI needs to respond.

---

## 🚨 Crisis Management

Travel plans can change unexpectedly.

GoLah is designed to assist travellers when unexpected situations occur, including:

- Flight delays
- Changes to travel plans
- Scams
- Medical emergencies
- Accidents

Potential assistance includes:

- Flight delay detection
- Rebooking assistance
- Scam prevention and response
- Medical emergency assistance
- Accident support

Instead of requiring travellers to search through multiple applications during stressful situations, GoLah aims to provide relevant assistance within the same platform.

---

# 6. Architecture

GoLah is structured as a Progressive Web App supported by a backend API, database, external travel services, realtime communication, and AI services.

The AI is a feature within GoLah rather than the central system itself.

The backend connects the different GoLah modules and provides the AI with relevant context when required.

```text
                         ┌─────────────────────────┐
                         │        GoLah PWA        │
                         │                         │
                         │  Travel Files           │
                         │  Smart Map              │
                         │  Currency Converter     │
                         │  Chat & Voice           │
                         │  Trip Planning          │
                         │  Crisis Management      │
                         │  AI Assistant           │
                         └────────────┬────────────┘
                                      │
                              HTTPS / WebSocket
                                      │
                         ┌────────────▼────────────┐
                         │       Backend API       │
                         │                         │
                         │  Authentication         │
                         │  User & Trip Data       │
                         │  File Management        │
                         │  Chat & Voice           │
                         │  AI Orchestration       │
                         │  External API Gateway   │
                         └───────┬────────┬────────┘
                                 │        │
                    ┌────────────┘        └─────────────┐
                    │                                   │
                    ▼                                   ▼
           ┌─────────────────┐                 ┌─────────────────┐
           │    Supabase     │                 │ External APIs   │
           │                 │                 │                 │
           │ PostgreSQL      │                 │ Maps            │
           │ Authentication  │                 │ Flights         │
           │ Storage         │                 │ Currency        │
           │ Realtime        │                 │ Translation      │
           └─────────────────┘                 │ Booking         │
                                               └─────────────────┘
                                 │
                                 ▼
                       ┌────────────────────┐
                       │     AI Service     │
                       │                    │
                       │ LLM                │
                       │ Speech-to-Text     │
                       │ Text-to-Speech     │
                       │ AI Tools           │
                       └─────────┬──────────┘
                                 │
                                 ▼
                       ┌────────────────────┐
                       │    AI Context      │
                       │                    │
                       │ Trip Context       │
                       │ User Context       │
                       │ Chat Context       │
                       │ Vault Context      │
                       └────────────────────┘
```

## Core Application Modules

```text
GoLah
│
├── Travel Files Management
│
├── Smart Map
│
├── Currency Converter
│
├── Chat Hub
│   ├── Text Chat
│   └── Voice Communication
│
├── Trip Planning
│
├── Crisis Management
│
└── AI Assistant
```

These modules are connected through the backend and share relevant trip information.

The AI can retrieve relevant information from these modules when generating responses.

### AI Context Flow

For example, when a traveller asks:

> "Are we free tomorrow afternoon?"

GoLah can retrieve the relevant itinerary information before sending the request to the AI.

```text
User Question
      │
      ▼
GoLah AI
      │
      ▼
AI Context Layer
      │
      ├── Trip Context
      ├── Itinerary
      ├── User Context
      └── Group Context
      │
      ▼
AI Model
      │
      ▼
Contextual Response
```

This allows the AI to provide answers based on the user's actual trip instead of relying only on general knowledge.

---

# 7. Tech Stack

## Frontend

- React
- Next.js
- TypeScript
- Tailwind CSS
- Progressive Web App (PWA)

## Backend

- Node.js
- Next.js API Routes

## Database & Storage

- Supabase
- PostgreSQL
- Supabase Storage

## Authentication

- Supabase Auth

## Maps & Navigation

- Google Maps API / Mapbox GL JS

## Realtime Communication

- WebRTC
- Socket.io / Supabase Realtime

## AI

- Large Language Model (LLM)
- Speech-to-Text (STT)
- Text-to-Speech (TTS)
- AI Tool Calling
- AI Context Management

## External Services

- Flight information APIs
- Currency exchange APIs
- Maps APIs
- Translation services
- Booking services

---

# 8. Prerequisites

Before running GoLah locally, make sure the following software is installed.

## Required Software

- Node.js
- npm
- Git
- A modern web browser with PWA support
- A browser with microphone access for voice features

## Required Services

Depending on the features being used, GoLah requires API credentials for the following services:

- Supabase
- AI / LLM provider
- Maps provider
- Flight information provider
- Currency exchange provider
- Translation provider
- Booking provider

## Environment Variables

Create a `.env.local` file in the project root.

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# AI
AI_API_KEY=

# Maps
MAPS_API_KEY=

# Flights
FLIGHT_API_KEY=

# Currency
CURRENCY_API_KEY=
```

Additional environment variables may be required depending on the external services enabled in the project.

> **Important:** Never commit API keys, access tokens, passwords, or other secrets to the repository.

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate into the project:

```bash
cd GoLah
```

Install dependencies:

```bash
npm install
```

Create your environment file:

```bash
touch .env.local
```

Add the required API credentials to `.env.local`.

## Run the Development Server

Start the development server:

```bash
npm run dev
```

Then open the application in your browser.

The PWA can be accessed locally through the development server.

---

# 🚀 Future Improvements

Potential future improvements for GoLah include:

- Predictive itinerary planning
- AI-generated packing lists
- More advanced voice interactions
- Improved AI conversation memory
- Native mobile applications
- Apple Wallet integration
- Google Wallet integration
- More travel and booking integrations

---

# 🎯 Target Users

GoLah is designed for:

- 🧳 Solo travellers
- 👥 Friends travelling together
- 👨‍👩‍👧 Families
- 🌏 Travellers managing multiple destinations
- 💰 Groups managing shared travel budgets
- 🗓️ Travellers who need to coordinate complex itineraries

---

# 💡 Why GoLah?

Travel planning is often fragmented across many different applications.

```text
                   Traditional Travel

        ┌───────────────┐
        │  Flight App   │
        └───────┬───────┘
                ↓
        ┌───────────────┐
        │   Hotel App   │
        └───────┬───────┘
                ↓
        ┌───────────────┐
        │     Maps      │
        └───────┬───────┘
                ↓
        ┌───────────────┐
        │    Currency   │
        └───────┬───────┘
                ↓
        ┌───────────────┐
        │   Chat App    │
        └───────┬───────┘
                ↓
        ┌───────────────┐
        │    Documents  │
        └───────┬───────┘
                ↓
        ┌───────────────┐
        │  Booking Apps │
        └───────────────┘
```

GoLah brings these experiences together:

```text
                         ✈️ GoLah

                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
   🗺️ Planning        🔐 Travel Files      💬 Communication
        │                   │                   │
        ▼                   ▼                   ▼
   🎯 AI Planning      💱 Currency          👥 Group/Solo Travel
        │                                       │
        └───────────────────┬───────────────────┘
                            │
                            ▼
                       🤖 AI Assistant
                            │
                            ▼
                  Context-Aware Assistance
```

Instead of asking travellers to manage separate applications, GoLah puts the trip at the centre of the experience.

The result is a single platform where travellers can:

**Plan → Organize → Communicate → Navigate → Adapt**

---

# ❤️ Built for codenection

GoLah was developed for the **Lifestyle Track: Planning an Escape** challenge.

The project focuses on reducing the complexity of travel planning by bringing trip planning, group coordination, travel information, and intelligent assistance into one unified platform.

> **One app. One trip. Less planning, more travelling.**
