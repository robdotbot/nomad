#!/bin/bash
# Kolibri with Khan Academy. Long (~61 GB). Re-run to resume. ~2,300 files are missing upstream.
source "$(dirname "$0")/lib.sh"
need kolibri
export KOLIBRI_HOME="$NOMAD/kolibri"
say "Kolibri channels -> $KOLIBRI_HOME"
for c in "${KOLIBRI_CHANNELS[@]}"; do
  kolibri manage importchannel network "$c"
  kolibri manage importcontent network "$c" || warn "some content failed for $c (re-run to retry)"
done
