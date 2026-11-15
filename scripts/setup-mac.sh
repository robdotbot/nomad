#!/bin/bash
# Installs the apps the kit runs on (Apple Silicon Mac with Homebrew). Online only.
set -euo pipefail
command -v brew >/dev/null || { echo "install Homebrew first: https://brew.sh" >&2; exit 1; }
brew install --cask kiwix
brew install ollama pmtiles pipx
brew services start ollama
pipx install "kolibri==0.19.5"
/usr/bin/arch -x86_64 /usr/bin/true 2>/dev/null || softwareupdate --install-rosetta --agree-to-license   # for CHIRP
