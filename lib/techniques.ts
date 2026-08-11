/**
 * Hero Technique registry for Field Kit.
 *
 * STATUS: Placeholders until real FLORA Techniques are cloned and customized.
 * Replace `slug`, `viewLink`, and schema fields after publishing Techniques
 * via FLORA Technique Builder. The API runs finished Techniques by slug —
 * it does not author them.
 *
 * @see docs/architecture.md
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
