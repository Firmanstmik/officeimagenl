import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import type { Bestseller } from "@/lib/oi-data";
import { OI } from "@/lib/oi-data";
import { btnR } from "@/lib/site-tokens";

export type CartProduct = {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  was: string | null;
  img: string;
  href: string;
};

export type CartLine = CartProduct & { qty: number };

type CartContextValue = {
  items: CartLine[];
  open: boolean;
  setOpen: (open: boolean) => void;
  addItem: (product: CartProduct) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  clearSelectedItems: () => void;
  totalCount: number;
  subtotal: number;
  justAdded: boolean;
  selectedIds: string[];
  selectedItems: CartLine[];
  selectedSubtotal: number;
  selectedTotalCount: number;
  isSelected: (id: string) => boolean;
  isAllSelected: boolean;
  isSomeSelected: boolean;
  toggleSelected: (id: string) => void;
  toggleSelectAll: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function parseEuro(price: string) {
  return Number.parseInt(price.replace(/[^\d]/g, ""), 10) || 0;
}

export function formatEuro(amount: number) {
  return `€${amount.toLocaleString("nl-NL")}`;
}

export function cartProductFromBestseller(b: Bestseller): CartProduct {
  return {
    id: b.id,
    name: b.name,
    price: b.price,
    priceValue: parseEuro(b.price),
    was: b.was,
    img: b.img,
    href: b.href,
  };
}

function repairCartLine(line: CartLine): CartLine {
  if (line.id === "/producten") {
    const match = OI.bestsellers.find(b => b.name === line.name);
    if (match) {
      return {
        ...line,
        id: match.id,
        price: match.price,
        priceValue: parseEuro(match.price),
        was: match.was,
        img: match.img,
        href: match.href,
      };
    }
  }
  return line;
}

function loadCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("oi-cart");
    const parsed = raw ? (JSON.parse(raw) as CartLine[]) : [];
    return parsed.map(repairCartLine);
  } catch {
    return [];
  }
}

function loadSelectedIds(itemIds: string[]): string[] {
  if (typeof window === "undefined") return itemIds;
  try {
    const raw = localStorage.getItem("oi-cart-selected");
    if (!raw) return itemIds;
    const saved = JSON.parse(raw) as string[];
    return saved.filter(id => itemIds.includes(id));
  } catch {
    return itemIds;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>(loadCart);
  const [selectedIds, setSelectedIds] = useState<string[]>(() =>
    loadSelectedIds(
      (() => {
        if (typeof window === "undefined") return [];
        try {
          const raw = localStorage.getItem("oi-cart");
          const parsed = raw ? (JSON.parse(raw) as CartLine[]).map(repairCartLine) : [];
          return parsed.map(i => i.id);
        } catch {
          return [];
        }
      })(),
    ),
  );
  const [open, setOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    localStorage.setItem("oi-cart", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("oi-cart-selected", JSON.stringify(selectedIds));
  }, [selectedIds]);

  useEffect(() => {
    setSelectedIds(prev => {
      const valid = prev.filter(id => items.some(i => i.id === id));
      const missing = items.filter(i => !valid.includes(i.id)).map(i => i.id);
      if (missing.length === 0 && valid.length === prev.length) return prev;
      return [...valid, ...missing];
    });
  }, [items]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const openCart = () => setOpen(true);
    window.addEventListener("oi:cart-open", openCart);
    return () => window.removeEventListener("oi:cart-open", openCart);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const addItem = useCallback((product: CartProduct) => {
    setItems(prev => {
      const hit = prev.find(i => i.id === product.id);
      if (hit) return prev.map(i => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...product, qty: 1 }];
    });
    setSelectedIds(prev => (prev.includes(product.id) ? prev : [...prev, product.id]));
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 700);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
    setSelectedIds(prev => prev.filter(sid => sid !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    if (qty < 1) {
      setItems(prev => prev.filter(i => i.id !== id));
      setSelectedIds(prev => prev.filter(sid => sid !== id));
      return;
    }
    setItems(prev => prev.map(i => (i.id === id ? { ...i, qty } : i)));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setSelectedIds([]);
  }, []);

  const clearSelectedItems = useCallback(() => {
    setSelectedIds(current => {
      setItems(prev => prev.filter(i => !current.includes(i.id)));
      return [];
    });
  }, []);

  const toggleSelected = useCallback((id: string) => {
    setSelectedIds(prev => (prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]));
  }, []);

  const toggleSelectAll = useCallback(() => {
    setSelectedIds(prev => {
      const allIds = items.map(i => i.id);
      const allSelected = allIds.length > 0 && allIds.every(id => prev.includes(id));
      return allSelected ? [] : allIds;
    });
  }, [items]);

  const isSelected = useCallback((id: string) => selectedIds.includes(id), [selectedIds]);

  const totalCount = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.priceValue * i.qty, 0), [items]);

  const selectedItems = useMemo(
    () => items.filter(i => selectedIds.includes(i.id)),
    [items, selectedIds],
  );

  const selectedSubtotal = useMemo(
    () => selectedItems.reduce((s, i) => s + i.priceValue * i.qty, 0),
    [selectedItems],
  );

  const selectedTotalCount = useMemo(
    () => selectedItems.reduce((s, i) => s + i.qty, 0),
    [selectedItems],
  );

  const isAllSelected = items.length > 0 && items.every(i => selectedIds.includes(i.id));
  const isSomeSelected = selectedIds.length > 0 && !isAllSelected;

  const value = useMemo(
    () => ({
      items,
      open,
      setOpen,
      addItem,
      removeItem,
      setQty,
      clearCart,
      clearSelectedItems,
      totalCount,
      subtotal,
      justAdded,
      selectedIds,
      selectedItems,
      selectedSubtotal,
      selectedTotalCount,
      isSelected,
      isAllSelected,
      isSomeSelected,
      toggleSelected,
      toggleSelectAll,
    }),
    [
      items,
      open,
      addItem,
      removeItem,
      setQty,
      clearCart,
      clearSelectedItems,
      totalCount,
      subtotal,
      justAdded,
      selectedIds,
      selectedItems,
      selectedSubtotal,
      selectedTotalCount,
      isSelected,
      isAllSelected,
      isSomeSelected,
      toggleSelected,
      toggleSelectAll,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartBadge({ className = "" }: { className?: string }) {
  const { totalCount } = useCart();
  if (!totalCount) return null;
  return (
    <motion.span
      key={totalCount}
      initial={{ scale: 1.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`absolute -top-1.5 -right-1.5 grid min-w-[18px] h-[18px] place-items-center rounded-full bg-[var(--ochre)] text-[var(--ink)] text-[10px] font-bold num px-1 shadow-[0_2px_8px_rgba(212,165,116,0.5)] ${className}`}
    >
      {totalCount > 9 ? "9+" : totalCount}
    </motion.span>
  );
}

export function HeaderCartButton({ className = "" }: { className?: string }) {
  const { setOpen, totalCount } = useCart();
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={`relative inline-flex items-center gap-2 ${btnR} bg-[var(--clay)] text-[var(--bone)] px-3.5 py-2 text-[12px] font-semibold shadow-[0_4px_18px_-6px_rgba(224,122,50,0.5)] hover:bg-[var(--ochre)] hover:text-[var(--ink)] transition-all duration-300 ${className}`}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M6 6h15l-1.5 9h-12L5 6H3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
      </svg>
      <span className="hidden sm:inline">Winkelwagen</span>
      {totalCount > 0 ? (
        <span className="grid min-w-[18px] h-[18px] place-items-center rounded-md bg-[var(--ink)] text-[var(--bone)] text-[9px] font-bold num px-1">
          {totalCount > 9 ? "9+" : totalCount}
        </span>
      ) : (
        <CartBadge />
      )}
    </button>
  );
}
