import { NextResponse } from 'next/server';

import { isDemoMode, hasFloraKey } from '@/lib/mode';
import { techniquesReadyForLive } from '@/lib/techniques';

export const runtime = 'nodejs';

export async function GET() {
  const demo = isDemoMode();
  return NextResponse.json({
    mode: demo ? 'demo' : 'live',
    hasFloraKey: hasFloraKey(),
    techniquesReady: techniquesReadyForLive(),
    disclaimer:
      'Not affiliated with or endorsed by FLORA. Application work sample by Moises Sanabria.',
  });
}
