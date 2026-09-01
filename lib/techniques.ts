/**
 * Hero Technique registry for Field Kit.
 *
 * STATUS: Placeholders until real FLORA Techniques are cloned and customized.
 * Clone I/O lives in lib/clone-bases.ts. After Technique Builder publish,
 * MCP-retrieve each hero and set `slug`, `viewLink`, `status: 'ready'`.
 * The API runs finished Techniques by slug — it does not author them.
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
  /** USD per run from FLORA retrieve; null until confirmed */
  runCostUsd: number | null;
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
      'Miami teaser: exhibition_brief + visual_direction intake; language / board / 3-beat storyboard branches; skip character-lock unless a figure is supplied; human gate select_approved_direction before campaign.',
    cloneBases: [
      'https://app.flora.ai/techniques/dreamscape',
      'https://app.flora.ai/techniques/character-lock',
      'https://app.flora.ai/techniques/video-scene-builder',
    ],
    viewLink: null,
    runCostUsd: null,
    status: 'placeholder',
    chainOrder: 1,
    inputs: [
      {
        id: 'brief',
        name: 'Creative brief',
        type: 'text',
        description: 'Objective, audience, tone, constraints — Field Kit custom input',
        required: true,
      },
      {
        id: 'source_image',
        name: 'Source image',
        type: 'imageUrl',
        description: 'dreamscape primary clone — optional visual direction',
      },
      {
        id: 'character_image',
        name: 'Character image',
        type: 'imageUrl',
        description: 'character-lock clone — optional identity lock',
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
      'Miami teaser: approved_direction + channel_pack; drop merch clone outputs; four channel stills (1:1, newsletter, press, lobby 16:9); human gate favorites six and marks press vs lobby.',
    cloneBases: [
      'https://app.flora.ai/techniques/illustration-branding-design',
      'https://app.flora.ai/techniques/material-3d-logo-render-engine',
    ],
    viewLink: null,
    runCostUsd: null,
    status: 'placeholder',
    chainOrder: 2,
    inputs: [
      {
        id: 'brand_name_info',
        name: 'Brand name + info',
        type: 'text',
        description: 'illustration-branding-design primary clone',
        required: true,
      },
      {
        id: 'logo_or_brand_imagery',
        name: 'Logo or brand imagery',
        type: 'imageUrl',
        description: 'Approved direction or logo from prior step',
        required: true,
      },
      {
        id: 'formats',
        name: 'Formats & audiences',
        type: 'text',
        description: 'Field Kit custom — e.g. 1:1 social, 16:9 OOH',
        required: true,
      },
    ],
    outputs: [
      { id: 'image_composition', name: 'Image composition', type: 'imageUrl' },
      { id: 'tshirt_design', name: 'T-shirt design', type: 'imageUrl' },
      { id: 'display_case', name: 'Display case', type: 'imageUrl' },
      { id: 'window_vinyl_design', name: 'Window vinyl design', type: 'imageUrl' },
      { id: 'sign_design', name: 'Sign design', type: 'imageUrl' },
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
      'Miami teaser: venue_photo + approved_campaign_still + venue_notes; visitor-approach previz; production board (build vs reuse); lobby 16:9; human gate fabrication_needed.',
    cloneBases: [
      'https://app.flora.ai/techniques/wireframe',
      'https://app.flora.ai/techniques/material-3d-logo-render-engine',
    ],
    viewLink: null,
    runCostUsd: null,
    status: 'placeholder',
    chainOrder: 3,
    inputs: [
      {
        id: 'photo',
        name: 'Photo',
        type: 'imageUrl',
        description: 'wireframe primary clone — artwork / object / venue still',
        required: true,
      },
      {
        id: 'venue_notes',
        name: 'Venue & materials',
        type: 'text',
        description: 'Field Kit custom — space constraints, materials, lighting',
        required: true,
      },
    ],
    outputs: [
      {
        id: 'wireframe',
        name: 'Wireframe',
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

/** Display helper — never invent a dollar amount. */
export function formatUsd(amount: number | null): string {
  return amount == null ? 'Pending retrieve' : `$${amount.toFixed(2)}`;
}
