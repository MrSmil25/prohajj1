import { Link } from "@tanstack/react-router";
import { CountUp } from "@/components/CountUp";
import { useJourney } from "@/context/journey";
import { miles } from "@/lib/format";

export function HajjMilesCard() {
  const { milesTotal, milesThisMonth } = useJourney();

  return (
    <section className="surface-card relative overflow-hidden p-5">
      <span className="absolute -right-10 -top-10 size-28 rounded-full bg-[var(--cyan)]/10" />
      <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--cyan)]">
        Hajj Miles · bagian dari STEP
      </p>
      <div className="mt-3 flex items-baseline gap-2">
        <CountUp
          value={milesTotal}
          format={miles}
          className="num-hero text-[28px] leading-none text-primary"
        />
        <span className="text-sm font-semibold text-muted-foreground">HAJJ MILES</span>
      </div>
      <p className="mt-1 text-xs font-semibold text-[var(--emerald)]">
        +{miles(milesThisMonth)} bulan ini
      </p>
      <p className="mt-3 text-sm text-muted-foreground">Dapatkan Miles dari aktivitas tertentu dan gunakan benefitnya untuk mendukung perjalananmu.</p>
      <Link
        to="/earn"
        className="mt-4 inline-flex rounded-full border border-border px-4 py-2 text-xs font-bold text-primary transition-colors hover:bg-secondary"
      >
        Cara dapat Miles
      </Link>
    </section>
  );
}
