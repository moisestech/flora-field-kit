# Technique wiring checklist

Field Kit is **paused on published hero Techniques** until the three customized View Links exist.

The console already runs end-to-end in **demo mode** using placeholders in [`lib/techniques.ts`](../lib/techniques.ts). Each hero entry already carries:

- inputs / outputs
- creative reasoning
- planned modifications
- clone bases (from intake below)
- `viewLink` / `slug` (null until publish)

## Clone intake (classified)

Public Technique I/O is inventoried in [`lib/clone-bases.ts`](../lib/clone-bases.ts). `techniqueId` / `runCostUsd` stay null until FLORA MCP retrieve succeeds.

**MCP status (2026-08-12):** OAuth to `user-flora` succeeded. `client.workspaces.list` / `client.techniques.retrieve` returned `403 paid_plan_required` — API access needs a paid FLORA account at [app.flora.ai](https://app.flora.ai). Do not retry `execute` until billing is enabled. No runs were created.

| # | Slug | Public I/O (from Technique page) | Role |
|---|------|----------------------------------|------|
| 1 | [character-lock](https://app.flora.ai/techniques/character-lock) | in: Character image → out: Angle 1–6 | Narrative support (identity lock) |
| 2 | [image-upscaler](https://app.flora.ai/techniques/image-upscaler) | in: Image → out: Upscaled image | Utility — chain polish |
| 3 | [prompt-extractor](https://app.flora.ai/techniques/prompt-extractor) | in: Source image → out: Extracted prompt | Utility — reverse brief from refs |
| 4 | [material-3d-logo-render-engine](https://app.flora.ai/techniques/material-3d-logo-render-engine) | in: Logo input → out: Material 1–16 | Campaign + Physical (materials / object) |
| 5 | [illustration-branding-design](https://app.flora.ai/techniques/illustration-branding-design) | in: Brand name + info, Logo → out: composition, t-shirt, display case, vinyl, sign | **Campaign hero base** |
| 6 | [wireframe](https://app.flora.ai/techniques/wireframe) | in: Photo → out: Wireframe | **Physical hero base** |
| 7 | [dreamscape](https://app.flora.ai/techniques/dreamscape) | in: Source image → out: 3 stills + 3 loops | **Narrative hero base** |
| 8 | [video-scene-builder](https://app.flora.ai/techniques/video-scene-builder) | in: Portrait (face) → out: Shotlist visualizer (video) | Narrative support (motion / boards) |
| 9 | [garment-extractor](https://app.flora.ai/techniques/garment-extractor) | in: Outfit, What to extract → out: Extracted flatlay | Lower priority (fashion-specific) |

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
3. **Customize the strongest three** (customer intake, altered prompt/branch logic, human review gate, purpose-built outputs) via Technique Builder.
4. Publish View Links that are **public or externally accessible unlisted** — then test each URL in an incognito window. Private/workspace-only links are not acceptable for the application packet.
5. After paid API access: MCP-retrieve schemas/IDs (no billed runs), then set `slug`, `viewLink`, `runCostUsd`, and `status: 'ready'` in `lib/techniques.ts`.

## Hero registry (current)

| Id | Name | Slug | View Link | Status |
|----|------|------|-----------|--------|
| `narrative-world-builder` | Narrative World Builder | — | — | placeholder |
| `campaign-variation-system` | Campaign Variation System | — | — | placeholder |
| `physical-experience-previsualizer` | Physical Experience Previsualizer | — | — | placeholder |

API key: put only in `.env.local` as `FLORA_API_KEY`. Never commit or paste in chat.

## Cursor + FLORA MCP (inventory, then wire)

Project MCP config: [`.cursor/mcp.json`](../.cursor/mcp.json) → `https://agents.flora.ai/mcp`.

1. Cursor Settings → MCP → Connect `flora` (OAuth).
2. Ask: *Use FLORA MCP. List Techniques. Match clone bases below. Retrieve each — id, name, inputs, outputs, run_cost. Do not create runs.*
3. Sync clone schemas into [`lib/clone-bases.ts`](../lib/clone-bases.ts) (`status` on heroes stays `placeholder` until custom publish).
4. After Technique Builder publish, follow Pass 3 below.

Do not `runs.create` / `generations.create` unless asked — those are billed.

## After Technique Builder publish (Pass 3)

When the three customized heroes exist in the FLORA workspace, ask Cursor:

> Use FLORA MCP. Do not create runs. Retrieve Techniques named Narrative World Builder, Campaign Variation System, and Physical Experience Previsualizer. Return technique_id, name, inputs, outputs, run_cost, and the public View Link if present.

Then set in [`lib/techniques.ts`](../lib/techniques.ts) for each hero:

- `slug` — technique id or slug the API `runs.create` expects
- `viewLink` — `https://app.flora.ai/techniques/…`
- `inputs` / `outputs` / `runCostUsd` — from retrieve
- `status: 'ready'`

Until then the hero table stays placeholder. Live Field Kit still needs `FLORA_API_KEY` in `.env.local` (MCP OAuth does not replace Vercel live mode).

Heroes were searched via MCP after OAuth; retrieve is blocked on `paid_plan_required`, and no custom hero names were returned. Keep `slug: null`, `viewLink: null`, `status: 'placeholder'` until Technique Builder publish **and** paid API access.

## Application dossier

Outbound narrative lives on moises.tech at `/opportunities/flora-forward-deployed-creative` and links here — do not move app code into the website repo.
