import Image from 'next/image';

type AspectKey = 'square' | 'portrait' | 'landscape' | 'wide' | 'hero';

const aspectClass: Record<AspectKey, string> = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  wide: 'aspect-[16/9]',
  hero: 'aspect-[16/10] sm:aspect-[16/9]',
};

/**
 * A single, consistent frame for ALL food/interior photography.
 *
 * - Pass `src` (a file in /public/images) once you have final, colour-graded
 *   photos — it renders via next/image (lazy by default; set `priority` for
 *   above-the-fold hero images) with the uniform warm grade from `.photo-frame`.
 * - Until then, omit `src` and it renders an intentional, on-brand placeholder
 *   at the correct aspect ratio, so layouts are final and swapping in real
 *   images never shifts the design (see README → Photography).
 */
export function Photo({
  src,
  alt,
  aspect = 'landscape',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  label,
  className = '',
}: {
  src?: string;
  alt: string;
  aspect?: AspectKey;
  priority?: boolean;
  sizes?: string;
  label?: string;
  className?: string;
}) {
  return (
    <div className={`photo-frame ${aspectClass[aspect]} ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <Placeholder label={label ?? alt} />
      )}
    </div>
  );
}

/** On-brand placeholder: warm gradient + subtle sundial motif + caption. */
function Placeholder({ label }: { label: string }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center bg-gradient-to-br from-espresso-700 via-espresso-600 to-terracotta-dark"
      role="img"
      aria-label={`${label} (photography coming soon)`}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.12]"
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Sundial rays — a nod to "La Meridiana" */}
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={50 + 60 * Math.cos((i * Math.PI) / 6)}
            y2={50 + 60 * Math.sin((i * Math.PI) / 6)}
            stroke="#F7F1E6"
            strokeWidth="0.5"
          />
        ))}
        <circle cx="50" cy="50" r="3" fill="#F7F1E6" />
      </svg>
      <span className="relative z-10 px-4 text-center font-sans text-[0.7rem] font-medium uppercase tracking-widelabel text-panna-50/80">
        {label}
      </span>
    </div>
  );
}
