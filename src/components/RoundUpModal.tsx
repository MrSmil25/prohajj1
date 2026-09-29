import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useJourney } from "@/context/journey";
import { rupiah } from "@/lib/format";

export function RoundUpModal({ trigger }: { trigger: ReactNode }) {
  const { roundUp, setRoundUp } = useJourney();

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-sm rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-primary">Hajj Round-Up</DialogTitle>
          <DialogDescription>Spare change, quietly working for your journey.</DialogDescription>
        </DialogHeader>

        <div className="rounded-2xl bg-secondary p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Coffee</span>
            <span className="font-semibold text-primary">{rupiah(18_600)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Rounded to</span>
            <span className="font-semibold text-primary">{rupiah(20_000)}</span>
          </div>
          <div className="mt-3 border-t border-dashed border-border pt-3">
            <p className="num-hero text-2xl text-[var(--emerald)]">{rupiah(1_400)}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              automatically goes toward <span className="font-semibold">My Hajj Journey</span>
            </p>
          </div>
        </div>

        <label className="flex items-center justify-between rounded-2xl border border-border p-4">
          <span className="text-sm font-semibold text-primary">Activate Hajj Round-Up</span>
          <Switch checked={roundUp} onCheckedChange={setRoundUp} />
        </label>

        <p className="text-xs text-muted-foreground">
          Based on your spending, Round-Up could add approximately{" "}
          <span className="font-semibold text-primary">{rupiah(85_000)}/month</span> to your journey.
        </p>
      </DialogContent>
    </Dialog>
  );
}
