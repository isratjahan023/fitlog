"use client";

import { useState } from "react";
import Link from "next/link";
import { Oswald } from "next/font/google";
import { usePlan } from "../PlanProvider";
import PlanCounters from "../PlanCounters";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function MyPlanPage() {
  const {
    plan,
    saved,
    ready,
    markAsDone,
    removeFromPlan,
    removeFromSaved,
  } = usePlan();

  const [tab, setTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState("duration");

  const items = [...(tab === "plan" ? plan : saved)].sort(
    (a, b) => {
      if (sortBy === "calories") {
        return b.caloriesBurned - a.caloriesBurned;
      }

      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      return a.duration - b.duration;
    }
  );

  const minutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const calories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  return (
    <div className="min-h-screen bg-[#0d0e10] text-white">
      {/* Navbar */}
      <nav className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt=""
              className="h-6 w-6 object-contain"
            />
            <span className={`${oswald.className} text-xl font-bold`}>
              FITLOG
            </span>
          </Link>

          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="rounded-full px-4 py-2 text-zinc-400"
            >
              Workouts
            </Link>

            <Link
              href="/my-plan"
              aria-current="page"
              className="rounded-full bg-[#ccff00]/10 px-4 py-2 font-semibold text-[#ccff00]"
            >
              My Plan
            </Link>
          </div>

          <PlanCounters />
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className={`${oswald.className} text-3xl font-bold`}>
          MY PLAN
        </h1>

        <p className="mt-2 text-sm text-zinc-400">
          Cap of five lifts for today. Finish them, then load more.
        </p>

        {/* Summary */}
        <div className="mt-6 grid grid-cols-3 gap-3 rounded-xl border border-zinc-800 bg-[#15171c] p-5 sm:p-6">
          <div>
            <p className="text-xs text-zinc-400">Exercises</p>
            <p
              className={`${oswald.className} mt-2 text-3xl font-bold text-[#ccff00]`}
            >
              {plan.length}
            </p>
          </div>

          <div className="border-l border-zinc-800 pl-4">
            <p className="text-xs text-zinc-400">Minutes</p>
            <p className={`${oswald.className} mt-2 text-3xl font-bold`}>
              {minutes}
            </p>
          </div>

          <div className="border-l border-zinc-800 pl-4">
            <p className="text-xs text-zinc-400">Calories</p>
            <p className={`${oswald.className} mt-2 text-3xl font-bold`}>
              {calories}
            </p>
          </div>
        </div>

        {/* Tabs and sorting */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div
            role="group"
            aria-label="Workout list"
            className="flex gap-1 rounded-lg border border-zinc-800 bg-[#15171c] p-1"
          >
            <button
              onClick={() => setTab("plan")}
              aria-pressed={tab === "plan"}
              className={`rounded-md px-4 py-2 text-xs ${
                tab === "plan"
                  ? "bg-zinc-800 font-semibold text-white"
                  : "text-zinc-400"
              }`}
            >
              Today&apos;s Plan
            </button>

            <button
              onClick={() => setTab("saved")}
              aria-pressed={tab === "saved"}
              className={`rounded-md px-4 py-2 text-xs ${
                tab === "saved"
                  ? "bg-zinc-800 font-semibold text-white"
                  : "text-zinc-400"
              }`}
            >
              Saved
            </button>
          </div>

          <label className="flex items-center gap-3 text-xs text-zinc-400">
            Sort By
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-lg border border-zinc-800 bg-[#15171c] px-3 py-2 text-white"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </label>
        </div>

        {/* List */}
        {!ready ? (
          <p role="status" className="py-16 text-center text-zinc-400">
            Loading workouts…
          </p>
        ) : items.length === 0 ? (
          <div className="mt-6 rounded-xl border border-dashed border-zinc-800 px-6 py-20 text-center">
            <h2 className={`${oswald.className} text-xl font-bold`}>
              NOTHING HERE YET
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/"
              className="mt-5 inline-block rounded-full bg-[#ccff00] px-6 py-3 text-sm font-semibold text-black"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {items.map((workout) => {
              const done =
                tab === "plan" &&
                plan.some(
                  (item) => item.id === workout.id && item.done
                );

              return (
                <article
                  key={workout.id}
                  className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-[#15171c] p-4 sm:flex-row sm:items-center"
                >
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="h-40 w-full rounded-lg object-cover sm:h-20 sm:w-32"
                  />

                  <div className="min-w-0 flex-1">
                    <h2
                      className={`${oswald.className} text-lg font-bold uppercase`}
                    >
                      {workout.name}
                    </h2>

                    <p className="mt-1 text-xs text-zinc-400">
                      {workout.equipment}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-zinc-400">
                      <span>{workout.duration} min</span>
                      <span>{workout.caloriesBurned} kcal</span>
                      <span>★ {workout.rating}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href={`/workouts/${workout.id}`}
                      className="rounded-full border border-zinc-600 px-4 py-2 text-xs"
                    >
                      View Details
                    </Link>

                    {tab === "plan" && (
                      <button
                        onClick={() => markAsDone(workout.id)}
                        disabled={done}
                        className="rounded-full bg-[#ccff00] px-4 py-2 text-xs font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {done ? "✓ Done" : "✓ Mark as Done"}
                      </button>
                    )}

                    <button
                      onClick={() =>
                        tab === "plan"
                          ? removeFromPlan(workout.id)
                          : removeFromSaved(workout.id)
                      }
                      aria-label={`Remove ${workout.name}`}
                      className="px-2 py-2 text-xl text-zinc-400 hover:text-red-400"
                    >
                      ×
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt=""
              className="h-5 w-5 object-contain"
            />
            <span className={`${oswald.className} font-bold`}>
              FITLOG
            </span>
          </Link>

          <p className="text-center text-xs text-zinc-500">
            © 2026 FitLog — Workout Library. Train hard, log honest.
          </p>
        </div>
      </footer>
    </div>
  );
}