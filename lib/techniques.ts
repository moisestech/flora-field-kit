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
 * @see docs/technique-builder-miami.md
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
      'Turns an exhibition brief into curator-facing story language, an approved visual spine, and a three-beat teaser storyboard.',
    bestUseCase: 'IP development, pitch worlds, exhibitions, narrative campaign scaffolding',
    backgroundConnection: 'Lore Machine — generative storytelling systems',
    creativeReasoning:
      'Scaffold worlds the way Lore Machine broke narrative into controllable multimedia steps — language first, then visual system, then frames.',
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
        id: 'exhibition_brief',
        name: 'Exhibition brief',
        type: 'text',
        description: 'Objective, audience, and constraints for the Miami exhibition teaser',
        required: true,
      },
      {
        id: 'visual_direction',
        name: 'Visual direction',
        type: 'text',
        description: 'Institutional light, ritual interface, tactile materials; no startup gloss',
        required: true,
      },
      {
        id: 'source_image',
        name: 'Source image',
        type: 'imageUrl',
        description: 'Optional Digilab, Bakehouse, or other visual reference',
      },
      {
        id: 'character_image',
        name: 'Character image',
        type: 'imageUrl',
        description: 'Optional identity-lock branch; leave empty for artwork-led briefs',
      },
    ],
    outputs: [
      {
        id: 'story_breakdown',
        name: 'Story breakdown',
        type: 'text',
        description: 'Curator-facing world bible and three-beat narrative logic',
      },
      {
        id: 'visual_language',
        name: 'Visual language board',
        type: 'imageUrl',
        description: 'Human-approved campaign spine for the next Technique',
      },
      {
        id: 'storyboard_frames',
        name: 'Storyboard frames',
        type: 'imageUrl',
        description: 'Three-beat teaser: approach, encounter, afterimage',
      },
    ],
  },
  {
    id: 'campaign-variation-system',
    slug: null,
    name: 'Campaign Variation System',
    description:
      'Preserves an approved visual direction while adapting it into controlled channel-specific campaign outputs.',
    bestUseCase: 'Campaign systems, format packs, audience-specific adaptations',
    backgroundConnection: 'Creative direction and AI production pipelines',
    creativeReasoning:
      'Preserve creative intent while packing formats — reusable campaign systems rather than disposable moodboards.',
    modifications:
      'Miami teaser: approved_direction + channel_pack + audience_note; remove merch clone outputs; four channel stills (1:1, newsletter, press, lobby 16:9); human gate marks press vs lobby selections.',
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
        id: 'approved_direction',
        name: 'Approved direction',
        type: 'imageUrl',
        description: 'Selected visual language board from Narrative World Builder',
        required: true,
      },
      {
        id: 'channel_pack',
        name: 'Channel pack',
        type: 'text',
        description: '1:1 Instagram · newsletter header · press PDF · lobby 16:9',
        required: true,
      },
      {
        id: 'audience_note',
        name: 'Audience note',
        type: 'text',
        description: 'Curators, residency panels, and culturally fluent collectors',
        required: true,
      },
    ],
    outputs: [
      { id: 'variation_1x1', name: 'Instagram 1:1', type: 'imageUrl' },
      { id: 'variation_newsletter', name: 'Newsletter header', type: 'imageUrl' },
      { id: 'variation_press', name: 'Press PDF still', type: 'imageUrl' },
      { id: 'variation_lobby_16x9', name: 'Lobby screen 16:9', type: 'imageUrl' },
      {
        id: 'variation_set_notes',
        name: 'Variation set notes',
        type: 'text',
        description: 'Which outputs were approved for press and lobby, and why',
      },
    ],
  },
  {
    id: 'physical-experience-previsualizer',
    slug: null,
    name: 'Physical Experience Previsualizer',
    description:
      'Places the approved teaser into a real venue and packages spatial, material, and production decisions before fabrication spend.',
    bestUseCase: 'Exhibition and installation previsualization',
    backgroundConnection: 'Oolite, Bakehouse, and installation practice',
    creativeReasoning:
      'Installation previz from Digilab / Bakehouse practice — materials, lighting, visitor approach, and build-vs-reuse decisions before fabrication spend.',
    modifications:
      'Miami teaser: venue_photo + approved_campaign_still + venue_notes + install_constraints; visitor-approach previz; production board (build vs reuse); lobby 16:9; human gate fabrication_needed.',
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
        id: 'venue_photo',
        name: 'Venue photo',
        type: 'imageUrl',
        description: 'Digilab, Bakehouse, lobby, or other real venue still',
        required: true,
      },
      {
        id: 'approved_campaign_still',
        name: 'Approved campaign still',
        type: 'imageUrl',
        description: 'Selected campaign image from the prior human review gate',
        required: true,
      },
      {
        id: 'venue_notes',
        name: 'Venue notes',
        type: 'text',
        description: 'Space, throw, power, dwell time, materials, lighting',
        required: true,
      },
      {
        id: 'install_constraints',
        name: 'Installation constraints',
        type: 'text',
        description: 'Keep fabrication spend honest; do not invent unavailable dimensions or infrastructure',
        required: true,
      },
    ],
    outputs: [
      {
        id: 'spatial_view',
        name: 'Spatial view',
        type: 'imageUrl',
        description: 'Visitor-approach previsualization in the actual venue',
      },
      {
        id: 'production_board',
        name: 'Production board',
        type: 'imageUrl',
        description: 'Materials, lighting, and what is built versus reused',
      },
      {
        id: 'lobby_screen_16x9',
        name: 'Lobby screen 16:9',
        type: 'imageUrl',
        description: 'Approved campaign still shown as the actual in-room screen experience',
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
