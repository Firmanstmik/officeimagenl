import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { Maximize4, Pause, Play } from "iconsax-reactjs";

import vidHero1 from "@/assets/hero/vid-hero1.mp4";
import vidHero2 from "@/assets/hero/vid-hero2.mp4";
import vidHero3 from "@/assets/hero/vid-hero3.mp4";
import imgHero from "@/assets/hero/img-hero.webp";
import { ease } from "@/lib/site-tokens";

const MEDIA_TILES = [
  {
    id: "02",
    type: "video" as const,
    src: vidHero3,
    label: "Mensen en prestaties",
    featured: false,
  },
  {
    id: "01",
    type: "image" as const,
    src: imgHero,
    label: "Directieset en representatieve werkplekken",
    featured: true,
  },
  {
    id: "03",
    type: "video" as const,
    src: vidHero2,
    label: "Hoogwaardige omgevingen",
    featured: false,
  },
] as const;

function MediaTile({
  tile,
  index,
}: {
  tile: (typeof MEDIA_TILES)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (tile.type !== "video" || !videoRef.current) return;
    void videoRef.current.play().catch(() => undefined);
  }, [tile.type]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.6 + index * 0.09, ease }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group/tile relative min-w-0 overflow-hidden rounded-lg md:rounded-xl border border-white/22 bg-[var(--ink)]/20 shadow-[0_10px_28px_-14px_rgba(0,0,0,0.55)] backdrop-blur-md transition-[border-color,box-shadow,transform] duration-500 hover:border-[var(--ochre)]/50 hover:shadow-[0_14px_36px_-10px_rgba(240,160,96,0.38)] ${
        tile.featured
          ? "z-[2] aspect-[5/3.5] max-md:aspect-[4/3] sm:aspect-[16/11] max-md:-translate-y-0.5 sm:-translate-y-1 md:-translate-y-1.5"
          : "aspect-[16/11] max-md:aspect-[5/3]"
      }`}
    >
      {tile.type === "video" ? (
        <video
          ref={videoRef}
          src={tile.src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover/tile:scale-[1.06]"
        />
      ) : (
        <motion.img
          src={tile.src}
          alt="Hoogwaardige werkplek van Office Image"
          draggable={false}
          animate={{ scale: hovered ? 1.07 : 1.02 }}
          transition={{ duration: 7, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--ink)]/75 via-[var(--ink)]/10 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent to-[var(--ochre)]/22 opacity-0 transition-opacity duration-500 group-hover/tile:opacity-100" />

      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-1.5 p-2 sm:p-2.5">
        <span className="num shrink-0 rounded-md bg-[var(--ink)]/60 px-1.5 py-0.5 text-[8px] tracking-[0.18em] text-white/90 backdrop-blur-sm sm:text-[9px]">
          {tile.id}
        </span>
        <span
          className="min-w-0 max-w-[78%] text-right text-[7px] leading-snug tracking-[0.04em] text-white/80 opacity-0 transition-opacity duration-500 group-hover/tile:opacity-100 sm:text-[8px]"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}
        >
          {tile.label}
        </span>
      </div>
    </motion.div>
  );
}

function VideoControlPill({
  children,
  onClick,
  className = "",
  ariaLabel,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border border-[var(--ochre)]/35 bg-[var(--ink)]/78 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/95 backdrop-blur-md transition-[background-color,border-color,transform,box-shadow] duration-300 hover:border-[var(--ochre)]/55 hover:bg-[var(--ink)]/88 hover:shadow-[0_8px_24px_-10px_rgba(240,160,96,0.35)] active:scale-[0.98] sm:px-3.5 sm:text-[9px] ${className}`}
    >
      {children}
    </button>
  );
}

function FullscreenControlButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label="Video volledig scherm"
      onClick={onClick}
      className="relative grid size-8 shrink-0 place-items-center rounded-[10px] border border-[var(--ochre)]/50 bg-[var(--ink)]/86 text-white backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_0_0_4px_rgba(255,255,255,0.04)] transition-[border-color,background-color,transform,box-shadow] duration-300 hover:border-[var(--ochre)] hover:bg-[var(--ink)]/92 hover:shadow-[0_0_0_1px_rgba(240,160,96,0.4),0_0_0_5px_rgba(240,160,96,0.07)] active:scale-[0.96] sm:size-9"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[3px] rounded-[6px] border border-white/10 bg-[color-mix(in_oklab,var(--ink)_72%,transparent)]"
      />
      <Maximize4 size={15} color="currentColor" variant="Linear" className="relative z-[1]" />
    </button>
  );
}

export function HeroExperienceCard({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = useState(false);
  const [paused, setPaused] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const fsVideoRef = useRef<HTMLVideoElement>(null);

  const togglePlayback = () => {
    const video = bgVideoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().catch(() => undefined);
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  };

  const openFullscreen = () => {
    setFullscreen(true);
    bgVideoRef.current?.pause();
    setPaused(true);
  };

  const closeFullscreen = () => {
    setFullscreen(false);
    const video = bgVideoRef.current;
    if (video) {
      void video.play().catch(() => undefined);
      setPaused(false);
    }
  };

  useEffect(() => {
    void bgVideoRef.current?.play().catch(() => undefined);

    MEDIA_TILES.forEach((tile) => {
      if (tile.type === "video") {
        const v = document.createElement("video");
        v.preload = "auto";
        v.muted = true;
        v.src = tile.src;
        v.load();
      }
    });
    const img = new Image();
    img.src = imgHero;

    const bg = document.createElement("video");
    bg.preload = "auto";
    bg.muted = true;
    bg.src = vidHero1;
    bg.load();
  }, []);

  useEffect(() => {
    if (!fullscreen) return;
    const video = fsVideoRef.current;
    if (!video) return;
    video.currentTime = bgVideoRef.current?.currentTime ?? 0;
    video.muted = false;
    void video.play().catch(() => {
      video.muted = true;
      void video.play().catch(() => undefined);
    });
  }, [fullscreen]);

  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeFullscreen();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [fullscreen]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.95, delay: 0.5, ease }}
      className={`group/hero-card relative w-full max-w-[min(100%,520px)] sm:max-w-[580px] lg:max-w-[620px] xl:max-w-[700px] mx-auto lg:mx-0 lg:mr-auto ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={{ y: hovered ? -8 : 0 }}
        transition={{ duration: 0.65, ease }}
        className="relative"
      >
        <div className="hero-experience-frame relative overflow-hidden rounded-[20px] md:rounded-[26px] p-[1.5px]">
          <div className="relative overflow-hidden rounded-[18px] md:rounded-[24px] aspect-[16/14] sm:aspect-[16/12] md:aspect-[16/11] min-h-[248px] sm:min-h-[325px] lg:min-h-[375px] xl:min-h-[400px]">
            <motion.video
              ref={bgVideoRef}
              src={vidHero1}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onPlay={() => setPaused(false)}
              onPause={() => setPaused(true)}
              animate={{
                scale: hovered ? 1.16 : 1.06,
                filter: hovered
                  ? "brightness(1.08) contrast(1.06) saturate(1.12)"
                  : "brightness(0.96) contrast(1) saturate(1)",
              }}
              transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full object-cover"
            />

            <motion.div
              aria-hidden
              animate={{ opacity: hovered ? 0.42 : 0.72 }}
              transition={{ duration: 0.85, ease }}
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--ink)]/12 via-[var(--ink)]/8 to-[var(--ink)]/68"
            />
            <motion.div
              aria-hidden
              animate={{ opacity: hovered ? 0.35 : 0.12 }}
              transition={{ duration: 0.85, ease }}
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-[var(--ochre)]/28"
            />

            <div
              aria-hidden
              className="hero-experience-video-shine pointer-events-none absolute inset-0 z-[1]"
            />
            <motion.div
              aria-hidden
              initial={false}
              animate={{
                opacity: hovered ? 1 : 0,
                scale: hovered ? 1 : 0.88,
              }}
              transition={{ duration: 0.7, ease }}
              className="pointer-events-none absolute left-1/2 top-[18%] z-[1] h-28 w-28 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(240,160,96,0.38)_0%,transparent_72%)] blur-2xl"
            />

            <div className="pointer-events-none absolute inset-0 z-[2] rounded-[24px] ring-1 ring-inset ring-white/20" />
            <div className="pointer-events-none absolute inset-x-6 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />

            <div className="relative z-[3] flex h-full flex-col">
              <div className="relative shrink-0 px-3.5 pt-3 pb-1 sm:px-5 sm:pt-5 sm:pb-0 md:flex-1 md:min-h-[44%]">
                <motion.div
                  animate={{ opacity: hovered ? 0.72 : 1, y: hovered ? 4 : 0 }}
                  transition={{ duration: 0.45, ease }}
                >
                  <p className="text-[8px] font-medium tracking-[0.22em] text-[var(--ochre)] uppercase sm:text-[10px]">
                    Ervaring bij Office Image
                  </p>
                  <p className="mt-1 max-w-[28ch] font-display text-[11px] leading-snug tracking-[-0.02em] text-white/95 sm:text-[15px] lg:text-base drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)] max-md:line-clamp-2">
                    Inspirerende werkplekken ontwerpen{" "}
                    <em className="not-italic text-[var(--ochre)]">waar visie en productiviteit samenkomen</em>
                  </p>
                </motion.div>

                <AnimatePresence>
                  {hovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
                      className="pointer-events-none absolute inset-3 z-20 sm:inset-4"
                    >
                      <AnimatePresence>
                        {paused && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.28, ease }}
                            className="pointer-events-none absolute right-0 top-0"
                          >
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--ochre)]/35 bg-[var(--ink)]/78 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/92 backdrop-blur-md sm:text-[9px]">
                              <Pause size={12} color="currentColor" variant="Linear" />
                              Pauze
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="pointer-events-auto absolute inset-x-0 bottom-0 flex items-center justify-between gap-3">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={paused ? "play" : "pause"}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 8 }}
                            transition={{ duration: 0.28, ease }}
                          >
                            <VideoControlPill
                              ariaLabel={paused ? "Video afspelen" : "Video pauzeren"}
                              onClick={togglePlayback}
                            >
                              {paused ? (
                                <>
                                  <Play size={12} color="currentColor" variant="Linear" />
                                  Klik om af te spelen
                                </>
                              ) : (
                                <>
                                  <Pause size={12} color="currentColor" variant="Linear" />
                                  Klik om te pauzeren
                                </>
                              )}
                            </VideoControlPill>
                          </motion.div>
                        </AnimatePresence>

                        <FullscreenControlButton onClick={openFullscreen} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-auto min-w-0 px-3 pb-2.5 sm:pl-[18px] sm:pr-6 sm:pb-4">
                <div className="flex min-w-0 items-end gap-1.5 sm:gap-2.5">
                  {MEDIA_TILES.map((tile, i) => (
                    <div
                      key={tile.id}
                      className={`min-w-0 ${tile.featured ? "flex-[1.15] shrink-0" : "flex-1"}`}
                    >
                      <MediaTile tile={tile} index={i} />
                    </div>
                  ))}
                </div>

                <div className="mt-2 flex items-center justify-between gap-2 rounded-lg md:rounded-xl border border-white/12 bg-[var(--ink)]/45 px-2.5 py-1.5 backdrop-blur-md sm:mt-3 sm:px-4 sm:py-2">
                  <span className="text-[7px] uppercase tracking-[0.18em] text-white/55 sm:text-[9px]">
                    Live showroom sfeer
                  </span>
                  <div className="flex items-center gap-1">
                    {MEDIA_TILES.map((t) => (
                      <span
                        key={t.id}
                        className={`grid size-4 place-items-center rounded border text-[7px] num backdrop-blur-sm sm:size-6 sm:text-[9px] ${
                          t.featured
                            ? "border-[var(--ochre)]/45 bg-[var(--ochre)]/15 text-[var(--ochre)]"
                            : "border-white/12 bg-white/6 text-white/55"
                        }`}
                      >
                        {t.id}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute -inset-4 -z-10 rounded-[40px] blur-3xl transition-opacity duration-700"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 45%, rgba(240,160,96,0.32), transparent 70%)",
            opacity: hovered ? 1 : 0.5,
          }}
        />
      </motion.div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {fullscreen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease }}
                className="fixed inset-0 z-[200] flex items-center justify-center bg-[var(--ink)]/96 p-4 backdrop-blur-xl"
                role="dialog"
                aria-modal="true"
                aria-label="Showroom video"
              >
                <button
                  type="button"
                  aria-label="Sluiten"
                  onClick={closeFullscreen}
                  className="absolute inset-0"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: 8 }}
                  transition={{ duration: 0.4, ease }}
                  className="relative z-[1] w-full max-w-6xl overflow-hidden rounded-2xl border border-[var(--ochre)]/35 shadow-[0_40px_120px_-24px_rgba(0,0,0,0.75)]"
                >
                  <video
                    ref={fsVideoRef}
                    src={vidHero1}
                    controls
                    playsInline
                    className="aspect-video w-full bg-black object-cover"
                  />
                  <button
                    type="button"
                    aria-label="Sluiten"
                    onClick={closeFullscreen}
                    className="absolute right-4 top-4 grid size-10 place-items-center rounded-lg border border-white/15 bg-[var(--ink)]/70 text-white/90 backdrop-blur-md transition-colors hover:border-[var(--ochre)]/45"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                    </svg>
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </motion.div>
  );
}
