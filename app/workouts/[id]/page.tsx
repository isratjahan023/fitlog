import Link from "next/link";
import { Oswald } from "next/font/google";
import { notFound } from "next/navigation";
import WorkoutActions from "../../WorkoutActions";
import PlanCounters from "../../PlanCounters";


const oswald = Oswald({
  subsets: ["latin"],
  weight: ["600", "700"],
});

type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

async function getWorkout(id: number): Promise<Workout | null> {
  const endpoints = [
    "https://api.abcz.workers.dev/api/fitlog",
    "https://api.api-store.workers.dev/api/fitlog",
  ];

  // The library response format is already confirmed.
  // Find the selected workout by its ID.
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        cache: "no-store",
      });

      if (!response.ok) continue;

      const data: Workout[] = await response.json();

      if (!Array.isArray(data)) continue;

      return data.find((workout) => workout.id === id) ?? null;
    } catch {
      // Try the alternative API.
    }
  }

  throw new Error("Unable to load this workout. Please try again.");
}

export default async function WorkoutDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const workout = await getWorkout(Number(id));

  if (!workout) {
    notFound();
  }

  const specs = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", workout.rating],
  ];

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
            <span
              className={`${oswald.className} text-xl font-bold`}
            >
              FITLOG
            </span>
          </Link>

          <div className="flex gap-5 text-sm text-zinc-400">
            <Link href="/" className="hover:text-[#ccff00]">
              Workouts
            </Link>
            <Link href="/my-plan" className="hover:text-[#ccff00]">
              My Plan
            </Link>
          </div>

         <PlanCounters />
        </div>
      </nav>

      {/* Workout details */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <img
            src={workout.image}
            alt={workout.name}
            className="aspect-[4/5] w-full rounded-xl object-cover"
          />

          <div>
            <h1
              className={`${oswald.className} text-3xl font-bold uppercase sm:text-4xl`}
            >
              {workout.name}
            </h1>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {workout.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-semibold text-black"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* Key specs */}
            <dl className="mt-6 overflow-hidden rounded-xl border border-zinc-800 bg-[#15171c]">
              {specs.map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-4 border-b border-zinc-800 px-4 py-3 last:border-b-0"
                >
                  <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    {label}
                  </dt>
                  <dd className="text-right text-sm">{value}</dd>
                </div>
              ))}
            </dl>

            {/* Instructions */}
            <h2 className="mt-7 text-sm font-bold tracking-wide">
              INSTRUCTIONS
            </h2>

            <ol className="mt-3 list-decimal space-y-3 pl-5 text-sm leading-6 text-zinc-300">
              {workout.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>

            {/* Buttons: functionality comes next */}
          <WorkoutActions workout={workout} />
          </div>
        </div>
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