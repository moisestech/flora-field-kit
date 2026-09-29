import type { Metadata } from 'next';
import { DM_Sans, IBM_Plex_Mono } from 'next/font/google';

import { FIELD_KIT_MEDIA, SITE_URL } from '@/lib/media';

import './globals.css';

const sans = DM_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const mono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'FLORA Field Kit',
  description:
    'A coded client-workflow console that turns creative briefs into reusable FLORA production systems.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'FLORA Field Kit',
    description: 'Turning creative briefs into reusable AI production systems.',
    url: SITE_URL,
    siteName: 'FLORA Field Kit',
    type: 'website',
    images: [
      {
        url: FIELD_KIT_MEDIA.socialPreview,
        width: 1200,
        height: 630,
        alt: 'FLORA Field Kit — brief to system, with a human review gate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FLORA Field Kit',
    description: 'Turning creative briefs into reusable AI production systems.',
    images: [FIELD_KIT_MEDIA.socialPreview],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable} antialiased`}>{children}</body>
    </html>
  );
}
