import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { StepWordmark } from "@/components/AppShell";
import { LangSwitch } from "@/context/i18n";
import { HumanStoryCard } from "@/components/HumanStoryCard";
import groceries from "@/assets/story-groceries.jpg";
import mother from "@/assets/story-mother.jpg";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "29 Tahun — Kisah STEP by Aladin" },
      { name: "description", content: "Perjalanan menuju haji diukur dalam puluhan tahun. STEP by Aladin membuat setiap hari jadi satu langkah." },
      { property: "og:title", content: "29 Tahun — Kisah STEP by Aladin" },
      { property: "og:description", content: "Bagaimana jika aktivitas sehari-hari membuat perjalanan haji terasa lebih dekat?" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StoryPage,
});

const ACTIONS = [
  { t: "Belanja kebutuhan", v: "+ Hajj Miles" },
  { t: "Round-Up", v: "+ Rp2.300" },
  { t: "Nabung Jumat", v: "+ Rp25.000" },
  { t: "Kontribusi keluarga", v: "+ Rp100.000" },
];

function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && setSeen(true), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

function Scene({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="relative flex min-h-screen snap-start items-center justify-center overflow-hidden px-6 py-20">
      {children}
    </section>
  );
}

function Next({ to }: { to: string }) {
  return (
    <a href={`#${to}`} className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-xs font-bold uppercase tracking-[0.3em] text-white/60 hover:text-white">
      Teruskan <ChevronDown className="size-4 animate-bounce" />
    </a>
  );
}

function StoryPage() {
  const [pathRef, pathSeen] = useInView<HTMLDivElement>();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!pathSeen) return;
    setStep(0);
    const id = setInterval(() => setStep((s) => (s >= ACTIONS.length ? s : s + 1)), 900);
    return () => clearInterval(id);
  }, [pathSeen]);

  const marker = 4 + step * 4;

  return (
    <div className="h-screen snap-y snap-mandatory overflow-y-auto bg-navy-deep text-white [scroll-behavior:smooth]">
      <Scene>
        <div className="geo-pattern pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative max-w-3xl text-center rise-in">
          <h1 className="num-hero text-[22vw] leading-none md:text-[180px]">29 TAHUN.</h1>
          <p className="mx-auto mt-6 max-w-md text-base text-white/70 md:text-lg">
            Bagi banyak orang Indonesia, perjalanan menuju haji diukur dalam puluhan tahun.
          </p>
        </div>
        <Next to="s2" />
      </Scene>

      <Scene id="s2">
        <div className="relative max-w-3xl text-center">
          <p className="num-hero text-[14vw] leading-none text-[var(--emerald)] md:text-[128px]">Rp25.000.000</p>
          <p className="mx-auto mt-6 max-w-lg text-base text-white/70 md:text-lg">
            Salah satu langkah pentingnya dimulai dengan mempersiapkan setoran awal.
          </p>
        </div>
        <Next to="s3" />
      </Scene>

      <Scene id="s3">
        <div ref={pathRef} className="w-full max-w-5xl">
          <div className="flex justify-between text-[11px] font-bold uppercase tracking-[0.25em] text-white/60">
            <span>Hari ini</span>
            <span>Target setoran awal</span>
          </div>
          <div className="relative mt-4 h-[3px] rounded-full bg-white/15">
            <div className="h-full rounded-full transition-[width] duration-700" style={{ width: `${marker}%`, backgroundImage: "var(--gradient-progress)" }} />
            <span className="glow-dot absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--emerald)] transition-[left] duration-700" style={{ left: `${marker}%` }} />
          </div>
          <p className="mx-auto mt-14 max-w-2xl text-center text-2xl font-extrabold leading-snug md:text-4xl">
            Bagaimana jika aktivitas sehari-hari bisa membuat perjalanan itu terasa lebih dekat?
          </p>
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
            {ACTIONS.map((a, i) => (
              <div
                key={a.t}
                className={`rounded-2xl border border-white/15 bg-white/5 p-4 transition-all duration-500 ${
                  step > i ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                <p className="text-sm text-white/70">{a.t}</p>
                <p className="mt-1 text-lg font-extrabold text-[var(--emerald)]">{a.v}</p>
              </div>
            ))}
          </div>
        </div>
        <Next to="s4" />
      </Scene>

      <Scene id="s4">
        <div className="grid w-full max-w-5xl gap-5 md:grid-cols-2">
          <HumanStoryCard
            image={groceries}
            alt="Profesional muda berbelanja kebutuhan harian"
            headline={"Belanja seperti biasa.\nSelangkah lebih dekat."}
            overlay={
              <>
                <div className="flex justify-between text-sm"><span className="font-bold">Alfamart</span><span>Rp87.300</span></div>
                <p className="mt-2 text-sm font-bold text-[var(--emerald)]">+12 Hajj Miles · +Rp2.700 Round-Up</p>
              </>
            }
            progress={25}
          />
          <HumanStoryCard
            image={mother}
            alt="Seorang pemuda makan malam bersama ibunya"
            headline="Perjalanannya bukan cuma tentang dirinya."
            overlay={
              <>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">Haji untuk Ibu</p>
                <div className="mt-1 flex items-baseline justify-between"><span className="text-lg font-extrabold">Rp8.400.000</span><span className="text-sm font-bold text-[var(--emerald)]">33,6%</span></div>
              </>
            }
            progress={33.6}
          />
        </div>
        <Next to="s5" />
      </Scene>

      <Scene id="s5">
        <div className="geo-pattern pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative text-center">
          <div className="inline-block text-left"><StepWordmark light /></div>
          <h2 className="mt-8 text-4xl font-extrabold leading-[1.05] md:text-7xl">
            Save. Transact.<br />Earn. <span className="text-[var(--emerald)]">Progress.</span>
          </h2>
          <p className="mt-6 text-lg text-white/75">Satu Langkah, Lebih Dekat.</p>
          <p className="text-sm text-white/50">Everyday Gets You Closer.</p>
          <Link to="/onboarding" className="mt-10 inline-flex rounded-full bg-[var(--emerald)] px-7 py-3.5 text-sm font-bold text-primary transition-transform hover:-translate-y-0.5">
            Mulai Perjalananku
          </Link>
        </div>
      </Scene>
    </div>
  );
}
