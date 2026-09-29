import { Check } from "lucide-react";
import { KaabaMark } from "@/components/KaabaMark";
import { useJourney } from "@/context/journey";
import { MILESTONES } from "@/lib/hajj-data";

export function MilestoneMap() {
  const { savings } = useJourney();
  const currentIndex = MILESTONES.reduce(
    (acc, m, i) => (savings >= m.amount ? i : acc),
    0,
  );

  return (
    <ol className="relative ml-2 border-l border-dashed border-border pl-8">
      {MILESTONES.map((m, i) => {
        const done = savings >= m.amount;
        const current = i === currentIndex;
        const last = i === MILESTONES.length - 1;
        return (
          <li key={m.label} className="relative pb-9 last:pb-0 rise-in" style={{ animationDelay: `${i * 60}ms` }}>
            <span
              className={`absolute -left-[41px] grid size-6 place-items-center rounded-full border ${
                done
                  ? "border-transparent bg-[var(--emerald)] text-white"
                  : "border-border bg-card text-muted-foreground"
              } ${current && !last ? "glow-dot" : ""}`}
            >
              {done ? (
                <Check className="size-3.5" strokeWidth={3} />
              ) : last ? (
                <KaabaMark className="size-3.5" />
              ) : (
                <span className="size-1.5 rounded-full bg-current" />
              )}
            </span>

            <div
              className={`surface-card p-4 transition-transform hover:-translate-y-0.5 ${
                current ? "ring-1 ring-[var(--emerald)]/40" : ""
              } ${!done ? "opacity-60" : ""}`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  {m.label}
                </p>
                {current ? (
                  <span className="rounded-full bg-[var(--emerald-soft)] px-2 py-0.5 text-[10px] font-bold text-[var(--accent-foreground)]">
                    You are here
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-base font-extrabold text-primary">{m.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{m.copy}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
