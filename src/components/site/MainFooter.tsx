import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
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
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--bone)]/8 border border-[var(--bone)]/10 text-[var(--ochre)]">
        {icon}
      </span>
      <div className="eyebrow text-[var(--bone)]/75">{children}</div>
    </div>
  );
}

function FooterLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  const cls = "group inline-flex items-center gap-2 text-[var(--bone)]/70 hover:text-[var(--bone)] transition-colors py-1";
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
  return <span className="inline-flex items-center gap-2 text-[var(--bone)]/70 py-1">{children}</span>;
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
    <footer className="relative bg-[var(--ink)] text-[var(--bone)] overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 45% 50% at 10% 0%, color-mix(in oklab, var(--clay) 18%, transparent), transparent 55%), radial-gradient(ellipse 40% 40% at 90% 100%, color-mix(in oklab, var(--ochre) 12%, transparent), transparent 50%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--ochre)]/40 to-transparent" />

      <div className="relative max-w-[1500px] mx-auto px-6 md:px-12 pt-14 md:pt-16 pb-10">
        <div className="grid gap-10 lg:gap-12 lg:grid-cols-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4"
          >
            <Link to="/" className="inline-block rounded-xl bg-[var(--bone)]/95 px-3.5 py-2.5 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.5)]">
              <img src={OI.logo} alt="Office Image" className="h-8 w-auto" />
            </Link>
            <p className="mt-5 text-[var(--bone)]/60 leading-relaxed text-sm md:text-[15px] max-w-md">
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
                    className={`group grid size-11 place-items-center ${btnR} border border-[var(--bone)]/12 bg-[var(--bone)]/6 text-[var(--bone)]/80 hover:text-[var(--bone)] hover:border-[var(--ochre)]/45 hover:bg-[var(--clay)]/20 transition-all duration-300`}
                  >
                    <Icon className="size-[18px] group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Links grid */}
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
              <div className={`${btnR} border border-[var(--bone)]/10 bg-[var(--bone)]/5 p-4 md:p-5 space-y-3 text-sm`}>
                <p className="font-medium text-[var(--bone)]/90">{OI.showroom.name}</p>
                <div className="flex items-start gap-2.5 text-[var(--bone)]/70">
                  <IconPin className="size-4 shrink-0 mt-0.5 text-[var(--ochre)]" />
                  <span>{OI.showroom.address}<br />{OI.showroom.zip}</span>
                </div>
                <a href={OI.showroom.telHref} className="flex items-center gap-2.5 text-[var(--bone)]/70 hover:text-[var(--bone)] transition-colors num">
                  <svg className="size-4 shrink-0 text-[var(--ochre)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6.5 3h3l1.5 5-2 1.5a11 11 0 0 0 5 5L13.5 13l5 1.5v3A1.5 1.5 0 0 1 17 19C9.5 19 5 14.5 5 7A1.5 1.5 0 0 1 6.5 3Z" /></svg>
                  {OI.showroom.tel}
                </a>
                <a href={OI.showroom.mobileHref} className="flex items-center gap-2.5 text-[var(--bone)]/70 hover:text-[var(--bone)] transition-colors num">
                  <svg className="size-4 shrink-0 text-[var(--ochre)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg>
                  {OI.showroom.mobile}
                </a>
                <p className="text-[11px] uppercase tracking-wider text-[var(--bone)]/45 num pt-1">KvK {OI.showroom.kvk}</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Payment strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 md:mt-12 rounded-2xl border border-[var(--bone)]/10 bg-[var(--bone)]/4 p-4 md:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div className="flex items-center gap-2.5 text-[var(--bone)]/70">
            <svg className="size-5 text-[var(--ochre)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 3l7 4v5c0 4-3 7-7 9-4-2-7-5-7-9V7l7-4Z" strokeLinejoin="round" />
            </svg>
            <span className="text-sm font-medium">Veilig betalen via</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {["iDEAL", "Creditcard", "Bancontact", "Op rekening"].map(m => (
              <span key={m} className={`inline-flex items-center ${btnR} border border-[var(--bone)]/12 bg-[var(--bone)]/6 px-3 py-1.5 text-xs font-medium text-[var(--bone)]/80`}>
                {m}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="relative border-t border-[var(--bone)]/10">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 py-5 md:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[11px] md:text-xs uppercase tracking-[0.18em] text-[var(--bone)]/45">
          <span>© 2024 tot 2026, Office Image. Alle rechten voorbehouden</span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link to="/producten" className="hover:text-[var(--bone)]/70 transition-colors">Producten</Link>
            <a href="/#showroom" className="hover:text-[var(--bone)]/70 transition-colors">Showroom</a>
            <Link to="/afrekenen" className="hover:text-[var(--bone)]/70 transition-colors">Afrekenen</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
