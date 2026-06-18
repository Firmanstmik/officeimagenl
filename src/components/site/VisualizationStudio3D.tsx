import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

import viz from "@/assets/visualization.jpg";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import empty from "@/assets/process-empty.jpg";

const TAB_SCENES = [
  { img: empty, label: "Plattegrond", depth: -120, scale: 0.92 },
  { img: viz, label: "Concept", depth: -40, scale: 1 },
  { img: p2, label: "Render", depth: 20, scale: 1.04 },
  { img: p3, label: "Opgeleverd", depth: 60, scale: 1.08 },
] as const;

function CornerBracket({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 10V4h6M20 14v6h-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function VisualizationStudio3D({ activeTab }: { activeTab: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [14, -14]), { stiffness: 80, damping: 18 });
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [-10, 10]), { stiffness: 80, damping: 18 });

  const scene = TAB_SCENES[activeTab] ?? TAB_SCENES[2];

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div
      ref={wrapRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="relative aspect-[4/3] overflow-hidden bg-[#0b0f14] touch-pan-y"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,rgba(240,160,96,0.18),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_100%,rgba(17,24,39,0.85),transparent_65%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
        }}
      />

      <div className="absolute inset-0 [perspective:1400px]">
        <motion.div
          className="absolute inset-[10%] [transform-style:preserve-3d]"
          style={{ rotateX, rotateY }}
        >
          <motion.div
            className="absolute left-1/2 top-[58%] h-[55%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-[2px] border border-[var(--ochre)]/20"
            style={{
              transform: "rotateX(78deg) translateZ(-180px)",
              backgroundImage:
                "linear-gradient(rgba(240,160,96,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(240,160,96,0.22) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
              boxShadow: "0 0 80px rgba(240,160,96,0.12)",
            }}
            animate={{ opacity: [0.55, 0.85, 0.55] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute left-[8%] top-[18%] h-[48%] w-[34%] overflow-hidden rounded-xl border border-white/10 bg-[#151b24]/80 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-sm"
            style={{ transform: "translateZ(-90px) rotateY(18deg)" }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src={p1} alt="" className="h-full w-full object-cover opacity-80" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f14]/80 via-transparent to-transparent" />
            <span className="absolute bottom-2 left-2 text-[9px] uppercase tracking-[0.2em] text-white/45">Zone A</span>
          </motion.div>

          <motion.div
            className="absolute right-[6%] top-[24%] h-[42%] w-[30%] overflow-hidden rounded-xl border border-white/10 bg-[#151b24]/80 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-sm"
            style={{ transform: "translateZ(-50px) rotateY(-16deg)" }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          >
            <img src={p2} alt="" className="h-full w-full object-cover opacity-75" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f14]/80 via-transparent to-transparent" />
            <span className="absolute bottom-2 left-2 text-[9px] uppercase tracking-[0.2em] text-white/45">Zone B</span>
          </motion.div>

          <motion.div
            key={scene.label}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: scene.scale }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-[12%] h-[62%] w-[72%] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/15 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)_inset]"
            style={{ transform: `translateZ(${scene.depth}px)` }}
          >
            <img src={scene.img} alt={scene.label} className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--ochre)]/10 via-transparent to-white/10 mix-blend-screen" />
            <div
              className="absolute inset-0 opacity-[0.18]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.35) 2px, rgba(255,255,255,0.35) 3px)",
              }}
            />
            <motion.div
              className="absolute inset-x-0 top-0 h-[38%] bg-gradient-to-b from-white/20 to-transparent"
              animate={{ y: ["-100%", "120%"] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "linear", repeatDelay: 2.2 }}
            />
          </motion.div>

          <motion.div
            className="absolute left-1/2 top-[10%] h-[64%] w-[74%] -translate-x-1/2 rounded-2xl border border-[var(--ochre)]/25"
            style={{ transform: "translateZ(95px)" }}
            animate={{ opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-4 text-[var(--ochre)]/55">
        <CornerBracket className="absolute left-0 top-0 size-5" />
        <CornerBracket className="absolute right-0 top-0 size-5 rotate-90" />
        <CornerBracket className="absolute bottom-0 left-0 size-5 -rotate-90" />
        <CornerBracket className="absolute bottom-0 right-0 size-5 rotate-180" />
      </div>

      <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1.5 backdrop-blur-md">
        <span className="size-1.5 rounded-full bg-[var(--ochre)] animate-pulse" />
        <span className="text-[10px] uppercase tracking-[0.22em] text-white/70">Live 3D studio</span>
      </div>

      <div className="pointer-events-none absolute right-4 top-4 rounded-lg border border-white/10 bg-black/35 px-2.5 py-1.5 text-[10px] num text-white/55 backdrop-blur-md">
        240 m² · {scene.label}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(0,0,0,0.45)_100%)]" />
    </div>
  );
}
