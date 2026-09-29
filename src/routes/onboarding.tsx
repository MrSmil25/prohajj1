import { createFileRoute } from "@tanstack/react-router";
import { Onboarding } from "@/components/Onboarding";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Onboarding — STEP by Aladin" },
      {
        name: "description",
        content: "Set your Hajj goal, savings and monthly target in four quick steps.",
      },
      { property: "og:title", content: "Onboarding — STEP by Aladin" },
      {
        property: "og:description",
        content: "Set your Hajj goal, savings and monthly target in four quick steps.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Onboarding,
});
