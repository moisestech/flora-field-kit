/**
 * Demo mode runs without FLORA_API_KEY so recruiters can walk the full
 * brief → technique → review → report loop from fixtures.
 */
export function isDemoMode(): boolean {
  if (process.env.DEMO_MODE === '1' || process.env.DEMO_MODE === 'true') {
    return true;
  }
  return !process.env.FLORA_API_KEY?.trim();
}

export function hasFloraKey(): boolean {
  return Boolean(process.env.FLORA_API_KEY?.trim());
}
