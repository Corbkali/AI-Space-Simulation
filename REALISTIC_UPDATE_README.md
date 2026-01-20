# Nebula Navigator - Realistic Space Update

## Changes Implemented

### 1. Realistic Galactic Coordinate System

- Replaced the "Minecraft-style" X/Y/Z integers with a **Galactic Coordinate System**.
- **L (Longitude)**: 0-360 degrees around the galactic center.
- **B (Latitude)**: -90 to +90 degrees (relative to galactic plane).
- **Dist (Distance)**: Distance from the galactic center in **Light Years**.
- The backend now generates these realistically, biasing stars towards the galactic plane (B near 0) and center.

### 2. Dual-Channel Command Interface

- Simplified the dashboard to **2 High-Fidelity Channels** (ALPHA & BETA).
- Reduced screen clutter and improved performance, allowing for smoother rendering and higher detail.

### 3. Enhanced Planetary Detail & Inhabitants

- **Visual Upgrades**:
  - Reduced geometry segments for better performance without quality loss.
  - Added **Orbit Markers** to clearly show planetary paths.
- **Life Detection**:
  - **Inhabited Planets** now feature a **Holographic Marker** directly in the 3D view showing the species name.
  - The **Bioscan Inspector** (bottom right) provides detailed data on civilizations, including Tech Level and descriptions.

### 4. Rendering Optimization

- Optimized shader usage and geometry to reduce lag ("Make the lag kinda go away").
- Balanced the number of stars and lighting effects for a smoother 60fps experience.

## Usage

1. Open `http://localhost:3000`.
2. Review the **Galactic Coordinates** in the top-right of each viewport to see exactly where in the galaxy you are.
3. Click "Start Hyperjump" to explore new sectors.
4. Look for **Cyan Text Markers** above planets - these indicate intelligent life!
5. Select a planet to see the detailed **Bioscan** report in the bottom right.
