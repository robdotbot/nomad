#!/bin/bash
# Emergency guides (manuals, local hazard guides, radio references) and public-domain Bibles.
source "$(dirname "$0")/lib.sh"
say "guides"
manifest "$ROOT/manifests/guides.tsv" | while IFS=$'\t' read -r path url; do
  fetch "$url" "$NOMAD/guides/$path" || warn "failed: $path ($url)"
done
say "bibles"
manifest "$ROOT/manifests/bibles.txt" | while read -r id; do
  d="$NOMAD/guides/bible/$id"
  [[ -f "$d/index.htm" ]] && { echo "  have $id"; continue; }
  t=$(mktemp -d)
  fetch "https://ebible.org/Scriptures/${id}_html.zip" "$t/b.zip" && mkdir -p "$d" && unzip -q -o "$t/b.zip" -d "$d"
  rm -rf "$t"
done
