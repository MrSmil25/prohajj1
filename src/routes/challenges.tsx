import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { ChallengeCard } from "@/components/ChallengeCard";
import { CHALLENGES } from "@/lib/hajj-data";

export const Route = createFileRoute("/challenges")({
  head: () => ({
    meta: [
      { title: "Challenges — STEP by Aladin" },
      {
        name: "description",
        content: "7-Day Istiqamah, Friday Saver and Round-Up Hero — saving challenges that earn Miles.",
      },
      { property: "og:title", content: "Challenges — STEP by Aladin" },
      {
        property: "og:description",
        content: "Saving challenges that turn consistency into Hajj Miles.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChallengesPage,
});

function ChallengesPage() {
  return (
    <AppShell>
      <PageHeader title="Challenges" subtitle="Consistency, rewarded." />
      <div className="grid gap-4 md:grid-cols-2">
        {CHALLENGES.map((c) => (
          <ChallengeCard key={c.id} challenge={c} />
        ))}
      </div>
    </AppShell>
  );
}
