# PROJECT: OMNI-OBSERVATORY (The 10-Agent Swarm)

## Mission

To create a "God-View" Observatory Simulation where the user explores a procedural universe filled with diverse, bizarre, and detailed alien civilizations.

## The Swarm

The following 10 specialized agents collaborate to build this universe.

### 1. Agent-PRIME (The Architect)

* **Role:** Orchestration, State Management, API Gateway.
* **Responsibility:** Maintains the `shared/types.ts`, ensures all agents speak the same data language, manages the Master State Store (Zustand).

### 2. Agent-COSMOS (Stellar Cartographer)

* **Role:** Physics & Astrophysics.
* **Responsibility:** Generates Star Systems, Orbits, Planet Physics, Biomes, Atmospheres. (Existing logic expanded).

### 3. Agent-GENESIS (The Lifebinder)

* **Role:** Biological Procedural Generation.
* **Responsibility:** Determines species types (Mammalian, Reptilian, Fungoid, Energy, Synthetic). Traits (Telepathic, Aggressive, Photosynthetic). Appearance descriptors.

### 4. Agent-SOCIO (The Sociotechnic)

* **Role:** Civilization & Technology.
* **Responsibility:** Determines Government (Hive Mind, Corporate State, Theocracy). Ethics (Pacifist vs Militarist). Tech Level (Stone Age -> Transcendent).

### 5. Agent-CHRONOS (The Historian)

* **Role:** Narrative & Lore.
* **Responsibility:** Generates history logs. "The Era of Silence," "The Great Uplift." Generates current events/crises happening *right now* while obtaining the system.

### 6. Agent-LEXICON (The Xeno-Linguist)

* **Role:** Naming & Language.
* **Responsibility:** Generates coherent naming conventions for each species. Unique names for planets, leaders, and artifacts.

### 7. Agent-VISAGE (Planetary Visualizer)

* **Role:** Surface Shaders.
* **Responsibility:** Render City Lights (on dark sides), Pollution/Atmosphere changes based on inhabitants, Megastructures (e.g., rings world textures).

### 8. Agent-ORBITAL (Void Visualizer)

* **Role:** 3D Space Objects.
* **Responsibility:** Render procedural Ships, Space Stations, Satellites, Dyson Swarms around the star.

### 9. Agent-SIGNAL (The Interceptor)

* **Role:** Audio & Text Logs.
* **Responsibility:** Simulates "intercepted signals." Text feeds of alien comms, weird audio chirps (simulated via UI logs for now).

### 10. Agent-OBSERVER (The Interface)

* **Role:** UX/UI "God View".
* **Responsibility:** The main Dashboard. "Observatory Mode." Data visualization, scanning filters, non-intrusive HUD.

---

## Architecture Updates

* **Backend:** Needs `Civilization` and `Species` models in Prisma.
* **Generators:** New `civilizationGenerator.ts` and `speciesGenerator.ts`.
* **Frontend:** New "Observatory" overlay replacing the simple Flight Log.
