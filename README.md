# La Meridiana — website

A modern, fast, SEO-friendly rebuild of the website for **La Meridiana**, an
award-winning Italian restaurant in East Horsley, Surrey. Built with
**Next.js (App Router)**, **TypeScript** and **Tailwind CSS**, and designed to
deploy to **Vercel**.

This rebuild directly addresses the issues raised in the website audit:

| Audit issue | How this build fixes it |
|---|---|
| Two competing booking widgets (Dojo + Quandoo) | **One** booking flow (Dojo), same CTA everywhere → `/book` |
| No email capture | Newsletter signup in the footer **and** on the What's On page |
| Generic template feel | Custom warm "sundial" design system — no red/white/green cliché |
| Awards buried mid-page | **Trust bar** directly under the hero, plus a dedicated Awards page |
| Inconsistent photography | Single `<Photo>` frame applies one uniform crop + warm grade to every image |
| Generic hero tagline | 3 distinct hero options to choose from (see below) |
| Duplicated nav/hero markup | Single server-rendered layout; one `<Header>`, one hero, clean DOM |

---

## 1. Running it locally

```bash
cd la-meridiana
npm install
cp .env.example .env.local   # optional for local dev; see section 4
npm run dev                  # http://localhost:3000
```

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

> Requires Node 18.18+ (developed on Node 22).

---

## 2. Choose your hero headline

The brief asked for three distinct hero options. They live in
`src/data/site.ts` as `heroOptions` (all deliberately avoiding "a little slice
of Italy" and similar clichés):

- **Option A** — *"Italian cooking, told by the hour"* — leans on the name
  (La Meridiana = *sundial*) and the unhurried, all-day rhythm. **(live)**
- **Option B** — *"Surrey's table for proper Italian food"* — leads with place
  + the awards, confident and warm.
- **Option C** — *"Where the afternoon slows down"* — sensory, place-and-light.

Switch the live one by changing a single number in `src/data/site.ts`:

```ts
export const activeHeroIndex = 0; // 0 = A, 1 = B, 2 = C
```

---

## 3. Swapping in real content

All content lives in three plain files under `src/data/` — no code changes
needed, and the layouts/SEO/schema all read from them:

| File | Contains |
|---|---|
| `src/data/site.ts` | Name, address, phone, email, **opening hours**, socials, **awards**, hero copy |
| `src/data/menu.ts` | Every menu section, dish, description, price, dietary tags |
| `src/data/events.ts` | What's On events / offers |

Everything currently marked `PLACEHOLDER` (menu dishes, About story, events,
press links, social URLs) should be replaced with the confirmed real content.

### Photography (the "consistent treatment" fix)

1. Drop final images into `public/images/` (see `public/images/README.md`).
2. Reference them via the `<Photo src="/images/your-file.jpg" … />` component —
   it renders through `next/image` (responsive, lazy, AVIF/WebP).
3. Every food/interior photo passes through the **same** `.photo-frame` in
   `src/app/globals.css`, which applies one uniform warm grade + crop, so the
   whole gallery looks like a single set. Tune the grade once there.

Until real photos are added, on-brand placeholders render at the correct aspect
ratio, so swapping in real images never shifts the layout. Also add a
`public/images/og-default.jpg` (1200×630) for social share cards.

---

## 4. Configuration (environment variables)

Copy `.env.example` → `.env.local` and fill in what you have. **Everything is
optional in dev** — the site runs and forms work (logging to the console)
without any keys.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used in metadata + sitemap |
| `NEXT_PUBLIC_DOJO_BOOKING_URL` | **Dojo** booking link — powers the whole booking flow |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 measurement ID (`G-XXXXXXXXXX`) |
| `CONTACT_EMAIL` | Where contact-form + newsletter emails go |
| `RESEND_API_KEY` | Sends contact-form emails (see below) |
| `MAILCHIMP_API_KEY` / `MAILCHIMP_AUDIENCE_ID` / `MAILCHIMP_SERVER_PREFIX` | Newsletter storage |
| `NEXT_PUBLIC_DELIVERY_URL` | Delivery/ordering provider link |
| `NEXT_PUBLIC_GIFT_CARD_URL` | Gift-card checkout link |

### Connecting the booking provider (Dojo)

La Meridiana uses **Dojo Restaurant Bookings** as the single provider.

1. In your Dojo dashboard, find the **booking page URL** (the link behind the
   Dojo "Book" widget/button).
2. Set it as `NEXT_PUBLIC_DOJO_BOOKING_URL` in `.env.local` (and in Vercel).
3. Done — the `/book` page embeds it, and every "Book a Table" button across the
   site routes to `/book`. There is exactly one booking flow; no second widget
   exists anywhere. Logic is centralised in `src/lib/booking.ts`.

Until the URL is set, `/book` shows a friendly fallback with the phone number
(never a dead end).

### Forms (contact + newsletter)

Both forms validate on the client **and** server and POST to API routes:

- **Contact** → `src/app/api/contact/route.ts`. With `RESEND_API_KEY` set it
  emails `CONTACT_EMAIL` (default `contact@lameridiana.co.uk`) via
  [Resend](https://resend.com). Without a key, submissions log to the server
  console — so the form is fully testable in dev. Swap in any provider inside
  the `deliver()` helper (SendGrid, Postmark, SMTP…). Update the verified
  `from:` address to your domain.
- **Newsletter** → `src/app/api/newsletter/route.ts`. With the Mailchimp vars
  set it subscribes the email; otherwise it logs it. Swap in your ESP inside
  `subscribe()`.

---

## 5. Deploying to Vercel

1. Push this repo to GitHub (the app lives in the `la-meridiana/` subdirectory).
2. In Vercel → **New Project** → import the repo.
3. Set **Root Directory** to `la-meridiana`.
4. Framework preset is auto-detected as **Next.js** (build `next build`,
   output handled automatically).
5. Add the environment variables from section 4 in **Settings → Environment
   Variables**.
6. Deploy. Point the `lameridiana.co.uk` domain at the project in
   **Settings → Domains**.

The site is almost entirely static (only the two form API routes are dynamic),
so it's fast and cheap to host.

---

## 6. What's built in

- **9 pages**: Home, About, Menu, Awards, What's On, Book a Table, Contact,
  Delivery, Gift Cards (+ Privacy and a custom 404).
- **SEO**: unique `<title>`/description per page, Open Graph + Twitter cards,
  canonical URLs, `sitemap.xml`, `robots.txt`.
- **Structured data**: `Restaurant` schema.org JSON-LD (name, address, hours,
  full menu, awards, socials) on every page, plus breadcrumbs on interior pages.
- **Performance**: `next/image`, `next/font` (self-hosted Fraunces + Inter),
  lazy-loading below the fold, mostly static pages.
- **Accessibility**: semantic landmarks, skip-to-content link, keyboard-friendly
  nav + forms, visible focus rings, `aria-*` on interactive elements, alt text,
  `prefers-reduced-motion` support, WCAG-minded colour contrast.
- **Analytics**: GA4 placeholder that only loads when the measurement ID is set.

## Project structure

```
la-meridiana/
├─ src/
│  ├─ app/            # routes (App Router) + api/ form endpoints
│  ├─ components/     # Header, Footer, Photo, forms, TrustBar, JSON-LD…
│  ├─ data/           # site.ts · menu.ts · events.ts  ← edit content here
│  └─ lib/            # seo.ts · booking.ts
├─ public/images/     # drop real photography here
├─ .env.example       # copy to .env.local
└─ tailwind.config.ts # the design system (palette, fonts)
```
