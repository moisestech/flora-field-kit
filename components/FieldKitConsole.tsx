'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';

import type { CreativeBrief, DemoCaseStudy } from '@/lib/demo/fixtures';
import { DEMO_BRIEF, buildDemoCaseStudy, recommendTechniques } from '@/lib/demo/fixtures';
import { HERO_TECHNIQUES, formatUsd, type HeroTechnique } from '@/lib/techniques';

type Step = 'brief' | 'techniques' | 'run' | 'review' | 'report';

type ModeInfo = {
  mode: 'demo' | 'live';
  hasFloraKey: boolean;
  techniquesReady: boolean;
};

const STEPS: { id: Step; label: string }[] = [
  { id: 'brief', label: 'Brief' },
  { id: 'techniques', label: 'Techniques' },
  { id: 'run', label: 'Run' },
  { id: 'review', label: 'Review' },
  { id: 'report', label: 'Report' },
];

export function FieldKitConsole() {
  const [step, setStep] = useState<Step>('brief');
  const [brief, setBrief] = useState<CreativeBrief>(DEMO_BRIEF);
  const [caseStudy, setCaseStudy] = useState<DemoCaseStudy | null>(null);
  const [activeTechniqueId, setActiveTechniqueId] = useState(HERO_TECHNIQUES[0].id);
  const [runProgress, setRunProgress] = useState(0);
  const [runStatus, setRunStatus] = useState<'idle' | 'pending' | 'running' | 'completed'>('idle');
  const [modeInfo, setModeInfo] = useState<ModeInfo | null>(null);
  const [pending, startTransition] = useTransition();
  const [schemaValues, setSchemaValues] = useState<Record<string, string>>({});
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [selectedForChain, setSelectedForChain] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/flora/mode')
      .then((r) => r.json())
      .then((data: ModeInfo) => setModeInfo(data))
      .catch(() =>
        setModeInfo({ mode: 'demo', hasFloraKey: false, techniquesReady: false }),
      );
  }, []);

  const recommended = useMemo(() => recommendTechniques(brief), [brief]);
  const activeTechnique =
    recommended.find((t) => t.id === activeTechniqueId) ?? recommended[0];

  function updateBrief<K extends keyof CreativeBrief>(key: K, value: CreativeBrief[K]) {
    setBrief((prev) => ({ ...prev, [key]: value }));
  }

  function goRecommend() {
    startTransition(() => {
      setCaseStudy(null);
      setFavorites({});
      setNotes({});
      setSelectedForChain(null);
      setStep('techniques');
    });
  }

  async function startRun(technique: HeroTechnique) {
    setActiveTechniqueId(technique.id);
    const seeded: Record<string, string> = {};
    for (const input of technique.inputs) {
      if (input.type === 'text') {
        seeded[input.id] = [
          brief.objective,
          brief.audience,
          brief.visualDirection,
          brief.constraints,
        ]
          .filter(Boolean)
          .join('\n\n');
      } else {
        seeded[input.id] = schemaValues[input.id] || input.description || '';
      }
    }
    setSchemaValues(seeded);
    setStep('run');
    setRunStatus('pending');
    setRunProgress(0);

    const startedAt = Date.now();
    const createRes = await fetch('/api/flora/runs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        techniqueId: technique.id,
        inputs: technique.inputs.map((input) => ({
          id: input.id,
          type: input.type,
          value: seeded[input.id] ?? '',
        })),
      }),
    });
    const created = await createRes.json();
    if (!createRes.ok) {
      setRunStatus('idle');
      return;
    }

    setRunStatus('running');
    const poll = async () => {
      const statusRes = await fetch(
        `/api/flora/status?runId=${encodeURIComponent(created.run_id)}&techniqueId=${encodeURIComponent(technique.id)}&startedAt=${startedAt}`,
      );
      const status = await statusRes.json();
      setRunProgress(status.progress ?? 0);
      if (status.status === 'completed') {
        setRunStatus('completed');
        const study = buildDemoCaseStudy(brief);
        setCaseStudy(study);
        const fav: Record<string, boolean> = {};
        const noteMap: Record<string, string> = {};
        let firstSelected: string | null = null;
        for (const s of study.steps) {
          for (const output of s.outputs) {
            const key = `${s.techniqueId}:${output.outputId}`;
            fav[key] = Boolean(output.favorited);
            if (output.notes) noteMap[key] = output.notes;
            if (output.favorited && !firstSelected) firstSelected = key;
          }
        }
        setFavorites(fav);
        setNotes(noteMap);
        setSelectedForChain(firstSelected);
        return;
      }
      if (status.status === 'failed') {
        setRunStatus('idle');
        return;
      }
      window.setTimeout(poll, 400);
    };
    void poll();
  }

  function openReport() {
    const study = caseStudy ?? buildDemoCaseStudy(brief);
    setCaseStudy(study);
    setStep('report');
  }

  return (
    <div className="console">
      <header className="console__header">
        <div>
          <p className="eyebrow">FLORA Field Kit</p>
          <h1>Turning creative briefs into reusable AI production systems.</h1>
          <p className="lede">
            A coded client-workflow console: brief intake → Technique recommendation →
            programmatic runs → creative review → shareable case study.
          </p>
        </div>
        <div className="mode-pill" data-mode={modeInfo?.mode ?? 'demo'}>
          <span className="mode-pill__dot" />
          {(modeInfo?.mode ?? 'demo').toUpperCase()} MODE
          {!modeInfo?.techniquesReady ? ' · Techniques pending' : ''}
        </div>
      </header>

      <nav className="stepper" aria-label="Workflow steps">
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={step === s.id ? 'stepper__item is-active' : 'stepper__item'}
            onClick={() => setStep(s.id)}
          >
            <span className="stepper__index">{i + 1}</span>
            {s.label}
          </button>
        ))}
      </nav>

      {step === 'brief' && (
        <section className="panel">
          <h2>Creative brief intake</h2>
          <p className="panel__hint">
            Collect objective, audience, direction, references, deliverables, channels, and
            constraints — the same intake an FDC would run with a customer.
          </p>
          <div className="brief-grid">
            {(
              [
                ['objective', 'Objective'],
                ['audience', 'Audience'],
                ['visualDirection', 'Visual direction'],
                ['references', 'References'],
                ['deliverables', 'Deliverables'],
                ['channels', 'Channels'],
                ['constraints', 'Constraints'],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="field">
                <span>{label}</span>
                <textarea
                  value={brief[key]}
                  rows={key === 'objective' ? 3 : 2}
                  onChange={(e) => updateBrief(key, e.target.value)}
                />
              </label>
            ))}
          </div>
          <div className="actions">
            <button type="button" className="btn btn--primary" onClick={goRecommend} disabled={pending}>
              Recommend Techniques
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setBrief(DEMO_BRIEF)}
            >
              Reset demo brief
            </button>
          </div>
        </section>
      )}

      {step === 'techniques' && (
        <section className="panel">
          <h2>Technique library</h2>
          <p className="panel__hint">
            Three hero Techniques map to the FDC application. Slugs and View Links fill in after
            you publish customized Techniques in FLORA.
          </p>
          <div className="technique-grid">
            {recommended.map((technique) => (
              <article key={technique.id} className="technique-card">
                <div className="technique-card__meta">
                  <span className="chip">Chain {technique.chainOrder}</span>
                  <span className="chip chip--muted">{technique.status}</span>
                  <span className="chip chip--cost">
                    {technique.runCostUsd == null
                      ? 'Cost pending retrieve'
                      : `~${formatUsd(technique.runCostUsd)} / run`}
                  </span>
                </div>
                <h3>{technique.name}</h3>
                <p>{technique.description}</p>
                <dl className="meta-list">
                  <div>
                    <dt>Best use</dt>
                    <dd>{technique.bestUseCase}</dd>
                  </div>
                  <div>
                    <dt>Background</dt>
                    <dd>{technique.backgroundConnection}</dd>
                  </div>
                  <div>
                    <dt>Creative reasoning</dt>
                    <dd>{technique.creativeReasoning}</dd>
                  </div>
                  <div>
                    <dt>Modifications</dt>
                    <dd>{technique.modifications}</dd>
                  </div>
                  <div>
                    <dt>Clone bases</dt>
                    <dd>
                      {technique.cloneBases.map((url) => (
                        <a
                          key={url}
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          style={{ display: 'block', marginBottom: '0.2rem' }}
                        >
                          {url.replace('https://app.flora.ai/techniques/', '')}
                        </a>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt>Inputs</dt>
                    <dd>{technique.inputs.map((i) => i.name).join(' · ')}</dd>
                  </div>
                  <div>
                    <dt>Outputs</dt>
                    <dd>{technique.outputs.map((o) => o.name).join(' · ')}</dd>
                  </div>
                  <div>
                    <dt>View Link</dt>
                    <dd>{technique.viewLink ?? 'Pending Technique publish'}</dd>
                  </div>
                </dl>
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => void startRun(technique)}
                >
                  Run in console
                </button>
              </article>
            ))}
          </div>
        </section>
      )}

      {step === 'run' && activeTechnique && (
        <section className="panel">
          <h2>Run console — {activeTechnique.name}</h2>
          <p className="panel__hint">
            Schema-generated inputs, async progress, and cost display. Live mode uses the FLORA
            TypeScript SDK server-side.
          </p>
          <div className="run-layout">
            <div className="run-inputs">
              <h3>Schema-generated inputs</h3>
              {activeTechnique.inputs.map((input) => (
                <label key={input.id} className="field">
                  <span>
                    {input.name}
                    {input.required ? ' *' : ''}
                    <em className="type-tag">{input.type}</em>
                  </span>
                  {input.type === 'text' ? (
                    <textarea
                      rows={4}
                      value={schemaValues[input.id] ?? ''}
                      onChange={(e) =>
                        setSchemaValues((prev) => ({ ...prev, [input.id]: e.target.value }))
                      }
                    />
                  ) : (
                    <input
                      value={schemaValues[input.id] ?? ''}
                      placeholder={input.description ?? 'https://… image or video URL'}
                      onChange={(e) =>
                        setSchemaValues((prev) => ({ ...prev, [input.id]: e.target.value }))
                      }
                    />
                  )}
                </label>
              ))}
            </div>
            <div className="run-status">
              <h3>Status</h3>
              <div className="progress" role="progressbar" aria-valuenow={runProgress} aria-valuemin={0} aria-valuemax={100}>
                <div className="progress__bar" style={{ width: `${runProgress}%` }} />
              </div>
              <p className="run-status__line">
                {runStatus === 'idle' && 'Ready'}
                {runStatus === 'pending' && 'Queued…'}
                {runStatus === 'running' && `Running — ${runProgress}%`}
                {runStatus === 'completed' && 'Completed'}
              </p>
              <p className="run-status__cost">
                Est. cost {formatUsd(activeTechnique.runCostUsd)}
              </p>
              {runStatus === 'completed' && (
                <button type="button" className="btn btn--primary" onClick={() => setStep('review')}>
                  Open creative review
                </button>
              )}
              {runStatus === 'idle' && (
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => void startRun(activeTechnique)}
                >
                  Start run
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {step === 'review' && (
        <section className="panel">
          <h2>Creative review</h2>
          <p className="panel__hint">
            Favorite directions, leave notes, and select which result should enter the next
            Technique in the chain.
          </p>
          <div className="review-grid">
            {(caseStudy ?? buildDemoCaseStudy(brief)).steps.flatMap((s) =>
              s.outputs.map((output) => {
                const key = `${s.techniqueId}:${output.outputId}`;
                const techniqueName =
                  HERO_TECHNIQUES.find((t) => t.id === s.techniqueId)?.name ?? s.techniqueId;
                return (
                  <figure key={key} className="review-card">
                    {output.type === 'imageUrl' ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={output.value} alt={output.name} />
                    ) : (
                      <pre>{output.value}</pre>
                    )}
                    <figcaption>
                      <strong>
                        {techniqueName} · {output.name}
                      </strong>
                      <div className="actions" style={{ marginTop: '0.5rem' }}>
                        <button
                          type="button"
                          className={favorites[key] ? 'btn btn--primary' : 'btn btn--ghost'}
                          onClick={() =>
                            setFavorites((prev) => ({ ...prev, [key]: !prev[key] }))
                          }
                        >
                          {favorites[key] ? 'Favorited' : 'Favorite'}
                        </button>
                        <button
                          type="button"
                          className={
                            selectedForChain === key ? 'btn btn--primary' : 'btn btn--ghost'
                          }
                          onClick={() => setSelectedForChain(key)}
                        >
                          {selectedForChain === key ? 'Selected for chain' : 'Use next'}
                        </button>
                      </div>
                      <label className="field" style={{ marginTop: '0.65rem' }}>
                        <span>Notes</span>
                        <textarea
                          rows={2}
                          value={notes[key] ?? ''}
                          onChange={(e) =>
                            setNotes((prev) => ({ ...prev, [key]: e.target.value }))
                          }
                          placeholder="Creative direction notes for the customer…"
                        />
                      </label>
                    </figcaption>
                  </figure>
                );
              }),
            )}
          </div>
          <div className="actions">
            <button type="button" className="btn btn--primary" onClick={openReport}>
              Generate case-study report
            </button>
          </div>
        </section>
      )}

      {step === 'report' && (
        <section className="panel">
          <h2>Workflow report</h2>
          <p className="panel__hint">
            Shareable project page documenting brief, Techniques, explorations, selected direction,
            and creative reasoning.
          </p>
          {(() => {
            const study = caseStudy ?? buildDemoCaseStudy(brief);
            return (
              <div className="report">
                <dl className="meta-list">
                  <div>
                    <dt>Case id</dt>
                    <dd>
                      <a href={`/case/${study.id}`}>{study.id}</a>
                    </dd>
                  </div>
                  <div>
                    <dt>Objective</dt>
                    <dd>{study.brief.objective}</dd>
                  </div>
                  <div>
                    <dt>Techniques</dt>
                    <dd>
                      {study.recommendedTechniqueIds
                        .map((id) => HERO_TECHNIQUES.find((t) => t.id === id)?.name ?? id)
                        .join(' → ')}
                    </dd>
                  </div>
                  <div>
                    <dt>Selected for next Technique</dt>
                    <dd>{selectedForChain ?? study.selectedDirection}</dd>
                  </div>
                  <div>
                    <dt>Creative reasoning</dt>
                    <dd>{study.creativeReasoning}</dd>
                  </div>
                  <div>
                    <dt>Total demo cost</dt>
                    <dd>
                    {(() => {
                      const amounts = study.steps
                        .map((s) => s.chargedCost)
                        .filter((n): n is number => n != null);
                      return amounts.length === study.steps.length
                        ? formatUsd(amounts.reduce((sum, n) => sum + n, 0))
                        : 'Pending retrieve';
                    })()}
                    </dd>
                  </div>
                </dl>
                <a className="btn btn--primary" href={`/case/${study.id}`}>
                  Open shareable case study
                </a>
              </div>
            );
          })()}
        </section>
      )}

      <footer className="console__footer">
        <p>
          Not affiliated with or endorsed by FLORA. Work sample by{' '}
          <a href="https://moises.tech" target="_blank" rel="noreferrer">
            Moises Sanabria
          </a>
          .
        </p>
        <p>
          <a href="https://github.com/moisestech/flora-field-kit">Source</a>
          {' · '}
          <a href="/docs">Docs</a>
          {' · '}
          <a href="https://developer.flora.ai/quickstarts/typescript/">FLORA TypeScript SDK</a>
        </p>
      </footer>
    </div>
  );
}
