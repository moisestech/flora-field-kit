/**
 * Capture README screenshots S1–S5 from a running Field Kit instance.
 * Usage: node scripts/capture-screenshots.mjs [baseUrl]
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'docs', 'assets', 'screenshots');
const baseUrl = process.argv[2] || 'http://localhost:3456';

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1600, height: 900 },
  deviceScaleFactor: 1,
});

async function shot(name) {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(150);
  const file = path.join(outDir, name);
  await page.screenshot({ path: file, fullPage: false });
  console.log('wrote', file);
}

await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
await page.getByRole('heading', { name: 'Creative brief intake' }).waitFor();
await shot('01-brief-intake.png');

await page.getByRole('button', { name: 'Recommend Techniques' }).click();
await page.getByRole('heading', { name: 'Technique library' }).waitFor();
await page.getByText('DEMO MODE').waitFor();
await page.waitForTimeout(400);
await shot('02-technique-library.png');

await page.getByRole('button', { name: 'Run in console' }).first().click();
await page.getByRole('heading', { name: /Run console/ }).waitFor();
await page.getByText('Completed', { exact: true }).waitFor({ timeout: 30000 });
await page.waitForTimeout(300);
await shot('03-run-console.png');

await page.getByRole('button', { name: 'Open creative review' }).click();
await page.getByRole('heading', { name: 'Creative review' }).waitFor();
await page.waitForTimeout(600);
await shot('04-creative-review.png');

await page.goto(`${baseUrl}/case/demo-miami-exhibition-teaser`, {
  waitUntil: 'networkidle',
});
await page.waitForTimeout(500);
await shot('05-case-study.png');

await browser.close();
console.log('done');
