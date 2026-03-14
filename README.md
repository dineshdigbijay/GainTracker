# 💪 BULK UP — Mass Gain Tracker

A mobile-first progressive web app for aggressive bulking. Built for a 22-year-old, 45kg, 5.5ft hardgainer aiming to get as big as possible.

## Features

- **Calorie & Macro Tracker** — 3,200 kcal daily target, P/C/F tracking
- **Quick Food Log** — 20 common bulking foods, frequently used memory
- **Meal Ideas** — 20+ no-beef bulking meals (desi-friendly!)
- **Custom Food Entry** — Log anything with full macros
- **Gym Workout Planner** — Beginner PPL split, set-by-set tracking
- **Progress Charts** — Weight gain + nutrition history
- **Full LocalStorage Persistence** — History never lost

## Daily Targets

| Macro | Target |
|-------|--------|
| Calories | 3,200 kcal |
| Protein | 160g |
| Carbs | 430g |
| Fat | 90g |

## Workout Split

- Mon: Push (Chest · Shoulders · Triceps)
- Tue: Pull (Back · Biceps)
- Wed: Legs
- Thu: Rest
- Fri: Push (variation)
- Sat: Pull (variation)
- Sun: Rest

## Deploy to Vercel

### Option 1: Vercel CLI
```bash
npm install
npx vercel
```

### Option 2: GitHub + Vercel Dashboard
1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project
3. Import your repo
4. Click Deploy — it auto-detects Create React App!

## Run Locally
```bash
npm install
npm start
```
Open http://localhost:3000 in your browser.

## Tech Stack
- React 18
- Recharts (graphs)
- Lucide React (icons)
- 100% localStorage — no backend needed
