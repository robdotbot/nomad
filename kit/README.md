# NOMAD offline disaster kit

An offline knowledge kit for a Mac (or Windows PC), modelled on Project N.O.M.A.D. (which
only runs on x86 Ubuntu). Everything runs from the **EXTREME PRO** SSD. No internet needed.
It also runs on a Windows 10/11 PC if the drive is formatted exFAT (see "On Windows" below).

## Using it (Mac)

1. Plug in the EXTREME PRO drive.
2. Double-click **`Start NOMAD.command`** in this folder.
3. The launcher opens at **http://127.0.0.1:8090/**.
4. Library: in the Kiwix app, click **Hotspot** in the sidebar, select all the books, then **Start Hotspot** (it always uses port 80).

## On Windows

Windows can't read a Mac (APFS) drive. On an **exFAT** drive:

1. Plug in the drive and open the `NOMAD` folder in File Explorer.
2. Double-click **`Start NOMAD.bat`**. A window opens and starts everything from the drive's
   `windows/` folder (Python, kiwix-serve, pmtiles, Ollama, Kolibri). Nothing is installed on the PC.
3. The launcher opens at **http://127.0.0.1:8090/**. The library starts by itself on http://127.0.0.1/.
4. To stop, press Enter in that window.

First time: the drive must be exFAT, and the full Windows steps and troubleshooting are in the build repo README ("Windows install").

The first time, Windows may ask to allow the apps through the firewall: they only listen on this PC,
so you can cancel. The vault (`NOMAD Vault.sparsebundle`) only opens on a Mac. Baofeng's radio
programmer in `installers/radio/` is a Windows app.

| Tool | Address | What it is |
|---|---|---|
| Command Center | http://127.0.0.1:8090/ | Emergency checklists, family plan, topics, search, and status for everything below |
| Library | http://127.0.0.1/ (or the Kiwix app) | Wikipedia, medical wiki, survival guides, iFixit, Wikivoyage |
| AI assistant | launcher → AI assistant | Ollama on the Mac's GPU: `qwen3.8:27b` (best answers), `qwen3.5:9b` (on battery) |
| Education | http://127.0.0.1:8092/ | Kolibri with Khan Academy (US curriculum) |
| Guides | launcher → Guides (`guides/`) | Army first aid + survival manuals, BTECH UV-PRO manuals, NIFOG/ARES/band chart, FAA airband frequencies, FEMA guide, Las Vegas heat/flood, San Antonio winter |
| Vault | double-click `NOMAD Vault.sparsebundle` | Encrypted (AES-256) folder for IDs, insurance, medical records. Password: yours only |
| Maps | launcher → Maps (Near Home: nearest ER, fire, police, pharmacy) | Street maps: US West incl. Las Vegas/Henderson (`maps/us-west.pmtiles`), greater San Antonio, TX (`maps/san-antonio.pmtiles`) |

## What's where

| SSD folder | Contents | NAS backup |
|---|---|---|
| `zim/` | Kiwix ZIM files | `HomelabBackups/kiwix/` (also served by the homelab Kiwix) |
| `kolibri/` | Kolibri home: database + Khan Academy content | `HomelabBackups/nomad/kolibri/` |
| `maps/` | Offline map tiles | `HomelabBackups/nomad/maps/` |
| `web/` | Launcher, map viewer, chat page, map fonts/sprites | `HomelabBackups/nomad/web/` |
| `installers/` | Installer downloads | `HomelabBackups/nomad/installers/` |
| `windows/` | Portable Windows apps for `Start NOMAD.bat` | `HomelabBackups/nomad/windows/` |
| `ollama-models/` | AI model weights (`qwen3.8:27b-q8_0`), same files as `~/.ollama/models` on the Mac | `HomelabBackups/nomad/ollama-models/` |

Offline installers for a new Mac are in `installers/` (see `installers/INSTALL.md`).
Installed on this Mac: Kiwix app (`brew install --cask kiwix`), Ollama
(`brew install ollama`; models in `~/.ollama`), Kolibri (`pipx install kolibri`),
pmtiles (`brew install pmtiles`).

## Restoring to a new drive

1. Format the drive exFAT (works on Mac and Windows) or APFS (Mac only), name it `EXTREME PRO`.
2. Create `NOMAD/` and copy `HomelabBackups/nomad/*` into it.
3. Copy `HomelabBackups/kiwix/*.zim` into `NOMAD/zim/`.
4. Install the Mac apps above. The AI model comes back with `nomad/` (as `ollama-models/`), and
   `Start NOMAD.command` serves it from the drive if Ollama isn't already running.
   To also keep it on the Mac: copy `ollama-models/` to `~/.ollama/models/`.

## Refreshing content (while online)

- ZIMs: newer files at https://download.kiwix.org/zim/ . Put them in `zim/` and the NAS `kiwix/`.
- Khan Academy: `KOLIBRI_HOME="/Volumes/EXTREME PRO/NOMAD/kolibri" kolibri manage importcontent network c9d7f950ab6b5a1199e3d6c10d7f0103`
  (about 2,300 files are permanently missing on Kolibri's server and are always skipped).
- Maps: `pmtiles extract https://build.protomaps.com/<YYYYMMDD>.pmtiles maps/us-west.pmtiles --bbox=-125.0,31.3,-109.0,49.1 --maxzoom=15`
  and `... maps/san-antonio.pmtiles --bbox=-99.3,28.9,-97.8,30.1 --maxzoom=15`.
  To add a region: extract it into `maps/`, then add its name to `REGIONS` in `web/map.html`.
