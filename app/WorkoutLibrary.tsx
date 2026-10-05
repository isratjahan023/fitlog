"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
};

const API_URLS = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadWorkouts() {
      setLoading(true);
      setError("");

      for (const url of API_URLS) {
        try {
          const response = await fetch(url, {
            signal: controller.signal,
          });

          if (!response.ok) {
            throw new Error("Request failed");
          }

          const data = await response.json();

          if (!Array.isArray(data)) {
            throw new Error("Unexpected response");
          }

          if (!controller.signal.aborted) {
            setWorkouts(data);
            setLoading(false);
          }

          return;
        } catch {
          if (controller.signal.aborted) return;
        }
      }

      if (!controller.signal.aborted) {
        setError("Unable to load workouts. Please try again.");
        setLoading(false);
      }
    }

    loadWorkouts();

    return () => controller.abort();
  }, [attempt]);

  if (loading) {
    return (
      <div
        role="status"
        className="flex items-center justify-center gap-3 py-16 text-zinc-400"
      >
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-[#ccff00]" />
        Loading workouts…
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="py-12 text-center">
        <p className="text-zinc-400">{error}</p>

        <button
          onClick={() => setAttempt((value) => value + 1)}
          className="mt-4 rounded bg-[#ccff00] px-5 py-2 font-semibold text-black"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {workouts.map((workout) => (
        <Link
          key={workout.id}
          href={`/workouts/${workout.id}`}
          className="overflow-hidden rounded-xl border border-zinc-800 bg-[#15171c] transition-colors hover:border-[#ccff00]"
        >
          <img
            src={workout.image}
            alt={workout.name}
            loading="lazy"
            className="h-48 w-full object-cover"
          />

          <div className="p-4">
            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full bg-[#ccff00] px-2 py-0.5 text-[10px] font-bold uppercase text-black"
                >
                  {group}
                </span>
              ))}
            </div>

            <h3 className="mt-3 text-lg font-bold uppercase">
              {workout.name}
            </h3>

            <p className="mt-1 text-xs text-zinc-400">
              {workout.equipment}
            </p>

            <div className="mt-4 flex flex-wrap gap-4 border-t border-zinc-800 pt-3 text-xs text-zinc-400">
              <span>{workout.duration} min</span>
              <span>{workout.caloriesBurned} kcal</span>
              <span>★ {workout.rating}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}