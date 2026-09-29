import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppShell, PageHeader } from "@/components/AppShell";
import { FamilyGoalCard } from "@/components/FamilyGoalCard";
import { useJourney } from "@/context/journey";
import { miles as fmtMiles } from "@/lib/format";
import { HumanStoryCard } from "@/components/HumanStoryCard";
import mother from "@/assets/story-mother.jpg";
import family from "@/assets/story-family.jpg";

export const Route = createFileRoute("/family")({
  head: () => ({
    meta: [
      { title: "Bersama (Hajj Together) — STEP by Aladin" },
      {
        name: "description",
        content: "Build a shared Hajj goal with family, track contributions and gift Hajj Miles.",
      },
      { property: "og:title", content: "Bersama (Hajj Together) — STEP by Aladin" },
      {
        property: "og:description",
        content: "Perjalanan yang berarti tak selalu dijalani sendiri.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FamilyPage,
});

const OPTIONS = [500, 1000, 0];

function FamilyPage() {
  const { addMiles } = useJourney();
  const [selected, setSelected] = useState(500);
  const [custom, setCustom] = useState(250);

  const amount = selected === 0 ? custom : selected;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Hajj Together"
        title="Bersama"
        subtitle="Perjalanan yang berarti tak selalu dijalani sendiri."
      />
      <div className="relative mb-5 overflow-hidden rounded-3xl">
        <img src={family} alt="Keluarga Indonesia berkumpul bersama" width={1280} height={960} className="h-56 w-full object-cover md:h-72" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 to-transparent" />
        <p className="absolute bottom-5 left-5 right-5 text-xl font-extrabold text-white md:text-2xl">Perjalanan yang berarti tak selalu dijalani sendiri.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <FamilyGoalCard />

        <section className="surface-card p-5">
          <h2 className="text-base font-extrabold text-primary">Hadiahkan Hajj Miles</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Jadikan hadiah sebagai langkah menuju sesuatu yang berarti.
          </p>

          <div className="mt-5 grid grid-cols-3 gap-2">
            {OPTIONS.map((o) => (
              <button
                key={o}
                onClick={() => setSelected(o)}
                className={`rounded-xl border p-3 text-xs font-bold transition-colors ${
                  selected === o
                    ? "border-[var(--emerald)] bg-[var(--emerald-soft)] text-[var(--accent-foreground)]"
                    : "border-border text-muted-foreground hover:text-primary"
                }`}
              >
                {o === 0 ? "Lainnya" : `${fmtMiles(o)} Miles`}
              </button>
            ))}
          </div>

          {selected === 0 && (
            <input
              type="number"
              min={50}
              step={50}
              value={custom}
              onChange={(e) => setCustom(Number(e.target.value) || 0)}
              className="mt-3 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-primary outline-none focus:ring-2 focus:ring-[var(--cyan)]"
            />
          )}

          <button
            onClick={() => {
              if (amount <= 0) return;
              addMiles(amount, "Hadiah Miles", `+${fmtMiles(amount)} Miles`);
              toast.success(`${fmtMiles(amount)} Miles terkirim.`);
            }}
            className="mt-5 w-full rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Kirim Hadiah
          </button>
        </section>
      </div>
      <HumanStoryCard
        className="mt-5"
        image={mother}
        alt="Seorang pemuda makan malam bersama ibunya"
        headline="Perjalanannya bukan cuma tentang dirinya."
        overlay={<p className="text-sm font-bold">Haji untuk Ibu · 33,6% menuju Rp25 juta</p>}
        progress={33.6}
      />
    </AppShell>
  );
}
