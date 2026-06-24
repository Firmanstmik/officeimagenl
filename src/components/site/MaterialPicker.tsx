import { motion } from "motion/react";
import {
  VISUALIZATION_MATERIALS,
  type VisualizationMaterialId,
} from "@/lib/visualization-data";

type MaterialPickerProps = {
  value: VisualizationMaterialId;
  onChange: (id: VisualizationMaterialId) => void;
  className?: string;
};

export function MaterialPicker({ value, onChange, className = "" }: MaterialPickerProps) {
  const active = VISUALIZATION_MATERIALS.find(m => m.id === value) ?? VISUALIZATION_MATERIALS[0];

  return (
    <div className={className}>
      <div className="eyebrow">Materiaalkeuze</div>
      <div
        className="mt-3 flex gap-2"
        role="radiogroup"
        aria-label="Kies een materiaalafwerking"
      >
        {VISUALIZATION_MATERIALS.map(m => {
          const selected = value === m.id;
          return (
            <button
              key={m.id}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={m.name}
              title={m.name}
              onClick={() => onChange(m.id)}
              className={`relative size-9 shrink-0 overflow-hidden rounded-full border transition-all duration-300 ${
                selected
                  ? "border-[var(--clay)] ring-2 ring-[var(--clay)]/40 ring-offset-2 ring-offset-[var(--bone)] scale-110 shadow-[0_4px_14px_-4px_rgba(184,138,90,0.45)]"
                  : "border-[var(--ink)]/10 hover:border-[var(--ink)]/25 hover:scale-105"
              }`}
            >
              <img
                src={m.swatch}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              {selected && (
                <motion.span
                  layoutId="material-active"
                  className="absolute inset-0 rounded-full border-2 border-white/70"
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
        className="mt-3 text-xs text-[var(--muted-foreground)]"
      >
        <span className="font-medium text-[var(--ink)]">{active.name}</span>
        {" "}
        Preview wordt direct bijgewerkt in de studio
      </motion.p>
    </div>
  );
}
