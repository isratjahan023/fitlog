"use client";

import Link from "next/link";
import { usePlan } from "./PlanProvider";

export default function PlanCounters() {
  const { plan, saved, ready } = usePlan();

  return (
    <div className="flex items-center gap-3 text-xs">
      <Link
        href="/my-plan"
        className="rounded-full bg-[#ccff00] px-3 py-1.5 font-semibold text-black"
      >
        Plan {ready ? plan.length : 0}
      </Link>

      <Link
        href="/my-plan"
        className="rounded-full border border-zinc-600 px-3 py-1.5 text-zinc-300"
      >
        Saved {ready ? saved.length : 0}
      </Link>
    </div>
  );
}