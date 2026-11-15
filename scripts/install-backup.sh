#!/bin/bash
# Installs the nightly 03:00 NAS backup (launchd) for this Mac.
source "$(dirname "$0")/lib.sh"
"$ROOT/backup/build-app.sh"
p="$HOME/Library/LaunchAgents/local.nomad-backup.plist"
sed "s#__HOME__#$HOME#g" "$ROOT/backup/local.nomad-backup.plist" > "$p"
launchctl bootout "gui/$(id -u)/local.nomad-backup" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$p"
echo "Now grant Full Disk Access: System Settings → Privacy & Security → Full Disk Access → + → ~/Applications/NOMAD Backup.app"
