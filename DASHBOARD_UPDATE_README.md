# Nebula Navigator - Lead Explorer Dashboard Update

## Key Features Implemented

### 1. 4-Channel Exploration Dashboard

- The application now features a **4-viewport split-screen layout**, allowing you to monitor four distinct sectors of the universe simultaneously.
- Each channel (ALPHA, BETA, GAMMA, DELTA) operates independently, maintaining its own current system, coordinates, and state.
- You can find the dashboard at `http://localhost:3000`.

### 2. Universal Coordinate System (Minecraft-Style)

- Introduced a **Universal Coordinate System (X, Y, Z)** to track the location of discovered systems.
- Each viewport's HUD allows you to manually input coordinates to jump to specific locations in the universe.
- Use the **X, Y, Z** inputs in the top-right corner of each viewport to navigate.

### 3. Black Hole Anomalies

- Added a **5% chance** to encounter a **Black Hole** instead of a regular star system during procedural generation.
- Black Holes feature a distinct visual appearance with an accretion disk and different planetary distribution logic.
- Look for **Type: BH** in the system info panel.

### 4. Independent "Hyperjump" Engines

- Each channel has its own **"INIT JUMP"** button.
- Triggering a jump in one sector does not affect the others, fulfilling the "Lead Explorer" fantasy of managing multiple expeditions.

## How to Use

1. **Launch the Servers**: Ensure both backend and client are running (`npm run dev`).
2. **Open Dashboard**: Go to `http://localhost:3000`.
3. **Scan Sectors**: All 4 channels will initialize. Use the **INIT JUMP** button on any viewport to explore new systems.
4. **Target Coordinates**: Enter specific X/Y/Z coordinates in a viewport and click INIT JUMP to warp to that specific location.
5. **Inspect Planets**: Click on any planet in a viewport to see its details in the mini-inspector at the bottom-left of that viewport.

## Technical Details

- **State Management**: Refactored to `useDashboardStore` with support for multiple `Channel` objects.
- **Backend API**: Updated generators to accept and process 3D coordinates.
- **Visuals**: Enhanced `SystemScene` to support controlled rendering and Black Hole shaders.
