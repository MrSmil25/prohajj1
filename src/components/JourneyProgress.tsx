import { Link } from "@tanstack/react-router";
import { CountUp } from "@/components/CountUp";
import { KaabaMark } from "@/components/KaabaMark";
import { useJourney } from "@/context/journey";
import { COMPACT_MILESTONES } from "@/lib/hajj-data";
import { rupiah } from "@/lib/format";

export function JourneyProgress() {
  const { savings, progress, remaining } = useJourney();
  const percent = Math.round(progress * 100);

  return (
    <section className="navy-card p-6 md:p-8">
      <div className="geo-pattern pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/60">
          STEP Journey · Perjalanan Hajimu
        </p>

        <div className="mt-4 flex items-end gap-3">
          <CountUp
            value={savings}
            format={rupiah}
            className="num-hero text-[34px] leading-none text-white md:text-[46px]"
          />
          <span className="pb-1 text-sm text-white/55">dari {rupiah(25_000_000)}</span>
        </div>

        <p className="mt-2 inline-flex items-center rounded-full bg-[var(--emerald)]/15 px-3 py-1 text-xs font-bold text-[var(--emerald)]">
          {percent}% lebih dekat
        </p>

        <div className="mt-8">
          <div className="relative h-[3px] w-full rounded-full bg-white/15">
            <div
              className="h-full rounded-full transition-[width] duration-700 ease-out"
              style={{
                width: `${Math.max(percent, 4)}%`,
                backgroundImage: "var(--gradient-progress)",
              }}
            />
            <span
              className="glow-dot absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--emerald)] transition-[left] duration-700 ease-out"
              style={{ left: `${Math.max(percent, 4)}%` }}
            />
            <span className="absolute -top-3 right-0 translate-x-1">
              <KaabaMark className="size-6 text-white/80" />
            </span>
          </div>

          <div className="mt-4 flex justify-between gap-1">
            {COMPACT_MILESTONES.map((m, i) => {
              const at = (i / (COMPACT_MILESTONES.length - 1)) * 100;
              const reached = percent >= at;
              return (
                <span
                  key={m}
                  className={`text-[9px] font-semibold uppercase tracking-wide md:text-[10px] ${
                    reached ? "text-white/85" : "text-white/35"
                  }`}
                >
                  {m}
                </span>
              );
            })}
          </div>
        </div>

        <p className="mt-7 text-sm text-white/75">
          <span className="font-bold text-white">{rupiah(remaining)}</span> menuju target setoran awal haji.
        </p>

        <Link
          to="/journey"
          className="mt-5 inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-bold text-primary transition-transform hover:-translate-y-0.5"
        >
          Lihat Journey
        </Link>
      </div>
    </section>
  );
}
