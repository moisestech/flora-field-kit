# Architecture

FLORA Field Kit is a **customer-facing workflow console** around FLORA Techniques.

```text
Client brief + assets
  → Recommend Techniques
  → Run Technique (API / demo fixtures)
  → Compare + select outputs
  → Branch into next Technique
  → Shareable workflow report
```

## Modes

| Mode | When | Behavior |
|------|------|----------|
| **Demo** | `DEMO_MODE=1` or missing `FLORA_API_KEY` | Deterministic fixtures. No network calls to FLORA. Recruiters use this. |
| **Live** | `FLORA_API_KEY` set and `DEMO_MODE` unset | `@flora-ai/flora` server-side: list Techniques, create async runs, poll status. |

The API key never ships to the browser. All FLORA calls go through `app/api/flora/*`.

## Three surfaces (keep them separate)

| Surface | Job | Auth |
|---------|-----|------|
| **Technique Builder** | Customize / publish the three hero Techniques | FLORA app |
| **FLORA MCP** (Cursor) | Discover Techniques, inspect schemas, optional ad-hoc runs, copy IDs into this repo | OAuth — [`.cursor/mcp.json`](../.cursor/mcp.json) |
| **Field Kit API** | Recruiter demo + live programmatic runs | `FLORA_API_KEY` in `.env.local` |

MCP is not a server runtime. Do not route [`app/api/flora/*`](../app/api/flora) through it. Recruiter demo stays **demo mode** — MCP is a developer / FDC tool, not required to open the live site.

Connect: Cursor Settings → MCP → `flora` → Connect (same account as [app.flora.ai](https://app.flora.ai)). Docs: [developer.flora.ai/mcp](https://developer.flora.ai/mcp/).

`execute` requires a **paid FLORA account** (`403 paid_plan_required` otherwise). OAuth can succeed while list/retrieve still fail. Until billing is on, clone I/O in [`lib/clone-bases.ts`](../lib/clone-bases.ts) comes from public Technique pages.

## Technique authorship vs API

- **Technique Builder** (in FLORA) authors multi-step canvas workflows behind defined inputs/outputs.
- **FLORA MCP** lists and retrieves those Techniques from Cursor without putting an API key in chat.
- **Field Kit** reads schemas, generates forms, runs Techniques by slug, and packages a case study.
- Placeholders live in [`lib/techniques.ts`](../lib/techniques.ts) until real View Links and slugs are wired.

## Hero chain (target)

1. **Narrative World Builder** — visual language + story breakdown  
2. **Campaign Variation System** — format / audience variations  
3. **Physical Experience Previsualizer** — venue + production board  

## Case study export

`/case/[id]` renders brief, Techniques used, selections, reasoning, and deliverables. Demo id: `demo-miami-exhibition-teaser`.

## Diagrams

SVG architecture and workflow diagrams for the README live in [`assets/`](assets/). Full media checklist: [`media.md`](media.md).

## Boundary

This repo is standalone. It does not import moises.tech design systems, auth, or CMS. The website may link here; it must not host this app.
