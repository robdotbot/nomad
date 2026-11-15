#!/bin/bash
# Map viewer libraries plus offline fonts and sprites, so maps work with no internet.
source "$(dirname "$0")/lib.sh"
say "map viewer libraries"
L="$NOMAD/web/lib"
fetch "https://cdn.jsdelivr.net/npm/maplibre-gl@$MAPLIBRE_VERSION/dist/maplibre-gl.js"  "$L/maplibre-gl.js"
fetch "https://cdn.jsdelivr.net/npm/maplibre-gl@$MAPLIBRE_VERSION/dist/maplibre-gl.css" "$L/maplibre-gl.css"
fetch "https://cdn.jsdelivr.net/npm/@protomaps/basemaps@$BASEMAPS_VERSION/dist/basemaps.js" "$L/basemaps.js"
if [[ ! -d "$NOMAD/web/assets/fonts" ]]; then
  t=$(mktemp -d)
  fetch https://github.com/protomaps/basemaps-assets/archive/refs/heads/main.zip "$t/assets.zip"
  unzip -q "$t/assets.zip" -d "$t"
  mkdir -p "$NOMAD/web/assets"
  rsync -a "$t"/basemaps-assets-main/ "$NOMAD/web/assets/"
  rm -rf "$t"
fi
