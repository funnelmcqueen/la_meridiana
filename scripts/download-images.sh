#!/usr/bin/env bash
# La Meridiana — asset downloader
# Fetches every client image from photo-inventory.md into assets/img/
# with clean production filenames. Run from the project root:
#   bash scripts/download-images.sh
# Requires: curl. Safe to re-run (overwrites).

set -euo pipefail

BASE="https://images.squarespace-cdn.com/content/v1/62a8a8e34ccd012c860f9ec2"
OUT="assets/img"
mkdir -p "$OUT"

ok=0; fail=0
dl() {
  if curl -fsSL "$BASE/$1" -o "$OUT/$2"; then
    echo "  ✓ $2"; ok=$((ok+1))
  else
    echo "  ✗ FAILED: $2  ($1)"; fail=$((fail+1))
  fi
}

echo "Brand"
dl "1fc50fcd-c895-49c4-82ab-6eabf7b5fb43/Artboard-2.png?format=1500w" "logo-1.png"
dl "66d47a70-0cca-4bf3-8d19-3620d4c6f344/Artboard-2.png?format=1500w" "logo-2.png"

echo "Rooms & atmosphere"
dl "715a92ba-5636-46d2-9c4b-e715adee3e45/112726_LaMeridiana_Hero.jpg" "hero-dining-room.jpg"
dl "f3670b46-9674-4e85-9872-ed0d0d40ea22/IMG_4545.jpg" "interior-1.jpg"
dl "8fac8893-890c-4ab8-9806-fb664ed228c0/PHOTO-2025-02-26-15-25-07.jpg" "room-occasion.jpg"
dl "c430526d-42b4-4b62-8b03-15d1c0cefecc/IMG_4546.jpg" "room-private-event.jpg"
dl "7390fd54-1be4-4811-bf5f-d0bd011cebb3/Terrace+Opening.jpg" "terrace-1.jpg"
dl "642d044e-3f83-4cff-9d55-c74809ae2784/Terrace+Opening+2.jpg" "terrace-2.jpg"
dl "1655220452280-JNKF3NQTK8KV6ZIC9X6Y/thumbnail_IMG_6796.png" "exterior-thumb.png"

echo "Food"
dl "97e474f4-81a7-4844-b4d2-22a147e048e3/112726_LaMeridiana_Food_RisottoLangostineGamberoniWithCherryTomato.jpg" "food-risotto-gamberoni.jpg"
dl "ec56da65-11ac-4b77-aa0d-24a70e8646a3/112726_LaMeridiana_Food_Arancini.jpg" "food-arancini.jpg"
dl "9d041e06-f258-46a2-b22d-2be05cb05497/112726_LaMeridiana_Food_Bruschetta.jpg" "food-bruschetta.jpg"
dl "867a55e4-2a9d-400b-9e7d-aea249f3e6eb/112726_LaMeridiana_Food_CozzeAllaProvinciale.jpg" "food-cozze.jpg"
dl "3ad86e06-fe86-434e-97d2-dd36ef1d79f8/112726_LaMeridiana_Food_Gamberoni.jpg" "food-gamberoni.jpg"
dl "e732e844-6b26-4125-ad7a-67a852c839aa/112726_LaMeridiana_Food_Salmone.jpg" "food-salmone.jpg"
dl "883087aa-8b11-4e1e-bed9-6d653409510d/112726_LaMeridiana_Food_ProscuttoMelone.jpg" "food-prosciutto-melone.jpg"
dl "2c7057e0-f5e8-4606-9241-9ed1cea3bf4e/112726_LaMeridiana_Food_AsparagiAllaParmigiana.jpg" "food-asparagi.jpg"
dl "37d01bb1-33b3-478d-91a5-7c7be4d3e13a/112726_LaMeridiana_Food_CrabAvacardo.jpg" "food-crab-avocado.jpg"
dl "0afaef4f-398f-4d27-9007-42f7851a0b26/112726_LaMeridiana_Food_TunaRafferoniRisottoPrawns.jpg" "food-tuna-risotto.jpg"
dl "163614d1-e52d-4878-928b-7ffaaef5e247/Food19.png" "food-19.png"

echo "Marketing / misc"
dl "5f14bd53-2c74-4df8-a0fc-01bced147823/495148259_18062302808025542_5216470109617025701_n.jpg" "award-muddy-2025.jpg"
dl "4fe1c07c-3c1e-4e3c-84bc-18fb88cb293f/post1+%281%29.png" "award-foodawards-2022.png"
dl "13f43e8d-a9d7-43af-b69d-dd31d37d35ba/gift+card.jpg" "gift-card.jpg"

echo ""
echo "Done: $ok downloaded, $fail failed → $OUT/"
if [ "$fail" -gt 0 ]; then
  echo "Any failures: the client may have edited their Squarespace media."
  echo "Re-check the live site for replacement URLs and update photo-inventory.md."
fi
echo "Next step: run  bash scripts/optimise-images.sh  (convert to WebP + wire into the pages)."
