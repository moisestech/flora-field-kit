# FLORA Field Kit — media & diagrams inventory

Assets the **README**, Open Graph, and recruiter walkthrough need. Status: `needed` = not in repo yet; `placeholder` = SVG fallback; `ready` = final asset.

3D stills and the social preview live on Cloudinary folder `jobs/flora-toolkit` (URLs in [`lib/media.ts`](../lib/media.ts)). SVG fallbacks stay in this repo under [`assets/`](assets/).

Concept-study stills for the **moises.tech dossier** live separately under  
`moises/public/images/opportunities/flora-forward-deployed-creative/`  
and must stay labeled **Concept Study** until real FLORA / Field Kit screenshots exist.

---

## A. Diagrams (README)

| ID | Asset | Size | Used in | What it shows | Status |
|----|-------|------|---------|---------------|--------|
| D0 | [readme-cover](https://res.cloudinary.com/dck5rzi4h/image/upload/v1788230102/jobs/flora-toolkit/flora-field-kit-readme-cover_m8jnig.png) | 2400×900 | README banner | FLORA Field Kit · Brief → System | **ready** |
| D0b | [readme-hero-3d](https://res.cloudinary.com/dck5rzi4h/image/upload/v1788230105/jobs/flora-toolkit/flora-field-kit-readme-hero-3d_avn2my.png) | 1672×941 | README intro | Pipeline with human review gate | **ready** |
| D1 | [workflow-loop-3d](https://res.cloudinary.com/dck5rzi4h/image/upload/v1788230106/jobs/flora-toolkit/flora-field-kit-workflow-loop-3d_idi3l2.png) · SVG fallback [`workflow-loop.svg`](assets/workflow-loop.svg) | 1672×941 | README | Brief → Techniques → Run → Review → Chain → Case study | **ready** |
| D2 | [architecture-stack-3d](https://res.cloudinary.com/dck5rzi4h/image/upload/v1788230103/jobs/flora-toolkit/flora-field-kit-architecture-stack-3d_khfxnp.png) · SVG fallback [`architecture-layers.svg`](assets/architecture-layers.svg) | 1672×941 | README / architecture | Browser · API · SDK · FLORA | **ready** |
| D3 | [demo-vs-live-3d](https://res.cloudinary.com/dck5rzi4h/image/upload/v1788230106/jobs/flora-toolkit/flora-field-kit-demo-vs-live-3d_goaqr6.png) · SVG fallback [`demo-vs-live.svg`](assets/demo-vs-live.svg) | 1672×941 | README modes | Demo fixtures vs live API key path | **ready** |
| D4 | [technique-chain-3d](https://res.cloudinary.com/dck5rzi4h/image/upload/v1788230107/jobs/flora-toolkit/flora-field-kit-technique-chain-3d_ukczqx.png) · SVG fallback [`hero-chain.svg`](assets/hero-chain.svg) | 1672×941 | README Techniques | Three heroes in chain order | **ready** |
| D4b | [human-review-3d](https://res.cloudinary.com/dck5rzi4h/image/upload/v1788230106/jobs/flora-toolkit/flora-field-kit-human-review-3d_wlqzbr.png) | 1672×941 | README review | Human selection gate in the loop | **ready** |
| OG | [social-preview](https://res.cloudinary.com/dck5rzi4h/image/upload/v1788230103/jobs/flora-toolkit/flora-field-kit-social-preview_aulfq2.png) | 1200×630 | Open Graph / Twitter | Link preview for the live demo | **ready** |
| D5 | `docs/assets/sequence-brief-to-case.svg` | ~1000×700 | docs/architecture | Sequence: recruiter click path through 5 steps | **needed** |

---

## B. Product screenshots (capture from running app)

Prefer **light UI**, 16:9 or 3:2, no API keys visible, no personal data.

| ID | Suggested filename | Ratio | Capture from | Caption | Status |
|----|--------------------|-------|--------------|---------|--------|
| S1 | `docs/assets/screenshots/01-brief-intake.png` | 16:9 | Step **Brief** | Creative brief intake with demo Miami exhibition brief | **ready** |
| S2 | `docs/assets/screenshots/02-technique-library.png` | 16:9 | Step **Techniques** | Three hero cards + clone bases + DEMO MODE pill | **ready** |
| S3 | `docs/assets/screenshots/03-run-console.png` | 16:9 | Step **Run** | Schema-generated inputs + progress + cost | **ready** |
| S4 | `docs/assets/screenshots/04-creative-review.png` | 16:9 | Step **Review** | Favorites, notes, “Use next” selection | **ready** |
| S5 | `docs/assets/screenshots/05-case-study.png` | 16:9 | `/case/demo-miami-exhibition-teaser` | Shareable workflow report | **ready** |
| S6 | `docs/assets/screenshots/06-docs-page.png` | 16:9 | `/docs` | Optional — architecture notes in-app | optional |

**How to capture**

```bash
npm run dev
# in another terminal (default base URL http://localhost:3000):
npm run capture:screenshots
# or: node scripts/capture-screenshots.mjs http://localhost:3456
```

PNGs are 1600×900. Keep the mode pill visible on S2–S4.

---

## C. FLORA Technique visuals (from FLORA product)

These are **application artifacts**, not Field Kit chrome. Until published, README should link clone bases only.

| ID | Asset | Source | Status |
|----|-------|--------|--------|
| T1 | Narrative World Builder — View Link preview or canvas still | After Technique Builder publish | **needed** |
| T2 | Campaign Variation System — View Link preview | After publish | **needed** |
| T3 | Physical Experience Previsualizer — View Link preview | After publish | **needed** |
| T4 | Optional: Technique Builder I/O panel (inputs/outputs named) | Screenshot in FLORA | optional |

Do **not** paste API keys or private workspace URLs into README images.

---

## D. Application package (outside this README, for hiring packet)

Already on moises.tech dossier (concept studies):

| File | Role |
|------|------|
| `flora-forward-deployed-creative-hero-banner.png` | Dossier hero 3:1 |
| `flora-field-kit-overview-concept-study.png` | Field Kit case study 16:9 |
| `flora-technique-*-concept-study.png` ×3 | Technique cards 16:9 |

Replace with verified screenshots when Techniques and Field Kit live runs exist.

---

## E. README embedding rules

1. Prefer the Cloudinary 3D stills in the README (GitHub renders remote HTTPS). SVG fallbacks stay in git for offline / print.
2. Screenshots (S1–S5) go under `docs/assets/screenshots/` and are linked from README once captured.
3. Open Graph uses the 1200×630 social preview via [`lib/media.ts`](../lib/media.ts) — do not invent a local duplicate unless Cloudinary is unavailable.
4. Every concept / placeholder visual must say **Concept Study** or **Diagram** in the alt text / caption until replaced.
5. Never commit `.env.local`, key screenshots, or billed run dashboards that expose account identity beyond what’s intentional.

---

## Priority order

1. **D0–D4b + OG** — 3D stills + social preview ready  
2. **S1–S5** — ready (embedded in README)  
3. **T1–T3** — unblock with Technique publish (P0)  
4. **D5** — optional sequence diagram
