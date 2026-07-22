# TODO — open client questions

Running list of everything that needs confirmation before launch. Nothing here
is guessed on the live site without a matching placeholder marker in the HTML.

## Content / facts to confirm
- [ ] **Opening hours** — the design uses the "majority" version; the client's
      current site shows three conflicting versions (home vs contact vs about).
      Confirm the correct hours. (Code comment kept in `index.html` / `contact.html`.)
- [ ] **Exact brand hexes** — swap the placeholder greens/brass in `css/style.css`
      `:root` for the eyedropped values from the client's logo files.
- [ ] **Food hygiene rating** — design states 5/5 "Very Good" (FSA, 2024).
      Confirm current rating + inspection date.
- [ ] **Facebook / TripAdvisor URLs** — confirm exact profile links (footer).

## Menu — TRANSCRIBED ✅ (verify the flagged items)
- [x] Full à la carte (Antipasti, Primi, Secondi, Bambini, Contorni), wine list
      (Bianchi, Champagne/Prosecco, Rosato, Rossi, Pregiati) and desserts (I Dolci)
      transcribed from the client PDFs into `content/menu.md` and generated into
      `menu.html` via `scripts/build-menu.py`. Prices verified against the rendered pages.
- [ ] **Confirm: Contorni "Asparagus £9"** — reads high for a side; verify against the card.
- [ ] **Dessert sweet wines** (Passito, Vin Santo, Picolit, Port, Vintage Port) — the
      glass/bottle price mapping is ambiguous in the PDF; left OFF pending confirmation.
- [ ] **Coffees & teas** (dessert menu) — not yet added; confirm whether to list them.
- [ ] **Set Lunch** (Tue–Fri 12–3pm, 2 courses £16.95) and the **Takeaway** menu were
      supplied — decide whether they get their own sections/pages (not on the site yet).
- [ ] Home-page menu preview still shows the first two à la carte sections — fine, but
      note it's a hand-picked teaser, not generated.

> To update the menu later: edit `content/menu.md`, then run
> `python3 scripts/build-menu.py`. Never hand-edit inside the MENU markers in menu.html.

## Assets (production pass)
- [x] `loading="lazy"` on all below-the-fold images; hero eager (`fetchpriority="high"`).
- [ ] **Self-host the photos** — run locally (the CDN is blocked from the build sandbox):
      `bash scripts/download-images.sh` then `bash scripts/optimise-images.sh`, then commit
      `assets/img/*.webp`. Step 1 grabs the full asset library (rooms, terrace, all food,
      logos, awards, gift card); step 2 makes WebP and rewrites the hotlinks. Until then,
      images load from the Squarespace CDN (works for real visitors).
- [ ] Add real pixel `width`/`height` to each `<img>` after WebP export (kills layout shift).
- [ ] Supply a real Open Graph share image (`assets/img/hero-dining-room.webp` ~1200×630).
- [ ] Missing per inventory: a "pizza" hero shot and a "people/family" photo.

### Photo placement map (best pictures → slots)
| Local file | Used on | Slot |
|---|---|---|
| hero-dining-room.webp | index | Hero (eager) |
| dining-room-occasion.webp | index / la-storia | La Storia brass frame |
| interior-atmosphere.webp | index | Atmosphere band |
| food-risotto-gamberoni.webp | index | Gallery (lead tile) |
| food-arancini / -bruschetta / -cozze / -gamberoni / -salmone.webp | index | Gallery |
| terrace.webp / terrace-brunch.webp | index / eventi | La Stagione cards |
| private-dining.webp | index / eventi | Private hire card |

## Booking (do not wire until client approves)
- [ ] Reservation buttons are intentionally dead (`data-booking="connect"`).
      Provide the approved booking link (Dojo/Quandoo/etc.) to wire them.

## Phase 2
- [ ] Gift cards page (currently `/fresh-pasta-1` → temporary redirect to `/`).
- [ ] Delivery page (currently `/delivery` → temporary redirect to `/`).
