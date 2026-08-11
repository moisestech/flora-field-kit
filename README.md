# FLORA Field Kit

**A coded client-workflow console that turns a creative brief into a reusable FLORA production system.**

> Turning creative briefs into reusable AI production systems.

Live demo: **[https://flora-field-kit.moises.tech](https://flora-field-kit.moises.tech)**  
Source: **[github.com/moisestech/flora-field-kit](https://github.com/moisestech/flora-field-kit)**

This is an independent **Forward Deployed Creative** work sample — not a portfolio site and **not affiliated with or endorsed by FLORA**.

```text
Client brief → Recommend Techniques → Run via API → Compare outputs → Chain → Case study
```

## Open the demo (no API key)

Recruiters should use **demo mode**. It ships deterministic fixtures for the full loop.

```bash
npm install
npm run dev
# open http://localhost:3000
```

Or open the live deploy: [flora-field-kit.moises.tech](https://flora-field-kit.moises.tech)

Demo case study: [`/case/demo-miami-exhibition-teaser`](https://flora-field-kit.moises.tech/case/demo-miami-exhibition-teaser)

## Live mode (optional)

1. Create an API key in FLORA → Settings → API Keys (paid subscription required).
2. Copy `.env.example` → `.env.local` and set `FLORA_API_KEY` (never commit it; never paste it in chat).
3. Publish your Techniques, then set their `slug` + `viewLink` in [`lib/techniques.ts`](lib/techniques.ts).
4. `npm run dev` — mode pill switches to **LIVE**.

Force fixtures even with a key: `DEMO_MODE=1`.

## Three hero Techniques

| Technique | Demonstrates | Status |
|-----------|--------------|--------|
| Narrative World Builder | Story + visual language | Placeholder — awaiting View Link |
| Campaign Variation System | Brand variations across formats | Placeholder — awaiting View Link |
| Physical Experience Previsualizer | Installation / venue previz | Placeholder — awaiting View Link |

Clone ~6–10 Techniques in FLORA, customize three, then wire slugs here. See [`docs/application.md`](docs/application.md).

## Stack

- Next.js + TypeScript
- `@flora-ai/flora` (server-only)
- Schema-ready Technique registry
- Async run console + demo fixtures
- Shareable case-study routes

## Docs

- [`docs/architecture.md`](docs/architecture.md) — brief → run → report
- [`docs/application.md`](docs/application.md) — FDC application mapping
- [`docs/techniques.md`](docs/techniques.md) — clone intake + slug wiring checklist

## License

MIT — see [LICENSE](LICENSE).
