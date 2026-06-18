import { motion } from "motion/react";
import { OI } from "@/lib/oi-data";

function IconTruck({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M3 7h11v9H3V7zm11 2h3l3 4v3h-6V9zM7 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm10 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HeroEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 md:mb-6 flex flex-wrap items-center gap-3 sm:gap-4">
      <div className="relative flex items-center gap-2 shrink-0" aria-hidden>
        <span className="h-px w-6 sm:w-8 border-t border-dashed border-[var(--ochre)]/65" />
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-[var(--ochre)]"
        >
          <IconTruck />
        </motion.span>
        <motion.span
          animate={{ scaleX: [0.35, 1, 0.35] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-px w-4 sm:w-6 origin-left border-t border-dashed border-[var(--ochre)]/45"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative shrink-0"
        aria-hidden
      >
        <span className="pointer-events-none absolute -inset-2 rounded-full bg-[var(--ochre)]/20 blur-md" />
        <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-[var(--ochre)]/35" />
        <motion.span
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className="relative grid size-9 sm:size-10 place-items-center rounded-full border border-[var(--bone)]/15 bg-[color-mix(in_oklab,var(--ink)_72%,transparent)] backdrop-blur-sm shadow-[0_8px_24px_-8px_rgba(0,0,0,0.55)]"
        >
          <img
            src={OI.logo}
            alt=""
            className="h-5 w-auto max-w-none object-contain"
            draggable={false}
          />
        </motion.span>
      </motion.div>

      <span className="eyebrow text-[var(--bone)]/70 min-w-0">{children}</span>
    </div>
  );
}
