"use client";

import Link from "next/link";

export default function WorkoutError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0d0e10] px-6 text-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          COULDN&apos;T LOAD THIS WORKOUT
        </h1>

        <p className="mt-3 text-sm text-zinc-400">
          Please try again in a moment.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => reset()}
            className="rounded-full bg-[#ccff00] px-6 py-3 text-sm font-semibold text-black"
          >
            Try again
          </button>

          <Link
            href="/"
            className="rounded-full border border-zinc-600 px-6 py-3 text-sm"
          >
            Go to workouts
          </Link>
        </div>
      </div>
    </main>
  );
}