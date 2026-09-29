import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { LangSwitch, useI18n } from "@/context/i18n";
import { SavingSimulator } from "@/components/SavingSimulator";
import { RoundUpModal } from "@/components/RoundUpModal";
import { useJourney } from "@/context/journey";
import { miles as fmtMiles, rupiah } from "@/lib/format";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — STEP by Aladin" },
      {
        name: "description",
        content: "Manage your Hajj goal, monthly plan, Round-Up settings and Miles balance.",
      },
      { property: "og:title", content: "Profile — STEP by Aladin" },
      {
        property: "og:description",
        content: "Manage your Hajj goal, monthly plan, Round-Up and Miles balance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { goal, savings, monthly, milesTotal, roundUp } = useJourney();

  return (
    <AppShell>
      <PageHeader title={pick({ id: "Profil", en: "Profile" })} subtitle={pick({ id: "Rencanamu, ritmemu.", en: "Your plan, your pace." })} />
      <section className="surface-card mb-5 flex items-center justify-between gap-3 p-5">
        <div>
          <p className="text-sm font-bold text-primary">{t("profile.lang")}</p>
          <p className="text-xs text-muted-foreground">Bahasa Indonesia · English</p>
        </div>
        <LangSwitch />
      </section>

      <div className="grid gap-5 lg:grid-cols-[1fr_360px] lg:items-start">
        <div className="space-y-5">
          <section className="surface-card flex items-center gap-4 p-5">
            <span className="grid size-14 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              RA
            </span>
            <div className="min-w-0">
              <p className="truncate text-base font-extrabold text-primary">Rasyid Alfarizi</p>
              <p className="text-xs text-muted-foreground">Goal: {goal}</p>
            </div>
          </section>

          <section className="surface-card divide-y divide-border">
            {[
              { label: "Hajj savings", value: rupiah(savings) },
              { label: "Monthly plan", value: rupiah(monthly) },
              { label: "Hajj Miles", value: `${fmtMiles(milesTotal)} Miles` },
              { label: "Round-Up", value: roundUp ? "Active" : "Off" },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-3 p-4">
                <span className="text-sm text-muted-foreground">{row.label}</span>
                <span className="text-sm font-bold text-primary">{row.value}</span>
              </div>
            ))}
          </section>

          <section className="surface-card divide-y divide-border">
            <RoundUpModal
              trigger={
                <button className="flex w-full items-center justify-between gap-3 p-4 text-left">
                  <span className="text-sm font-semibold text-primary">Round-Up settings</span>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </button>
              }
            />
            <Link to="/challenges" className="flex items-center justify-between gap-3 p-4">
              <span className="text-sm font-semibold text-primary">My challenges</span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </Link>
            <Link to="/onboarding" className="flex items-center justify-between gap-3 p-4">
              <span className="text-sm font-semibold text-primary">Restart onboarding</span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </Link>
          </section>
        </div>

        <SavingSimulator />
      </div>
    </AppShell>
  );
}
