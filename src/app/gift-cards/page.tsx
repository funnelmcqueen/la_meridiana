import type { Metadata } from 'next';
import { PageHeader, SunDivider } from '@/components/ui';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { site } from '@/data/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Gift Cards',
  description:
    'Give the gift of dinner at La Meridiana, East Horsley. Gift cards in any amount, redeemable against food and drink.',
  path: '/gift-cards',
});

const denominations = [25, 50, 75, 100];

// PLACEHOLDER: point at your gift-card provider (e.g. Toast, SumUp, Squarespace
// gift cards, or a Stripe Payment Link). Or wire a custom checkout here.
const giftCardPurchaseUrl = process.env.NEXT_PUBLIC_GIFT_CARD_URL || '#';

export default function GiftCardsPage() {
  return (
    <>
      <BreadcrumbJsonLd title="Gift Cards" path="/gift-cards" />

      <PageHeader
        eyebrow="Give a good evening"
        title="Gift cards"
        lede="A long Italian lunch, a celebratory dinner, or just an excuse to catch up — a La Meridiana gift card is always the right size."
      />

      <section className="section pt-12">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* The "card" visual */}
          <div className="order-2 lg:order-1">
            <div className="relative mx-auto aspect-[16/10] w-full max-w-md overflow-hidden rounded-card bg-gradient-to-br from-espresso via-espresso-700 to-terracotta-dark p-8 text-panna-50 shadow-lift">
              <svg
                className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 opacity-20"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                {Array.from({ length: 16 }).map((_, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1="50"
                    x2={50 + 60 * Math.cos((i * Math.PI) / 8)}
                    y2={50 + 60 * Math.sin((i * Math.PI) / 8)}
                    stroke="#DEB863"
                    strokeWidth="0.7"
                  />
                ))}
              </svg>
              <p className="font-display text-2xl">La Meridiana</p>
              <p className="mt-1 text-xs uppercase tracking-widelabel text-ochre-light">
                Gift Card
              </p>
              <p className="mt-10 text-sm text-panna-50/70">Redeemable against food &amp; drink</p>
              <p className="text-sm text-panna-50/70">{site.address.locality}, Surrey</p>
            </div>
          </div>

          {/* Purchase */}
          <div className="order-1 lg:order-2">
            <h2 className="font-display text-2xl">Choose an amount</h2>
            <p className="mt-2 text-sm text-espresso-600">
              Select a value to get started, or enter a custom amount at checkout.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {denominations.map((amount) => (
                <a
                  key={amount}
                  href={giftCardPurchaseUrl}
                  {...(giftCardPurchaseUrl.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="rounded-card border border-espresso/15 bg-panna-50 py-5 text-center font-display text-2xl transition hover:border-terracotta hover:text-terracotta"
                >
                  £{amount}
                </a>
              ))}
            </div>

            <a
              href={giftCardPurchaseUrl}
              {...(giftCardPurchaseUrl.startsWith('http')
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="btn-primary mt-6"
            >
              Buy a gift card
            </a>

            <p className="mt-3 text-xs text-espresso-500">
              Connect your gift-card provider via{' '}
              <code className="rounded bg-espresso/10 px-1 py-0.5">NEXT_PUBLIC_GIFT_CARD_URL</code>{' '}
              (see README).
            </p>

            <SunDivider className="my-8" />

            <ul className="space-y-2 text-sm text-espresso-600">
              <li>• Delivered by email, ready to print or forward.</li>
              <li>• Redeemable in the restaurant against any food and drink.</li>
              <li>• Valid for 12 months from purchase.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
