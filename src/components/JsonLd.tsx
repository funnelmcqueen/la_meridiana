import { site, openingHours, awards } from '@/data/site';
import { menu } from '@/data/menu';
import { siteUrl } from '@/lib/seo';

/**
 * Restaurant schema.org (JSON-LD) structured data.
 *
 * Emits name, address, geo-friendly contact info, opening hours and the full
 * menu so Google can render rich results (hours, "order/reserve" actions,
 * menu). Rendered once, in the root layout, so it appears on every page.
 */
function restaurantSchema() {
  const openingHoursSpecification = openingHours.flatMap((d) =>
    d.ranges.map((r) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${d.day}`,
      opens: r.opens,
      closes: r.closes,
    })),
  );

  const hasMenuSection = menu.map((section) => ({
    '@type': 'MenuSection',
    name: section.title,
    hasMenuItem: section.items.map((item) => ({
      '@type': 'MenuItem',
      name: item.name,
      ...(item.description ? { description: item.description } : {}),
      offers: {
        '@type': 'Offer',
        price: item.price,
        priceCurrency: 'GBP',
      },
    })),
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${siteUrl}/#restaurant`,
    name: site.name,
    description: site.description,
    url: siteUrl,
    telephone: site.phone,
    email: site.email,
    servesCuisine: 'Italian',
    priceRange: '££',
    acceptsReservations: 'True',
    image: [`${siteUrl}/images/og-default.jpg`],
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    openingHoursSpecification,
    hasMenu: {
      '@type': 'Menu',
      name: 'La Meridiana Menu',
      hasMenuSection,
    },
    award: awards.map((a) => `${a.title} — ${a.organisation} ${a.year}`),
    sameAs: [
      site.social.instagram.url,
      site.social.facebook.url,
      site.social.tripadvisor.url,
    ],
  };
}

export function RestaurantJsonLd() {
  return (
    <script
      type="application/ld+json"
      // JSON-LD is trusted, self-generated content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema()) }}
    />
  );
}

/** Breadcrumb JSON-LD for interior pages (helps SEO on deep routes). */
export function BreadcrumbJsonLd({ title, path }: { title: string; path: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: title, item: `${siteUrl}${path}` },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
