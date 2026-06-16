import { motion } from "motion/react";
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

function gridCols(count: number) {
  if (count <= 4) return "grid-cols-2 sm:grid-cols-4";
  if (count <= 5) return "grid-cols-3 sm:grid-cols-5";
  if (count <= 6) return "grid-cols-3 sm:grid-cols-3 lg:grid-cols-6";
  return "grid-cols-3 sm:grid-cols-4 lg:grid-cols-4";
}

function MegaMenuCard({ item, index, href }: { item: MegaMenuSection["items"][number]; index: number; href: string }) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.28, delay: index * 0.025, ease }}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-xl border border-[var(--ink)]/[0.07] bg-[var(--card)] transition-all duration-500 group-hover:border-[var(--clay)]/40 group-hover:shadow-[0_12px_32px_-14px_rgba(184,138,90,0.35)] group-hover:-translate-y-0.5">
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 ring-1 ring-inset ring-[var(--ochre)]/25" />

        <div className="relative aspect-square overflow-hidden bg-[color-mix(in_oklab,var(--sand)_70%,var(--bone))]">
          <img
            src={item.img}
            alt={item.label}
            loading="lazy"
            className="h-full w-full object-contain p-2 transition-transform duration-[0.9s] ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {item.tag && (
            <span className="absolute top-1.5 left-1.5 z-10 rounded-md bg-[var(--ink)]/75 backdrop-blur-sm px-1.5 py-0.5 text-[8px] uppercase tracking-[0.16em] text-[var(--ochre)]">
              {item.tag}
            </span>
          )}
          <span className="absolute top-1.5 right-1.5 z-10 num text-[9px] tracking-widest text-[var(--ink)]/25 group-hover:text-[var(--clay)]/60 transition-colors">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="px-2 py-2 border-t border-[var(--ink)]/[0.05] bg-[var(--bone)]">
          <span className="block text-center text-[10px] sm:text-[11px] leading-snug font-medium tracking-tight text-[var(--ink)]/75 group-hover:text-[var(--clay)] transition-colors duration-300 line-clamp-2">
            {item.label}
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export function MegaMenuPanel({ menu }: { menu: MegaMenuSection }) {
  const gridCls = gridCols(menu.items.length);

  return (
    <motion.div
      key={menu.id}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.22, ease }}
      className="absolute left-0 right-0 top-full z-[60] pt-1.5"
    >
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <div className={`relative overflow-hidden ${btnR} border border-[var(--bone)]/15 bg-[var(--bone)]/98 backdrop-blur-2xl shadow-[0_24px_80px_-20px_rgba(0,0,0,0.55)]`}>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--ochre)]/60 to-transparent" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, var(--ink) 1px, transparent 0)",
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative grid lg:grid-cols-[200px_1fr] xl:grid-cols-[220px_1fr]">
            {/* Compact sidebar */}
            <div className="hidden lg:flex flex-col justify-between border-r border-[var(--ink)]/[0.06] bg-[color-mix(in_oklab,var(--sand)_40%,var(--bone))] p-4 xl:p-5">
              <div>
                <div className="text-[9px] uppercase tracking-[0.22em] text-[var(--muted-foreground)]">{menu.eyebrow}</div>
                <h3 className="mt-2 font-display text-lg xl:text-xl leading-[1.15] tracking-tight text-[var(--ink)]">
                  {menu.title}
                </h3>
                <p className="mt-2.5 text-[11px] leading-relaxed text-[var(--muted-foreground)] line-clamp-4">
                  {menu.description}
                </p>
              </div>

              <div className="mt-4 space-y-3">
                <div className="overflow-hidden rounded-lg border border-[var(--ink)]/[0.08] shadow-sm">
                  <img
                    src={menu.featuredImg}
                    alt=""
                    className="aspect-[16/9] w-full object-cover"
                  />
                </div>
                <a
                  href={menu.href}
                  className="group/link inline-flex items-center gap-1.5 text-[11px] font-semibold text-[var(--clay)] hover:text-[var(--ochre)] transition-colors"
                >
                  <span className="h-px w-4 bg-[var(--clay)] group-hover/link:w-6 group-hover/link:bg-[var(--ochre)] transition-all duration-400" />
                  Volledige collectie
                  <svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform group-hover/link:translate-x-0.5">
                    <path d="M1 7h12M8 2l5 5-5 5" strokeLinecap="round" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Card grid */}
            <div className="p-3.5 sm:p-4 xl:p-5">
              <div className="flex items-center justify-between gap-3 mb-3 lg:mb-3.5 lg:hidden">
                <div>
                  <div className="text-[9px] uppercase tracking-[0.2em] text-[var(--muted-foreground)]">{menu.eyebrow}</div>
                  <h3 className="mt-0.5 font-display text-base text-[var(--ink)]">{menu.title}</h3>
                </div>
                <a href={menu.href} className="text-[11px] font-semibold text-[var(--clay)] whitespace-nowrap">
                  Alles →
                </a>
              </div>

              <div className="hidden lg:flex items-center justify-between gap-3 mb-3.5 pb-3 border-b border-[var(--ink)]/[0.06]">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted-foreground)] num">
                  {String(menu.items.length).padStart(2, "0")} collecties
                </span>
                <a
                  href={menu.href}
                  className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[var(--clay)] hover:text-[var(--ochre)] transition-colors"
                >
                  Bekijk alles →
                </a>
              </div>

              <div className={`grid gap-2 sm:gap-2.5 ${gridCls}`}>
                {menu.items.map((item, i) => (
                  <MegaMenuCard key={item.label} item={item} index={i} href={menu.href} />
                ))}
              </div>

              {menu.extras && menu.extras.length > 0 && (
                <div className="mt-3 pt-3 border-t border-[var(--ink)]/[0.06]">
                  <div className="text-[9px] uppercase tracking-[0.2em] text-[var(--muted-foreground)] mb-2">Ook populair</div>
                  <div className="flex flex-wrap gap-1.5">
                    {menu.extras.map(extra => (
                      <a
                        key={extra.label}
                        href={menu.href}
                        className="inline-flex items-center gap-1 rounded-md border border-[var(--ink)]/[0.07] bg-[var(--card)] px-2 py-1 text-[10px] text-[var(--ink)]/70 hover:border-[var(--clay)]/30 hover:text-[var(--ink)] transition-colors"
                      >
                        <span className="size-1 rounded-full bg-[var(--ochre)]/70" />
                        {extra.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
