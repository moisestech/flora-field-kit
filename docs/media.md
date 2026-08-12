# FLORA Field Kit — media & diagrams inventory

Assets the **README** and recruiter walkthrough need. Status: `needed` = not in repo yet; `placeholder` = SVG diagram shipped; `ready` = final asset.

Concept-study stills for the **moises.tech dossier** live separately under  
`moises/public/images/opportunities/flora-forward-deployed-creative/`  
and must stay labeled **Concept Study** until real FLORA / Field Kit screenshots exist.

---

## A. Diagrams (ship in this repo)

| ID | Asset path | Size / ratio | Used in | What it shows | Status |
|----|------------|--------------|---------|---------------|--------|
| D1 | [`docs/assets/workflow-loop.svg`](assets/workflow-loop.svg) | ~1200×420 | README hero | Brief → Techniques → Run → Review → Chain → Case study | **placeholder** |
| D2 | [`docs/assets/architecture-layers.svg`](assets/architecture-layers.svg) | ~1200×520 | README / architecture | Browser UI · Next API · `@flora-ai/flora` · FLORA · Technique Builder | **placeholder** |
| D3 | [`docs/assets/demo-vs-live.svg`](assets/demo-vs-live.svg) | ~1000×360 | README modes | Demo fixtures vs live API key path | **placeholder** |
| D4 | `docs/assets/hero-chain.svg` | ~1200×280 | README Techniques | Three heroes in order with clone-base labels | **needed** |
| D5 | `docs/assets/sequence-brief-to-case.svg` | ~1000×700 | docs/architecture | Sequence: recruiter click path through 5 steps | **needed** |

---

## B. Product screenshots (capture from running app)

Prefer **light UI**, 16:9 or 3:2, no API keys visible, no personal data.

| ID | Suggested filename | Ratio | Capture from | Caption | Status |
|----|--------------------|-------|--------------|---------|--------|
| S1 | `docs/assets/screenshots/01-brief-intake.png` | 16:9 | Step **Brief** | Creative brief intake with demo Miami exhibition brief | **needed** |
| S2 | `docs/assets/screenshots/02-technique-library.png` | 16:9 | Step **Techniques** | Three hero cards + clone bases + DEMO MODE pill | **needed** |
| S3 | `docs/assets/screenshots/03-run-console.png` | 16:9 | Step **Run** | Schema-generated inputs + progress + cost | **needed** |
| S4 | `docs/assets/screenshots/04-creative-review.png` | 16:9 | Step **Review** | Favorites, notes, “Use next” selection | **needed** |
| S5 | `docs/assets/screenshots/05-case-study.png` | 16:9 | `/case/demo-miami-exhibition-teaser` | Shareable workflow report | **needed** |
| S6 | `docs/assets/screenshots/06-docs-page.png` | 16:9 | `/docs` | Optional — architecture notes in-app | optional |

**How to capture**

```bash
npm run dev
# open http://localhost:3000 — walk Brief → Techniques → Run → Review → Report
# also open /case/demo-miami-exhibition-teaser
```

Export PNG at ≥1600px wide. Crop chrome tightly; keep the mode pill visible on S2–S4.

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

1. Prefer SVG diagrams (D1–D3) checked into git — crisp on GitHub dark/light.
2. Screenshots (S1–S5) go under `docs/assets/screenshots/` and are linked from README once captured.
3. Every concept / placeholder visual must say **Concept Study** or **Diagram** in the alt text / caption until replaced.
4. Never commit `.env.local`, key screenshots, or billed run dashboards that expose account identity beyond what’s intentional.

---

## Priority order

1. **D1–D3** — done as SVG placeholders in this pass  
2. **S1–S5** — capture next (biggest recruiter clarity gain)  
3. **D4–D5** — nice-to-have diagrams  
4. **T1–T3** — unblock with Technique publish (P0)
