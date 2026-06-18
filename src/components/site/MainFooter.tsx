import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PaymentTrustBar } from "@/components/site/PaymentTrustBar";
import { OI } from "@/lib/oi-data";
import { btnR } from "@/lib/site-tokens";

function IconGrid({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function IconInfo({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" /><path d="M12 10v6M12 7h.01" strokeLinecap="round" />
    </svg>
  );
}

function IconPin({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function IconFacebook({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 8.5h2.5l-.5 3H14v9h-4v-9H8v-3h2V7.5C10 5.6 11.6 4 13.5 4H16v3h-1.5c-.8 0-1 .4-1 1v.5Z" />
    </svg>
  );
}

function IconInstagram({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconLinkedIn({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 9h3v12H6V9Zm1.5-4.5a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6ZM11 9h2.8v1.6h.1c.4-.7 1.4-1.5 2.9-1.5 3.1 0 3.7 2 3.7 4.7V21H17v-6.8c0-1.6 0-3.7-2.3-3.7-2.3 0-2.7 1.8-2.7 3.6V21h-3V9Z" />
    </svg>
  );
}

function FooterHeading({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4 md:mb-5">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--sand)] border border-[var(--ink)]/[0.08] text-[var(--clay)]">
        {icon}
      </span>
      <div className="eyebrow text-[var(--graphite)]">{children}</div>
    </div>
  );
}

function FooterLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  const cls = "group inline-flex items-center gap-2 text-[var(--graphite)]/80 hover:text-[var(--ink)] transition-colors py-1";
  const arrow = (
    <svg className="size-3 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M1 7h12M8 2l5 5-5 5" strokeLinecap="round" />
    </svg>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {children}{arrow}
      </a>
    );
  }
  if (href.startsWith("/") && !href.includes("#")) {
    return (
      <Link to={href} className={cls}>
        {children}{arrow}
      </Link>
    );
  }
  return (
    <a href={href} className={cls}>
      {children}{arrow}
    </a>
  );
}

function FooterText({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center gap-2 text-[var(--graphite)]/80 py-1">{children}</span>;
}

const INFO_LINKS = [
  "Klantenservice",
  "Bezorgen",
  "Betaalmethoden",
  "Retourneren",
  "Algemene voorwaarden",
  "Privacybeleid",
] as const;

const SOCIAL = [
  { label: "Facebook", href: OI.social.facebook, icon: IconFacebook },
  { label: "Instagram", href: OI.social.instagram, icon: IconInstagram },
  { label: "LinkedIn", href: OI.social.linkedin, icon: IconLinkedIn },
] as const;

export function MainFooter() {
  return (
    <footer className="relative bg-[color-mix(in_oklab,var(--sand)_42%,var(--bone))] text-[var(--ink)] overflow-hidden border-t border-[var(--ink)]/[0.06]">
      <div className="relative max-w-[1500px] mx-auto px-6 md:px-12 pt-12 md:pt-14 pb-10">
        <div className="grid gap-10 lg:gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4"
          >
            <Link to="/" className="inline-block rounded-xl bg-white px-3.5 py-2.5 shadow-[0_12px_40px_-22px_rgba(17,24,39,0.18)] border border-[var(--ink)]/[0.06]">
              <img src={OI.logo} alt="Office Image" className="h-8 w-auto" />
            </Link>
            <p className="mt-5 text-[var(--graphite)]/85 leading-relaxed text-sm md:text-[15px] max-w-md">
              Office Image Kantoormeubelen. Exclusieve directiemeubelen, werkplekken, bureaustoelen en archiefkasten. Snelle levering uit eigen voorraad.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {SOCIAL.map(s => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className={`group grid size-11 place-items-center ${btnR} border border-[var(--ink)]/[0.08] bg-white text-[var(--ink)]/70 hover:text-[var(--ink)] hover:border-[var(--clay)]/35 hover:bg-[var(--bone)] transition-all duration-300 shadow-[0_8px_24px_-18px_rgba(17,24,39,0.12)]`}
                  >
                    <Icon className="size-[18px] group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          <div className="lg:col-span-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.05 }}>
              <FooterHeading icon={<IconGrid />}>Catalogus</FooterHeading>
              <ul className="space-y-1.5 text-sm">
                {OI.categories.map(c => (
                  <li key={c.name}>
                    <FooterLink href={c.href}>{c.name}</FooterLink>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
              <FooterHeading icon={<IconInfo />}>Informatie</FooterHeading>
              <ul className="space-y-1.5 text-sm">
                {INFO_LINKS.map(l => (
                  <li key={l}>
                    <FooterText>{l}</FooterText>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="sm:col-span-2 lg:col-span-1"
            >
              <FooterHeading icon={<IconPin />}>Showroom</FooterHeading>
              <div className={`${btnR} border border-[var(--ink)]/[0.08] bg-white p-4 md:p-5 space-y-3 text-sm shadow-[0_12px_40px_-24px_rgba(17,24,39,0.14)]`}>
                <p className="font-medium text-[var(--ink)]">{OI.showroom.name}</p>
                <div className="flex items-start gap-2.5 text-[var(--graphite)]/85">
                  <IconPin className="size-4 shrink-0 mt-0.5 text-[var(--clay)]" />
                  <span>{OI.showroom.address}<br />{OI.showroom.zip}</span>
                </div>
                <a href={OI.showroom.telHref} className="flex items-center gap-2.5 text-[var(--graphite)]/85 hover:text-[var(--ink)] transition-colors num">
                  <svg className="size-4 shrink-0 text-[var(--clay)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6.5 3h3l1.5 5-2 1.5a11 11 0 0 0 5 5L13.5 13l5 1.5v3A1.5 1.5 0 0 1 17 19C9.5 19 5 14.5 5 7A1.5 1.5 0 0 1 6.5 3Z" /></svg>
                  {OI.showroom.tel}
                </a>
                <a href={OI.showroom.mobileHref} className="flex items-center gap-2.5 text-[var(--graphite)]/85 hover:text-[var(--ink)] transition-colors num">
                  <svg className="size-4 shrink-0 text-[var(--clay)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg>
                  {OI.showroom.mobile}
                </a>
                <p className="text-[11px] uppercase tracking-wider text-[var(--graphite)]/70 num pt-1">KvK {OI.showroom.kvk}</p>
              </div>
            </motion.div>
          </div>
        </div>

        <PaymentTrustBar className="mt-10 md:mt-12" />
      </div>

      <div className="relative border-t border-[var(--ink)]/[0.08] bg-[color-mix(in_oklab,var(--sand)_30%,var(--bone))]">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 py-5 md:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[11px] md:text-xs uppercase tracking-[0.18em] text-[var(--graphite)]/75">
          <span>© 2024 tot 2026, Office Image. Alle rechten voorbehouden</span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link to="/producten" className="hover:text-[var(--ink)] transition-colors">Producten</Link>
            <a href="/#showroom" className="hover:text-[var(--ink)] transition-colors">Showroom</a>
            <Link to="/afrekenen" className="hover:text-[var(--ink)] transition-colors">Afrekenen</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
