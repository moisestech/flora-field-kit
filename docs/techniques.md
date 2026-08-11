# Technique wiring checklist

Field Kit is **paused on published hero Techniques** until the three customized View Links exist.

The console already runs end-to-end in **demo mode** using placeholders in [`lib/techniques.ts`](../lib/techniques.ts). Each hero entry already carries:

- inputs / outputs
- creative reasoning
- planned modifications
- clone bases (from intake below)
- `viewLink` / `slug` (null until publish)

## Clone intake (classified)

| # | Cloned name | View Link | Role |
|---|-------------|-----------|------|
| 1 | character-lock | https://app.flora.ai/techniques/character-lock | Narrative support (identity lock) |
| 2 | image-upscaler | https://app.flora.ai/techniques/image-upscaler | Utility — chain polish |
| 3 | prompt-extractor | https://app.flora.ai/techniques/prompt-extractor | Utility — reverse brief from refs |
| 4 | material-3d-logo-render-engine | https://app.flora.ai/techniques/material-3d-logo-render-engine | Campaign + Physical (materials / object) |
| 5 | illustration-branding-design | https://app.flora.ai/techniques/illustration-branding-design | **Campaign hero base** |
| 6 | wireframe | https://app.flora.ai/techniques/wireframe | **Physical hero base** (+ Narrative structure) |
| 7 | dreamscape | https://app.flora.ai/techniques/dreamscape | **Narrative hero base** |
| 8 | video-scene-builder | https://app.flora.ai/techniques/video-scene-builder | Narrative support (motion / boards) |
| 9 | garment-extractor | https://app.flora.ai/techniques/garment-extractor | Lower priority (fashion-specific) |

Docs: [Technique Builder](https://docs.flora.ai/nodes/technique-builder)

## Ranking → three heroes

| Hero | Primary clones to customize | Why |
|------|-----------------------------|-----|
| Narrative World Builder | dreamscape + character-lock + video-scene-builder | Worlds, identity lock, storyboard/motion |
| Campaign Variation System | illustration-branding-design + material-3d-logo-render-engine | Brand systems + controlled object/material looks |
| Physical Experience Previsualizer | wireframe + material-3d-logo-render-engine | Spatial structure + material/object previz |

## Your next steps in FLORA

1. ~~Clone ~6–10 Techniques~~ — done (9 listed above).
2. ~~Classify and rank~~ — done in this file.
3. **Customize the strongest three** (prompts, branches, models, I/O naming, docs) via Technique Builder.
4. Publish View Links (Private or Workspace is fine for application).
5. Update the hero table below and set `status: 'ready'` in `lib/techniques.ts`.

## Hero registry (current)

| Id | Name | Slug | View Link | Status |
|----|------|------|-----------|--------|
| `narrative-world-builder` | Narrative World Builder | — | — | placeholder |
| `campaign-variation-system` | Campaign Variation System | — | — | placeholder |
| `physical-experience-previsualizer` | Physical Experience Previsualizer | — | — | placeholder |

API key: put only in `.env.local` as `FLORA_API_KEY`. Never commit or paste in chat.

## Application dossier

Outbound narrative lives on moises.tech at `/opportunities/flora-forward-deployed-creative` and links here — do not move app code into the website repo.
