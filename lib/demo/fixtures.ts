import type { HeroTechnique } from '../techniques';
import { HERO_TECHNIQUES } from '../techniques';

export type CreativeBrief = {
  objective: string;
  audience: string;
  visualDirection: string;
  references: string;
  deliverables: string;
  channels: string;
  constraints: string;
};

export type DemoOutput = {
  outputId: string;
  name: string;
  type: 'text' | 'imageUrl' | 'videoUrl';
  /** Placeholder preview copy or SVG data URL */
  value: string;
  favorited?: boolean;
  notes?: string;
};

export type DemoRunStep = {
  techniqueId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  chargedCost: number | null;
  outputs: DemoOutput[];
};

export type DemoCaseStudy = {
  id: string;
  createdAt: string;
  brief: CreativeBrief;
  recommendedTechniqueIds: string[];
  steps: DemoRunStep[];
  selectedDirection: string;
  creativeReasoning: string;
};

export const DEMO_BRIEF: CreativeBrief = {
  objective:
    'Launch a Miami exhibition teaser that positions an AI-mediated installation as museum-legible, not product pitch.',
  audience: 'Curators, residency panels, and culturally fluent collectors',
  visualDirection:
    'Cool institutional light, tactile materials, interface glow as ritual object — not neon startup aesthetic',
  references: 'Oolite Digilab floor plans; prior Bakehouse install stills; Lore Machine world boards',
  deliverables: 'Visual language board, 6 campaign variations, venue previz + production board',
  channels: 'Instagram 1:1, newsletter header, press PDF, lobby screen 16:9',
  constraints: 'No stock-AI gloss; keep brand marks out of frame; WCAG-friendly contrast on text overlays',
};

/** Deterministic SVG placeholders so the demo needs no external media. */
function boardSvg(label: string, hue: number): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="640" viewBox="0 0 960 640">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsl(${hue} 28% 18%)"/>
      <stop offset="100%" stop-color="hsl(${hue + 40} 22% 28%)"/>
    </linearGradient>
  </defs>
  <rect width="960" height="640" fill="url(#g)"/>
  <rect x="48" y="48" width="864" height="544" fill="none" stroke="hsl(40 20% 78% / 0.35)" stroke-width="1"/>
  <text x="80" y="120" fill="hsl(40 30% 92%)" font-family="ui-sans-serif,system-ui" font-size="28" font-weight="600">${label}</text>
  <text x="80" y="160" fill="hsl(40 15% 70%)" font-family="ui-sans-serif,system-ui" font-size="16">Demo fixture · FLORA Field Kit</text>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function recommendTechniques(brief: CreativeBrief): HeroTechnique[] {
  void brief;
  return [...HERO_TECHNIQUES].sort((a, b) => a.chainOrder - b.chainOrder);
}

export function buildDemoCaseStudy(brief: CreativeBrief = DEMO_BRIEF): DemoCaseStudy {
  const recommended = recommendTechniques(brief);

  const steps: DemoRunStep[] = recommended.map((technique, index) => ({
    techniqueId: technique.id,
    status: 'completed',
    progress: 100,
    chargedCost: technique.runCostUsd,
    outputs: technique.outputs.map((output, oi) => ({
      outputId: output.id,
      name: output.name,
      type: output.type,
      value:
        output.type === 'text'
          ? `Fixture ${output.name} for “${brief.objective.slice(0, 72)}…”`
          : boardSvg(output.name, 200 + index * 35 + oi * 12),
      favorited: oi === 0,
      notes: oi === 0 ? 'Selected as chain input for the next Technique.' : undefined,
    })),
  }));

  return {
    id: 'demo-miami-exhibition-teaser',
    createdAt: '2026-08-10T18:00:00.000Z',
    brief,
    recommendedTechniqueIds: recommended.map((t) => t.id),
    steps,
    selectedDirection:
      'Institutional cool light + ritual interface object — approved as campaign spine.',
    creativeReasoning:
      'Brief asked for museum-legible framing. Narrative World Builder locked visual language; Campaign Variation System stretched formats without drifting brand tone; Physical Experience Previsualizer grounded the teaser in a real venue so the pack reads as production, not moodboard.',
  };
}

/** Simulated async progress ticks for the run console UI. */
export const DEMO_PROGRESS_TICKS = [0, 18, 42, 67, 88, 100] as const;
