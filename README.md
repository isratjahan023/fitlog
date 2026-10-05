# FitLog — Workout Library

FitLog is a responsive gym companion for browsing workouts,
building today's training plan, and saving exercises for later.

## Live Website

[Visit FitLog](https://sage-cocada-90a1c9.netlify.app)

## GitHub Repository

[View Source Code](https://github.com/isratjahan023/fitlog)

## Technologies Used

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Lucide React
- React Hot Toast
- Browser localStorage

## Key Features

1. API-powered workout library with a backup endpoint.
2. Individual workout pages with specifications and instructions.
3. Today's Plan and Saved lists with live navbar counters.
4. Live summaries showing exercises, minutes, and calories.
5. Workout completion and removal with toast notifications.
6. Sorting by duration, calories, and rating on My Plan.
7. Persistent plan and saved data using localStorage.
8. A limit of five unfinished workouts at a time.
9. Loading indicators and a custom 404 page.
10. Responsive layouts for mobile, tablet, and desktop.

## Run Locally

Clone the repository:

```bash
git clone https://github.com/isratjahan023/fitlog.git
cd fitlog
```

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Production Build

```bash
npm run build
npm start
```

## API Endpoints

- Primary: https://api.abcz.workers.dev/api/fitlog
- Alternative: https://api.api-store.workers.dev/api/fitlog

For a single workout, append its ID to either endpoint.

Example: https://api.abcz.workers.dev/api/fitlog/1

## Validation

- Production build completed successfully.
- TypeScript check completed successfully.