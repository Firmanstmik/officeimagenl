import { motion, AnimatePresence } from "motion/react";
import type { MegaMenuSection } from "@/lib/mega-menu-data";
import { btnR, ease } from "@/lib/site-tokens";

export function NavChevron({ open, className = "size-2.5" }: { open?: boolean; className?: string }) {
  return (
    <svg
      aria-hidden
      className={`${className} shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      viewBox="0 0 448 512"
      fill="currentColor"
    >
      <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
    </svg>
  );
}

function CategoryIcon({ id }: { id: string }) {
  const paths: Record<string, string> = {
    directie: "M4 18V6h6v12H4Zm10 0V4h6v14h-6Z",
    werkplekken: "M3 8h8v10H3V8Zm10 5h8v5h-8v-5Z",
    archiefkasten: "M5 4h14v16H5V4Zm2 3v10h10V7H7Z",
    ladenkasten: "M4 6h16v12H4V6Zm2 3v2h12V9H6Zm0 4v2h12v-2H6Z",
    tafels: "M3 10h18v2H3v-2Zm2 4h14v4H5v-4Z",
    meer: "M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z",
  };
  return (
    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d={paths[id] ?? paths.meer} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Unified mega menu card size — matches Tafels (4-col) layout for every category. */
const MEGA_CARD = {
  img: "aspect-[4/3] w-full min-h-[118px]",
  title: "text-[13px]",
  link: "text-[11px]",
  pad: "px-3.5 py-3.5",
  rounded: "rounded-2xl",
  tag: "top-3 left-3 text-[9px] px-2 py-1",
} as const;

const COLS_PER_ROW = 4;

function FeaturedCard({
  item,
  index,
  href,
}: {
  item: MegaMenuSection["items"][number];
  index: number;
  href: string;
}) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: index * 0.025, ease }}
      className="group block min-w-0"
    >
      <div
        className={`relative overflow-hidden ${MEGA_CARD.rounded} border border-[var(--ink)]/[0.06] bg-[var(--card)] shadow-[0_8px_28px_-16px_rgba(17,24,39,0.18)] transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_20px_48px_-18px_rgba(224,122,50,0.28)] group-hover:border-[var(--clay)]/30`}
      >
        <div className={`relative ${MEGA_CARD.img} overflow-hidden bg-[color-mix(in_oklab,var(--sand)_45%,var(--bone))]`}>
          <img
            src={item.img}
            alt={item.label}
            loading="lazy"
            className="block h-full w-full object-cover object-center transition-transform duration-[1.1s] ease-out group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/35 via-transparent to-transparent pointer-events-none" />
          {item.tag && (
            <span
              className={`absolute z-10 rounded-lg bg-[var(--ink)]/80 backdrop-blur-sm uppercase tracking-[0.14em] text-[var(--ochre)] ${MEGA_CARD.tag}`}
            >
              {item.tag}
            </span>
          )}
        </div>
        <div className={`${MEGA_CARD.pad} border-t border-[var(--ink)]/[0.05]`}>
          <span
            className={`block font-display ${MEGA_CARD.title} leading-snug tracking-tight text-[var(--ink)] group-hover:text-[var(--clay)] transition-colors line-clamp-2`}
          >
            {item.label}
          </span>
          <span className={`mt-1.5 block ${MEGA_CARD.link} text-[var(--clay)] font-medium`}>Bekijk collectie</span>
        </div>
      </div>
    </motion.a>
  );
}

function MegaMenuContent({ menu }: { menu: MegaMenuSection }) {
  const pillItems = menu.extras?.length
    ? [...menu.items.map(i => i.label), ...menu.extras.map(e => e.label)]
    : menu.items.map(i => i.label);
  const multiRow = menu.items.length > COLS_PER_ROW;
  const compact = menu.items.length > 5;

  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -6 }}
      transition={{ duration: 0.26, ease }}
      className="min-w-0"
    >
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted-foreground)]">{menu.eyebrow}</div>
          <h3 className="mt-1 font-display text-xl xl:text-2xl tracking-tight text-[var(--ink)] uppercase">
            {menu.title}
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <span className="text-[11px] text-[var(--muted-foreground)] num whitespace-nowrap">
            {menu.items.length} subcategorieën
          </span>
          <a
            href={menu.href}
            className={`inline-flex items-center gap-1.5 ${btnR} bg-[var(--clay)] text-[var(--bone)] px-4 py-2 text-[11px] font-semibold hover:bg-[var(--ochre)] hover:text-[var(--ink)] transition-colors`}
          >
            Bekijk alles
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 7h12M8 2l5 5-5 5" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </div>

      <div className={`flex flex-wrap gap-1.5 ${compact ? "mb-3.5" : "mb-5"}`}>
        {pillItems.map(label => (
          <a
            key={label}
            href={menu.href}
            className={`inline-flex items-center rounded-full border border-[var(--ink)]/[0.08] bg-[var(--card)] text-[var(--ink)]/70 hover:border-[var(--clay)]/35 hover:text-[var(--ink)] transition-colors ${
              compact ? "px-2.5 py-1 text-[10px]" : "px-3 py-1.5 text-[11px]"
            }`}
          >
            {label}
          </a>
        ))}
      </div>

      <div
        className={`relative ${multiRow ? "max-h-[min(520px,58vh)] overflow-y-auto overflow-x-hidden pr-1 -mr-1 mega-menu-scroll" : ""}`}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 xl:gap-4">
          {menu.items.map((item, i) => (
            <FeaturedCard key={item.label} item={item} index={i} href={menu.href} />
          ))}
        </div>
        {multiRow && (
          <p className="pointer-events-none sticky bottom-0 mt-2 pt-3 text-center text-[10px] uppercase tracking-[0.18em] text-[var(--muted-foreground)] bg-gradient-to-t from-[var(--bone)] via-[var(--bone)]/95 to-transparent">
            Scroll voor meer collecties
          </p>
        )}
      </div>

      <p
        className={`border-t border-[var(--ink)]/[0.06] text-[var(--muted-foreground)] max-w-2xl ${
          compact ? "mt-3.5 pt-3 text-[11px] leading-relaxed line-clamp-2" : "mt-5 pt-4 text-[12px] leading-relaxed"
        }`}
      >
        {menu.description}
      </p>
    </motion.div>
  );
}

export function MegaMenuPanel({
  menu,
  menus,
  onSelectMenu,
}: {
  menu: MegaMenuSection;
  menus: MegaMenuSection[];
  onSelectMenu: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.24, ease }}
      className="absolute left-0 right-0 top-full z-[60] pt-2"
    >
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-[var(--ink)]/[0.06] bg-[var(--bone)] shadow-[0_28px_90px_-24px_rgba(0,0,0,0.35)]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--clay)]/50 to-transparent" />

          <div className="relative grid lg:grid-cols-[248px_1fr]">
            <div className="hidden lg:flex flex-col border-r border-[var(--ink)]/[0.06] bg-[color-mix(in_oklab,var(--sand)_35%,var(--bone))] p-4 xl:p-5">
              <div className="text-[9px] uppercase tracking-[0.22em] text-[var(--muted-foreground)] mb-3">
                Hoofdcategorieën
              </div>
              <nav className="space-y-1">
                {menus.map(m => {
                  const active = m.id === menu.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onMouseEnter={() => onSelectMenu(m.id)}
                      className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-300 ${
                        active
                          ? "bg-[var(--ink)] text-[var(--bone)] shadow-[0_8px_24px_-12px_rgba(17,24,39,0.45)]"
                          : "text-[var(--ink)]/70 hover:bg-[var(--card)] hover:text-[var(--ink)]"
                      }`}
                    >
                      <span
                        className={`grid size-9 shrink-0 place-items-center rounded-lg border transition-colors ${
                          active
                            ? "border-[var(--clay)]/40 bg-[var(--clay)]/15 text-[var(--ochre)]"
                            : "border-[var(--ink)]/[0.08] bg-[var(--card)] text-[var(--ink)]/45 group-hover:border-[var(--clay)]/25 group-hover:text-[var(--clay)]"
                        }`}
                      >
                        <CategoryIcon id={m.id} />
                      </span>
                      <span className="flex-1 min-w-0 text-[12px] font-semibold leading-snug">{m.label}</span>
                      <NavChevron className={`size-2 -rotate-90 ${active ? "text-[var(--ochre)]" : "text-[var(--ink)]/25"}`} />
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-4 sm:p-5 xl:p-6">
              <AnimatePresence mode="wait">
                <MegaMenuContent key={menu.id} menu={menu} />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
