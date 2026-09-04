# codenection_GoLah
# ✈️ GoLah

> **One app. One trip. Your AI travel companion.**

GoLah is an AI-powered travel companion designed to bring the essential parts of a trip into one place.

Instead of switching between multiple apps for travel documents, maps, currency conversion, group chats, trip planning, and emergency assistance, GoLah provides a unified travel experience with an AI that understands your trip.

Whether you're travelling alone, with friends, or with family, GoLah helps you **plan, navigate, communicate, and handle unexpected situations throughout your journey.**

---

## ✨ Features

### 🔐 Travel Files Management

Keep your important travel information and documents organized in one centralized vault.

* Passport and visa information
* Arrival cards
* Boarding passes
* Hotel reservations
* Travel insurance
* eSIM information
* Emergency contacts
* QR code scanning
* Document expiry alerts

The Travel Files Management separates structured travel information from uploaded documents, allowing GoLah AI to use relevant information when assisting with your trip.

---

### 🗺️ Smart Map

A travel-focused map that combines navigation with trip planning.

* AI-generated route suggestions
* Location-based travel information
* Live pricing information
* One-tap booking
* Interactive map experience

---

### 💱 Currency Converter

Look at different countries' currencies while travelling without switching to another application.

* Support for multiple live currencies rate

---

### 💬 AI Chat Hub

Your travel conversations and AI assistance in one place.

#### Solo Mode

Chat directly with GoLah AI for travel recommendations, planning, translations, and assistance.

#### Group Mode

Create a shared travel conversation where friends and family can communicate with each other while GoLah AI understands the group's shared trip context.

The AI can use information such as:

* Current itinerary
* Destinations
* Budget
* Travel preferences
* Group decisions
* Travel documents

---

### 🎯 AI Trip Planning

Plan your trip interactively with AI.

#### Swipe-Based Destination Discovery

Explore destinations using a Tinder-style swipe interface to quickly identify places that match your preferences.

#### AI Destination Debate

Let GoLah AI compare destinations and help you and your group decide where to travel based on factors such as budget, activities, and preferences.

#### Automatic Bill Splitting

Split travel expenses between group members and calculate who owes what.

---

### 🚨 Crisis Management

GoLah AI is designed to assist when unexpected situations happen during a trip.

* Flight delay detection
* Rebooking assistance
* Scam prevention and response
* Medical emergency assistance
* Accident support

Instead of searching through multiple services during an emergency, GoLah AI aims to provide relevant assistance within the same platform.

---

## 🤖 AI-Powered Travel Companion

GoLah AI is not designed as a standalone chatbot.



## 📞 Voice Communication

GoLah AI can extend its group communication experience beyond text.

The application can support:

* Voice messages
* Voice conversations
* AI-assisted voice interactions
* Shared group conversation context

During a group voice conversation, speech can be converted into text and added to the conversation context. When users directly address VoyageAI, the AI can use the recent discussion together with the group's trip information to generate a contextual response.

```text
Users
  │
  ↓
Voice Room
  │
  ├── User A
  ├── User B
  ├── User C
  │
  └── GoLah AI
          │
          ├── Speech-to-Text
          ├── AI Engine
          └── Text-to-Speech
```

---

## 🏗️ Architecture

Architecture Overview
                              ┌──────────────────────┐
                              │       GoLah PWA      │
                              │ React / Next.js      │
                              │ TypeScript           │
                              │ Tailwind CSS         │
                              └──────────┬───────────┘
                                         │
                                  HTTPS / WebSocket
                                         │
                              ┌──────────▼───────────┐
                              │     Backend / API     │
                              │                       │
                              │ Authentication       │
                              │ User & Trip Data     │
                              │ File / Document Mgmt │
                              │ Realtime              │
                              │ External API Gateway │
                              └──────────┬────────────┘
                                         │
             ┌───────────────────────────┼──────────────────────────┐
             │                           │                          │
             ▼                           ▼                          ▼
    ┌─────────────────┐       ┌────────────────────┐      ┌─────────────────┐
    │    Supabase     │       │   External APIs    │      │   AI Service    │
    │                 │       │                    │      │                 │
    │ PostgreSQL      │       │ Maps               │      │ LLM             │
    │ Authentication  │       │ Flights            │      │ STT             │
    │ Storage         │       │ Currency           │      │ TTS             │
    │ Realtime        │       │ Translation        │      │ AI Tools        │
    └─────────────────┘       └────────────────────┘      └────────┬────────┘
                                                                   │
                                                          ┌────────▼────────┐
                                                          │   AI Context    │
                                                          │                 │
                                                          │ Trip Context    │
                                                          │ User Context   │
                                                          │ Chat Context   │
                                                          │ Vault Context  │
                                                          └─────────────────┘

The major application modules are:

* Travel Vault (Files Management)
* Smart Map
* Live Currencies Rate & Converter
* Chat Hub (Text Chat & Voice Call)
* AI Engine 

These modules share relevant trip context so that the AI can provide more contextual assistance.

---

## 🛠️ Tech Stack

### Frontend

* React / Next.js
* TypeScript
* Tailwind CSS
* Progressive Web App (PWA)

### Backend

* Node.js
* Next.js API Routes

### Database & Storage

* Supabase
* PostgreSQL
* Supabase Storage

### Authentication

* Supabase Auth

### Maps & Navigation

* Google Maps API or Mapbox GL JS

### Realtime Communication

* WebRTC
* Socket.io / Supabase Realtime

### AI

* AI Engine
* Large Language Model
* Speech-to-Text
* Text-to-Speech

### External Services

* Flight information APIs
* Currency exchange APIs
* Maps APIs
* Translation services
* Booking services

---

## 📁 Project Structure



---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* Git

You will also need the required API credentials for the services used by GoLah AI.

### Installation

```bash
git clone <repository-url>

cd GoLah

npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

AI_API_KEY=

MAPS_API_KEY=

FLIGHT_API_KEY=

CURRENCY_API_KEY=
```

> Never commit API keys or other secrets to the repository.

### Run Development Server

```bash
npm run dev
```

Then open the application in your browser.

---

## 🗺️ Roadmap

Future improvements planned for GoLah AI include:


---

## 🎯 Target Users

GoLah AI is designed for:

* 🧳 Solo travellers
* 👨‍👩‍👧 Families
* 👥 Friends travelling together
* 🌏 Travellers managing multiple destinations and travel documents

---

## 💡 Why GoLah AI?

Travel currently requires travellers to move between many different applications:

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
Emergency Services
```

GoLah AI aims to bring these experiences together:

```text
                  ✈️
             ┌───────────┐
             │ GoLah AI  │
             └─────┬─────┘
                   │
     ┌─────────────┼─────────────┐
     ↓             ↓             ↓
  Planning      Documents      Maps
     ↓             ↓             ↓
  AI Chat       Currency      Crisis
     ↓             ↓             ↓
          👥 Group Travel
                   │
                   ↓
              🤖 AI Companion
```

**One trip. One place. One AI companion.**