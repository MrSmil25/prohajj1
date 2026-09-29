import { createFileRoute } from "@tanstack/react-router";
import { Onboarding } from "@/components/Onboarding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "STEP by Aladin — Everyday Gets You Closer" },
      {
        name: "description",
        content:
          "Start your Hajj journey: turn saving, round-ups and everyday purchases into visible progress to Rp25.000.000.",
      },
      { property: "og:title", content: "STEP by Aladin — Everyday Gets You Closer" },
      {
        property: "og:description",
        content: "Turn everyday financial habits into progress toward your Hajj journey.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Onboarding,
});
