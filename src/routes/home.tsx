import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Coins, PiggyBank, ShoppingBag, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { JourneyProgress } from "@/components/JourneyProgress";
import { HajjMilesCard } from "@/components/HajjMilesCard";
import { useJourney } from "@/context/journey";
import { LangSwitch, useI18n } from "@/context/i18n";
import { StepStoriesRail } from "@/components/CreatorJourney";
import { CREATORS } from "@/lib/campaigns";
import { projectMilestone, rupiah } from "@/lib/format";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Beranda — STEP by Aladin" },
      { name: "description", content: "Lihat progres STEP Journey menuju target setoran awal haji Rp25 juta dan langkah hari ini." },
      { property: "og:title", content: "Beranda — STEP by Aladin" },
      { property: "og:description", content: "Setiap hari bisa jadi satu langkah." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const TODAY = [
  { t: "Alfamart", v: "+10 Hajj Miles", icon: ShoppingBag, cyan: true },
  { t: "Round-Up", v: "+Rp2.300", icon: Coins, cyan: false },
  { t: "Auto Save", v: "+Rp25.000", icon: PiggyBank, cyan: false },
];

function HomePage() {
  const { activity, savings, monthly, addSaving } = useJourney();
  const { t, pick } = useI18n();
  const base = projectMilestone(savings, monthly);
  const boosted = projectMilestone(savings, monthly + 80_000);
  const sooner = base.months - boosted.months;

  return (
    <AppShell>
      <header className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground md:hidden">S.T.E.P. by Aladin</p>
          <h1 className="truncate text-xl font-extrabold tracking-tight text-primary md:text-2xl">{t("home.greeting")}</h1>
          <p className="text-sm text-muted-foreground">{t("home.sub")}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <LangSwitch className="md:hidden" />
          <button onClick={() => toast(t("home.noNotif"))} className="grid size-10 place-items-center rounded-full border border-border bg-card text-primary">
            <Bell className="size-[18px]" strokeWidth={1.8} />
          </button>
          <Link to="/profile" className="grid size-10 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">RA</Link>
        </div>
      </header>

      <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr] lg:items-start">
        <div className="space-y-5">
          <JourneyProgress />

          <section className="surface-card p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--emerald)]">{t("home.today")}</p>
            <h2 className="mt-1 text-base font-extrabold text-primary">{t("home.todayTitle")}</h2>
            <ul className="mt-4 space-y-3">
              {TODAY.map(({ t, v, icon: Icon, cyan }) => (
                <li key={t} className="flex items-center gap-3">
                  <span className={`grid size-9 shrink-0 place-items-center rounded-full ${cyan ? "bg-[var(--cyan-soft)] text-[var(--cyan)]" : "bg-[var(--emerald-soft)] text-[var(--accent-foreground)]"}`}>
                    <Icon className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold text-primary">{t}</span>
                  <span className="shrink-0 text-sm font-bold text-[var(--emerald)]">{v}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                addSaving(50_000, t("save.now"), `+${rupiah(50_000)}`);
                toast.success(`${rupiah(50_000)} — ${t("home.closer")}`);
              }}
              className="mt-5 w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              {t("home.next")}
            </button>
          </section>
        </div>

        <div className="space-y-5">
          <HajjMilesCard />

          <section className="surface-card border-l-4 border-l-[var(--emerald)] p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">{t("home.simEyebrow")}</p>
            <h2 className="mt-1 text-base font-extrabold text-primary">{t("home.simTitle")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {pick({
                id: `Tambah Auto Save ${rupiah(20_000)}/minggu dan capai target ${rupiah(25_000_000)} sekitar ${Math.max(sooner, 1)} bulan lebih awal.`,
                en: `Add ${rupiah(20_000)}/week Auto Save and reach your ${rupiah(25_000_000)} goal about ${Math.max(sooner, 1)} months sooner.`,
              })}
            </p>
            <Link to="/journey" className="mt-4 inline-flex rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground">{t("home.simCta")}</Link>
          </section>

          <section className="surface-card p-5">
            <h2 className="text-base font-extrabold text-primary">{t("home.activity")}</h2>
            <ul className="mt-4 space-y-3">
              {activity.slice(0, 4).map((a) => (
                <li key={a.id} className="flex items-center gap-3 rise-in">
                  {a.kind === "miles" ? <Sparkles className="size-4 text-[var(--cyan)]" /> : <PiggyBank className="size-4 text-[var(--emerald)]" />}
                  <span className="min-w-0 flex-1 truncate text-sm text-primary">{a.title}</span>
                  <span className="shrink-0 text-sm font-bold text-[var(--emerald)]">{a.detail}</span>
                </li>
              ))}
            </ul>
          </section>

          <Link to="/story" className="block text-center text-xs font-bold text-muted-foreground hover:text-primary">{t("home.watch")}</Link>
        </div>
      </div>

      <div className="mt-8">
        <StepStoriesRail creators={CREATORS} />
      </div>
    </AppShell>
  );
}
