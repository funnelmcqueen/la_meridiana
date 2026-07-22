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

## Assets — DONE ✅
- [x] Photos harvested, self-hosted in `assets/img/` (17 placed), originals in
      `assets/img/originals/`. `width`/`height` + lazy on all; hero eager. Zero hotlinks.
- [x] Placement map + unused-photo list → `photo-inventory.md`.
- [x] Eventi tiles: replaced the two dated promo **flyers** (terrace/brunch) with real
      professional photos (spaghetti & gamberoni, prosciutto e melone) and upgraded the
      private-hire tile to a wider room shot (`private-hire-room.jpg`).
- [ ] Optional: add a real Open Graph share image (a wide 1200×630 crop).
- [ ] Gap: no clean text-free **outdoor terrace** photo. A quick sunny-service phone
      shoot is the one asset worth capturing before launch (see photo-inventory.md).

## Booking (do not wire until client approves)
- [ ] Reservation buttons are intentionally dead (`data-booking="connect"`).
      Provide the approved booking link (Dojo/Quandoo/etc.) to wire them.

## Phase 2
- [ ] Gift cards page (currently `/fresh-pasta-1` → temporary redirect to `/`).
- [ ] Delivery page (currently `/delivery` → temporary redirect to `/`).
