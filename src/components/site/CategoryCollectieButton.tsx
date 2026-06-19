function ArrowIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

type CategoryCollectieButtonProps = {
  href: string;
  children?: React.ReactNode;
  className?: string;
};

export function CategoryCollectieButton({
  href,
  children = "Ontdek collectie",
  className = "",
}: CategoryCollectieButtonProps) {
  return (
    <a
      href={href}
      className={`category-collectie-cta group/cta relative inline-flex w-full max-w-[min(100%,280px)] items-stretch overflow-hidden rounded-full border border-[var(--ochre)]/45 bg-[var(--bone)] text-[var(--ink)] ring-1 ring-[var(--ochre)]/35 shadow-none transition-[border-color,ring-color,transform,background-color] duration-500 hover:border-[var(--ochre)] hover:ring-[var(--ochre)]/55 ${className}`}
    >
      <span
        aria-hidden
        className="category-collectie-wipe pointer-events-none absolute inset-0 origin-left bg-gradient-to-r from-[var(--ochre)] via-[var(--clay)] to-[var(--ochre)]"
      />
      <span
        aria-hidden
        className="category-collectie-shine pointer-events-none absolute inset-y-0 left-0 w-2/5 -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/50 to-transparent"
      />

      <span className="category-collectie-label relative z-[1] flex flex-1 items-center justify-center overflow-hidden py-2.5 pl-5 pr-1">
        <span className="block whitespace-nowrap text-[12px] sm:text-[13px] font-semibold tracking-tight">
          {children}
        </span>
      </span>

      <span className="category-collectie-arrow relative z-[1] m-1 grid size-7 shrink-0 place-items-center rounded-full bg-[var(--clay)] text-[var(--bone)] ring-1 ring-[var(--ochre)]/25 transition-[background-color,color,transform] duration-500 group-hover/cta:bg-[var(--ink)] group-hover/cta:text-[var(--bone)]">
        <ArrowIcon className="size-2.5 transition-transform duration-500 group-hover/cta:translate-x-0.5" />
      </span>
    </a>
  );
}
