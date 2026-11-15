#!/bin/bash
# Offline installers so the kit can be set up on a new Mac with no internet.
source "$(dirname "$0")/lib.sh"
say "installers"
I="$NOMAD/installers"
manifest "$ROOT/manifests/installers.tsv" | while IFS=$'\t' read -r path url; do
  fetch "$url" "$I/$path" || warn "failed: $path"
done
need python3
if [[ ! -d "$I/kolibri-wheels" ]]; then
  python3 -m pip download --quiet --dest "$I/kolibri-wheels" "kolibri==$KOLIBRI_VERSION"
fi
ls "$I"/radio/chirp-*.app.zip >/dev/null 2>&1 \
  || warn "CHIRP not found: download it by hand (Cloudflare check) from https://archive.chirpmyradio.com/chirp_next/ into $I/radio/"
(cd "$I" && find . -type f ! -name SHA256SUMS ! -name INSTALL.md ! -name .DS_Store | sed 's#^\./##' | sort \
  | while read -r f; do shasum -a 256 "$f"; done > SHA256SUMS)
echo "  wrote SHA256SUMS"
