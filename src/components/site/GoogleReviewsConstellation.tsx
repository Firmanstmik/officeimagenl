import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  GOOGLE_REVIEWS,
  GOOGLE_REVIEWS_HUB,
  GOOGLE_REVIEW_SLOTS,
  type GoogleReview,
} from "@/lib/google-reviews-data";

function GoogleMark({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function Stars({ className = "text-[var(--clay)]", size = "md" }: { className?: string; size?: "sm" | "md" }) {
  const star = size === "sm" ? "size-2" : "size-3";
  return (
    <span className={`inline-flex gap-0.5 ${className}`} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={star} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.9 6.9L22 9.8l-5.2 4.5 1.6 6.9L12 17.8 5.6 21.2l1.6-6.9L2 9.8l7.1-.9L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function FloatingReviewCard({
  review,
  slotIndex,
  isSwapping,
}: {
  review: GoogleReview;
  slotIndex: number;
  isSwapping: boolean;
}) {
  const slot = GOOGLE_REVIEW_SLOTS[slotIndex];

  return (
    <motion.article
      layout
      layoutId={`review-card-${review.id}`}
      className="absolute w-[min(118px,36vw)] sm:w-[min(210px,40vw)] lg:w-[min(290px,44vw)] max-w-[290px] cursor-default select-none"
      style={{ zIndex: slot.z }}
      initial={false}
      animate={{
        left: `${slot.x}%`,
        top: `${slot.y}%`,
        x: "-50%",
        y: "-50%",
        rotate: slot.rotate,
        scale: slot.scale,
      }}
      transition={{
        type: "spring",
        stiffness: isSwapping ? 210 : 140,
        damping: isSwapping ? 20 : 24,
        mass: isSwapping ? 0.75 : 1,
      }}
      whileHover={{
        scale: slot.scale * 1.04,
        rotate: slot.rotate * 0.4,
        zIndex: 50,
        transition: { duration: 0.35 },
      }}
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4.8 + slotIndex * 0.35, repeat: Infinity, ease: "easeInOut" }}
        className={[
          "relative rounded-xl md:rounded-2xl border p-2.5 sm:p-3.5 md:p-5 shadow-[0_24px_60px_-28px_rgba(17,24,39,0.28)] backdrop-blur-sm",
          review.tone === "warm"
            ? "border-[var(--clay)]/15 bg-[color-mix(in_oklab,var(--bone)_94%,var(--ochre))]"
            : "border-[var(--ink)]/8 bg-[var(--card)]",
        ].join(" ")}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-xl md:rounded-2xl opacity-60"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--ochre) 25%, transparent), transparent 45%, color-mix(in oklab, var(--clay) 15%, transparent))",
          }}
        />
        <div className="relative">
          <Stars size="sm" className="md:[&_svg]:size-3 [&_svg]:size-2" />
          <p className="mt-1.5 md:mt-3 text-[9px] sm:text-[11px] md:text-[13px] leading-snug md:leading-relaxed text-[var(--ink)]/88 line-clamp-3 md:line-clamp-4">
            &ldquo;{review.quote}&rdquo;
          </p>
          <p className="mt-1 md:mt-2 text-[8px] sm:text-[10px] md:text-[11px] font-medium text-[var(--clay)] line-clamp-1">{review.accent}</p>
          <div className="mt-2 md:mt-4 flex items-center gap-2 md:gap-3 border-t border-[var(--ink)]/6 pt-2 md:pt-3">
            <span className="grid size-6 sm:size-7 md:size-9 shrink-0 place-items-center rounded-full bg-[var(--ink)] text-[8px] md:text-[11px] font-semibold text-[var(--bone)]">
              {review.initials}
            </span>
            <div className="min-w-0">
              <div className="truncate text-[10px] sm:text-xs md:text-sm font-semibold text-[var(--ink)]">{review.name}</div>
              <div className="truncate text-[8px] sm:text-[10px] md:text-[11px] text-[var(--muted-foreground)]">{review.role}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

function CenterHub() {
  return (
    <motion.a
      href={GOOGLE_REVIEWS_HUB.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02 }}
      className="group/hub relative z-20 mx-auto block w-[min(38vw,148px)] sm:w-[min(46vw,220px)] md:w-[min(88%,360px)]"
      aria-label="Bekijk Google Reviews van Office Image"
    >
      <div className="relative overflow-hidden rounded-[1.35rem] border border-[var(--ink)]/10 bg-[var(--card)] p-1 sm:p-1.5 md:p-2 shadow-[0_40px_90px_-40px_rgba(17,24,39,0.45)] ring-1 ring-white/60">
        <div className="relative overflow-hidden rounded-[1rem] md:rounded-[1.1rem]">
          <img
            src={GOOGLE_REVIEWS_HUB.centerImage}
            alt="Kantoorinrichting door Office Image"
            className="aspect-[4/5] w-full object-cover transition-transform duration-[1.4s] ease-out group-hover/hub:scale-[1.05]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/75 via-[var(--ink)]/10 to-transparent" />
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
            animate={{ x: ["-120%", "140%"] }}
            transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 4.5, ease: "easeInOut" }}
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3.5 md:p-6 text-[var(--bone)]">
          <div className="flex items-center gap-1 md:gap-2">
            <GoogleMark className="size-3 md:size-4" />
            <span className="text-[7px] md:text-[10px] uppercase tracking-[0.16em] md:tracking-[0.2em] text-[var(--bone)]/75">Google Reviews</span>
          </div>
          <div className="mt-1 md:mt-2 flex items-end gap-2 md:gap-3">
            <span className="font-display text-2xl sm:text-4xl md:text-5xl num leading-none tracking-tight">{GOOGLE_REVIEWS_HUB.rating}</span>
            <div className="pb-0.5 md:pb-1">
              <Stars className="text-[var(--ochre)] [&_svg]:size-2 md:[&_svg]:size-3" />
              <p className="mt-0.5 md:mt-1 text-[7px] sm:text-[9px] md:text-[11px] leading-tight text-[var(--bone)]/65">
                Gebaseerd op {GOOGLE_REVIEWS_HUB.count} beoordelingen
              </p>
            </div>
          </div>
        </div>
      </div>

      <motion.span
        aria-hidden
        className="pointer-events-none absolute -inset-3 rounded-[1.6rem] border border-[var(--ochre)]/25"
        animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.02, 1] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.a>
  );
}

export function GoogleReviewsConstellation({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
}) {
  const [slotForCard, setSlotForCard] = useState(() => GOOGLE_REVIEWS.map((_, i) => i));
  const [swapping, setSwapping] = useState(false);
  const [carouselIdx, setCarouselIdx] = useState(0);

  const swapRandomPair = useCallback(() => {
    const a = Math.floor(Math.random() * GOOGLE_REVIEWS.length);
    let b = Math.floor(Math.random() * GOOGLE_REVIEWS.length);
    while (b === a) b = Math.floor(Math.random() * GOOGLE_REVIEWS.length);

    setSwapping(true);
    setSlotForCard((prev) => {
      const next = [...prev];
      const slotA = next[a];
      next[a] = next[b];
      next[b] = slotA;
      return next;
    });
    window.setTimeout(() => setSwapping(false), 700);
  }, []);

  useEffect(() => {
    const id = window.setInterval(swapRandomPair, 4400);
    return () => window.clearInterval(id);
  }, [swapRandomPair]);

  return (
    <section id="reviews" className="relative overflow-hidden bg-[var(--bone)] py-14 md:py-28 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 section-grain opacity-[0.28]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 50% at 50% 45%, color-mix(in oklab, var(--ochre) 8%, transparent), transparent 70%)",
        }}
      />

      <div className="relative max-w-[1500px] mx-auto px-3.5 md:px-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="eyebrow inline-flex items-center justify-center gap-3 text-[var(--muted-foreground)]">
            <span className="h-px w-6 md:w-8 bg-[var(--clay)]/35" aria-hidden />
            {eyebrow}
            <span className="h-px w-6 md:w-8 bg-[var(--clay)]/35" aria-hidden />
          </div>
          <h2 className="mt-4 md:mt-5 font-display text-[1.35rem] sm:text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1.08] md:leading-[1.05] tracking-tight text-[var(--ink)]">
            {title}
          </h2>
          <p className="mt-3 md:mt-5 text-[var(--muted-foreground)] text-[13px] md:text-lg leading-relaxed">{subtitle}</p>
        </div>

        <div className="relative mt-8 md:mt-20">
          <div className="relative mx-auto h-[min(118vw,560px)] sm:h-[min(100vw,620px)] lg:h-[min(72vh,680px)] max-w-[1180px] overflow-visible">
            <AnimatePresence>
              {GOOGLE_REVIEWS.map((review, cardIdx) => (
                <FloatingReviewCard
                  key={review.id}
                  review={review}
                  slotIndex={slotForCard[cardIdx]}
                  isSwapping={swapping}
                />
              ))}
            </AnimatePresence>

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="pointer-events-auto">
                <CenterHub />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-20">
          <div className="flex items-center justify-between gap-4 mb-5">
            <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted-foreground)]">Meer beoordelingen</span>
            <a
              href={GOOGLE_REVIEWS_HUB.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-[0.18em] text-[var(--clay)] hover:text-[var(--ink)] transition-colors"
            >
              Alle reviews op Google →
            </a>
          </div>

          <div className="relative overflow-hidden hidden md:block">
            <motion.div
              className="flex gap-4"
              animate={{ x: `calc(-${carouselIdx * 25}% - ${carouselIdx * 4}px)` }}
              transition={{ type: "spring", stiffness: 120, damping: 22 }}
            >
              {GOOGLE_REVIEWS.map((review) => (
                <article
                  key={`strip-${review.id}`}
                  className="w-[calc(25%-12px)] min-w-[calc(25%-12px)] shrink-0 rounded-xl border border-[var(--ink)]/8 bg-[var(--card)] p-4"
                >
                  <div className="flex items-center gap-2">
                    <span className="grid size-8 place-items-center rounded-full bg-[var(--sand)] text-[10px] font-semibold text-[var(--ink)]">
                      {review.initials}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">{review.name}</div>
                      <Stars className="scale-75 origin-left" />
                    </div>
                  </div>
                  <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted-foreground)] line-clamp-2">
                    {review.quote}
                  </p>
                </article>
              ))}
            </motion.div>

            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setCarouselIdx((i) => Math.max(0, i - 1))}
                className="grid size-10 place-items-center rounded-full border border-[var(--ink)]/12 text-[var(--ink)] hover:border-[var(--clay)]/35 hover:text-[var(--clay)] transition-colors"
                aria-label="Vorige beoordelingen"
              >
                ←
              </button>
              <div className="flex gap-2">
                {[0, 1, 2].map((dot) => (
                  <button
                    key={dot}
                    type="button"
                    onClick={() => setCarouselIdx(dot)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      carouselIdx === dot ? "w-8 bg-[var(--clay)]" : "w-1.5 bg-[var(--ink)]/15"
                    }`}
                    aria-label={`Pagina ${dot + 1}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setCarouselIdx((i) => Math.min(2, i + 1))}
                className="grid size-10 place-items-center rounded-full border border-[var(--ink)]/12 text-[var(--ink)] hover:border-[var(--clay)]/35 hover:text-[var(--clay)] transition-colors"
                aria-label="Volgende beoordelingen"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
