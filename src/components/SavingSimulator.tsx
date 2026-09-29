import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { useJourney } from "@/context/journey";
import { projectMilestone, rupiah } from "@/lib/format";

export function SavingSimulator() {
  const { savings, monthly, setMonthly } = useJourney();
  const [value, setValue] = useState(monthly);

  const base = projectMilestone(savings, monthly);
  const sim = projectMilestone(savings, value);
  const sooner = base.months - sim.months;

  return (
    <section className="surface-card p-5 md:p-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
        Milestone Simulator
      </p>
      <p className="mt-2 text-sm text-muted-foreground">Monthly saving</p>
      <p className="num-hero text-[28px] text-primary">{rupiah(value)}</p>

      <Slider
        className="mt-5"
        min={100_000}
        max={2_000_000}
        step={50_000}
        value={[value]}
        onValueChange={(v) => setValue(v[0] ?? value)}
      />

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-secondary p-3">
          <p className="text-[11px] font-semibold text-muted-foreground">Current plan</p>
          <p className="mt-1 text-sm font-bold text-primary">{base.label}</p>
        </div>
        <div className="rounded-xl bg-[var(--emerald-soft)] p-3">
          <p className="text-[11px] font-semibold text-[var(--accent-foreground)]">
            Rp25M milestone
          </p>
          <p className="mt-1 text-sm font-bold text-[var(--accent-foreground)]">{sim.label}</p>
        </div>
      </div>

      <p className="mt-4 text-sm font-semibold text-primary">
        {sooner > 0
          ? `You arrive ${sooner} month${sooner > 1 ? "s" : ""} sooner.`
          : sooner < 0
            ? `You arrive ${Math.abs(sooner)} month${Math.abs(sooner) > 1 ? "s" : ""} later.`
            : "Same arrival as your current plan."}
      </p>

      <button
        onClick={() => setMonthly(value)}
        className="mt-4 w-full rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
      >
        Apply This Plan
      </button>
    </section>
  );
}
