# La Meridiana — website

Static website for **La Meridiana**, a family-run Italian restaurant in East
Horsley, Surrey. **Vanilla HTML + CSS + JS — no framework, no build step.**

## Pages
`index.html` (home) · `menu.html` · `eventi.html` · `la-storia.html` · `contact.html`
Shared: `css/style.css`, `js/main.js`. Design source of truth: `la-meridiana-redesign.html`.

## Run locally
Open `index.html` in a browser, or serve the folder:
```bash
python3 -m http.server 8000   # → http://localhost:8000
```
Relative `.html` links work locally; Vercel `cleanUrls` serves them as `/menu` etc.

## Deploy (Vercel, automatic)
**Pushing to `main` deploys the live site.** This repo is connected to Vercel
(project `funnelmcqueen/la-meridiana`, preset "Other", no build command, served from
the repo root). Every push to `main` goes to production at **lameridiana.co.uk**;
pushes to other branches only get a preview URL.

- Work on a branch, check it, then merge into `main`.
- When `css/style.css`, `js/main.js` or `assets/js/sole.js` change, bump the `?v=`
  cache-bust on every page (see `AGENTS.md`).
- `vercel.json` provides `cleanUrls`, `trailingSlash:false`, and the old-URL redirect map.

## Design law (see CLAUDE.md)
All colours live in `:root` in `css/style.css` — swap the placeholder greens/brass
for the exact logo hexes there, nothing else. Fonts: Cormorant Garamond, Archivo,
Italianno. Buttons: `.btn--brass`, `.btn--outline-*`, `.tlink`. The meridian motif
(brass line + red sun-dot, sundial ticks) is the signature. Page-specific styles are
at the end of `style.css` under a comment header.

## Photos
All photography is **self-hosted** in `assets/img/` (resized, compressed JPEGs
with `width`/`height` + lazy-loading; hero is eager). Pristine originals are kept
untouched in `assets/img/originals/`. See `photo-inventory.md` for the placement
map and the list of harvested photos not yet used. No external image hotlinks.

## Content
- `content/client-info.md` — verified client facts (the only source of truth for facts).
- `content/menu-template.md` — the transcription format for the menu.
- `content/source/` — drop the raw menu / wine / dessert files here; they get
  transcribed into `content/menu.md`, which then feeds `menu.html`.

## Still open before launch — see `TODO.md`
1. **Real menu** — the dishes on `menu.html` are a clearly-marked **sample**. Supply the
   menu/wine/dessert files and they'll be transcribed exactly (no guessed prices).
2. **Self-host photos** — run the script above.
3. Client confirmations: opening hours, exact brand hexes (logo files), Dojo booking
   link, and the missing **pizza** + **family/people** photos.

## Booking
All reservation buttons are intentionally **dead** (`data-booking="connect"`) until
the client approves. To wire them, take the exact Dojo link from the live site.
