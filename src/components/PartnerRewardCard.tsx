import { toast } from "sonner";
import { useJourney } from "@/context/journey";
import type { PartnerReward } from "@/lib/hajj-data";

export function PartnerRewardCard({ reward }: { reward: PartnerReward }) {
  const { addMiles } = useJourney();

  return (
    <article className="surface-card flex items-center gap-4 p-4 transition-transform hover:-translate-y-0.5">
      <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary text-sm font-extrabold text-primary">
        {reward.name.slice(0, 2).toUpperCase()}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-extrabold text-primary">{reward.name}</p>
        <p className="truncate text-xs text-muted-foreground">{reward.detail}</p>
      </div>
      <button
        onClick={() => {
          addMiles(reward.miles, reward.name, `+${reward.miles} Miles`);
          toast.success(`${reward.reward} from ${reward.name}`);
        }}
        className="shrink-0 rounded-full bg-[var(--cyan-soft)] px-3 py-1.5 text-xs font-bold text-[var(--cyan)] transition-colors hover:bg-[var(--cyan)] hover:text-white"
      >
        {reward.reward}
      </button>
    </article>
  );
}
