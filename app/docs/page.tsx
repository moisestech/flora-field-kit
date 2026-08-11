import Link from 'next/link';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const metadata = {
  title: 'Docs · FLORA Field Kit',
  description: 'Architecture and application notes for FLORA Field Kit.',
};

async function readDoc(name: string) {
  const filePath = path.join(process.cwd(), 'docs', name);
  return readFile(filePath, 'utf8');
}

export default async function DocsPage() {
  const [architecture, application] = await Promise.all([
    readDoc('architecture.md'),
    readDoc('application.md'),
  ]);

  return (
    <main className="console">
      <p className="eyebrow">Documentation</p>
      <h1 style={{ margin: '0 0 1rem', fontSize: '2rem' }}>Field Kit docs</h1>
      <p className="lede" style={{ marginBottom: '1.5rem' }}>
        Recruiter-facing notes. Full markdown also lives in the repo under <code>docs/</code>.
      </p>

      <section className="panel" style={{ marginBottom: '1rem' }}>
        <pre
          style={{
            margin: 0,
            whiteSpace: 'pre-wrap',
            fontFamily: 'var(--font-mono), ui-monospace, monospace',
            fontSize: '0.82rem',
            lineHeight: 1.5,
            color: 'var(--ink-muted)',
          }}
        >
          {architecture}
        </pre>
      </section>

      <section className="panel">
        <pre
          style={{
            margin: 0,
            whiteSpace: 'pre-wrap',
            fontFamily: 'var(--font-mono), ui-monospace, monospace',
            fontSize: '0.82rem',
            lineHeight: 1.5,
            color: 'var(--ink-muted)',
          }}
        >
          {application}
        </pre>
      </section>

      <p style={{ marginTop: '1.5rem' }}>
        <Link href="/">← Back to Field Kit</Link>
      </p>
    </main>
  );
}
