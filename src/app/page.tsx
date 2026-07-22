import Link from 'next/link';
import type { Metadata } from 'next';
import { Photo } from '@/components/Photo';
import { TrustBar } from '@/components/TrustBar';
import { Reveal } from '@/components/Reveal';
import { SectionHeading, SunDivider, BookingCTA } from '@/components/ui';
import { NewsletterForm } from '@/components/NewsletterForm';
import { activeHero, site, openingHoursDisplay } from '@/data/site';
import { menu } from '@/data/menu';
import { featuredEvent } from '@/data/events';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Home',
  description: site.description,
  path: '/',
});

// Pull a few signature dishes across sections for the "featured" strip.
const featuredDishes = menu
  .flatMap((s) => s.items.map((i) => ({ ...i, section: s.title })))
  .filter((i) => i.tags?.includes('signature'))
  .slice(0, 3);

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- HERO */}
      <section className="relative overflow-hidden">
        <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div className="animate-fade-up">
            <p className="eyebrow">{activeHero.eyebrow}</p>
            <h1 className="mt-4 font-display text-[2.6rem] leading-[1.03] sm:text-6xl lg:text-[4.2rem]">
              {activeHero.headline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-espresso-600">
              {activeHero.subheadline}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/book" className="btn-primary">
                Book a Table
              </Link>
              <Link href="/menu" className="btn-ghost">
                Explore the menu
              </Link>
            </div>
            <p className="mt-6 text-sm text-espresso-500">
              {site.address.street}, {site.address.locality} ·{' '}
              <a href={site.phoneHref} className="font-medium text-terracotta hover:underline">
                {site.phone}
              </a>
            </p>
          </div>

          <div className="relative">
            <Photo
              alt="La Meridiana dining room, warmly lit"
              aspect="portrait"
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              label="Hero photography"
              className="shadow-lift"
            />
            {/* Floating hours chip */}
            <div className="absolute -bottom-5 -left-3 hidden rounded-card bg-panna-50 p-4 shadow-soft sm:block">
              <p className="text-xs font-semibold uppercase tracking-widelabel text-terracotta">
                Open today
              </p>
              <p className="mt-1 text-sm font-medium text-espresso">Lunch &amp; dinner · from 12pm</p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- TRUST BAR */}
      <TrustBar />

      {/* ------------------------------------------------------- FEATURED DISHES */}
      <section className="section">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="From the kitchen"
              title="A few of our favourites"
              lede="Cooked from scratch, led by the season and made to be shared around the table. Here’s a taste of what to expect."
            />
            <Link href="/menu" className="btn-ghost shrink-0">
              See the full menu
            </Link>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredDishes.map((dish, i) => (
              <Reveal key={dish.name} delay={i * 90}>
                <article className="group">
                  <Photo
                    alt={dish.name}
                    aspect="landscape"
                    label={dish.name}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="mt-4 flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-xl">{dish.name}</h3>
                    <span className="font-sans text-sm font-semibold text-terracotta">
                      £{dish.price}
                    </span>
                  </div>
                  {dish.description && (
                    <p className="mt-1.5 text-sm leading-relaxed text-espresso-600">
                      {dish.description}
                    </p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- ABOUT TEASER */}
      <section className="section bg-panna-200/50">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <Photo alt="Fresh pasta being made by hand" aspect="portrait" label="In the kitchen" sizes="25vw" />
              <Photo
                alt="The dining room at dusk"
                aspect="portrait"
                label="The room"
                className="mt-8"
                sizes="25vw"
              />
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Our story"
              title="The local that happens to do brilliant Italian"
              lede="For years, La Meridiana has been where East Horsley comes to eat well and stay a while. Family-minded, seasonally led and unhurried by design — we’d rather you settled in for another coffee than rushed for the bill. Great cooking, the way we like to do things here."
            />
            <SunDivider className="my-8 max-w-sm" />
            <Link href="/about" className="btn-ghost">
              Read our story
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ WHAT'S ON TEASER */}
      <section className="section">
        <div className="container-page grid items-stretch gap-8 lg:grid-cols-2">
          <div className="rounded-card bg-espresso p-8 text-panna-50 sm:p-12">
            <p className="eyebrow text-ochre-light">What&apos;s on</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">{featuredEvent.title}</h2>
            <p className="mt-2 text-sm font-medium text-ochre-light">{featuredEvent.dateLabel}</p>
            <p className="mt-4 max-w-md text-panna-50/75">{featuredEvent.summary}</p>
            <Link href="/whats-on" className="btn-ghost-dark mt-8">
              See what&apos;s on
            </Link>
          </div>

          <div className="flex flex-col justify-center rounded-card border border-espresso/12 bg-panna-50 p-8 sm:p-12">
            <p className="eyebrow">Never miss a thing</p>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl">
              Join the list for events &amp; seasonal menus
            </h2>
            <p className="mt-3 text-sm text-espresso-600">
              We share upcoming events, new menus and subscriber-only tables by email —
              so you’re not relying on the Instagram algorithm to catch them.
            </p>
            <div className="mt-6">
              <NewsletterForm variant="light" />
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- HOURS */}
      <section className="border-t border-espresso/10 bg-panna-200/50">
        <div className="container-page grid gap-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {openingHoursDisplay.map((row) => (
            <div key={row.days}>
              <p className="text-sm font-semibold text-espresso">{row.days}</p>
              {row.hours.map((h) => (
                <p key={h} className="text-sm text-espresso-600">
                  {h}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------------- BOOKING CTA */}
      <BookingCTA />
    </>
  );
}
