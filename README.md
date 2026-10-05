# FitLog — Workout Library

FitLog is a responsive gym companion for browsing workouts,
building today's training plan, and saving exercises for later.

## Live Website

Deployment link will be added after publishing.

## GitHub Repository

https://github.com/isratjahan023/fitlog

## Technologies Used

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Lucide React
- React Hot Toast
- Browser localStorage

## Key Features

1. Workout library loaded from an API with a backup endpoint.
2. Individual workout pages with specifications and instructions.
3. Today's Plan and Saved lists with live navbar counters.
4. Plan summary showing exercises, minutes, and calories.
5. Workout completion and removal with toast notifications.
6. Sorting by duration, calories, and rating on My Plan.
7. Persistent plan and saved data using localStorage.
8. A limit of five unfinished workouts at a time.
9. Loading indicators and a custom 404 page.
10. Responsive layouts for mobile, tablet, and desktop.

## Run Locally

Install dependencies:

npm install

Start the development server:

npm run dev

Open the Local URL shown in the terminal.

## Production Build

npm run build
npm start

## API Endpoints

Primary:
https://api.abcz.workers.dev/api/fitlog

Alternative:
https://api.api-store.workers.dev/api/fitlog

Single workout:
Append /:id to either endpoint, replacing :id with a workout ID.

## Validation

- Production build completed successfully.
- TypeScript check completed successfully.