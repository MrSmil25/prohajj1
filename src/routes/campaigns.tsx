import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Coins, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { StepStoriesRail } from "@/components/CreatorJourney";
import { StepVoices } from "@/components/StepVoices";
import { useJourney } from "@/context/journey";
import { useI18n } from "@/context/i18n";
import { CREATORS } from "@/lib/campaigns";
import { rupiah } from "@/lib/format";
import mother from "@/assets/story-mother.jpg";

export const Route = createFileRoute("/campaigns")({
  head: () => ({
    meta: [
      { title: "STEP Together — Kampanye STEP by Aladin" },
      { name: "description", content: "Banyak cara untuk mengambil langkah pertama menuju haji: My First STEP, 30 Days Closer, STEP for Parents, Every Purchase Counts." },
      { property: "og:title", content: "STEP Together — STEP by Aladin" },
      { property: "og:description", content: "Banyak cara untuk mengambil langkah pertama." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CampaignsPage,
});

function CampaignsPage() {
  const { t, pick } = useI18n();
  const { addSaving, addMiles } = useJourney();
  const navigate = useNavigate();
  const day = 18;

  const Leads = ({ to }: { to: string }) => (
    <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] opacity-60">
      {t("camp.leadsTo")} → {to}
    </p>
  );

  return (
    <AppShell>
      <header className="mb-6 rise-in">
        <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--emerald)]">{t("nav.campaigns")}</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-primary md:text-4xl">{t("camp.title")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("camp.sub")}</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {/* 1. My First STEP → Save Now */}
        <section className="navy-card p-6">
          <p className="relative text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--emerald)]">01 · My First STEP</p>
          <h2 className="relative mt-2 text-2xl font-extrabold text-white">
            {pick({ id: "Mulai dari Rp10.000. Hari ini.", en: "Start with Rp10,000. Today." })}
          </h2>
          <p className="relative mt-2 text-sm text-white/70">
            {pick({ id: "Nggak perlu nunggu gaji besar. Langkah pertama cukup kecil.", en: "No need to wait for a bigger salary. The first step can be small." })}
          </p>
          <button
            onClick={() => {
              addSaving(10_000, "My First STEP", `+${rupiah(10_000)}`);
              toast.success(pick({ id: "Langkah pertamamu tercatat.", en: "Your first step is recorded." }));
            }}
            className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-primary"
          >
            {pick({ id: "Ambil STEP Pertamamu", en: "Take Your First STEP" })} <ArrowRight className="size-4" />
          </button>
          <div className="relative text-white"><Leads to={t("save.now")} /></div>
        </section>

        {/* 2. 30 Days Closer → Saving Challenge */}
        <section className="surface-card p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--emerald)]">02 · 30 Days Closer</p>
          <div className="mt-2 flex items-baseline justify-between">
            <h2 className="text-2xl font-extrabold text-primary">{t("stories.day")} {day} / 30</h2>
            <span className="text-sm font-bold text-[var(--emerald)]">{Math.round((day / 30) * 100)}%</span>
          </div>
          <div className="mt-4 grid grid-cols-10 gap-1.5">
            {Array.from({ length: 30 }, (_, i) => (
              <span key={i} className={`aspect-square rounded-md ${i < day ? "bg-[var(--emerald)]" : i === day ? "bg-[var(--emerald-soft)] ring-2 ring-[var(--emerald)]" : "bg-secondary"}`} />
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {pick({ id: "Nabung sedikit setiap hari selama 30 hari. Konsistensi lebih penting dari nominal.", en: "Save a little every day for 30 days. Consistency matters more than amount." })}
          </p>
          <button onClick={() => navigate({ to: "/challenges" })} className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground">
            {pick({ id: "Ikut Tantangan", en: "Join the Challenge" })}
          </button>
          <Leads to="Saving Challenge" />
        </section>

        {/* 3. STEP for Parents → Hajj Together */}
        <section className="relative min-h-[320px] overflow-hidden rounded-3xl bg-primary shadow-[var(--shadow-float)]">
          <img src={mother} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/50 to-transparent" />
          <div className="relative flex h-full min-h-[320px] flex-col justify-end p-6 text-white">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--emerald)]">03 · STEP for Parents</p>
            <h2 className="mt-2 text-xl font-extrabold leading-snug">
              {pick({ id: "Satu langkah kecilmu bisa menjadi perjalanan besar untuk mereka.", en: "Your small step could become a meaningful journey for them." })}
            </h2>
            <button onClick={() => navigate({ to: "/family" })} className="mt-4 self-start rounded-full bg-white px-5 py-2.5 text-sm font-bold text-primary">
              {pick({ id: "Mulai untuk Orang Tua", en: "Start for My Parents" })}
            </button>
            <Leads to="Hajj Together" />
          </div>
        </section>

        {/* 4. Every Purchase Counts → Transact + Earn */}
        <section className="surface-card p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--emerald)]">04 · Every Purchase Counts</p>
          <h2 className="mt-2 whitespace-pre-line text-2xl font-extrabold text-primary">
            {pick({ id: "Belanja seperti biasa.\nSelangkah lebih dekat.", en: "Shop as usual.\nOne step closer." })}
          </h2>
          <div className="mt-4 rounded-2xl bg-secondary p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-primary">Alfamart</span>
              <span className="font-bold text-primary">Rp87.300</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground"><Sparkles className="size-4 text-[var(--cyan)]" /> Hajj Miles</span>
              <span className="font-bold text-[var(--cyan)]">+12 Hajj Miles</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground"><Coins className="size-4 text-[var(--emerald)]" /> Round-Up</span>
              <span className="font-bold text-[var(--emerald)]">+Rp2.700</span>
            </div>
          </div>
          <button
            onClick={() => {
              addMiles(12, "Alfamart", "+12 Miles");
              addSaving(2_700, "Round-Up", "+Rp2.700");
              toast.success(pick({ id: "+12 Hajj Miles & Round-Up Rp2.700", en: "+12 Hajj Miles & Rp2,700 Round-Up" }));
            }}
            className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
          >
            {pick({ id: "Coba Transaksi", en: "Try a Transaction" })}
          </button>
          <Leads to="Transact + Earn" />
        </section>
      </div>

      <div className="mt-8">
        <StepStoriesRail creators={CREATORS} />
      </div>

      <div className="mt-10">
        <StepVoices />
      </div>
    </AppShell>
  );
}
