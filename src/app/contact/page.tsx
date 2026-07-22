import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui';
import { ContactForm } from '@/components/ContactForm';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { site, openingHoursDisplay } from '@/data/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description:
    'Contact La Meridiana in East Horsley, Surrey — address, map, phone, email and enquiry form. Ockham Road South, KT24 6QU.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd title="Contact" path="/contact" />

      <PageHeader
        eyebrow="Say hello"
        title="Contact & find us"
        lede="Questions, dietary requirements, a big celebration to plan? Drop us a line — or just pop in."
      />

      <section className="section pt-12">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          {/* Details + form */}
          <div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-widelabel text-terracotta">
                  Address
                </h2>
                <address className="mt-3 space-y-0.5 text-sm not-italic text-espresso-600">
                  <p>{site.address.street}</p>
                  <p>{site.address.locality}</p>
                  <p>
                    {site.address.postTown}, {site.address.postalCode}
                  </p>
                </address>
                <a
                  href={site.mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-medium text-terracotta hover:underline"
                >
                  Get directions →
                </a>
              </div>
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-widelabel text-terracotta">
                  Get in touch
                </h2>
                <div className="mt-3 space-y-1 text-sm text-espresso-600">
                  <p>
                    <a href={site.phoneHref} className="hover:text-terracotta">
                      {site.phone}
                    </a>
                  </p>
                  <p>
                    <a href={`mailto:${site.email}`} className="hover:text-terracotta">
                      {site.email}
                    </a>
                  </p>
                </div>
                <h2 className="mt-5 text-sm font-semibold uppercase tracking-widelabel text-terracotta">
                  Hours
                </h2>
                <ul className="mt-3 space-y-1.5 text-sm text-espresso-600">
                  {openingHoursDisplay.map((row) => (
                    <li key={row.days}>
                      <span className="font-medium text-espresso">{row.days}: </span>
                      {row.hours.join(' · ')}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="font-display text-2xl">Send a message</h2>
              <p className="mt-2 text-sm text-espresso-600">
                We’ll reply to {site.email}. Required fields are marked{' '}
                <span className="text-terracotta">*</span>.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <div className="overflow-hidden rounded-card border border-espresso/12 shadow-soft">
              <iframe
                src={site.mapsEmbedSrc}
                title={`Map showing ${site.name}, ${site.address.postalCode}`}
                className="h-[420px] w-full lg:h-full lg:min-h-[560px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
