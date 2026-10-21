#!/usr/bin/env python3
"""
Generate the Il Menu card from content/menu.md and inject it into menu.html.
Run from project root:  python3 scripts/build-menu.py

Reads the client-verified content/menu.md (menu-template.md format), and rewrites
the region between the <!-- MENU:TABS --> and <!-- MENU:PANES --> markers in
menu.html. Re-run whenever content/menu.md changes. No external dependencies.
"""
import re, sys, html, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "content" / "menu.md"
PAGE = ROOT / "menu.html"

# Anchor slug per "# MENU:" name (menu.html#<slug> deep-links to that menu)
SLUG = {"Festive Menu": "festivemenu", "Christmas Day": "christmas", "New Year's Eve": "newyear",
        "VIP Fish Menu": "vipfish", "À la carte": "alacarte", "Chef Specials": "specials",
        "La Cantina": "cantina", "I Dolci": "dolci", "Sicilian Brunch": "brunch",
        "Takeaway": "takeaway"}

# The tab row: (label, tab slug, [menus shown in that tab, in order]).
# Keep this short. A "# MENU:" not listed here gets a tab of its own.
TABS = [
    ("Festive", "festive", ["Festive Menu", "Christmas Day", "New Year's Eve", "VIP Fish Menu"]),
    ("À la carte", "alacarte", ["À la carte", "Chef Specials"]),
    ("La Cantina", "cantina", ["La Cantina"]),
    ("I Dolci", "dolci", ["I Dolci"]),
    ("Brunch & Takeaway", "brunchtakeaway", ["Sicilian Brunch", "Takeaway"]),
]

def esc(s): return html.escape(s or "", quote=True)

def fmt_price(p):
    p = (p or "").strip()
    if not p or p in ("—", "–", "-"):   # a lone dash = not offered by that measure -> blank cell
        return ""
    # handle "7.00 / 9.00" and "[?]" markers, keep as-is otherwise
    def one(x):
        x = x.strip()
        if re.fullmatch(r"\d+\.00", x):
            return x[:-3]
        return x
    if "/" in p:
        return " / ".join(one(x) for x in p.split("/"))
    return one(p)

def parse(md):
    menus = []           # [{name, slug, sections:[{title,note,items:[...]}]}]
    cur_menu = cur_sec = None
    item = None
    def flush_item():
        nonlocal item
        if item is not None:
            # items before the first SECTION belong to the menu header (price plaques)
            (cur_sec["items"] if cur_sec is not None else cur_menu["items"]).append(item)
        item = None
    for raw in md.splitlines():
        line = raw.rstrip()
        s = line.strip()
        if s.startswith("#") and not s.startswith("##") and "MENU:" in s:
            flush_item()
            name = s.split("MENU:", 1)[1].strip()
            cur_menu = {"name": name, "slug": SLUG.get(name, re.sub(r"[^a-z0-9]", "", name.lower())),
                        "note": "", "items": [], "sections": []}
            menus.append(cur_menu); cur_sec = None
            continue
        if s.startswith("## SECTION:"):
            flush_item()
            cur_sec = {"title": s.split("SECTION:", 1)[1].strip(), "note": "", "items": []}
            cur_menu["sections"].append(cur_sec)
            continue
        if s.startswith("note:") and item is None and cur_menu is not None:
            (cur_sec if cur_sec is not None else cur_menu)["note"] = s.split("note:", 1)[1].strip()
            continue
        if s.startswith("- name:"):
            flush_item()
            item = {"name": s.split("name:", 1)[1].strip()}
            continue
        if item is not None and ":" in s and s[0] not in "#":
            k, v = s.split(":", 1)
            k = k.strip(); v = v.split("#", 1)[0].strip()  # drop inline comments
            if k in ("tags", "desc", "price", "from", "g175", "g250", "bottle", "feature"):
                item[k] = v
            continue
    flush_item()
    return menus

def tags_html(t):
    t = (t or "").strip()
    if not t:
        return ""
    marks = [x.strip() for x in re.split(r"[,\s]+", t) if x.strip()]
    return "".join(f' <span class="v">{esc(m)}</span>' for m in marks)

def dish_row(it):
    price = fmt_price(it.get("price", ""))
    desc = it.get("desc", "").strip()
    desc_html = f'\n              <p class="dish__desc">{esc(desc)}</p>' if desc else ""
    offer = str(it.get("feature", "")).strip().lower() in ("yes", "true", "1", "offer")
    cls = "dish dish--offer" if offer else "dish"
    badge = '<span class="dish__tag">Offerta</span>' if offer else ""
    return (
        f'            <div class="{cls}"><div class="dish__wrapline">\n'
        f'              <div style="display:flex;align-items:baseline;gap:14px">{badge}<span class="dish__name">{esc(it["name"])}{tags_html(it.get("tags"))}</span><span class="dish__lead"></span><span class="dish__price">{esc(price)}</span></div>{desc_html}'
        '</div></div>'
    )

def wine_row(it):
    g1, g2, bt = fmt_price(it.get("g175", "")), fmt_price(it.get("g250", "")), fmt_price(it.get("bottle", ""))
    frm = it.get("from", "").strip()
    frm_html = f'<span class="wine__from">{esc(frm)}</span>' if frm else ""
    return (
        f'            <div class="wine w3"><span class="wine__name">{esc(it["name"])}</span>'
        f'<span class="wine__p">{esc(g1)}</span><span class="wine__p">{esc(g2)}</span><span class="wine__p">{esc(bt)}</span>'
        f'{frm_html}</div>'
    )

def tick():
    return '        <div class="ticks" aria-hidden="true"><i></i><i></i><span class="sun"></span><i></i><i></i></div>'

def group_tabs(menus):
    by_name = {m["name"]: m for m in menus}
    tabs, used = [], set()
    for label, slug, names in TABS:
        ms = [by_name[n] for n in names if n in by_name]
        if ms:
            tabs.append({"label": label, "slug": slug, "menus": ms}); used.update(n for n in names)
    for m in menus:   # any menu not in TABS gets its own tab, in file order
        if m["name"] not in used:
            tabs.append({"label": m["name"], "slug": m["slug"], "menus": [m]})
    return tabs

def menu_head(m):
    """Header for a menu inside a shared tab: title, note line, price plaques."""
    out = [f'        <div class="course menuhead" id="sec-{m["slug"]}">',
           f'          <h3 class="menuhead__title">{esc(m["name"])}</h3>']
    if m["note"]:
        out.append(f'          <p class="menuhead__note">{esc(m["note"])}</p>')
    if m["items"]:
        out.append('          <div class="menuhead__prices">')
        for it in m["items"]:
            out.append(f'            <div class="priceplaque"><span class="priceplaque__label">{esc(it["name"])}</span>'
                       f'<span class="priceplaque__price">£{esc(fmt_price(it.get("price", "")))}</span></div>')
        out.append('          </div>')
    out.append('        </div>')
    return out

def section_html(sec, is_wine):
    body = ['        <div class="course">',
            f'          <h3 class="course__title">{esc(sec["title"])}</h3>']
    if sec["note"]:
        body.append(f'          <p class="course__note">{esc(sec["note"])}</p>')
    if is_wine:
        body.append('          <div class="winehead w3"><span>175ml</span><span>250ml</span><span>Bottle</span></div>')
        body.append('          <div>')
        body += [wine_row(it) for it in sec["items"]]
        body.append('          </div>')
    elif not sec["items"]:
        body.append('          <div style="margin-top:18px"></div>')
    else:
        body.append('          <div style="margin-top:18px">')
        body += [dish_row(it) for it in sec["items"]]
        body.append('          </div>')
    body.append('        </div>')
    return body

def build(menus):
    tabs = group_tabs(menus)
    tab_btns, panes = [], []
    for i, tb in enumerate(tabs):
        active = " active" if i == 0 else ""
        sel = "true" if i == 0 else "false"
        tab_btns.append(f'      <button class="tab{active}" role="tab" aria-selected="{sel}" data-pane="{tb["slug"]}"><span class="sun"></span>{esc(tb["label"])}</button>')
        shared = len(tb["menus"]) > 1
        body = []
        for m in tb["menus"]:
            is_wine = m["name"] == "La Cantina"
            blocks = []
            if shared or m["note"] or m["items"]:
                blocks.append(menu_head(m))
            blocks += [section_html(sec, is_wine) for sec in m["sections"]]
            for blk in blocks:
                if body:
                    body.append(tick())
                body += blk
        panes.append(f'      <div class="pane{active}" id="pane-{tb["slug"]}" role="tabpanel">\n' + "\n".join(body) + "\n      </div>")
    return "\n".join(tab_btns), "\n".join(panes)

def inject(page, marker, content):
    pat = re.compile(f"(<!-- {marker}:START -->).*?(<!-- {marker}:END -->)", re.S)
    if not pat.search(page):
        sys.exit(f"Marker {marker} not found in menu.html")
    return pat.sub(lambda m: m.group(1) + "\n" + content + "\n      " + m.group(2), page)

def main():
    menus = parse(SRC.read_text(encoding="utf-8"))
    tabs_html, panes_html = build(menus)
    page = PAGE.read_text(encoding="utf-8")
    page = inject(page, "MENU:TABS", tabs_html)
    page = inject(page, "MENU:PANES", panes_html)
    PAGE.write_text(page, encoding="utf-8")
    n = sum(len(s["items"]) for m in menus for s in m["sections"])
    print(f"Injected {len(group_tabs(menus))} tabs ({len(menus)} menus), {n} items into menu.html")

if __name__ == "__main__":
    main()
