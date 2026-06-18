function ArrowIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function ProjectRevealButton({ children = "Bekijk collectie" }: { children?: React.ReactNode }) {
  return (
    <div className="mt-4">
      <span className="project-cta-reveal relative inline-flex h-11 items-stretch overflow-hidden rounded-full border border-[var(--bone)]/30 bg-[var(--ink)]/55 shadow-[0_16px_48px_-20px_rgba(0,0,0,0.75)] backdrop-blur-md">
        <span
          aria-hidden
          className="project-cta-wipe pointer-events-none absolute inset-0 origin-left bg-[var(--ochre)]"
        />
        <span
          aria-hidden
          className="project-cta-shine pointer-events-none absolute inset-y-0 left-0 w-2/5 -skew-x-[22deg] bg-gradient-to-r from-transparent via-white/45 to-transparent"
        />

        <span className="project-cta-label relative z-[1] flex items-center overflow-hidden">
          <span className="block whitespace-nowrap px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--ink)]">
            {children}
          </span>
        </span>

        <span className="project-cta-arrow relative z-[1] m-1 grid size-9 shrink-0 place-items-center rounded-full bg-[var(--ink)] text-[var(--bone)] ring-1 ring-[var(--bone)]/15">
          <ArrowIcon />
        </span>
      </span>
    </div>
  );
}
