#!/bin/bash
# Offline street maps, cut from the Protomaps planet build (only the needed tiles are downloaded).
source "$(dirname "$0")/lib.sh"
need pmtiles
say "maps (build $MAP_BUILD)"
manifest "$ROOT/manifests/maps.tsv" | while IFS=$'\t' read -r name bbox; do
  out="$NOMAD/maps/$name.pmtiles"
  [[ -s "$out" ]] && { echo "  have $name"; continue; }
  pmtiles extract "https://build.protomaps.com/$MAP_BUILD.pmtiles" "$out.part" --bbox="$bbox" --maxzoom="$MAP_MAXZOOM"
  mv "$out.part" "$out"
done
