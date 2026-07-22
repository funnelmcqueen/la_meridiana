import type { Metadata } from 'next';
import { PageHeader, SunDivider, BookingCTA, SectionHeading } from '@/components/ui';
import { Photo } from '@/components/Photo';
import { Reveal } from '@/components/Reveal';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { site } from '@/data/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'About Us',
  description:
    'The story of La Meridiana — an award-winning, family-minded Italian restaurant in East Horsley, Surrey, serving seasonal regional cooking in an unhurried dining room.',
  path: '/about',
});

/**
 * NOTE: The story copy below is a well-structured PLACEHOLDER written from the
 * confirmed brand facts. Replace the paragraphs with the restaurant's real
 * story when supplied (kept in this file for easy editing).
 */
export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd title="About Us" path="/about" />

      <PageHeader
        eyebrow="Our story"
        title="A little of who we are"
        lede="At heart we’re a neighbourhood restaurant — the sort of local you settle into for the evening. The cooking happens to be Italian and rather good; the welcome is pure East Horsley."
      />

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="prose-lameridiana max-w-none space-y-6 text-lg leading-relaxed text-espresso-700">
            <p>
              Tucked along Ockham Road South in East Horsley, La Meridiana has become one of
              Surrey&apos;s most-loved neighbourhood Italians — the kind of place regulars book by
              first name and newcomers leave already planning their return.
            </p>
            <p>
              The cooking is honest and seasonal — pasta rolled in-house, produce from suppliers we
              trust, classic recipes kept simple. But what people come back for is the feeling: a
              relaxed, generous evening out, the kind of good meal you’d happily make a weekly
              habit. Nothing is rushed, least of all you.
            </p>
            <p>
              That approach has earned some lovely recognition along the way — including{' '}
              <strong>Best Casual Restaurant in Surrey</strong> at the 2025 Muddy Stilettos Awards and{' '}
              <strong>Restaurant of the Year, South East</strong> at the 2022 Food Awards England. We
              are proud of them, but prouder still of the full room on an ordinary Tuesday.
            </p>
            <p className="text-espresso-600">
              <em>
                This is placeholder copy built from confirmed facts — swap in the restaurant&apos;s
                real story here.
              </em>
            </p>
          </div>

          <div>
            <Reveal>
              <Photo alt="The dining room at La Meridiana" aspect="portrait" label="The dining room" sizes="40vw" />
            </Reveal>
            <div className="mt-6 rounded-card bg-panna-200/60 p-6">
              <h2 className="font-display text-xl">Find us</h2>
              <address className="mt-3 space-y-0.5 text-sm not-italic text-espresso-600">
                <p>{site.address.street}</p>
                <p>{site.address.locality}</p>
                <p>
                  {site.address.postTown}, {site.address.postalCode}
                </p>
              </address>
              <p className="mt-3 text-sm">
                <a href={site.phoneHref} className="font-medium text-terracotta hover:underline">
                  {site.phone}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values strip */}
      <section className="section bg-panna-200/50">
        <div className="container-page">
          <SectionHeading
            eyebrow="What matters to us"
            title="Three things we never rush"
            centered
          />
          <SunDivider className="mx-auto my-10 max-w-xs" />
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                title: 'The cooking',
                body: 'Regional Italian dishes made from scratch, changing with what the season gives us.',
              },
              {
                title: 'The welcome',
                body: 'Warm, familiar service that treats a first visit like a returning one.',
              },
              {
                title: 'The time',
                body: 'A room designed for lingering — long lunches, unhurried dinners, another coffee.',
              },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 90}>
                <div className="text-center">
                  <h3 className="font-display text-xl text-terracotta">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-espresso-600">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
