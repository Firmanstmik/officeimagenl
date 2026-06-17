import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { OI } from "@/lib/oi-data";
import { useCart } from "@/lib/cart";

const DISMISS_KEY = "oi-floating-nav-dismissed";

function IconShowroom({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 10.5L12 4l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z" strokeLinejoin="round" />
    </svg>
  );
}

function IconProducts({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function IconPhone({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M6.5 3h3l1.5 5-2 1.5a11 11 0 0 0 5 5L13.5 13l5 1.5v3A1.5 1.5 0 0 1 17 19C9.5 19 5 14.5 5 7A1.5 1.5 0 0 1 6.5 3Z" strokeLinejoin="round" />
    </svg>
  );
}

function IconCart({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M6 6h15l-1.5 9h-12L5 6H3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="20" r="1.2" />
      <circle cx="18" cy="20" r="1.2" />
    </svg>
  );
}

function IconChevronUp({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 14l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconClose({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

type NavItem = {
  id: string;
  label: string;
  mobileLabel: string;
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  accent?: boolean;
  badge?: number;
};

export function FloatingNav() {
  const { setOpen, totalCount, justAdded } = useCart();
  const [scrollVisible, setScrollVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(DISMISS_KEY) === "1");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const on = () => {
      const y = window.scrollY;
      setScrollVisible(y > window.innerHeight * 0.35);
      if (y < 120) {
        setDismissed(false);
        try {
          sessionStorage.removeItem(DISMISS_KEY);
        } catch {
          /* ignore */
        }
      }
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const handleClose = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  const handleOpen = useCallback(() => {
    setDismissed(false);
    try {
      sessionStorage.removeItem(DISMISS_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const visible = scrollVisible && !dismissed;
  const showReopen = scrollVisible && dismissed;

  const items: NavItem[] = [
    {
      id: "showroom",
      label: "Bezoek showroom",
      mobileLabel: "Toonzaal",
      href: "/#showroom",
      icon: <IconShowroom />,
      accent: true,
    },
    {
      id: "producten",
      label: "Producten",
      mobileLabel: "Producten",
      href: "/producten",
      icon: <IconProducts />,
    },
    {
      id: "tel",
      label: OI.showroom.tel,
      mobileLabel: "Bellen",
      href: OI.showroom.telHref,
      icon: <IconPhone />,
    },
    {
      id: "cart",
      label: "Winkelwagen",
      mobileLabel: "Winkelwagen",
      onClick: () => setOpen(true),
      icon: <IconCart />,
      badge: totalCount,
    },
  ];

  return (
    <>
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Snelle acties"
          className="fixed bottom-0 md:bottom-5 inset-x-0 z-40 md:px-4 pointer-events-none"
        >
          <motion.div
            animate={justAdded ? { scale: [1, 1.012, 1] } : { scale: 1 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-auto relative mx-auto w-full md:max-w-[720px] md:px-0"
          >
            <motion.button
              type="button"
              onClick={handleClose}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Sluit snelle navigatie"
              className="absolute -top-3 right-3 md:-top-3.5 md:right-0 z-20 grid size-7 md:size-8 place-items-center rounded-full bg-[var(--ink)] border border-[var(--bone)]/18 text-[var(--bone)]/75 hover:text-[var(--bone)] hover:border-[var(--ochre)]/50 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.45)] backdrop-blur-md transition-colors"
            >
              <IconClose className="size-3 md:size-3.5" />
            </motion.button>

            {/* Mobile: Shopee-style bottom bar */}
            <div className="md:hidden border-t border-[var(--bone)]/10 bg-[color-mix(in_oklab,var(--ink)_94%,transparent)] backdrop-blur-2xl shadow-[0_-12px_40px_-12px_rgba(0,0,0,0.45)] pb-[env(safe-area-inset-bottom)]">
              <div className="grid grid-cols-4">
                {items.map(item => {
                  const inner = (
                    <>
                      <span className={`relative grid place-items-center rounded-xl transition-colors ${item.accent ? "text-[var(--ochre)]" : "text-[var(--bone)]/75"}`}>
                        <span className="scale-110">{item.icon}</span>
                        {item.badge ? (
                          <motion.span
                            key={item.badge}
                            initial={{ scale: 1.3 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1.5 -right-2.5 grid min-w-[16px] h-4 place-items-center rounded-full bg-[var(--ochre)] text-[var(--ink)] text-[9px] font-bold num px-1"
                          >
                            {item.badge > 9 ? "9+" : item.badge}
                          </motion.span>
                        ) : null}
                      </span>
                      <span className={`text-[10px] font-medium leading-none mt-1 ${item.accent ? "text-[var(--ochre)]" : "text-[var(--bone)]/65"}`}>
                        {item.mobileLabel}
                      </span>
                    </>
                  );

                  const cls = "flex flex-col items-center justify-center py-2.5 px-1 min-h-[58px] active:bg-[var(--bone)]/6 transition-colors";

                  if (item.onClick) {
                    return (
                      <button key={item.id} type="button" onClick={item.onClick} className={cls}>
                        {inner}
                      </button>
                    );
                  }
                  if (item.href?.startsWith("/") && !item.href.includes("#")) {
                    return (
                      <Link key={item.id} to={item.href} className={cls}>
                        {inner}
                      </Link>
                    );
                  }
                  return (
                    <a key={item.id} href={item.href} className={cls}>
                      {inner}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Desktop: full-width equal grid */}
            <div className="hidden md:block rounded-2xl p-px bg-gradient-to-r from-[var(--ochre)]/60 via-[var(--bone)]/20 to-[var(--clay)]/55 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.65)]">
              <div className="grid grid-cols-4 gap-px rounded-2xl overflow-hidden bg-[var(--bone)]/8 backdrop-blur-2xl">
                {items.map(item => {
                  const content = (
                    <span className="flex items-center justify-center gap-2.5 w-full">
                      <span className={`relative shrink-0 ${item.accent ? "text-[var(--ochre)]" : "text-[var(--bone)]/80"}`}>
                        {item.icon}
                        {item.badge ? (
                          <span className="absolute -top-2 -right-3 grid min-w-[18px] h-[18px] place-items-center rounded-full bg-[var(--ochre)] text-[var(--ink)] text-[9px] font-bold num px-1">
                            {item.badge > 9 ? "9+" : item.badge}
                          </span>
                        ) : null}
                      </span>
                      <span className={`text-[12px] font-semibold tracking-tight truncate ${item.accent ? "text-[var(--bone)]" : "text-[var(--bone)]/85"}`}>
                        {item.label}
                      </span>
                    </span>
                  );

                  const base = `flex items-center justify-center px-3 py-3.5 transition-all duration-300 ${
                    item.accent
                      ? "bg-[var(--clay)] hover:bg-[var(--ochre)] text-[var(--bone)]"
                      : "bg-[color-mix(in_oklab,var(--ink)_88%,transparent)] hover:bg-[color-mix(in_oklab,var(--ink)_78%,transparent)]"
                  }`;

                  if (item.onClick) {
                    return (
                      <button key={item.id} type="button" onClick={item.onClick} className={base}>
                        {content}
                      </button>
                    );
                  }
                  if (item.href?.startsWith("/") && !item.href.includes("#")) {
                    return (
                      <Link key={item.id} to={item.href} className={base}>
                        {content}
                      </Link>
                    );
                  }
                  return (
                    <a key={item.id} href={item.href} className={base}>
                      {content}
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.nav>
      )}
    </AnimatePresence>

    <AnimatePresence>
      {showReopen && (
        <motion.button
          type="button"
          onClick={handleOpen}
          initial={{ y: 16, opacity: 0, scale: 0.88 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 16, opacity: 0, scale: 0.88 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.96 }}
          aria-label="Open snelle navigatie"
          className="fixed z-40 bottom-[calc(1rem+env(safe-area-inset-bottom))] md:bottom-6 right-4 md:right-6 flex items-center gap-2 rounded-full p-px bg-gradient-to-r from-[var(--ochre)]/80 via-[var(--clay)]/70 to-[var(--ochre)]/50 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.55)]"
        >
          <span className="relative flex items-center gap-2 rounded-full bg-[color-mix(in_oklab,var(--ink)_92%,transparent)] backdrop-blur-xl border border-[var(--bone)]/12 pl-3 pr-3.5 py-2 md:pl-3.5 md:pr-4 md:py-2.5 text-[var(--bone)]">
            <span className="grid size-7 place-items-center rounded-full bg-[var(--clay)]/90 text-[var(--bone)]">
              <IconChevronUp className="size-3.5" />
            </span>
            <span className="text-[11px] md:text-[12px] font-semibold tracking-tight">Menu</span>
            {totalCount > 0 && (
              <motion.span
                key={totalCount}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 grid min-w-[18px] h-[18px] place-items-center rounded-full bg-[var(--ochre)] text-[var(--ink)] text-[9px] font-bold num px-1 shadow-[0_2px_8px_rgba(212,165,116,0.45)]"
              >
                {totalCount > 9 ? "9+" : totalCount}
              </motion.span>
            )}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
    </>
  );
}
