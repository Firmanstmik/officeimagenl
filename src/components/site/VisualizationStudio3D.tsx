import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { PaperFlipImage } from "@/components/site/PaperFlipImage";
import {
  resolveVisualizationScene,
  type VisualizationLayoutId,
  type VisualizationMaterialId,
} from "@/lib/visualization-data";

function CornerBracket({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 10V4h6M20 14v6h-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function VisualizationStudio3D({
  activeTab,
  activeMaterial,
  activeLayout,
  flipVersion,
}: {
  activeTab: number;
  activeMaterial: VisualizationMaterialId;
  activeLayout: VisualizationLayoutId;
  flipVersion: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [12, -12]), { stiffness: 80, damping: 18 });
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [-8, 8]), { stiffness: 80, damping: 18 });

  const scene = resolveVisualizationScene(activeTab, activeMaterial, activeLayout);
  const isPlattegrond = scene.id === "plattegrond";

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

  const mainAlt = isPlattegrond
    ? `${scene.label}, ${scene.layoutName ?? "indeling"}`
    : `${scene.label}, ${scene.materialName ?? "materiaal"}`;

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
          className="absolute inset-[8%] [transform-style:preserve-3d]"
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

          {!isPlattegrond && (
            <>
              <motion.div
                key={`zone-a-${scene.flipKey}`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute left-[6%] top-[16%] h-[44%] w-[30%] overflow-hidden rounded-xl border border-white/10 bg-[#151b24]/80 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-sm"
                style={{ transform: "translateZ(-90px) rotateY(18deg)" }}
              >
                <motion.img
                  key={scene.zoneA.img}
                  src={scene.zoneA.img}
                  alt={scene.zoneA.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.85, y: [0, -6, 0] }}
                  transition={{ opacity: { duration: 0.4 }, y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" } }}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f14]/80 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 text-[9px] uppercase tracking-[0.2em] text-white/55">{scene.zoneA.label}</span>
              </motion.div>

              <motion.div
                key={`zone-b-${scene.id}`}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="absolute right-[4%] top-[20%] h-[38%] w-[26%] overflow-hidden rounded-xl border border-white/10 bg-[#151b24]/80 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-sm"
                style={{ transform: "translateZ(-50px) rotateY(-16deg)" }}
              >
                <motion.img
                  key={scene.zoneB.img}
                  src={scene.zoneB.img}
                  alt={scene.zoneB.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8, y: [0, 8, 0] }}
                  transition={{ opacity: { duration: 0.4 }, y: { duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 } }}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f14]/80 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 text-[9px] uppercase tracking-[0.2em] text-white/55">{scene.zoneB.label}</span>
              </motion.div>
            </>
          )}

          <motion.div
            key={scene.flipKey}
            animate={{ scale: scene.scale }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-[6%] h-[70%] w-[80%] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/15 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)_inset]"
            style={{ transform: `translateZ(${scene.depth}px)` }}
          >
            <PaperFlipImage
              src={scene.img}
              alt={mainAlt}
              flipVersion={flipVersion}
              className="h-full w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--ochre)]/10 via-transparent to-white/10 mix-blend-screen pointer-events-none" />
            <div
              className="absolute inset-0 opacity-[0.12] pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.35) 2px, rgba(255,255,255,0.35) 3px)",
              }}
            />
            <motion.div
              className="absolute inset-x-0 top-0 h-[38%] bg-gradient-to-b from-white/20 to-transparent pointer-events-none"
              animate={{ y: ["-100%", "120%"] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "linear", repeatDelay: 2.2 }}
            />
          </motion.div>

          <motion.div
            className="absolute left-1/2 top-[5%] h-[72%] w-[82%] -translate-x-1/2 rounded-2xl border border-[var(--ochre)]/25 pointer-events-none"
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

      <div className="pointer-events-none absolute right-4 top-4 flex flex-col items-end gap-1.5">
        <div className="rounded-lg border border-white/10 bg-black/35 px-2.5 py-1.5 text-[10px] num text-white/55 backdrop-blur-md">
          {scene.detail}
        </div>
        {(scene.materialName || scene.layoutName) && (
          <div className="rounded-lg border border-[var(--ochre)]/25 bg-black/35 px-2.5 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[var(--ochre)] backdrop-blur-md">
            {scene.layoutName ?? scene.materialName}
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(0,0,0,0.45)_100%)]" />
    </div>
  );
}
