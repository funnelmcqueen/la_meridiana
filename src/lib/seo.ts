import type { Metadata } from 'next';
import { site } from '@/data/site';

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://lameridiana.co.uk';

/**
 * Builds per-page metadata with sensible La Meridiana defaults. Every page
 * passes its own title + description so search engines and social cards are
 * unique per route (a key fix vs. the old templated site).
 */
export function pageMetadata({
  title,
  description,
  path = '/',
  image = '/images/og-default.jpg',
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${siteUrl}${path}`;
  const fullTitle = path === '/' ? `${site.name} — ${site.tagline}` : `${title} · ${site.name}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: site.name,
      title: fullTitle,
      description,
      url,
      locale: 'en_GB',
      images: [{ url: image, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
