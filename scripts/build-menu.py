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

# Tab slug + label per "# MENU:" name
SLUG = {"À la carte": "alacarte", "La Cantina": "cantina", "I Dolci": "dolci",
        "Set Lunch": "setlunch", "Takeaway": "takeaway"}

def esc(s): return html.escape(s or "", quote=True)

def fmt_price(p):
    p = (p or "").strip()
    if not p:
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
        if item is not None and cur_sec is not None:
            cur_sec["items"].append(item)
        item = None
    for raw in md.splitlines():
        line = raw.rstrip()
        s = line.strip()
        if s.startswith("#") and not s.startswith("##") and "MENU:" in s:
            flush_item()
            name = s.split("MENU:", 1)[1].strip()
            cur_menu = {"name": name, "slug": SLUG.get(name, re.sub(r"[^a-z0-9]", "", name.lower())), "sections": []}
            menus.append(cur_menu); cur_sec = None
            continue
        if s.startswith("## SECTION:"):
            flush_item()
            cur_sec = {"title": s.split("SECTION:", 1)[1].strip(), "note": "", "items": []}
            cur_menu["sections"].append(cur_sec)
            continue
        if s.startswith("note:") and cur_sec is not None and item is None:
            cur_sec["note"] = s.split("note:", 1)[1].strip()
            continue
        if s.startswith("- name:"):
            flush_item()
            item = {"name": s.split("name:", 1)[1].strip()}
            continue
        if item is not None and ":" in s and s[0] not in "#":
            k, v = s.split(":", 1)
            k = k.strip(); v = v.split("#", 1)[0].strip()  # drop inline comments
            if k in ("tags", "desc", "price", "from", "g175", "g250", "bottle"):
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
    return (
        '            <div class="dish"><div class="dish__wrapline">\n'
        f'              <div style="display:flex;align-items:baseline;gap:14px"><span class="dish__name">{esc(it["name"])}{tags_html(it.get("tags"))}</span><span class="dish__lead"></span><span class="dish__price">{esc(price)}</span></div>{desc_html}'
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

def build(menus):
    # tabs
    tabs = []
    for i, m in enumerate(menus):
        active = " active" if i == 0 else ""
        sel = "true" if i == 0 else "false"
        tabs.append(f'      <button class="tab{active}" role="tab" aria-selected="{sel}" data-pane="{m["slug"]}"><span class="sun"></span>{esc(m["name"])}</button>')
    tabs_html = "\n".join(tabs)

    # panes
    panes = []
    for i, m in enumerate(menus):
        is_wine = m["name"] == "La Cantina"
        active = " active" if i == 0 else ""
        body = []
        for j, sec in enumerate(m["sections"]):
            if j > 0:
                body.append(tick())
            body.append('        <div class="course">')
            body.append(f'          <h3 class="course__title">{esc(sec["title"])}</h3>')
            if sec["note"]:
                body.append(f'          <p class="course__note">{esc(sec["note"])}</p>')
            if is_wine:
                body.append('          <div class="winehead w3"><span>175ml</span><span>250ml</span><span>Bottle</span></div>')
                body.append('          <div>')
                for it in sec["items"]:
                    body.append(wine_row(it))
                body.append('          </div>')
            else:
                body.append('          <div style="margin-top:18px">')
                for it in sec["items"]:
                    body.append(dish_row(it))
                body.append('          </div>')
            body.append('        </div>')
        panes.append(f'      <div class="pane{active}" id="pane-{m["slug"]}" role="tabpanel">\n' + "\n".join(body) + "\n      </div>")
    return tabs_html, "\n".join(panes)

def inject(page, marker, content):
    pat = re.compile(f"(<!-- {marker}:START -->).*?(<!-- {marker}:END -->)", re.S)
    if not pat.search(page):
        sys.exit(f"Marker {marker} not found in menu.html")
    return pat.sub(lambda m: m.group(1) + "\n" + content + "\n      " + m.group(2), page)

def main():
    menus = parse(SRC.read_text())
    tabs_html, panes_html = build(menus)
    page = PAGE.read_text()
    page = inject(page, "MENU:TABS", tabs_html)
    page = inject(page, "MENU:PANES", panes_html)
    PAGE.write_text(page)
    n = sum(len(s["items"]) for m in menus for s in m["sections"])
    print(f"Injected {len(menus)} tabs, {n} items into menu.html")

if __name__ == "__main__":
    main()
