import { motion } from "motion/react";
import { OI } from "@/lib/oi-data";
import { btnR } from "@/lib/site-tokens";

const CONTACT_ROWS = [
  {
    label: "Telefoon",
    value: OI.showroom.tel,
    href: OI.showroom.telHref,
    icon: (
      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M6.5 3h3l1.5 5-2 1.5a11 11 0 0 0 5 5L13.5 13l5 1.5v3A1.5 1.5 0 0 1 17 19C9.5 19 5 14.5 5 7A1.5 1.5 0 0 1 6.5 3Z" />
      </svg>
    ),
  },
  {
    label: "Mobiel",
    value: OI.showroom.mobile,
    href: OI.showroom.mobileHref,
    icon: (
      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="7" y="2.5" width="10" height="19" rx="2" />
        <path d="M11 18.5h2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "E-mail",
    value: OI.showroom.email,
    href: `mailto:${OI.showroom.email}`,
    icon: (
      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
] as const;

export function ShowroomContactCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex h-full flex-col rounded-2xl border border-[var(--bone)]/12 bg-[color-mix(in_oklab,var(--ink)_92%,black)] p-5 ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--bone)]/55">Contact</p>
          <p className="mt-1 text-[13px] text-[var(--bone)]/65">Direct bereikbaar voor advies</p>
        </div>
        <span className="rounded-full bg-[var(--clay)]/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ochre)] ring-1 ring-[var(--clay)]/25">
          Live
        </span>
      </div>

      <ul className="mt-4 space-y-2 flex-1">
        {CONTACT_ROWS.map(row => (
          <li key={row.label}>
            <motion.a
              href={row.href}
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
              className="group flex items-center gap-3 rounded-xl border border-[var(--bone)]/10 bg-[var(--bone)]/[0.04] px-3.5 py-3 transition-colors hover:border-[var(--clay)]/35 hover:bg-[var(--bone)]/[0.08]"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[var(--bone)]/10 text-[var(--ochre)] ring-1 ring-[var(--bone)]/10 transition-colors group-hover:bg-[var(--clay)]/20 group-hover:text-[var(--clay)]">
                {row.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] uppercase tracking-[0.16em] text-[var(--bone)]/45">{row.label}</span>
                <span className="block truncate text-[14px] font-medium text-[var(--bone)]/90 num group-hover:text-[var(--ochre)] transition-colors">
                  {row.value}
                </span>
              </span>
              <svg
                className="size-3.5 shrink-0 text-[var(--bone)]/25 transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--ochre)]"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M1 7h12M8 2l5 5-5 5" strokeLinecap="round" />
              </svg>
            </motion.a>
          </li>
        ))}
        <li className="rounded-xl border border-dashed border-[var(--bone)]/12 px-3.5 py-2.5 text-[12px] text-[var(--bone)]/50 num">
          KvK {OI.showroom.kvk}
        </li>
      </ul>

      <div className="mt-4 grid gap-2">
        <motion.a
          href={OI.showroom.telHref}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={`inline-flex w-full items-center justify-center gap-2 ${btnR} bg-[var(--clay)] px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--bone)] shadow-[0_10px_28px_-12px_rgba(224,122,50,0.55)] hover:bg-[var(--ochre)] transition-colors`}
        >
          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M6.5 3h3l1.5 5-2 1.5a11 11 0 0 0 5 5L13.5 13l5 1.5v3A1.5 1.5 0 0 1 17 19C9.5 19 5 14.5 5 7A1.5 1.5 0 0 1 6.5 3Z" />
          </svg>
          Bel direct
        </motion.a>
        <div className="grid grid-cols-2 gap-2">
          <a
            href={`mailto:${OI.showroom.email}`}
            className={`inline-flex items-center justify-center gap-1.5 ${btnR} border border-[var(--bone)]/15 bg-[var(--bone)]/[0.05] px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--bone)]/80 hover:border-[var(--clay)]/30 hover:text-[var(--ochre)] transition-colors`}
          >
            E-mail
          </a>
          <a
            href={OI.footer.mapsHref}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center justify-center gap-1.5 ${btnR} border border-[var(--bone)]/15 bg-[var(--bone)]/[0.05] px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--bone)]/80 hover:border-[var(--clay)]/30 hover:text-[var(--ochre)] transition-colors`}
          >
            Route
          </a>
        </div>
      </div>
    </div>
  );
}
