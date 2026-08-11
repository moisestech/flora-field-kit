import { NextResponse } from 'next/server';

import { getFloraClient } from '@/lib/flora';
import { isDemoMode } from '@/lib/mode';
import { getHeroTechnique } from '@/lib/techniques';

export const runtime = 'nodejs';

/**
 * Poll a Technique run.
 * Demo mode returns synthetic progress based on `startedAt` query param.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const runId = searchParams.get('runId');
  const techniqueId = searchParams.get('techniqueId');
  const startedAt = Number(searchParams.get('startedAt') ?? Date.now());

  if (!runId || !techniqueId) {
    return NextResponse.json(
      { error: 'runId and techniqueId are required' },
      { status: 400 },
    );
  }

  const technique = getHeroTechnique(techniqueId);
  if (!technique) {
    return NextResponse.json({ error: 'Unknown technique id' }, { status: 404 });
  }

  if (isDemoMode() || runId.startsWith('demo_') || !technique.slug) {
    const elapsed = Date.now() - startedAt;
    const progress = Math.min(100, Math.floor(elapsed / 40));
    const completed = progress >= 100;

    return NextResponse.json({
      mode: 'demo',
      run_id: runId,
      status: completed ? 'completed' : progress < 5 ? 'pending' : 'running',
      progress,
      charged_cost: technique.runCostUsd,
      outputs: completed
        ? technique.outputs.map((output) => ({
            output_id: output.id,
            type: output.type,
            value:
              output.type === 'text'
                ? `Demo output: ${output.name}`
                : `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
                    `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="640"><rect width="960" height="640" fill="#1a2230"/><text x="48" y="80" fill="#c9b896" font-family="sans-serif" font-size="28">${output.name}</text></svg>`,
                  )}`,
          }))
        : [],
    });
  }

  try {
    const client = getFloraClient();
    const result = await client.techniques.runs.retrieve(runId, {
      techniqueId: technique.slug,
    });

    return NextResponse.json({
      mode: 'live',
      ...result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to poll run';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
