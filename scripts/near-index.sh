#!/bin/bash
# Near Home index (hospitals, fire stations, police, pharmacies…) from the offline maps. Needs node.
source "$(dirname "$0")/lib.sh"
need node
say "Near Home places index"
(cd "$ROOT/scripts/near" && [[ -d node_modules ]] || npm ci --no-audit --no-fund --silent --prefix "$ROOT/scripts/near")
node "$ROOT/scripts/near/near-index.mjs" "$NOMAD"
