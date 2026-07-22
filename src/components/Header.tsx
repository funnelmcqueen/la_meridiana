'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { nav } from '@/data/site';
import { bookingPagePath } from '@/lib/booking';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Elevate the header once the user scrolls past the hero fold.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile drawer on route change + lock body scroll while open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? 'border-b border-espresso/10 bg-panna/95 backdrop-blur'
          : 'border-b border-transparent bg-panna/80 backdrop-blur-sm'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-espresso focus:px-4 focus:py-2 focus:text-sm focus:text-panna-50"
      >
        Skip to content
      </a>

      <nav
        aria-label="Primary"
        className="container-page flex h-16 items-center justify-between gap-4 lg:h-20"
      >
        <Logo />

        {/* Desktop nav */}
        <ul className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative py-1 text-sm font-medium transition-colors hover:text-terracotta ${
                    active ? 'text-terracotta' : 'text-espresso-700'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-terracotta" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link href={bookingPagePath} className="btn-primary hidden sm:inline-flex">
            Book a Table
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-espresso/15 text-espresso lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-300 ${
                  open ? 'top-1/2 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 bg-current transition-opacity duration-300 ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-300 ${
                  open ? 'top-1/2 -rotate-45' : 'bottom-0'
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`lg:hidden ${open ? 'block' : 'hidden'}`}
      >
        <ul className="container-page flex flex-col gap-1 pb-6 pt-2">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`block rounded-lg px-3 py-3 text-base font-medium ${
                    active ? 'bg-terracotta/10 text-terracotta' : 'text-espresso-700 hover:bg-espresso/5'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li className="mt-3">
            <Link href={bookingPagePath} className="btn-primary w-full">
              Book a Table
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
