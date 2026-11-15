#!/bin/bash
# Watch section index: titles, lengths and thumbnails from the video ZIMs. Needs python3.
source "$(dirname "$0")/lib.sh"
say "videos index"
V="$ROOT/scripts/.venv"
[[ -x "$V/bin/python" ]] || { python3 -m venv "$V" && "$V/bin/pip" install -q "libzim==4.1.0"; }
"$V/bin/python" -I "$ROOT/scripts/videos-index.py" "$NOMAD"
