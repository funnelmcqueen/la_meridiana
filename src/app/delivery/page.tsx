import type { Metadata } from 'next';
import { PageHeader, SunDivider } from '@/components/ui';
import { Photo } from '@/components/Photo';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { site } from '@/data/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Delivery & Takeaway',
  description:
    'Order La Meridiana to your door in East Horsley and around. Italian favourites for delivery and collection.',
  path: '/delivery',
});

/**
 * Delivery / ordering options. This is intentionally SEPARATE from table
 * bookings. Replace the placeholder links with real ordering URLs, or set the
 * env vars below. Add/remove providers freely.
 */
const orderOptions = [
  {
    name: 'Order for delivery',
    provider: 'Deliveroo / Uber Eats / Just Eat',
    description: 'Get your favourites delivered hot to your door across East Horsley and nearby.',
    href: process.env.NEXT_PUBLIC_DELIVERY_URL || '#', // PLACEHOLDER
    cta: 'Start an order',
    primary: true,
  },
  {
    name: 'Collection',
    provider: 'Call ahead',
    description: 'Prefer to pick up? Call us and we’ll have it boxed and ready when you arrive.',
    href: site.phoneHref,
    cta: `Call ${site.phone}`,
    primary: false,
  },
];

export default function DeliveryPage() {
  return (
    <>
      <BreadcrumbJsonLd title="Delivery & Takeaway" path="/delivery" />

      <PageHeader
        eyebrow="At home"
        title="Delivery & takeaway"
        lede="Not making it in tonight? Bring La Meridiana home. The same kitchen, boxed carefully for the journey."
      />

      <div className="container-page mt-6">
        <p className="rounded-card border border-ochre/30 bg-ochre/10 px-4 py-3 text-sm text-espresso-700">
          <strong>Set your ordering links.</strong> Point the buttons at your real delivery
          providers via <code className="rounded bg-espresso/10 px-1 py-0.5 text-xs">NEXT_PUBLIC_DELIVERY_URL</code>{' '}
          or edit <code className="rounded bg-espresso/10 px-1 py-0.5 text-xs">src/app/delivery/page.tsx</code>.
        </p>
      </div>

      <section className="section pt-12">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div className="grid gap-5">
            {orderOptions.map((opt) => (
              <div
                key={opt.name}
                className="rounded-card border border-espresso/12 bg-panna-50 p-7 shadow-soft"
              >
                <p className="text-xs font-semibold uppercase tracking-widelabel text-terracotta">
                  {opt.provider}
                </p>
                <h2 className="mt-2 font-display text-2xl">{opt.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-espresso-600">{opt.description}</p>
                <a
                  href={opt.href}
                  {...(opt.href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className={`mt-5 ${opt.primary ? 'btn-primary' : 'btn-ghost'}`}
                >
                  {opt.cta}
                </a>
              </div>
            ))}
          </div>

          <div>
            <Photo alt="A La Meridiana dish boxed for delivery" aspect="landscape" label="Delivery" sizes="45vw" />
            <SunDivider className="my-8" />
            <h2 className="font-display text-xl">Delivery area &amp; times</h2>
            <p className="mt-2 text-sm leading-relaxed text-espresso-600">
              We deliver across East Horsley and surrounding villages during opening hours. Exact
              radius and minimum order depend on the provider — full details show at checkout.
              <em className="block mt-2 text-espresso-500">
                (Placeholder — confirm your delivery area and any minimum spend.)
              </em>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
