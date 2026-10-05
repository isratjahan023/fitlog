import Link from "next/link";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-[#0d0e10]">
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

        <p className="text-center text-xs text-zinc-500 sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}