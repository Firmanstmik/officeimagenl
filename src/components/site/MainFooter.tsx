import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PaymentTrustBar } from "@/components/site/PaymentTrustBar";
import { PremiumLinkMarker } from "@/components/site/PremiumLinkMarker";
import { OI } from "@/lib/oi-data";
import { btnR } from "@/lib/site-tokens";

function IconPin({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function IconPhone({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M6.5 3h3l1.5 5-2 1.5a11 11 0 0 0 5 5L13.5 13l5 1.5v3A1.5 1.5 0 0 1 17 19C9.5 19 5 14.5 5 7A1.5 1.5 0 0 1 6.5 3Z" />
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
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
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

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--clay)] mb-4">
      {children}
    </h3>
  );
}

function FooterDashLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  const cls =
    "group inline-flex items-start gap-2.5 text-[14px] text-[var(--graphite)]/80 hover:text-[var(--ink)] transition-colors py-1";
  const content = (
    <>
      <PremiumLinkMarker />
      <span>{children}</span>
    </>
  );

  if (external || href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {content}
      </a>
    );
  }
  if (href.startsWith("/") && !href.includes("#")) {
    return (
      <Link to={href} className={cls}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={cls}>
      {content}
    </a>
  );
}

const SOCIAL = [
  { label: "Facebook", href: OI.social.facebook, icon: IconFacebook },
  { label: "Instagram", href: OI.social.instagram, icon: IconInstagram },
  { label: "LinkedIn", href: OI.social.linkedin, icon: IconLinkedIn },
] as const;

export function MainFooter() {
  return (
    <footer className="relative bg-[var(--bone)] text-[var(--ink)] overflow-hidden border-t border-[var(--ink)]/[0.06]">
      <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 lg:px-12 pt-14 md:pt-16 pb-12">
        <div className="grid gap-12 lg:gap-10 xl:gap-12 lg:grid-cols-12">
          {/* Col 1 — Brand & social */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <Link to="/" className="inline-block">
              <img src={OI.logo} alt="Office Image" className="h-10 md:h-11 w-auto" />
            </Link>
            <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--graphite)]/65">
              {OI.footer.tagline}
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-[var(--graphite)]/80 max-w-sm">
              {OI.footer.description}
            </p>

            <div className="mt-8">
              <SectionHeading>Volg ons</SectionHeading>
              <ul className="space-y-3">
                {SOCIAL.map(s => {
                  const Icon = s.icon;
                  return (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-3 text-[14px] text-[var(--graphite)]/80 hover:text-[var(--ink)] transition-colors"
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--sand)] text-[var(--clay)] ring-1 ring-[var(--ink)]/[0.06] group-hover:bg-[var(--clay)] group-hover:text-white transition-colors">
                          <Icon className="size-[15px]" />
                        </span>
                        {s.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>

          {/* Col 2 — Catalogus */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="lg:col-span-3"
          >
            <SectionHeading>Catalogus</SectionHeading>
            <ul className="space-y-0.5">
              {OI.footer.catalog.map(item => (
                <li key={item.label}>
                  <FooterDashLink href={item.href}>{item.label}</FooterDashLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3 — Informatie & Voorwaarden */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3 space-y-9"
          >
            <div>
              <SectionHeading>Informatie</SectionHeading>
              <ul className="space-y-0.5">
                {OI.footer.info.map(item => (
                  <li key={item.label}>
                    <FooterDashLink href={item.href} external>
                      {item.label}
                    </FooterDashLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading>Voorwaarden</SectionHeading>
              <ul className="space-y-0.5">
                {OI.footer.terms.map(item => (
                  <li key={item.label}>
                    <FooterDashLink href={item.href} external>
                      {item.label}
                    </FooterDashLink>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Col 4 — Contact & Showroom */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <SectionHeading>Contact &amp; showroom</SectionHeading>

            <div className="space-y-3 text-[14px] text-[var(--graphite)]/85">
              <a
                href={OI.footer.mapsHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-2.5 hover:text-[var(--ink)] transition-colors"
              >
                <IconPin className="size-4 shrink-0 mt-0.5 text-[var(--clay)]" />
                <span>
                  {OI.showroom.name}
                  <br />
                  {OI.showroom.address} {OI.showroom.zip}
                </span>
              </a>
              <a href={OI.showroom.telHref} className="flex items-center gap-2.5 hover:text-[var(--ink)] transition-colors num">
                <IconPhone className="size-4 shrink-0 text-[var(--clay)]" />
                Tel: {OI.showroom.tel}
              </a>
              <a href={OI.showroom.mobileHref} className="flex items-center gap-2.5 hover:text-[var(--ink)] transition-colors num">
                <IconPhone className="size-4 shrink-0 text-[var(--clay)]" />
                Mobiel: {OI.showroom.mobile}
              </a>
              <p className="num text-[var(--graphite)]/70">Kvk: {OI.showroom.kvk}</p>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--ink)]/[0.08] bg-white shadow-[0_16px_48px_-28px_rgba(17,24,39,0.18)]">
              <div className="px-4 py-3 border-b border-[var(--ink)]/[0.06]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--graphite)]/60 mb-2">
                  Openingstijden
                </p>
                <ul className="space-y-1 text-[13px]">
                  {OI.hours.map(([day, time]) => (
                    <li key={day} className="flex items-center justify-between gap-3">
                      <span className="text-[var(--graphite)]/75">{day}</span>
                      <span className={`num text-right ${time === "Gesloten" ? "text-[var(--graphite)]/50" : "text-[var(--ink)]/80"}`}>
                        {time}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[11px] leading-relaxed text-[var(--graphite)]/60 italic">
                  {OI.footer.appointmentNote}
                </p>
              </div>

              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={OI.showroom.img}
                  alt="Office Image showroom Rotterdam"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/88 via-[var(--ink)]/35 to-transparent" />
                <span className="absolute left-3 top-3 rounded-md bg-[var(--clay)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white">
                  Premium showroom
                </span>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-display text-lg text-white">{OI.showroom.name}</p>
                  <p className="text-[12px] text-white/75">
                    {OI.showroom.address}, {OI.showroom.zip}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      href="/#showroom"
                      className={`inline-flex items-center gap-1.5 ${btnR} bg-white/95 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--ink)] hover:bg-white transition-colors`}
                    >
                      <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" strokeLinejoin="round" />
                      </svg>
                      Bekijk showroom
                    </a>
                    <a
                      href={OI.footer.mapsHref}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-1.5 ${btnR} bg-white/15 backdrop-blur-sm px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white ring-1 ring-white/25 hover:bg-white/25 transition-colors`}
                    >
                      <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                      Route plannen
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <PaymentTrustBar variant="light" className="mt-12 md:mt-14" />
      </div>

      <div className="border-t border-[var(--ink)]/[0.08] bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-12 py-5 md:py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between text-[11px] uppercase tracking-[0.16em] text-[var(--graphite)]/70">
            <span>© 2024, Office Image. Alle rechten voorbehouden</span>
            <span className="hidden lg:block text-[var(--graphite)]/55">
              Kantoormeubelen met kwaliteit en service
            </span>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              {OI.footer.terms.map((item, i) => (
                <span key={item.label} className="inline-flex items-center gap-3">
                  {i > 0 && <span className="text-[var(--graphite)]/30">|</span>}
                  <a href={item.href} target="_blank" rel="noreferrer" className="hover:text-[var(--ink)] transition-colors">
                    {item.label}
                  </a>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
