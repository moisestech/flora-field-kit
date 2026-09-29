# Technique Builder — Miami exhibition teaser

Field Kit UI is done. These three heroes are still **placeholders** until they exist as published FLORA Techniques.

FLORA MCP OAuth works; **API retrieve/create is `403 paid_plan_required`** (reconfirmed 2026-08-31). Customize and publish in the [FLORA Technique Builder](https://docs.flora.ai/nodes/technique-builder) at [app.flora.ai](https://app.flora.ai). Upgrade billing when publish or retrieve requires it. **Do not create billed runs** until View Links exist and we explicitly ask for an inventory pass.

Use the **same customer brief** for all three — `DEMO_BRIEF` in [`lib/demo/fixtures.ts`](../lib/demo/fixtures.ts):

| Field | Value |
| --- | --- |
| Objective | Launch a Miami exhibition teaser that positions an AI-mediated installation as museum-legible, not product pitch. |
| Audience | Curators, residency panels, and culturally fluent collectors |
| Visual direction | Cool institutional light, tactile materials, interface glow as ritual object — not neon startup aesthetic |
| References | Oolite Digilab floor plans; prior Bakehouse install stills; Lore Machine world boards |
| Deliverables | Visual language board, 6 campaign variations, venue previz + production board |
| Channels | Instagram 1:1, newsletter header, press PDF, lobby screen 16:9 |
| Constraints | No stock-AI gloss; keep brand marks out of frame; WCAG-friendly contrast on text overlays |

Each hero must be more than renamed clone inputs: **customer-specific intake**, **altered prompt/branch logic**, **a human review or selection gate**, **purpose-built output packaging**.

View Links must be **public or externally accessible unlisted**. Test each URL in an incognito window. Private / workspace-only links are not acceptable.

---

## 01 — Narrative World Builder

**Clone from:** [dreamscape](https://app.flora.ai/techniques/dreamscape) + [character-lock](https://app.flora.ai/techniques/character-lock) + [video-scene-builder](https://app.flora.ai/techniques/video-scene-builder)

**Customer intake (required text, not just an image):**

- `exhibition_brief` — paste the Miami objective + audience + constraints
- `visual_direction` — institutional light / ritual interface / no neon startup
- `source_image` — optional Digilab or Bakehouse still
- `character_image` — optional only if a figure must stay consistent; default off for this brief (artwork-led, not character-led)

**Prompt / branch logic to change:**

- Lock tone: museum wall label, not campaign slogan. Reject product-pitch verbs (launch, unlock, platform, solution).
- Branch A — **language system**: 4–6 sentence world bible (site, ritual, what the visitor does).
- Branch B — **visual language board**: stills that read as cool institutional light + tactile materials.
- Branch C — **storyboard frames**: 3 beats (approach / encounter / afterimage). Cost-aware: three frames, not a six-angle character turnaround.
- Skip character-lock angles unless `character_image` is provided.

**Human gate:** Pause after the visual language board. Operator picks **one** board as the campaign spine before Campaign Variation System may run. Label the node `select_approved_direction`.

**Outputs to publish:**

| Output | Type | Why |
| --- | --- | --- |
| `story_breakdown` | text | Curator-facing world bible |
| `visual_language` | image | Approved spine for the next Technique |
| `storyboard_frames` | image | Three-beat teaser, not a character sheet |

---

## 02 — Campaign Variation System

**Clone from:** [illustration-branding-design](https://app.flora.ai/techniques/illustration-branding-design) + [material-3d-logo-render-engine](https://app.flora.ai/techniques/material-3d-logo-render-engine)

**Customer intake:**

- `approved_direction` — image from Narrative gate (required)
- `channel_pack` — text: `1:1 instagram · newsletter header · press PDF · lobby 16:9`
- `audience_note` — curators / residency panels / collectors (not general social)
- Do **not** require a logo. Brand marks stay out of frame.

**Prompt / branch logic to change:**

- Drop merch defaults (t-shirt, window vinyl, shop sign) as primary outputs. Those are clone leftovers.
- Constrain variation: same spine, four channels. No new color story, no new metaphor.
- Contrast: WCAG-friendly text overlays only; prefer no type on the image if the still can stand alone.
- Material pass is optional and only for object/tactile close-ups — not a 16-material logo render.

**Human gate:** Operator favorites **up to six** variations and marks `selected_for_press` vs `selected_for_lobby`. Unselected renders do not enter Physical previz.

**Outputs to publish:**

| Output | Type | Why |
| --- | --- | --- |
| `variation_1x1` | image | Instagram |
| `variation_newsletter` | image | Header |
| `variation_press` | image | PDF still |
| `variation_lobby_16x9` | image | Lobby screen |
| `variation_set_notes` | text | Which six were approved and why |

---

## 03 — Physical Experience Previsualizer

**Clone from:** [wireframe](https://app.flora.ai/techniques/wireframe) + [material-3d-logo-render-engine](https://app.flora.ai/techniques/material-3d-logo-render-engine)

**Customer intake:**

- `venue_photo` — Digilab / Bakehouse / lobby still (required)
- `approved_campaign_still` — image from Campaign gate
- `venue_notes` — space, throw, power, dwell time, materials
- `install_constraints` — keep fabrication spend honest; no invented square footage

**Prompt / branch logic to change:**

- Wireframe must show visitor approach and screen/object placement, not a generic product wireframe.
- Production board: materials, lighting, what is already in the room vs what must be built.
- One 16:9 lobby-screen export that uses the approved campaign still inside the room.
- Do not invent a new artwork. Previz the teaser **in** the venue.

**Human gate:** Operator accepts or rejects `fabrication_needed`. If rejected, output is “reuse existing room + lobby screen only.”

**Outputs to publish:**

| Output | Type | Why |
| --- | --- | --- |
| `spatial_view` | image | Visitor-approach previz |
| `production_board` | image | Materials / lighting / build vs reuse |
| `lobby_screen_16x9` | image | Stakeholder still for the teaser loop |

---

## Publish and wire (after Builder)

1. Publish each Technique. Copy the View Link.
2. Open the link in an **incognito** window while logged out. If it asks for workspace access, republish as public or unlisted.
3. Enable paid API access if retrieve is still 403.
4. In Cursor: *Use FLORA MCP. Do not create runs. Retrieve the three heroes. Return technique_id, name, inputs, outputs, run_cost, View Link.*
5. Set `slug`, `viewLink`, `inputs` / `outputs`, `runCostUsd`, `status: 'ready'` in [`lib/techniques.ts`](../lib/techniques.ts).
6. Replace concept-study stills only after those View Links resolve.
7. Then record the 60–90s walkthrough. S1–S5 screenshots are enough until then.

Do not merge [PR #1](https://github.com/moisestech/flora-field-kit/pull/1) until the three View Links are wired and incognito-tested.
