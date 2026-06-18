import { motion } from "motion/react";

export function HeroScrollCue({ targetId = "waarom" }: { targetId?: string }) {
  return (
    <motion.a
      href={`#${targetId}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="group/cue absolute bottom-[72px] md:bottom-[80px] left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 text-center sm:left-auto sm:right-8 sm:translate-x-0 md:right-12 lg:right-16"
      aria-label="Scroll naar de volgende sectie"
    >
      <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--bone)]/55 transition-colors duration-300 group-hover/cue:text-[var(--ochre)]">
        Ontdek meer
      </span>

      <div className="relative flex h-12 w-6 items-start justify-center">
        <span className="absolute inset-x-[11px] top-0 bottom-0 rounded-full bg-gradient-to-b from-[var(--ochre)]/70 via-[var(--ochre)]/25 to-transparent opacity-80" />
        <motion.span
          className="absolute top-1 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-[var(--ochre)] shadow-[0_0_12px_rgba(240,160,96,0.65)]"
          animate={{ y: [0, 22, 0], opacity: [1, 0.35, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.svg
          className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[var(--bone)]/70 transition-colors duration-300 group-hover/cue:text-[var(--ochre)]"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </div>
    </motion.a>
  );
}
