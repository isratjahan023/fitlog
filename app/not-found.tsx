import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0d0e10] px-6 text-white">
      <div className="text-center">
        <p className="text-8xl font-extrabold text-[#ccff00]">
          404
        </p>

        <h1 className="mt-5 text-2xl font-bold">
          PAGE NOT FOUND
        </h1>

        <p className="mt-3 text-sm text-zinc-400">
          This page does not exist. Head back to the workout library.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-[#ccff00] px-6 py-3 text-sm font-semibold text-black"
        >
          Go to workouts
        </Link>
      </div>
    </main>
  );
}