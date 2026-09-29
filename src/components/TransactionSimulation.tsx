import { useState } from "react";
import { Check, Zap } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useJourney } from "@/context/journey";
import { rupiah } from "@/lib/format";

const STEPS = [
  { title: "Transaction complete", detail: `Alfamart Purchase · ${rupiah(47_700)}` },
  { title: "+10 Hajj Miles", detail: "Pay with Aladin reward" },
  { title: `Round-Up +${rupiah(2_300)}`, detail: "Added to My Hajj Journey" },
  { title: "Journey updated", detail: "You moved closer to Baitullah." },
];

export function TransactionSimulation({ variant }: { variant: "inline" | "floating" }) {
  const { addMiles, addSaving } = useJourney();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  const run = () => {
    setStep(0);
    setOpen(true);
    const timers = [
      setTimeout(() => setStep(1), 900),
      setTimeout(() => {
        setStep(2);
        addMiles(10, "Alfamart Purchase", "+10 Miles");
      }, 1800),
      setTimeout(() => {
        setStep(3);
        addSaving(2_300, "Transaction Round-up", `+${rupiah(2_300)}`);
      }, 2700),
      setTimeout(() => setOpen(false), 4600),
    ];
    return () => timers.forEach(clearTimeout);
  };

  return (
    <>
      <button
        onClick={run}
        className={
          variant === "floating"
            ? "fixed bottom-24 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-xs font-bold text-primary-foreground shadow-[var(--shadow-float)]"
            : "inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-xs font-bold text-primary transition-colors hover:bg-secondary"
        }
      >
        <Zap className="size-4" strokeWidth={2} /> Demo Transaction
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xs rounded-3xl" aria-describedby={undefined}>
          <h2 className="text-sm font-bold text-primary">Live simulation</h2>
          <ul className="mt-2 space-y-3">
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                className={`flex items-start gap-3 transition-opacity duration-500 ${
                  i <= step ? "opacity-100" : "opacity-25"
                }`}
              >
                <span
                  className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full ${
                    i <= step ? "bg-[var(--emerald)] text-white sparkle-pop" : "bg-secondary"
                  }`}
                >
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-primary">{s.title}</span>
                  <span className="block text-xs text-muted-foreground">{s.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}
