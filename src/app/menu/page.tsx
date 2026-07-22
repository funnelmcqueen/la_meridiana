import Link from 'next/link';
import type { Metadata } from 'next';
import { PageHeader, SunDivider, BookingCTA } from '@/components/ui';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { menu, menuIntro, menuTagLabels } from '@/data/menu';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Menu',
  description:
    'Explore the La Meridiana menu — seasonal Italian antipasti, hand-rolled pasta, stone-baked pizza, secondi and dolci, in East Horsley, Surrey.',
  path: '/menu',
});

export default function MenuPage() {
  return (
    <>
      <BreadcrumbJsonLd title="Menu" path="/menu" />

      <PageHeader eyebrow="Eat & drink" title="The Menu" lede={menuIntro} />

      {/* Placeholder notice — remove once real menu is in */}
      <div className="container-page mt-6">
        <p className="rounded-card border border-ochre/30 bg-ochre/10 px-4 py-3 text-sm text-espresso-700">
          <strong>Sample menu.</strong> Dishes and prices below are placeholders — replace them in{' '}
          <code className="rounded bg-espresso/10 px-1 py-0.5 text-xs">src/data/menu.ts</code>. Menus change seasonally.
        </p>
      </div>

      <div className="container-page section pt-12">
        {/* Quick jump nav */}
        <nav aria-label="Menu sections" className="mb-12 flex flex-wrap gap-2">
          {menu.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-full border border-espresso/15 px-4 py-2 text-sm font-medium text-espresso-700 transition hover:border-terracotta hover:text-terracotta"
            >
              {section.title}
            </a>
          ))}
        </nav>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-20">
          {menu.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-display text-2xl sm:text-3xl">{section.title}</h2>
                {section.italian && (
                  <span className="text-sm italic text-espresso-500">{section.italian}</span>
                )}
              </div>
              <SunDivider className="my-6" />
              <ul className="space-y-6">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <div className="flex items-baseline gap-3">
                      <h3 className="font-medium text-espresso">{item.name}</h3>
                      <span
                        className="mx-2 hidden flex-1 border-b border-dotted border-espresso/25 sm:block"
                        aria-hidden="true"
                      />
                      <span className="font-sans text-sm font-semibold text-terracotta">
                        £{item.price}
                      </span>
                    </div>
                    {item.description && (
                      <p className="mt-1 max-w-prose text-sm leading-relaxed text-espresso-600">
                        {item.description}
                      </p>
                    )}
                    {item.tags && item.tags.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {item.tags
                          .filter((t) => t !== 'signature')
                          .map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-olive/10 px-2 py-0.5 text-[0.68rem] font-medium uppercase tracking-wide text-olive-dark"
                              title={menuTagLabels[tag]}
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Legend + allergen note */}
        <div className="mt-16 rounded-card bg-panna-200/60 p-6 text-sm text-espresso-600">
          <p>
            <span className="font-semibold text-espresso">v</span> vegetarian ·{' '}
            <span className="font-semibold text-espresso">ve</span> vegan ·{' '}
            <span className="font-semibold text-espresso">gf</span> gluten-free.
          </p>
          <p className="mt-2">
            Please tell us about any allergies or dietary requirements when you book or order — many
            dishes can be adapted.{' '}
            <Link href="/contact" className="font-medium text-terracotta hover:underline">
              Get in touch
            </Link>
            .
          </p>
        </div>
      </div>

      <BookingCTA heading="Hungry yet?" body="Book your table now, or order La Meridiana to your door." />
    </>
  );
}
