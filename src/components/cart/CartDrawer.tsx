import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { formatEuro, useCart } from "@/lib/cart";
import { btnR } from "@/lib/site-tokens";

function SelectCheckbox({
  checked,
  indeterminate,
  onChange,
  label,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? "mixed" : checked}
      aria-label={label}
      onClick={onChange}
      className={`grid size-5 shrink-0 place-items-center rounded-md border transition-all duration-200 ${
        checked || indeterminate
          ? "border-[var(--clay)] bg-[var(--clay)] text-[var(--bone)]"
          : "border-[var(--ink)]/20 bg-white hover:border-[var(--clay)]/50"
      }`}
    >
      {indeterminate ? (
        <span className="block h-0.5 w-2.5 rounded-full bg-[var(--bone)]" />
      ) : checked ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12l4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : null}
    </button>
  );
}

export function CartDrawer() {
  const {
    items,
    open,
    setOpen,
    removeItem,
    setQty,
    totalCount,
    selectedSubtotal,
    selectedTotalCount,
    selectedIds,
    isSelected,
    isAllSelected,
    isSomeSelected,
    toggleSelected,
    toggleSelectAll,
  } = useCart();
  const navigate = useNavigate();

  const goTo = (path: "/producten" | "/afrekenen") => {
    setOpen(false);
    navigate({ to: path });
  };

  const canCheckout = selectedTotalCount > 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[70] bg-[var(--ink)]/55 backdrop-blur-md"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-label="Winkelwagen"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className="fixed right-0 top-0 bottom-0 z-[71] flex w-full max-w-[min(100vw,440px)] flex-col bg-[var(--bone)] shadow-[-24px_0_80px_-20px_rgba(0,0,0,0.35)]"
          >
            <div className="relative shrink-0 border-b border-[var(--ink)]/8 px-5 py-5 md:px-6">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[var(--ochre)] via-[var(--clay)] to-transparent" />
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="eyebrow text-[var(--muted-foreground)]">Uw selectie</div>
                  <h3 className="mt-1 font-display text-2xl text-[var(--ink)] tracking-tight">
                    Winkelwagen
                    {totalCount > 0 && (
                      <span className="ml-2 text-base text-[var(--clay)] num">({totalCount})</span>
                    )}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className={`grid size-10 place-items-center ${btnR} border border-[var(--ink)]/10 text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bone)] transition-colors`}
                  aria-label="Sluit winkelwagen"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 md:px-6">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex h-full min-h-[280px] flex-col items-center justify-center text-center px-4"
                >
                  <div className="grid size-16 place-items-center rounded-2xl bg-[var(--sand)] text-[var(--clay)] mb-5">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M6 6h15l-1.5 9h-12L5 6H3" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="9" cy="20" r="1" />
                      <circle cx="18" cy="20" r="1" />
                    </svg>
                  </div>
                  <p className="font-display text-xl text-[var(--ink)]">Uw winkelwagen is leeg</p>
                  <p className="mt-2 text-sm text-[var(--muted-foreground)] max-w-[240px]">
                    Ontdek onze bestsellers en stel uw ideale werkplek samen.
                  </p>
                  <button
                    type="button"
                    onClick={() => goTo("/producten")}
                    className={`mt-6 ${btnR} bg-[var(--ink)] text-[var(--bone)] px-6 py-3 text-sm font-medium hover:bg-[var(--clay)] transition-colors`}
                  >
                    Bekijk producten
                  </button>
                </motion.div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={toggleSelectAll}
                    className={`mb-4 flex w-full items-center gap-3 ${btnR} border border-[var(--ink)]/8 bg-white px-3.5 py-3 text-left transition-colors hover:border-[var(--clay)]/30`}
                  >
                    <SelectCheckbox
                      checked={isAllSelected}
                      indeterminate={isSomeSelected}
                      onChange={toggleSelectAll}
                      label="Selecteer alles"
                    />
                    <span className="text-[13px] font-medium text-[var(--ink)]">Selecteer alles</span>
                    <span className="ml-auto text-[11px] uppercase tracking-wider text-[var(--muted-foreground)] num">
                      {selectedIds.length}/{items.length}
                    </span>
                  </button>

                  <ul className="space-y-3">
                    <AnimatePresence initial={false}>
                      {items.map((item, idx) => {
                        const selected = isSelected(item.id);
                        return (
                          <motion.li
                            key={item.id}
                            layout
                            initial={{ opacity: 0, x: 24 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 24, height: 0 }}
                            transition={{ duration: 0.35, delay: idx * 0.03 }}
                            className={`flex gap-3 rounded-xl border p-3 shadow-[0_8px_24px_-16px_rgba(17,24,39,0.12)] transition-all duration-300 ${
                              selected
                                ? "border-[var(--clay)]/35 bg-white"
                                : "border-[var(--ink)]/8 bg-[color-mix(in_oklab,white_88%,var(--sand))] opacity-80"
                            }`}
                          >
                            <SelectCheckbox
                              checked={selected}
                              onChange={() => toggleSelected(item.id)}
                              label={`Selecteer ${item.name}`}
                            />
                            <div className="shrink-0 size-[68px] rounded-lg overflow-hidden bg-[var(--sand)]">
                              <img src={item.img} alt="" className="h-full w-full object-cover" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-[13px] leading-snug text-[var(--ink)] line-clamp-2">
                                {item.name}
                              </p>
                              <div className="mt-1.5 font-display text-lg num text-[var(--ink)]">{item.price}</div>
                              <div className="mt-3 flex items-center justify-between gap-2">
                                <div className="inline-flex items-center rounded-lg border border-[var(--ink)]/10 overflow-hidden">
                                  <button type="button" onClick={() => setQty(item.id, item.qty - 1)} className="grid size-8 place-items-center text-[var(--ink)] hover:bg-[var(--sand)]">−</button>
                                  <span className="w-8 text-center text-sm num font-medium">{item.qty}</span>
                                  <button type="button" onClick={() => setQty(item.id, item.qty + 1)} className="grid size-8 place-items-center text-[var(--ink)] hover:bg-[var(--sand)]">+</button>
                                </div>
                                <button type="button" onClick={() => removeItem(item.id)} className="text-[11px] uppercase tracking-wider text-[var(--muted-foreground)] hover:text-red-600 transition-colors">
                                  Verwijder
                                </button>
                              </div>
                            </div>
                          </motion.li>
                        );
                      })}
                    </AnimatePresence>
                  </ul>
                </>
              )}
            </div>

            {items.length > 0 && (
              <div className="shrink-0 border-t border-[var(--ink)]/8 bg-[color-mix(in_oklab,var(--bone)_92%,white)] p-5 md:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-[var(--muted-foreground)]">Subtotaal geselecteerd</span>
                    {selectedTotalCount < totalCount && (
                      <p className="text-[11px] text-[var(--clay)] mt-0.5 num">{selectedTotalCount} van {totalCount} artikelen</p>
                    )}
                  </div>
                  <span className="font-display text-2xl num text-[var(--ink)]">{formatEuro(selectedSubtotal)}</span>
                </div>
                <p className="text-[11px] text-[var(--muted-foreground)] leading-relaxed">
                  Verzendkosten en btw worden berekend bij afrekenen
                </p>
                <button
                  type="button"
                  disabled={!canCheckout}
                  onClick={() => canCheckout && goTo("/afrekenen")}
                  className={`flex w-full items-center justify-center gap-2 ${btnR} py-3.5 text-sm font-medium transition-colors ${
                    canCheckout
                      ? "bg-[var(--clay)] text-[var(--bone)] hover:bg-[var(--ochre)] hover:text-[var(--ink)]"
                      : "bg-[var(--ink)]/15 text-[var(--muted-foreground)] cursor-not-allowed"
                  }`}
                >
                  {canCheckout ? (
                    <>
                      Afrekenen ({selectedTotalCount})
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.3" /></svg>
                    </>
                  ) : (
                    "Selecteer minimaal 1 product"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => goTo("/producten")}
                  className={`w-full ${btnR} border border-[var(--ink)]/12 py-3 text-sm font-medium text-[var(--ink)] hover:bg-[var(--sand)] transition-colors`}
                >
                  Verder winkelen
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
