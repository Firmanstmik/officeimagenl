import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { OI } from "@/lib/oi-data";
import { CartBadge, useCart } from "@/lib/cart";
import { btnR } from "@/lib/site-tokens";
import { TopUtilityBar } from "@/components/site/TopUtilityBar";

const NAV = [
  { label: "Start", to: "/" as const },
  { label: "Producten", to: "/producten" as const },
  { label: "Toonzaal", to: "/#showroom" as const, hash: true },
];

export function SiteHeader() {
  const { setOpen, totalCount } = useCart();

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 border-b border-[var(--bone)]/8 bg-[var(--ink)]/96 backdrop-blur-xl shadow-[0_8px_32px_-12px_rgba(0,0,0,0.35)]"
    >
      <div className="border-b border-[var(--bone)]/6">
        <div className="max-w-[1500px] mx-auto px-4 md:px-8 flex justify-end">
          <TopUtilityBar />
        </div>
      </div>
      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between gap-4 py-3 md:py-3.5">
          <Link to="/" className="shrink-0">
            <img src={OI.logo} alt="Office Image" className="h-9 md:h-10 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map(n => (
              n.hash ? (
                <a
                  key={n.label}
                  href={n.to}
                  className="px-4 py-2 text-[13px] font-medium text-[var(--bone)]/75 hover:text-[var(--bone)] transition-colors"
                >
                  {n.label}
                </a>
              ) : (
                <Link
                  key={n.label}
                  to={n.to}
                  className="px-4 py-2 text-[13px] font-medium text-[var(--bone)]/75 hover:text-[var(--bone)] transition-colors"
                >
                  {n.label}
                </Link>
              )
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={OI.showroom.telHref}
              className="hidden lg:inline-flex items-center gap-2 px-3 py-2 text-[12px] text-[var(--bone)]/70 hover:text-[var(--bone)] transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 1.5h2l1.2 3-1.5 1a8 8 0 0 0 3.8 3.8l1-1.5 3 1.2v2A1.5 1.5 0 0 1 11 12.5C5.5 12.5 1.5 8.5 1.5 3A1.5 1.5 0 0 1 3 1.5Z" stroke="currentColor" strokeWidth="1.2" /></svg>
              {OI.showroom.tel}
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className={`relative inline-flex items-center gap-2 ${btnR} bg-[var(--clay)] text-[var(--bone)] px-4 py-2.5 text-[12px] font-semibold hover:bg-[var(--ochre)] hover:text-[var(--ink)] transition-colors`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 6h15l-1.5 9h-12L5 6H3" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="9" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
              <span className="hidden sm:inline">Winkelwagen</span>
              {totalCount > 0 && (
                <span className="grid min-w-[20px] h-5 place-items-center rounded-md bg-[var(--ink)] text-[var(--bone)] text-[10px] font-bold num px-1.5">
                  {totalCount > 9 ? "9+" : totalCount}
                </span>
              )}
              <CartBadge className="sm:hidden" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
