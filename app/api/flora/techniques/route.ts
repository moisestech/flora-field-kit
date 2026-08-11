import { NextResponse } from 'next/server';

import { buildDemoCaseStudy } from '@/lib/demo/fixtures';
import { getFloraClient } from '@/lib/flora';
import { isDemoMode } from '@/lib/mode';
import { HERO_TECHNIQUES } from '@/lib/techniques';

export const runtime = 'nodejs';

export async function GET() {
  if (isDemoMode()) {
    return NextResponse.json({
      mode: 'demo',
      techniques: HERO_TECHNIQUES,
      demoCaseId: buildDemoCaseStudy().id,
      note: 'Demo fixtures. Set FLORA_API_KEY to list live Techniques from your workspace.',
    });
  }

  try {
    const client = getFloraClient();
    const listed: Array<{
      technique_id: string;
      name: string;
      description?: string | null;
      run_cost?: number | null;
    }> = [];

    for await (const technique of client.techniques.list({ limit: 50 })) {
      listed.push({
        technique_id: technique.technique_id,
        name: technique.name,
        description: technique.description,
        run_cost: technique.run_cost,
      });
    }

    return NextResponse.json({
      mode: 'live',
      techniques: HERO_TECHNIQUES,
      workspaceTechniques: listed,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to list techniques';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
