import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "id" | "en";
type Dict = Record<string, { id: string; en: string }>;

// Brand names (STEP, Hajj Miles, Hajj Together, STEP Stories) are never translated.
export const DICT = {
  "nav.home": { id: "Beranda", en: "Home" },
  "nav.journey": { id: "Perjalanan", en: "Journey" },
  "nav.campaigns": { id: "Kampanye", en: "Campaigns" },
  "nav.together": { id: "Bersama", en: "Together" },
  "nav.challenges": { id: "Tantangan", en: "Challenges" },
  "nav.profile": { id: "Profil", en: "Profile" },
  "brand.tagline": { id: "Satu Langkah, Lebih Dekat.", en: "One Step, Closer." },
  "home.greeting": { id: "Selamat pagi, Rasyid.", en: "Good morning, Rasyid." },
  "home.sub": { id: "Setiap hari bisa jadi satu langkah.", en: "Every day can be a step forward." },
  "home.today": { id: "Langkah Hari Ini", en: "Today's Step" },
  "home.todayTitle": { id: "3 langkah hari ini", en: "3 steps today" },
  "home.next": { id: "Ambil Langkah Berikutnya", en: "Take Your Next Step" },
  "home.closer": { id: "satu langkah lebih dekat.", en: "one step closer." },
  "home.noNotif": { id: "Belum ada notifikasi baru.", en: "No new notifications yet." },
  "home.simEyebrow": { id: "Simulasi Cerdas", en: "Smart Simulation" },
  "home.simTitle": { id: "Sampai lebih cepat.", en: "Get there sooner." },
  "home.simCta": { id: "Lihat Simulasi", en: "See Simulation" },
  "home.activity": { id: "Aktivitas terakhir", en: "Recent activity" },
  "home.watch": { id: "Tonton kisah STEP →", en: "Watch the STEP story →" },
  "home.storiesAll": { id: "Lihat semua", en: "See all" },
  "stories.sub": { id: "Langkah mereka. Mungkin langkahmu berikutnya.", en: "Their journey. Maybe your next step." },
  "stories.collected": { id: "terkumpul", en: "saved" },
  "stories.follow": { id: "Ikuti Perjalanannya", en: "Follow the Journey" },
  "stories.following": { id: "Mengikuti", en: "Following" },
  "stories.start": { id: "Mulai STEP-ku", en: "Start My STEP" },
  "stories.day": { id: "Hari", en: "Day" },
  "stories.followed": { id: "Kamu mengikuti perjalanan", en: "You're following" },
  "camp.title": { id: "STEP Together", en: "STEP Together" },
  "camp.sub": { id: "Banyak cara untuk mengambil langkah pertama.", en: "There's more than one way to take your first step." },
  "camp.leadsTo": { id: "Mengarah ke", en: "Leads to" },
  "save.now": { id: "Nabung Sekarang", en: "Save Now" },
  "closer": { id: "lebih dekat", en: "closer" },
  "profile.lang": { id: "Bahasa", en: "Language" },
  "research.back": { id: "← Kembali ke aplikasi", en: "← Back to the app" },
} satisfies Dict;

export type TKey = keyof typeof DICT;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: TKey) => string; pick: <T>(v: { id: T; en: T }) => T };
const I18nContext = createContext<Ctx | null>(null);
const KEY = "step-lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("id");
  useEffect(() => {
    const saved = window.localStorage.getItem(KEY);
    if (saved === "en" || saved === "id") setLangState(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(KEY, l);
  }, []);
  const t = useCallback((k: TKey) => DICT[k][lang], [lang]);
  const pick = useCallback(<T,>(v: { id: T; en: T }) => v[lang], [lang]);
  return <I18nContext.Provider value={{ lang, setLang, t, pick }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

export function LangSwitch({ light = false, className = "" }: { light?: boolean; className?: string }) {
  const { lang, setLang } = useI18n();
  const base = light ? "border-white/25 bg-white/10" : "border-border bg-card";
  return (
    <div role="group" aria-label="Language" className={`inline-flex items-center rounded-full border p-0.5 text-[11px] font-bold ${base} ${className}`}>
      {(["id", "en"] as const).map((l) => {
        const active = lang === l;
        return (
          <button
            key={l}
            onClick={() => setLang(l)}
            aria-pressed={active}
            className={`rounded-full px-2.5 py-1 uppercase tracking-wider transition-colors ${
              active ? (light ? "bg-white text-primary" : "bg-primary text-primary-foreground") : light ? "text-white/70" : "text-muted-foreground hover:text-primary"
            }`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
