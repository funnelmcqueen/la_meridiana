import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui';
import { BookingEmbed } from '@/components/BookingEmbed';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { site, openingHoursDisplay } from '@/data/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Book a Table',
  description:
    'Reserve your table at La Meridiana in East Horsley, Surrey. One simple booking — lunch, dinner or a relaxed weekend.',
  path: '/book',
});

export default function BookPage() {
  return (
    <>
      <BreadcrumbJsonLd title="Book a Table" path="/book" />

      <PageHeader
        eyebrow="Reservations"
        title="Book a Table"
        lede="One booking flow, whatever you’re after — a quick weekday lunch, a long weekend dinner, or a table for a crowd."
      />

      <section className="section pt-12">
        <div className="container-page grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <BookingEmbed />
          </div>

          <aside className="space-y-6">
            <div className="rounded-card bg-panna-200/60 p-6">
              <h2 className="font-display text-xl">Opening hours</h2>
              <ul className="mt-4 space-y-2 text-sm text-espresso-600">
                {openingHoursDisplay.map((row) => (
                  <li key={row.days}>
                    <span className="block font-medium text-espresso">{row.days}</span>
                    {row.hours.map((h) => (
                      <span key={h} className="block">
                        {h}
                      </span>
                    ))}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-card border border-espresso/12 p-6">
              <h2 className="font-display text-xl">Large party or private hire?</h2>
              <p className="mt-2 text-sm leading-relaxed text-espresso-600">
                For groups of 8 or more, celebrations or exclusive use, get in touch and we’ll
                arrange everything personally.
              </p>
              <div className="mt-4 space-y-1 text-sm">
                <p>
                  <a href={site.phoneHref} className="font-medium text-terracotta hover:underline">
                    {site.phone}
                  </a>
                </p>
                <p>
                  <a
                    href={`mailto:${site.email}`}
                    className="font-medium text-terracotta hover:underline"
                  >
                    {site.email}
                  </a>
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
