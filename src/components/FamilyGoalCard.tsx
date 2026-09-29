import { toast } from "sonner";
import { CountUp } from "@/components/CountUp";
import { useJourney } from "@/context/journey";
import { CONTRIBUTORS, HAJJ_TARGET } from "@/lib/hajj-data";
import { rupiah } from "@/lib/format";

export function FamilyGoalCard() {
  const { familyAmount, addFamily } = useJourney();
  const pct = (familyAmount / HAJJ_TARGET) * 100;

  return (
    <section className="navy-card p-6">
      <div className="geo-pattern pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/60">
          Haji untuk Ibu
        </p>
        <p className="mt-1 text-xs text-white/50">Untuk: Ibu</p>

        <div className="mt-5 flex items-end gap-2">
          <CountUp
            value={familyAmount}
            format={rupiah}
            className="num-hero text-[30px] leading-none text-white"
          />
          <span className="pb-1 text-xs text-white/55">dari {rupiah(HAJJ_TARGET)}</span>
        </div>

        <div className="mt-4 h-[3px] w-full rounded-full bg-white/15">
          <div
            className="h-full rounded-full transition-[width] duration-700"
            style={{ width: `${pct}%`, backgroundImage: "var(--gradient-progress)" }}
          />
        </div>
        <p className="mt-2 text-xs font-bold text-[var(--emerald)]">{pct.toFixed(1)}%</p>

        <ul className="mt-6 space-y-3">
          {CONTRIBUTORS.map((c) => (
            <li key={c.name} className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-bold text-white">
                {c.name.slice(0, 2)}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm text-white/80">{c.name === "You" ? "Kamu" : c.name === "Dad" ? "Ayah" : c.name}</span>
              <span className="shrink-0 text-sm font-bold text-white">{rupiah(c.amount)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => {
              addFamily(250_000);
              toast.success("Kontribusi ditambahkan", { description: `${rupiah(250_000)} untuk Haji untuk Ibu.` });
            }}
            className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-primary transition-transform hover:-translate-y-0.5"
          >
            Ikut Berkontribusi
          </button>
          <button
            onClick={() => toast("Tautan undangan keluarga disalin.")}
            className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
          >
            Undang Keluarga
          </button>
        </div>
      </div>
    </section>
  );
}
