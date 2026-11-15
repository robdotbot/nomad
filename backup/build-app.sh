#!/bin/zsh
# Rebuilds ~/Applications/NOMAD Backup.app (the launcher launchd runs; holds the Full Disk Access grant).
# After rebuilding, re-check its switch in System Settings → Privacy & Security → Full Disk Access.
set -e
cd "${0:A:h}"
A="$HOME/Applications/NOMAD Backup.app/Contents"
mkdir -p "$A/MacOS"
clang -O2 -DNOMAD_BACKUP_SCRIPT="\"$PWD/nomad-backup.sh\"" -o "$A/MacOS/nomad-backup" launcher.c
cat > "$A/Info.plist" <<'PL'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>CFBundleIdentifier</key><string>local.nomad-backup</string>
  <key>CFBundleName</key><string>NOMAD Backup</string>
  <key>CFBundleExecutable</key><string>nomad-backup</string>
  <key>CFBundlePackageType</key><string>APPL</string>
  <key>LSUIElement</key><true/>
</dict></plist>
PL
codesign --force --sign - --identifier local.nomad-backup "$HOME/Applications/NOMAD Backup.app"
