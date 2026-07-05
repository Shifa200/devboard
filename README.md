# DevBoard — Job Application Tracker

A Kanban-style tracker for managing the entire job-search pipeline — built because I'm
running my own job search through it.

**🔗 Live demo:** [FILL vercel link]

![DevBoard screenshot]([FILL screenshot.png])

## Features
- **Drag-and-drop pipeline** — move applications across 6 stages
  (Wishlist → Applied → OA → Interview → Offer → Rejected) using dnd-kit,
  with smooth CSS transition animations
- **Analytics dashboard** — 4 real-time KPIs (total applications, weekly volume,
  response rate, status distribution) computed as *derived state* from live data,
  so there's no duplicated state to keep in sync
- **Automatic persistence** — board state saved to localStorage and restored across
  refreshes and sessions
- **Accessible DnD** — keyboard-operable drag interactions via dnd-kit's
  accessibility primitives

## Tech stack
React · Tailwind CSS · dnd-kit · localStorage

## Architecture notes
- Board data lives in a single normalized state object; column contents and all KPIs
  are derived at render time (no redundant state)
- Drag logic isolated in a custom hook; card/column components stay presentational
- Persistence handled by a small storage layer that serializes on state change

## Run locally
```bash
git clone https://github.com/Shifa200/devboard
cd devboard
npm install
npm run dev
```

## Roadmap
- [ ] Notes & contact log per application
- [ ] Reminder dates for follow-ups
- [ ] Export board to CSV
```
