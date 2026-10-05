import WorkoutLibrary from "./WorkoutLibrary";

import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d0e10] text-white">
      {/* Navbar */}
      <nav className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <a href="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt=""
              className="h-6 w-6 object-contain"
            />

            <span
              className={`${oswald.className} text-xl font-bold tracking-wide`}
            >
              FITLOG
            </span>
          </a>

          <div className="flex items-center gap-2 text-sm">
            <a
              href="/"
              aria-current="page"
              className="rounded-full bg-[#ccff00]/10 px-4 py-2 font-semibold text-[#ccff00]"
            >
              Workouts
            </a>

            <a
              href="/my-plan"
              className="rounded-full px-4 py-2 text-zinc-400 hover:text-white"
            >
              My Plan
            </a>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <a
              href="/my-plan"
              className="rounded-full bg-[#ccff00] px-3 py-1.5 font-semibold text-black"
            >
              Plan 0
            </a>

            <a
              href="/my-plan"
              className="rounded-full border border-zinc-600 px-3 py-1.5 text-zinc-300"
            >
              Saved 0
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid items-center gap-8 rounded-xl border border-zinc-800 bg-[#15171c] p-6 sm:p-10 md:grid-cols-[3fr_2fr]">
          <div>
            <p className="mb-5 text-xs font-bold tracking-widest text-[#ccff00]">
              WORKOUT LIBRARY
            </p>

            <h1
              className={`${oswald.className} text-4xl font-bold uppercase leading-tight sm:text-5xl`}
            >
              TRAIN WITH INTENT. LOG EVERY SET.
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-6 text-zinc-400">
              FitLog is a dark, no-nonsense gym companion: pick a
              lift, lock it into today&apos;s plan, and watch the
              week&apos;s work add up.
            </p>

            <a
              href="#library"
              className="mt-6 inline-flex items-center gap-2 rounded bg-[#ccff00] px-5 py-3 text-xs font-bold text-black hover:bg-[#b8e600]"
            >
              BROWSE WORKOUTS
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="flex items-center justify-center">
            <img
              src="/logo(big).png"
              alt="Man demonstrating a gym exercise"
              className="h-64 w-full object-contain sm:h-80"
            />
          </div>
        </div>
      </section>

      {/* Library */}
      <section
        id="library"
        className="mx-auto max-w-6xl scroll-mt-6 px-6 pb-12 pt-4"
      >
        <h2
          className={`${oswald.className} text-3xl font-bold`}
        >
          THE LIBRARY
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          Twelve lifts covering every major muscle group.
        </p>
        <WorkoutLibrary />
      </section>
    </main>
  );
}