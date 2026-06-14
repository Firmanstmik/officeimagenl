import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";

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

/* ──────────────────────────── real OfficeImage assets (from officeimage.nl) ──────────────────────────── */
const OI = {
  logo: "https://officeimage.nl/wp-content/uploads/2024/10/logo-nieuw.png",
  hero: "https://officeimage.nl/wp-content/uploads/2025/03/Luxe-kantoorinrichting.jpg",
  categories: [
    { name: "Directie meubelen", img: "https://officeimage.nl/wp-content/uploads/2025/03/Luxe-kantoorinrichting.jpg", href: "https://officeimage.nl/product-categorie/directie-meubelen/" },
    { name: "Werkplekken",       img: "https://officeimage.nl/wp-content/uploads/2020/07/HR_ZF3ZHFlaag_ret-scaled.jpg",  href: "https://officeimage.nl/product-categorie/werkplekken-elektrisch/" },
    { name: "Tafels",            img: "https://officeimage.nl/wp-content/uploads/2025/03/HR_20230806_16-scaled.jpg",     href: "https://officeimage.nl/product-categorie/tafels/" },
    { name: "Bureaustoelen",     img: "https://officeimage.nl/wp-content/uploads/2024/12/fede7c3c-3427-4597-80b1-9a169a5fd6a4.jpg", href: "https://officeimage.nl/product-categorie/bureaustoelen-stoelen/" },
    { name: "Archiefkasten",     img: "https://officeimage.nl/wp-content/uploads/2024/10/roldeurkast-ch-1.jpg",          href: "https://officeimage.nl/product-categorie/archiefkasten/" },
    { name: "Ladenkasten",       img: "https://officeimage.nl/wp-content/uploads/2024/12/tekeningladekast-A3-8L-300x300-1.jpg", href: "https://officeimage.nl/product-categorie/ladenkasten-rolblokken/" },
    { name: "Lockers",           img: "https://officeimage.nl/wp-content/uploads/2025/01/wrc.2.perfo_.bl-min_1.jpg",     href: "https://officeimage.nl/product-categorie/lockers/" },
  ],
  bestsellers: [
    { name: "Bartafel Manage-it 220×80cm — Halifax",  price: "€529", was: null,    img: "https://officeimage.nl/wp-content/uploads/2026/04/HR_20161109_13_RobsonEiken-scaled.jpg", href: "https://officeimage.nl/product/bartafel-model-manage-it-220x80cm-halifax-kleur/" },
    { name: "Bartafel Manage-it 220×80cm",            price: "€429", was: null,    img: "https://officeimage.nl/wp-content/uploads/2026/04/HR_20161109_13_RobsonEiken-scaled.jpg", href: "https://officeimage.nl/product/bartafel-model-manage-it-220x80cm/" },
    { name: "Raptor 24uurs Bureaustoel — stof",       price: "€669", was: "€749",  img: "https://officeimage.nl/wp-content/uploads/2026/06/stoel_4A-scaled.jpg",                  href: "https://officeimage.nl/product/raptor-24uurs-bureaustoel-stof/" },
    { name: "Raptor 24uurs Bureaustoel — leder",      price: "€729", was: "€799",  img: "https://officeimage.nl/wp-content/uploads/2026/06/stoel_3A-scaled.jpg",                  href: "https://officeimage.nl/product/raptor-24uurs-bureaustoel-leder/" },
  ],
  showroom: {
    name: "Office Image Kantoormeubelen",
    address: "Industrieweg 167",
    zip: "3044 AS Rotterdam",
    tel: "010 230 99 44",
    telHref: "tel:0102309944",
    mobile: "+31 6 22778481",
    mobileHref: "tel:+31622778481",
    email: "info@officeimage.nl",
    kvk: "71542027",
  },
  social: {
    facebook: "https://www.facebook.com/officeimage.kantoormeubelen",
    instagram: "https://www.instagram.com/officeimage.kantoormeubelen/",
    linkedin: "https://www.linkedin.com/company/office-image-kantoormeubelen/",
  },
  hours: [
    ["Maandag", "09:00 – 17:30"],
    ["Dinsdag", "09:00 – 17:30"],
    ["Woensdag", "09:00 – 17:30"],
    ["Donderdag", "09:00 – 17:30"],
    ["Vrijdag", "09:00 – 17:30"],
    ["Zaterdag", "11:00 – 16:00"],
    ["Zondag", "Gesloten"],
  ] as const,
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Office Image — Premium Kantoormeubelen & Werkplekinrichting" },
      { name: "description", content: "Exclusieve directiemeubelen, werkplekken, bureaustoelen en archiefkasten. Snelle levering, grote voorraad, fysieke showroom in Rotterdam — 6 dagen per week open." },
      { property: "og:title", content: "Office Image — Premium Kantoormeubelen" },
      { property: "og:description", content: "Exclusieve kantoorinrichting voor ambitieuze bedrijven. Showroom Rotterdam, 6 dagen per week open." },
    ],
  }),
  component: Home,
});

/* ──────────────────────────── primitives ──────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

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

function ArrowLink({ children, variant = "ink" }: { children: React.ReactNode; variant?: "ink" | "bone" | "clay" }) {
  const color =
    variant === "bone"
      ? "text-[var(--bone)] border-[var(--bone)]/30 hover:bg-[var(--bone)] hover:text-[var(--ink)]"
      : variant === "clay"
      ? "text-[var(--bone)] bg-[var(--clay)] border-[var(--clay)] hover:bg-[var(--ink)] hover:border-[var(--ink)]"
      : "text-[var(--ink)] border-[var(--ink)]/20 hover:bg-[var(--ink)] hover:text-[var(--bone)]";
  return (
    <button
      type="button"
      className={`group inline-flex items-center gap-3 rounded-full border px-6 py-3.5 text-sm font-medium transition-all duration-500 ${color}`}
    >
      <span>{children}</span>
      <svg width="14" height="14" viewBox="0 0 14 14" className="transition-transform duration-500 group-hover:translate-x-1" fill="none">
        <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" />
      </svg>
    </button>
  );
}

/* ──────────────────────────── header ──────────────────────────── */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const nav = [
    { label: "Directiemeubelen", href: "#categories" },
    { label: "Werkplekken", href: "#concepts" },
    { label: "Bestsellers", href: "#bestsellers" },
    { label: "Showroom", href: "#showroom" },
    { label: "Proces", href: "#process" },
    { label: "Contact", href: "#contact" },
  ];
  const utility = [
    { i: "◇", t: "Snelle levering — grote voorraad" },
    { i: "✦", t: "Showroom Rotterdam · 6 dagen open" },
    { i: "◐", t: "Tot 40% korting op bestsellers" },
    { i: "→", t: `${OI.showroom.email} · ${OI.showroom.tel}` },
  ];
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease }}
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* utility bar — fades on scroll */}
      <motion.div
        animate={{ height: scrolled ? 0 : 38, opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.5, ease }}
        className="overflow-hidden"
      >
        <div className="border-b border-[var(--bone)]/12 backdrop-blur-md bg-[var(--ink)]/60">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10 h-[38px] flex items-center justify-between text-[11px] tracking-[0.18em] uppercase text-[var(--bone)]/70">
            <div className="flex items-center gap-7">
              {utility.slice(0, 3).map(u => (
                <span key={u.t} className="hidden md:flex items-center gap-2">
                  <span className="text-[var(--ochre)]">{u.i}</span>
                  <span>{u.t}</span>
                </span>
              ))}
            </div>
            <span className="num normal-case tracking-[0.12em]">{utility[3].t}</span>
          </div>
        </div>
      </motion.div>

      {/* main nav */}
      <div className={`transition-all duration-500 ${scrolled ? "py-3" : "py-4"}`}>
        <div className={`mx-3 md:mx-6 rounded-full transition-all duration-500 ${scrolled ? "glass shadow-[0_20px_60px_-30px_rgba(17,24,39,0.35)]" : "bg-transparent"}`}>
          <div className="px-5 md:px-7 py-3 flex items-center justify-between gap-6">
            <a href="https://officeimage.nl/" className="flex items-center gap-3 shrink-0">
              <span className={`rounded-lg px-3 py-1.5 transition-colors ${scrolled ? "bg-transparent" : "bg-[var(--bone)]/90"}`}>
                <img src={OI.logo} alt="Office Image" className="h-7 md:h-8 w-auto" />
              </span>
              <span className={`hidden sm:inline mt-1 text-[9px] tracking-[0.28em] uppercase ${scrolled ? "text-[var(--slate)]" : "text-[var(--bone)]/55"}`}>Kantoormeubelen · Rotterdam</span>
            </a>

            <nav className="hidden xl:flex items-center gap-1">
              {nav.map(n => (
                <a
                  key={n.label}
                  href={n.href}
                  className={`group relative px-3.5 py-2 text-[13px] font-medium tracking-tight transition-colors ${scrolled ? "text-[var(--ink)]/75 hover:text-[var(--ink)]" : "text-[var(--bone)]/75 hover:text-[var(--bone)]"}`}
                >
                  {n.label}
                  <span className="absolute left-3.5 right-3.5 -bottom-0.5 h-px scale-x-0 origin-left bg-[var(--clay)] transition-transform duration-500 group-hover:scale-x-100" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a href={OI.showroom.telHref} className={`hidden md:inline num text-[12px] tracking-tight ${scrolled ? "text-[var(--ink)]/70 hover:text-[var(--ink)]" : "text-[var(--bone)]/70 hover:text-[var(--bone)]"}`}>{OI.showroom.tel}</a>
              <a href="#showroom" className="group inline-flex items-center gap-2.5 rounded-full bg-[var(--ink)] text-[var(--bone)] pl-5 pr-2 py-2 text-[13px] font-medium hover:bg-[var(--clay)] transition-colors">
                <span>Bezoek showroom</span>
                <span className="grid size-7 place-items-center rounded-full bg-[var(--bone)]/12 group-hover:bg-[var(--bone)]/25 transition-colors">
                  <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.3" /></svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

/* ──────────────────────────── 1. hero ──────────────────────────── */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const txtY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-[var(--ink)]">
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
        <img src={OI.hero} alt="Luxe kantoorinrichting van Office Image" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--ink)]/40 via-[var(--ink)]/10 to-[var(--ink)]/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--ink)]/45 via-transparent to-transparent" />
      </motion.div>

      <motion.div style={{ y: txtY }} className="relative z-10 flex h-full flex-col">
        <div className="flex-1" />
        <div className="px-6 md:px-12 pb-14 md:pb-20">
          <div className="max-w-[1500px] mx-auto">
            <Reveal delay={0.2}>
              <div className="text-[var(--bone)]/70 eyebrow mb-6 flex items-center gap-3">
                <span className="inline-block size-1.5 rounded-full bg-[var(--ochre)]" />
                <span>Office Image · Kantoormeubelen · Rotterdam</span>
              </div>
            </Reveal>

            <h1 className="font-display text-[var(--bone)] leading-[0.92] tracking-[-0.03em] text-[14vw] md:text-[8.5vw] lg:text-[7.2vw] max-w-[15ch]">
              {"Exclusieve kantoorinrichting".split(" ").map((w, i) => (
                <motion.span
                  key={w + i}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.1, delay: 0.3 + i * 0.08, ease }}
                  className="inline-block overflow-hidden mr-[0.18em]"
                >
                  {w}
                </motion.span>
              ))}
              <br />
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.55, ease }}
                className="inline-block italic text-[var(--ochre)]"
              >
                voor moderne
              </motion.span>{" "}
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.65, ease }}
                className="inline-block text-[var(--bone)]/85"
              >
                bedrijven.
              </motion.span>
            </h1>

            <Reveal delay={0.95} y={16}>
              <div className="mt-10 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
                <p className="max-w-xl text-[var(--bone)]/75 text-base md:text-lg leading-relaxed">
                  Als jong en dynamisch bedrijf biedt Office Image u een unieke mogelijkheid snel en gemakkelijk te bestellen. Directiemeubelen, werkplekken, bureaustoelen en archiefkasten — uit voorraad leverbaar.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <ArrowLink variant="clay">Bekijk collecties</ArrowLink>
                  <ArrowLink variant="bone">Bezoek showroom</ArrowLink>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* floating glass card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease }}
          className="absolute right-6 md:right-12 top-28 md:top-32 hidden md:block"
        >
          <div className="glass-dark rounded-2xl p-5 w-[280px] text-[var(--bone)]">
            <div className="flex items-center justify-between text-[11px] tracking-[0.18em] uppercase text-[var(--bone)]/60">
              <span>Showroom · Open</span>
              <span className="num">NL · 3044</span>
            </div>
            <div className="mt-3 font-display text-2xl leading-tight">{OI.showroom.name}</div>
            <div className="mt-1 text-sm text-[var(--bone)]/70">{OI.showroom.address} · {OI.showroom.zip}</div>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              {[
                ["6", "dgn/week"],
                ["40%", "korting"],
                ["NL", "voorraad"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg bg-[var(--bone)]/8 py-2">
                  <div className="font-display text-lg num">{k}</div>
                  <div className="text-[10px] uppercase tracking-widest text-[var(--bone)]/55">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* bottom marquee/trust */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute inset-x-0 bottom-0 z-10 border-t border-[var(--bone)]/10"
      >
        <div className="px-6 md:px-12 py-4 flex items-center justify-between text-[var(--bone)]/55 text-[11px] tracking-[0.22em] uppercase">
          <span>Scroll om te ontdekken</span>
          <div className="hidden md:flex items-center gap-8">
            <span>Directie</span>
            <span>·</span>
            <span>Werkplekken</span>
            <span>·</span>
            <span>Tafels</span>
            <span>·</span>
            <span>Archief</span>
          </div>
          <span className="num">EST · MMXIX</span>
        </div>
      </motion.div>
    </section>
  );
}

/* ──────────────────────────── 2. trust ──────────────────────────── */

function Trust() {
  const stats = [
    { k: "30+", v: "Years of expertise", note: "Since 1994" },
    { k: "1,200", v: "Workspaces delivered", note: "EU-wide" },
    { k: "98%", v: "Client retention", note: "5-year average" },
    { k: "End-to-end", v: "Strategy → realization", note: "Single partner" },
  ];
  const logos = ["Adyen", "Booking", "Mollie", "Picnic", "Bunq", "Heineken", "Backbase", "WeTransfer"];
  return (
    <section className="bg-[var(--bone)] py-24 md:py-32">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-20 items-end">
          <Reveal>
            <Eyebrow>Trusted across Europe</Eyebrow>
            <h2 className="mt-5 font-display text-5xl md:text-6xl leading-[1.02]">
              Three decades of <span className="italic text-[var(--clay)]">quiet, considered</span> workspace craft.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-[var(--muted-foreground)] text-lg leading-relaxed max-w-xl">
              We partner with ambitious organisations to translate culture and strategy into space. From the first sketch to the last detail, one team carries the project — and the standard.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 hairline">
            {stats.map((s, i) => (
              <div
                key={s.v}
                className={`group p-7 md:p-9 transition-colors hover:bg-[var(--card)] ${i < 3 ? "md:border-r" : ""} ${i < 2 ? "border-r border-b md:border-b-0" : i === 2 ? "border-r md:border-r" : ""}`}
                style={{ borderColor: "color-mix(in oklab, var(--ink) 10%, transparent)" }}
              >
                <div className="font-display text-5xl md:text-6xl tracking-tight num text-[var(--ink)] group-hover:text-[var(--clay)] transition-colors">
                  {s.k}
                </div>
                <div className="mt-4 text-sm font-medium">{s.v}</div>
                <div className="mt-1 text-xs text-[var(--muted-foreground)] uppercase tracking-widest">{s.note}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-20 flex flex-wrap items-center gap-x-10 md:gap-x-14 gap-y-4 opacity-60">
            {logos.map(l => (
              <span key={l} className="font-display text-xl md:text-2xl text-[var(--graphite)] tracking-tight">{l}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ──────────────────────────── 3. configurator ──────────────────────────── */

const CONCEPTS = [
  {
    id: "executive",
    n: "01",
    name: "Executive",
    sub: "Leadership & private offices",
    img: cExec,
    mood: "Refined · Considered · Confidential",
    body: "Quiet authority for leadership teams. Bespoke desking, acoustic finesse and city views — a stage for decisive thinking.",
    metrics: [["18 m²", "avg footprint"], ["52 dB", "acoustic floor"], ["A+", "ergonomic class"]],
    benefits: ["Bespoke walnut desking", "Acoustic privacy", "Concierge lighting", "Premium textiles"],
  },
  {
    id: "collaborative",
    n: "02",
    name: "Collaborative",
    sub: "Open & team environments",
    img: cCollab,
    mood: "Open · Energetic · Connected",
    body: "Shared tables, layered acoustics and warm material palettes that turn meetings into momentum.",
    metrics: [["220+", "people / floor"], ["6:1", "shared:focus"], ["+34%", "team output"]],
    benefits: ["Modular team islands", "Felt acoustic zoning", "Tech-integrated tables", "Biophilic accents"],
  },
  {
    id: "hybrid",
    n: "03",
    name: "Hybrid",
    sub: "Flexible workplace",
    img: cHybrid,
    mood: "Adaptive · Welcoming · Resilient",
    body: "A workplace tuned for fluid attendance — bookable settings, lounge anchors and video-ready booths.",
    metrics: [["1:1.4", "desk ratio"], ["12", "settings/floor"], ["24/7", "bookable"]],
    benefits: ["Bookable settings", "Video booths", "Lounge anchors", "Smart desk allocation"],
  },
  {
    id: "focus",
    n: "04",
    name: "Focus",
    sub: "Deep work environments",
    img: cFocus,
    mood: "Calm · Intentional · Restorative",
    body: "Enclosed pods and library quiet zones for the work that asks for stillness.",
    metrics: [["48 dB", "sealed quiet"], ["2700 K", "warm task light"], ["100%", "ergonomic"]],
    benefits: ["Acoustic pods", "Library quiet zones", "Tunable task lighting", "Restorative palettes"],
  },
  {
    id: "creative",
    n: "05",
    name: "Creative",
    sub: "Studio & maker spaces",
    img: cCreative,
    mood: "Tactile · Curious · Generous",
    body: "Material walls, drafting surfaces and industrial luxury — built for the work of making.",
    metrics: [["6 m", "ceiling clear"], ["∞", "pinnable wall"], ["3", "material libraries"]],
    benefits: ["Material library walls", "Drafting surfaces", "Industrial lighting", "Maker storage"],
  },
];

function Configurator() {
  const [i, setI] = useState(0);
  const c = CONCEPTS[i];

  return (
    <section id="concepts" className="relative bg-[var(--ink)] text-[var(--bone)] py-24 md:py-36 overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-[1fr_auto] gap-10 items-end">
          <Reveal>
            <Eyebrow>The workspace experience</Eyebrow>
            <h2 className="mt-5 font-display text-5xl md:text-7xl leading-[0.98] text-[var(--bone)] max-w-[16ch]">
              Five environments. <span className="italic text-[var(--ochre)]">One studio.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-[var(--bone)]/65 max-w-md text-base leading-relaxed">
              Explore the spatial concepts at the heart of every OfficeImage transformation. Switch between modes to feel the shift.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 md:mt-20 grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-10">
          {/* canvas */}
          <div className="relative aspect-[16/10] md:aspect-[16/9] rounded-2xl overflow-hidden border border-[var(--bone)]/12 bg-[var(--graphite)]">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={c.id}
                src={c.img}
                alt={`${c.name} workspace concept`}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 1.1, ease }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/85 via-[var(--ink)]/10 to-transparent pointer-events-none" />

            {/* overlay info */}
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-9 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.6, ease }}
                >
                  <div className="eyebrow text-[var(--bone)]/65">Concept {c.n} · {c.mood}</div>
                  <div className="mt-2 font-display text-4xl md:text-6xl tracking-tight">{c.name}</div>
                  <div className="mt-1 text-[var(--bone)]/70 text-sm">{c.sub}</div>
                </motion.div>
              </AnimatePresence>

              <div className="glass-dark rounded-xl p-4 md:p-5 grid grid-cols-3 gap-4 min-w-[280px]">
                {c.metrics.map(([k, v]) => (
                  <div key={v}>
                    <div className="font-display text-xl md:text-2xl num">{k}</div>
                    <div className="text-[10px] uppercase tracking-widest text-[var(--bone)]/55">{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* concept index badge */}
            <div className="absolute left-6 top-6 glass-dark rounded-full px-4 py-1.5 text-[11px] tracking-[0.22em] uppercase">
              {String(i + 1).padStart(2, "0")} / {String(CONCEPTS.length).padStart(2, "0")}
            </div>
          </div>

          {/* selector + body */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-[var(--bone)]/12 p-2">
              {CONCEPTS.map((cc, idx) => {
                const active = idx === i;
                return (
                  <button
                    key={cc.id}
                    onClick={() => setI(idx)}
                    className={`w-full text-left rounded-xl px-4 py-3.5 flex items-center gap-4 transition-all duration-500 ${active ? "bg-[var(--bone)] text-[var(--ink)]" : "hover:bg-[var(--bone)]/5 text-[var(--bone)]"}`}
                  >
                    <span className={`num text-xs ${active ? "text-[var(--clay)]" : "text-[var(--bone)]/45"}`}>{cc.n}</span>
                    <span className="font-display text-xl md:text-2xl leading-none flex-1">{cc.name}</span>
                    <motion.span
                      animate={{ x: active ? 0 : -6, opacity: active ? 1 : 0 }}
                      transition={{ duration: 0.4, ease }}
                      className="text-xs"
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
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.55, ease }}
                className="rounded-2xl border border-[var(--bone)]/12 p-6"
              >
                <p className="text-[var(--bone)]/80 text-[15px] leading-relaxed">{c.body}</p>
                <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[13px] text-[var(--bone)]/70">
                  {c.benefits.map(b => (
                    <div key={b} className="flex items-center gap-2.5">
                      <span className="size-1 rounded-full bg-[var(--ochre)]" />
                      {b}
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── 4. process storytelling ──────────────────────────── */

const STEPS = [
  { n: "01", t: "Empty Space", d: "We begin with what is — and what could be." },
  { n: "02", t: "Strategic Planning", d: "Workplace strategy aligned to culture, growth and ways of working." },
  { n: "03", t: "3D Visualization", d: "Photoreal renderings make the future office tangible before a brick moves." },
  { n: "04", t: "Furniture Selection", d: "Curated specifications from Europe's finest workplace manufacturers." },
  { n: "05", t: "Installation", d: "Choreographed delivery with minimal disruption to your operations." },
  { n: "06", t: "Premium Workspace", d: "Handover of an environment where people genuinely want to be." },
];

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], ["8%", "-58%"]);

  return (
    <section id="process" ref={ref} className="bg-[var(--bone)] py-24 md:py-36 overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-[1fr_1fr] gap-12 items-end">
          <Reveal>
            <Eyebrow>The transformation</Eyebrow>
            <h2 className="mt-5 font-display text-5xl md:text-7xl leading-[0.98] max-w-[14ch]">
              From empty shell to <span className="italic text-[var(--clay)]">living workplace.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-[var(--muted-foreground)] text-lg max-w-xl leading-relaxed">
              We don't sell furniture. We deliver a process — measured, transparent, and built around the way your organisation actually works.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-20 md:mt-28">
        <motion.div style={{ x }} className="flex gap-6 md:gap-8 will-change-transform pl-6 md:pl-12">
          {STEPS.map((s, idx) => (
            <div
              key={s.n}
              className="shrink-0 w-[78vw] sm:w-[56vw] md:w-[440px] lg:w-[480px] rounded-2xl overflow-hidden border border-[var(--ink)]/8 bg-[var(--card)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={idx === 0 ? empty : idx === 1 ? viz : idx === 2 ? viz : idx === 3 ? cCollab : idx === 4 ? cHybrid : hero}
                  alt={s.t}
                  className="h-full w-full object-cover transition-transform duration-[1.4s] hover:scale-105"
                  style={{ filter: idx === 0 ? "grayscale(0.6) contrast(0.95)" : undefined }}
                />
                <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-[11px] tracking-[0.22em] uppercase num">
                  Stage {s.n}
                </div>
              </div>
              <div className="p-6 md:p-8">
                <div className="font-display text-3xl md:text-4xl tracking-tight">{s.t}</div>
                <p className="mt-3 text-[var(--muted-foreground)] text-sm md:text-base leading-relaxed">{s.d}</p>
                <div className="mt-6 h-px bg-[var(--ink)]/10" />
                <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-widest text-[var(--muted-foreground)]">
                  <span>Week {idx * 2 + 1}–{idx * 2 + 3}</span>
                  <span className="num">{String(idx + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────── 5. 3D visualization ──────────────────────────── */

function Visualization() {
  const tabs = ["Floor plan", "Concept", "Render", "Realized"];
  const [t, setT] = useState(2);
  return (
    <section id="visualization" className="bg-[var(--sand)] py-24 md:py-36">
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
                    OI · Studio Viewport
                  </div>
                  <div className="ml-auto text-[11px] num text-[var(--muted-foreground)]">v2.4</div>
                </div>
                <img src={viz} alt="3D workspace visualization" className="w-full aspect-[4/3] object-cover" />
                <div className="absolute bottom-4 left-4 right-4 glass rounded-xl p-3 flex items-center gap-2 flex-wrap">
                  {tabs.map((tt, idx) => (
                    <button
                      key={tt}
                      onClick={() => setT(idx)}
                      className={`px-3.5 py-1.5 rounded-full text-xs transition-all ${t === idx ? "bg-[var(--ink)] text-[var(--bone)]" : "text-[var(--ink)]/70 hover:text-[var(--ink)]"}`}
                    >
                      {tt}
                    </button>
                  ))}
                  <span className="ml-auto text-[11px] uppercase tracking-widest text-[var(--muted-foreground)] num">2,400 m² · 6 floors</span>
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
                <div className="eyebrow">Material set</div>
                <div className="mt-3 flex gap-2">
                  {["#3b2a20", "#c7956b", "#e8dfd1", "#5a6b54"].map(c => (
                    <div key={c} className="size-9 rounded-full border border-[var(--ink)]/10" style={{ background: c }} />
                  ))}
                </div>
                <div className="mt-3 text-xs text-[var(--muted-foreground)]">Walnut · Travertine · Bouclé · Moss felt</div>
              </motion.div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <Eyebrow>3D Visualization studio</Eyebrow>
            <h2 className="mt-5 font-display text-5xl md:text-6xl leading-[1] max-w-[12ch]">
              Plan with <span className="italic text-[var(--clay)]">confidence</span> before execution begins.
            </h2>
            <p className="mt-7 text-[var(--muted-foreground)] text-lg leading-relaxed max-w-lg">
              Our in-house visualization studio renders every concept in photoreal detail — from floor plans and material samples to the final installed result. You sign off on the experience, not a spreadsheet.
            </p>
            <ul className="mt-8 space-y-4 text-[15px]">
              {[
                ["Floor plans", "Programming, circulation and acoustic zoning resolved on paper first."],
                ["3D walkthroughs", "Step inside the future office in browser-based, real-time models."],
                ["Material libraries", "Touch the textiles, woods and finishes before they are specified."],
                ["Live revisions", "Every iteration mirrored across stakeholders in 48 hours."],
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
            <div className="mt-10"><ArrowLink>Tour the studio</ArrowLink></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── 6. services ──────────────────────────── */

const SERVICES = [
  { n: "01", t: "Workspace Strategy", d: "Diagnostics, programming and a roadmap that ties space to business outcomes.", img: cCollab },
  { n: "02", t: "Interior Design & Planning", d: "Spatial concepts, material direction and architectural detailing.", img: cExec },
  { n: "03", t: "Ergonomic Consulting", d: "Health-led specifications across desks, seating, light and acoustics.", img: cFocus },
  { n: "04", t: "Project Realization", d: "Turn-key procurement, install and handover — under one accountable team.", img: cHybrid },
  { n: "05", t: "Workspace Optimization", d: "Post-occupancy tuning informed by data and lived experience.", img: cCreative },
];

function Services() {
  return (
    <section id="services" className="bg-[var(--bone)] py-24 md:py-36">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-[1fr_1fr] gap-10 items-end">
          <Reveal>
            <Eyebrow>What we do</Eyebrow>
            <h2 className="mt-5 font-display text-5xl md:text-7xl leading-[0.98] max-w-[12ch]">
              Outcomes, not <span className="italic text-[var(--clay)]">catalogues.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-[var(--muted-foreground)] text-lg max-w-xl leading-relaxed">
              Five disciplines, one continuous service. Engage us at any stage — or for the entire arc, from first conversation to five-year tune-up.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 md:mt-20 grid gap-5 md:gap-6 md:grid-cols-12">
          {SERVICES.map((s, i) => {
            const span =
              i === 0 ? "md:col-span-7" :
              i === 1 ? "md:col-span-5" :
              i === 2 ? "md:col-span-4" :
              i === 3 ? "md:col-span-4" :
                        "md:col-span-4";
            return (
              <Reveal key={s.n} delay={i * 0.05} className={span}>
                <a className="group block relative rounded-2xl overflow-hidden bg-[var(--card)] border border-[var(--ink)]/8 h-full">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={s.img}
                      alt={s.t}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/55 to-transparent" />
                    <div className="absolute top-5 left-5 text-[var(--bone)] num text-xs tracking-[0.22em]">{s.n}</div>
                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                      <div className="font-display text-3xl md:text-4xl text-[var(--bone)] leading-tight">{s.t}</div>
                      <span className="text-[var(--bone)] opacity-0 group-hover:opacity-100 translate-x-[-6px] group-hover:translate-x-0 transition-all duration-500 text-2xl">→</span>
                    </div>
                  </div>
                  <div className="p-6 md:p-7">
                    <p className="text-[var(--muted-foreground)] text-[15px] leading-relaxed">{s.d}</p>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── 7. featured projects ──────────────────────────── */

const PROJECTS = [
  { img: p1, t: "Northwind Capital", type: "Headquarters", scope: "12,500 m² · 6 floors", city: "Amsterdam", year: "2025" },
  { img: p2, t: "Vermeer & Partners", type: "Law firm", scope: "3,200 m² · 1 floor", city: "Rotterdam", year: "2024" },
  { img: p3, t: "Studio Atelier", type: "Creative agency", scope: "1,800 m² · loft", city: "Utrecht", year: "2024" },
];

function Projects() {
  return (
    <section id="projects" className="bg-[var(--bone)] py-24 md:py-36">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-[1fr_auto] gap-6 items-end">
          <Reveal>
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="mt-5 font-display text-5xl md:text-7xl leading-[0.98] max-w-[14ch]">
              Workspaces, <span className="italic text-[var(--clay)]">recently realized.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <ArrowLink>All projects</ArrowLink>
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
                      <span>·</span>
                      <span className="num">{p.year}</span>
                    </div>
                    <div className="mt-2 font-display text-3xl md:text-4xl leading-tight">{p.t}</div>
                    <div
                      className="mt-3 overflow-hidden text-[var(--bone)]/80 text-sm max-h-0 group-hover:max-h-32 transition-all duration-700 ease-out"
                    >
                      <p>{p.scope} — a full transformation programme delivered with the client's leadership team and OI's in-house realization studio.</p>
                      <div className="mt-3 inline-flex items-center gap-2 text-[var(--ochre)] text-xs uppercase tracking-widest">
                        Explore project →
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
    </section>
  );
}

/* ──────────────────────────── 8. CTA + footer ──────────────────────────── */

function CTA() {
  return (
    <section id="contact" className="relative bg-[var(--ink)] text-[var(--bone)] overflow-hidden">
      <div className="absolute inset-0">
        <img src={ctaImg} alt="" className="h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--ink)] via-[var(--ink)]/70 to-[var(--ink)]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-transparent to-[var(--ink)]/40" />
      </div>

      <div className="relative max-w-[1500px] mx-auto px-6 md:px-12 py-28 md:py-44">
        <Reveal>
          <Eyebrow>Begin a conversation</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-[var(--bone)] leading-[0.95] tracking-tight text-[12vw] md:text-[7.5vw] max-w-[14ch]">
            Let's create a workplace that <span className="italic text-[var(--ochre)]">inspires performance.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 grid md:grid-cols-[1fr_auto] gap-10 items-end">
            <p className="max-w-xl text-[var(--bone)]/70 text-lg leading-relaxed">
              Partner with OfficeImage to transform your office into an environment that enhances wellbeing, productivity and long-term success.
            </p>
            <div className="flex flex-wrap gap-3">
              <ArrowLink variant="clay">Schedule a consultation</ArrowLink>
              <ArrowLink variant="bone">Download capability deck</ArrowLink>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-20 pt-10 border-t border-[var(--bone)]/15 grid md:grid-cols-4 gap-8 text-sm text-[var(--bone)]/65">
            {[
              ["Studio", "Keizersgracht 213\n1016 DX Amsterdam"],
              ["Consult", "studio@officeimage.nl\n+31 (0)20 470 0000"],
              ["Hours", "Mon — Fri · 09:00 – 18:00\nWeekend by appointment"],
              ["Visit", "By scheduled appointment\nonly — material library on site"],
            ].map(([h, b]) => (
              <div key={h}>
                <div className="eyebrow text-[var(--bone)]/55 mb-3">{h}</div>
                <div className="whitespace-pre-line text-[var(--bone)]/85">{b}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-[var(--bone)]/55 border-t border-[var(--bone)]/10">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12 py-8 flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.22em]">
        <div className="flex items-center gap-2.5">
          <span className="grid size-6 place-items-center rounded bg-[var(--bone)] text-[var(--ink)] font-display text-sm leading-none">O</span>
          <span className="font-display text-base normal-case tracking-tight text-[var(--bone)]">OfficeImage</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-[var(--bone)]">Imprint</a>
          <a href="#" className="hover:text-[var(--bone)]">Privacy</a>
          <a href="#" className="hover:text-[var(--bone)]">LinkedIn</a>
          <a href="#" className="hover:text-[var(--bone)]">Instagram</a>
        </div>
        <div className="num">© 1994 — 2026 · Amsterdam</div>
      </div>
    </footer>
  );
}

/* ──────────────────────────── page ──────────────────────────── */

function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <Hero />
      <Trust />
      <Configurator />
      <Process />
      <Visualization />
      <Services />
      <Projects />
      <Testimonials />
      <CTA />
      <Footer />
      <FloatingCTA />
    </main>
  );
}

/* ──────────────────────────── testimonials ──────────────────────────── */

const TESTIMONIALS = [
  {
    type: "Headquarters · 12,500 m²",
    quote:
      "OfficeImage translated our culture into space with extraordinary precision. The new headquarters has measurably changed how our teams collaborate.",
    name: "Mariska de Vries",
    role: "Chief People Officer",
    company: "Northwind Capital",
    metric: "+38% in-office attendance",
  },
  {
    type: "Law firm · 3,200 m²",
    quote:
      "From the first strategy workshop to handover, one team, one standard. The level of finish is on par with the best in Europe.",
    name: "Pieter Vermeer",
    role: "Managing Partner",
    company: "Vermeer & Partners",
    metric: "98 NPS at handover",
  },
  {
    type: "Creative agency · 1,800 m²",
    quote:
      "Architectural thinking applied to a working office. The studio feels considered in every corner — staff retention has visibly improved.",
    name: "Lars Bakker",
    role: "Founder",
    company: "Studio Atelier",
    metric: "−22% attrition YoY",
  },
];

function Testimonials() {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];
  return (
    <section id="about" className="bg-[var(--sand)] py-24 md:py-36">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-[1fr_1fr] gap-12 items-end">
          <Reveal>
            <Eyebrow>Voices from the workplace</Eyebrow>
            <h2 className="mt-5 font-display text-5xl md:text-7xl leading-[0.98] max-w-[14ch]">
              Trusted by leaders who <em>measure the difference</em>.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-[var(--muted-foreground)] text-lg max-w-xl leading-relaxed">
              Every transformation is benchmarked against the outcomes our clients set at the start — attendance, retention, sentiment and net promoter score after handover.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 md:mt-20 grid lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-8">
          {/* primary testimonial card */}
          <div className="relative rounded-2xl bg-[var(--ink)] text-[var(--bone)] p-8 md:p-12 overflow-hidden">
            <div className="absolute -top-10 -right-10 size-72 rounded-full bg-[var(--clay)]/12 blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between text-[11px] tracking-[0.22em] uppercase text-[var(--bone)]/55">
                <span>Client testimonial · {String(i + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}</span>
                <span>{t.type}</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6, ease }}
                >
                  <p className="mt-8 font-display text-3xl md:text-4xl leading-[1.15] tracking-tight">
                    <span className="text-[var(--ochre)] font-display">“</span>
                    {t.quote}
                    <span className="text-[var(--ochre)] font-display">”</span>
                  </p>

                  <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
                    <div>
                      <div className="font-display text-xl">{t.name}</div>
                      <div className="mt-1 text-sm text-[var(--bone)]/65">{t.role} · {t.company}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-3xl text-[var(--ochre)] num tracking-tight">{t.metric.split(" ")[0]}</div>
                      <div className="text-[11px] uppercase tracking-widest text-[var(--bone)]/55 mt-1">
                        {t.metric.split(" ").slice(1).join(" ")}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 pt-6 border-t border-[var(--bone)]/12 flex items-center gap-3">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setI(idx)}
                    className={`h-1 rounded-full transition-all duration-500 ${idx === i ? "bg-[var(--ochre)] w-10" : "bg-[var(--bone)]/20 w-6 hover:bg-[var(--bone)]/40"}`}
                    aria-label={`Show testimonial ${idx + 1}`}
                  />
                ))}
                <div className="ml-auto flex gap-2">
                  <button
                    onClick={() => setI((i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                    className="grid size-9 place-items-center rounded-full border border-[var(--bone)]/15 hover:bg-[var(--bone)]/10 transition"
                  >
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M13 7H1M6 2L1 7l5 5" stroke="currentColor" strokeWidth="1.3" /></svg>
                  </button>
                  <button
                    onClick={() => setI((i + 1) % TESTIMONIALS.length)}
                    className="grid size-9 place-items-center rounded-full border border-[var(--bone)]/15 hover:bg-[var(--bone)]/10 transition"
                  >
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.3" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* credibility metrics stack */}
          <div className="grid grid-cols-2 gap-5">
            {[
              { k: "4.96", v: "Average client rating", sub: "Last 24 months" },
              { k: "98", v: "Net Promoter Score", sub: "At handover" },
              { k: "100%", v: "On-time delivery", sub: "2023 — 2026" },
              { k: "5 yr", v: "Avg. client retention", sub: "Across EU portfolio" },
            ].map(s => (
              <Reveal key={s.v} className="rounded-2xl border border-[var(--ink)]/10 bg-[var(--bone)] p-6 md:p-7">
                <div className="font-display text-5xl text-[var(--ink)] num tracking-tight">{s.k}</div>
                <div className="mt-3 text-sm font-medium">{s.v}</div>
                <div className="mt-1 text-[11px] uppercase tracking-widest text-[var(--muted-foreground)]">{s.sub}</div>
              </Reveal>
            ))}
            <div className="col-span-2 rounded-2xl border border-[var(--ink)]/10 bg-[var(--bone)] p-6 md:p-7 flex items-center justify-between gap-4">
              <div>
                <div className="eyebrow">Recognised by</div>
                <div className="mt-3 flex flex-wrap items-baseline gap-x-6 gap-y-2 font-display text-lg text-[var(--graphite)]">
                  <span>Frame Awards</span>
                  <span className="text-[var(--slate)]/40">·</span>
                  <span>Dezeen</span>
                  <span className="text-[var(--slate)]/40">·</span>
                  <span>Wallpaper*</span>
                  <span className="text-[var(--slate)]/40">·</span>
                  <span>FX Design</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── floating CTA ──────────────────────────── */

function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(true);
  useEffect(() => {
    const on = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.6, ease }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 hidden md:block"
        >
          <div className="glass-dark rounded-full pl-2 pr-2 py-2 flex items-center gap-1.5 shadow-[0_30px_80px_-30px_rgba(17,24,39,0.55)]">
            <motion.div
              initial={false}
              animate={{ width: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
              transition={{ duration: 0.5, ease }}
              className="overflow-hidden flex items-center gap-1.5"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 rounded-full bg-[var(--clay)] text-[var(--bone)] pl-4 pr-2 py-2 text-[12.5px] font-medium tracking-tight hover:bg-[var(--ochre)] hover:text-[var(--ink)] transition-colors"
              >
                <span className="size-1.5 rounded-full bg-[var(--bone)] animate-pulse" />
                Book Consultation
                <span className="grid size-6 place-items-center rounded-full bg-[var(--bone)]/15">
                  <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" /></svg>
                </span>
              </a>
              <a
                href="#concepts"
                className="hidden lg:inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12.5px] font-medium text-[var(--bone)]/85 hover:text-[var(--bone)] hover:bg-[var(--bone)]/10 transition-colors whitespace-nowrap"
              >
                Request Workspace Analysis
              </a>
              <a
                href="tel:+31204700000"
                className="hidden lg:inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12.5px] font-medium text-[var(--bone)]/85 hover:text-[var(--bone)] hover:bg-[var(--bone)]/10 transition-colors whitespace-nowrap"
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 1.5h2l1.2 3-1.5 1a8 8 0 0 0 3.8 3.8l1-1.5 3 1.2v2A1.5 1.5 0 0 1 11 12.5C5.5 12.5 1.5 8.5 1.5 3A1.5 1.5 0 0 1 3 1.5Z" stroke="currentColor" strokeWidth="1.2" /></svg>
                Contact Expert
              </a>
            </motion.div>
            <button
              onClick={() => setExpanded(e => !e)}
              className="grid size-9 place-items-center rounded-full text-[var(--bone)]/80 hover:text-[var(--bone)] hover:bg-[var(--bone)]/10 transition-colors"
              aria-label={expanded ? "Collapse" : "Expand"}
            >
              <motion.svg
                animate={{ rotate: expanded ? 0 : 180 }}
                transition={{ duration: 0.4, ease }}
                width="12" height="12" viewBox="0 0 14 14" fill="none"
              >
                <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </motion.svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
