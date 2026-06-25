import { motion } from "motion/react";
import { OI } from "@/lib/oi-data";
import { btnR } from "@/lib/site-tokens";

type Variant = "dark" | "light";

const GROUPED_HOURS = [
  ["Maandag tot Vrijdag", "09:00 tot 17:30"],
  ["Zaterdag", "11:00 tot 16:00"],
  ["Zondag", "Gesloten"],
] as const;

export function SimpleOpeningHours({
  variant = "light",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  const isDark = variant === "dark";

  return (
    <div className={className}>
      <p
        className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${
          isDark ? "text-[var(--bone)]/55" : "text-[var(--graphite)]/65"
        }`}
      >
        Openingstijden
      </p>
      <ul className="mt-3 space-y-1.5">
        {GROUPED_HOURS.map(([day, time]) => (
          <li
            key={day}
            className={`flex items-center justify-between gap-3 text-[13px] ${
              isDark ? "text-[var(--bone)]/85" : "text-[var(--ink)]/85"
            }`}
          >
            <span>{day}</span>
            <span
              className={`num text-right ${
                time === "Gesloten"
                  ? isDark
                    ? "text-[var(--bone)]/45"
                    : "text-[var(--graphite)]/55"
                  : ""
              }`}
            >
              {time}
            </span>
          </li>
        ))}
      </ul>
      <p
        className={`mt-3 text-[11px] leading-relaxed italic ${
          isDark ? "text-[var(--bone)]/50" : "text-[var(--graphite)]/60"
        }`}
      >
        {OI.footer.appointmentNote}
      </p>
    </div>
  );
}

export function PremiumShowroomCard({ className = "" }: { className?: string }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 340, damping: 26 }}
      className={`group overflow-hidden rounded-xl border border-[var(--ink)]/[0.08] bg-white shadow-[0_12px_36px_-24px_rgba(17,24,39,0.22)] ${className}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={OI.showroom.img}
          alt="Office Image premium showroom Rotterdam"
          loading="lazy"
          className="absolute inset-0 size-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/95 via-[var(--ink)]/35 to-[var(--ink)]/10" />

        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[var(--ink)]/75 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
          <span className="size-1.5 rounded-full bg-[var(--clay)]" />
          Premium showroom
        </span>

        <div className="absolute inset-x-0 bottom-0 p-3.5">
          <p className="font-display text-[15px] leading-tight text-white">{OI.showroom.name}</p>
          <p className="mt-1 flex items-center gap-1.5 text-[11px] text-white/70">
            <svg className="size-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {OI.showroom.address}, {OI.showroom.zip}
          </p>
        </div>
      </div>

      <div className="flex border-t border-[var(--ink)]/[0.08] bg-[var(--ink)] text-[10px] font-bold uppercase tracking-[0.14em]">
        <a
          href="/#showroom"
          className={`flex flex-1 items-center justify-center gap-1.5 px-3 py-2.5 text-white/90 transition-colors hover:bg-white/[0.06] ${btnR}`}
        >
          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" strokeLinejoin="round" />
          </svg>
          Bekijk showroom
        </a>
        <div className="w-px bg-white/12" />
        <a
          href={OI.footer.mapsHref}
          target="_blank"
          rel="noreferrer"
          className={`flex flex-1 items-center justify-center gap-1.5 px-3 py-2.5 text-white/90 transition-colors hover:bg-white/[0.06] ${btnR}`}
        >
          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          Route plannen
        </a>
      </div>
    </motion.div>
  );
}
