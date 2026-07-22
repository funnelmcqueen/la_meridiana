import type { Metadata } from 'next';
import { PageHeader, BookingCTA } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { awards, pressMentions } from '@/data/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Awards',
  description:
    'La Meridiana’s awards — Best Casual Restaurant in Surrey (Muddy Stilettos 2025) and Restaurant of the Year, South East (Food Awards England 2022).',
  path: '/awards',
});

export default function AwardsPage() {
  return (
    <>
      <BreadcrumbJsonLd title="Awards" path="/awards" />

      <PageHeader
        eyebrow="Recognition"
        title="Awards & press"
        lede="We let the food do the talking — but it’s nice when others join in. Here’s the recognition La Meridiana has earned, and where to read more."
      />

      <section className="section">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          {awards.map((award, i) => (
            <Reveal key={award.title} delay={i * 100}>
              <article className="flex h-full flex-col rounded-card border border-espresso/12 bg-panna-50 p-8 shadow-soft">
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-ochre/15 text-ochre-dark">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.6" />
                      <path
                        d="M12 6.2l.9 1.8 2 .3-1.45 1.4.35 2L12 10.8l-1.8.9.35-2L9.1 8.3l2-.3.9-1.8Z"
                        fill="currentColor"
                      />
                      <path
                        d="M8.5 13.5L7 21l5-2.4L17 21l-1.5-7.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widelabel text-terracotta">
                      {award.organisation} · {award.year}
                    </p>
                    <h2 className="mt-1 font-display text-2xl leading-tight">{award.title}</h2>
                  </div>
                </div>
                <p className="mt-6 flex-1 leading-relaxed text-espresso-600">{award.blurb}</p>
                <a
                  href={award.pressUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta hover:underline"
                >
                  Read more
                  <span aria-hidden="true">→</span>
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Press mentions */}
      <section className="section bg-panna-200/50">
        <div className="container-page">
          <h2 className="text-center font-display text-3xl">In the press</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-espresso-600">
            A selection of coverage. Replace these with confirmed publications and links.
          </p>
          <ul className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
            {pressMentions.map((p) => (
              <li key={p.outlet}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-card border border-espresso/12 bg-panna-50 p-6 transition hover:border-terracotta/50 hover:shadow-soft"
                >
                  <p className="font-display text-lg text-espresso">“{p.quote}”</p>
                  <p className="mt-2 text-sm font-medium text-terracotta">— {p.outlet}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <BookingCTA heading="Come see what the fuss is about" />
    </>
  );
}
