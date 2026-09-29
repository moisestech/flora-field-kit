/**
 * Community clone bases classified for Field Kit heroes.
 *
 * I/O below is from public Technique pages (app.flora.ai/techniques/…).
 * MCP OAuth works; `execute` list/retrieve currently returns 403
 * `paid_plan_required`. Fill `techniqueId` and `runCostUsd` after paid API access.
 *
 * @see docs/techniques.md
 */

import type { TechniqueInput, TechniqueOutput } from './techniques';

export type CloneBaseRecord = {
  slug: string;
  name: string;
  viewLink: string;
  role: string;
  /** Set from MCP `client.techniques.retrieve` */
  techniqueId: string | null;
  /** USD; set from MCP `run_cost` */
  runCostUsd: number | null;
  inputs: TechniqueInput[];
  outputs: TechniqueOutput[];
  schemaSource: 'public-page' | 'mcp-retrieve';
};

export const CLONE_BASES: CloneBaseRecord[] = [
  {
    slug: 'dreamscape',
    name: 'Dreamscape',
    viewLink: 'https://app.flora.ai/techniques/dreamscape',
    role: 'Narrative hero base',
    techniqueId: null,
    runCostUsd: null,
    schemaSource: 'public-page',
    inputs: [
      {
        id: 'source_image',
        name: 'Source image',
        type: 'imageUrl',
        required: true,
      },
    ],
    outputs: [
      { id: 'image_output_1', name: 'Image output 1', type: 'imageUrl' },
      { id: 'image_output_2', name: 'Image output 2', type: 'imageUrl' },
      { id: 'image_output_3', name: 'Image output 3', type: 'imageUrl' },
      { id: 'loop_animation_1', name: 'Loop animation 1', type: 'videoUrl' },
      { id: 'loop_animation_2', name: 'Loop animation 2', type: 'videoUrl' },
      { id: 'loop_animation_3', name: 'Loop animation 3', type: 'videoUrl' },
    ],
  },
  {
    slug: 'character-lock',
    name: 'Character Lock',
    viewLink: 'https://app.flora.ai/techniques/character-lock',
    role: 'Narrative support (identity lock)',
    techniqueId: null,
    runCostUsd: null,
    schemaSource: 'public-page',
    inputs: [
      {
        id: 'character_image',
        name: 'Character image',
        type: 'imageUrl',
        required: true,
      },
    ],
    outputs: [
      { id: 'angle_1', name: 'Angle 1', type: 'imageUrl' },
      { id: 'angle_2', name: 'Angle 2', type: 'imageUrl' },
      { id: 'angle_3', name: 'Angle 3', type: 'imageUrl' },
      { id: 'angle_4', name: 'Angle 4', type: 'imageUrl' },
      { id: 'angle_5', name: 'Angle 5', type: 'imageUrl' },
      { id: 'angle_6', name: 'Angle 6', type: 'imageUrl' },
    ],
  },
  {
    slug: 'video-scene-builder',
    name: 'Video Scene Builder',
    viewLink: 'https://app.flora.ai/techniques/video-scene-builder',
    role: 'Narrative support (motion / boards)',
    techniqueId: null,
    runCostUsd: null,
    schemaSource: 'public-page',
    inputs: [
      {
        id: 'input_image',
        name: 'Input image (with face)',
        type: 'imageUrl',
        required: true,
      },
    ],
    outputs: [
      { id: 'shotlist_visualizer', name: 'Shotlist visualizer', type: 'videoUrl' },
    ],
  },
  {
    slug: 'illustration-branding-design',
    name: 'Illustration Branding Design',
    viewLink: 'https://app.flora.ai/techniques/illustration-branding-design',
    role: 'Campaign hero base',
    techniqueId: null,
    runCostUsd: null,
    schemaSource: 'public-page',
    inputs: [
      {
        id: 'brand_name_info',
        name: 'Brand name + info',
        type: 'text',
        required: true,
      },
      {
        id: 'logo_or_brand_imagery',
        name: 'Logo or brand imagery',
        type: 'imageUrl',
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
    slug: 'material-3d-logo-render-engine',
    name: 'Material 3D Logo Render Engine',
    viewLink: 'https://app.flora.ai/techniques/material-3d-logo-render-engine',
    role: 'Campaign + Physical (materials / object)',
    techniqueId: null,
    runCostUsd: null,
    schemaSource: 'public-page',
    inputs: [
      {
        id: 'logo_input',
        name: 'Logo input',
        type: 'imageUrl',
        required: true,
      },
    ],
    outputs: Array.from({ length: 16 }, (_, i) => ({
      id: `material_${i + 1}`,
      name: `Material ${i + 1}`,
      type: 'imageUrl' as const,
    })),
  },
  {
    slug: 'wireframe',
    name: 'Photo Wireframe',
    viewLink: 'https://app.flora.ai/techniques/wireframe',
    role: 'Physical hero base',
    techniqueId: null,
    runCostUsd: null,
    schemaSource: 'public-page',
    inputs: [
      {
        id: 'photo',
        name: 'Photo',
        type: 'imageUrl',
        required: true,
      },
    ],
    outputs: [{ id: 'wireframe', name: 'Wireframe', type: 'imageUrl' }],
  },
  {
    slug: 'image-upscaler',
    name: 'Image Upscaler',
    viewLink: 'https://app.flora.ai/techniques/image-upscaler',
    role: 'Utility — chain polish',
    techniqueId: null,
    runCostUsd: null,
    schemaSource: 'public-page',
    inputs: [
      { id: 'image', name: 'Image', type: 'imageUrl', required: true },
    ],
    outputs: [{ id: 'upscaled_image', name: 'Upscaled image', type: 'imageUrl' }],
  },
  {
    slug: 'prompt-extractor',
    name: 'Prompt Extractor',
    viewLink: 'https://app.flora.ai/techniques/prompt-extractor',
    role: 'Utility — reverse brief from refs',
    techniqueId: null,
    runCostUsd: null,
    schemaSource: 'public-page',
    inputs: [
      { id: 'source_image', name: 'Source image', type: 'imageUrl', required: true },
    ],
    outputs: [{ id: 'extracted_prompt', name: 'Extracted prompt', type: 'text' }],
  },
  {
    slug: 'garment-extractor',
    name: 'Garment Extractor',
    viewLink: 'https://app.flora.ai/techniques/garment-extractor',
    role: 'Lower priority (fashion-specific)',
    techniqueId: null,
    runCostUsd: null,
    schemaSource: 'public-page',
    inputs: [
      { id: 'outfit', name: 'Outfit', type: 'imageUrl', required: true },
      { id: 'what_to_extract', name: 'What to extract', type: 'text', required: true },
    ],
    outputs: [{ id: 'extracted_flatlay', name: 'Extracted flatlay', type: 'imageUrl' }],
  },
];

export function getCloneBase(slug: string): CloneBaseRecord | undefined {
  return CLONE_BASES.find((c) => c.slug === slug);
}
