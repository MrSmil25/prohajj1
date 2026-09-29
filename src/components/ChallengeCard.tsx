import { useState } from "react";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useJourney } from "@/context/journey";
import type { Challenge } from "@/lib/hajj-data";

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const { addMiles } = useJourney();
  const [done, setDone] = useState(challenge.done);
  const complete = done >= challenge.total;
  const pct = Math.round((done / challenge.total) * 100);

  const step = () => {
    if (complete) return;
    const next = done + 1;
    setDone(next);
    if (next >= challenge.total) {
      addMiles(challenge.reward, challenge.title, `+${challenge.reward} Miles`);
      toast.success(`${challenge.title} completed`, {
        description: `+${challenge.reward} Hajj Miles earned.`,
      });
    }
  };

  return (
    <article className="surface-card p-5 transition-transform hover:-translate-y-0.5">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-extrabold text-primary">{challenge.title}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{challenge.detail}</p>
        </div>
        <span className="shrink-0 rounded-full bg-[var(--cyan-soft)] px-2.5 py-1 text-[11px] font-bold text-[var(--cyan)]">
          +{challenge.reward} Miles
        </span>
      </div>

      <div className="mt-4 h-1.5 w-full rounded-full bg-secondary">
        <div
          className="h-full rounded-full transition-[width] duration-500"
          style={{ width: `${pct}%`, backgroundImage: "var(--gradient-progress)" }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs font-semibold text-muted-foreground">
          {done} / {challenge.total} completed
        </p>
        {complete ? (
          <span className="sparkle-pop inline-flex items-center gap-1 text-xs font-bold text-[var(--emerald)]">
            <Sparkles className="size-3.5" /> Completed
          </span>
        ) : (
          <button
            onClick={step}
            className="rounded-full border border-border px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-secondary"
          >
            Log progress
          </button>
        )}
      </div>
    </article>
  );
}
