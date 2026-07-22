import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui';
import { site } from '@/data/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy',
  description: `How ${site.name} handles your data when you contact us, book a table or join our newsletter.`,
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy policy" />
      <section className="section pt-10">
        <div className="container-page max-w-2xl space-y-6 text-espresso-700">
          <p className="rounded-card border border-ochre/30 bg-ochre/10 px-4 py-3 text-sm">
            <strong>Placeholder policy.</strong> Replace this with a policy reviewed for UK GDPR
            before going live — especially the newsletter and analytics sections.
          </p>

          <div>
            <h2 className="font-display text-xl">What we collect</h2>
            <p className="mt-2 leading-relaxed text-espresso-600">
              When you contact us, book a table or subscribe to our newsletter, we collect the
              details you provide (such as your name, email, phone and message) to respond to you
              and, where you’ve opted in, to send occasional updates about events and menus.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl">How we use it</h2>
            <p className="mt-2 leading-relaxed text-espresso-600">
              We use your information only to handle your enquiry or booking and to send you
              marketing where you have consented. You can unsubscribe from our newsletter at any
              time via the link in every email.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl">Analytics</h2>
            <p className="mt-2 leading-relaxed text-espresso-600">
              We may use Google Analytics to understand how the site is used. This can be configured
              to anonymise your IP address, and can be gated behind a cookie-consent banner if
              required.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl">Contact</h2>
            <p className="mt-2 leading-relaxed text-espresso-600">
              For any questions about your data, email{' '}
              <a href={`mailto:${site.email}`} className="font-medium text-terracotta hover:underline">
                {site.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
