# Nebula Navigator 🚀

**A stunning, interactive 3D space simulation** built with React, Three.js, Zustand, and custom shaders. Explore procedurally generated star systems, encounter AI Swarm anomalies, and witness civilizations at varying tech levels with dynamic orbital structures.

---

## ✨ Overview

Nebula Navigator lets you wander through a galaxy of uniquely crafted solar systems. Each planet may host:

- **Life & Civilizations** with a Kardashev‑scale tech level (0.5 – 3.0).
- **Orbital Structures** ranging from satellite swarms to megastructures that visually convey a civilization’s advancement.
- **AI Swarm Anomalies** – glitchy, emissive spheres that add mystery and visual intrigue.

The app runs entirely in the browser, delivering a premium, glass‑morphism‑styled UI with smooth micro‑animations and vibrant gradients.

---

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, @react-three/fiber, @react-three/drei
- **State Management**: Zustand
- **Styling**: Vanilla CSS with custom design tokens (dynamic gradients, dark mode)
- **Shaders**: Custom GLSL shaders for stars, atmospheres, and planetary surfaces
- **Build**: Vite (dev server via `npm run dev`)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or later)
- **npm** (comes with Node)

### Installation

```bash
# Clone the repository (if you haven't already)
git clone <repo-url>
cd Antigrav

# Install dependencies for both client and server
npm install   # installs root dev dependencies
cd client && npm install && cd ..
cd server && npm install && cd ..
```

### Running Locally

```bash
# Start the backend (API / data generators)
cd server && npm run dev

# In a new terminal, start the frontend
cd client && npm run dev
```

Open your browser at `http://localhost:3000/` – the app will automatically load the first generated star system.

---

## 📸 Screenshots

![Nebula Navigator Scene](C:/Users/corbi/.gemini/antigravity/brain/da303d1a-ae9c-4e28-8028-c8f131e1400c/nebula_navigator_scene_1768861318276.png)
*The main 3D scene showcasing a planet with orbital structures and an AI Swarm anomaly.*

---

## 🧩 Features

- **Procedural Star System Generation** – random stars, planets, and orbital distances.
- **Civilization Generation** – weighted tech levels, species, government, and ethics.
- **Orbital Structures** – satellite swarms, orbital rings, space elevators, and energy‑absorption megastructures.
- **AI Swarm Anomaly** – glitchy sphere with flickering messages.
- **Dynamic UI** – responsive controls, smooth camera transitions, and polished HUD.
- **Extensible Architecture** – easy to add new anomalies, ship models, or gameplay mechanics.

---

## 🤖 AI Review Summary (10 Agents)

Below are concise improvement suggestions from ten simulated AI reviewers, each focusing on a different aspect. Implementing these will boost the project **ten‑fold**.

1. **Performance Engineer** – Optimize shader uniforms and enable `THREE.WebGLRenderer`’s `antialias: false` on low‑end devices; add LOD for distant orbital structures.
2. **UX Designer** – Introduce a dark‑mode toggle, refine tooltip animations, and add a mini‑map for navigation.
3. **Accessibility Advocate** – Ensure all UI text meets WCAG AA contrast ratios, add ARIA labels to controls, and provide keyboard shortcuts.
4. **Security Analyst** – Sanitize any user‑generated content (e.g., civilization names) before rendering to prevent XSS.
5. **DevOps Specialist** – Add Dockerfiles for client and server, and a CI workflow that runs lint, type‑check, and visual regression tests.
6. **Graphics Artist** – Replace placeholder satellite meshes with low‑poly models, and add particle‑based thruster effects for ships.
7. **Game Designer** – Implement a simple resource system (energy, population) that reacts to the presence of AI Swarm anomalies.
8. **Documentation Guru** – Expand the README with a contribution guide, code‑style conventions, and a FAQ section.
9. **Testing Engineer** – Introduce Jest + React Testing Library unit tests for core components and integration tests for the generation pipeline.
10. **Community Manager** – Add a “Share Screenshot” button that copies a link to the current system view, encouraging social sharing.

---

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repo.
2. Create a feature branch (`git checkout -b feat/your-feature`).
3. Follow the linting rules (`npm run lint`).
4. Open a Pull Request with a clear description of your changes.

---

## 📜 License

MIT © 2026 Corbin "Antigrav".
