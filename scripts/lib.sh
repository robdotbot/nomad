# Shared helpers. Sourced by build.sh and every step.
set -euo pipefail
ROOT="${ROOT:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
source "$ROOT/config.sh"
[[ -f "$ROOT/config.local.sh" ]] && source "$ROOT/config.local.sh"
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.local/bin:$PATH"

say()  { printf '\033[1m==> %s\033[0m\n' "$*"; }
warn() { printf '\033[33mwarning:\033[0m %s\n' "$*" >&2; }
need() { command -v "$1" >/dev/null || { echo "missing '$1' (run scripts/setup-mac.sh)" >&2; exit 1; }; }

# fetch URL DEST: resumable download that only replaces DEST once complete. Skips DEST if present.
fetch() {
  local url="$1" dest="$2"
  [[ -s "$dest" ]] && { echo "  have $(basename "$dest")"; return 0; }
  mkdir -p "$(dirname "$dest")"
  echo "  get  $(basename "$dest")"
  curl -fL --progress-bar --retry 5 --retry-delay 10 -C - -o "$dest.part" "$url" && mv "$dest.part" "$dest"
}

# manifest FILE: print non-comment, non-blank lines.
manifest() { grep -vE '^\s*(#|$)' "$1"; }
