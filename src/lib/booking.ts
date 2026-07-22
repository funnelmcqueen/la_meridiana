/**
 * Single source of truth for the booking provider (Dojo).
 *
 * The ENTIRE site's "Book a Table" experience points here — there is exactly
 * one booking flow (the old site's Dojo + Quandoo split is gone). Set the real
 * Dojo booking URL in `.env.local` as NEXT_PUBLIC_DOJO_BOOKING_URL; see README.
 */
export const bookingUrl = process.env.NEXT_PUBLIC_DOJO_BOOKING_URL || '';

/** True once a real Dojo URL is configured. */
export const bookingConfigured = bookingUrl.trim().length > 0;

/** Where the "Book a Table" nav/CTA buttons send people (the on-site page). */
export const bookingPagePath = '/book';
