'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Lightweight scroll-reveal wrapper, built as progressive enhancement:
 *
 * - Content renders VISIBLE by default, so it's there for search engines and
 *   for anyone with JS disabled (no blank sections, ever).
 * - On mount, elements that are still below the fold are hidden and then faded
 *   in as they scroll into view. Elements already on-screen stay visible (no
 *   flash). Respects `prefers-reduced-motion` via the CSS in globals.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement | null>(null);
  // Start shown; only arm the animation once JS confirms it can observe.
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    // If it's already in view on load, leave it visible — don't flash.
    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight * 0.85;
    if (alreadyVisible) return;

    setArmed(true);
    setShown(false);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Component = Tag as React.ElementType;
  return (
    <Component
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${armed ? 'transition-all duration-700 ease-out' : ''} ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      } ${className}`}
    >
      {children}
    </Component>
  );
}
