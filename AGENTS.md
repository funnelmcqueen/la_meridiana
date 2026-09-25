# AGENTS.md — La Meridiana website

Guidance for any AI agent (Claude Code, Cursor, etc.) working in this repo, plus
a task board so several agents can work in parallel without colliding. Read this
before touching anything. The design brief in `CLAUDE.md` is the fuller reference;
this file is the operational, tool-agnostic version.

The site lives in this folder (`la-meridiana/`): a vanilla static site for a
family-run Italian restaurant in East Horsley, Surrey.

---

## 1. Golden rules (apply to every task)

**Stack & deploy**
- Vanilla HTML + CSS + JS only. No frameworks, no build tools, no npm, no bundler.
- The one build step is the menu generator (see §2). It is run by hand, not by a host.
- **The live site (`lameridiana.co.uk`) deploys from the client's FunnelMcQueen
  repo, NOT from this repo.** Pushing here does not update the live site — changes
  must be redeployed there. Say this in any hand-off.

**Design law (do not violate)**
- Colours: only the `:root` CSS custom properties in `css/style.css`. Never hardcode
  a hex outside `:root`.
- Fonts are fixed: Cormorant Garamond (display/dishes), Archivo (labels/UI),
  Italianno (rare accents). Do not add fonts.
- Keep the meridian motif (brass line + red sun-dot, sundial ticks) and the existing
  button system (`.btn--brass`, `.btn--outline-*`, `.tlink`). No new button styles.
- **No em/en dashes in visible content.** Use "to", a middot `·`, or a hyphen.
  (`grep -nP '[\x{2013}\x{2014}]'` equivalents must return nothing.)
- No emoji in UI, no stock photos, no generic template patterns.
- Keep `prefers-reduced-motion` support on anything animated.

**Mobile / robustness (hard-won — do not regress)**
- Keep the `overflow-x` guard on BOTH `html` and `body` (fixes iOS Safari
  "shrink to fit" that squeezed the page into a narrow column). No element may be
  wider than the viewport.
- Event/image frames keep their `@supports not (aspect-ratio…)` fallback so cards
  never collapse on older Safari.
- Test every visual change from 320px to 1280px. Burger nav below 1200px.

**Cache-busting**
- All pages load `css/style.css`, `js/main.js`, `assets/js/sole.js` with a shared
  `?v=YYYYMMDD` query. **Whenever any of those three files changes, bump the `?v=`
  on every page** (currently `?v=20260925`) or browsers serve the stale cached copy.

**Assets**
- Images are local WebP with `width`/`height` + `loading="lazy"` (hero eager),
  under `assets/img/`. No hotlinks.

**Content**
- Real facts only. Transcribe menus exactly as printed — do not invent prices,
  vegetarian/allergen marks, dates or awards. Flag anything unconfirmed in `TODO.md`.

---

## 2. Menu build workflow (read before editing menus)

Menus are generated, not hand-written into the page:

1. Edit `content/menu.md` (the source of truth).
2. Run `python3 scripts/build-menu.py` from `la-meridiana/`.
3. It rewrites only the regions between `<!-- MENU:TABS:START/END -->` and
   `<!-- MENU:PANES:START/END -->` in `menu.html`.

**Never hand-edit `menu.html` between those markers** — the next build overwrites it.

- Each `# MENU: <Name>` block is a tab; `## SECTION: <Name>` is a course;
  `- name:` starts a dish (fields: `tags`, `desc`, `price`, `from`, `g175`,
  `g250`, `bottle`, `feature`). A `note:` line adds a section note.
- Tab slugs come from the `SLUG` dict in `scripts/build-menu.py`; add an entry for
  a clean deep-link (e.g. `"Festive Menu": "festive"` → `menu.html#festive`).
- The first `# MENU:` block is the default-active tab.
- Deep-links (`menu.html#festive`) work automatically via `fromHash()` in
  `js/main.js` — no JS change needed for a new tab.

---

## 3. How agents split work

To let several agents run in parallel safely, work is divided by **file ownership**.
One agent owns a file (or a clearly-scoped region) at a time.

| Area | Owns | Notes |
|------|------|-------|
| **Content** | `content/menu.md`, `scripts/build-menu.py` | The ONLY agent that edits menu source and runs `build-menu.py`. Commits the regenerated `menu.html`. |
| **Design/CSS** | appended sections of `css/style.css` | Adds new rules under clear comment headers at the end of the file. Does not touch generated `menu.html`. |
| **Surfacing** | body sections of `index.html`, `eventi.html` (and other pages) | Adds/edits callouts, links, cards. Does not edit `menu.html` between markers. |
| **QA/Deploy** | cache-bust `?v=`, `TODO.md`, screenshots, zip/hand-off | Runs LAST: bumps `?v=` across all pages after others finish, verifies responsive + no dashes + no overflow, prepares the deploy hand-off. |

**Coordination rules**
- Only Content edits `content/menu.md` and runs the build; others never hand-edit
  generated `menu.html`.
- Design appends to the end of `css/style.css`; if two agents must edit CSS, split by
  distinct appended blocks, not the same region.
- QA bumps `?v=` once, at the end, so the version change is a single clean commit.
- Every agent: keep the golden rules in §1; test 320→1280 for any visual change.

---

## 4. Task board — Festive Menu (Christmas)

Source: `La_Meridiana_-_Festive_Menu.pdf`. Set menu, 16 Nov to 23 Dec,
2 courses £31.95 / 3 courses £38.95. Antipasti / Principali / Dolci, one per course.
Decision: published now, always-on (no date-gate); **remove after 23 Dec** (see TODO).

- [x] **T1 · Content** — add `# MENU: Festive Menu` block to `content/menu.md`
  (lead note carries price/dates; no per-item prices), add `"Festive Menu": "festive"`
  to `SLUG`, run `python3 scripts/build-menu.py`. **Done when** `#pane-festive` renders
  three courses and it is the first/active tab.
- [x] **T2 · Design/CSS** — prix-fixe pane styling (`#pane-festive`: hide the empty
  price/leader columns, centre the price/date banner) + the `.festivo` seasonal
  callout band. Appended to `css/style.css`. **Done when** the festive pane has no
  empty price gaps and reads as a set menu, mobile-clean.
- [x] **T3 · Surfacing** — `.festivo` callout band on `index.html` and `eventi.html`
  linking to `menu.html#festive` (+ phone booking). **Done when** the links open the
  festive tab.
- [ ] **T4 · QA/Deploy** — responsive check 320→1280, confirm zero em/en dashes and
  `?v=` bumped on all pages, add the post-season removal note to `TODO.md`, rebuild
  the delivery zip and hand off for FunnelMcQueen deploy.

**To remove the festive menu after 23 Dec:** delete the `# MENU: Festive Menu` block
from `content/menu.md`, rerun the build, and delete the two `.festivo` `<section>`s
from `index.html` and `eventi.html`; bump `?v=`.
