import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { MilestoneMap } from "@/components/MilestoneMap";
import { JourneyProgress } from "@/components/JourneyProgress";
import { SavingSimulator } from "@/components/SavingSimulator";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "Your Journey to Baitullah — STEP by Aladin" },
      {
        name: "description",
        content: "A milestone map from Niat to Rp25.000.000 — every step of your Hajj savings.",
      },
      { property: "og:title", content: "Your Journey to Baitullah — STEP by Aladin" },
      {
        property: "og:description",
        content: "A milestone map from Niat to Rp25.000.000 — every step of your Hajj savings.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JourneyPage,
});

function JourneyPage() {
  return (
    <AppShell>
      <PageHeader title="Your Journey to Baitullah" subtitle="Every step counts." />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
        <div className="order-2 lg:order-1">
          <MilestoneMap />
        </div>
        <div className="order-1 space-y-5 lg:order-2 lg:sticky lg:top-10">
          <JourneyProgress />
          <SavingSimulator />
        </div>
      </div>
    </AppShell>
  );
}
