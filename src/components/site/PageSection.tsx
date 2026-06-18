import type { ReactNode } from "react";

export type SectionTone = "ink" | "bone" | "sand";

const toneClass: Record<SectionTone, string> = {
  ink: "bg-[var(--ink)] text-[var(--bone)]",
  bone: "bg-[var(--bone)] text-[var(--foreground)]",
  sand: "bg-[var(--sand)] text-[var(--foreground)]",
};

const toneVar: Record<SectionTone, string> = {
  ink: "var(--ink)",
  bone: "var(--bone)",
  sand: "var(--sand)",
};

function topBlend(from: SectionTone | "hero", to: SectionTone): string {
  const toVar = toneVar[to];
  const fromVar = from === "hero" ? toneVar.ink : toneVar[from];
  if (from === to) return toVar;
  return `linear-gradient(to bottom, color-mix(in oklab, ${fromVar} 8%, ${toVar}) 0%, ${toVar} min(12vh, 120px))`;
}

function bottomBlend(from: SectionTone, to: SectionTone): string {
  const fromVar = toneVar[from];
  const toVar = toneVar[to];
  if (from === to) return fromVar;
  return `linear-gradient(to top, color-mix(in oklab, ${toVar} 8%, ${fromVar}) 0%, ${fromVar} min(10vh, 100px))`;
}

type PageSectionProps = {
  id?: string;
  tone: SectionTone;
  prevTone?: SectionTone | "hero";
  nextTone?: SectionTone;
  className?: string;
  children: ReactNode;
};

export function PageSection({
  id,
  tone,
  prevTone,
  nextTone,
  className = "",
  children,
}: PageSectionProps) {
  const continuesPrev = prevTone === tone;
  const continuesNext = nextTone === tone;
  const toneChanges = prevTone != null && prevTone !== tone && prevTone !== "hero";
  const toneChangesNext = nextTone != null && nextTone !== tone;

  const pt = continuesPrev
    ? "pt-10 md:pt-14"
    : prevTone === "hero"
      ? "pt-14 md:pt-20"
      : "pt-[4.75rem] md:pt-[6.5rem]";

  const pb = continuesNext ? "pb-10 md:pb-14" : "pb-[5.75rem] md:pb-[7.75rem]";

  const showTopHairline = continuesPrev;
  const showTopBlend = !continuesPrev && (toneChanges || prevTone === "hero");
  const showBottomBlend = toneChangesNext;

  return (
    <section
      id={id}
      className={`relative overflow-hidden ${toneClass[tone]} ${pt} ${pb} ${className}`}
    >
      {showTopBlend && prevTone && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[min(12vh,120px)]"
          style={{ background: topBlend(prevTone, tone) }}
        />
      )}

      {showBottomBlend && nextTone && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[min(10vh,100px)]"
          style={{ background: bottomBlend(tone, nextTone) }}
        />
      )}

      {showTopHairline && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-6 md:inset-x-12 top-0 z-[1] h-px max-w-[1500px] mx-auto bg-gradient-to-r from-transparent via-[var(--clay)]/25 to-transparent"
        />
      )}

      <div className="relative z-[2]">{children}</div>
    </section>
  );
}
