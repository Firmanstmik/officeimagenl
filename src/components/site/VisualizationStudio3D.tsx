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
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [4, -4]), { stiffness: 80, damping: 18 });
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [-3, 3]), { stiffness: 80, damping: 18 });

  const scene = resolveVisualizationScene(activeTab, activeMaterial, activeLayout);

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

  const mainAlt = scene.id === "plattegrond"
    ? `${scene.label}, ${scene.layoutName ?? "indeling"}`
    : `${scene.label}, ${scene.materialName ?? "materiaal"}`;

  return (
    <div
      ref={wrapRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="relative aspect-[4/3] overflow-hidden bg-[#0b0f14] touch-pan-y"
    >
      <div className="absolute inset-0 [perspective:1400px]">
        <motion.div
          className="absolute inset-0 [transform-style:preserve-3d]"
          style={{ rotateX, rotateY }}
        >
          <motion.div
            key={scene.flipKey}
            animate={{ scale: scene.scale }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 overflow-hidden"
          >
            <PaperFlipImage
              src={scene.img}
              alt={mainAlt}
              flipVersion={flipVersion}
              className="h-full w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--ochre)]/8 via-transparent to-white/5 mix-blend-screen pointer-events-none" />
            <motion.div
              className="absolute inset-x-0 top-0 h-[32%] bg-gradient-to-b from-white/15 to-transparent pointer-events-none"
              animate={{ y: ["-100%", "120%"] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "linear", repeatDelay: 2.2 }}
            />
          </motion.div>
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

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.35)_100%)]" />
    </div>
  );
}
