import { Link, useRouterState } from "@tanstack/react-router";
import { Footprints, Home, Map, Megaphone, Sparkles, Trophy, User, Users } from "lucide-react";
import { LangSwitch, useI18n, type TKey } from "@/context/i18n";
import type { ReactNode } from "react";
import { TransactionSimulation } from "@/components/TransactionSimulation";
import { QuickActionSheet } from "@/components/QuickActionSheet";

const MOBILE_LEFT = [
  { to: "/home", label: "nav.home", icon: Home },
  { to: "/step", label: "STEP", icon: Footprints },
] as const;
const MOBILE_RIGHT = [
  { to: "/campaigns", label: "nav.campaigns", icon: Megaphone },
  { to: "/family", label: "nav.together", icon: Users },
] as const;

const DESKTOP = [
  { to: "/home", label: "nav.home", icon: Home },
  { to: "/step", label: "STEP", icon: Footprints },
  { to: "/journey", label: "nav.journey", icon: Map },
  { to: "/earn", label: "Hajj Miles", icon: Sparkles },
  { to: "/campaigns", label: "nav.campaigns", icon: Megaphone },
  { to: "/family", label: "nav.together", icon: Users },
  { to: "/challenges", label: "nav.challenges", icon: Trophy },
  { to: "/profile", label: "nav.profile", icon: User },
] as const;

export function StepWordmark({ light = false }: { light?: boolean }) {
  return (
    <div>
      <p className={`text-2xl font-extrabold leading-none tracking-[0.12em] ${light ? "text-white" : "text-primary"}`}>
        S.T.E.P.
      </p>
      <p className={`mt-1 text-[11px] font-bold uppercase tracking-[0.2em] ${light ? "text-white/60" : "text-muted-foreground"}`}>
        by Aladin
      </p>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { t } = useI18n();
  const L = (k: string) => (k.startsWith("nav.") ? t(k as TKey) : k);

  const MobileItem = ({ to, label, icon: Icon }: { to: string; label: string; icon: typeof Home }) => {
    const active = pathname === to;
    return (
      <Link
        to={to}
        className={`flex flex-col items-center gap-1 rounded-lg py-1.5 text-[10px] font-semibold transition-colors ${
          active ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <Icon className="size-5" strokeWidth={active ? 2.2 : 1.7} />
        {L(label)}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-[1200px] gap-8 px-4 pb-28 pt-5 md:px-8 md:pb-10 md:pt-10">
        <aside className="hidden w-[184px] shrink-0 md:block">
          <div className="sticky top-10 space-y-8">
            <div>
              <StepWordmark />
              <p className="mt-2 text-xs text-muted-foreground">{t("brand.tagline")}</p>
              <LangSwitch className="mt-3" />
            </div>
            <nav className="space-y-1">
              {DESKTOP.map(({ to, label, icon: Icon }) => {
                const active = pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-primary"
                    }`}
                  >
                    <Icon className="size-[18px] shrink-0" strokeWidth={1.8} />
                    <span className="truncate">{L(label)}</span>
                  </Link>
                );
              })}
            </nav>
            <QuickActionSheet variant="inline" />
            <TransactionSimulation variant="inline" />
          </div>
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>

      <div className="md:hidden">
        <TransactionSimulation variant="floating" />
        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur">
          <div className="mx-auto grid max-w-md grid-cols-5 items-center px-2 py-2">
            {MOBILE_LEFT.map((n) => (
              <MobileItem key={n.to} {...n} />
            ))}
            <QuickActionSheet />
            {MOBILE_RIGHT.map((n) => (
              <MobileItem key={n.to} {...n} />
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}

export function PageHeader({ title, subtitle, eyebrow }: { title: string; subtitle?: string; eyebrow?: string }) {
  return (
    <header className="mb-5 rise-in">
      {eyebrow ? (
        <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--emerald)]">{eyebrow}</p>
      ) : null}
      <h1 className="text-2xl font-extrabold tracking-tight text-primary md:text-3xl">{title}</h1>
      {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
    </header>
  );
}
