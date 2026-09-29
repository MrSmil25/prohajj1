import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { PartnerRewardCard } from "@/components/PartnerRewardCard";
import { HajjMilesCard } from "@/components/HajjMilesCard";
import { PARTNER_REWARDS, type EarnCategory } from "@/lib/hajj-data";

const CATEGORIES: EarnCategory[] = ["Shop", "Save", "Challenge", "Invite"];

export const Route = createFileRoute("/earn")({
  head: () => ({
    meta: [
      { title: "Earn Hajj Miles — STEP by Aladin" },
      {
        name: "description",
        content: "Everyday actions. Meaningful progress. Earn Miles from shopping, saving and inviting.",
      },
      { property: "og:title", content: "Earn Hajj Miles — STEP by Aladin" },
      {
        property: "og:description",
        content: "Everyday actions. Meaningful progress. Earn Miles from shopping and saving.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EarnPage,
});

function EarnPage() {
  const [active, setActive] = useState<EarnCategory>("Shop");

  return (
    <AppShell>
      <PageHeader title="Earn Hajj Miles" subtitle="Everyday actions. Meaningful progress." />

      <div className="grid gap-5 lg:grid-cols-[1fr_320px] lg:items-start">
        <div className="space-y-5">
          <section className="navy-card p-6">
            <div className="geo-pattern pointer-events-none absolute inset-0 opacity-60" />
            <div className="relative">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--emerald)]">
                Hajj Miles Week
              </p>
              <p className="mt-3 max-w-xs text-xl font-extrabold leading-snug">
                2× Miles on selected everyday purchases.
              </p>
              <p className="mt-2 text-xs text-white/60">Until 30 September</p>
            </div>
          </section>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                  active === c
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-muted-foreground hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {PARTNER_REWARDS.filter((r) => r.category === active).map((r) => (
              <PartnerRewardCard key={r.name} reward={r} />
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <HajjMilesCard />
          <Link
            to="/challenges"
            className="surface-card block p-5 transition-transform hover:-translate-y-0.5"
          >
            <p className="text-sm font-extrabold text-primary">Saving Challenges</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Turn consistency into Miles with weekly challenges.
            </p>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
