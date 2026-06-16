import { motion } from "motion/react";
import type { Bestseller } from "@/lib/oi-data";
import { cartProductFromBestseller } from "@/lib/cart";
import { AddToCartButton } from "@/components/product/AddToCartButton";

export function ProductCard({ product, index = 0 }: { product: Bestseller; index?: number }) {
  const cartProduct = cartProductFromBestseller(product);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.06 }}
      className="group flex h-full flex-col rounded-2xl overflow-hidden bg-[var(--card)] border border-[var(--ink)]/8 shadow-[0_12px_40px_-24px_rgba(17,24,39,0.18)] transition-all duration-500 hover:border-[var(--clay)]/25 hover:shadow-[0_20px_50px_-20px_rgba(184,138,90,0.22)] hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden bg-[var(--sand)]">
        <img
          src={product.img}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {product.was && (
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
          {product.name}
        </h3>
        <div className="mt-3 flex items-baseline gap-2">
          {product.was && <span className="text-sm text-[var(--muted-foreground)] line-through num">{product.was}</span>}
          <span className="font-display text-2xl num text-[var(--ink)]">{product.price}</span>
        </div>
        <div className="mt-5 pt-4 border-t border-[var(--ink)]/6">
          <AddToCartButton product={cartProduct} />
        </div>
      </div>
    </motion.article>
  );
}
