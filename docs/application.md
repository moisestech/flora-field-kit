# Application map — Forward Deployed Creative

This repo is the **fourth application artifact** for FLORA Forward Deployed Creative:

1. Narrative World Builder — FLORA View Link  
2. Campaign Variation System — FLORA View Link  
3. Physical Experience Previsualizer — FLORA View Link  
4. **Field Kit** — this coded console ([live](https://flora-field-kit.moises.tech) · [source](https://github.com/moisestech/flora-field-kit))

## What FDC work looks like here

| FDC expectation | Field Kit proof |
|-----------------|-----------------|
| Understand a customer brief | Creative brief intake |
| Select / adapt Techniques | Recommendation + Technique library cards |
| Run programmatically | Server-side `@flora-ai/flora` run console |
| Compare and refine | Creative review (favorites, notes, selection) |
| Package for the team | Shareable case-study URL |

## Status gates

- [x] Clone ~6–10 community Techniques and classify them — see [`techniques.md`](techniques.md)
- [ ] Customize three hero Techniques against the Miami brief — [`technique-builder-miami.md`](technique-builder-miami.md)
- [ ] Publish View Links; set slugs in `lib/techniques.ts`
- [x] Schema-driven forms from Technique `inputs` (demo registry; live schema sync after publish)
- [x] Capture README screenshots S1–S5 — see [`media.md`](media.md)
- [ ] Record 60–90s demo
- [x] Role-portfolio outbound links from the private moises.tech opportunity dossier (`/opportunities/flora-forward-deployed-creative`)
- [x] Project FLORA MCP config ([`.cursor/mcp.json`](../.cursor/mcp.json)) — Cursor-side inventory, not the app runtime
- [x] Connect FLORA MCP (OAuth) — `execute` still needs a paid FLORA plan (`403 paid_plan_required`)
- [ ] After paid API access + Technique Builder publish: MCP-retrieve heroes; set `slug` / `viewLink` / `status: 'ready'`

Until Techniques are published, the app runs in **demo mode** with fixtures.

## Disclaimer

Not affiliated with or endorsed by FLORA. Built as an independent work sample by Moises Sanabria.
