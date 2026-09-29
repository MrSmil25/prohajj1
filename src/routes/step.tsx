import { createFileRoute, Link } from "@tanstack/react-router";
import { Coins, PiggyBank, ShoppingBag, Sparkles, Trophy, Map } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useJourney } from "@/context/journey";
import { miles, rupiah } from "@/lib/format";

export const Route = createFileRoute("/step")({
  head: () => ({
    meta: [
      { title: "STEP — Save, Transact, Earn, Progress | Aladin" },
      { name: "description", content: "Empat langkah STEP by Aladin: Save, Transact, Earn, Progress menuju target setoran awal haji." },
      { property: "og:title", content: "STEP by Aladin — Satu Langkah, Lebih Dekat." },
      { property: "og:description", content: "Aktivitas finansial harian menjadi progres nyata menuju setoran awal haji." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StepPage,
});

function StepPage() {
  const { savings, progress, milesTotal, milesThisMonth, roundUp } = useJourney();
  const pct = Math.round(progress * 100);

  const sections = [
    {
      letter: "S",
      word: "SAVE",
      desc: "Mulai dari yang kecil.",
      icon: PiggyBank,
      body: (
        <div className="grid gap-2 sm:grid-cols-3">
          <Chip title="Auto Save" detail={`${rupiah(25_000)} / Jumat`} />
          <Chip title="Round-Up" detail={roundUp ? "Aktif" : "Nonaktif"} />
          <Link to="/challenges"><Chip title="Saving Challenge" detail="Istiqamah 5/7" /></Link>
        </div>
      ),
    },
    {
      letter: "T",
      word: "TRANSACT",
      desc: "Transaksi harianmu bisa berarti lebih.",
      icon: ShoppingBag,
      body: (
        <div className="grid gap-2 sm:grid-cols-3">
          <Chip title="Alfamart" detail={`${rupiah(87_300)} · +12 Miles`} />
          <Chip title="Alfamidi" detail="2× Miles akhir pekan" />
          <Chip title="QRIS Aladin" detail="+6 Miles / transaksi" />
        </div>
      ),
    },
    {
      letter: "E",
      word: "EARN",
      desc: "Kumpulkan Hajj Miles.",
      icon: Sparkles,
      body: (
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="num-hero text-3xl text-primary">{miles(milesTotal)}</p>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--cyan)]">Hajj Miles · +{miles(milesThisMonth)} bulan ini</p>
          </div>
          <Link to="/earn" className="rounded-full border border-border px-4 py-2 text-xs font-bold text-primary">Cara dapat Miles</Link>
        </div>
      ),
    },
    {
      letter: "P",
      word: "PROGRESS",
      desc: "Lihat seberapa jauh kamu sudah melangkah.",
      icon: Map,
      body: (
        <div>
          <div className="flex items-baseline justify-between">
            <p className="num-hero text-2xl text-primary">{rupiah(savings)}</p>
            <p className="text-xs font-bold text-[var(--emerald)]">{pct}% lebih dekat</p>
          </div>
          <div className="mt-3 h-1.5 rounded-full bg-secondary">
            <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundImage: "var(--gradient-progress)" }} />
          </div>
          <Link to="/journey" className="mt-4 inline-flex rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground">Buka Journey</Link>
        </div>
      ),
    },
  ];

  return (
    <AppShell>
      <header className="navy-card mb-6 p-6 md:p-8 rise-in">
        <div className="geo-pattern pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/60">STEP</p>
          <h1 className="mt-3 text-3xl font-extrabold leading-[1.05] text-white md:text-5xl">
            Save.<br />Transact.<br />Earn.<br /><span className="text-[var(--emerald)]">Progress.</span>
          </h1>
          <p className="mt-4 text-sm text-white/75">Satu Langkah, Lebih Dekat.</p>
        </div>
      </header>

      <ol className="relative space-y-4">
        <span className="absolute bottom-6 left-[22px] top-6 w-[2px] rounded-full" style={{ backgroundImage: "var(--gradient-progress)" }} />
        {sections.map(({ letter, word, desc, icon: Icon, body }, i) => (
          <li key={word} className="relative flex gap-4 rise-in" style={{ animationDelay: `${i * 80}ms` }}>
            <span className="relative z-10 grid size-11 shrink-0 place-items-center rounded-full bg-primary text-base font-extrabold text-primary-foreground ring-4 ring-background">
              {letter}
            </span>
            <div className="surface-card min-w-0 flex-1 p-5">
              <div className="flex items-center gap-2">
                <Icon className="size-4 text-[var(--emerald)]" />
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">{word}</p>
              </div>
              <h2 className="mt-1 text-lg font-extrabold text-primary">{desc}</h2>
              <div className="mt-4">{body}</div>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
        <Coins className="size-3.5" /> STEP bekerja bersama Ala Impian Haji — tabungan hajimu di Aladin.
        <Trophy className="hidden" />
      </p>
    </AppShell>
  );
}

function Chip({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-2xl bg-secondary px-4 py-3">
      <p className="text-sm font-bold text-primary">{title}</p>
      <p className="text-[11px] text-muted-foreground">{detail}</p>
    </div>
  );
}
