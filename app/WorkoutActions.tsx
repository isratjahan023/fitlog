"use client";

import { CalendarPlus, Bookmark, Check } from "lucide-react";
import { usePlan, type Workout } from "./PlanProvider";

export default function WorkoutActions({
  workout,
}: {
  workout: Workout;
}) {
  const {
    plan,
    saved,
    ready,
    addToPlan,
    saveWorkout,
  } = usePlan();

  const alreadyPlanned = plan.some(
    (item) => item.id === workout.id
  );

  const alreadySaved = saved.some(
    (item) => item.id === workout.id
  );

  const planFull =
    plan.filter((item) => !item.done).length >= 5;

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => addToPlan(workout)}
        disabled={!ready || alreadyPlanned || planFull}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ccff00] px-5 py-3 text-sm font-semibold text-black hover:bg-[#b8e600] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {alreadyPlanned ? (
          <Check aria-hidden="true" className="h-4 w-4" />
        ) : (
          <CalendarPlus aria-hidden="true" className="h-4 w-4" />
        )}

        {alreadyPlanned
          ? "Added to plan"
          : planFull
            ? "Today's plan is full"
            : "Add to today's plan"}
      </button>

      <button
        type="button"
        onClick={() => saveWorkout(workout)}
        disabled={!ready || alreadySaved}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-600 px-5 py-3 text-sm hover:border-[#ccff00] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {alreadySaved ? (
          <Check aria-hidden="true" className="h-4 w-4" />
        ) : (
          <Bookmark aria-hidden="true" className="h-4 w-4" />
        )}

        {alreadySaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}