import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { HAJJ_TARGET } from "@/lib/hajj-data";

export type Activity = {
  id: string;
  title: string;
  detail: string;
  kind: "miles" | "save";
};

type State = {
  savings: number;
  monthly: number;
  milesTotal: number;
  milesThisMonth: number;
  roundUp: boolean;
  goal: string;
  activity: Activity[];
  familyAmount: number;
};

type Ctx = State & {
  progress: number;
  remaining: number;
  addSaving: (amount: number, title: string, detail: string) => void;
  addMiles: (amount: number, title: string, detail: string) => void;
  setMonthly: (v: number) => void;
  setRoundUp: (v: boolean) => void;
  setGoal: (v: string) => void;
  addFamily: (amount: number) => void;
};

const JourneyContext = createContext<Ctx | null>(null);

const initialActivity: Activity[] = [
  { id: "a1", title: "Alfamart Purchase", detail: "+8 Miles", kind: "miles" },
  { id: "a2", title: "Transaction Round-up", detail: "+Rp1.300", kind: "save" },
  { id: "a3", title: "Friday Auto Save", detail: "+Rp25.000", kind: "save" },
];

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>({
    savings: 6_250_000,
    monthly: 500_000,
    milesTotal: 3420,
    milesThisMonth: 124,
    roundUp: true,
    goal: "My Hajj",
    activity: initialActivity,
    familyAmount: 8_400_000,
  });

  const push = useCallback((entry: Activity) => {
    setState((s) => ({ ...s, activity: [entry, ...s.activity].slice(0, 8) }));
  }, []);

  const addSaving = useCallback(
    (amount: number, title: string, detail: string) => {
      setState((s) => ({ ...s, savings: Math.min(s.savings + amount, HAJJ_TARGET) }));
      push({ id: crypto.randomUUID(), title, detail, kind: "save" });
    },
    [push],
  );

  const addMiles = useCallback(
    (amount: number, title: string, detail: string) => {
      setState((s) => ({
        ...s,
        milesTotal: s.milesTotal + amount,
        milesThisMonth: s.milesThisMonth + amount,
      }));
      push({ id: crypto.randomUUID(), title, detail, kind: "miles" });
    },
    [push],
  );

  const value = useMemo<Ctx>(
    () => ({
      ...state,
      progress: Math.min(state.savings / HAJJ_TARGET, 1),
      remaining: Math.max(HAJJ_TARGET - state.savings, 0),
      addSaving,
      addMiles,
      setMonthly: (v) => setState((s) => ({ ...s, monthly: v })),
      setRoundUp: (v) => setState((s) => ({ ...s, roundUp: v })),
      setGoal: (v) => setState((s) => ({ ...s, goal: v })),
      addFamily: (amount) => setState((s) => ({ ...s, familyAmount: s.familyAmount + amount })),
    }),
    [state, addSaving, addMiles],
  );

  return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>;
}

export function useJourney() {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error("useJourney must be used inside JourneyProvider");
  return ctx;
}
