# Technique wiring checklist

Field Kit is **paused on real FLORA Techniques** until you clone and customize them.

The console already runs end-to-end in **demo mode** using placeholders in [`lib/techniques.ts`](../lib/techniques.ts). Each hero entry already carries:

- inputs / outputs
- creative reasoning
- planned modifications
- `viewLink` / `slug` (null until publish)

## Your next steps in FLORA

1. Clone ~6–10 Techniques from the community / library.
2. Paste names + View Links back in chat (or open a PR editing this file).
3. We classify and rank against the three hero workflows.
4. Customize the strongest three (prompts, branches, models, I/O naming, docs).
5. Publish via Technique Builder.
6. Update this table and set `status: 'ready'` in `lib/techniques.ts`.

## Hero registry (current)

| Id | Name | Slug | View Link | Status |
|----|------|------|-----------|--------|
| `narrative-world-builder` | Narrative World Builder | — | — | placeholder |
| `campaign-variation-system` | Campaign Variation System | — | — | placeholder |
| `physical-experience-previsualizer` | Physical Experience Previsualizer | — | — | placeholder |

## Clone intake (fill as you go)

| # | Cloned name | View Link | Notes |
|---|-------------|-----------|-------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |
| 6 | | | |
| 7 | | | |
| 8 | | | |
| 9 | | | |
| 10 | | | |

API key: put only in `.env.local` as `FLORA_API_KEY`. Never commit or paste in chat.

## Application dossier

Outbound narrative lives on moises.tech at `/opportunities/flora-forward-deployed-creative` and links here — do not move app code into the website repo.
