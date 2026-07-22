import Link from 'next/link';

/**
 * Wordmark + sundial mark. Uses the display serif so it reads as the brand
 * everywhere. Replace the SVG with a supplied logo asset if one is provided.
 */
export function Logo({ inverted = false }: { inverted?: boolean }) {
  const text = inverted ? 'text-panna-50' : 'text-espresso';
  const mark = inverted ? '#F7F1E6' : '#B4502E';
  return (
    <Link
      href="/"
      aria-label="La Meridiana — home"
      className="group inline-flex items-center gap-2.5"
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="shrink-0 transition-transform duration-500 group-hover:rotate-45"
      >
        <circle cx="20" cy="20" r="18" stroke={mark} strokeWidth="1.5" />
        {/* gnomon / hand of the sundial */}
        <line x1="20" y1="20" x2="20" y2="5" stroke={mark} strokeWidth="1.5" />
        <line x1="20" y1="20" x2="31" y2="26" stroke={mark} strokeWidth="1.5" />
        <circle cx="20" cy="20" r="2" fill={mark} />
      </svg>
      <span
        className={`font-display text-xl font-semibold leading-none tracking-tight ${text}`}
      >
        La Meridiana
      </span>
    </Link>
  );
}
