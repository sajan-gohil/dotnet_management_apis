# Frontend for Dotnet Management APIs

This is a small React + TypeScript single-page app (Vite) that talks to the backend at /api.

Setup:

```bash
cd frontend
npm install
npm run dev
```

The Vite dev server proxies /api to http://localhost:5000 by default (see vite.config.ts).

Features:
- List tasks
- Add task
- Toggle completion
- Delete task

The app uses Axios for API calls and React Hooks for state.
