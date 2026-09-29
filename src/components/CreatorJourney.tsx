import { Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useI18n } from "@/context/i18n";
import { rupiah } from "@/lib/format";
import type { Creator } from "@/lib/campaigns";

export function CreatorJourney({ creator, className = "" }: { creator: Creator; className?: string }) {
  const { t, pick, lang } = useI18n();
  const [following, setFollowing] = useState(false);
  const pct = Math.round((creator.day / creator.totalDays) * 100);

  return (
    <article className={`relative flex min-h-[460px] flex-col overflow-hidden rounded-3xl bg-primary shadow-[var(--shadow-float)] ${className}`}>
      <img src={creator.image} alt={`${creator.name}, ${pick(creator.role)}`} loading="lazy" width={832} height={1088} className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/55 to-transparent" />
      <div className="relative flex items-start justify-between p-4">
        <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
          {pick(creator.campaign)}
        </span>
        <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-primary">
          {t("stories.day")} {creator.day} / {creator.totalDays}
        </span>
      </div>
      <div className="relative mt-auto p-4 text-white">
        <p className="text-sm font-bold">
          {creator.name} <span className="font-medium text-white/65">· {creator.age} · {pick(creator.role)}</span>
        </p>
        <p className="mt-2 text-lg font-extrabold leading-snug">“{pick(creator.quote)}”</p>
        <p className="mt-2 text-xs text-white/70">{pick(creator.challenge)}</p>

        <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-md">
          <div>
            <p className="text-base font-extrabold">{rupiah(creator.saved)}</p>
            <p className="text-[10px] uppercase tracking-wider text-white/60">{t("stories.collected")}</p>
          </div>
          <div>
            <p className="flex items-center gap-1 text-base font-extrabold">
              <Sparkles className="size-3.5 text-[var(--cyan)]" />
              {creator.miles.toLocaleString(lang === "id" ? "id-ID" : "en-US")}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-white/60">Hajj Miles</p>
          </div>
          <div className="col-span-2 h-1 rounded-full bg-white/20">
            <div className="h-full rounded-full bg-[var(--emerald)]" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            onClick={() => {
              setFollowing((f) => !f);
              if (!following) toast.success(`${t("stories.followed")} ${creator.name}.`);
            }}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5 text-xs font-bold transition-colors ${
              following ? "bg-white/15 text-white" : "bg-white text-primary"
            }`}
          >
            {following ? <><Check className="size-3.5" /> {t("stories.following")}</> : t("stories.follow")}
          </button>
          <Link to="/step" className="rounded-full border border-white/30 px-4 py-2.5 text-xs font-bold text-white">
            {t("stories.start")}
          </Link>
        </div>
      </div>
    </article>
  );
}

export function StepStoriesRail({ creators }: { creators: Creator[] }) {
  const { t } = useI18n();
  return (
    <section>
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--emerald)]">STEP Stories</p>
          <p className="text-sm text-muted-foreground">{t("stories.sub")}</p>
        </div>
        <Link to="/campaigns" className="shrink-0 text-xs font-bold text-primary">{t("home.storiesAll")} →</Link>
      </div>
      <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
        {creators.map((c) => (
          <CreatorJourney key={c.id} creator={c} className="w-[78%] shrink-0 snap-start md:w-auto" />
        ))}
      </div>
    </section>
  );
}
