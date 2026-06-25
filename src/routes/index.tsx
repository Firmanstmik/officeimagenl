import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useScroll, useTransform } from "motion/react";
import { OI, SHOP_PATH } from "@/lib/oi-data";
import { cartProductFromBestseller, HeaderCartButton } from "@/lib/cart";
import { FloatingNav } from "@/components/site/FloatingNav";
import { MegaMenuPanel, NavChevron } from "@/components/site/MegaMenu";
import { TopUtilityBar } from "@/components/site/TopUtilityBar";
import { MainFooter } from "@/components/site/MainFooter";
import { PageSection } from "@/components/site/PageSection";
import { HeroExperienceCard } from "@/components/site/HeroExperienceCard";
import { HeroEyebrow } from "@/components/site/HeroEyebrow";
import { CategoryCollectieButton } from "@/components/site/CategoryCollectieButton";
import { PremiumStatAccent } from "@/components/site/PremiumLinkMarker";
import { CardOverlapButton } from "@/components/site/CardOverlapButton";
import { HeroScrollCue } from "@/components/site/HeroScrollCue";
import { VisualizationStudio3D } from "@/components/site/VisualizationStudio3D";
import { MaterialPicker } from "@/components/site/MaterialPicker";
import { LayoutPicker } from "@/components/site/LayoutPicker";
import { SimpleOpeningHours } from "@/components/site/ShowroomCards";
import { ShowroomContactCard } from "@/components/site/ShowroomContactCard";
import {
  VISUALIZATION_STEPS,
  type VisualizationLayoutId,
  type VisualizationMaterialId,
} from "@/lib/visualization-data";
import { ProjectRevealButton } from "@/components/site/ProjectRevealButton";
import { GoogleReviewsConstellation } from "@/components/site/GoogleReviewsConstellation";
import { MEGA_MENUS } from "@/lib/mega-menu-data";
import { btnR, ease, sectionH2 } from "@/lib/site-tokens";
import { createPageHead } from "@/lib/site-seo";

import hero from "@/assets/hero.jpg";
import cExec from "@/assets/concept-executive.jpg";
import cCollab from "@/assets/concept-collaborative.jpg";
import cHybrid from "@/assets/concept-hybrid.jpg";
import cFocus from "@/assets/concept-focus.jpg";
import cCreative from "@/assets/concept-creative.jpg";
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
  { label: "Home", href: "/", mega: false as const },
  ...MEGA_MENUS.map(m => ({ label: m.label, href: m.href, mega: true as const, megaId: m.id })),
];

function ChevronDown({ open }: { open?: boolean }) {
  return <NavChevron open={open} className="size-3" />;
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
    `relative px-4 py-2.5 text-[15px] font-semibold tracking-tight whitespace-nowrap transition-colors ${
      megaActive
        ? "text-[var(--ochre)]"
        : active
        ? scrolled
          ? "text-[var(--ink)]"
          : "text-[var(--bone)]"
        : scrolled
        ? "text-[var(--ink)]/72 hover:text-[var(--ink)]"
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
            ? "bg-[color-mix(in_oklab,var(--bone)_78%,transparent)] backdrop-blur-2xl backdrop-saturate-150 shadow-[0_10px_40px_-16px_rgba(17,24,39,0.14)] border-b border-[var(--ink)]/[0.07]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          {/* row 1 — utility bar (rechtsboven) */}
          <motion.div
            animate={{ height: scrolled ? 0 : 36, opacity: scrolled ? 0 : 1 }}
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
            <div className="flex items-center justify-between gap-5 xl:gap-8 py-3.5">
              <a href="/" className="shrink-0">
                <img src={OI.logo} alt="Office Image" className="h-14 md:h-16 w-auto" />
              </a>

              <nav className="flex items-center justify-end gap-0.5 shrink-0 ml-auto">
                {MAIN_NAV.map(n => {
                  const isHome = n.label === "Home";
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
                        className={`group inline-flex items-center gap-1 ${linkCls(isHome, megaActive)}`}
                      >
                        {n.label}
                        {!isHome && <ChevronDown open={megaActive} />}
                        <span
                          className={`absolute left-3 right-3 bottom-1 h-0.5 origin-left bg-[var(--ochre)] transition-transform duration-300 ${
                            isHome || megaActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                          }`}
                        />
                      </a>
                    </div>
                  );
                })}

                <div className={`ml-4 pl-4 border-l shrink-0 ${scrolled ? "border-[var(--ink)]/10" : "border-[var(--bone)]/12"}`}>
                  <HeaderCartButton className="px-4 py-2.5 text-[13px]" />
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
          <div className="flex lg:hidden items-center justify-between gap-4 py-3">
            <a href="/" className="shrink-0">
              <img src={OI.logo} alt="Office Image" className="h-12 w-auto" />
            </a>
            <div className="flex items-center gap-2">
              <HeaderCartButton />
              <button
                type="button"
                onClick={() => setMobileOpen(o => !o)}
                aria-label="Menu"
                className={`grid size-9 place-items-center rounded-lg transition-colors ${
                  scrolled
                    ? "text-[var(--ink)]/75 hover:bg-[var(--ink)]/6"
                    : "text-[var(--bone)]/80 hover:bg-[var(--bone)]/10"
                }`}
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
                  Home
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
    img: OI.media.armaDirectie,
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
    img: OI.media.foxlineWerkplek,
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
    img: OI.media.brandwerendArchief,
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
      <motion.div style={{ y: contentY }} className="relative z-10 flex h-full flex-col pt-[124px] sm:pt-[132px] md:pt-[152px] lg:pt-[196px] xl:pt-[204px]">
        <div className="flex-1 px-4 md:px-8 lg:px-12">
          <div className="h-full max-w-[1600px] mx-auto flex flex-col gap-6 lg:gap-8 pb-32 md:pb-36 pt-4 md:pt-6 lg:pt-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,40%)] gap-6 lg:gap-8 lg:items-center">
            {/* main copy */}
            <div className="min-w-0 max-w-3xl relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`eyebrow-${idx}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.45, ease }}
                >
                  <HeroEyebrow>{slide.eyebrow}</HeroEyebrow>
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

              <div className="mt-8 md:mt-10">
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
                <div className="mt-6 flex flex-wrap items-center gap-3">
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

      <HeroScrollCue targetId="waarom" />
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
    <PageSection id="waarom" tone="bone" prevTone="hero" nextTone="sand">
      <div className="relative max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-1 gap-12 md:gap-20 items-end max-w-3xl">
          <Reveal>
            <Eyebrow>Waarom Office Image</Eyebrow>
            <h2 className={`mt-5 ${sectionH2}`}>
              De nieuwste producten, <span className="italic text-[var(--clay)]">de juiste prijzen</span>, direct uit voorraad.
            </h2>
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
    img: OI.media.concepts.directie,
    mood: "Luxe, representatief, tijdloos",
    body: "Onze exclusieve directiemeubelen brengen rust en autoriteit in elke directiekamer. Hoogwaardige materialen, perfecte afwerking, alleen bij Office Image.",
    metrics: [["100%", "exclusief"], ["NL", "voorraad"], ["A+", "afwerking"]],
    benefits: ["Luxe directiebureaus", "Conferentietafels", "Vergaderkasten", "Hoogwaardige materialen"],
  },
  {
    id: "werkplekken",
    n: "02",
    name: "Werkplekken",
    sub: "Elektrisch verstelbaar, Foxline, T line",
    img: OI.media.concepts.werkplekken,
    mood: "Ergonomisch, modern, modulair",
    body: "Elektrisch zit sta werkplekken in meerdere stijlen: Foxline, Nieuw Line, Slinger en T line. Ergonomisch, duurzaam en modulair uitbreidbaar.",
    metrics: [["4", "series"], ["120cm", "max hoogte"], ["10jr", "garantie"]],
    benefits: ["Elektrisch verstelbaar", "Foxline serie", "T line serie", "Slinger werkplek"],
  },
  {
    id: "stoelen",
    n: "03",
    name: "Bureaustoelen",
    sub: "24 uurs, stof en leder",
    img: OI.media.concepts.bureaustoelen,
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
    img: OI.media.concepts.archiefkasten,
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
    img: OI.media.concepts.lockers,
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
    <PageSection id="concepts" tone="sand" prevTone="sand" nextTone="bone" className="before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,color-mix(in_oklab,var(--bone)_55%,transparent),transparent_72%)]">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <Reveal>
          <Eyebrow>De werkplekervaring</Eyebrow>
          <h2 className={`mt-5 ${sectionH2} max-w-[16ch]`}>
            Vijf werkomgevingen. <span className="italic text-[var(--clay)]">Eén partner.</span>
          </h2>
        </Reveal>

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
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/95 via-[var(--ink)]/40 to-[var(--ink)]/15 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[var(--ink)]/88 to-transparent pointer-events-none" />
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
                  className="absolute left-5 top-5 md:left-6 md:top-6 rounded-lg border border-white/15 bg-[rgba(12,10,8,0.55)] backdrop-blur-xl px-3.5 py-1.5 text-[11px] tracking-[0.22em] uppercase text-white shadow-[0_8px_32px_-8px_rgba(0,0,0,0.45)]"
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
                      <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/80">
                        Concept {c.n}, {c.mood}
                      </div>
                      <div className="mt-2 font-display text-2xl md:text-3xl tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.55)]">
                        {c.name}
                      </div>
                      <div className="mt-1 text-sm text-white/90">{c.sub}</div>
                    </motion.div>
                  </AnimatePresence>

                  <motion.div
                    key={`metrics-${c.id}`}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease }}
                    className="rounded-xl border border-white/15 bg-[rgba(12,10,8,0.58)] backdrop-blur-xl p-4 md:p-5 grid grid-cols-3 gap-4 min-w-[260px] md:min-w-[280px] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.55)]"
                  >
                    {c.metrics.map(([k, v]) => (
                      <div key={v}>
                        <div className="font-display text-lg md:text-xl num text-white">{k}</div>
                        <div className="text-[10px] uppercase tracking-widest text-white/75">{v}</div>
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
            <div className="relative rounded-2xl border border-[var(--ink)]/8 bg-[var(--card)] p-2 overflow-hidden shadow-[0_8px_30px_-16px_rgba(17,24,39,0.12)]">
              {CONCEPTS.map((cc, idx) => {
                const active = idx === i;
                return (
                  <button
                    key={cc.id}
                    onClick={() => setI(idx)}
                    className={`relative w-full text-left ${btnR} px-4 py-3.5 flex items-center gap-4 transition-colors duration-500 ${active ? "text-[var(--ink)]" : "hover:bg-[var(--sand)] text-[var(--muted-foreground)]"}`}
                  >
                    {active && (
                      <motion.div
                        layoutId="concept-active-pill"
                        className="absolute inset-0 bg-[var(--sand)] rounded-lg"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className={`relative z-[1] num text-xs ${active ? "text-[var(--clay)]" : "text-[var(--muted-foreground)]"}`}>{cc.n}</span>
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
                className="rounded-2xl border border-[var(--ink)]/8 p-6 bg-[var(--card)] shadow-[0_12px_40px_-24px_rgba(17,24,39,0.14)]"
              >
                <p className="text-[var(--muted-foreground)] text-[15px] leading-relaxed">{c.body}</p>
                <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[13px] text-[var(--ink)]/75">
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
  { n: "01", t: "Adviesgesprek", d: "Bezoek de showroom of bel ons. We denken vrijblijvend mee over uw kantoorinrichting.", img: OI.media.process.adviesgesprek },
  { n: "02", t: "Ruimteplan", d: "Een passend voorstel met indeling, materialen en budget binnen 48 uur.", img: OI.media.process.ruimteplan },
  { n: "03", t: "3D Visualisatie", d: "Fotorealistische beelden tonen het eindresultaat voordat er één product wordt geleverd.", img: OI.media.process.visualisatie3d },
  { n: "04", t: "Productselectie", d: "Bestsellers uit eigen voorraad of op maat geconfigureerd: directiemeubelen tot werkplekken.", img: OI.media.process.productselectie },
  { n: "05", t: "Levering en montage", d: "Snelle landelijke levering met professionele montage door ons eigen team.", img: OI.media.process.leveringMontage },
  { n: "06", t: "Klanttevredenheid", d: "Ingericht, klaar om te gebruiken. 100% klanttevredenheid is ons uitgangspunt.", img: OI.media.process.klanttevredenheid },
];

function ProcessStepCard({ s, stepIndex }: { s: (typeof STEPS)[number]; stepIndex: number }) {
  return (
    <article className="group/card shrink-0 w-[86vw] sm:w-[58vw] md:w-[400px] lg:w-[440px] rounded-[20px] overflow-hidden border border-[var(--ink)]/8 bg-[var(--card)] shadow-[0_1px_2px_rgba(20,15,10,0.04)] hover:shadow-[0_40px_80px_-30px_rgba(20,15,10,0.35)] hover:border-[var(--clay)]/40 transition-[box-shadow,border-color] duration-500">
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--sand)]">
        <img
          src={s.img}
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
            <span>Loopt automatisch, hover en sleep om te verschuiven</span>
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
  const [t, setT] = useState(2);
  const [material, setMaterial] = useState<VisualizationMaterialId>("walnoot");
  const [layout, setLayout] = useState<VisualizationLayoutId>("open");
  const [flipVersion, setFlipVersion] = useState(0);
  const active = VISUALIZATION_STEPS[t] ?? VISUALIZATION_STEPS[2];
  const isPlattegrond = active.id === "plattegrond";

  const handleMaterialChange = (id: VisualizationMaterialId) => {
    setMaterial(id);
    setFlipVersion(v => v + 1);
  };

  const handleLayoutChange = (id: VisualizationLayoutId) => {
    setLayout(id);
    setFlipVersion(v => v + 1);
  };

  return (
    <PageSection id="visualization" tone="sand" prevTone="bone" nextTone="bone">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-start">
          <Reveal>
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden bg-[var(--bone)] border border-[var(--ink)]/8 shadow-[0_40px_80px_-40px_rgba(20,15,10,0.35)]">
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
                <VisualizationStudio3D
                  activeTab={t}
                  activeMaterial={material}
                  activeLayout={layout}
                  flipVersion={flipVersion}
                />
              </div>

              <div className="glass rounded-xl p-4 space-y-3" role="tablist" aria-label="Visualisatie fases">
                <div className="flex items-center gap-2 flex-wrap">
                  {VISUALIZATION_STEPS.map((step, idx) => (
                    <button
                      key={step.id}
                      type="button"
                      role="tab"
                      aria-selected={t === idx}
                      aria-controls={`viz-panel-${step.id}`}
                      onClick={() => setT(idx)}
                      className={`px-3.5 py-1.5 ${btnR} text-xs transition-all ${
                        t === idx
                          ? "bg-[var(--ink)] text-[var(--bone)] shadow-[0_4px_14px_-4px_rgba(17,24,39,0.45)]"
                          : "text-[var(--ink)]/70 hover:text-[var(--ink)] hover:bg-[var(--sand)]/80"
                      }`}
                    >
                      <span className="num mr-1.5 opacity-60">{step.step}</span>
                      {step.label}
                    </button>
                  ))}
                  <span className="ml-auto text-[11px] uppercase tracking-widest text-[var(--muted-foreground)] num hidden sm:inline">
                    {active.detail}
                  </span>
                </div>
                <p className="text-[13px] leading-relaxed text-[var(--muted-foreground)]">
                  <span className="font-medium text-[var(--ink)]">{active.caption}.</span>{" "}
                  {active.description}
                </p>
              </div>

              <div className="glass rounded-xl p-5">
                {isPlattegrond ? (
                  <LayoutPicker value={layout} onChange={handleLayoutChange} />
                ) : (
                  <MaterialPicker value={material} onChange={handleMaterialChange} />
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <Eyebrow>3D Visualisatie</Eyebrow>
            <h2 className={`mt-5 ${sectionH2} max-w-[12ch]`}>
              Ervaar uw kantoor voordat het <span className="italic text-[var(--clay)]">werkelijkheid wordt.</span>
            </h2>
            <p className="mt-7 text-[var(--muted-foreground)] text-lg leading-relaxed max-w-lg">
              Vrijblijvend laten wij u zien hoe uw nieuwe kantoor eruit komt te zien. Van plattegrond en materiaalstalen tot een fotorealistische render, zodat u kiest op basis van beleving, niet alleen op productcode.
            </p>
            <ul className="mt-8 space-y-3" role="list">
              {VISUALIZATION_STEPS.map((step, idx) => {
                const selected = t === idx;
                return (
                  <li key={step.id}>
                    <button
                      type="button"
                      onClick={() => setT(idx)}
                      className={`w-full text-left rounded-xl border px-4 py-3.5 transition-all duration-300 ${
                        selected
                          ? "border-[var(--clay)]/35 bg-[var(--sand)]/60 shadow-[0_8px_24px_-12px_rgba(184,138,90,0.25)]"
                          : "border-transparent hover:border-[var(--ink)]/8 hover:bg-[var(--sand)]/40"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg text-[11px] num font-medium transition-colors ${
                            selected ? "bg-[var(--ink)] text-[var(--bone)]" : "bg-[var(--sand)] text-[var(--muted-foreground)]"
                          }`}
                        >
                          {step.step}
                        </span>
                        <div>
                          <div className={`text-[15px] font-medium ${selected ? "text-[var(--ink)]" : "text-[var(--ink)]/80"}`}>
                            {step.label}
                          </div>
                          <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted-foreground)]">{step.description}</p>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
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
  { n: "01", t: "Inrichtingsadvies", tag: "Advies", d: "Vrijblijvend adviesgesprek in onze showroom of bij u op locatie. Wij denken mee over indeling en stijl.", img: OI.media.services.inrichtingsadvies },
  { n: "02", t: "3D Visualisatie", tag: "Visualisatie", d: "Fotorealistische beelden van uw nieuwe kantoor. Zien is geloven, kiezen wordt eenvoudig.", img: OI.media.services.visualisatie3d },
  { n: "03", t: "Ergonomisch Advies", tag: "Ergonomie", d: "24uurs stoelen, elektrisch verstelbare bureaus en akoestiek. Gezondheid en productiviteit voorop.", img: OI.media.services.ergonomischAdvies },
  { n: "04", t: "Levering en montage", tag: "Logistiek", d: "Landelijke levering met eigen montageteam. Uw kantoor staat klaar wanneer u het nodig heeft.", img: OI.media.services.leveringMontage },
  { n: "05", t: "Onderhoud en service", tag: "Service", d: "Reparatie, uitbreiding en herinrichting. Eén partner voor de hele levensduur van uw kantoor.", img: OI.media.services.onderhoudService },
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
  { img: "/images/collections/raptor-bureaustoel-premium.jpg", t: "Raptor bureaustoel", type: "Bureaustoelen", scope: "24 uurs, vanaf €669", city: "Bestseller", year: "2026" },
];

function Projects() {
  return (
    <PageSection id="projects" tone="bone" prevTone="bone" nextTone="sand">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-[1fr_auto] gap-6 items-end">
          <Reveal>
            <Eyebrow>Uitgelichte collecties</Eyebrow>
            <h2 className={`mt-5 ${sectionH2} max-w-[14ch]`}>
              Onze best <span className="italic text-[var(--clay)]">verkochte producten.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <ArrowLink>Bekijk alle producten</ArrowLink>
          </Reveal>
        </div>

        <div className="mt-16 md:mt-20 grid md:grid-cols-3 gap-6 md:gap-8">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.08}>
              <a href={SHOP_PATH} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--graphite)] ring-1 ring-[var(--ink)]/8 transition-[box-shadow,ring-color] duration-700 group-hover:ring-[var(--ochre)]/35 group-hover:shadow-[0_32px_70px_-28px_rgba(224,122,50,0.28)]">
                  <img
                    src={p.img}
                    alt={p.t}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/82 via-[var(--ink)]/25 to-transparent transition-opacity duration-700 group-hover:from-[var(--ink)]/88" />
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 40%, color-mix(in oklab, var(--ochre) 12%, transparent) 55%, transparent 70%)",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-[var(--bone)]">
                    <div className="flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase text-[var(--bone)]/70">
                      <span>{p.type}</span>
                      <span className="text-[var(--bone)]/30">/</span>
                      <span className="num">{p.year}</span>
                    </div>
                    <div className="mt-2 font-display text-3xl md:text-4xl leading-tight transition-transform duration-700 group-hover:-translate-y-0.5">
                      {p.t}
                    </div>
                    <div className="project-card-copy overflow-hidden text-[var(--bone)]/80 text-sm">
                      <p className="pt-3 leading-relaxed">
                        {p.scope}. Direct uit voorraad leverbaar, met snelle landelijke levering vanuit Rotterdam.
                      </p>
                      <ProjectRevealButton />
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
  const infoCards = [
    ["Showroom", `${OI.showroom.address}\n${OI.showroom.zip}`],
    ["Telefoon", `${OI.showroom.tel}\n${OI.showroom.mobile}`],
    ["Openingstijden", "Ma t/m Vr, 09:00 tot 17:30\nZa, 11:00 tot 16:00"],
    ["KvK", `${OI.showroom.kvk}\n${OI.showroom.email}`],
  ] as const;

  return (
    <section id="contact" className="relative overflow-hidden border-t border-[var(--ink)]/[0.06] bg-[var(--bone)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_12%_-10%,color-mix(in_oklab,var(--sand)_85%,transparent),transparent_58%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 section-grain opacity-[0.35]"
      />

      <div className="relative max-w-[1500px] mx-auto px-6 md:px-12 py-20 md:py-28 lg:py-32">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          <div>
            <Reveal>
              <Eyebrow>Begin een gesprek</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className={`mt-5 ${sectionH2} max-w-[14ch]`}>
                Laten we samen uw <span className="italic text-[var(--clay)]">kantoor inrichten.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-xl text-[var(--muted-foreground)] text-lg leading-relaxed">
                Bezoek onze showroom in Rotterdam, bel ons direct of stuur een bericht. We helpen u snel en deskundig op weg, zes dagen per week.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={OI.showroom.telHref}>
                  <ArrowLink variant="clay">Bel {OI.showroom.tel}</ArrowLink>
                </a>
                <a href="#showroom">
                  <ArrowLink variant="ink">Plan showroombezoek</ArrowLink>
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="relative overflow-hidden rounded-2xl border border-[var(--ink)]/[0.08] bg-[var(--card)] shadow-[0_28px_80px_-40px_rgba(17,24,39,0.22)]">
              <img
                src={OI.showroom.img}
                alt="Office Image showroom Rotterdam"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/55 via-[var(--ink)]/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <div className="eyebrow text-[var(--bone)]/70">Showroom Rotterdam</div>
                <p className="mt-2 font-display text-2xl text-[var(--bone)]">{OI.showroom.address}</p>
                <p className="text-[var(--bone)]/75">{OI.showroom.zip}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.22}>
          <div className="mt-14 md:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {infoCards.map(([title, body]) => (
              <div
                key={title}
                className="rounded-xl border border-[var(--ink)]/[0.07] bg-[var(--card)] px-5 py-5 shadow-[0_10px_36px_-24px_rgba(17,24,39,0.14)]"
              >
                <div className="eyebrow text-[var(--muted-foreground)] mb-3">{title}</div>
                <div className="whitespace-pre-line text-sm leading-relaxed text-[var(--ink)]/85">{body}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ──────────────────────────── page ──────────────────────────── */

function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pb-[68px] md:pb-0">
      <Header />
      <Hero />
      <Trust />
      <Bestsellers />
      <ProductCarousel />
      <Configurator />
      <Process />
      <Visualization />
      <Services />
      <Projects />
      <GoogleReviewsSection />
      <Showroom />
      <CTA />
      <MainFooter />
      <FloatingNav />
    </main>
  );
}
/* ──────────────────────────── google reviews constellation ──────────────────────────── */

function GoogleReviewsSection() {
  return (
    <GoogleReviewsConstellation
      eyebrow="Klanten over Office Image"
      title={
        <>
          Vertrouwd door bedrijven in{" "}
          <span className="text-[var(--clay)]">heel Nederland</span>
        </>
      }
      subtitle="Echte Google Reviews van tevreden klanten. Van maatwerk vergadertafels tot complete kantoorinrichting, met kwaliteit, service en snelheid die u voelt."
    />
  );
}

/* ──────────────────────────── product category carousel (official homepage) ──────────────────────────── */

type ProductCarouselItem = (typeof OI.productCarousel)[number];

const COLLECTIE_STATS = [
  {
    k: "8",
    v: "Hoogwaardige categorieën",
    note: "Curated assortiment",
    icon: (
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
    tone: "clay" as const,
  },
  {
    k: "NL",
    v: "Grote voorraad",
    note: "Direct leverbaar",
    icon: (
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M3 7h11v9H3V7zm11 2h3l3 4v3h-6V9z" strokeLinejoin="round" />
        <circle cx="7" cy="18" r="1.5" /><circle cx="17" cy="18" r="1.5" />
      </svg>
    ),
    tone: "ink" as const,
  },
  {
    k: "6",
    v: "Dagen showroom open",
    note: "Bezoek op afspraak",
    icon: (
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" strokeLinecap="round" />
      </svg>
    ),
    tone: "ochre" as const,
  },
  {
    k: "100%",
    v: "Klanttevredenheid",
    note: "Bewezen service",
    icon: (
      <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
        <path d="M12 2l2.9 6.9L22 9.8l-5.2 4.5 1.6 6.9L12 17.8 5.6 21.2l1.6-6.9L2 9.8l7.1-.9L12 2z" />
      </svg>
    ),
    tone: "clay" as const,
  },
] as const;

function CollectieStatsRail() {
  const toneBg = {
    clay: "from-[var(--clay)]/12 to-transparent",
    ink: "from-[var(--ink)]/8 to-transparent",
    ochre: "from-[var(--ochre)]/14 to-transparent",
  } as const;

  const toneNum = {
    clay: "text-[var(--clay)]",
    ink: "text-[var(--ink)]",
    ochre: "text-[var(--ochre)]",
  } as const;

  return (
    <div className="mt-12 md:mt-16 relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[8%] top-1/2 hidden lg:block h-px bg-gradient-to-r from-transparent via-[var(--ochre)]/25 to-transparent"
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {COLLECTIE_STATS.map((s, i) => (
          <motion.div
            key={s.v}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: i * 0.08, ease }}
            className={`group/stat relative overflow-hidden rounded-2xl border border-[var(--ochre)]/20 bg-[var(--card)] p-5 md:p-6 transition-all duration-500 hover:border-[var(--ochre)]/45 hover:shadow-[0_20px_50px_-28px_rgba(240,160,96,0.28)] hover:-translate-y-1 ${i % 2 === 1 ? "lg:translate-y-3" : ""}`}
          >
            <div
              aria-hidden
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${toneBg[s.tone]} opacity-80 transition-opacity duration-500 group-hover/stat:opacity-100`}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-6 size-28 rounded-full bg-[var(--ochre)]/10 blur-2xl transition-all duration-700 group-hover/stat:bg-[var(--ochre)]/18 group-hover/stat:scale-125"
            />
            <div className="relative flex items-start justify-between gap-3">
              <span className="grid size-9 place-items-center rounded-xl border border-[var(--ochre)]/25 bg-[var(--sand)]/80 text-[var(--clay)] transition-colors duration-500 group-hover/stat:border-[var(--ochre)]/45 group-hover/stat:bg-[var(--bone)]">
                {s.icon}
              </span>
              <span className="num text-[10px] tracking-[0.22em] text-[var(--muted-foreground)]/70">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className={`relative mt-5 font-display text-3xl md:text-[2.35rem] leading-none tracking-tight num ${toneNum[s.tone]} transition-transform duration-500 group-hover/stat:scale-[1.03] origin-left`}>
              {s.k}
            </div>
            <div className="relative mt-2 text-[11px] md:text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink)] leading-snug">
              {s.v}
            </div>
            <div className="relative mt-1.5 text-[11px] text-[var(--muted-foreground)]">{s.note}</div>
            <div className="relative mt-4">
              <PremiumStatAccent hoverClassName="group-hover/stat:w-full" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProductCategoryCard({
  item,
  index,
}: {
  item: ProductCarouselItem;
  index: number;
}) {
  const n = (index % OI.productCarousel.length) + 1;

  return (
    <div className="group relative h-full shrink-0 w-[min(78vw,300px)] sm:w-[300px] md:w-[328px] lg:w-[352px] pb-7">
      <div className="relative flex h-full min-h-[420px] flex-col rounded-2xl border border-[var(--ochre)]/45 bg-[var(--ink)] ring-1 ring-[var(--ochre)]/20 shadow-none transition-all duration-500 group-hover:border-[var(--ochre)] group-hover:ring-[var(--ochre)]/45 group-hover:shadow-[0_18px_44px_-24px_rgba(240,160,96,0.35)] group-hover:-translate-y-1">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--ochre)]/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <a href={item.href} className="block relative aspect-[5/4] overflow-hidden rounded-t-2xl sm:aspect-[4/3]">
          <img
            src={item.img}
            alt={item.name}
            loading="lazy"
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--ink)]/28 via-transparent to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--ochre)]/75 via-[var(--clay)]/20 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />

          <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2">
            <span className="num glass-dark rounded-lg px-2.5 py-1 text-[10px] tracking-[0.2em] text-[var(--bone)]/80">
              {String(n).padStart(2, "0")}
            </span>
          </div>
          <div className="absolute top-3.5 right-3.5 z-10">
            <span className="glass-dark rounded-lg px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-[var(--ochre)]">
              {item.tag}
            </span>
          </div>

          <motion.div
            aria-hidden
            className="absolute inset-0 category-shine opacity-0 group-hover:opacity-100 pointer-events-none"
            initial={false}
            animate={{ x: ["-120%", "120%"] }}
            transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 2.5 }}
          />
        </a>

        <div className="relative flex flex-1 flex-col px-5 pt-5 pb-10 md:px-6 md:pt-6 md:pb-11 border-t border-[var(--ochre)]/15">
          <div className="min-w-0">
            <a href={item.href}>
              <h3 className="font-display text-lg md:text-xl leading-tight text-[var(--bone)] group-hover:text-[var(--ochre)] transition-colors duration-500">
                {item.name}
              </h3>
            </a>
            <p className="mt-2 text-[12px] md:text-[13px] leading-relaxed text-[var(--bone)]/55 line-clamp-2 group-hover:text-[var(--bone)]/75 transition-colors duration-500">
              {item.line}
            </p>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <PremiumStatAccent />
            <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--ochre)]/90 font-medium">
              {item.stat}
            </span>
          </div>
        </div>

        <div className="absolute left-1/2 bottom-0 z-30 flex -translate-x-1/2 translate-y-1/2 justify-center">
          <CategoryCollectieButton href={item.href} />
        </div>
      </div>
    </div>
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
    <PageSection id="categories" tone="sand" prevTone="sand" nextTone="sand" className="before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,color-mix(in_oklab,var(--bone)_55%,transparent),transparent_72%)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 section-grain-light opacity-[0.06]"
      />

      <div className="relative max-w-[1500px] mx-auto px-6 md:px-12">
        <Reveal>
          <Eyebrow dot={false}>
            <span className="text-[var(--clay)]">Collectie</span>
          </Eyebrow>
          <h2 className={`mt-4 ${sectionH2}`}>
            Kantoormeubelen die uw werkruimte{" "}
            <em className="italic text-[var(--clay)]">naar een hoger niveau</em> tillen.
          </h2>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href={SHOP_PATH}>
              <ArrowLink variant="clay">Bekijk alle categorieën</ArrowLink>
            </a>
            <a href="#showroom">
              <ArrowLink variant="ink">Plan showroombezoek</ArrowLink>
            </a>
          </div>
        </Reveal>

        <div className="mt-10 md:mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--ink)]/8 pt-6">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
            <span className="size-1.5 rounded-full bg-[var(--clay)] animate-pulse" />
            <span>Loopt automatisch, hover en sleep om te verschuiven</span>
          </div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted-foreground)] num">
            {String(items.length).padStart(2, "0")} categorieën
          </span>
        </div>

        <Reveal delay={0.15} className="mt-8 md:mt-10 relative">
          <div
            className="absolute -inset-x-4 top-8 bottom-8 rounded-3xl pointer-events-none opacity-60"
            style={{
              background: "linear-gradient(90deg, var(--sand) 0%, transparent 8%, transparent 92%, var(--sand) 100%)",
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
          <CollectieStatsRail />
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
      <article className="group relative flex h-full flex-col pb-5">
        <div className="relative flex h-full flex-col rounded-2xl border border-[var(--ink)]/8 bg-[var(--card)] shadow-[0_12px_40px_-24px_rgba(17,24,39,0.18)] transition-all duration-500 group-hover:border-[var(--clay)]/25 group-hover:shadow-[0_20px_50px_-20px_rgba(184,138,90,0.22)] group-hover:-translate-y-1">
          <div className="relative aspect-[5/4] overflow-hidden rounded-t-2xl bg-[var(--sand)] sm:aspect-square">
            <img
              src={b.img}
              alt={b.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.06]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--ink)]/30 via-[var(--ink)]/5 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--ochre)]/25 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            {b.was && (
              <div className="absolute top-4 left-4 rounded-lg bg-[var(--clay)] text-[var(--bone)] px-3 py-1 text-[10px] uppercase tracking-[0.18em] font-medium">
                Sale
              </div>
            )}
            <div className="absolute top-4 right-4 glass rounded-lg px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] num text-[var(--ink)]">
              Op voorraad
            </div>
          </div>
          <div className="relative flex flex-1 flex-col px-5 py-5 md:px-6 md:py-6 border-t border-[var(--ink)]/6">
            <h3 className="font-display text-lg md:text-xl leading-snug tracking-tight text-[var(--ink)] min-h-[3em]">
              {b.name}
            </h3>
            <div className="mt-3 flex items-baseline gap-2">
              {b.was && <span className="text-sm text-[var(--muted-foreground)] line-through num">{b.was}</span>}
              <span className="font-display text-2xl num text-[var(--ink)]">{b.price}</span>
            </div>
          </div>

          <CardOverlapButton
            product={product}
            variant="light"
            className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 z-30"
          >
            In winkelwagen
          </CardOverlapButton>
        </div>
      </article>
    </Reveal>
  );
}

function Bestsellers() {
  return (
    <PageSection id="bestsellers" tone="bone" prevTone="bone" nextTone="sand">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-[1fr_auto] gap-6 items-end">
          <Reveal>
            <Eyebrow>Bestsellers, tot 40% korting</Eyebrow>
            <h2 className={`mt-5 ${sectionH2} max-w-[14ch]`}>
              De best <span className="italic text-[var(--clay)]">verkochte producten.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <a href="/producten">
              <ArrowLink>Alle artikelen</ArrowLink>
            </a>
          </Reveal>
        </div>

        <div className="mt-14 md:mt-20 grid gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-4">
          {OI.bestsellers.map((b, i) => (
            <BestsellerCard key={b.id} b={b} i={i} />
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
      <div className="relative max-w-[1500px] mx-auto px-6 md:px-12 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
        <Reveal>
          <div className="relative rounded-2xl overflow-hidden border border-[var(--bone)]/12 group">
            <img
              src={OI.showroom.heroImg}
              alt="Office Image premium showroom Rotterdam"
              className="w-full aspect-[4/3] object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/75 via-[var(--ink)]/20 to-transparent" />
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

          <div className="mt-8 grid sm:grid-cols-2 gap-5 items-stretch">
            <ShowroomContactCard />
            <div className="rounded-2xl border border-[var(--bone)]/12 p-5 h-full flex flex-col">
              <SimpleOpeningHours variant="dark" className="flex-1" />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={OI.social.instagram} target="_blank" rel="noreferrer">
              <ArrowLink variant="bone">Volg op Instagram</ArrowLink>
            </a>
          </div>
        </Reveal>
      </div>
    </PageSection>
  );
}