import Script from 'next/script';

/**
 * Google Analytics 4 — placeholder integration.
 *
 * Renders nothing until NEXT_PUBLIC_GA_MEASUREMENT_ID (e.g. "G-XXXXXXXXXX") is
 * set in the environment, so local/dev runs stay clean. When set, GA4 loads
 * with `afterInteractive` so it never blocks first paint. Swap in a consent /
 * cookie-banner gate here if you need GDPR opt-in before loading.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
