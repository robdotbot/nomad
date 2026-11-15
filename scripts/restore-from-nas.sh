#!/bin/bash
# Rebuild the drive from the nightly NAS backup instead of the internet (faster, exact copy).
source "$(dirname "$0")/lib.sh"
[[ -d "$NAS/nomad" ]] || { echo "NAS not mounted at $NAS" >&2; exit 1; }
say "restoring $NAS -> $NOMAD"
mkdir -p "$NOMAD/zim"
rsync -rt "$NAS/nomad/" "$NOMAD/"
rsync -rt "$NAS/kiwix/"*.zim "$NOMAD/zim/"
ln -sfn ../guides "$NOMAD/web/guides"
chmod +x "$NOMAD/Start NOMAD.command"
