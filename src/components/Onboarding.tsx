import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { KaabaMark } from "@/components/KaabaMark";
import { useJourney } from "@/context/journey";
import { projectMilestone, rupiah } from "@/lib/format";

const GOALS = ["My Hajj", "Hajj for Mom", "Hajj for Dad", "Hajj Together"];

export function Onboarding() {
  const navigate = useNavigate();
  const { goal, setGoal, savings, monthly, setMonthly } = useJourney();
  const [step, setStep] = useState(0);
  const [current, setCurrent] = useState(savings);
  const [target, setTarget] = useState(monthly);

  const projection = projectMilestone(current, target);
  const faster = projectMilestone(current, target + 100_000);

  return (
    <div className="relative min-h-screen bg-primary text-white">
      <div className="geo-pattern pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[560px] flex-col px-6 py-10">
        <div className="flex items-center gap-2">
          <KaabaMark className="size-5 text-[var(--emerald)]" />
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/70">
            STEP by Aladin
          </p>
        </div>

        <div className="mt-8 flex gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-[var(--emerald)]" : "bg-white/15"
              }`}
            />
          ))}
        </div>

        <div key={step} className="rise-in mt-12 flex-1">
          {step === 0 && (
            <div>
              <h1 className="text-[34px] font-extrabold leading-[1.1] tracking-tight md:text-5xl">
                One journey.
                <br />
                Millions of small steps.
              </h1>
              <p className="mt-5 max-w-sm text-sm text-white/70">
                Turn everyday financial habits into progress toward your Hajj journey.
              </p>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">What are you saving for?</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {GOALS.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGoal(g)}
                    className={`rounded-2xl border p-5 text-left transition-all ${
                      goal === g
                        ? "border-[var(--emerald)] bg-white/10"
                        : "border-white/15 hover:border-white/35"
                    }`}
                  >
                    <KaabaMark className="size-5 text-[var(--emerald)]" />
                    <p className="mt-3 text-sm font-bold">{g}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-9">
              <div>
                <p className="text-sm text-white/60">Current Hajj savings</p>
                <p className="num-hero mt-1 text-3xl">{rupiah(current)}</p>
                <Slider
                  className="mt-5"
                  min={0}
                  max={25_000_000}
                  step={250_000}
                  value={[current]}
                  onValueChange={(v) => setCurrent(v[0] ?? current)}
                />
              </div>
              <div>
                <p className="text-sm text-white/60">Monthly saving target</p>
                <p className="num-hero mt-1 text-3xl">{rupiah(target)}</p>
                <Slider
                  className="mt-5"
                  min={100_000}
                  max={2_000_000}
                  step={50_000}
                  value={[target]}
                  onValueChange={(v) => setTarget(v[0] ?? target)}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="text-sm text-white/60">Your {rupiah(25_000_000)} milestone</p>
              <p className="num-hero mt-2 text-[40px] leading-none text-[var(--emerald)]">
                {projection.label}
              </p>
              <p className="mt-4 text-sm text-white/70">
                Estimated at {rupiah(target)} per month.
              </p>
              <div className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-5">
                <p className="text-sm font-bold">Small changes could get you there sooner.</p>
                <p className="mt-2 text-xs text-white/65">
                  Adding {rupiah(100_000)} monthly moves your milestone to{" "}
                  <span className="font-bold text-[var(--emerald)]">{faster.label}</span>.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 space-y-3">
          <button
            onClick={() => {
              if (step === 3) {
                setMonthly(target);
                navigate({ to: "/home" });
              } else setStep(step + 1);
            }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--emerald)] px-6 py-4 text-sm font-extrabold text-[oklch(0.24_0.08_165)] transition-transform hover:-translate-y-0.5"
          >
            {step === 0 ? "Start My Journey" : step === 3 ? "Build My Journey" : "Continue"}
            <ArrowRight className="size-4" strokeWidth={2.4} />
          </button>
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="w-full py-2 text-xs font-semibold text-white/50 hover:text-white"
            >
              Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
