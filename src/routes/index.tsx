import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useScroll, useTransform } from "motion/react";
import { OI, SHOP_PATH } from "@/lib/oi-data";
import { cartProductFromBestseller, HeaderCartButton } from "@/lib/cart";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { FloatingNav } from "@/components/site/FloatingNav";
import { MegaMenuPanel, NavChevron } from "@/components/site/MegaMenu";
import { TopUtilityBar } from "@/components/site/TopUtilityBar";
import { MainFooter } from "@/components/site/MainFooter";
import { PageSection } from "@/components/site/PageSection";
import { HeroExperienceCard } from "@/components/site/HeroExperienceCard";
import { MEGA_MENUS } from "@/lib/mega-menu-data";
import { btnR, ease, sectionH2 } from "@/lib/site-tokens";
import { createPageHead } from "@/lib/site-seo";

import hero from "@/assets/hero.jpg";
import cExec from "@/assets/concept-executive.jpg";
import cCollab from "@/assets/concept-collaborative.jpg";
import cHybrid from "@/assets/concept-hybrid.jpg";
import cFocus from "@/assets/concept-focus.jpg";
import cCreative from "@/assets/concept-creative.jpg";
import viz from "@/assets/visualization.jpg";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import empty from "@/assets/process-empty.jpg";
import ctaImg from "@/assets/cta-dark.jpg";

export const Route = createFileRoute("/")({
  head: () =>
    createPageHead({
      title: "Office Image | Hoogwaardige kantoormeubelen en werkplekinrichting",
      description:
        "Exclusieve directiemeubelen, werkplekken, bureaustoelen en archiefkasten. Snelle levering, grote voorraad en showroom in Rotterdam, 6 dagen per week open.",
      path: "/",
    }),
  component: Home,
});

/* ──────────────────────────── primitives ──────────────────────────── */

function Reveal({ children, delay = 0, y = 24, className = "" }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, dot = true }: { children: React.ReactNode; dot?: boolean }) {
  return (
    <div className="eyebrow inline-flex items-center gap-2.5">
      {dot && <span className="inline-block size-1.5 rounded-full bg-[var(--clay)]" />}
      <span>{children}</span>
    </div>
  );
}

function ArrowLink({
  children,
  variant = "ink",
  href,
  target,
  rel,
}: {
  children: React.ReactNode;
  variant?: "ink" | "bone" | "clay";
  href?: string;
  target?: string;
  rel?: string;
}) {
  const color =
    variant === "bone"
      ? "text-[var(--bone)] border-[var(--bone)]/30 hover:bg-[var(--bone)] hover:text-[var(--ink)]"
      : variant === "clay"
      ? "text-[var(--bone)] bg-[var(--clay)] border-[var(--clay)] hover:bg-[var(--ink)] hover:border-[var(--ink)]"
      : "text-[var(--ink)] border-[var(--ink)]/20 hover:bg-[var(--ink)] hover:text-[var(--bone)]";
  const className = `group inline-flex items-center gap-3 ${btnR} border px-6 py-3.5 text-sm font-medium transition-all duration-500 ${color}`;
  const icon = (
    <svg width="14" height="14" viewBox="0 0 14 14" className="transition-transform duration-500 group-hover:translate-x-1" fill="none">
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" />
    </svg>
  );
  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={className}>
        <span>{children}</span>
        {icon}
      </a>
    );
  }
  return (
    <button type="button" className={className}>
      <span>{children}</span>
      {icon}
    </button>
  );
}

/* ──────────────────────────── header ──────────────────────────── */

const SLIDE_DURATION = 3500;

/** Official officeimage.nl circle-check icon (hero trust bar). */
function OICheckCircleIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 34 34" className={className} aria-hidden fill="currentColor">
      <path d="M6.59773172,6.59752803 C12.8960652,0.300807016 23.1062973,0.300807016 29.4031201,6.59762987 L29.4031201,6.59762987 L27.8121299,8.18862013 C22.3939527,2.77044298 13.6081848,2.77044298 8.18862013,8.18862013 C2.77045996,13.6067803 2.77045996,22.3924697 8.18851828,27.810528 C13.6081848,33.228807 22.3939527,33.228807 27.8119669,27.8107929 C31.1113166,24.510091 32.4915047,19.846631 31.6220657,15.3481054 L31.6220657,15.3481054 L33.8311843,14.9211446 C34.8408933,20.1454354 33.236409,25.5667603 29.4031201,29.4016201 C23.1062973,35.698443 12.8960652,35.698443 6.59762987,29.4016201 C0.300790043,23.1047803 0.300790043,12.8944697 6.59773172,6.59752803 Z M33.2530774,5.91994857 L34.8368726,7.51810143 L17.6393726,24.5611014 C17.1973151,24.9991876 16.483561,24.9951211 16.0465238,24.5520264 L16.0465238,24.5520264 L9.44502381,17.8590264 L11.0469262,16.2790236 L16.8565501,22.1691717 L33.2530774,5.91994857 Z" />
    </svg>
  );
}

const HERO_TRUST_ITEMS = [
  "De nieuwste producten, de juiste prijzen!",
  "Grote aantal op voorraad",
  "100% klanttevredenheid",
  "Fysieke showroom. 6 dagen per week open!",
] as const;

function UtilityIcon({ type }: { type: "shield" | "home" | "truck" | "mail" | "phone" | "check" | "cart" }) {
  const cls = "size-3.5 shrink-0 text-[var(--ochre)]";
  if (type === "check")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12l4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (type === "cart")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M3 3h2l1.2 6.2a2 2 0 002 1.8h9.6a2 2 0 001.95-1.55L20 6H7" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="19" r="1.25" fill="currentColor" stroke="none" />
        <circle cx="17" cy="19" r="1.25" fill="currentColor" stroke="none" />
      </svg>
    );
  if (type === "shield")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 2l8 4v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6l8-4z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (type === "home")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (type === "truck")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M3 7h11v9H3V7zm11 2h3l3 4v3h-6V9zM7 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm10 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (type === "mail")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 015 6a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const MAIN_NAV = [
  { label: "Start", href: "/", mega: false as const },
  ...MEGA_MENUS.map(m => ({ label: m.label, href: m.href, mega: true as const, megaId: m.id })),
];

function ChevronDown({ open }: { open?: boolean }) {
  return <NavChevron open={open} className="size-2.5" />;
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [mobileMega, setMobileMega] = useState<string | null>(null);
  const megaCloseRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navZoneRef = useRef<HTMLDivElement>(null);

  const clearMegaClose = () => {
    if (megaCloseRef.current) {
      clearTimeout(megaCloseRef.current);
      megaCloseRef.current = null;
    }
  };

  const scheduleMegaClose = () => {
    clearMegaClose();
    megaCloseRef.current = setTimeout(() => setActiveMega(null), 120);
  };

  const activeMenu = activeMega ? MEGA_MENUS.find(m => m.id === activeMega) : null;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 48);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMega(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => () => clearMegaClose(), []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const linkCls = (active = false, megaActive = false) =>
    `relative px-3 py-2 text-[13px] font-semibold tracking-tight whitespace-nowrap transition-colors ${
      megaActive
        ? "text-[var(--ochre)]"
        : active
        ? "text-[var(--bone)]"
        : scrolled
        ? "text-[var(--bone)]/80 hover:text-[var(--bone)]"
        : "text-[var(--bone)]/85 hover:text-[var(--bone)]"
    }`;

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "bg-[var(--ink)]/94 backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.45)] border-b border-[var(--bone)]/8"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          {/* row 1 — utility bar (rechtsboven) */}
          <motion.div
            animate={{ height: scrolled ? 0 : 28, opacity: scrolled ? 0 : 1 }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden"
          >
            <TopUtilityBar />
          </motion.div>

          {/* row 2 — logo + nav + winkelwagen (satu baris) */}
          <div
            ref={navZoneRef}
            className={`relative hidden lg:block ${scrolled ? "" : ""}`}
            onMouseEnter={clearMegaClose}
            onMouseLeave={scheduleMegaClose}
          >
            <div className="flex items-center justify-between gap-5 xl:gap-8 py-2">
              <a href="/" className="shrink-0">
                <img src={OI.logo} alt="Office Image" className="h-10 md:h-11 w-auto" />
              </a>

              <nav className="flex items-center justify-end gap-0.5 shrink-0 ml-auto">
                {MAIN_NAV.map(n => {
                  const isStart = n.label === "Start";
                  const megaId = "megaId" in n ? n.megaId : null;
                  const megaActive = megaId != null && activeMega === megaId;
                  return (
                    <div
                      key={n.label}
                      className="relative"
                      onMouseEnter={() => megaId && setActiveMega(megaId)}
                    >
                      <a
                        href={n.href}
                        className={`group inline-flex items-center gap-1 ${linkCls(isStart, megaActive)}`}
                      >
                        {n.label}
                        {!isStart && <ChevronDown open={megaActive} />}
                        <span
                          className={`absolute left-3 right-3 bottom-1 h-0.5 origin-left bg-[var(--ochre)] transition-transform duration-300 ${
                            isStart || megaActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                          }`}
                        />
                      </a>
                    </div>
                  );
                })}

                <div className="ml-3 pl-3 border-l border-[var(--bone)]/12 shrink-0">
                  <HeaderCartButton />
                </div>
              </nav>
            </div>

            <AnimatePresence>
              {activeMenu && (
                <MegaMenuPanel
                  menu={activeMenu}
                  menus={MEGA_MENUS}
                  onSelectMenu={setActiveMega}
                />
              )}
            </AnimatePresence>
          </div>

          {/* mobile — logo + cart + hamburger */}
          <div className="flex lg:hidden items-center justify-between gap-4 py-2.5">
            <a href="/" className="shrink-0">
              <img src={OI.logo} alt="Office Image" className="h-10 w-auto" />
            </a>
            <div className="flex items-center gap-2">
              <HeaderCartButton />
              <button
                type="button"
                onClick={() => setMobileOpen(o => !o)}
                aria-label="Menu"
                className="grid size-9 place-items-center rounded-lg text-[var(--bone)]/80 hover:bg-[var(--bone)]/10"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  {mobileOpen ? (
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                  ) : (
                    <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <button type="button" aria-label="Sluiten" onClick={() => setMobileOpen(false)} className="absolute inset-0 bg-[var(--ink)]/80 backdrop-blur-sm" />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease }}
              className="absolute right-0 top-0 bottom-0 w-[min(100%,320px)] bg-[var(--ink)] border-l border-[var(--bone)]/10 p-6 pt-24 overflow-y-auto"
            >
              <div className="space-y-1">
                <a
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-lg px-4 py-3 text-[15px] font-semibold text-[var(--bone)]/90 hover:bg-[var(--bone)]/8"
                >
                  Start
                </a>
                {MEGA_MENUS.map(menu => {
                  const open = mobileMega === menu.id;
                  return (
                    <div key={menu.id}>
                      <button
                        type="button"
                        onClick={() => setMobileMega(m => (m === menu.id ? null : menu.id))}
                        className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-[15px] font-semibold text-[var(--bone)]/90 hover:bg-[var(--bone)]/8"
                      >
                        {menu.label}
                        <ChevronDown open={open} />
                      </button>
                      <AnimatePresence>
                        {open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease }}
                            className="overflow-hidden"
                          >
                            <div className="grid grid-cols-2 gap-2 px-3 pb-3 pt-1">
                              {menu.items.map(item => (
                                <a
                                  key={item.label}
                                  href={menu.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="group rounded-xl overflow-hidden border border-[var(--bone)]/10 bg-[var(--bone)]/5 hover:border-[var(--ochre)]/35 transition-colors"
                                >
                                  <img src={item.img} alt={item.label} className="aspect-[4/3] w-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                                  <span className="block px-2 py-2 text-[11px] leading-snug text-[var(--bone)]/80 text-center">{item.label}</span>
                                </a>
                              ))}
                            </div>
                            <a
                              href={menu.href}
                              onClick={() => setMobileOpen(false)}
                              className="mx-3 mb-2 block text-center text-[12px] font-semibold text-[var(--ochre)]"
                            >
                              Bekijk {menu.label} →
                            </a>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 pt-4 border-t border-[var(--bone)]/10 space-y-2">
                <a href="#contact" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-[13px] text-[var(--bone)]/70">
                  <UtilityIcon type="mail" />
                  Contact
                </a>
                <a href={OI.showroom.telHref} className="block px-4 py-2 text-[13px] num text-[var(--bone)]/70">
                  {OI.showroom.tel}
                </a>
                <a
                  href="#showroom"
                  onClick={() => setMobileOpen(false)}
                  className={`mt-2 flex items-center justify-center gap-2 ${btnR} bg-[var(--clay)] text-[var(--bone)] px-5 py-3 text-[13px] font-semibold`}
                >
                  Bezoek showroom
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ──────────────────────────── 1. hero ──────────────────────────── */

/** Hero imagery scraped from officeimage.nl homepage carousel (ARMA, Foxline, roldeurkast). */
const HERO_SLIDES = [
  {
    img: "https://officeimage.nl/wp-content/uploads/2024/10/ARMA-1.jpg",
    alt: "Luxe directiekantoor met ARMA directiemeubelen, Office Image",
    href: SHOP_PATH,
    eyebrow: "Productcategorieën, Directie",
    title: ["Directiemeubelen", "die indruk maken", "op elk niveau."],
    italicIndex: 1,
    sub: "Exclusieve directiemeubelen voor representatieve ruimtes, alleen bij Office Image. Groot op voorraad, persoonlijk advies in onze showroom Rotterdam.",
    tag: "Directiemeubelen",
    meta: "Exclusief bij OI",
  },
  {
    img: "https://officeimage.nl/wp-content/uploads/2024/10/fox-320x160-tafel-1-1.jpg",
    alt: "Foxline werkplekken met vergadertafel, Office Image",
    href: SHOP_PATH,
    eyebrow: "Productcategorieën, Foxline",
    title: ["Foxline werkplekken", "voor teams", "die vooruit willen."],
    italicIndex: 1,
    sub: "Modulaire, ergonomische werkplekken van topkwaliteit, exclusief bij Office Image. Snel configureerbaar en direct uit voorraad leverbaar.",
    tag: "Foxline werkplekken",
    meta: "Modulair en snel",
  },
  {
    img: "https://officeimage.nl/wp-content/uploads/2024/10/roldeurkast-ch-1.jpg",
    alt: "Kantoorkasten en archiefkasten, Office Image",
    href: SHOP_PATH,
    eyebrow: "Productcategorieën, Opslag",
    title: ["Kantoorkasten en", "archiefkasten", "voor elk archief."],
    italicIndex: 1,
    sub: "Roldeurkasten, brandwerende kasten en veilige opslag, exclusief bij Office Image. Groot aantal op voorraad, de juiste prijs.",
    tag: "Archief en opslag",
    meta: "Op voorraad",
  },
];

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  const [idx, setIdx] = useState(0);
  const total = HERO_SLIDES.length;

  useEffect(() => {
    const t = setTimeout(() => setIdx(i => (i + 1) % total), SLIDE_DURATION);
    return () => clearTimeout(t);
  }, [idx, total]);

  const slide = HERO_SLIDES[idx];

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[700px] w-full overflow-hidden bg-[var(--ink)]"
    >
      {/* background slides */}
      <motion.div style={{ y: imgY }} className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 1.14 }}
            animate={{ opacity: 1, scale: 1.04 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.1, ease },
              scale: { duration: SLIDE_DURATION / 1000 + 0.8, ease: "linear" },
            }}
            className="absolute inset-0"
          >
            <img src={slide.img} alt={slide.alt} className="h-full w-full object-cover" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--ink)]/65 via-[var(--ink)]/20 to-[var(--ink)]/88" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--ink)]/70 via-[var(--ink)]/25 to-transparent" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, var(--bone) 1px, transparent 0)",
            backgroundSize: "3px 3px",
          }}
        />
        <motion.div
          aria-hidden
          key={`sweep-${idx}`}
          initial={{ x: "-40%", opacity: 0 }}
          animate={{ x: "140%", opacity: [0, 0.28, 0] }}
          transition={{ duration: 1.8, ease, delay: 0.15 }}
          className="absolute inset-y-0 w-[35%] pointer-events-none"
          style={{ background: "linear-gradient(100deg, transparent, color-mix(in oklab, var(--ochre) 55%, transparent), transparent)" }}
        />
      </motion.div>

      {/* hero content */}
      <motion.div style={{ y: contentY }} className="relative z-10 flex h-full flex-col pt-[112px] sm:pt-[120px] md:pt-[136px] lg:pt-[172px] xl:pt-[180px]">
        <div className="flex-1 px-4 md:px-8 lg:px-12">
          <div className="h-full max-w-[1600px] mx-auto flex flex-col gap-6 lg:gap-8 pb-32 md:pb-36 pt-4 md:pt-6 lg:pt-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,40%)] gap-6 lg:gap-8 lg:items-center">
            {/* main copy */}
            <div className="min-w-0 max-w-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`eyebrow-${idx}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.45, ease }}
                  className="text-[var(--bone)]/65 eyebrow mb-5 md:mb-6 flex items-center gap-2.5"
                >
                  <span className="inline-block size-1.5 rounded-full bg-[var(--ochre)]" />
                  <span>{slide.eyebrow}</span>
                </motion.div>
              </AnimatePresence>

              <h1 className="font-display text-[var(--bone)] leading-[0.98] tracking-[-0.025em] text-[1.9rem] sm:text-[2.55rem] md:text-[3.2rem] lg:text-[3.85rem] xl:text-[4.25rem]">
                <AnimatePresence mode="wait">
                  <motion.span key={`title-${idx}`} className="block">
                    {slide.title.map((line, li) => (
                      <span key={li} className="block overflow-hidden">
                        <motion.span
                          initial={{ y: "105%" }}
                          animate={{ y: 0 }}
                          exit={{ y: "-105%" }}
                          transition={{ duration: 0.85, delay: 0.06 + li * 0.07, ease }}
                          className={`inline-block ${li === slide.italicIndex ? "italic text-[var(--ochre)]" : "text-[var(--bone)]"}`}
                        >
                          {line}
                        </motion.span>
                      </span>
                    ))}
                  </motion.span>
                </AnimatePresence>
              </h1>

              <div className="mt-8 md:mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`sub-${idx}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.55, ease, delay: 0.15 }}
                    className="max-w-lg text-[var(--bone)]/72 text-[13px] md:text-[14px] leading-relaxed"
                  >
                    {slide.sub}
                  </motion.p>
                </AnimatePresence>
                <div className="flex flex-wrap items-center gap-3">
                  <ArrowLink variant="clay" href={slide.href}>
                    Bekijk collectie
                  </ArrowLink>
                  <ArrowLink variant="bone" href="#showroom">
                    Bezoek showroom
                  </ArrowLink>
                </div>
              </div>
            </div>

            <HeroExperienceCard className="lg:self-center" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* fade hero imagery into the light chapter below */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[52px] md:bottom-[56px] z-[8] h-48 md:h-64 bg-gradient-to-b from-transparent via-[color-mix(in_oklab,var(--bone)_35%,transparent)] to-[var(--bone)]"
      />

      {/* slide progress bar */}
      <div className="absolute inset-x-0 bottom-[60px] md:bottom-[64px] z-10 h-px bg-[var(--bone)]/10">
        <motion.div
          key={`bar-${idx}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
          className="h-full origin-left bg-[var(--ochre)]/70"
        />
      </div>

      {/* bottom trust strip — matches officeimage.nl hero USPs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.85, ease }}
        className="absolute inset-x-0 bottom-0 z-10 border-t border-[var(--ink)]/[0.07] bg-[color-mix(in_oklab,var(--bone)_97%,white)] shadow-[0_-8px_32px_rgba(0,0,0,0.08)]"
      >
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 py-3.5 md:py-4">
          <ul className="flex items-center justify-start md:justify-center gap-x-8 lg:gap-x-12 gap-y-3 overflow-x-auto scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {HERO_TRUST_ITEMS.map((text, i) => (
              <motion.li
                key={text}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 + i * 0.07, duration: 0.5, ease }}
                className="group flex items-center gap-2.5 shrink-0"
              >
                <span className="text-[#424242] transition-colors duration-300 group-hover:text-[var(--ochre)]">
                  <OICheckCircleIcon className="size-[18px] md:size-5" />
                </span>
                <span className="text-[12px] md:text-[13px] font-medium leading-snug text-[#424242] whitespace-nowrap transition-colors duration-300 group-hover:text-[var(--ink)]">
                  {text}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}

/* ──────────────────────────── 2. trust ──────────────────────────── */

function Trust() {
  const stats = [
    { k: "100%", v: "Klanttevredenheid", note: "Bewezen kwaliteit", icon: "01" },
    { k: "6", v: "Dagen per week open", note: "Fysieke showroom", icon: "02" },
    { k: "40%", v: "Tot korting op bestsellers", note: "30% over hele site", icon: "03" },
    { k: "NL", v: "Grote voorraad", note: "Snelle levering", icon: "04" },
  ];
  return (
    <PageSection tone="bone" prevTone="hero" nextTone="ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 section-ambient-clay opacity-60"
      />

      <div className="relative max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-20 items-end">
          <Reveal>
            <Eyebrow>Waarom Office Image</Eyebrow>
            <h2 className={`mt-5 ${sectionH2}`}>
              De nieuwste producten, <span className="italic text-[var(--clay)]">de juiste prijzen</span>, direct uit voorraad.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-[var(--muted-foreground)] text-lg leading-relaxed max-w-xl">
              Office Image is een jong en dynamisch bedrijf dat zakelijke kantoorinrichting eenvoudig en snel maakt. Bestel online of bezoek onze showroom in Rotterdam. Wij denken graag mee.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10 md:mt-12">
            <a
              href={SHOP_PATH}
              className={`group w-full max-w-2xl flex items-center gap-4 ${btnR} bg-[var(--card)] border border-[var(--ink)]/8 px-5 py-3.5 text-left shadow-[0_8px_30px_-12px_rgba(17,24,39,0.12)] hover:border-[var(--clay)]/35 hover:shadow-[0_12px_40px_-12px_rgba(224,122,50,0.2)] transition-all duration-300`}
            >
              <svg className="size-5 shrink-0 text-[var(--clay)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
              </svg>
              <span className="flex-1 text-[var(--muted-foreground)] group-hover:text-[var(--ink)]/60 transition-colors">
                Ontdek ons volledige assortiment
              </span>
              <span className={`hidden sm:inline-flex items-center gap-1.5 ${btnR} bg-[var(--clay)] text-[var(--bone)] px-4 py-2 text-[12px] font-medium group-hover:bg-[var(--ochre)] transition-colors`}>
                Naar producten
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-16 md:mt-20 rounded-2xl border border-[var(--ink)]/8 bg-[var(--card)] shadow-[0_24px_80px_-40px_rgba(17,24,39,0.18)] overflow-hidden">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[var(--ink)]/[0.07]">
              {stats.map((s, i) => (
                <motion.div
                  key={s.v}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease }}
                  className="group relative p-8 md:p-10 lg:p-11 transition-colors duration-500 hover:bg-[var(--bone)]"
                >
                  <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-[var(--ochre)] transition-transform duration-500 group-hover:scale-x-100" />
                  <div className="flex items-center justify-between mb-6 md:mb-8">
                    <span className="num text-[10px] tracking-[0.28em] uppercase text-[var(--muted-foreground)]">{s.icon}</span>
                    <span className="size-1.5 rounded-full bg-[var(--clay)]/0 group-hover:bg-[var(--clay)] transition-colors duration-500" />
                  </div>
                  <div className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight num text-[var(--ink)] group-hover:text-[var(--clay)] transition-colors duration-500">
                    {s.k}
                  </div>
                  <div className="mt-4 md:mt-5 text-[15px] font-semibold text-[var(--ink)]">{s.v}</div>
                  <div className="mt-1.5 text-[10px] text-[var(--muted-foreground)] uppercase tracking-[0.2em]">{s.note}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </PageSection>
  );
}

/* ──────────────────────────── 3. configurator ──────────────────────────── */

const CONCEPTS = [
  {
    id: "directie",
    n: "01",
    name: "Directiemeubelen",
    sub: "Exclusief, voor leiderschap",
    img: OI.categories[0].img,
    mood: "Luxe, representatief, tijdloos",
    body: "Onze exclusieve directiemeubelen brengen rust en autoriteit in elke directiekamer. Hoogwaardige materialen, perfecte afwerking, alleen bij Office Image.",
    metrics: [["100%", "exclusief"], ["NL", "voorraad"], ["A+", "afwerking"]],
    benefits: ["Luxe directiebureaus", "Conferentietafels", "Vergaderkasten", "Hoogwaardige materialen"],
  },
  {
    id: "werkplekken",
    n: "02",
    name: "Werkplekken",
    sub: "Elektrisch verstelbaar, Foxline, T-line",
    img: OI.categories[1].img,
    mood: "Ergonomisch, modern, modulair",
    body: "Elektrisch zit sta werkplekken in meerdere stijlen: Foxline, Nieuw Line, Slinger en T-line. Ergonomisch, duurzaam en modulair uitbreidbaar.",
    metrics: [["4", "series"], ["120cm", "max hoogte"], ["10jr", "garantie"]],
    benefits: ["Elektrisch verstelbaar", "Foxline serie", "T-line serie", "Slinger werkplek"],
  },
  {
    id: "stoelen",
    n: "03",
    name: "Bureaustoelen",
    sub: "24 uurs, stof en leder",
    img: OI.categories[3].img,
    mood: "Comfort, ondersteunend, 24/7",
    body: "Van de bestseller Raptor 24uurs bureaustoel tot luxe lederen directiestoelen. Ergonomisch ontworpen voor de hele werkdag en daarna.",
    metrics: [["24u", "gebruik"], ["€669", "vanaf"], ["NEN", "EN 1335"]],
    benefits: ["24 uurs stoelen", "Leder uitvoering", "Stof uitvoering", "Verstelbare armleggers"],
  },
  {
    id: "archief",
    n: "04",
    name: "Archiefkasten",
    sub: "Roldeur, ladenkasten, rolblokken",
    img: OI.categories[4].img,
    mood: "Strak, functioneel, veilig",
    body: "Exclusieve roldeurkasten, ladenkasten en rolblokken in diverse afmetingen. Duurzaam staal, zacht sluitende lades en strakke afwerking.",
    metrics: [["5", "afmetingen"], ["Zacht", "sluitend"], ["10jr", "garantie"]],
    benefits: ["Roldeurkasten", "Tekeningladekasten", "Rolblokken", "Veilig afsluitbaar"],
  },
  {
    id: "lockers",
    n: "05",
    name: "Lockers",
    sub: "Garderobe, werkplaats",
    img: OI.categories[6].img,
    mood: "Robuust, geperforeerd, hybride",
    body: "Geperforeerde lockers voor moderne hybride kantoren. Persoonlijke opbergruimte met elektronische sloten, perfect voor flexplekken.",
    metrics: [["1 t/m 6", "deuren"], ["RAL", "kleur vrij"], ["Diverse", "slotopties"]],
    benefits: ["1 t/m 6 deuren", "Geperforeerd ontwerp", "Elektronisch slot", "RAL naar keuze"],
  },
];

function Configurator() {
  const [i, setI] = useState(0);
  const c = CONCEPTS[i];

  return (
    <PageSection id="concepts" tone="ink" prevTone="ink" nextTone="bone">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 section-ambient-ochre-dark opacity-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 80% 20%, color-mix(in oklab, var(--ochre) 12%, transparent), transparent 55%)",
        }}
      />

      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-[1fr_auto] gap-10 items-end">
          <Reveal>
            <Eyebrow>De werkplekervaring</Eyebrow>
            <h2 className={`mt-5 ${sectionH2} text-[var(--bone)] max-w-[16ch]`}>
              Vijf werkomgevingen. <span className="italic text-[var(--ochre)]">Eén partner.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-[var(--bone)]/65 max-w-md text-base leading-relaxed">
              Ontdek de ruimtelijke concepten die centraal staan in elke Office Image transformatie. Wissel tussen categorieën en ervaar het verschil.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 md:mt-20 grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-10 items-start">
          {/* framed canvas */}
          <motion.div
            initial={{ opacity: 0, x: -32, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease }}
            className="relative group"
          >
            <div className="relative rounded-[1.35rem] p-3 md:p-4 border border-[var(--bone)]/12 bg-[color-mix(in_oklab,var(--bone)_4%,var(--ink))] shadow-[0_32px_80px_-32px_rgba(0,0,0,0.55)]">
              <span aria-hidden className="absolute top-3 left-3 md:top-4 md:left-4 size-7 border-t-2 border-l-2 border-[var(--ochre)] rounded-tl-sm opacity-80" />
              <span aria-hidden className="absolute top-3 right-3 md:top-4 md:right-4 size-7 border-t-2 border-r-2 border-[var(--ochre)] rounded-tr-sm opacity-80" />
              <span aria-hidden className="absolute bottom-3 left-3 md:bottom-4 md:left-4 size-7 border-b-2 border-l-2 border-[var(--ochre)] rounded-bl-sm opacity-80" />
              <span aria-hidden className="absolute bottom-3 right-3 md:bottom-4 md:right-4 size-7 border-b-2 border-r-2 border-[var(--ochre)] rounded-br-sm opacity-80" />

              <div className="relative aspect-[16/10] md:aspect-[16/9] rounded-xl overflow-hidden border border-[var(--bone)]/18 ring-1 ring-[var(--bone)]/5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={c.id}
                    src={c.img}
                    alt={`${c.name} werkplekconcept`}
                    initial={{ opacity: 0, scale: 1.12, filter: "blur(8px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.04, filter: "blur(4px)" }}
                    transition={{ duration: 0.9, ease }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/90 via-[var(--ink)]/15 to-[var(--ink)]/25 pointer-events-none" />
                <motion.div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--bone)]/8 to-transparent pointer-events-none"
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 2.2, ease, repeat: Infinity, repeatDelay: 4 }}
                />

                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute left-5 top-5 md:left-6 md:top-6 glass-dark rounded-lg px-3.5 py-1.5 text-[11px] tracking-[0.22em] uppercase"
                >
                  {String(i + 1).padStart(2, "0")} / {String(CONCEPTS.length).padStart(2, "0")}
                </motion.div>

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.55, ease }}
                    >
                      <div className="eyebrow text-[var(--bone)]/65">Concept {c.n}, {c.mood}</div>
                      <div className="mt-2 font-display text-2xl md:text-3xl tracking-tight">{c.name}</div>
                      <div className="mt-1 text-[var(--bone)]/70 text-sm">{c.sub}</div>
                    </motion.div>
                  </AnimatePresence>

                  <motion.div
                    key={`metrics-${c.id}`}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease }}
                    className="glass-dark rounded-xl p-4 md:p-5 grid grid-cols-3 gap-4 min-w-[260px] md:min-w-[280px]"
                  >
                    {c.metrics.map(([k, v]) => (
                      <div key={v}>
                        <div className="font-display text-lg md:text-xl num">{k}</div>
                        <div className="text-[10px] uppercase tracking-widest text-[var(--bone)]/55">{v}</div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* selector + body */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
            className="flex flex-col gap-6"
          >
            <div className="relative rounded-2xl border border-[var(--bone)]/12 p-2 overflow-hidden">
              {CONCEPTS.map((cc, idx) => {
                const active = idx === i;
                return (
                  <button
                    key={cc.id}
                    onClick={() => setI(idx)}
                    className={`relative w-full text-left ${btnR} px-4 py-3.5 flex items-center gap-4 transition-colors duration-500 ${active ? "text-[var(--ink)]" : "hover:bg-[var(--bone)]/5 text-[var(--bone)]"}`}
                  >
                    {active && (
                      <motion.div
                        layoutId="concept-active-pill"
                        className="absolute inset-0 bg-[var(--bone)] rounded-lg"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className={`relative z-[1] num text-xs ${active ? "text-[var(--clay)]" : "text-[var(--bone)]/45"}`}>{cc.n}</span>
                    <span className="relative z-[1] font-display text-base md:text-lg leading-none flex-1">{cc.name}</span>
                    <motion.span
                      className="relative z-[1] text-xs"
                      animate={{ x: active ? 0 : -6, opacity: active ? 1 : 0 }}
                      transition={{ duration: 0.35, ease }}
                    >
                      →
                    </motion.span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(2px)" }}
                transition={{ duration: 0.5, ease }}
                className="rounded-2xl border border-[var(--bone)]/12 p-6 bg-[color-mix(in_oklab,var(--bone)_3%,var(--ink))]"
              >
                <p className="text-[var(--bone)]/80 text-[15px] leading-relaxed">{c.body}</p>
                <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[13px] text-[var(--bone)]/70">
                  {c.benefits.map((b, bi) => (
                    <motion.div
                      key={b}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + bi * 0.04, duration: 0.4, ease }}
                      className="flex items-center gap-2.5"
                    >
                      <span className="size-1 rounded-full bg-[var(--ochre)]" />
                      {b}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </PageSection>
  );
}

/* ──────────────────────────── 4. process storytelling ──────────────────────────── */

const STEPS = [
  { n: "01", t: "Adviesgesprek", d: "Bezoek de showroom of bel ons. We denken vrijblijvend mee over uw kantoorinrichting." },
  { n: "02", t: "Ruimteplan", d: "Een passend voorstel met indeling, materialen en budget binnen 48 uur." },
  { n: "03", t: "3D Visualisatie", d: "Fotorealistische beelden tonen het eindresultaat voordat er één product wordt geleverd." },
  { n: "04", t: "Productselectie", d: "Bestsellers uit eigen voorraad of op maat geconfigureerd: directiemeubelen tot werkplekken." },
  { n: "05", t: "Levering en montage", d: "Snelle landelijke levering met professionele montage door ons eigen team." },
  { n: "06", t: "Klanttevredenheid", d: "Ingericht, klaar om te gebruiken. 100% klanttevredenheid is ons uitgangspunt." },
];

function ProcessStepCard({ s, stepIndex }: { s: (typeof STEPS)[number]; stepIndex: number }) {
  return (
    <article className="group/card shrink-0 w-[86vw] sm:w-[58vw] md:w-[400px] lg:w-[440px] rounded-[20px] overflow-hidden border border-[var(--ink)]/8 bg-[var(--card)] shadow-[0_1px_2px_rgba(20,15,10,0.04)] hover:shadow-[0_40px_80px_-30px_rgba(20,15,10,0.35)] hover:border-[var(--clay)]/40 transition-[box-shadow,border-color] duration-500">
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--sand)]">
        <img
          src={OI.categories[stepIndex % OI.categories.length].img}
          alt={s.t}
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover/card:scale-[1.08] pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/55 via-[var(--ink)]/10 to-transparent" />
        <div className="absolute top-4 left-4 flex items-center gap-2 glass rounded-full pl-1.5 pr-3.5 py-1">
          <span className="size-6 rounded-full bg-[var(--ink)] text-[var(--bone)] grid place-items-center text-[10px] num">{s.n}</span>
          <span className="text-[10px] tracking-[0.22em] uppercase">Stap</span>
        </div>
        <div className="absolute bottom-4 right-5 font-display text-[88px] leading-none text-[var(--bone)]/85 num tracking-tighter drop-shadow-[0_2px_10px_rgba(0,0,0,0.25)] pointer-events-none">
          {s.n}
        </div>
        <div className="absolute bottom-5 left-5 right-24 pointer-events-none">
          <div className="font-display text-2xl md:text-[28px] text-[var(--bone)] leading-tight">{s.t}</div>
        </div>
      </div>
      <div className="p-6 md:p-7">
        <p className="text-[var(--muted-foreground)] text-[15px] leading-relaxed min-h-[72px]">{s.d}</p>
        <div className="mt-6 h-px bg-gradient-to-r from-[var(--ink)]/15 via-[var(--clay)]/40 to-transparent" />
        <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-[var(--muted-foreground)]">
          <span>Fase {stepIndex + 1}</span>
          <span className="num">
            {String(stepIndex + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </article>
  );
}

function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const loopWidthRef = useRef(0);
  const x = useMotionValue(0);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [pressing, setPressing] = useState(false);
  const marqueeSteps = [...STEPS, ...STEPS];
  const marqueeSpeed = 48;
  const paused = hovered || dragging || pressing;

  const measureLoop = useCallback(() => {
    if (trackRef.current) loopWidthRef.current = trackRef.current.scrollWidth / 2;
  }, []);

  const wrapX = useCallback(
    (value: number) => {
      const loop = loopWidthRef.current;
      if (!loop) return value;
      let v = value;
      while (v <= -loop) v += loop;
      while (v > 0) v -= loop;
      return v;
    },
    [],
  );

  useEffect(() => {
    measureLoop();
    const ro = new ResizeObserver(measureLoop);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measureLoop);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measureLoop);
    };
  }, [measureLoop]);

  useEffect(() => {
    if (paused) return;
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const loop = loopWidthRef.current;
      if (loop > 0) {
        const dt = (now - last) / 1000;
        last = now;
        x.set(wrapX(x.get() - marqueeSpeed * dt));
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, x, wrapX]);

  const handleDrag = () => {
    x.set(wrapX(x.get()));
  };

  const handleDragEnd = () => {
    setDragging(false);
    x.set(wrapX(x.get()));
  };

  return (
    <PageSection id="process" tone="bone" prevTone="bone" nextTone="sand">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 section-grain opacity-[0.035]"
      />
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-[1fr_1fr] gap-12 items-end">
          <Reveal>
            <Eyebrow>Ons proces</Eyebrow>
            <h2 className={`mt-5 ${sectionH2} max-w-[14ch]`}>
              Van adviesgesprek tot <span className="italic text-[var(--clay)]">opgeleverd kantoor.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-[var(--muted-foreground)] text-lg max-w-xl leading-relaxed">
              Wij verkopen niet alleen meubels. Wij ontzorgen het hele inrichtingstraject. Transparant, snel en met aandacht voor detail.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-20 md:mt-28 relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 z-10 bg-gradient-to-r from-[var(--bone)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 z-10 bg-gradient-to-l from-[var(--bone)] to-transparent" />

        <div
          className={`overflow-hidden mask-marquee py-2 ${hovered && !dragging ? "cursor-grab" : ""} ${dragging ? "cursor-grabbing" : ""}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { setHovered(false); setDragging(false); setPressing(false); }}
        >
          <motion.div
            ref={trackRef}
            style={{ x }}
            drag="x"
            dragElastic={0.06}
            dragMomentum
            dragTransition={{ power: 0.25, timeConstant: 280 }}
            onDragStart={() => setDragging(true)}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            onPointerDown={() => setPressing(true)}
            onPointerUp={() => setPressing(false)}
            onPointerCancel={() => setPressing(false)}
            className="flex items-stretch gap-4 md:gap-6 w-max pl-4 md:pl-6 select-none touch-pan-y"
          >
            {marqueeSteps.map((s, i) => (
              <ProcessStepCard key={`${s.n}-${i}`} s={s} stepIndex={i % STEPS.length} />
            ))}
          </motion.div>
        </div>

        <div className="mt-10 md:mt-12 max-w-[1500px] mx-auto px-6 md:px-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[var(--muted-foreground)]">
            <span className="size-1.5 rounded-full bg-[var(--clay)] animate-pulse" />
            <span>Loopt automatisch · hover &amp; sleep om te verschuiven</span>
          </div>
          <div className="flex items-center gap-2">
            {STEPS.map((s) => (
              <span
                key={s.n}
                className="h-1.5 w-4 rounded-full bg-[var(--ink)]/15"
                aria-hidden
              />
            ))}
            <span className="ml-1 text-[11px] uppercase tracking-[0.22em] text-[var(--muted-foreground)] num">
              {String(STEPS.length).padStart(2, "0")} stappen
            </span>
          </div>
        </div>
      </div>
    </PageSection>
  );
}

/* ──────────────────────────── 5. 3D visualization ──────────────────────────── */

function Visualization() {
  const tabs = ["Plattegrond", "Concept", "Render", "Opgeleverd"];
  const [t, setT] = useState(2);
  return (
    <PageSection id="visualization" tone="sand" prevTone="bone" nextTone="bone">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
          <Reveal>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden bg-[var(--bone)] border border-[var(--ink)]/8 shadow-[0_40px_80px_-40px_rgba(20,15,10,0.35)]">
                <div className="flex items-center gap-2 px-5 py-3 border-b border-[var(--ink)]/8 bg-[var(--bone)]">
                  <div className="flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-[var(--ink)]/15" />
                    <span className="size-2.5 rounded-full bg-[var(--ink)]/15" />
                    <span className="size-2.5 rounded-full bg-[var(--clay)]/60" />
                  </div>
                  <div className="ml-3 text-[11px] tracking-[0.22em] uppercase text-[var(--muted-foreground)] num">
                    Office Image, studio weergave
                  </div>
                  <div className="ml-auto text-[11px] num text-[var(--muted-foreground)]">v2.4</div>
                </div>
                <img src={OI.categories[2].img} alt="3D weergave kantoorinrichting" className="w-full aspect-[4/3] object-cover" />
                <div className="absolute bottom-4 left-4 right-4 glass rounded-xl p-3 flex items-center gap-2 flex-wrap">
                  {tabs.map((tt, idx) => (
                    <button
                      key={tt}
                      onClick={() => setT(idx)}
                      className={`px-3.5 py-1.5 ${btnR} text-xs transition-all ${t === idx ? "bg-[var(--ink)] text-[var(--bone)]" : "text-[var(--ink)]/70 hover:text-[var(--ink)]"}`}
                    >
                      {tt}
                    </button>
                  ))}
                  <span className="ml-auto text-[11px] uppercase tracking-widest text-[var(--muted-foreground)] num">240 m², 1 verdieping</span>
                </div>
              </div>

              {/* floating dimension card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3, ease }}
                className="absolute -bottom-8 -right-4 md:-right-10 glass rounded-2xl p-5 w-[230px] hidden md:block"
              >
                <div className="eyebrow">Materiaalkeuze</div>
                <div className="mt-3 flex gap-2">
                  {["#3b2a20", "#c7956b", "#e8dfd1", "#5a6b54"].map(c => (
                    <div key={c} className="size-9 rounded-full border border-[var(--ink)]/10" style={{ background: c }} />
                  ))}
                </div>
                <div className="mt-3 text-xs text-[var(--muted-foreground)]">Walnoot, Halifax, Wit, Antraciet</div>
              </motion.div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <Eyebrow>3D Visualisatie</Eyebrow>
            <h2 className={`mt-5 ${sectionH2} max-w-[12ch]`}>
              Plan met <span className="italic text-[var(--clay)]">zekerheid</span> voordat de eerste bestelling vertrekt.
            </h2>
            <p className="mt-7 text-[var(--muted-foreground)] text-lg leading-relaxed max-w-lg">
              Vrijblijvend laten wij u zien hoe uw nieuwe kantoor eruit komt te zien. Van plattegrond en materiaalstalen tot een fotorealistische render, zodat u kiest op basis van beleving, niet alleen op productcode.
            </p>
            <ul className="mt-8 space-y-4 text-[15px]">
              {[
                ["Plattegrond", "Looplijnen, indeling en akoestiek eerst op papier opgelost."],
                ["3D rondleiding", "Loop door uw toekomstige kantoor in een interactief 3D model."],
                ["Materiaalstalen", "Voel hout, textiel en metaal in onze showroom in Rotterdam."],
                ["Snelle revisies", "Iedere aanpassing binnen 48 uur terug bij alle betrokkenen."],
              ].map(([t2, d]) => (
                <li key={t2} className="grid grid-cols-[auto_1fr] gap-5 items-baseline">
                  <span className="size-1.5 rounded-full bg-[var(--clay)] translate-y-2" />
                  <div>
                    <span className="font-medium">{t2}.</span>{" "}
                    <span className="text-[var(--muted-foreground)]">{d}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10"><ArrowLink>Bezoek de showroom</ArrowLink></div>
          </Reveal>
        </div>
      </div>
    </PageSection>
  );
}

/* ──────────────────────────── 6. services ──────────────────────────── */

const SERVICES = [
  { n: "01", t: "Inrichtingsadvies", tag: "Advies", d: "Vrijblijvend adviesgesprek in onze showroom of bij u op locatie. Wij denken mee over indeling en stijl.", img: OI.categories[0].img },
  { n: "02", t: "3D Visualisatie", tag: "Visualisatie", d: "Fotorealistische beelden van uw nieuwe kantoor. Zien is geloven, kiezen wordt eenvoudig.", img: OI.categories[1].img },
  { n: "03", t: "Ergonomisch Advies", tag: "Ergonomie", d: "24uurs stoelen, elektrisch verstelbare bureaus en akoestiek. Gezondheid en productiviteit voorop.", img: OI.categories[3].img },
  { n: "04", t: "Levering en montage", tag: "Logistiek", d: "Landelijke levering met eigen montageteam. Uw kantoor staat klaar wanneer u het nodig heeft.", img: OI.categories[2].img },
  { n: "05", t: "Onderhoud en service", tag: "Service", d: "Reparatie, uitbreiding en herinrichting. Eén partner voor de hele levensduur van uw kantoor.", img: OI.categories[6].img },
] as const;

const SERVICE_LAYOUT = [
  { span: "md:col-span-7", offset: "", tall: true },
  { span: "md:col-span-5", offset: "md:translate-y-10", tall: false },
  { span: "md:col-span-4", offset: "", tall: false },
  { span: "md:col-span-4", offset: "md:translate-y-6", tall: false },
  { span: "md:col-span-4", offset: "", tall: false },
] as const;

function ServiceCard({
  s,
  i,
  className = "",
  tall = false,
}: {
  s: (typeof SERVICES)[number];
  i: number;
  className?: string;
  tall?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.85, delay: i * 0.08, ease }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8 }}
      className={`group relative h-full ${className}`}
    >
      <div className="relative h-full rounded-[1.3rem] p-px overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute inset-[-50%] service-frame-border service-frame-animate opacity-30 group-hover:opacity-100 transition-opacity duration-700"
        />
        <div className="absolute inset-0 rounded-[1.3rem] bg-gradient-to-br from-[var(--clay)]/20 via-transparent to-[var(--ochre)]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="relative h-full flex flex-col rounded-[1.25rem] bg-[var(--card)] border border-[var(--ink)]/8 shadow-[0_20px_50px_-28px_rgba(17,24,39,0.22)] group-hover:shadow-[0_28px_64px_-24px_rgba(184,138,90,0.28)] transition-shadow duration-700 overflow-hidden">
          <span aria-hidden className="absolute top-4 left-4 z-20 size-6 border-t-2 border-l-2 border-[var(--clay)] rounded-tl-sm opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          <span aria-hidden className="absolute top-4 right-4 z-20 size-6 border-t-2 border-r-2 border-[var(--clay)] rounded-tr-sm opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          <span aria-hidden className="absolute bottom-4 left-4 z-20 size-6 border-b-2 border-l-2 border-[var(--ochre)] rounded-bl-sm opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          <span aria-hidden className="absolute bottom-4 right-4 z-20 size-6 border-b-2 border-r-2 border-[var(--ochre)] rounded-br-sm opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

          <div className={`relative overflow-hidden ${tall ? "aspect-[16/11] md:aspect-[16/10]" : "aspect-[16/10]"}`}>
            <motion.img
              src={s.img}
              alt={s.t}
              loading="lazy"
              animate={{ scale: hovered ? 1.08 : 1 }}
              transition={{ duration: 1.4, ease }}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/75 via-[var(--ink)]/15 to-[var(--ink)]/10" />
            <motion.div
              aria-hidden
              className="absolute inset-0 category-shine pointer-events-none"
              initial={{ x: "-100%", opacity: 0 }}
              animate={hovered ? { x: "200%", opacity: 1 } : { x: "-100%", opacity: 0 }}
              transition={{ duration: 1.1, ease }}
            />
            <motion.div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 70% 50% at 50% 100%, color-mix(in oklab, var(--clay) 25%, transparent), transparent 70%)",
              }}
              animate={{ opacity: hovered ? 0.9 : 0.4 }}
              transition={{ duration: 0.6 }}
            />

            <div className="absolute top-4 left-4 md:top-5 md:left-5 z-10 flex items-center gap-2">
              <span className="glass rounded-lg px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] num text-[var(--ink)]">
                {s.n}
              </span>
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
                className="rounded-lg bg-[var(--clay)]/90 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--bone)]"
              >
                {s.tag}
              </motion.span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 md:bottom-5 md:left-5 md:right-5 z-10 flex items-end justify-between gap-4">
              <motion.h3
                animate={{ x: hovered ? 4 : 0 }}
                transition={{ duration: 0.5, ease }}
                className="font-display text-2xl md:text-3xl lg:text-4xl text-[var(--bone)] leading-[1.05] tracking-tight"
              >
                {s.t}
              </motion.h3>
              <motion.span
                animate={{ opacity: hovered ? 1 : 0.5, x: hovered ? 0 : -8, scale: hovered ? 1 : 0.9 }}
                transition={{ duration: 0.45, ease }}
                className={`grid size-10 shrink-0 place-items-center ${btnR} bg-[var(--bone)]/15 backdrop-blur-sm text-[var(--bone)] border border-[var(--bone)]/20`}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" /></svg>
              </motion.span>
            </div>
          </div>

          <div className="relative flex-1 p-5 md:p-6 border-t border-[var(--ink)]/6 bg-[color-mix(in_oklab,var(--card)_92%,var(--sand))]">
            <motion.p
              animate={{ opacity: hovered ? 1 : 0.82 }}
              className="text-[var(--muted-foreground)] text-[14px] md:text-[15px] leading-relaxed"
            >
              {s.d}
            </motion.p>
            <motion.div
              initial={false}
              animate={{ width: hovered ? "100%" : "2.5rem" }}
              transition={{ duration: 0.65, ease }}
              className="mt-4 h-px bg-gradient-to-r from-[var(--clay)] via-[var(--ochre)] to-transparent"
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function Services() {
  return (
    <PageSection id="services" tone="bone" prevTone="sand" nextTone="bone">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(55vh,480px)] section-ambient-clay opacity-40"
      />
      <div className="relative max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-[1fr_1fr] gap-10 items-end">
          <Reveal>
            <Eyebrow>Onze diensten</Eyebrow>
            <h2 className={`mt-5 ${sectionH2} max-w-[12ch]`}>
              Meer dan <span className="italic text-[var(--clay)]">meubelverkoop.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-[var(--muted-foreground)] text-lg max-w-xl leading-relaxed">
              Vijf disciplines onder één dak. Schakel ons in voor één onderdeel of het complete inrichtingstraject, van advies tot service.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 md:mt-20 grid gap-5 md:gap-6 md:grid-cols-12 items-start">
          {SERVICES.map((s, i) => {
            const layout = SERVICE_LAYOUT[i];
            return (
              <div key={s.n} className={`${layout.span} ${layout.offset} transition-transform duration-700`}>
                <ServiceCard s={s} i={i} tall={layout.tall} />
              </div>
            );
          })}
        </div>
      </div>
    </PageSection>
  );
}

/* ──────────────────────────── 7. featured projects ──────────────────────────── */

const PROJECTS = [
  { img: OI.categories[0].img, t: "Directiesuite", type: "Directiemeubelen", scope: "Exclusief, op maat", city: "Rotterdam", year: "2025" },
  { img: OI.categories[1].img, t: "Foxline werkplek", type: "Werkplekken", scope: "Elektrisch verstelbaar", city: "Showroom Rotterdam", year: "2025" },
  { img: OI.categories[3].img, t: "Raptor bureaustoel", type: "Bureaustoelen", scope: "24 uurs, vanaf €669", city: "Bestseller", year: "2026" },
];

function Projects() {
  return (
    <PageSection id="projects" tone="bone" prevTone="bone" nextTone="sand">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-[1fr_auto] gap-6 items-end">
          <Reveal>
            <Eyebrow>Uitgelichte collecties</Eyebrow>
            <h2 className={`mt-5 ${sectionH2} max-w-[14ch]`}>
              Onze meest <span className="italic text-[var(--clay)]">gevraagde stukken.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <ArrowLink>Bekijk alle producten</ArrowLink>
          </Reveal>
        </div>

        <div className="mt-16 md:mt-20 grid md:grid-cols-3 gap-6 md:gap-8">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.08}>
              <a className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--graphite)]">
                  <img
                    src={p.img}
                    alt={p.t}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/70 via-[var(--ink)]/0 to-transparent opacity-90" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-[var(--bone)]">
                    <div className="flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase text-[var(--bone)]/70">
                      <span>{p.type}</span>
                      <span className="text-[var(--bone)]/30">/</span>
                      <span className="num">{p.year}</span>
                    </div>
                    <div className="mt-2 font-display text-3xl md:text-4xl leading-tight">{p.t}</div>
                    <div
                      className="mt-3 overflow-hidden text-[var(--bone)]/80 text-sm max-h-0 group-hover:max-h-32 transition-all duration-700 ease-out"
                    >
                      <p>{p.scope}. Direct uit voorraad leverbaar, met snelle landelijke levering vanuit Rotterdam.</p>
                      <div className="mt-3 inline-flex items-center gap-2 text-[var(--ochre)] text-xs uppercase tracking-widest">
                        Bekijk collectie →
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-5 left-5 glass-dark rounded-full px-3 py-1.5 text-[11px] uppercase tracking-widest text-[var(--bone)]">
                    {p.city}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </PageSection>
  );
}

/* ──────────────────────────── 8. CTA + footer ──────────────────────────── */

function CTA() {
  return (
    <PageSection id="contact" tone="ink" prevTone="ink" className="!pt-0 !pb-0">
      <div className="absolute inset-0">
        <img src={OI.categories[0].img} alt="" className="h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--ink)] via-[var(--ink)]/70 to-[var(--ink)]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-transparent to-[var(--ink)]/40" />
      </div>

      <div className="relative max-w-[1500px] mx-auto px-6 md:px-12 py-28 md:py-44">
        <Reveal>
          <Eyebrow>Begin een gesprek</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className={`mt-6 ${sectionH2} text-[var(--bone)] max-w-[14ch]`}>
            Laten we samen uw <span className="italic text-[var(--ochre)]">kantoor inrichten.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 grid md:grid-cols-[1fr_auto] gap-10 items-end">
            <p className="max-w-xl text-[var(--bone)]/70 text-lg leading-relaxed">
              Bezoek onze showroom in Rotterdam, bel ons direct of stuur een bericht. We helpen u snel en deskundig op weg, zes dagen per week.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={OI.showroom.telHref}><ArrowLink variant="clay">Bel {OI.showroom.tel}</ArrowLink></a>
              <a href="#showroom"><ArrowLink variant="bone">Plan showroombezoek</ArrowLink></a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-20 pt-10 border-t border-[var(--bone)]/15 grid md:grid-cols-4 gap-8 text-sm text-[var(--bone)]/65">
            {[
              ["Showroom", `${OI.showroom.address}\n${OI.showroom.zip}`],
              ["Telefoon", `${OI.showroom.tel}\n${OI.showroom.mobile}`],
              ["Openingstijden", "Ma t/m Vr, 09:00 tot 17:30\nZa, 11:00 tot 16:00"],
              ["KvK", `${OI.showroom.kvk}\n${OI.showroom.email}`],
            ].map(([h, b]) => (
              <div key={h}>
                <div className="eyebrow text-[var(--bone)]/55 mb-3">{h}</div>
                <div className="whitespace-pre-line text-[var(--bone)]/85">{b}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </PageSection>
  );
}

/* ──────────────────────────── page ──────────────────────────── */

function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pb-[68px] md:pb-0">
      <Header />
      <Hero />
      <Trust />
      <ProductCarousel />
      <Configurator />
      <Bestsellers />
      <Process />
      <Visualization />
      <Services />
      <Projects />
      <Testimonials />
      <Showroom />
      <CTA />
      <MainFooter />
      <FloatingNav />
    </main>
  );
}

/* ──────────────────────────── testimonials ──────────────────────────── */

const TESTIMONIALS = [
  {
    type: "Directiekantoor, Rotterdam",
    quote:
      "Snel geleverd, perfect afgewerkt en het directiekantoor oogt nu echt representatief. Het persoonlijke advies in de showroom maakte het verschil.",
    highlight: "Snel geleverd, perfect afgewerkt",
    name: "Mark van den Berg",
    role: "Directeur",
    company: "Tevreden klant",
    metric: "100% klanttevredenheid",
    metricVal: "100%",
    metricLabel: "klanttevredenheid",
  },
  {
    type: "Werkplekken, 24 stuks",
    quote:
      "Binnen een week stonden alle elektrisch verstelbare bureaus en Raptor stoelen op kantoor. Montage door eigen team, niets aan de hand met de planning.",
    highlight: "Binnen een week",
    name: "Sandra Jansen",
    role: "Office Manager",
    company: "MKB Rotterdam",
    metric: "7 dagen levertijd",
    metricVal: "7",
    metricLabel: "dagen levertijd",
  },
  {
    type: "Archiefkasten, 12 stuks",
    quote:
      "Exclusieve roldeurkasten tegen scherpe prijzen, uit voorraad geleverd. De showroom in Rotterdam is een aanrader voordat u beslist.",
    highlight: "uit voorraad geleverd",
    name: "Erik de Wit",
    role: "Facility Manager",
    company: "ZZP & MKB",
    metric: "40% korting bestsellers",
    metricVal: "40%",
    metricLabel: "korting bestsellers",
  },
] as const;

const TESTIMONIAL_STATS = [
  { k: "100%", v: "Klanttevredenheid", sub: "Bewezen kwaliteit" },
  { k: "6", v: "Dagen per week open", sub: "Showroom Rotterdam" },
  { k: "40%", v: "Korting bestsellers", sub: "30% over hele site" },
  { k: "NL", v: "Uit eigen voorraad", sub: "Snelle levering" },
] as const;

function TestimonialQuote({ quote, highlight }: { quote: string; highlight: string }) {
  const idx = quote.indexOf(highlight);
  if (idx === -1) {
    return (
      <p className="font-display text-2xl md:text-3xl lg:text-4xl leading-[1.18] tracking-tight">
        <span className="text-[var(--ochre)]">"</span>
        {quote}
        <span className="text-[var(--ochre)]">"</span>
      </p>
    );
  }
  const before = quote.slice(0, idx);
  const after = quote.slice(idx + highlight.length);
  return (
    <p className="font-display text-2xl md:text-3xl lg:text-4xl leading-[1.18] tracking-tight">
      <span className="text-[var(--ochre)]">"</span>
      {before}
      <span className="text-[var(--ochre)]">{highlight}</span>
      {after}
      <span className="text-[var(--ochre)]">"</span>
    </p>
  );
}

function TestimonialMetricCard({
  stat,
  index,
  pulse,
}: {
  stat: (typeof TESTIMONIAL_STATS)[number];
  index: number;
  pulse: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.07, ease }}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      <div className="relative rounded-2xl p-px overflow-hidden h-full">
        <motion.div
          animate={pulse ? { opacity: [0.3, 0.7, 0.3] } : { opacity: 0.25 }}
          transition={{ duration: 2.2, repeat: pulse ? Infinity : 0 }}
          className="absolute inset-0 bg-gradient-to-br from-[var(--clay)]/40 via-transparent to-[var(--ochre)]/30"
        />
        <div className="relative h-full rounded-[0.95rem] border border-[var(--ink)]/8 bg-[var(--bone)] p-6 md:p-7 shadow-[0_16px_40px_-28px_rgba(17,24,39,0.15)] group-hover:shadow-[0_20px_48px_-24px_rgba(184,138,90,0.22)] group-hover:border-[var(--clay)]/25 transition-all duration-500">
          <span aria-hidden className="absolute top-3 right-3 size-4 border-t border-r border-[var(--clay)]/40 rounded-tr-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <motion.div
            animate={pulse ? { scale: [1, 1.04, 1] } : { scale: 1 }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl md:text-5xl text-[var(--ink)] num tracking-tight"
          >
            {stat.k}
          </motion.div>
          <div className="mt-3 text-sm font-medium text-[var(--ink)]">{stat.v}</div>
          <div className="mt-1 text-[11px] uppercase tracking-widest text-[var(--muted-foreground)]">{stat.sub}</div>
          <motion.div
            initial={false}
            animate={{ width: pulse ? "100%" : "1.5rem" }}
            transition={{ duration: 0.8, ease }}
            className="mt-4 h-px bg-gradient-to-r from-[var(--clay)] to-transparent"
          />
        </div>
      </div>
    </motion.div>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const duration = 5500;
  const t = TESTIMONIALS[i];

  useEffect(() => {
    if (paused) return;
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min((now - started) / duration, 1);
      setProgress(p);
      if (p >= 1) {
        setI(prev => (prev + 1) % TESTIMONIALS.length);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [i, paused, duration]);

  const goTo = (idx: number) => {
    setI(idx);
    setProgress(0);
  };

  return (
    <PageSection id="about" tone="sand" prevTone="bone" nextTone="ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 section-ambient-clay opacity-50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 section-ambient-ochre-dark opacity-50"
      />
      <div className="relative max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-[1fr_1fr] gap-12 items-end">
          <Reveal>
            <Eyebrow>Wat klanten zeggen</Eyebrow>
            <h2 className={`mt-5 ${sectionH2} max-w-[14ch]`}>
              Vertrouwd door bedrijven die <em>het verschil voelen</em>.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-[var(--muted-foreground)] text-lg max-w-xl leading-relaxed">
              Van directiekantoor tot complete werkplekinrichting. Onze klanten waarderen het snelle advies, de scherpe prijzen en de zorgvuldige montage.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 md:mt-20 grid lg:grid-cols-[1.45fr_1fr] gap-6 lg:gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease }}
            className="relative group"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div className="relative h-full rounded-[1.35rem] p-px overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-[-60%] service-frame-border service-frame-animate opacity-35 group-hover:opacity-75 transition-opacity duration-700"
              />
              <div className="relative h-full flex flex-col rounded-[1.3rem] bg-[var(--ink)] text-[var(--bone)] overflow-hidden shadow-[0_32px_80px_-32px_rgba(0,0,0,0.5)]">
                <span aria-hidden className="absolute top-5 left-5 z-20 size-7 border-t-2 border-l-2 border-[var(--ochre)] rounded-tl-sm opacity-70" />
                <span aria-hidden className="absolute top-5 right-5 z-20 size-7 border-t-2 border-r-2 border-[var(--ochre)] rounded-tr-sm opacity-70" />
                <span aria-hidden className="absolute bottom-5 left-5 z-20 size-7 border-b-2 border-l-2 border-[var(--clay)] rounded-bl-sm opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <span aria-hidden className="absolute bottom-5 right-5 z-20 size-7 border-b-2 border-r-2 border-[var(--clay)] rounded-br-sm opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute -top-16 -right-16 size-80 rounded-full bg-[var(--clay)]/14 blur-3xl pointer-events-none" />
                <motion.div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--bone)]/6 to-transparent pointer-events-none"
                  initial={{ x: "-100%" }}
                  animate={{ x: "220%" }}
                  transition={{ duration: 2.4, ease, repeat: Infinity, repeatDelay: 5 }}
                />

                <div className="relative flex-1 p-8 md:p-10 lg:p-12">
                  <div className="flex items-center justify-between gap-4 text-[11px] tracking-[0.22em] uppercase text-[var(--bone)]/55">
                    <span className="inline-flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-[var(--ochre)] animate-pulse" />
                      Klantverhaal {String(i + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
                    </span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={t.type}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.35 }}
                        className="text-right"
                      >
                        {t.type}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  <div className="mt-8 md:mt-10 min-h-[200px] md:min-h-[220px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={t.name}
                        initial={{ opacity: 0, x: 36, filter: "blur(8px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, x: -28, filter: "blur(6px)" }}
                        transition={{ duration: 0.65, ease }}
                      >
                        <TestimonialQuote quote={t.quote} highlight={t.highlight} />

                        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
                          <div>
                            <div className="font-display text-xl md:text-2xl">{t.name}</div>
                            <div className="mt-1.5 text-sm text-[var(--bone)]/65">{t.role}, {t.company}</div>
                          </div>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.15, duration: 0.5 }}
                            className="text-right glass-dark rounded-xl px-4 py-3"
                          >
                            <div className="font-display text-2xl md:text-3xl text-[var(--ochre)] num tracking-tight">{t.metricVal}</div>
                            <div className="text-[10px] uppercase tracking-widest text-[var(--bone)]/55 mt-0.5">{t.metricLabel}</div>
                          </motion.div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="relative shrink-0 px-8 md:px-10 lg:px-12 pb-8 md:pb-10 border-t border-[var(--bone)]/10 bg-[color-mix(in_oklab,var(--ink)_88%,var(--clay))]">
                  <div className="flex items-center gap-3 pt-6">
                    {TESTIMONIALS.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => goTo(idx)}
                        className="relative h-1.5 rounded-full overflow-hidden bg-[var(--bone)]/15 transition-all duration-300 hover:bg-[var(--bone)]/25"
                        style={{ width: idx === i ? "2.75rem" : "1.5rem" }}
                        aria-label={`Toon klantverhaal ${idx + 1}`}
                        aria-current={idx === i ? "true" : undefined}
                      >
                        {idx === i && (
                          <>
                            <span className="absolute inset-0 bg-[var(--bone)]/10 rounded-full" />
                            <span
                              className="absolute inset-y-0 left-0 bg-[var(--ochre)] rounded-full transition-[width] duration-75 linear"
                              style={{ width: `${progress * 100}%` }}
                            />
                          </>
                        )}
                      </button>
                    ))}
                    <div className="ml-auto flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => goTo((i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                        className={`grid size-9 place-items-center ${btnR} border border-[var(--bone)]/15 hover:bg-[var(--bone)]/10 hover:border-[var(--ochre)]/30 transition-colors`}
                        aria-label="Vorig verhaal"
                      >
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M13 7H1M6 2L1 7l5 5" stroke="currentColor" strokeWidth="1.3" /></svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => goTo((i + 1) % TESTIMONIALS.length)}
                        className={`grid size-9 place-items-center ${btnR} border border-[var(--bone)]/15 hover:bg-[var(--bone)]/10 hover:border-[var(--ochre)]/30 transition-colors`}
                        aria-label="Volgend verhaal"
                      >
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.3" /></svg>
                      </button>
                    </div>
                  </div>
                  {paused && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-3 text-[10px] uppercase tracking-[0.18em] text-[var(--bone)]/40"
                    >
                      Automatisch afspelen gepauzeerd
                    </motion.p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 md:gap-5 content-start">
            {TESTIMONIAL_STATS.map((s, idx) => (
              <TestimonialMetricCard key={s.v} stat={s} index={idx} pulse={idx === 0 && i === 0} />
            ))}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.28, ease }}
              whileHover={{ y: -3 }}
              className="col-span-2 relative rounded-2xl p-px overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--clay)]/25 via-[var(--ochre)]/15 to-[var(--clay)]/25 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative rounded-[0.95rem] border border-[var(--ink)]/8 bg-[var(--bone)] p-6 md:p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="eyebrow">Veilig betalen via</div>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    {["iDEAL", "Creditcard", "Bancontact", "Op rekening"].map(method => (
                      <span
                        key={method}
                        className="inline-flex items-center rounded-lg border border-[var(--ink)]/8 bg-[var(--sand)]/60 px-3 py-1.5 text-sm font-medium text-[var(--graphite)] group-hover:border-[var(--clay)]/25 transition-colors"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 3l7 4v5c0 4-3 7-7 9-4-2-7-5-7-9V7l7-4Z" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[11px] uppercase tracking-wider">SSL beveiligd</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageSection>
  );
}

/* ──────────────────────────── product category carousel (official homepage) ──────────────────────────── */

type ProductCarouselItem = (typeof OI.productCarousel)[number];

function ProductCategoryCard({
  item,
  index,
}: {
  item: ProductCarouselItem;
  index: number;
}) {
  const n = (index % OI.productCarousel.length) + 1;

  return (
    <a
      href={item.href}
      className="group block h-full shrink-0 w-[min(78vw,300px)] sm:w-[300px] md:w-[320px] lg:w-[340px]"
    >
      <div className="relative h-full rounded-2xl overflow-hidden border border-[var(--bone)]/10 bg-[color-mix(in_oklab,var(--bone)_6%,var(--ink))] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.65)] transition-all duration-700 group-hover:border-[var(--ochre)]/35 group-hover:shadow-[0_32px_70px_-24px_rgba(212,165,116,0.22)] group-hover:-translate-y-1.5">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--ochre)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative aspect-[4/5] overflow-hidden">
          <div className="absolute inset-0 category-card-glow opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--ink)]/20 via-transparent to-[var(--ink)]/90" />

          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="num glass-dark rounded-lg px-2.5 py-1 text-[10px] tracking-[0.2em] text-[var(--bone)]/80">
              {String(n).padStart(2, "0")}
            </span>
          </div>
          <div className="absolute top-4 right-4 z-10">
            <span className="glass-dark rounded-lg px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-[var(--ochre)]">
              {item.tag}
            </span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center p-6 md:p-7">
            <img
              src={item.img}
              alt={item.name}
              loading="lazy"
              draggable={false}
              className="relative z-[1] max-h-[72%] max-w-[88%] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)] transition-transform duration-[1.1s] ease-out group-hover:scale-[1.08] group-hover:-translate-y-1"
            />
          </div>

          <motion.div
            aria-hidden
            className="absolute inset-0 category-shine opacity-0 group-hover:opacity-100 pointer-events-none"
            initial={false}
            animate={{ x: ["-120%", "120%"] }}
            transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 2.5 }}
          />
        </div>

        <div className="relative p-5 md:p-6 border-t border-[var(--bone)]/8">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-display text-lg md:text-xl leading-tight text-[var(--bone)] group-hover:text-[var(--ochre)] transition-colors duration-500">
                {item.name}
              </h3>
              <p className="mt-2 text-[12px] md:text-[13px] leading-relaxed text-[var(--bone)]/55 line-clamp-2 group-hover:text-[var(--bone)]/72 transition-colors duration-500">
                {item.line}
              </p>
            </div>
            <span className="shrink-0 mt-1 text-[var(--bone)]/40 group-hover:text-[var(--ochre)] group-hover:translate-x-0.5 transition-all duration-500 text-lg">
              →
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2">
            <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--ochre)]/90 font-medium">
              {item.stat}
            </span>
            <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--bone)]/35 group-hover:text-[var(--bone)]/55 transition-colors">
              Ontdek →
            </span>
          </div>
          <div className="mt-3 h-px w-0 group-hover:w-full bg-gradient-to-r from-[var(--ochre)] to-transparent transition-all duration-700 ease-out" />
        </div>
      </div>
    </a>
  );
}

function ProductCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const loopWidthRef = useRef(0);
  const x = useMotionValue(0);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [pressing, setPressing] = useState(false);
  const items = OI.productCarousel;
  const marqueeItems = [...items, ...items];
  const marqueeSpeed = 42;
  const paused = hovered || dragging || pressing;

  const measureLoop = useCallback(() => {
    if (trackRef.current) loopWidthRef.current = trackRef.current.scrollWidth / 2;
  }, []);

  const wrapX = useCallback((value: number) => {
    const loop = loopWidthRef.current;
    if (!loop) return value;
    let v = value;
    while (v <= -loop) v += loop;
    while (v > 0) v -= loop;
    return v;
  }, []);

  useEffect(() => {
    measureLoop();
    const ro = new ResizeObserver(measureLoop);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measureLoop);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measureLoop);
    };
  }, [measureLoop]);

  useEffect(() => {
    if (paused) return;
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const loop = loopWidthRef.current;
      if (loop > 0) {
        const dt = (now - last) / 1000;
        last = now;
        x.set(wrapX(x.get() - marqueeSpeed * dt));
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, x, wrapX]);

  const handleDrag = () => {
    x.set(wrapX(x.get()));
  };

  const handleDragEnd = () => {
    setDragging(false);
    x.set(wrapX(x.get()));
  };

  return (
    <PageSection id="categories" tone="ink" prevTone="bone" nextTone="ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 section-ambient-clay opacity-100"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 section-grain-light opacity-[0.04]"
      />

      <div className="relative max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-end">
          <Reveal>
            <Eyebrow dot={false}>
              <span className="text-[var(--ochre)]">Collectie</span>
            </Eyebrow>
            <h2 className={`mt-4 ${sectionH2} text-[var(--bone)]`}>
              Kantoormeubelen die uw werkruimte{" "}
              <em className="text-[var(--ochre)]">naar een hoger niveau</em> tillen.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-[var(--bone)]/68 text-base md:text-lg leading-relaxed max-w-xl lg:ml-auto">
              Office Image combineert exclusieve collecties met grote voorraad en persoonlijk advies. Ontdek acht categorieën, direct bestelbaar of te bekijken in onze showroom in Rotterdam.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={SHOP_PATH}>
                <ArrowLink variant="clay">Bekijk alle categorieën</ArrowLink>
              </a>
              <a href="#showroom">
                <ArrowLink variant="bone">Plan showroombezoek</ArrowLink>
              </a>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 md:mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--bone)]/10 pt-6">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[var(--bone)]/45">
            <span className="size-1.5 rounded-full bg-[var(--ochre)] animate-pulse" />
            <span>Loopt automatisch · hover &amp; sleep om te verschuiven</span>
          </div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--bone)]/45 num">
            {String(items.length).padStart(2, "0")} categorieën
          </span>
        </div>

        <Reveal delay={0.15} className="mt-8 md:mt-10 relative">
          <div
            className="absolute -inset-x-4 top-8 bottom-8 rounded-3xl pointer-events-none opacity-60"
            style={{
              background: "linear-gradient(90deg, var(--ink) 0%, transparent 8%, transparent 92%, var(--ink) 100%)",
            }}
            aria-hidden
          />

          <div
            className={`overflow-hidden py-2 ${hovered && !dragging ? "cursor-grab" : ""} ${dragging ? "cursor-grabbing" : ""}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => { setHovered(false); setDragging(false); setPressing(false); }}
          >
            <motion.div
              ref={trackRef}
              style={{ x }}
              drag="x"
              dragElastic={0.06}
              dragMomentum
              dragTransition={{ power: 0.25, timeConstant: 280 }}
              onDragStart={() => setDragging(true)}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              onPointerDown={() => setPressing(true)}
              onPointerUp={() => setPressing(false)}
              onPointerCancel={() => setPressing(false)}
              className="flex items-stretch gap-4 md:gap-6 w-max pl-4 md:pl-6 select-none touch-pan-y"
            >
              {marqueeItems.map((item, i) => (
                <ProductCategoryCard key={`${item.name}-${i}`} item={item} index={i} />
              ))}
            </motion.div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-[var(--bone)]/10 bg-[var(--bone)]/10">
            {[
              { k: "8", v: "Hoogwaardige categorieën" },
              { k: "NL", v: "Grote voorraad" },
              { k: "6", v: "Dagen showroom open" },
              { k: "100%", v: "Klanttevredenheid" },
            ].map((s) => (
              <div key={s.v} className="bg-[color-mix(in_oklab,var(--ink)_92%,var(--bone))] px-5 py-5 md:py-6 text-center">
                <div className="font-display text-2xl md:text-3xl text-[var(--ochre)] num">{s.k}</div>
                <div className="mt-1 text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-[var(--bone)]/50">{s.v}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </PageSection>
  );
}

/* ──────────────────────────── bestsellers (real OfficeImage products) ──────────────────────────── */

function BestsellerCard({ b, i }: { b: (typeof OI.bestsellers)[number]; i: number }) {
  const product = cartProductFromBestseller(b);

  return (
    <Reveal delay={i * 0.06}>
      <article className="group flex h-full flex-col rounded-2xl overflow-hidden bg-[var(--card)] border border-[var(--ink)]/8 shadow-[0_12px_40px_-24px_rgba(17,24,39,0.18)] transition-all duration-500 hover:border-[var(--clay)]/25 hover:shadow-[0_20px_50px_-20px_rgba(184,138,90,0.22)] hover:-translate-y-1">
        <div className="block relative aspect-square overflow-hidden bg-[var(--sand)]">
          <img
            src={b.img}
            alt={b.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {b.was && (
            <div className="absolute top-4 left-4 rounded-lg bg-[var(--clay)] text-[var(--bone)] px-3 py-1 text-[10px] uppercase tracking-[0.18em] font-medium">
              Sale
            </div>
          )}
          <div className="absolute top-4 right-4 glass rounded-lg px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] num text-[var(--ink)]">
            Op voorraad
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <h3 className="font-display text-lg md:text-xl leading-snug tracking-tight text-[var(--ink)] min-h-[3em]">
            {b.name}
          </h3>
          <div className="mt-3 flex items-baseline gap-2">
            {b.was && <span className="text-sm text-[var(--muted-foreground)] line-through num">{b.was}</span>}
            <span className="font-display text-2xl num text-[var(--ink)]">{b.price}</span>
          </div>
          <div className="mt-5 pt-4 border-t border-[var(--ink)]/6">
            <AddToCartButton product={product} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Bestsellers() {
  return (
    <PageSection id="bestsellers" tone="bone" prevTone="ink" nextTone="bone">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-[1fr_auto] gap-6 items-end">
          <Reveal>
            <Eyebrow>Bestsellers, tot 40% korting</Eyebrow>
            <h2 className={`mt-5 ${sectionH2} max-w-[14ch]`}>
              De meest <span className="italic text-[var(--clay)]">gevraagde stukken.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <a href="/producten">
              <ArrowLink>Alle artikelen</ArrowLink>
            </a>
          </Reveal>
        </div>

        <div className="mt-14 md:mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {OI.bestsellers.map((b, i) => (
            <BestsellerCard key={b.href} b={b} i={i} />
          ))}
        </div>
      </div>
    </PageSection>
  );
}

/* ──────────────────────────── showroom (real Rotterdam address & hours) ──────────────────────────── */

function Showroom() {
  return (
    <PageSection id="showroom" tone="ink" prevTone="sand" nextTone="ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 section-ambient-ochre-dark opacity-80"
      />
      <div className="relative max-w-[1500px] mx-auto px-6 md:px-12 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
        <Reveal>
          <div className="relative rounded-2xl overflow-hidden border border-[var(--bone)]/12">
            <img src={OI.categories[0].img} alt="Office Image toonzaal" className="w-full aspect-[4/3] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/70 to-transparent" />
            <div className="absolute left-6 bottom-6 right-6 flex items-end justify-between gap-4">
              <div>
                <div className="eyebrow text-[var(--bone)]/65">Showroom, Rotterdam</div>
                <div className="mt-2 font-display text-3xl md:text-4xl">{OI.showroom.address}</div>
                <div className="text-[var(--bone)]/70">{OI.showroom.zip}</div>
              </div>
              <div className="glass-dark rounded-xl px-4 py-3 text-center">
                <div className="font-display text-2xl num">6/7</div>
                <div className="text-[10px] uppercase tracking-widest text-[var(--bone)]/55">dagen open</div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <Eyebrow>Bezoek de showroom</Eyebrow>
          <h2 className={`mt-5 ${sectionH2} text-[var(--bone)] max-w-[14ch]`}>
            Voel de kwaliteit, <span className="italic text-[var(--clay)]">zie de afwerking.</span>
          </h2>
          <p className="mt-6 text-[var(--bone)]/70 text-lg leading-relaxed max-w-lg">
            Onze fysieke showroom in Rotterdam is zes dagen per week open. Buiten openingstijden kunt u ook op afspraak langskomen. Wij staan voor u klaar.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-[var(--bone)]/12 p-5">
              <div className="eyebrow text-[var(--bone)]/55">Contact</div>
              <ul className="mt-3 space-y-1.5 text-[var(--bone)]/85 text-sm">
                <li><a href={OI.showroom.telHref} className="hover:text-[var(--ochre)] num">Tel {OI.showroom.tel}</a></li>
                <li><a href={OI.showroom.mobileHref} className="hover:text-[var(--ochre)] num">Mob {OI.showroom.mobile}</a></li>
                <li className="num">{OI.showroom.email}</li>
                <li className="num text-[var(--bone)]/55">KvK {OI.showroom.kvk}</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--bone)]/12 p-5">
              <div className="eyebrow text-[var(--bone)]/55">Openingstijden</div>
              <ul className="mt-3 space-y-1.5 text-sm">
                {OI.hours.map(([d, h]) => (
                  <li key={d} className="flex justify-between text-[var(--bone)]/85">
                    <span>{d}</span>
                    <span className={`num ${h === "Gesloten" ? "text-[var(--bone)]/40" : ""}`}>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={OI.showroom.telHref}><ArrowLink variant="clay">Bel direct</ArrowLink></a>
            <span className="pointer-events-none"><ArrowLink variant="bone">Volg op Instagram</ArrowLink></span>
          </div>
        </Reveal>
      </div>
    </PageSection>
  );
}