import Link from 'next/link';
import { Logo } from './Logo';
import { NewsletterForm } from './NewsletterForm';
import { site, nav, openingHoursDisplay } from '@/data/site';
import { bookingPagePath } from '@/lib/booking';

export function Footer() {
  const year = 2026; // Static to keep the footer server-rendered & deterministic.

  return (
    <footer className="mt-auto bg-espresso text-panna-50">
      {/* Newsletter band */}
      <div className="border-b border-panna-50/10">
        <div className="container-page grid gap-8 py-14 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow text-ochre-light">Stay in the loop</p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl">
              What&apos;s on, before it&apos;s everywhere else
            </h2>
            <p className="mt-2 max-w-md text-sm text-panna-50/70">
              Events, seasonal menus and the odd table released just for
              subscribers. No spam — just the good stuff, straight from Ockham Road.
            </p>
          </div>
          <div className="lg:justify-self-end lg:pl-8">
            <NewsletterForm variant="dark" />
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo inverted />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-panna-50/70">
            {site.description}
          </p>
          <div className="mt-5 flex gap-3">
            <SocialLink href={site.social.instagram.url} label="Instagram">
              <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.26 2.2.43.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.17.4.37 1 .43 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.26 1.8-.43 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.17-1 .37-2.2.43-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.8-.26-2.2-.43-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.17-.4-.37-1-.43-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.26-1.8.43-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.17 1-.37 2.2-.43C8.4 2.2 8.8 2.2 12 2.2Zm0 3.5A6.3 6.3 0 1 0 18.3 12 6.3 6.3 0 0 0 12 5.7Zm0 10.4A4.1 4.1 0 1 1 16.1 12 4.1 4.1 0 0 1 12 16.1Zm6.5-10.6a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5Z" />
            </SocialLink>
            <SocialLink href={site.social.facebook.url} label="Facebook">
              <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z" />
            </SocialLink>
            <SocialLink href={site.social.tripadvisor.url} label="TripAdvisor">
              <path d="M12 8.5c-2.3-1-5-1.5-7.9-1.5L2 9.2a4.3 4.3 0 1 0 5.9 6 4.2 4.2 0 0 0 4.1 1 4.2 4.2 0 0 0 4.1-1 4.3 4.3 0 1 0 5.9-6L20 7c-2.9 0-5.6.5-8 1.5Zm-5 8.6a2.6 2.6 0 1 1 2.6-2.6A2.6 2.6 0 0 1 7 17.1Zm10 0a2.6 2.6 0 1 1 2.6-2.6 2.6 2.6 0 0 1-2.6 2.6Z" />
            </SocialLink>
          </div>
        </div>

        {/* Visit */}
        <div>
          <h3 className="font-display text-lg">Visit</h3>
          <address className="mt-4 space-y-1 text-sm not-italic text-panna-50/70">
            <p>{site.address.street}</p>
            <p>{site.address.locality}</p>
            <p>
              {site.address.postTown}, {site.address.postalCode}
            </p>
          </address>
          <div className="mt-4 space-y-1 text-sm">
            <p>
              <a href={site.phoneHref} className="hover:text-ochre-light">
                {site.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="hover:text-ochre-light">
                {site.email}
              </a>
            </p>
          </div>
        </div>

        {/* Hours */}
        <div>
          <h3 className="font-display text-lg">Opening hours</h3>
          <ul className="mt-4 space-y-2 text-sm text-panna-50/70">
            {openingHoursDisplay.map((row) => (
              <li key={row.days}>
                <span className="block font-medium text-panna-50">{row.days}</span>
                {row.hours.map((h) => (
                  <span key={h} className="block">
                    {h}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h3 className="font-display text-lg">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm text-panna-50/70">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-ochre-light">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={bookingPagePath} className="font-medium text-ochre-light hover:text-ochre">
                Book a Table
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-panna-50/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-panna-50/50 sm:flex-row">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-panna-50">
              Privacy
            </Link>
            <Link href="/contact" className="hover:text-panna-50">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-panna-50/20 text-panna-50/80 transition hover:border-ochre-light hover:text-ochre-light"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        {children}
      </svg>
    </a>
  );
}
