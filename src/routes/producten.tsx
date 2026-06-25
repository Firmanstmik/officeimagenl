import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { OI } from "@/lib/oi-data";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ProductCard } from "@/components/product/ProductCard";
import { useCart } from "@/lib/cart";
import { btnR, ease, sectionH2 } from "@/lib/site-tokens";
import { createPageHead } from "@/lib/site-seo";

export const Route = createFileRoute("/producten")({
  head: () =>
    createPageHead({
      title: "Producten | Office Image hoogwaardige kantoormeubelen",
      description:
        "Ontdek bestsellers, directiemeubelen, werkplekken en bureaustoelen. Hoogwaardige kantoorinrichting uit eigen voorraad met snelle levering.",
      path: "/producten",
    }),
  component: ProductenPage,
});

const FILTERS = ["Alles", "Bestsellers", "Stoelen", "Tafels"] as const;
type Filter = (typeof FILTERS)[number];

function ProductenPage() {
  const [filter, setFilter] = useState<Filter>("Alles");
  const [hoveredCat, setHoveredCat] = useState<number | null>(null);
  const { setOpen, totalCount } = useCart();

  const products = useMemo(() => {
    if (filter === "Bestsellers" || filter === "Alles") return OI.bestsellers;
    if (filter === "Stoelen") return OI.bestsellers.filter(p => p.name.toLowerCase().includes("stoel") || p.name.toLowerCase().includes("bureaustoel"));
    if (filter === "Tafels") return OI.bestsellers.filter(p => p.name.toLowerCase().includes("tafel") || p.name.toLowerCase().includes("bar"));
    return OI.bestsellers;
  }, [filter]);

  return (
    <main className="min-h-screen bg-[var(--bone)] text-[var(--foreground)]">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--ink)]/6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(212,165,116,0.18),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_10%_100%,rgba(17,24,39,0.06),transparent)]" />
        <div className="relative max-w-[1500px] mx-auto px-3.5 md:px-12 pt-10 md:pt-20 pb-10 md:pb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
            <div className="eyebrow inline-flex items-center gap-2.5 text-[var(--muted-foreground)]">
              <span className="inline-block size-1.5 rounded-full bg-[var(--clay)]" />
              Hoogwaardige catalogus
            </div>
            <h1 className={`mt-4 md:mt-5 ${sectionH2} max-w-[16ch]`}>
              Ontdek meubelen die uw <span className="italic text-[var(--clay)]">werkplek verheffen.</span>
            </h1>
            <p className="mt-4 md:mt-6 max-w-xl text-[13px] md:text-lg text-[var(--muted-foreground)] leading-relaxed">
              Bestsellers uit eigen voorraad, direct leverbaar. Filter op categorie, voeg toe aan uw winkelwagen en rond af in een naadloos afrekenproces.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {totalCount > 0 && (
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className={`inline-flex items-center gap-2 ${btnR} bg-[var(--clay)] text-[var(--bone)] px-5 py-3 text-sm font-medium hover:bg-[var(--ochre)] hover:text-[var(--ink)] transition-colors`}
                >
                  Winkelwagen ({totalCount})
                </button>
              )}
              <Link
                to="/afrekenen"
                className={`inline-flex items-center gap-2 ${btnR} border border-[var(--ink)]/12 px-5 py-3 text-sm font-medium text-[var(--ink)] hover:bg-[var(--sand)] transition-colors`}
              >
                Naar afrekenen
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories strip */}
      <section className="bg-[var(--ink)] text-[var(--bone)] py-10 md:py-14 overflow-hidden">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between gap-6 mb-8">
            <div>
              <div className="eyebrow text-[var(--bone)]/55">Categorieën</div>
              <h2 className="mt-2 font-display text-2xl md:text-3xl tracking-tight">Verken het assortiment</h2>
            </div>
            <span className="hidden md:block text-[11px] uppercase tracking-[0.2em] text-[var(--bone)]/40">8 productlijnen</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {OI.productCarousel.map((cat, i) => (
              <motion.div
                key={cat.name}
                onMouseEnter={() => setHoveredCat(i)}
                onMouseLeave={() => setHoveredCat(null)}
                className="group relative rounded-xl overflow-hidden border border-[var(--bone)]/10 aspect-[4/3] cursor-default"
              >
                <img src={cat.img} alt={cat.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--ochre)]">{cat.tag}</div>
                  <div className="mt-1 font-display text-base md:text-lg leading-tight">{cat.name}</div>
                </div>
                <AnimatePresence>
                  {hoveredCat === i && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center bg-[var(--ink)]/55 backdrop-blur-[2px] p-4"
                    >
                      <p className="text-center text-[12px] text-[var(--bone)]/85 leading-relaxed">{cat.line}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="eyebrow text-[var(--muted-foreground)]">Beschikbare artikelen</div>
              <h2 className="mt-3 font-display text-3xl md:text-4xl tracking-tight text-[var(--ink)]">
                {filter === "Alles" ? "Alle uitgelichte producten" : filter}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map(f => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`${btnR} px-4 py-2 text-[12px] font-medium transition-all duration-300 ${
                    filter === f
                      ? "bg-[var(--ink)] text-[var(--bone)] shadow-[0_8px_24px_-8px_rgba(17,24,39,0.35)]"
                      : "bg-[var(--sand)] text-[var(--ink)]/70 hover:text-[var(--ink)] hover:bg-[var(--sand)]/80 border border-[var(--ink)]/6"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease }}
              className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {products.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {products.length === 0 && (
            <div className="mt-16 text-center text-[var(--muted-foreground)]">
              Geen producten in deze filter. Kies een andere categorie.
            </div>
          )}
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-t border-[var(--ink)]/6 bg-[var(--sand)] py-12">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 grid sm:grid-cols-3 gap-8 text-center">
          {[
            { k: "Snelle levering", v: "Uit eigen voorraad, binnen dagen bij u op kantoor" },
            { k: "Showroom Rotterdam", v: "Zes dagen per week open voor persoonlijk advies" },
            { k: "Veilig afrekenen", v: "iDEAL, creditcard en Bancontact beschikbaar" },
          ].map(t => (
            <div key={t.k}>
              <div className="font-display text-lg text-[var(--ink)]">{t.k}</div>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">{t.v}</p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
