# Nebula Navigator 🚀

> **A stunning, interactive 3D space simulation exploring procedurally generated star systems.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

**Nebula Navigator** invites you to wander through a galaxy of uniquely crafted solar systems. Built with modern web technologies, it offers a premium, glass-morphism styled UI and immersive 3D visuals.

<!--
TODO: Add a screenshot of the application here.
![Nebula Navigator Screenshot](path/to/screenshot.png)
-->

---

## 📑 Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## 🔭 About The Project

Nebula Navigator is an ambitious project to create a procedural universe in your browser. It combines high-fidelity WebGL rendering with a robust backend for persistence, allowing users to discover and log unique star systems.

Each planet you encounter is unique, hosting:
- **Life & Civilizations**: Ranging from primitive Stone Age societies to Transcendent civilizations (Kardashev scale 0.5 – 3.0).
- **Orbital Structures**: From simple satellite swarms to massive energy-absorption megastructures.
- **Anomalies**: Mysterious AI Swarms and glitchy artifacts that add intrigue to your exploration.

The immersive 3D experience runs natively in the browser, leveraging **Three.js** for rendering and **React** for a responsive, futuristic interface.

---

## ✨ Key Features

*   **Procedural Generation**: Infinite variations of stars, planets, and orbital distances.
*   **Civilization Simulation**: Weighted generation of tech levels, government types, ethics, and species traits.
*   **Dynamic Visuals**: Custom GLSL shaders for stars, atmospheres, and planetary surfaces.
*   **Interactive 3D Scene**: Orbit controls, smooth camera transitions, and LOD management.
*   **Persistent Universe**: Discoveries are saved to a database, creating a shared history of explored systems.
*   **Modern UI**: Glass-morphism HUD with micro-animations and responsive design.

---

## 🛠️ Tech Stack

### Frontend
*   ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) **React** (Vite)
*   ![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white) **Three.js** / **@react-three/fiber**
*   **State Management**: Zustand
*   **Styling**: CSS Modules, Glassmorphism design tokens

### Backend
*   ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) **Node.js**
*   ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) **Express**
*   **Language**: TypeScript

### Database
*   ![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white) **SQLite**
*   ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) **Prisma ORM**

---

## 🏗️ System Architecture

The project is organized into a monorepo-style structure:

- **`client/`**: The React frontend application. Handles the 3D canvas, HUD, and user interaction.
- **`server/`**: The Node.js/Express backend. Manages API endpoints, procedural generation logic, and database interactions.
- **`shared/`**: Common types and utilities shared between client and server.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for a deep dive.

---

## 🚀 Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

*   **Node.js** (v18 or later recommended)
*   **npm** (comes with Node.js)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/nebula-navigator.git
    cd nebula-navigator
    ```

2.  **Install Client Dependencies**
    ```bash
    cd client
    npm install
    cd ..
    ```

3.  **Install Server Dependencies**
    ```bash
    cd server
    npm install
    cd ..
    ```

### Environment Setup

1.  **Server Configuration**
    Navigate to the `server` directory and create a `.env` file:
    ```bash
    cd server
    touch .env
    ```

2.  **Add Database URL**
    Open `.env` and add the connection string for SQLite:
    ```env
    DATABASE_URL="file:./dev.db"
    PORT=3001
    ```

3.  **Initialize Database**
    Run the Prisma migration to set up the SQLite database:
    ```bash
    npx prisma generate
    npx prisma db push
    ```

---

## 🎮 Usage

You will need to run the client and server in separate terminal instances.

### 1. Start the Backend
```bash
cd server
npm run dev
```
*The server will start on `http://localhost:3001`.*

### 2. Start the Frontend
```bash
cd client
npm run dev
```
*The client will start on `http://localhost:3000` (or the port shown in your terminal).*

Open your browser to the client URL. The app will automatically generate and load the first star system!

---

## 🗺️ Roadmap

We are constantly improving Nebula Navigator. Here are some planned features inspired by our community and AI reviews:

- [ ] **Performance Optimization**: Shader uniform improvements and LOD for distant structures.
- [ ] **Dark Mode Toggle**: For the UI (though space is already pretty dark!).
- [ ] **Accessibility**: Improved contrast ratios and ARIA labels.
- [ ] **Security**: Enhanced input sanitization for user discoveries.
- [ ] **DevOps**: Docker support and CI/CD pipelines.
- [ ] **Visual Upgrades**: Low-poly models for satellites and particle effects for ships.
- [ ] **Gameplay**: Resource systems (energy, population) reacting to anomalies.
- [ ] **Documentation**: Expanded contribution guides and FAQs.
- [ ] **Testing**: Comprehensive unit and integration tests with Jest.
- [ ] **Social**: "Share Screenshot" feature to capture your discoveries.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feat/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feat/AmazingFeature`)
5.  Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 Acknowledgments

*   **Corbin "Antigrav"** - Project Creator
*   **The 10 AI Agents** - For their simulated reviews and architecture suggestions that helped shape this project.
