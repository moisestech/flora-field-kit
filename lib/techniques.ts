/**
 * Hero Technique registry for Field Kit.
 *
 * STATUS: Placeholders until real FLORA Techniques are cloned and customized.
 * Replace `slug`, `viewLink`, and schema fields after publishing Techniques
 * via FLORA Technique Builder. The API runs finished Techniques by slug —
 * it does not author them.
 *
 * @see docs/architecture.md
 * @see docs/techniques.md
 */

export type TechniqueInputType = 'text' | 'imageUrl' | 'videoUrl';

export type TechniqueInput = {
  id: string;
  name: string;
  type: TechniqueInputType;
  description?: string;
  required?: boolean;
};

export type TechniqueOutput = {
  id: string;
  name: string;
  type: TechniqueInputType;
  description?: string;
};

export type HeroTechnique = {
  id: string;
  /** FLORA technique slug — wire after publish */
  slug: string | null;
  name: string;
  description: string;
  bestUseCase: string;
  /** Background connection for the FDC application narrative */
  backgroundConnection: string;
  /** Why this Technique shape fits the customer brief */
  creativeReasoning: string;
  /** Planned / in-progress customizations vs the community clone */
  modifications: string;
  /** Community Technique URLs used as customization bases */
  cloneBases: string[];
  /** Public View / app link — fill after publishing */
  viewLink: string | null;
  /** Estimated USD per run; live mode overrides from API */
  runCostUsd: number;
  /** Ready for live API runs once slug + View Link are set */
  status: 'placeholder' | 'ready';
  inputs: TechniqueInput[];
  outputs: TechniqueOutput[];
  chainOrder: number;
};

export const HERO_TECHNIQUES: HeroTechnique[] = [
  {
    id: 'narrative-world-builder',
    slug: null,
    name: 'Narrative World Builder',
    description:
      'Story breakdown, visual language, characters, environments, and storyboard frames from a creative brief.',
    bestUseCase: 'IP development, pitch worlds, series / campaign narrative scaffolding',
    backgroundConnection: 'Lore Machine — generative storytelling systems',
    creativeReasoning:
      'Scaffold IP and pitch worlds the way Lore Machine broke narrative into controllable multimedia steps — language first, then visual system, then frames.',
    modifications:
      'Planned: tighter character/environment branches, museum-legible tone locks, cost-aware frame counts, clearer I/O naming for Field Kit forms.',
    cloneBases: [
      'https://app.flora.ai/techniques/dreamscape',
      'https://app.flora.ai/techniques/character-lock',
      'https://app.flora.ai/techniques/video-scene-builder',
    ],
    viewLink: null,
    runCostUsd: 0.12,
    status: 'placeholder',
    chainOrder: 1,
    inputs: [
      {
        id: 'brief',
        name: 'Creative brief',
        type: 'text',
        description: 'Objective, audience, tone, constraints',
        required: true,
      },
      {
        id: 'reference_image',
        name: 'Reference image',
        type: 'imageUrl',
        description: 'Optional visual direction',
      },
    ],
    outputs: [
      {
        id: 'visual_language',
        name: 'Visual language board',
        type: 'imageUrl',
      },
      {
        id: 'story_breakdown',
        name: 'Story breakdown',
        type: 'text',
      },
    ],
  },
  {
    id: 'campaign-variation-system',
    slug: null,
    name: 'Campaign Variation System',
    description:
      'Controlled brand variations across formats and audiences from an approved visual direction.',
    bestUseCase: 'Campaign systems, format packs, audience-specific adaptations',
    backgroundConnection: 'Creative direction and AI production pipelines',
    creativeReasoning:
      'Preserve creative intent while packing formats — campaign systems customers can reuse, not disposable moodboards.',
    modifications:
      'Planned: brand-safe variation constraints, channel presets (1:1 / 16:9 / OOH), human review gates before the next chain step.',
    cloneBases: [
      'https://app.flora.ai/techniques/illustration-branding-design',
      'https://app.flora.ai/techniques/material-3d-logo-render-engine',
    ],
    viewLink: null,
    runCostUsd: 0.18,
    status: 'placeholder',
    chainOrder: 2,
    inputs: [
      {
        id: 'brand_direction',
        name: 'Approved direction',
        type: 'imageUrl',
        description: 'Selected frame or board from prior step',
        required: true,
      },
      {
        id: 'formats',
        name: 'Formats & audiences',
        type: 'text',
        description: 'e.g. 1:1 social, 16:9 OOH, Gen Z / trade',
        required: true,
      },
    ],
    outputs: [
      {
        id: 'variation_set',
        name: 'Variation set',
        type: 'imageUrl',
      },
    ],
  },
  {
    id: 'physical-experience-previsualizer',
    slug: null,
    name: 'Physical Experience Previsualizer',
    description:
      'Artwork/object, venue, materials, spatial views, motion test, and production board for installation work.',
    bestUseCase: 'Exhibition and installation previsualization',
    backgroundConnection: 'Oolite, Bakehouse, and installation practice',
    creativeReasoning:
      'Installation previz from Digilab / Bakehouse practice — materials, lighting, and spatial views before fabrication spend.',
    modifications:
      'Planned: venue constraint checklist, production annotation layer, lobby-screen 16:9 export for stakeholder review.',
    cloneBases: [
      'https://app.flora.ai/techniques/wireframe',
      'https://app.flora.ai/techniques/material-3d-logo-render-engine',
    ],
    viewLink: null,
    runCostUsd: 0.22,
    status: 'placeholder',
    chainOrder: 3,
    inputs: [
      {
        id: 'artwork_or_object',
        name: 'Artwork / object reference',
        type: 'imageUrl',
        required: true,
      },
      {
        id: 'venue_notes',
        name: 'Venue & materials',
        type: 'text',
        description: 'Space constraints, materials, lighting',
        required: true,
      },
    ],
    outputs: [
      {
        id: 'spatial_view',
        name: 'Spatial view',
        type: 'imageUrl',
      },
      {
        id: 'production_board',
        name: 'Production board',
        type: 'imageUrl',
      },
    ],
  },
];

export function getHeroTechnique(id: string): HeroTechnique | undefined {
  return HERO_TECHNIQUES.find((t) => t.id === id);
}

export function techniquesReadyForLive(): boolean {
  return HERO_TECHNIQUES.every((t) => t.status === 'ready' && t.slug);
}
