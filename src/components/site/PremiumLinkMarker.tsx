type PremiumLinkMarkerProps = {
  className?: string;
};

export function PremiumLinkMarker({ className = "" }: PremiumLinkMarkerProps) {
  return (
    <span
      className={`relative mt-0.5 grid size-[18px] shrink-0 place-items-center ${className}`}
      aria-hidden
    >
      <span className="absolute inset-0 rounded-[6px] bg-gradient-to-br from-[var(--sand)] via-white to-[var(--bone)] ring-1 ring-[var(--clay)]/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_3px_10px_-4px_rgba(184,138,90,0.55)] transition-all duration-300 group-hover:from-[var(--clay)] group-hover:via-[var(--ochre)] group-hover:to-[var(--clay)] group-hover:ring-[var(--clay)]/45 group-hover:shadow-[0_4px_14px_-3px_rgba(184,138,90,0.65)]" />
      <span className="absolute inset-[3px] rounded-[4px] bg-white/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <svg
        className="relative size-[9px] text-[var(--clay)] transition-all duration-300 group-hover:translate-x-px group-hover:text-white"
        viewBox="0 0 10 10"
        fill="none"
      >
        <path
          d="M2.25 1.75 7 5l-4.75 3.25"
          stroke="currentColor"
          strokeWidth="1.45"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function PremiumStatAccent({
  className = "",
  hoverClassName = "group-hover:w-10",
}: PremiumLinkMarkerProps & { hoverClassName?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`} aria-hidden>
      <span className="size-1.5 rotate-45 rounded-[1px] bg-gradient-to-br from-[var(--ochre)] to-[var(--clay)] shadow-[0_0_10px_rgba(240,160,96,0.45)]" />
      <span
        className={`h-px w-0 bg-gradient-to-r from-[var(--ochre)] via-[var(--clay)] to-transparent transition-all duration-700 ease-out ${hoverClassName}`}
      />
    </span>
  );
}
