import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useCart, type CartProduct } from "@/lib/cart";

function ArrowIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

type BaseProps = {
  children: React.ReactNode;
  variant?: "dark" | "light";
  className?: string;
};

type LinkProps = BaseProps & {
  href: string;
  onClick?: never;
  product?: never;
};

type CartProps = BaseProps & {
  product: CartProduct;
  href?: never;
  onClick?: never;
};

type ButtonProps = BaseProps & {
  onClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
  href?: never;
  product?: never;
};

export function CardOverlapButton(props: LinkProps | CartProps | ButtonProps) {
  if ("product" in props && props.product) {
    return <CardOverlapCartButton {...props} />;
  }
  if ("href" in props && props.href) {
    return <CardOverlapLinkButton {...props} />;
  }
  return <CardOverlapActionButton {...(props as ButtonProps)} />;
}

function Shell({
  children,
  variant,
  className = "",
  disabled,
  onClick,
  as = "button",
  href,
}: {
  children: React.ReactNode;
  variant: "dark" | "light";
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  as?: "button" | "a" | "link";
  href?: string;
}) {
  const isDark = variant === "dark";

  const shell = [
    "group/btn relative inline-flex w-full max-w-[min(100%,280px)] items-center rounded-full",
    "transition-[background-color,box-shadow,ring-color,border-color] duration-500 ease-out",
    isDark
      ? "shadow-[0_12px_32px_-14px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_32px_-14px_rgba(0,0,0,0.5)]"
      : "shadow-[0_14px_40px_-12px_rgba(0,0,0,0.45)] hover:shadow-[0_18px_50px_-10px_rgba(224,122,50,0.45)]",
    "disabled:opacity-70 disabled:pointer-events-none",
    isDark
      ? "bg-[var(--bone)] text-[var(--ink)] ring-1 ring-[var(--ochre)]/50 border border-[var(--ochre)]/45 hover:bg-[var(--bone)] hover:ring-[var(--ochre)]/70 hover:border-[var(--ochre)]/65"
      : "bg-[var(--clay)] text-[var(--bone)] ring-2 ring-white border-2 border-white hover:bg-[var(--ink)] hover:ring-white hover:border-white",
    className,
  ].join(" ");

  const circle = [
    "grid size-9 shrink-0 place-items-center rounded-full m-1 transition-[background-color,color,transform] duration-500",
    isDark
      ? "bg-[var(--clay)] text-[var(--bone)] group-hover/btn:bg-[var(--ink)]"
      : "bg-[var(--bone)]/20 text-[var(--bone)] group-hover/btn:bg-[var(--ochre)] group-hover/btn:text-[var(--ink)] group-hover/btn:scale-110",
  ].join(" ");

  const inner = (
    <>
      {!isDark && (
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-[3px] rounded-full opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.55), rgba(240,160,96,0.35), rgba(255,255,255,0.45))",
            padding: "1px",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}
      {!isDark && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
        >
          <span className="absolute inset-y-0 -left-full w-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-[-18deg] transition-transform duration-700 group-hover/btn:translate-x-[280%]" />
        </span>
      )}
      <span className="relative flex-1 pl-5 pr-1 py-2.5 text-[12px] sm:text-[13px] font-semibold tracking-tight text-center">
        {children}
      </span>
      <span className={circle}>
        <span className="transition-transform duration-500 group-hover/btn:translate-x-0.5">
          <ArrowIcon />
        </span>
      </span>
    </>
  );

  if (as === "link" && href) {
    if (href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:")) {
      return (
        <a href={href} className={shell} onClick={onClick}>
          {inner}
        </a>
      );
    }
    return (
      <Link to={href} className={shell} onClick={onClick}>
        {inner}
      </Link>
    );
  }

  if (as === "a" && href) {
    return (
      <a href={href} className={shell} onClick={onClick}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" className={shell} onClick={onClick} disabled={disabled}>
      {inner}
    </button>
  );
}

function CardOverlapLinkButton({ children, href, variant = "dark", className }: LinkProps) {
  return (
    <Shell variant={variant} className={className} as="link" href={href}>
      {children}
    </Shell>
  );
}

function CardOverlapCartButton({
  children = "In winkelwagen",
  product,
  variant = "light",
  className,
}: CartProps) {
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

  const label =
    phase === "loading" ? "Bezig…" : phase === "success" ? "Toegevoegd" : children;

  return (
    <Shell variant={variant} className={className} onClick={handleClick} disabled={phase === "loading"}>
      {label}
    </Shell>
  );
}

function CardOverlapActionButton({ children, onClick, variant = "light", className, disabled }: ButtonProps) {
  return (
    <Shell variant={variant} className={className} onClick={onClick} disabled={disabled}>
      {children}
    </Shell>
  );
}
