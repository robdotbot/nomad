#!/bin/bash
# Publishes a GitHub release of the Command Center (everything `./build.sh kit` puts on the drive).
#   scripts/release.sh 1.1.0       needs a "## 1.1.0" section in CHANGELOG.md and a clean, pushed main
#   scripts/release.sh 1.1.0 --dry  only build dist/nomad-command-center-v1.1.0.zip
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"; cd "$ROOT"
v="${1:?usage: scripts/release.sh VERSION [--dry]}"; v="${v#v}"; tag="v$v"
notes=$(awk -v v="$v" '$0 ~ "^## "v"( |$)" {on=1; next} /^## / {on=0} on' CHANGELOG.md)
[[ -n "${notes//[[:space:]]/}" ]] || { echo "add a '## $v' section to CHANGELOG.md first" >&2; exit 1; }

name="nomad-command-center-$tag"; zip="$ROOT/dist/$name.zip"
tmp=$(mktemp -d); trap 'rm -rf "$tmp"' EXIT
# Tracked files only, so nothing local (config, drafts) slips in. family.js is left out so unzipping
# over a drive keeps the family's own details; a blank copy goes in as family.blank.js.
# --worktree-attributes applies .gitattributes, so the Windows scripts get CRLF line endings.
git archive --worktree-attributes --format=tar --prefix=NOMAD/ HEAD:kit | tar -x -C "$tmp"
mv "$tmp/NOMAD/web/data/family.js" "$tmp/NOMAD/web/data/family.blank.js"
cp CHANGELOG.md "$tmp/NOMAD/CHANGELOG.md"
chmod +x "$tmp/NOMAD/Start NOMAD.command"
mkdir -p dist && rm -f "$zip"
(cd "$tmp" && zip -qrX "$zip" NOMAD)
echo "built $zip ($(du -h "$zip" | cut -f1))"
[[ "${2:-}" == --dry ]] && exit 0

command -v gh >/dev/null || { echo "missing gh (brew install gh)" >&2; exit 1; }
[[ -z "$(git status --porcelain)" ]] || { echo "commit your changes first" >&2; exit 1; }
git fetch -q origin
[[ "$(git rev-parse HEAD)" == "$(git rev-parse origin/main)" ]] || { echo "push main first" >&2; exit 1; }
git tag -a "$tag" -m "NOMAD $v"
git push -q origin "$tag"
gh release create "$tag" "$zip" --title "NOMAD $v" --notes "$notes

**Install / update:** unzip over the \`NOMAD\` folder on the drive (keeps your \`family.js\`), then
double-click \`Start NOMAD.command\` (Mac) or \`Start NOMAD.bat\` (Windows). The content (library, maps,
AI models, Khan Academy) isn't in the zip: \`./build.sh\` downloads it."
