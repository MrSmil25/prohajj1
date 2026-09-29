import { useNavigate } from "@tanstack/react-router";
import { Coins, Gift, PiggyBank, Plus, Trophy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useJourney } from "@/context/journey";
import { rupiah } from "@/lib/format";

export function QuickActionSheet({ variant = "fab" }: { variant?: "fab" | "inline" }) {
  const [open, setOpen] = useState(false);
  const { addSaving, setRoundUp, roundUp } = useJourney();
  const navigate = useNavigate();

  const actions = [
    {
      label: "Nabung Sekarang",
      hint: `Tambah ${rupiah(50_000)} ke Ala Impian Haji`,
      icon: PiggyBank,
      run: () => {
        addSaving(50_000, "Nabung Sekarang", `+${rupiah(50_000)}`);
        toast.success(`${rupiah(50_000)} — satu langkah lebih dekat.`);
      },
    },
    {
      label: roundUp ? "Round-Up Aktif" : "Aktifkan Round-Up",
      hint: "Kembalian transaksi otomatis ditabung",
      icon: Coins,
      run: () => {
        setRoundUp(true);
        toast.success("Round-Up aktif.");
      },
    },
    {
      label: "Kirim untuk Keluarga",
      hint: "Dukung Haji untuk Ibu",
      icon: Gift,
      run: () => navigate({ to: "/family" }),
    },
    {
      label: "Lihat Tantangan",
      hint: "Istiqamah 7 hari, Nabung Jumat",
      icon: Trophy,
      run: () => navigate({ to: "/challenges" }),
    },
  ];

  return (
    <>
      {variant === "fab" ? (
        <button
          aria-label="Ambil satu langkah"
          onClick={() => setOpen(true)}
          className="-mt-7 mx-auto grid size-14 place-items-center rounded-full bg-[var(--emerald)] text-primary shadow-[var(--shadow-glow)] ring-4 ring-background transition-transform active:scale-95"
        >
          <Plus className="size-7" strokeWidth={2.5} />
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--emerald)] px-4 py-3 text-sm font-bold text-primary"
        >
          <Plus className="size-4" strokeWidth={2.5} /> Ambil Langkah
        </button>
      )}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="mx-auto max-w-md rounded-t-3xl">
          <SheetHeader>
            <SheetTitle className="text-primary">Ambil satu langkah lagi.</SheetTitle>
            <SheetDescription>Pilih langkah kecil untuk hari ini.</SheetDescription>
          </SheetHeader>
          <div className="grid grid-cols-2 gap-3 px-4 pb-6">
            {actions.map(({ label, hint, icon: Icon, run }) => (
              <button
                key={label}
                onClick={() => {
                  run();
                  setOpen(false);
                }}
                className="surface-card flex flex-col items-start gap-2 p-4 text-left transition-transform hover:-translate-y-0.5"
              >
                <Icon className="size-5 text-[var(--emerald)]" strokeWidth={1.8} />
                <span className="text-sm font-bold text-primary">{label}</span>
                <span className="text-[11px] leading-snug text-muted-foreground">{hint}</span>
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
