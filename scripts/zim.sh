#!/bin/bash
# Kiwix library (~150 GB, mostly Wikipedia). Each file is checked against Kiwix's SHA-256.
source "$(dirname "$0")/lib.sh"
say "ZIM library"
manifest "$ROOT/manifests/zim.txt" | while read -r p; do
  f="$NOMAD/zim/$(basename "$p")"
  [[ -s "$f" ]] && { echo "  have $(basename "$f")"; continue; }
  fetch "https://download.kiwix.org/zim/$p" "$f"
  want=$(curl -fsSL "https://download.kiwix.org/zim/$p.sha256" | awk '{print $1}')
  got=$(shasum -a 256 "$f" | awk '{print $1}')
  [[ "$want" == "$got" ]] || { warn "checksum mismatch: $f (removed)"; rm -f "$f"; exit 1; }
  echo "  verified $(basename "$f")"
done
