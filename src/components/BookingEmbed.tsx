import { bookingUrl, bookingConfigured } from '@/lib/booking';
import { site } from '@/data/site';

/**
 * The ONE booking flow for the whole site (Dojo).
 *
 * When NEXT_PUBLIC_DOJO_BOOKING_URL is set, we embed Dojo's booking page in a
 * sandboxed iframe. Until then, we show an accessible fallback with the phone
 * number so the page is never a dead end. Every "Book a Table" button on the
 * site routes here — there is no second widget anywhere (the old Dojo+Quandoo
 * split is gone).
 */
export function BookingEmbed() {
  if (bookingConfigured) {
    return (
      <div className="overflow-hidden rounded-card border border-espresso/12 bg-panna-50 shadow-soft">
        <iframe
          src={bookingUrl}
          title={`Book a table at ${site.name}`}
          className="h-[720px] w-full"
          loading="lazy"
          // Dojo widgets need scripts + forms; keep the sandbox tight otherwise.
          sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-top-navigation-by-user-activation"
        />
      </div>
    );
  }

  // Fallback shown until the Dojo URL is configured.
  return (
    <div className="rounded-card border border-dashed border-espresso/25 bg-panna-200/50 p-8 text-center">
      <div className="mx-auto max-w-md">
        <h2 className="font-display text-2xl">Reserve your table</h2>
        <p className="mt-3 text-sm leading-relaxed text-espresso-600">
          The online booking widget appears here once connected. To finish setup, add your Dojo
          booking link as{' '}
          <code className="rounded bg-espresso/10 px-1 py-0.5 text-xs">
            NEXT_PUBLIC_DOJO_BOOKING_URL
          </code>{' '}
          (see the README). In the meantime, we’d love to take your booking by phone:
        </p>
        <a href={site.phoneHref} className="btn-primary mt-6">
          Call {site.phone}
        </a>
        <p className="mt-4 text-xs text-espresso-500">
          Or email us at{' '}
          <a href={`mailto:${site.email}`} className="font-medium text-terracotta hover:underline">
            {site.email}
          </a>
        </p>
      </div>
    </div>
  );
}
