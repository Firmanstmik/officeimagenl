import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { OI } from "@/lib/oi-data";
import { btnR } from "@/lib/site-tokens";

const DAY_INDEX: Record<string, number> = {
  Zondag: 0,
  Maandag: 1,
  Dinsdag: 2,
  Woensdag: 3,
  Donderdag: 4,
  Vrijdag: 5,
  Zaterdag: 6,
};

function parseTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function getShowroomStatus(now = new Date()) {
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const today = OI.hours.find(([name]) => DAY_INDEX[name] === day);
  if (!today) return { open: false, label: "Gesloten", todayName: "" };

  const [, hours] = today;
  if (hours === "Gesloten") return { open: false, label: "Vandaag gesloten", todayName: today[0] };

  const [start, end] = hours.split(" tot ");
  const open = minutes >= parseTime(start) && minutes < parseTime(end);
  return {
    open,
    label: open ? "Nu open" : "Nu gesloten",
    todayName: today[0],
  };
}

type Variant = "dark" | "light";

export function InteractiveOpeningHours({
  variant = "light",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const status = useMemo(() => getShowroomStatus(), []);
  const todayIdx = new Date().getDay();

  const isDark = variant === "dark";

  return (
    <div className={className}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p
            className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${
              isDark ? "text-[var(--bone)]/55" : "text-[var(--graphite)]/65"
            }`}
          >
            Openingstijden
          </p>
          <p className={`mt-1 text-[13px] ${isDark ? "text-[var(--bone)]/55" : "text-[var(--graphite)]/65"}`}>
            {status.todayName ? `Vandaag: ${status.todayName}` : "Showroom Rotterdam"}
          </p>
        </div>
        <motion.span
          animate={{ scale: status.open ? [1, 1.04, 1] : 1 }}
          transition={{ duration: 2.2, repeat: status.open ? Infinity : 0, ease: "easeInOut" }}
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${
            status.open
              ? "bg-emerald-500/15 text-emerald-700 ring-1 ring-emerald-500/25"
              : isDark
                ? "bg-[var(--bone)]/10 text-[var(--bone)]/55 ring-1 ring-[var(--bone)]/15"
                : "bg-[var(--sand)] text-[var(--graphite)]/70 ring-1 ring-[var(--ink)]/[0.08]"
          }`}
        >
          <span
            className={`size-1.5 rounded-full ${
              status.open ? "bg-emerald-500 animate-pulse" : isDark ? "bg-[var(--bone)]/35" : "bg-[var(--graphite)]/35"
            }`}
          />
          {status.label}
        </motion.span>
      </div>

      <ul className="space-y-1.5">
        {OI.hours.map(([day, time]) => {
          const isToday = DAY_INDEX[day] === todayIdx;
          const closed = time === "Gesloten";
          return (
            <motion.li
              key={day}
              layout
              className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2 transition-colors duration-300 ${
                isDark
                  ? "border-[var(--bone)]/10 hover:bg-[var(--bone)]/[0.06]"
                  : "border-[var(--ink)]/[0.06] hover:bg-[var(--sand)]/60"
              } ${
                isToday
                  ? isDark
                    ? "bg-[var(--bone)]/[0.08] border-[var(--clay)]/35"
                    : "bg-[var(--sand)]/80 border-[var(--clay)]/30 shadow-[0_4px_16px_-10px_rgba(184,138,90,0.35)]"
                  : ""
              }`}
            >
              <span
                className={`text-[13px] font-medium ${
                  isToday ? (isDark ? "text-[var(--bone)]" : "text-[var(--ink)]") : isDark ? "text-[var(--bone)]/85" : "text-[var(--ink)]/85"
                }`}
              >
                {day}
                {isToday && (
                  <span
                    className={`ml-2 text-[10px] uppercase tracking-widest ${
                      isDark ? "text-[var(--ochre)]" : "text-[var(--clay)]"
                    }`}
                  >
                    vandaag
                  </span>
                )}
              </span>
              <span
                className={`num text-[13px] text-right ${
                  closed
                    ? isDark
                      ? "text-[var(--bone)]/55"
                      : "text-[var(--graphite)]/65"
                    : isToday
                      ? isDark
                        ? "text-[var(--bone)]"
                        : "text-[var(--ink)]"
                      : isDark
                        ? "text-[var(--bone)]/85"
                        : "text-[var(--ink)]/85"
                }`}
              >
                {time}
              </span>
            </motion.li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => setExpanded(v => !v)}
        className={`mt-4 w-full text-left text-[12px] leading-relaxed transition-colors ${
          isDark ? "text-[var(--bone)]/55 hover:text-[var(--bone)]/80" : "text-[var(--graphite)]/65 hover:text-[var(--ink)]"
        }`}
      >
        <span className="font-medium">{expanded ? "Minder info" : "Afspraak buiten openingstijden?"}</span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p
              className={`pt-2 text-[12px] leading-relaxed italic ${
                isDark ? "text-[var(--bone)]/55" : "text-[var(--graphite)]/65"
              }`}
            >
              {OI.footer.appointmentNote}
            </p>
            <a
              href={OI.showroom.telHref}
              className={`mt-3 inline-flex items-center gap-2 ${btnR} px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors ${
                isDark
                  ? "bg-[var(--clay)] text-[var(--bone)] hover:bg-[var(--ochre)]"
                  : "bg-[var(--ink)] text-[var(--bone)] hover:bg-[var(--clay)]"
              }`}
            >
              Bel voor afspraak
            </a>
          </motion.div>
        )}
      </AnimatePresence>
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
