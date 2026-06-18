import { OI } from "@/lib/oi-data";
import { GoogleReviewsBadge } from "@/components/site/GoogleReviewsBadge";

function IconTruck({ className = "size-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 6h11v9H3V6Zm11 2h4l3 4v3h-7V8ZM7 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" strokeLinejoin="round" />
    </svg>
  );
}

function IconShield({ className = "size-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3l7 3v6c0 4.5-3.2 7.4-7 9-3.8-1.6-7-4.5-7-9V6l7-3Z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPhone({ className = "size-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M6.5 4h3l1.2 3-1.5 1a8 8 0 0 0 3.8 3.8l1-1.5 3 1.2v2A1.5 1.5 0 0 1 14 16.5C8.5 16.5 4.5 12.5 4.5 7A1.5 1.5 0 0 1 6.5 4Z" strokeLinejoin="round" />
    </svg>
  );
}

function IconMail({ className = "size-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" strokeLinecap="round" />
    </svg>
  );
}

function Divider() {
  return <span className="hidden sm:inline text-[var(--bone)]/20 select-none" aria-hidden>|</span>;
}

type ItemProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
  href?: string;
  className?: string;
};

function Item({ icon, children, href, className = "" }: ItemProps) {
  const inner = (
    <>
      <span className="text-[var(--ochre)]">{icon}</span>
      {children}
    </>
  );
  const cls = `inline-flex items-center gap-1.5 hover:text-[var(--bone)] transition-colors ${className}`;
  if (href) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return <span className={cls}>{inner}</span>;
}

export function TopUtilityBar({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const textCls =
    variant === "dark"
      ? "text-[10px] text-[var(--bone)]/65"
      : "text-[10px] text-[var(--ink)]/55";

  return (
    <div className={`h-7 flex items-center justify-end gap-2.5 sm:gap-3.5 ${textCls}`}>
      <GoogleReviewsBadge variant={variant} className="inline-flex" />
      <Divider />
      <Item icon={<IconTruck />}>Snelle levering</Item>
      <Divider />
      <Item icon={<IconShield />}>+5 jaar garantie</Item>
      <Divider />
      <Item icon={<IconPhone />} href={OI.showroom.telHref} className="num">
        {OI.showroom.tel}
      </Item>
      <Divider />
      <Item icon={<IconMail />} href={`mailto:${OI.showroom.email}`}>
        {OI.showroom.email}
      </Item>
    </div>
  );
}
