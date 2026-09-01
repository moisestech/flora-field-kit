/**
 * Recruiter / README stills on Cloudinary (`jobs/flora-toolkit`).
 * Do not put API keys or private workspace chrome in these assets.
 */

export const SITE_URL = 'https://flora-field-kit.moises.tech';

const cld = (file: string, version: number) =>
  `https://res.cloudinary.com/dck5rzi4h/image/upload/v${version}/jobs/flora-toolkit/${file}`;

export const FIELD_KIT_MEDIA = {
  cover: cld('flora-field-kit-readme-cover_m8jnig.png', 1788230102),
  hero: cld('flora-field-kit-readme-hero-3d_avn2my.png', 1788230105),
  socialPreview: cld('flora-field-kit-social-preview_aulfq2.png', 1788230103),
  workflowLoop: cld('flora-field-kit-workflow-loop-3d_idi3l2.png', 1788230106),
  demoVsLive: cld('flora-field-kit-demo-vs-live-3d_goaqr6.png', 1788230106),
  architecture: cld('flora-field-kit-architecture-stack-3d_khfxnp.png', 1788230103),
  techniqueChain: cld('flora-field-kit-technique-chain-3d_ukczqx.png', 1788230107),
  humanReview: cld('flora-field-kit-human-review-3d_wlqzbr.png', 1788230106),
} as const;
