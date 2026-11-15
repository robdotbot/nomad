#!/bin/bash
# Builds the NOMAD offline kit onto a drive from scratch, from the internet.
#   ./build.sh                 every step, in order (safe to re-run: finished files are skipped)
#   ./build.sh guides maps     only those steps
# Target folder: NOMAD in config.sh (default "/Volumes/EXTREME PRO/NOMAD").
# To rebuild from the NAS backup instead: scripts/restore-from-nas.sh
source "$(dirname "$0")/scripts/lib.sh"
ALL=(kit web guides installers maps zim models kolibri)   # roughly smallest to largest
steps=("$@"); [[ $# -eq 0 ]] && steps=("${ALL[@]}")
[[ -d "$(dirname "$NOMAD")" ]] || { echo "drive not found: $(dirname "$NOMAD")" >&2; exit 1; }
for s in "${steps[@]}"; do
  [[ -x "$ROOT/scripts/$s.sh" ]] || { echo "unknown step: $s (steps: ${ALL[*]} vault)" >&2; exit 1; }
  "$ROOT/scripts/$s.sh"
done
say "done. Optional: ./scripts/vault.sh (encrypted folder), ./scripts/install-backup.sh (nightly NAS backup)"
