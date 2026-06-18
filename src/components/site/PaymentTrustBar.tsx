import { motion } from "motion/react";

const PAYMENT_METHODS = [
  { src: "/payments/ideal.png", alt: "iDEAL", className: "h-7 md:h-8 w-auto" },
  { src: "/payments/creditcard.png", alt: "Visa, Mastercard en Maestro", className: "h-5 md:h-6 w-auto" },
  { src: "/payments/bancontact.png", alt: "Bancontact", className: "h-7 md:h-8 w-auto" },
] as const;

type PaymentTrustBarProps = {
  variant?: "dark" | "light";
  className?: string;
};

export function PaymentTrustBar({ variant = "dark", className = "" }: PaymentTrustBarProps) {
  const isDark = variant === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className={[
        "relative overflow-hidden rounded-2xl",
        isDark
          ? "bg-[#0B0F14] text-white shadow-[0_24px_60px_-28px_rgba(0,0,0,0.55)] border border-white/[0.06]"
          : "bg-white text-[var(--ink)] shadow-[0_10px_36px_-24px_rgba(17,24,39,0.12)] border border-[var(--ink)]/[0.08]",
        className,
      ].join(" ")}
    >
      {isDark && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_120%_at_50%_-20%,rgba(224,122,50,0.14),transparent_55%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </>
      )}

      <div className="relative flex flex-col gap-5 px-5 py-5 md:flex-row md:items-center md:justify-between md:gap-8 md:px-7 md:py-6">
        <div className="flex items-center gap-3">
          <span
            className={[
              "grid size-10 shrink-0 place-items-center rounded-xl",
              isDark ? "bg-white/[0.06] text-[var(--ochre)] ring-1 ring-white/10" : "bg-[var(--sand)] text-[var(--clay)] ring-1 ring-[var(--ink)]/[0.06]",
            ].join(" ")}
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 3l7 4v5c0 4-3 7-7 9-4-2-7-5-7-9V7l7-4Z" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <p
              className={[
                "text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.22em]",
                isDark ? "text-white/55" : "text-[var(--graphite)]/70",
              ].join(" ")}
            >
              Veilig betalen dankzij
            </p>
            <p className={["mt-0.5 text-sm font-medium", isDark ? "text-white/90" : "text-[var(--ink)]"].join(" ")}>
              Betrouwbare betaalpartners
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          {PAYMENT_METHODS.map(method => (
            <div
              key={method.alt}
              className={[
                "group flex h-11 md:h-12 items-center justify-center rounded-xl px-3.5 transition-all duration-300",
                isDark
                  ? "bg-white/[0.04] ring-1 ring-white/[0.08] hover:bg-white/[0.08] hover:ring-white/15"
                  : "bg-[var(--bone)] ring-1 ring-[var(--ink)]/[0.06] hover:ring-[var(--clay)]/25",
              ].join(" ")}
            >
              <img
                src={method.src}
                alt={method.alt}
                loading="lazy"
                decoding="async"
                className={`${method.className} object-contain opacity-95 transition-transform duration-300 group-hover:scale-[1.03]`}
              />
            </div>
          ))}
        </div>

        <div
          className={[
            "flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] md:shrink-0",
            isDark ? "text-white/45" : "text-[var(--graphite)]/65",
          ].join(" ")}
        >
          <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" strokeLinecap="round" />
          </svg>
          SSL beveiligd
        </div>
      </div>
    </motion.div>
  );
}
