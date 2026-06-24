import { motion } from "motion/react";
import {
  VISUALIZATION_LAYOUTS,
  type VisualizationLayoutId,
} from "@/lib/visualization-data";

type LayoutPickerProps = {
  value: VisualizationLayoutId;
  onChange: (id: VisualizationLayoutId) => void;
  className?: string;
};

export function LayoutPicker({ value, onChange, className = "" }: LayoutPickerProps) {
  const active = VISUALIZATION_LAYOUTS.find(l => l.id === value) ?? VISUALIZATION_LAYOUTS[0];

  return (
    <div className={className}>
      <div className="eyebrow">Indelingskeuze</div>
      <div
        className="mt-3 grid grid-cols-2 gap-2"
        role="radiogroup"
        aria-label="Kies een kantoorindeling"
      >
        {VISUALIZATION_LAYOUTS.map(layout => {
          const selected = value === layout.id;
          return (
            <button
              key={layout.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(layout.id)}
              className={`group relative overflow-hidden rounded-xl border text-left transition-all duration-300 ${
                selected
                  ? "border-[var(--clay)]/45 bg-[var(--sand)]/50 shadow-[0_8px_24px_-12px_rgba(184,138,90,0.28)] ring-1 ring-[var(--clay)]/20"
                  : "border-[var(--ink)]/8 bg-[var(--card)] hover:border-[var(--ink)]/15"
              }`}
            >
              <div className="aspect-[5/3] overflow-hidden bg-[var(--sand)]/40">
                <img
                  src={layout.thumb}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="px-2.5 py-2">
                <div className={`text-[11px] font-medium leading-tight ${selected ? "text-[var(--ink)]" : "text-[var(--ink)]/75"}`}>
                  {layout.label}
                </div>
              </div>
              {selected && (
                <motion.span
                  layoutId="layout-active"
                  className="absolute inset-0 rounded-xl border-2 border-[var(--clay)]/35 pointer-events-none"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}
            </button>
          );
        })}
      </div>
      <motion.p
        key={active.id}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-3 text-xs text-[var(--muted-foreground)] leading-relaxed"
      >
        <span className="font-medium text-[var(--ink)]">{active.label}</span>
        {" "}
        {active.hint}
      </motion.p>
    </div>
  );
}
