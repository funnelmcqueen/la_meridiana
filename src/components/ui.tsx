import Link from 'next/link';

/** Interior-page header: eyebrow + title + optional lede, consistent spacing. */
export function PageHeader({
  eyebrow,
  title,
  lede,
  centered = false,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  centered?: boolean;
}) {
  return (
    <header
      className={`container-page pt-14 sm:pt-20 ${centered ? 'text-center' : ''}`}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className="mt-3 font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      {lede && (
        <p
          className={`mt-5 text-lg leading-relaxed text-espresso-600 ${
            centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'
          }`}
        >
          {lede}
        </p>
      )}
    </header>
  );
}

/** Section title used within pages. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  centered = false,
  className = '',
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  centered?: boolean;
  className?: string;
}) {
  return (
    <div className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">{title}</h2>
      {lede && <p className="mt-4 text-base leading-relaxed text-espresso-600">{lede}</p>}
    </div>
  );
}

/** A thin decorative divider based on the sundial motif. */
export function SunDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-espresso/15" />
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="4" fill="#C99A3E" />
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={i}
            x1={12 + 7 * Math.cos((i * Math.PI) / 4)}
            y1={12 + 7 * Math.sin((i * Math.PI) / 4)}
            x2={12 + 10 * Math.cos((i * Math.PI) / 4)}
            y2={12 + 10 * Math.sin((i * Math.PI) / 4)}
            stroke="#C99A3E"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        ))}
      </svg>
      <span className="h-px flex-1 bg-espresso/15" />
    </div>
  );
}

/** Reusable "Book a Table" call-to-action band, dark on espresso. */
export function BookingCTA({
  heading = 'Join us at the table',
  body = 'Lunch, dinner or a lazy Sunday — reserve in a few taps. One simple booking flow, every time.',
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <section className="section">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-card bg-espresso px-6 py-14 text-center text-panna-50 sm:px-12 sm:py-20">
          {/* faint sundial backdrop */}
          <svg
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 opacity-10"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            {Array.from({ length: 16 }).map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={50 + 60 * Math.cos((i * Math.PI) / 8)}
                y2={50 + 60 * Math.sin((i * Math.PI) / 8)}
                stroke="#DEB863"
                strokeWidth="0.6"
              />
            ))}
          </svg>
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl sm:text-4xl">{heading}</h2>
            <p className="mx-auto mt-4 max-w-xl text-panna-50/75">{body}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/book" className="btn-primary">
                Book a Table
              </Link>
              <Link href="/menu" className="btn-ghost-dark">
                View the menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
