import { motion } from "motion/react";

function IconPen({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 20l1.2-4.2L16.5 4.7a1.2 1.2 0 011.7 0l1.1 1.1a1.2 1.2 0 010 1.7L8 18.8 4 20z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path d="M13.5 6.5l4 4" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      <path
        d="M4 20h3.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

export function HeroScrollCue({ targetId = "waarom" }: { targetId?: string }) {
  return (
    <motion.a
      href={`#${targetId}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="group/cue absolute bottom-[76px] md:bottom-[84px] left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 text-center"
      aria-label="Scroll naar de volgende sectie"
    >
      <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--bone)]/50 transition-colors duration-300 group-hover/cue:text-[var(--ochre)]">
        Ontdek meer
      </span>

      <div className="relative flex flex-col items-center">
        <div className="relative flex h-11 w-[4.5rem] items-end justify-center">
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--bone)]/35 to-transparent"
          />
          <span
            aria-hidden
            className="absolute bottom-0 left-1/2 h-3 w-12 -translate-x-1/2 rounded-t-sm border border-b-0 border-[var(--bone)]/18 bg-[color-mix(in_oklab,var(--ink)_55%,transparent)] backdrop-blur-[2px]"
          />
          <motion.span
            className="relative z-[1] text-[var(--ochre)] drop-shadow-[0_0_10px_rgba(240,160,96,0.45)]"
            animate={{ y: [0, 5, 0], rotate: [-8, -4, -8] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <IconPen />
          </motion.span>
        </div>

        <motion.svg
          className="mt-2 text-[var(--bone)]/55 transition-colors duration-300 group-hover/cue:text-[var(--ochre)]"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          animate={{ y: [0, 4, 0], opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </div>
    </motion.a>
  );
}
