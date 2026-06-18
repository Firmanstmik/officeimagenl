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
    <div className="mb-5 md:mb-6 flex items-center gap-3 sm:gap-4">
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

      <span className="eyebrow text-[var(--bone)]/70 min-w-0">{children}</span>

      <div className="hidden sm:block w-7 h-8 overflow-hidden opacity-55 shrink-0 ml-auto lg:ml-0" aria-hidden>
        <img src={OI.logo} alt="" className="h-8 w-auto max-w-none object-left object-cover" draggable={false} />
      </div>
    </div>
  );
}
