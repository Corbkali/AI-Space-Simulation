# Jules Integration Workflow

## Purpose

This workflow documents how to hand off the **Nebula Navigator** project to the AI agent **Jules** for further development, testing, and deployment.

## Prerequisites

1. **Access to the repository** – Jules must have read/write access to the `Antigrav` folder.
2. **Node.js (v18+)** and **npm** installed on Jules' environment.
3. **Running development servers** (client and server) are optional for Jules; they can be started with the commands below.
4. **Communication channel** – a shared Slack/Discord channel, email, or a direct messaging interface where Jules can receive updates and ask questions.

## Steps for Jules

1. **Clone / Pull the repository**

   ```bash
   git clone <repo‑url> Antigrav
   cd Antigrav
   ```

   If the repo already exists, run `git pull` to get the latest changes.

2. **Install dependencies**

   ```bash
   npm install               # installs root dev dependencies
   cd client && npm install && cd ..
   cd server && npm install && cd ..
   ```

3. **Run the application**

   ```bash
   # In two separate terminals
   cd server && npm run dev   # starts the backend
   cd client && npm run dev   # starts the frontend (Vite dev server)
   ```

   Open `http://localhost:3000/` in a browser to verify the app loads.

4. **Review the current state**
   - Open the **README.md** for an overview.
   - Check the **console** for any WebGL or API warnings.
   - Run linting and type‑checking:

     ```bash
     cd client && npm run lint && npx tsc --noEmit
     cd server && npm run lint && npx tsc --noEmit
     ```

   - Address any `any` type warnings (e.g., `RadioLog` in `App.tsx`).

5. **Pick a task from the backlog** (see the handoff summary in the previous message). Jules can start with any of the following:
   - Polish visual fidelity (shader fixes)
   - Resolve linting / type‑safety warnings
   - Add low‑poly ship assets
   - Implement AI‑driven gameplay effects
   - Add Dockerfiles & CI workflow
   - Improve accessibility & UX
   - Write Jest tests
   - Add a “Share Screenshot” button

6. **Commit & push changes**

   ```bash
   git add .
   git commit -m "[Jules] <short description of change>"
   git push origin <branch-name>
   ```

   Open a Pull Request for review.

7. **Report back**
   - Summarize what was done, any open questions, and next steps.
   - Attach screenshots or logs if relevant.
   - Use the shared communication channel to notify the original hand‑off author.

## Optional: Automated Handoff via Workflow File

If you want the handoff to be triggered automatically, add the following entry to `.agent/workflows/trigger_jules.md` (or run it manually):

```yaml
---
description: Trigger Jules handoff
---
1. Ensure the repository is up‑to‑date (`git pull`).
2. Notify Jules via the agreed channel (e.g., Slack webhook) that the handoff is ready.
3. Provide Jules with the list of pending tasks (as above).
```

---
**Note:** Jules can ask for clarification at any point. The handoff is intentionally lightweight – the goal is to give Jules a clear entry point and a concrete task list.
