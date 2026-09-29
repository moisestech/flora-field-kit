# Cursor next sprint — FLORA Field Kit

Use these prompts in order. They are written for the branch `cursor/technique-metadata-custom-domain` and PR #1.

## Current truth

- The recruiter-facing demo loop is built: Brief → Techniques → Run → Review → Report.
- Demo mode must remain usable with **no FLORA API key**.
- The three hero Techniques are still placeholders until they are actually built and published in FLORA.
- FLORA MCP OAuth previously connected, but API retrieve/create returned `403 paid_plan_required`. Do not fabricate IDs, schemas, costs, run results, or View Links.
- `docs/technique-builder-miami.md` is the canonical creative spec for the three hero Techniques.
- `lib/techniques.ts` is the canonical app registry and should match that spec.
- Community clone metadata lives in `lib/clone-bases.ts`; clone I/O is reference material, not the final hero schema.
- Never commit API keys or account screenshots containing sensitive credentials.
- Keep PR #1 draft until all merge gates below pass.

---

# MASTER PROMPT 1 — Pre-FLORA repo hardening

You are the implementation engineer finishing `moisestech/flora-field-kit` as a hiring-quality public work sample.

Work on the existing branch:

`cursor/technique-metadata-custom-domain`

Do not create a second competing branch unless the user explicitly asks.

## Objective

Make the repo internally consistent, testable, and recruiter-legible **before** real FLORA Technique publishing. The application should honestly demonstrate a complete demo-mode client workflow while clearly separating simulated proof from live FLORA proof.

## Read first

Read these files before editing:

1. `README.md`
2. `docs/application.md`
3. `docs/architecture.md`
4. `docs/techniques.md`
5. `docs/technique-builder-miami.md`
6. `docs/media.md`
7. `lib/techniques.ts`
8. `lib/clone-bases.ts`
9. `lib/demo/fixtures.ts`
10. `components/FieldKitConsole.tsx`
11. `app/api/flora/runs/route.ts`
12. `app/api/flora/status/route.ts`
13. `app/api/flora/techniques/route.ts`
14. `.github/workflows/ci.yml`

## Hard constraints

- Do not invent a FLORA Technique slug, `technique_id`, cost, schema, output, View Link, or successful live run.
- Do not change `status` from `placeholder` to `ready` until a real published Technique exists and its external View Link has been verified.
- Do not make paid FLORA calls.
- Do not remove demo mode.
- Do not claim the demo fixtures are real FLORA outputs.
- Do not merge PR #1.
- Do not turn this repo into a general portfolio site.

## Tasks

### 1. Audit registry/spec consistency

Treat `docs/technique-builder-miami.md` as the creative source of truth.

Verify `lib/techniques.ts` matches these intended schemas:

**Narrative World Builder**
Inputs:
- `exhibition_brief` text required
- `visual_direction` text required
- `source_image` image optional
- `character_image` image optional

Outputs:
- `story_breakdown` text
- `visual_language` image
- `storyboard_frames` image

**Campaign Variation System**
Inputs:
- `approved_direction` image required
- `channel_pack` text required
- `audience_note` text required

Outputs:
- `variation_1x1` image
- `variation_newsletter` image
- `variation_press` image
- `variation_lobby_16x9` image
- `variation_set_notes` text

No t-shirt, window-vinyl, generic sign, or other community-clone leftovers should appear as final hero outputs.

**Physical Experience Previsualizer**
Inputs:
- `venue_photo` image required
- `approved_campaign_still` image required
- `venue_notes` text required
- `install_constraints` text required

Outputs:
- `spatial_view` image
- `production_board` image
- `lobby_screen_16x9` image

### 2. Make demo fixtures follow the canonical schemas

Update `lib/demo/fixtures.ts` so every hero's fixture outputs come directly from `HERO_TECHNIQUES` and no stale clone output names leak into the recruiter demo.

Keep fixtures deterministic and clearly labeled as demo fixtures.

Do not pretend a generated SVG is a FLORA result.

### 3. Audit input seeding

Review `FieldKitConsole.tsx` input seeding. Each canonical input should receive a sensible field from `DEMO_BRIEF` rather than every text field receiving the same concatenated block.

Suggested mapping:

- `exhibition_brief` → objective + audience + constraints
- `visual_direction` → visualDirection
- `approved_direction` → demo placeholder/reference URL only in demo mode
- `channel_pack` → channels
- `audience_note` → audience
- `venue_notes` → references + constraints / a clear demo venue note
- `install_constraints` → constraints

If an image input does not have a real URL, leave it clearly as a demo placeholder. Never make an invalid URL look live.

### 4. Strengthen failure handling without adding complexity

The Run screen should display a concise visible error if create or status polling fails. Today it can fall back to `idle` without explaining what happened.

Add a small `runError` state and user-facing error copy.

Do not build a large notification framework.

### 5. Validate CI

`.github/workflows/ci.yml` should run:

- `npm ci`
- `npm run lint`
- `npm run build`

with `DEMO_MODE=1` and without FLORA secrets.

If CI fails, fix the actual lint/build issue. Do not disable lint rules globally or remove type safety just to make CI green.

### 6. Add a minimal smoke test only if it stays small

Playwright is already installed. Add a recruiter-path smoke test if it can be done cleanly:

- home page renders
- heading exists
- Brief → Recommend Techniques
- Technique library displays all three hero names
- starting a demo run reaches Completed
- review screen renders
- report screen/case-study link renders

Add `npm run test:smoke` and include it in CI only if reliable. If browser setup makes CI materially more fragile, document it as the next gate instead of faking completion.

### 7. Audit language

Search for stale claims such as:

- fabricated costs
- "live" when something is actually fixture-driven
- View Links that are only community clone links
- FDC role wording presented as if that listing is definitely still open

Preserve the project as an independent FLORA-shaped work sample. The repo can still say it was originally built around Forward Deployed Creative, but avoid implying a current open role unless externally verified.

## Required verification

Run locally:

```bash
npm ci
npm run lint
npm run build
```

If `test:smoke` exists:

```bash
npm run test:smoke
```

Then manually walk demo mode:

Brief → Techniques → Run → Review → Report.

## Output to user

At the end, report only:

1. Files changed
2. What became stronger
3. Tests run + exact pass/fail result
4. Remaining blockers that require the user's FLORA account
5. Whether PR #1 is safe to merge yet — expected answer is **no** until real View Links are published

---

# MASTER PROMPT 2 — FLORA Technique Builder + MCP pass

Use this only after the user has FLORA access and is ready to build/publish the three real Techniques.

You are the FLORA workflow engineer and evidence auditor for the Field Kit application.

## Objective

Turn the three placeholder hero workflows into real FLORA Techniques that solve one coherent customer brief, publish them as externally viewable proof, and collect only verified metadata needed by the repo.

The canonical brief and build instructions are in:

`docs/technique-builder-miami.md`

Read it fully before doing anything.

## Critical rules

- Do not create billed generations or runs unless the user explicitly authorizes them in the current session.
- Prefer Technique Builder work and metadata retrieval first.
- Never paste or commit `FLORA_API_KEY`.
- Never invent `technique_id`, slug, run cost, schema, output, or View Link.
- Never mark a Technique ready based only on a community clone.
- Never use a private/workspace-only URL as recruiter proof.
- Every published View Link must be tested logged-out/incognito by the user before it is treated as externally viewable.
- Build one Technique completely before spreading effort across all three.

## Build order

### Pass 1 — Narrative World Builder

Start here.

Use the community Techniques identified in the repo as references/bases:

- dreamscape
- character-lock
- video-scene-builder

But make the resulting workflow materially specific to the Miami exhibition brief.

Required characteristics:

- customer-specific brief intake
- museum/institutional tone constraints
- language-system branch
- visual-language branch
- three-beat storyboard branch
- optional character consistency only when a character image exists
- explicit human gate: `select_approved_direction`
- outputs exactly match the canonical repo schema

Before moving on, return:

- exact published Technique name
- exact View Link
- externally visible? yes/no/not yet verified
- exact inputs
- exact outputs
- exact Technique ID/slug if retrievable
- exact run cost if retrievable
- one paragraph: what materially changed from the clone base

Do not build Technique 2 until Technique 1 is coherent enough to show a recruiter.

### Pass 2 — Campaign Variation System

References/bases:

- illustration-branding-design
- material-3d-logo-render-engine

Remove clone-specific merchandising assumptions.

Required outputs are channel adaptations, not merchandise:

- 1:1 Instagram
- newsletter header
- press PDF still
- lobby 16:9
- approval notes

Required human gate:

- approve/favorite selected variations
- distinguish press vs lobby selections

Preserve the approved visual direction rather than inventing a new campaign concept.

Return the same verified metadata set as Pass 1.

### Pass 3 — Physical Experience Previsualizer

References/bases:

- wireframe
- material-3d-logo-render-engine

Required behavior:

- use a real venue reference
- place the approved campaign still into the venue
- show visitor approach
- distinguish existing room conditions from fabrication needs
- produce spatial view + production board + lobby screen 16:9
- human decision gate around `fabrication_needed`

Do not invent dimensions or physical infrastructure that are not provided.

Return the same verified metadata set as Pass 1.

## MCP metadata pass

Only after the Techniques exist:

Use FLORA MCP to retrieve, not create, the three published hero Techniques.

Return for each:

- exact Technique name
- `technique_id` / exact slug expected by the SDK
- exact inputs
- exact outputs
- exact run cost if returned
- exact public View Link if returned

If any field cannot be retrieved, return `unknown` / `not returned`. Never infer it.

## Repo handoff

Do not write repo metadata until the values above are verified.

Once verified and externally viewable, update `lib/techniques.ts`:

- `slug`
- `viewLink`
- `inputs`
- `outputs`
- `runCostUsd` only if actually returned
- `status: 'ready'`

Then update:

- `docs/techniques.md`
- `docs/application.md`
- `README.md`

with honest status.

Do not remove the distinction between demo mode and live mode.

---

# MASTER PROMPT 3 — Post-publish integration and recruiter proof

Use this only after all three real Techniques exist and their View Links are verified externally.

You are finishing the FLORA Field Kit as a recruiter-grade hybrid of:

1. deterministic no-key demo
2. verified FLORA-native workflow evidence
3. optional live API execution

## Objective

Eliminate the remaining gap where a successful live FLORA run still falls back to demo case-study outputs.

## Tasks

### 1. Preserve actual live run results

Inspect:

- `app/api/flora/runs/route.ts`
- `app/api/flora/status/route.ts`
- `components/FieldKitConsole.tsx`
- the actual current `@flora-ai/flora` SDK types/docs

When a live run completes, transform the verified FLORA output payload into the same normalized review shape the UI uses.

The path must become:

`real FLORA run → actual outputs → review → favorites / notes → selected next input → report`

It must not become:

`real FLORA run completed → buildDemoCaseStudy()`

Keep demo mode using deterministic fixtures.

### 2. Chain evidence honestly

If automatic execution of all three Techniques is not implemented, do not fake it.

It is acceptable for the recruiter demo to show a human-mediated chain where the selected output is clearly prepared as the next Technique input.

Prefer a legible human-in-the-loop workflow to brittle automation.

### 3. Replace concept-study proof

Capture verified images from:

- Narrative Technique
- Campaign Technique
- Physical Technique
- final Field Kit review/report using those real outputs

Replace or supplement concept-study imagery only when the new image genuinely shows verified FLORA work.

Every remaining synthetic image must keep a clear `Concept Study` or `Demo fixture` label.

### 4. Recruiter walkthrough

Create the source plan for a 60–90 second walkthrough:

- 0–10s: customer brief/problem
- 10–25s: Narrative Technique + what was changed from the clone
- 25–40s: human review gate → Campaign
- 40–55s: Physical previz / production decision
- 55–70s: Field Kit review + reusable report
- final sentence: what this demonstrates about creative systems, not generic AI generation

Do not over-explain implementation details in the video.

### 5. Final merge gate

PR #1 is safe to merge only when:

- CI is green
- demo mode works without a key
- three real Technique View Links are in the repo
- links are externally verified
- no invented costs/IDs remain
- real screenshots are clearly distinguished from demo fixtures
- README points to the correct production domain
- case-study route works

Report any failed gate instead of merging around it.

---

# MASTER PROMPT 4 — Creative Producer application pivot in `moisestech/moises`

Run this in the separate `moisestech/moises` repo after the Field Kit has at least one real FLORA Technique or when the user explicitly wants to begin the current-role application.

You are creating a **new sibling opportunity dossier** for FLORA's currently open Creative Producer role. Do not rename, overwrite, or delete the existing Forward Deployed Creative dossier.

## Verify before coding

First verify the role is still open at FLORA's official careers page / Ashby listing.

As of the handoff, the role was:

- Creative Producer
- New York City
- full time
- on-site
- GTM
- $125K–$190K + equity

Do not preserve these as current facts if the official listing has changed.

## Positioning

The application should answer:

**Can Moises conceive, direct, make, and ship culturally compelling work in the generative era — and use that creative pressure to help shape FLORA itself?**

Do not lead with software architecture.

Recommended hierarchy:

1. Art / creative point of view
2. Finished work and visual evidence
3. FLORA-native Miami experiment
4. FLORA Field Kit as the systems layer behind the creative process
5. Lore Machine / Oolite / installation / institutional proof
6. Why FLORA + NYC on-site

## Role signals to map directly

Map evidence to the official role's stated needs:

- world-class work under own name / agency / in-house
- carry idea → finished piece quickly and resourcefully
- deep generative-creation fluency
- traditional creative mastery + desire to break conventions
- art direction + production ability
- a strong opinion on the practice/theory/history of generative creation
- brand ambition + commercial sense

Do not claim a credential that is not supported by existing project evidence.

## Critical narrative

The Field Kit should appear as supporting evidence, not the hero:

> I used FLORA to solve a real creative-production problem, then built a companion system around the workflow because the underlying problem of repeatable generative craft interested me.

Avoid:

> I built a portfolio website for your job.

## Implementation constraints

- Create a new route/content object such as `flora-creative-producer`.
- Preserve the old FDC dossier as historical/application evidence.
- Use existing role-portfolio components/design system.
- Reuse only verified images/projects.
- If a FLORA visual is still synthetic, label it `Concept Study`.
- Once real FLORA Technique screenshots exist, prioritize them over speculative diagrams.
- Do not link to a stale FDC Ashby application as the primary CTA.
- Primary CTA should target the verified current Creative Producer listing.

## Output

Before committing, show:

1. proposed hero copy
2. exact selected projects and why
3. evidence mapped to each role criterion
4. any weak criterion that still needs a work sample
5. files you intend to change

Then implement after those choices are internally coherent.
