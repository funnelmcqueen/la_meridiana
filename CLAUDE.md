# CLAUDE.md — La Meridiana Website Build

## Project
Full website rebuild for La Meridiana, a family-run Italian restaurant in East Horsley, Surrey (30+ years, award-winning). Agency: FunnelMcQueen. The design phase is complete — the job is to turn the approved one-page design into the full production site without changing the design language.

## Files in this project
- `la-meridiana-redesign.html` — the approved design. Single source of truth for colors, typography, spacing, buttons, animations, and section patterns. Contains handoff notes in the header comment. Read it fully before writing anything.
- `photo-inventory.md` — every client photo asset with CDN URLs, what's used where, and what's missing.
- Menu, wine list, and dessert files — uploaded by the client (any format: PDF, docx, images). Parse them for the menu pages.

## Mission
Refactor the single-page design into a multi-page static site:
1. `index.html` — Home. Hero, marquee, La Storia (short), menu preview (a few dishes per tab + link to full menu), Eventi cards, gallery, visit/hours, reservation CTA, footer.
2. `menu.html` — Full menu. Complete à la carte, wine list (La Cantina), and desserts (I Dolci) from uploaded files, using the existing `.course` / `.dish` / `.wine` card structures and the tab system.
3. `eventi.html` — Events & What's On. Terrace, Sicilian Brunch, private hire — expanded from the Eventi cards.
4. `la-storia.html` — Our Story. The 30-years/one-family narrative, awards plaques, hygiene rating.
5. `contact.html` — Find us: address, phone, email, full hours card, directions link.
6. Phase 2 (only when told): gift cards, delivery.

## Architecture — non-negotiable
- Vanilla HTML + CSS + JS only. No React, no Tailwind, no frameworks, no build tools, no npm packages. Deploys to Vercel as a plain static site: framework preset "Other", no build command, files served from the repo root.
- Internal links use relative `.html` hrefs (`menu.html`), so the site also works opened locally. Vercel `cleanUrls` serves them publicly as pretty URLs (`/menu`).
- Structure: `/index.html`, `/menu.html`, `/eventi.html`, `/la-storia.html`, `/contact.html`, `/css/style.css`, `/js/main.js`, `/assets/img/`, `/assets/fonts/`.
- Extract the design file's `<style>` into `css/style.css` and `<script>` into `js/main.js`, shared across all pages. Page-specific styles go at the end of the same stylesheet under clear comment headers.
- Nav and footer identical on every page (copy exactly; active page gets a marked state using the existing underline pattern).

## Design law — do not violate
- All colors come from the `:root` CSS variables. Never hardcode a hex outside `:root`.
- Fonts stay: Cormorant Garamond (display/dishes), Archivo (labels/UI), Italianno (rare handwritten accents). Do not add fonts.
- The meridian motif (brass line + red sun-dot, sundial ticks) is the signature. Reuse it; do not invent new decorative systems.
- Keep the existing button system (`.btn--brass`, `.btn--outline-*`, `.tlink`). No new button styles.
- Banned: gradient orbs, glassmorphism, purple/blue gradients, emoji in UI, stock photos, generic template patterns.
- Animation language is set: mask text reveals, IntersectionObserver `.rv` reveals, sweep fills, the veil wipe, gentle parallax. Keep `prefers-reduced-motion` support on everything new.
- Do not reintroduce fixed bugs: nav is solid green at top (never transparent over images), hero photo is inset in its brass frame (never full-bleed under the nav), all nav text is `nowrap`, burger menu takes over below 1200px. Test the header at every width after any nav change.

## Content rules
- Real facts only. Verified: family-run 30+ years; East Horsley, Ockham Road South, KT24 6QU; +44 1483 284343; contact@lameridiana.co.uk; Food Awards England Restaurant of the Year South East 2022; Muddy Stilettos Best Casual Restaurant in Surrey 2025; 5/5 FSA hygiene (2024); terrace; Sicilian Brunch Tue–Sun from 10am; private events with catering; famous pizzas. Do not invent awards, quotes, press mentions, dates, or history.
- Hours: use the version in the design file (flagged as the majority of three conflicting versions — keep the code comment until confirmed).
- Menu ingestion: transcribe uploaded files exactly — names, descriptions, prices, sections, allergen/vegetarian marks. Italian dish names keep spelling and accents. Prices right-aligned via the dotted-leader pattern. Wine keeps the glass/bottle two-column layout. Anything illegible/ambiguous: add with `<!-- TODO: confirm -->` and list in TODO.md — never guess a price.
- Anything unknown = clearly marked placeholder + entry in TODO.md.

## Production requirements
- Images: download every `photo-inventory.md` asset → WebP (~80), max 1600px full-bleed / 800px cards → `/assets/img/` with clean names (`hero-dining-room.webp`), replace all legacy CDN hotlinks. Add `width`/`height` + `loading="lazy"` below the fold (hero eager).
- SEO: unique `<title>`/meta description per page; Open Graph; canonical URLs; favicon from logo; one `<h1>` per page with logical heading tree.
- Schema: JSON-LD `Restaurant` on index.html — name, address, geo, phone, `servesCuisine: Italian`, `openingHoursSpecification`, URL, `hasMenu` → menu.html.
- Redirects & URLs: `vercel.json` in repo root (cleanUrls + trailingSlash:false + the redirect map). `/delivery` and `/fresh-pasta-1` are temporary redirects on purpose (Phase 2 pages).
- Accessibility: focus-visible states, alt text on every image, aria labels on nav/dialogs, AA contrast.

## Booking — hard rule
Every reservation button stays a dead button marked `data-booking="connect"`. Do not wire any booking system, form, or third-party embed until the client explicitly approves. Same for any contact form — `mailto:`/`tel:` links only for now.

## Workflow
1. Read `la-meridiana-redesign.html` and `photo-inventory.md` end to end before touching anything.
2. Propose the file structure and a short build plan. Wait for go.
3. Build order: refactor to shared css/js → index.html → menu.html (after files uploaded) → eventi.html → la-storia.html → contact.html → production pass (images, SEO, schema, redirects).
4. After each page: summarize what was built, what was reused, and any TODO items added.
5. When a decision isn't covered by this brief, ask — don't improvise on design or content.

## Definition of done
- Every page uses only `:root` colors and the existing type/button/animation systems.
- Zero legacy CDN hotlinks; all images local WebP with dimensions.
- Nav readable and non-overlapping 320px→4K; burger below 1200px.
- Menu content matches uploaded files exactly, with TODOs for anything unconfirmed.
- Reduced-motion, keyboard focus, and alt text intact everywhere.
- `vercel.json` (cleanUrls + redirects), JSON-LD schema, per-page meta all present.
- `TODO.md` lists every open client question.
- Deploys on Vercel as a static site with no build step — `npx vercel` from the folder just works.
