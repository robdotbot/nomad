#!/bin/bash
# AI models: pulled into ~/.ollama, then copied to the drive so Start NOMAD.command can serve them.
source "$(dirname "$0")/lib.sh"
need ollama
say "AI models"
curl -fs http://127.0.0.1:11434/api/tags >/dev/null || { echo "start Ollama first (brew services start ollama)" >&2; exit 1; }
for m in "${MODELS[@]}"; do ollama pull "$m"; done
rsync -rt "$HOME/.ollama/models/" "$NOMAD/ollama-models/"
