import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import { OI } from "@/lib/oi-data";
import { useCart } from "@/lib/cart";

type Tab = {
  id: string;
  label: string;
  href?: string;
  to?: "/" | "/producten" | "/afrekenen";
  onClick?: () => void;
  match?: (path: string) => boolean;
  icon: React.ReactNode;
  badge?: number;
};

function IconHome({ className = "size-[22px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M4.5 10.2 12 4l7.5 6.2V19a1.5 1.5 0 0 1-1.5 1.5H15v-5.5H9V20.5H6A1.5 1.5 0 0 1 4.5 19v-8.8Z" strokeLinejoin="round" />
    </svg>
  );
}

function IconShop({ className = "size-[22px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M6 7h12l-1.2 7.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-1.95-1.65L6 7Z" strokeLinejoin="round" />
      <path d="M9 7V5.5A2.5 2.5 0 0 1 11.5 3h1A2.5 2.5 0 0 1 15 5.5V7" strokeLinecap="round" />
    </svg>
  );
}

function IconShowroom({ className = "size-[22px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M12 21s6.5-4.2 6.5-10a6.5 6.5 0 1 0-13 0c0 5.8 6.5 10 6.5 10Z" strokeLinejoin="round" />
      <circle cx="12" cy="11" r="2.25" />
    </svg>
  );
}

function IconPhone({ className = "size-[22px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M6.2 3.5h2.8l1.4 4.6-2.1 1.6a11 11 0 0 0 5.2 5.2l1.6-2.1 4.6 1.4v2.8A1.6 1.6 0 0 1 17.3 19C9.8 19 5 14.2 5 6.7a1.6 1.6 0 0 1 1.2-3.2Z" strokeLinejoin="round" />
    </svg>
  );
}

function IconCart({ className = "size-[22px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M5.5 5.5h14.2L18 15.5H8.2L5.5 5.5Z" strokeLinejoin="round" />
      <circle cx="9.5" cy="18.5" r="1.25" />
      <circle cx="16.5" cy="18.5" r="1.25" />
    </svg>
  );
}

export function MobileTabBar() {
  const pathname = useRouterState({ select: s => s.location.pathname });
  const { setOpen, totalCount, justAdded } = useCart();

  const tabs: Tab[] = [
    {
      id: "home",
      label: "Home",
      to: "/",
      match: p => p === "/",
      icon: <IconHome />,
    },
    {
      id: "shop",
      label: "Shop",
      to: "/producten",
      match: p => p.startsWith("/producten"),
      icon: <IconShop />,
    },
    {
      id: "showroom",
      label: "Toonzaal",
      href: "/#showroom",
      icon: <IconShowroom />,
    },
    {
      id: "call",
      label: "Bellen",
      href: OI.showroom.telHref,
      icon: <IconPhone />,
    },
    {
      id: "cart",
      label: "Mand",
      onClick: () => setOpen(true),
      badge: totalCount,
      icon: <IconCart />,
    },
  ];

  return (
    <nav
      aria-label="App navigatie"
      className="md:hidden fixed inset-x-0 bottom-0 z-50 pointer-events-none"
    >
      <motion.div
        animate={justAdded ? { scale: [1, 1.02, 1] } : { scale: 1 }}
        transition={{ duration: 0.35 }}
        className="pointer-events-auto border-t border-white/10 bg-[color-mix(in_oklab,var(--ink)_96%,transparent)] backdrop-blur-2xl shadow-[0_-16px_48px_-12px_rgba(0,0,0,0.55)] pb-[env(safe-area-inset-bottom)]"
      >
        <div className="grid grid-cols-5">
          {tabs.map(tab => {
            const active = tab.match?.(pathname) ?? false;
            const inner = (
              <>
                <span
                  className={`relative grid place-items-center rounded-xl transition-colors ${
                    active ? "text-[var(--ochre)]" : "text-[var(--bone)]/70"
                  }`}
                >
                  {tab.icon}
                  {tab.badge ? (
                    <span className="absolute -top-1 -right-2 grid min-w-[15px] h-[15px] place-items-center rounded-full bg-[var(--ochre)] text-[var(--ink)] text-[8px] font-bold num px-0.5">
                      {tab.badge > 9 ? "9+" : tab.badge}
                    </span>
                  ) : null}
                </span>
                <span
                  className={`text-[9px] font-semibold leading-none mt-0.5 tracking-tight ${
                    active ? "text-[var(--ochre)]" : "text-[var(--bone)]/55"
                  }`}
                >
                  {tab.label}
                </span>
                {active && (
                  <span className="absolute top-1 left-1/2 -translate-x-1/2 h-0.5 w-5 rounded-full bg-[var(--ochre)]" />
                )}
              </>
            );

            const cls = `relative flex flex-col items-center justify-center min-h-[52px] py-1.5 active:bg-white/5 transition-colors`;

            if (tab.onClick) {
              return (
                <button key={tab.id} type="button" onClick={tab.onClick} className={cls}>
                  {inner}
                </button>
              );
            }
            if (tab.to) {
              return (
                <Link key={tab.id} to={tab.to} className={cls}>
                  {inner}
                </Link>
              );
            }
            return (
              <a key={tab.id} href={tab.href} className={cls}>
                {inner}
              </a>
            );
          })}
        </div>
      </motion.div>
    </nav>
  );
}
