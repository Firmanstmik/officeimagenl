export const VISUALIZATION_LAYOUTS = [
  {
    id: "open",
    label: "Open kantoor",
    hint: "Maximale flexibiliteit met vrije looplijnen en gedeelde zones.",
    thumb: "/images/visualization/viz-layout-open.webp",
    img: "/images/visualization/viz-layout-open.webp",
  },
  {
    id: "zones",
    label: "Zoning",
    hint: "Werk, overleg en concentratie duidelijk van elkaar gescheiden.",
    thumb: "/images/visualization/viz-layout-zones.webp",
    img: "/images/visualization/viz-layout-zones.webp",
  },
  {
    id: "focus",
    label: "Focus zones",
    hint: "Stille werkplekken en akoestische pods voor geconcentreerd werken.",
    thumb: "/images/visualization/viz-layout-focus.webp",
    img: "/images/visualization/viz-layout-focus.webp",
  },
  {
    id: "meeting",
    label: "Vergader centraal",
    hint: "Vergaderruimtes als hart van het kantoor, werkplekken aan de rand.",
    thumb: "/images/visualization/viz-layout-meeting.webp",
    img: "/images/visualization/viz-layout-meeting.webp",
  },
] as const;

export type VisualizationLayoutId = (typeof VISUALIZATION_LAYOUTS)[number]["id"];

export const VISUALIZATION_MATERIALS = [
  {
    id: "walnoot",
    name: "Walnoot",
    color: "#3b2a20",
    swatch: "/images/materials/swatch-walnoot.webp",
    scenes: {
      concept: "/images/visualization/viz-concept-walnoot.webp",
      render: "/images/visualization/viz-render-walnoot.webp",
      opgeleverd: "/images/visualization/viz-opgeleverd-walnoot.webp",
      zoneWerkplek: "/images/visualization/viz-zone-werkplek-walnoot.webp",
    },
  },
  {
    id: "halifax",
    name: "Halifax",
    color: "#c7956b",
    swatch: "/images/materials/swatch-halifax.webp",
    scenes: {
      concept: "/images/visualization/viz-concept-halifax.webp",
      render: "/images/visualization/viz-render-halifax.webp",
      opgeleverd: "/images/visualization/viz-opgeleverd-halifax.webp",
      zoneWerkplek: "/images/visualization/viz-zone-werkplek-halifax.webp",
    },
  },
  {
    id: "wit",
    name: "Wit",
    color: "#e8dfd1",
    swatch: "/images/materials/swatch-wit.webp",
    scenes: {
      concept: "/images/visualization/viz-concept-wit.webp",
      render: "/images/visualization/viz-render-wit.webp",
      opgeleverd: "/images/visualization/viz-opgeleverd-wit.webp",
      zoneWerkplek: "/images/visualization/viz-zone-werkplek-wit.webp",
    },
  },
  {
    id: "antraciet",
    name: "Antraciet",
    color: "#4a4a4a",
    swatch: "/images/materials/swatch-antraciet.webp",
    scenes: {
      concept: "/images/visualization/viz-concept-antraciet.webp",
      render: "/images/visualization/viz-render-antraciet.webp",
      opgeleverd: "/images/visualization/viz-opgeleverd-antraciet.webp",
      zoneWerkplek: "/images/visualization/viz-zone-werkplek-antraciet.webp",
    },
  },
] as const;

export type VisualizationMaterialId = (typeof VISUALIZATION_MATERIALS)[number]["id"];

export const VISUALIZATION_STEPS = [
  {
    id: "plattegrond",
    label: "Plattegrond",
    step: "01",
    caption: "Indeling & looplijnen",
    description: "Looplijnen, zones en akoestiek eerst op papier opgelost, de basis voor elk succesvol kantoor.",
    detail: "240 m², 1 verdieping",
    img: "/images/visualization/viz-plattegrond.webp",
    zoneA: { img: "/images/visualization/viz-zone-werkplek.webp", label: "Werkzone" },
    zoneB: { img: "/images/visualization/viz-zone-vergader.webp", label: "Vergaderzone" },
    depth: -120,
    scale: 0.92,
  },
  {
    id: "concept",
    label: "Concept",
    step: "02",
    caption: "3D concept & zones",
    description: "Een interactief 3D concept toont hoe zones, meubels en looproutes samenkomen.",
    detail: "Modulair, configureerbaar",
    img: "/images/visualization/viz-concept.webp",
    zoneA: { img: "/images/visualization/viz-zone-werkplek.webp", label: "Zone A" },
    zoneB: { img: "/images/visualization/viz-zone-vergader.webp", label: "Zone B" },
    depth: -40,
    scale: 1,
  },
  {
    id: "render",
    label: "Render",
    step: "03",
    caption: "Fotorealistische render",
    description: "Fotorealistische beelden laten materialen, licht en sfeer tot leven komen vóór bestelling.",
    detail: "Premium, fotorealistisch",
    img: "/images/visualization/viz-render.webp",
    zoneA: { img: "/images/visualization/viz-zone-werkplek.webp", label: "Werkplek" },
    zoneB: { img: "/images/visualization/viz-zone-vergader.webp", label: "Vergaderen" },
    depth: 20,
    scale: 1.04,
  },
  {
    id: "opgeleverd",
    label: "Opgeleverd",
    step: "04",
    caption: "Kantoor klaar voor gebruik",
    description: "Het eindresultaat: ingericht, gemonteerd en klaar, precies zoals goedgekeurd in de render.",
    detail: "100% klanttevredenheid",
    img: "/images/visualization/viz-opgeleverd.webp",
    zoneA: { img: "/images/visualization/viz-zone-werkplek.webp", label: "Live werkplek" },
    zoneB: { img: "/images/visualization/viz-zone-vergader.webp", label: "Live vergaderen" },
    depth: 60,
    scale: 1.08,
  },
] as const;

export type VisualizationStep = (typeof VISUALIZATION_STEPS)[number];
export type VisualizationStepId = VisualizationStep["id"];

export type ResolvedVisualizationScene = VisualizationStep & {
  materialId?: VisualizationMaterialId;
  materialName?: string;
  layoutId?: VisualizationLayoutId;
  layoutName?: string;
  flipKey: string;
};

export function resolveVisualizationScene(
  stepIndex: number,
  materialId: VisualizationMaterialId,
  layoutId: VisualizationLayoutId,
): ResolvedVisualizationScene {
  const step = VISUALIZATION_STEPS[stepIndex] ?? VISUALIZATION_STEPS[2];
  const material =
    VISUALIZATION_MATERIALS.find(m => m.id === materialId) ?? VISUALIZATION_MATERIALS[0];
  const layout =
    VISUALIZATION_LAYOUTS.find(l => l.id === layoutId) ?? VISUALIZATION_LAYOUTS[0];

  if (step.id === "plattegrond") {
    return {
      ...step,
      img: layout.img,
      zoneA: { ...step.zoneA, img: layout.img },
      zoneB: step.zoneB,
      layoutId: layout.id,
      layoutName: layout.label,
      flipKey: `layout-${layout.id}`,
    };
  }

  const materialScene = material.scenes[step.id as "concept" | "render" | "opgeleverd"];

  return {
    ...step,
    img: materialScene,
    zoneA: { ...step.zoneA, img: material.scenes.zoneWerkplek },
    materialId: material.id,
    materialName: material.name,
    flipKey: `material-${material.id}-${step.id}`,
  };
}
