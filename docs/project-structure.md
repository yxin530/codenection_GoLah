# GoLah Project Structure

This document explains where GoLah code belongs and what each important folder or file is responsible for.

## Top-level folders

```text
codenection_GoLah/
├── src/                 Application source code
├── public/              Static files served directly by the browser
├── docs/                Product, architecture, and design documentation
├── README.md            Product overview and project scope
├── requirements.md      Phased requirements and build plan
├── architecture.md      Technical architecture and data model
├── agentic-architecture.md
│                        AI orchestration and agent design
├── AGENT.md             GoLah-specific coding instructions
└── AGENTS.md            Next.js-generated agent instructions
```

## `src/app`

This is the Next.js App Router. A folder containing `page.tsx` becomes a route. A folder named in parentheses is a route group and does not appear in the URL.

```text
src/app/
├── page.tsx                         Homepage (`/`)
├── layout.tsx                       Root layout for every route
├── globals.css                      Global styles and design tokens
├── favicon.ico                      Browser tab icon
├── (auth)/                          Authentication route group
│   ├── layout.tsx                   Shared auth layout
│   ├── login/page.tsx               Login (`/login`)
│   ├── signup/page.tsx              Signup (`/signup`)
│   └── onboarding/page.tsx          Onboarding (`/onboarding`)
├── (app)/                           Logged-in application route group
│   ├── layout.tsx                   Shared app shell
│   ├── community/page.tsx           Community feed (`/community`)
│   └── trips/
│       ├── page.tsx                 Trip list (`/trips`)
│       ├── new/page.tsx             New trip form (`/trips/new`)
│       └── [tripId]/                Dynamic trip routes
│           ├── layout.tsx           Shared layout for one trip
│           ├── TripTabs.tsx         Trip feature navigation
│           ├── chat/page.tsx         Trip chat
│           ├── currency/page.tsx    Currency converter
│           ├── discover/page.tsx    Destination discovery
│           ├── files/page.tsx       Travel files
│           ├── itinerary/page.tsx   Trip itinerary
│           └── map/page.tsx          Trip-specific map
├── analyzing/page.tsx               Processing/loading screen
└── map/page.tsx                     Global map (`/map`)
```

Keep route-specific page composition in `src/app`. Move reusable UI out of pages and into `src/components`.

## `src/components`

Reusable React components organized by responsibility.

```text
src/components/
├── ui/                              Generic shadcn UI primitives
├── layout/                          App shell and navigation
├── home/                            Homepage-specific components
├── chat/                            Chat and AI chat components
└── crisis/                          Crisis reporting components
```

### `src/components/ui`

Generic building blocks such as buttons, cards, inputs, dialogs, drawers, sheets, tabs, avatars, and calendars. These components should not know about trips, users, Supabase, or AI agents.

### `src/components/layout`

Shared navigation and shell components:

- `AppLayout.tsx`: desktop/mobile application shell.
- `BottomNav.tsx`: mobile bottom navigation.
- `Sidebar.tsx`: desktop sidebar.
- `TopBar.tsx`: shared top header.

### Feature components

- `home/`: homepage-only components, such as trip setup UI.
- `chat/`: messages, voice messages, bill-splitting cards, and destination comparisons.
- `crisis/`: dialogs and controls for reporting travel problems.

When a feature becomes larger, add a matching folder such as `community/`, `trips/`, `map/`, `files/`, or `itinerary/`.

## `src/lib`

Shared non-visual application logic.

```text
src/lib/
├── utils.ts                         Generic helpers, including `cn`
├── ai/                              Orchestrator, agents, and AI tools
├── db/                              Supabase clients and database queries
├── providers/                       External service abstractions
│   ├── llm/                         LLM interface and mock provider
│   ├── maps/                        Maps provider interface
│   ├── flights/                     Flight provider interface
│   ├── currency/                    Currency provider interface
│   ├── stt/                         Speech-to-text interface
│   ├── translation/                 Translation interface
│   └── booking/                     Booking links/provider interface
├── validations/                     Shared form and API validation schemas
└── constants/                       Shared application constants
```

Current rule: feature code should depend on interfaces in `providers`, not directly on third-party SDKs. Consequential actions must go through the AI approval flow described in `agentic-architecture.md`.

## `src/types`

Create this folder when shared domain types are introduced:

```text
src/types/
├── trip.ts                          Trip and trip-member types
├── itinerary.ts                     Itinerary item types
├── chat.ts                          Chat and message types
├── community.ts                     Community post types
└── agent-action.ts                  Proposed/approved action types
```

Types used by only one component can stay beside that component. Types shared by pages, API routes, and database helpers belong here.

## `public`

Static assets referenced by URL, such as `/assets/wavy-bg.png`. Keep app-used assets here. Keep documentation-only assets in `docs/assets`.

The default `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, and `window.svg` files can be removed once confirmed unused.

## `docs`

Documentation and design references:

- `docs/assets/`: presentation and design assets.
- `docs/system-flow/`: technical flow documents and diagrams.
- `docs/project-structure.md`: this organization guide.
- Root markdown files: product and architecture source of truth.

## Organization rules

1. Pages and URL composition belong in `src/app`.
2. Reusable UI belongs in `src/components`.
3. Database, AI, provider, and validation logic belongs in `src/lib`.
4. Generic shadcn components must remain feature-agnostic.
5. Static app assets belong in `public`; documentation assets belong in `docs`.
6. Shared domain types belong in `src/types`.
7. Do not duplicate a route unless the global and trip-specific experiences are intentionally different.
8. Add database/API/AI folders as the corresponding functionality is implemented; do not create empty placeholder folders prematurely.
