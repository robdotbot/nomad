# NOMAD offline kit: build scripts

Rebuilds the NOMAD offline disaster kit (Kiwix library, local AI, Khan Academy, offline maps,
emergency guides, Bibles, offline installers) onto a drive, on an Apple Silicon Mac.
Modelled on Project N.O.M.A.D., which only runs on x86 Ubuntu.

The content itself (~300 GB) isn't in git. The scripts download it, or restore it from the NAS.

## Build a new kit

1. Format the drive APFS and name it `EXTREME PRO` (or set `NOMAD` in `config.local.sh`).
2. Install the apps (online, once per Mac):
   ```
   scripts/setup-mac.sh
   ```
3. Build. Re-running skips finished files, so it's safe to stop and resume.
   ```
   ./build.sh                    # everything
   ./build.sh kit web guides     # just some steps
   ```
4. Download CHIRP by hand (it sits behind a Cloudflare check) from
   https://archive.chirpmyradio.com/chirp_next/ into `installers/radio/`, then `./build.sh installers`
   again to refresh `SHA256SUMS`.
5. Optional: `scripts/vault.sh` (encrypted folder), `scripts/install-backup.sh` (nightly NAS backup).
6. On the drive, double-click `Start NOMAD.command`.

Faster, if the NAS backup exists: `scripts/restore-from-nas.sh` copies everything back from
`HomelabBackups` (the vault and Kolibri databases included).

## Steps

| Step | What | Size | Source |
|---|---|---|---|
| `kit` | Launcher, map and chat pages, start script, README, guide index | <1 MB | `kit/` in this repo |
| `web` | MapLibre, Protomaps basemaps, offline fonts and sprites, CyberChef | 95 MB | jsDelivr, GitHub |
| `guides` | Army first aid and survival, FEMA, Las Vegas, San Antonio, radio manuals, NIFOG, ARES, FAA airband, 5 Bibles | 250 MB | `manifests/guides.tsv`, `manifests/bibles.txt` |
| `docs-index` | Page counts and first-page thumbnails for the launcher (`web/data/docs.js`, `web/thumbs/`) | 5 MB | the guides |
| `installers` | Kiwix, Ollama, Python, Kolibri wheels, pmtiles, Baofeng CPS; writes `SHA256SUMS` | 350 MB | `manifests/installers.tsv` |
| `maps` | US West (Las Vegas, Henderson) and San Antonio, street level | 3.6 GB | Protomaps build, `manifests/maps.tsv` |
| `near-index` | Hospitals, fire stations, police, pharmacies, water, groceries, fuel around each city (`web/data/near.js`); needs node | 0.1 MB | the maps |
| `zim` | Wikipedia (maxi), MDWiki, iFixit, Wikivoyage, 5 zimgit guides, 6 how-to video collections; SHA-256 checked | 165 GB | `manifests/zim.txt` |
| `videos-index` | Video titles, lengths and thumbnails for the Watch pages (`web/data/videos.js`, `web/vthumbs/`); needs python3 | 20 MB | the video ZIMs |
| `models` | `qwen3.8:27b-q8_0`, `qwen3.5:9b` | 37 GB | Ollama |
| `kolibri` | Khan Academy (US) | 61 GB | Kolibri |
| `vault` (manual) | AES-256 encrypted sparse bundle | — | — |

## Updating content

Edit the manifest or `config.sh`, then re-run that step:

- **ZIMs:** change the dated filename in `manifests/zim.txt` (see https://download.kiwix.org/zim/), and
  delete the old file from the drive.
- **Maps:** change `MAP_BUILD` in `config.sh`, delete `maps/*.pmtiles`, run `./build.sh maps`. A new
  region needs a line in `manifests/maps.tsv` and its name in `REGIONS` in `kit/web/map.html`.
- **FAA Chart Supplements** expire every 56 days: update the date in `manifests/guides.tsv` and
  `kit/guides/index.html`.
- **Pages:** edit them in `kit/` (not on the drive), then `./build.sh kit`.

## The Command Center (launcher)

`kit/web/` is a static site served on port 8090:

- **Emergency tiles** (`data/emergencies.js`): step-by-step checklists (first minutes, first hour, first day)
  with tick-off state saved per browser, print, and links to the right guides. Local numbers for Las Vegas /
  Henderson and San Antonio utilities.
- **Our family** (`family.html`): Start here, Family Plan, Our House, Kids card. Fill in
  `web/data/family.js` on the drive (contacts, meeting places, shutoffs, medications). Secrets go in the vault.
- **Topics** (`data/topics.js`): Water, Food, Medical, Kids, Power, Comms, Home, Security, Repair, Survival,
  Faith, Reference. Keyword chips search the Kiwix library; docs show with thumbnails.
- **Search**: instant matches across checklists, topics and docs, plus full-text library search and "ask the AI".
- **Watch** (`watch.html`): 600+ how-to videos from Urban Prepper, Learn Self Reliance and Canadian Prepper
  (Kiwix video ZIMs), sorted by topic and searchable; each topic page shows its videos. They play in
  play.html, streamed straight from the ZIMs by `kit/serve.py` (the launcher server on 8090, standard
  library only, with seeking). Kiwix is not needed for videos.
- **Near Home** (`map.html?near=1`): nearest ER, urgent care, fire, police, pharmacy, water, groceries, fuel.

## Running it (on the drive)

| Tool | Address |
|---|---|
| Launcher | http://127.0.0.1:8090/ |
| Library | http://127.0.0.1/ (Kiwix app → Hotspot, select all books, Start; always port 80) |
| AI | Ollama, port 11434 |
| Education | Kolibri, http://127.0.0.1:8092/ |
| Maps | pmtiles serve, port 8091 |

## Nightly backup

`backup/` holds the 03:00 launchd job that copies the drive and `~/.ollama/models` to the NAS
(`HomelabBackups/nomad/` and `kiwix/`). It runs through a tiny signed app so macOS can grant it
Full Disk Access. `scripts/install-backup.sh` builds and loads it. NAS address and account are at
the top of `backup/nomad-backup.sh`.
