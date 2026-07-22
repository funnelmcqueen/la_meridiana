import type { Metadata } from 'next';
import { PageHeader, BookingCTA } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { NewsletterForm } from '@/components/NewsletterForm';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { events } from '@/data/events';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: "What's On",
  description:
    'Events, seasonal menus and offers at La Meridiana in East Horsley — wine suppers, midweek lunches and more. Join our newsletter so you never miss out.',
  path: '/whats-on',
});

const categoryColour: Record<string, string> = {
  Event: 'bg-terracotta/10 text-terracotta',
  Offer: 'bg-olive/10 text-olive-dark',
  Seasonal: 'bg-ochre/15 text-ochre-dark',
  'Live Music': 'bg-espresso/10 text-espresso',
};

export default function WhatsOnPage() {
  return (
    <>
      <BreadcrumbJsonLd title="What's On" path="/whats-on" />

      <PageHeader
        eyebrow="Events & offers"
        title="What's On"
        lede="Wine suppers, seasonal menus and the odd subscriber-only table. Here’s what’s coming up at La Meridiana."
      />

      {/* Newsletter capture — front and centre, per the brief */}
      <section className="container-page mt-10">
        <div className="rounded-card bg-espresso p-8 text-panna-50 sm:p-10">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow text-ochre-light">Get it first</p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl">
                Events, straight to your inbox
              </h2>
              <p className="mt-2 max-w-md text-sm text-panna-50/70">
                Subscribers hear about new events and seasonal menus first — and sometimes get
                tables we hold back just for the list.
              </p>
            </div>
            <NewsletterForm variant="dark" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-8 md:grid-cols-2">
          {events.map((event, i) => (
            <Reveal key={event.slug} delay={(i % 2) * 90}>
              <article className="flex h-full flex-col rounded-card border border-espresso/12 bg-panna-50 p-8 shadow-soft">
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      categoryColour[event.category] ?? 'bg-espresso/10 text-espresso'
                    }`}
                  >
                    {event.category}
                  </span>
                  <span className="text-sm font-medium text-espresso-500">{event.dateLabel}</span>
                </div>
                <h2 className="mt-4 font-display text-2xl">{event.title}</h2>
                <p className="mt-3 flex-1 leading-relaxed text-espresso-600">{event.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <BookingCTA heading="See something you fancy?" body="Reserve your table and we’ll take care of the rest." />
    </>
  );
}
