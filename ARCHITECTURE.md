# Architecture Blueprint: Nebula Navigator

## Project Overview

**Nebula Navigator** is an immersive, interactive 3D web application allowing users to explore procedurally generated star systems. It combines high-fidelity WebGL rendering with a robust backend for persistence.

## Tech Stack

- **Frontend:** React (Vite), Three.js, React Three Fiber, GLSL Shaders.
- **Styling:** Vanilla CSS (Glassmorphism, HUD style aesthetics).
- **Backend:** Node.js, Express.
- **Database:** SQLite (managed via Prisma) for storing celestial data and user flight logs.
- **Language:** TypeScript across the full stack.

## System Architecture

### 1. Client (`/client`)

- **Canvas:** Renders the 3D scene (Star, Planets, Asteroid fields).
- **HUD:** Heads-Up Display for navigation, system stats, and controls.
- **Shaders:** Custom fragment/vertex shaders for procedural planet surfaces and atmospheres.
- **State Management:** Zustand for handling navigation state and camera positions.

### 2. Server (`/server`)

- **API Interface:** REST API to fetch system data and save user discoveries.
- **Procedural Logic (Optional):** Seed generation logic can live here or shared shared-lib.
- **Database:** Stores:
  - `Users`: Pilot profiles.
  - `Discoveries`: Saved procedurally generated systems with unique seeds.
  - `FlightLogs`: History of visited systems.

## Folder Structure

```
/
├── client/              # React + Three.js Frontend
│   ├── src/
│   │   ├── components/  # React UI Components
│   │   ├── scene/       # 3D Scene Components (Planets, Stars)
│   │   ├── shaders/     # GLSL Shader files
│   │   ├── stores/      # State management
│   │   └── styles/      # CSS files
│   └── ...
├── server/              # Node.js + Express
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── routes/
│   ├── prisma/          # Database Schema
│   └── ...
├── shared/              # Shared types/utils
└── docs/                # Documentation
```

## Phase 1 Workflow (Immediate)

1. Initialize Project Root.
2. Scaffold `client` with Vite + React + TS.
3. Scaffold `server` with Express + TS.
4. Setup basic styling variables (CSS Variables for the HUD theme).
