# La Meridiana — Menu Content Template
This is the intermediate format between the raw menu files and the website.

**Workflow:** raw files (PDF / photos / docs) go in `content/source/` → Claude Code transcribes them into `content/menu.md` using this exact format → Velo verifies every price and spelling against the real menu → only the verified file feeds `menu.html`.

**Transcription rules**
- Copy names, descriptions, and prices EXACTLY — Italian spelling and accents preserved (gnocchi, tagliatelle, tiramisù, ragù).
- Prices as plain decimals, no currency symbol: `9.50`, `12.00`. The site adds the styling.
- Anything illegible or ambiguous: write `[?]` in place, add a line to TODO.md. **Never guess a price or ingredient.**
- Tags (only if marked on the real menu): `V` vegetarian · `VG` vegan · `GF` gluten-free · `N` contains nuts
- Wine with no by-the-glass option: `glass: —`
- Keep the client's own section names and order. If their menu says "Pesce" and "Carne" instead of "Secondi", use their words.

---

## Format — food sections (à la carte, pizze, dolci)

```
# MENU: A la carte

## SECTION: Antipasti
note: (optional line under the section title, e.g. "to begin")

- name: Arancini di casa
  tags: 
  desc: Crisp saffron rice, mozzarella heart, slow tomato sugo
  price: 9.50

- name: Bruschetta classica
  tags: V
  desc: Charred bread, datterini tomatoes, basil
  price: 8.00

## SECTION: Le Pizze
- name: Margherita
  tags: V
  desc: San Marzano tomato, fior di latte, basil
  price: 12.00
```

## Format — wine (La Cantina)

```
# MENU: La Cantina

## SECTION: Bianchi
- name: Gavi di Gavi
  from: Cortese · Piemonte
  glass: 8.50
  bottle: 34.00

- name: Barolo
  from: Nebbiolo · Piemonte
  glass: —
  bottle: 62.00
```

## Format — desserts (I Dolci)

```
# MENU: I Dolci

## SECTION: I Dolci
- name: Tiramisù della casa
  tags: 
  desc: Savoiardi, espresso, mascarpone, bitter cocoa
  price: 8.00
```

---

## Mapping to the site (for Claude Code)
- `# MENU:` → a tab on the menu card (À la carte / La Cantina / I Dolci)
- `## SECTION:` → a `.course` block with the sundial tick divider
- Food items → `.dish` rows: name (+ tag superscript) · dotted leader · price, italic description below
- Wine items → `.wine` rows: name + region line, glass/bottle price columns; `—` renders as an em dash
- Order on the page = order in this file. No reordering, no "improvements" to the client's menu.
