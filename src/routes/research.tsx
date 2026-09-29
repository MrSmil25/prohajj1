import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research Mode — STEP by Aladin" },
      { name: "description", content: "Demonstrasi validasi konsep STEP untuk riset pasar dan juri kompetisi." },
      { property: "og:title", content: "Research Mode — STEP by Aladin" },
      { property: "og:description", content: "Bandingkan konsep dan urutkan fitur STEP." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResearchPage,
});

const CHOICES = ["Concept A", "STEP", "Sama menarik", "Tidak tertarik"];
const FEATURES = [
  { n: "Round-Up", d: "Kembalian transaksi otomatis ditabung." },
  { n: "Hajj Miles", d: "Miles dari aktivitas tertentu." },
  { n: "Journey", d: "Visualisasi progres menuju target." },
  { n: "Smart Saving", d: "Simulasi & rekomendasi personal." },
  { n: "Hajj Together", d: "Tabung bersama keluarga." },
  { n: "Auto Save", d: "Setoran rutin otomatis." },
  { n: "Saving Challenge", d: "Tantangan menabung konsisten." },
  { n: "Gift", d: "Hadiah untuk perjalanan orang tercinta." },
];

function ResearchPage() {
  const [choice, setChoice] = useState<string | null>(null);
  const [order, setOrder] = useState(FEATURES);

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= order.length) return;
    const next = [...order];
    const tmp = next[i]!; next[i] = next[j]!; next[j] = tmp;
    setOrder(next);
  };

  return (
    <div className="min-h-screen bg-background px-4 py-10 md:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--emerald)]">Research Mode</p>
        <h1 className="mt-1 text-3xl font-extrabold text-primary">Validasi Konsep STEP</h1>
        <p className="mt-2 text-sm text-muted-foreground">Demo cara konsep divalidasi dalam riset pasar. Bukan pengganti Google Forms.</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="surface-card p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Concept A</p>
            <h2 className="mt-1 text-xl font-extrabold text-primary">Tabungan Haji Digital</h2>
            <p className="mt-3 text-sm text-muted-foreground">Tentukan target Rp25 juta, atur tabungan rutin, dan pantau perkembangan tabungan melalui aplikasi.</p>
          </div>
          <div className="navy-card p-6">
            <p className="relative text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--emerald)]">Concept B</p>
            <h2 className="relative mt-1 text-xl font-extrabold text-white">STEP</h2>
            <p className="relative mt-3 text-sm text-white/75">Selain menabung rutin, aktivitas finansial sehari-hari dapat menjadi bagian dari perjalanan hajimu melalui Round-Up, Hajj Miles, tantangan menabung, kontribusi keluarga, dan Journey.</p>
          </div>
        </div>

        <section className="mt-6 surface-card p-6">
          <h3 className="font-extrabold text-primary">Konsep mana yang lebih menarik?</h3>
          <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
            {CHOICES.map((c) => (
              <button
                key={c}
                onClick={() => setChoice(c)}
                className={`rounded-xl border p-3 text-sm font-bold transition-colors ${
                  choice === c ? "border-[var(--emerald)] bg-[var(--emerald-soft)] text-primary" : "border-border text-muted-foreground hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        {choice && (
          <section className="mt-6 surface-card p-6 rise-in">
            <h3 className="font-extrabold text-primary">Urutkan fitur dari yang paling menarik</h3>
            <ol className="mt-4 space-y-2">
              {order.map((f, i) => (
                <li key={f.n} className="flex items-center gap-3 rounded-2xl bg-secondary px-4 py-3">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-primary">{f.n}</p>
                    <p className="truncate text-[11px] text-muted-foreground">{f.d}</p>
                  </div>
                  <button aria-label="Naik" onClick={() => move(i, -1)} className="grid size-8 place-items-center rounded-full border border-border text-primary disabled:opacity-30" disabled={i === 0}><ArrowUp className="size-4" /></button>
                  <button aria-label="Turun" onClick={() => move(i, 1)} className="grid size-8 place-items-center rounded-full border border-border text-primary disabled:opacity-30" disabled={i === order.length - 1}><ArrowDown className="size-4" /></button>
                </li>
              ))}
            </ol>
            <button
              onClick={() => toast.success(`Tersimpan: ${choice} · Top 3: ${order.slice(0, 3).map((f) => f.n).join(", ")}`)}
              className="mt-5 w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground"
            >
              Simpan Jawaban (demo)
            </button>
          </section>
        )}

        <Link to="/home" className="mt-8 inline-block text-xs font-bold text-muted-foreground hover:text-primary">← Kembali ke aplikasi</Link>
      </div>
    </div>
  );
}
