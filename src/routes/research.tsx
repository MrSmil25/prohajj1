import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { LangSwitch, useI18n } from "@/context/i18n";

// Illustrative data — replace values here once real research results arrive.
const INSIGHTS = [
  { title: { id: "Bahasa yang Disukai", en: "Preferred Language" }, rows: [["Bahasa Indonesia", 72], ["Campuran ID/EN", 21], ["English", 7]] },
  { title: { id: "Platform yang Disukai", en: "Preferred Platform" }, rows: [["TikTok", 41], ["Instagram", 33], ["YouTube", 18], ["WhatsApp", 8]] },
  { title: { id: "Tipe Kreator Tepercaya", en: "Trusted Creator Type" }, rows: [["Finance creator", 34], ["Religious educator", 29], ["Everyday micro-creator", 24], ["Celebrity", 13]] },
  { title: { id: "Alasan Percaya Kreator", en: "Reasons for Creator Trust" }, rows: [["Transparent progress", 38], ["Relatable life stage", 31], ["Religious credibility", 20], ["Popularity", 11]] },
  { title: { id: "Wilayah Kampanye Favorit", en: "Preferred Campaign Territory" }, rows: [["STEP for Parents", 27], ["30 Days Closer", 21], ["Hajj Together", 17], ["My First STEP", 15], ["Every Purchase Counts", 12], ["Creator Journey", 8]] },
  { title: { id: "Preferensi Kreator (kandidat konsep riset)", en: "Creator Preference (research concept candidates)" }, rows: [["Fadil Jaidi", 22], ["Habib Ja'far", 19], ["Fellexandro Ruby", 14], ["Felicia Putri Tjiasaka", 11], ["Raditya Dika", 9], ["Prita Ghozie", 8], ["Other / smaller relatable creators", 10], ["No influencer preferred", 7]] },
  { title: { id: "Alasan Memilih Kreator", en: "Why Respondents Chose a Creator" }, rows: [["Relatable", 31], ["Doesn't feel like advertising", 27], ["Easy to understand", 24], ["Credible", 22], ["Family-oriented", 19], ["Religious relevance", 17], ["Entertaining", 15], ["Financial expertise", 13]] },
] as const;

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
  const { t, pick } = useI18n();
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
        <div className="flex items-center justify-between"><p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--emerald)]">Research Mode</p><LangSwitch /></div>
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

        <section className="mt-10">
          <h2 className="text-xl font-extrabold text-primary">{pick({ id: "Dimensi Riset Kampanye", en: "Campaign Research Dimensions" })}</h2>
          <p className="mt-1 inline-block rounded-full bg-[var(--emerald-soft)] px-3 py-1 text-[11px] font-bold text-primary">Illustrative data — awaiting research results.</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {INSIGHTS.map((g) => (
              <div key={g.title.en} className="surface-card p-5">
                <h3 className="text-sm font-extrabold text-primary">{pick(g.title)}</h3>
                <ul className="mt-3 space-y-2.5">
                  {g.rows.map(([label, v]) => (
                    <li key={label}>
                      <div className="flex justify-between text-xs"><span className="text-muted-foreground">{label}</span><span className="font-bold text-primary">{v}%</span></div>
                      <div className="mt-1 h-1.5 rounded-full bg-secondary"><div className="h-full rounded-full bg-[var(--emerald)] opacity-70" style={{ width: `${v}%` }} /></div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">{pick({ id: "Nama kreator adalah referensi riset & kandidat konsep, bukan mitra atau endorsement Aladin.", en: "Creator names are research references and concept candidates, not Aladin partners or endorsements." })}</p>
        </section>

        <Link to="/home" className="mt-8 inline-block text-xs font-bold text-muted-foreground hover:text-primary">{t("research.back")}</Link>
      </div>
    </div>
  );
}
