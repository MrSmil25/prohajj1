export function KaabaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3l7 3.6v10.8L12 21l-7-3.6V6.6L12 3z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M5 9.6h14" stroke="currentColor" strokeWidth="1.1" opacity="0.7" />
      <path d="M12 3v18" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
    </svg>
  );
}
