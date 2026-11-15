#!/bin/bash
# Launcher pages, start script, README and guide index: the small hand-written files.
source "$(dirname "$0")/lib.sh"
say "kit files -> $NOMAD"
mkdir -p "$NOMAD"/{web/lib,guides,installers/radio,zim,maps,kolibri,ollama-models,docs}
rsync -a "$ROOT/kit/" "$NOMAD/"
chmod +x "$NOMAD/Start NOMAD.command"
ln -sfn ../guides "$NOMAD/web/guides"
