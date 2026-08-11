import 'server-only';

import Flora from '@flora-ai/flora';

import { isDemoMode } from './mode';

let client: Flora | null = null;

/** Server-only FLORA client. Throws if called while demo mode / missing key. */
export function getFloraClient(): Flora {
  if (isDemoMode()) {
    throw new Error(
      'FLORA client unavailable in demo mode. Set FLORA_API_KEY and unset DEMO_MODE to run live.',
    );
  }

  const apiKey = process.env.FLORA_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('FLORA_API_KEY is not set');
  }

  if (!client) {
    client = new Flora({ apiKey });
  }
  return client;
}
