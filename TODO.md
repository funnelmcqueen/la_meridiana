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
- [x] **À la carte + wine updated** to the current client PDFs (updated_menu.pdf and
      La_Meridiana_Menu_V3.pdf). Prices and items transcribed as printed; Asparagus £9
      is now confirmed on the new card.
- [x] **Set Lunch removed, Sicilian Brunch added** as its own tab (Sicilian_brunch_Meridiana.pdf).
      Every day, 10am to 4pm; served as trios (tris). Linked from the home menu section and
      the Eventi page. Deep links: `menu.html#brunch`, `menu.html#takeaway`.
- [ ] **Sicilian Brunch platter / panozzi / fresh pasta** show two-price sharing options
      (e.g. platter "32.95 / 49.95" = for two / for four). Confirm the labels read clearly on the card.
- [ ] **Dessert sweet wines** (Passito, Vin Santo, Picolit, Port, Vintage Port) — the
      glass/bottle price mapping is ambiguous in the PDF; left OFF pending confirmation.
- [ ] **Coffees & teas** (dessert menu) — not yet added; confirm whether to list them.
- [ ] **"Wine of the month"** prompt on the wine card — not listed (it's a server prompt on
      the PDF). Add a line if the client wants it shown.
- [ ] Standard pre-launch price check on all menus (as printed on the client PDFs).
- [ ] **Takeaway** — confirm whether it needs online ordering later (Phase 2 / delivery page).
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

## Booking & ordering — need the three live URLs
Booking is approved on **Dojo** (phone is the fallback); takeaway is phone-first,
also on **Deliveroo** and **Uber Eats**. Every button is already wired — just drop
the URLs into the `LINKS` object at the top of `js/main.js` and they all go live:
- [ ] **Dojo** table-reservation URL  → `LINKS.dojo`   (buttons: nav "Book a table", hero, home Book/Order card, page CTAs)
- [ ] **Deliveroo** restaurant page    → `LINKS.deliveroo`  (home "Order in" card, takeaway tab)
- [ ] **Uber Eats** restaurant page    → `LINKS.uber`
Until a URL is set, that specific button stays inert (no dead-end click); phone
links (`tel:+447383905102`) are already live everywhere.

## Phase 2
- [ ] Gift cards page (currently `/fresh-pasta-1` → temporary redirect to `/`).
- [ ] Delivery page (currently `/delivery` → temporary redirect to `/`).
