import type { ReactNode } from "react";

export function HumanStoryCard({
  image,
  alt,
  headline,
  overlay,
  progress,
  className = "",
}: {
  image: string;
  alt: string;
  headline: ReactNode;
  overlay: ReactNode;
  progress?: number;
  className?: string;
}) {
  return (
    <article className={`relative overflow-hidden rounded-3xl bg-primary shadow-[var(--shadow-float)] ${className}`}>
      <img src={image} alt={alt} loading="lazy" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent" />
      <div className="relative flex h-full min-h-[380px] flex-col justify-end p-5 md:p-6">
        <h3 className="whitespace-pre-line text-xl font-extrabold leading-tight text-white md:text-2xl">
          {headline}
        </h3>
        <div className="mt-4 rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur-md">
          {overlay}
          {progress !== undefined ? (
            <div className="mt-3 h-1 w-full rounded-full bg-white/20">
              <div
                className="h-full rounded-full"
                style={{ width: `${Math.min(progress, 100)}%`, backgroundImage: "var(--gradient-progress)" }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
