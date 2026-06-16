import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useCart, type CartProduct } from "@/lib/cart";
import { btnR } from "@/lib/site-tokens";

export function AddToCartButton({ product }: { product: CartProduct }) {
  const { addItem } = useCart();
  const [phase, setPhase] = useState<"idle" | "loading" | "success">("idle");

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (phase !== "idle") return;
    setPhase("loading");
    window.setTimeout(() => {
      addItem(product);
      setPhase("success");
      window.setTimeout(() => setPhase("idle"), 2200);
    }, 380);
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={phase === "loading"}
      whileTap={{ scale: 0.98 }}
      className={`relative w-full overflow-hidden ${btnR} py-3.5 text-[13px] font-medium tracking-tight transition-colors duration-500 ${
        phase === "success"
          ? "bg-emerald-600 text-white border border-emerald-500/80"
          : "bg-[var(--ink)] text-[var(--bone)] border border-[var(--ink)] hover:bg-[var(--clay)] hover:border-[var(--clay)]"
      }`}
    >
      <AnimatePresence mode="wait">
        {phase === "idle" && (
          <motion.span key="idle" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="inline-flex items-center justify-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 6h15l-1.5 9h-12L5 6H3" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="20" r="1" /><circle cx="18" cy="20" r="1" />
            </svg>
            Toevoegen aan winkelwagen
          </motion.span>
        )}
        {phase === "loading" && (
          <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex items-center justify-center gap-2">
            <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} className="size-4 rounded-full border-2 border-[var(--bone)]/30 border-t-[var(--bone)]" />
            Bezig met toevoegen
          </motion.span>
        )}
        {phase === "success" && (
          <motion.span key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="inline-flex items-center justify-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12l4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Succesvol toegevoegd
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
