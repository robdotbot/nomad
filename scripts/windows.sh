#!/bin/bash
# Portable Windows apps (Python, kiwix-serve, pmtiles, Ollama, Kolibri) so the drive also runs on a
# Windows PC: double-click "Start NOMAD.bat". Nothing is installed on the PC.
# Windows can't read APFS: the drive must be exFAT for this to be any use (see README).
source "$(dirname "$0")/lib.sh"
say "windows apps"
need unzip
I="$NOMAD/installers/windows" W="$NOMAD/windows"
manifest "$ROOT/manifests/windows.tsv" | while IFS=$'\t' read -r zip dir url; do
  fetch "$url" "$I/$zip" || { warn "failed: $zip"; continue; }
  [[ -e "$W/$dir/.unpacked-$zip" ]] && continue
  rm -rf "$W/$dir" && mkdir -p "$W/$dir"
  unzip -q -o "$I/$zip" -d "$W/$dir" && touch "$W/$dir/.unpacked-$zip"
done
# The embedded Python only looks where python314._pth says: add the unpacked Kolibri wheel.
pth=$(ls "$W"/python/python3*._pth)
grep -qx '..\\kolibri' "$pth" || printf '..\\kolibri\r\n' >> "$pth"
