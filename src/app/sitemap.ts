import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/seo';
import { nav } from '@/data/site';
import { bookingPagePath } from '@/lib/booking';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', bookingPagePath, '/privacy', ...nav.map((n) => n.href)];
  const unique = Array.from(new Set(paths));
  return unique.map((path) => ({
    url: `${siteUrl}${path === '/' ? '' : path}`,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path === bookingPagePath ? 0.9 : 0.7,
  }));
}
