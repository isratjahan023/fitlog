"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import toast, { Toaster } from "react-hot-toast";

export type Workout = {
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

type PlanWorkout = Workout & {
  done: boolean;
};

type PlanContextValue = {
  plan: PlanWorkout[];
  saved: Workout[];
  ready: boolean;
  addToPlan: (workout: Workout) => void;
  saveWorkout: (workout: Workout) => void;
  markAsDone: (id: number) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
};

const PlanContext = createContext<PlanContextValue | null>(null);

function readStoredItems<T>(key: string): T[] {
  try {
    const value = localStorage.getItem(key);
    const parsed = value ? JSON.parse(value) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function PlanProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [plan, setPlan] = useState<PlanWorkout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setPlan(readStoredItems<PlanWorkout>("fitlog-plan"));
    setSaved(readStoredItems<Workout>("fitlog-saved"));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    try {
      localStorage.setItem("fitlog-plan", JSON.stringify(plan));
      localStorage.setItem("fitlog-saved", JSON.stringify(saved));
    } catch {
      // Keep the app usable when browser storage is unavailable.
    }
  }, [plan, saved, ready]);

  function addToPlan(workout: Workout) {
    if (!ready) return;

    if (plan.some((item) => item.id === workout.id)) {
      toast("Already in today's plan");
      return;
    }

    const unfinished = plan.filter((item) => !item.done);

    if (unfinished.length >= 5) {
      toast.error("Finish a workout before adding more");
      return;
    }

    setPlan((current) => [
      ...current,
      { ...workout, done: false },
    ]);

    toast.success("Added to today's plan");
  }

  function saveWorkout(workout: Workout) {
    if (!ready) return;

    if (saved.some((item) => item.id === workout.id)) {
      toast("Already saved");
      return;
    }

    setSaved((current) => [...current, workout]);
    toast.success("Saved for later");
  }

  function markAsDone(id: number) {
    const workout = plan.find((item) => item.id === id);

    if (!workout || workout.done) return;

    setPlan((current) =>
      current.map((item) =>
        item.id === id ? { ...item, done: true } : item
      )
    );

    toast.success("Workout marked as done");
  }

  function removeFromPlan(id: number) {
    setPlan((current) =>
      current.filter((item) => item.id !== id)
    );

    toast.success("Removed from today's plan");
  }

  function removeFromSaved(id: number) {
    setSaved((current) =>
      current.filter((item) => item.id !== id)
    );

    toast.success("Removed from saved");
  }

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        ready,
        addToPlan,
        saveWorkout,
        markAsDone,
        removeFromPlan,
        removeFromSaved,
      }}
    >
      {children}

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#15171c",
            color: "#ffffff",
            border: "1px solid #27272a",
          },
        }}
      />
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }

  return context;
}