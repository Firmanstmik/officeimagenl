import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

import vidHero1 from "@/assets/hero/vid-hero1.mp4";
import vidHero2 from "@/assets/hero/vid-hero2.mp4";
import vidHero3 from "@/assets/hero/vid-hero3.mp4";
import imgHero from "@/assets/hero/img-hero.jpg";
import { ease } from "@/lib/site-tokens";

const MEDIA_TILES = [
  {
    id: "01",
    type: "video" as const,
    src: vidHero1,
    label: "Inspirerende werkplekken",
    span: "col-span-1 row-span-1 lg:col-span-2 lg:row-span-2",
  },
  {
    id: "02",
    type: "image" as const,
    src: imgHero,
    label: "Office Image standaard",
    span: "col-span-1 row-span-1 lg:col-span-2 lg:row-span-1",
  },
  {
    id: "03",
    type: "video" as const,
    src: vidHero3,
    label: "Mensen en prestaties",
    span: "col-span-1 row-span-1",
  },
  {
    id: "04",
    type: "video" as const,
    src: vidHero2,
    label: "Hoogwaardige omgevingen",
    span: "col-span-1 row-span-1",
  },
];

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
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.45 + index * 0.08, ease }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group/tile relative min-h-0 overflow-hidden rounded-[11px] bg-[#0c1018] ${tile.span}`}
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
          animate={{ scale: hovered ? 1.08 : 1.03 }}
          transition={{ duration: 8, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111827]/75 via-[#111827]/10 to-[#111827]/20" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent to-[var(--clay)]/12 opacity-0 transition-opacity duration-500 group-hover/tile:opacity-100" />

      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-1.5 p-2 sm:p-2.5">
        <span className="num shrink-0 text-[8px] tracking-[0.18em] text-white/85">{tile.id}</span>
        <span
          className="min-w-0 max-w-[74%] text-right text-[7px] leading-[1.45] tracking-[0.05em] text-white/70 opacity-0 transition-opacity duration-500 group-hover/tile:opacity-100 sm:max-w-[11rem] sm:text-[7.5px]"
          style={{ textShadow: "0 1px 6px rgba(0,0,0,0.92), 0 0 1px rgba(0,0,0,0.8)" }}
        >
          {tile.label}
        </span>
      </div>
    </motion.div>
  );
}

export function HeroExperienceCard({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
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
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.95, delay: 0.5, ease }}
      className={`relative w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[380px] xl:max-w-[420px] mx-auto lg:mx-0 lg:ml-auto ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={{ y: hovered ? -5 : 0 }}
        transition={{ duration: 0.65, ease }}
        className="relative"
      >
        <div
          className="relative rounded-[24px] p-px shadow-[0_28px_70px_-24px_rgba(0,0,0,0.7)]"
          style={{
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.04) 40%, rgba(224,122,50,0.24) 100%)",
          }}
        >
          <div className="rounded-[23px] bg-[#0a0e14] p-1">
            <div className="rounded-[19px] bg-[#111827] p-0.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <div className="relative overflow-hidden rounded-[16px] bg-[#0c1018]">
                <div className="grid aspect-[4/3] min-h-[180px] grid-cols-2 grid-rows-2 gap-1 p-1.5 sm:min-h-[200px] lg:aspect-[16/10] lg:grid-cols-4 lg:min-h-[210px]">
                  {MEDIA_TILES.map((tile, i) => (
                    <MediaTile key={tile.id} tile={tile} index={i} />
                  ))}
                </div>

                <div className="border-t border-white/8 bg-[rgba(17,24,39,0.58)] px-3 py-3 backdrop-blur-xl sm:px-3.5 sm:py-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-[8px] font-medium tracking-[0.22em] text-[var(--ochre)] uppercase sm:text-[9px]">
                        Ervaring bij Office Image
                      </p>
                      <p className="mt-1 font-display text-[11px] leading-snug tracking-[-0.02em] text-white sm:text-[13px] sm:leading-snug">
                        Inspirerende werkplekken ontwerpen{" "}
                        <em className="not-italic text-[var(--ochre)]">waar visie en productiviteit samenkomen</em>
                      </p>
                    </div>
                    <div className="hidden shrink-0 sm:flex items-center gap-1">
                      {MEDIA_TILES.map((t) => (
                        <span
                          key={t.id}
                          className="grid size-5 place-items-center rounded border border-white/10 bg-white/5 text-[8px] text-white/50 num"
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
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute -inset-3 -z-10 rounded-[36px] blur-2xl transition-opacity duration-700"
          style={{
            background:
              "radial-gradient(ellipse 85% 65% at 50% 45%, rgba(224,122,50,0.2), transparent 68%)",
            opacity: hovered ? 0.9 : 0.5,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
