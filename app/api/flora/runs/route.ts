import { NextResponse } from 'next/server';

import { getFloraClient } from '@/lib/flora';
import { isDemoMode } from '@/lib/mode';
import { getHeroTechnique } from '@/lib/techniques';

export const runtime = 'nodejs';

type RunBody = {
  techniqueId: string;
  inputs?: Array<{ id: string; type: string; value: string }>;
};

export async function POST(request: Request) {
  let body: RunBody;
  try {
    body = (await request.json()) as RunBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const technique = getHeroTechnique(body.techniqueId);
  if (!technique) {
    return NextResponse.json({ error: 'Unknown technique id' }, { status: 404 });
  }

  if (isDemoMode() || technique.status === 'placeholder' || !technique.slug) {
    return NextResponse.json({
      mode: 'demo',
      run_id: `demo_${technique.id}_${Date.now()}`,
      status: 'pending',
      progress: 0,
      techniqueId: technique.id,
      charged_cost: technique.runCostUsd,
      note: 'Demo run. Wire a real Technique slug to execute via the FLORA API.',
    });
  }

  try {
    const client = getFloraClient();
    const inputs =
      body.inputs?.map((input) => ({
        id: input.id,
        type: input.type as 'text' | 'imageUrl' | 'videoUrl',
        value: input.value,
      })) ??
      technique.inputs
        .filter((input) => input.required)
        .map((input) => ({
          id: input.id,
          type: input.type,
          value:
            input.type === 'text'
              ? 'Field Kit live run — replace with brief fields'
              : 'https://example.com/placeholder.jpg',
        }));

    const run = await client.techniques.runs.create(technique.slug, {
      inputs,
      mode: 'async',
    });

    return NextResponse.json({
      mode: 'live',
      run_id: run.run_id,
      status: run.status,
      progress: run.progress ?? 0,
      techniqueId: technique.id,
      slug: technique.slug,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to start run';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
