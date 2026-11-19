#!/bin/bash
# Launcher pages, start script, README and guide index: the small hand-written files.
source "$(dirname "$0")/lib.sh"
say "kit files -> $NOMAD"
mkdir -p "$NOMAD"/{windows,web/lib,guides,installers/radio,zim,maps,kolibri,ollama-models,docs}
# family.js holds your own details: copy the blank template only if the drive has none yet.
rsync -a --exclude web/data/family.js "$ROOT/kit/" "$NOMAD/"
[[ -f "$NOMAD/web/data/family.js" ]] || cp "$ROOT/kit/web/data/family.js" "$NOMAD/web/data/family.js"
chmod +x "$NOMAD/Start NOMAD.command"
# serve.py also serves /guides itself, so this symlink is only a convenience (exFAT has none).
ln -sfn ../guides "$NOMAD/web/guides" 2>/dev/null || true
