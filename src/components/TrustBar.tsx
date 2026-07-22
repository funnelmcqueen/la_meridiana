import Link from 'next/link';
import { awards } from '@/data/site';

/**
 * Trust bar — surfaces both awards directly beneath the hero (the key fix vs.
 * the old site, where awards were buried mid-page). Compact, high-contrast,
 * and links through to the dedicated Awards page.
 */
export function TrustBar() {
  return (
    <section aria-label="Awards and recognition" className="border-y border-espresso/10 bg-panna-200/60">
      <div className="container-page">
        <ul className="grid divide-y divide-espresso/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          {awards.map((award) => (
            <li key={award.title}>
              <Link
                href="/awards"
                className="group flex items-center gap-4 py-5 transition-colors hover:bg-panna-300/40 sm:px-8"
              >
                <AwardMark />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-espresso">
                    {award.title}
                  </span>
                  <span className="block text-xs text-espresso-600">
                    {award.organisation} · {award.year}
                  </span>
                </span>
                <span
                  className="ml-auto hidden text-terracotta transition-transform group-hover:translate-x-1 sm:block"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Small laurel/medal mark in ochre. */
function AwardMark() {
  return (
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ochre/15 text-ochre-dark">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 6.2l.9 1.8 2 .3-1.45 1.4.35 2L12 10.8l-1.8.9.35-2L9.1 8.3l2-.3.9-1.8Z" fill="currentColor" />
        <path d="M8.5 13.5L7 21l5-2.4L17 21l-1.5-7.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
