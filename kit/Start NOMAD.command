#!/bin/zsh
# Starts the offline NOMAD kit from this drive: launcher page, map tiles, Kolibri, Ollama, Kiwix.
# Double-click in Finder. Close this window (or Ctrl-C) to stop the map and launcher servers.
N="${0:A:h}"
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.local/bin:$HOME/Library/Python/3.13/bin:$PATH"
cd "$N" || exit 1

port_up() { nc -z 127.0.0.1 "$1" 2>/dev/null; }

port_up 8090 || { python3 -m http.server 8090 --bind 127.0.0.1 -d "$N/web" >/dev/null 2>&1 & }
port_up 8091 || { pmtiles serve "$N/maps" --port=8091 --cors='*' >/dev/null 2>&1 & }
port_up 8092 || { KOLIBRI_HOME="$N/kolibri" kolibri start --port 8092 >/dev/null 2>&1 & }
# If Ollama isn't already running (e.g. the Homebrew service with ~/.ollama), serve the models on this drive.
port_up 11434 || { OLLAMA_MODELS="$N/ollama-models" ollama serve >/dev/null 2>&1 & }
open -a Kiwix

sleep 2
open "http://127.0.0.1:8090/"
echo "NOMAD running. Launcher: http://127.0.0.1:8090/"
echo "Library: in Kiwix, click Hotspot, select all books, Start Hotspot (http://127.0.0.1/)."
echo "Close this window to stop the launcher and map servers."
wait
