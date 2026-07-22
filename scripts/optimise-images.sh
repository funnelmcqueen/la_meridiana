#!/usr/bin/env bash
# La Meridiana — image optimiser + wiring (step 2 of 2)
#
# Run AFTER scripts/download-images.sh has populated assets/img/ with the raw
# client photos. This:
#   1. converts every raw jpg/png in assets/img/ to WebP (quality 80; full-bleed
#      ≤1600px, cards ≤800px, logos ≤500px keeping transparency),
#   2. removes the raw source files (keeps only the .webp),
#   3. rewrites the Squarespace hotlinks in every *.html to the local WebP paths.
#
#   bash scripts/optimise-images.sh
#
# Requires ONE of: cwebp (libwebp) OR ImageMagick (magick/convert).
#   macOS:  brew install webp   |  Ubuntu: sudo apt-get install webp
# ---------------------------------------------------------------------------
set -euo pipefail
cd "$(dirname "$0")/.."
IMG="assets/img"
[ -d "$IMG" ] || { echo "No $IMG — run scripts/download-images.sh first."; exit 1; }

if   command -v cwebp   >/dev/null 2>&1; then ENGINE=cwebp
elif command -v magick  >/dev/null 2>&1; then ENGINE=magick
elif command -v convert >/dev/null 2>&1; then ENGINE=convert
else echo "ERROR: need cwebp or ImageMagick."; exit 1; fi
echo "Converting with $ENGINE …"

width_for() {  # choose a max width from the file's base name
  case "$1" in
    hero-dining-room|interior-*|room-occasion) echo 1600 ;;
    logo-*) echo 500 ;;
    *) echo 800 ;;
  esac
}

shopt -s nullglob
for src in "$IMG"/*.jpg "$IMG"/*.jpeg "$IMG"/*.png; do
  base="$(basename "$src")"; name="${base%.*}"
  out="$IMG/$name.webp"; w="$(width_for "$name")"
  case "$ENGINE" in
    cwebp)   cwebp -quiet -q 80 -resize "$w" 0 "$src" -o "$out" ;;
    magick)  magick "$src" -resize "${w}x>" -quality 80 "$out" ;;
    convert) convert "$src" -resize "${w}x>" -quality 80 "$out" ;;
  esac
  echo "  ✓ $name.webp (${w}px max)"
  rm -f "$src"
done

echo "Rewriting hotlinks in *.html → assets/img/*.webp …"
CDN="https://images.squarespace-cdn.com/content/v1/62a8a8e34ccd012c860f9ec2"
# CDN "<uuid>/<file>"  →  local webp name  (only images actually used in the pages)
MAP=(
  "715a92ba-5636-46d2-9c4b-e715adee3e45/112726_LaMeridiana_Hero.jpg|hero-dining-room"
  "f3670b46-9674-4e85-9872-ed0d0d40ea22/IMG_4545.jpg|interior-1"
  "8fac8893-890c-4ab8-9806-fb664ed228c0/PHOTO-2025-02-26-15-25-07.jpg|room-occasion"
  "c430526d-42b4-4b62-8b03-15d1c0cefecc/IMG_4546.jpg|room-private-event"
  "7390fd54-1be4-4811-bf5f-d0bd011cebb3/Terrace+Opening.jpg|terrace-1"
  "642d044e-3f83-4cff-9d55-c74809ae2784/Terrace+Opening+2.jpg|terrace-2"
  "97e474f4-81a7-4844-b4d2-22a147e048e3/112726_LaMeridiana_Food_RisottoLangostineGamberoniWithCherryTomato.jpg|food-risotto-gamberoni"
  "ec56da65-11ac-4b77-aa0d-24a70e8646a3/112726_LaMeridiana_Food_Arancini.jpg|food-arancini"
  "9d041e06-f258-46a2-b22d-2be05cb05497/112726_LaMeridiana_Food_Bruschetta.jpg|food-bruschetta"
  "867a55e4-2a9d-400b-9e7d-aea249f3e6eb/112726_LaMeridiana_Food_CozzeAllaProvinciale.jpg|food-cozze"
  "3ad86e06-fe86-434e-97d2-dd36ef1d79f8/112726_LaMeridiana_Food_Gamberoni.jpg|food-gamberoni"
  "e732e844-6b26-4125-ad7a-67a852c839aa/112726_LaMeridiana_Food_Salmone.jpg|food-salmone"
)
for row in "${MAP[@]}"; do
  IFS='|' read -r path name <<<"$row"
  esc=$(printf '%s' "$CDN/$path" | sed 's/[\/&.+]/\\&/g')
  for f in ./*.html; do
    [ -f "$f" ] && sed -i.bak -E "s#${esc}(\?[^\"']*)?#assets/img/${name}.webp#g" "$f"
  done
done
rm -f ./*.html.bak
echo "Done. Review the pages, then commit assets/img/*.webp and the updated HTML."
