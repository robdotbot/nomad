#!/bin/bash
# Emergency guides (manuals, local hazard guides, radio references), religious texts and public-domain Bibles.
source "$(dirname "$0")/lib.sh"
say "guides"
manifest "$ROOT/manifests/guides.tsv" | while IFS=$'\t' read -r path url; do
  fetch "$url" "$NOMAD/guides/$path" || warn "failed: $path ($url)"
done
# Plain-text books (Gutenberg .txt) get a readable HTML copy, so they show in Docs and open in a browser.
for f in "$NOMAD"/guides/*/*.txt; do
  [[ -f "$f" && ! -s "${f%.txt}.html" ]] || continue
  python3 -I "$ROOT/scripts/txt2html.py" "$f" "${f%.txt}.html" && echo "  html $(basename "${f%.txt}").html"
done
say "bibles"
manifest "$ROOT/manifests/bibles.txt" | while read -r id; do
  d="$NOMAD/guides/bible/$id"
  [[ -f "$d/index.htm" ]] && { echo "  have $id"; continue; }
  t=$(mktemp -d)
  fetch "https://ebible.org/Scriptures/${id}_html.zip" "$t/b.zip" && mkdir -p "$d" && unzip -q -o "$t/b.zip" -d "$d"
  rm -rf "$t"
done
