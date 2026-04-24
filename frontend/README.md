# TODO App — Frontend

React + Vite single-page application for the TODO app.

## Tech Stack

- **Framework**: React 18
- **Build tool**: Vite
- **Styling**: CSS Modules
- **Notifications**: react-hot-toast

## Setup & Run

### Prerequisites

- Node.js v18+
- Backend server running on port 5000

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

App runs at `http://localhost:5173`. API calls to `/api/*` are proxied to the backend at `http://localhost:5000` via Vite's proxy config.

### 3. Build for production

```bash
npm run build
# Preview the production build
npm run preview
```

## Features

- **Create** tasks with a title and optional description
- **Toggle** tasks done/undone with a checkbox
- **Edit** title and description inline
- **Delete** tasks
- **Filter** by All / Active / Done
- **Search** tasks by title or description
- **Optimistic UI updates** — changes appear instantly before the server confirms
- **Toast notifications** for feedback on all actions
- Fully **keyboard accessible** (Ctrl+Enter to save edits, Escape to cancel)
