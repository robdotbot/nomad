#!/bin/zsh
# Nightly backup of the NOMAD offline kit (EXTREME PRO SSD + Ollama models) to the NAS.
# Run by launchd (local.nomad-backup.plist) at 03:00, after the UDM backup job at 02:00, through
# ~/Applications/NOMAD Backup.app (build-app.sh), the one app with Full Disk Access for this job.
# If the Mac was asleep at 03:00, launchd runs it on the next wake.
# Copies only. Nothing is ever deleted on the NAS.
#   SSD NOMAD/zim/*.zim      -> HomelabBackups/kiwix/   (also served by the homelab Kiwix)
#   SSD NOMAD/ (minus zim/)  -> HomelabBackups/nomad/
#   ~/.ollama/models/        -> HomelabBackups/nomad/ollama-models/
# Log: ~/Library/Logs/nomad-backup.log
set -u
setopt pipefail   # an rsync failure must not be hidden by the grep after it
export PATH="/opt/homebrew/bin:$HOME/.local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
SSD="/Volumes/EXTREME PRO/NOMAD"
NAS="/Volumes/HomelabBackups"
NAS_IP="192.168.1.20"   # the Keychain login is saved under the IP, not nas.local
NAS_URL="smb://backup@$NAS_IP/HomelabBackups"

log()    { print -r -- "$(date '+%F %T') $*"; }
notify() { osascript -e "display notification \"$1\" with title \"NOMAD backup\"" 2>/dev/null; }
fail()   { log "FAILED: $1"; notify "Failed: $1"; exit 1; }

log "start"
[[ -d "$SSD" ]] || fail "EXTREME PRO drive not plugged in"

if [[ ! -d "$NAS/kiwix" ]]; then
  # Mount only with a login saved in Keychain, so a 3 a.m. run never pops a password dialog.
  security find-internet-password -s "$NAS_IP" -a backup >/dev/null 2>&1 \
    || fail "NAS not mounted and no saved Keychain login (connect once in Finder with 'Remember this password')"
  osascript -e "mount volume \"$NAS_URL\"" >/dev/null 2>&1
  sleep 3
  [[ -d "$NAS/kiwix" ]] || fail "could not mount $NAS_URL"
fi

err=0
# Kolibri's databases are live SQLite files (with -wal/-shm), so copying them directly can
# capture a half-written state. Snapshot each with SQLite's online .backup (safe while Kolibri
# runs; `kolibri manage dbbackup` refuses to), then put the snapshots on the NAS under the same
# names, so HomelabBackups/nomad/kolibri/ is directly restorable.
snap=$(mktemp -d) || fail "mktemp"
trap 'rm -rf "$snap"' EXIT
for db in "$SSD/kolibri/"*.sqlite3(N); do
  sqlite3 "$db" ".backup '$snap/${db:t}'" || { log "sqlite snapshot failed: ${db:t}"; err=1; }
done

# Finished ZIMs only (*.zim, never .part); rsync's hidden temp names keep the homelab Kiwix from
# picking up half-copied files.
zims=("$SSD/zim/"*.zim(N))
(( ${#zims} )) && { rsync -rt --stats "${zims[@]}" "$NAS/kiwix/" | grep -E 'transferred:|total size' || err=1; }
rsync -rt --stats --exclude 'zim/' --exclude '.DS_Store' --exclude '/kolibri/*.sqlite3*' \
  "$SSD/" "$NAS/nomad/" | grep -E 'transferred:|total size' || err=1
rsync -rt "$snap/" "$NAS/nomad/kolibri/" || err=1
[[ -d ~/.ollama/models ]] && { mkdir -p "$NAS/nomad/ollama-models"
  rsync -rt --stats ~/.ollama/models/ "$NAS/nomad/ollama-models/" | grep -E 'transferred:|total size' || err=1; }

(( err )) && fail "one or more copies had errors (see ~/Library/Logs/nomad-backup.log)"
date '+%F %T' > "$NAS/nomad/LAST_BACKUP"
log "done"
