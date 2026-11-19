# Installing the NOMAD apps on a new Mac, offline

These installers let any Apple Silicon Mac (macOS 11+) run this kit with no internet.
**On Windows there is nothing to install:** `Start NOMAD.bat` runs the portable apps in `../windows/`
(their original downloads are in `windows/` here). The drive must be exFAT for Windows to read it.
Checksums are in `SHA256SUMS`. Check them with `shasum -a 256 -c SHA256SUMS` in this folder.

| File | What it is | Signed |
|---|---|---|
| `kiwix-macos_3.18.0.dmg` | Kiwix app (Library) | App notarized (Wikimedia CH) |
| `Ollama.dmg` | Ollama app (AI) | Notarized (Ollama) |
| `python-3.13.17-macos11.pkg` | Python, needed by Kolibri | Notarized (Python Software Foundation) |
| `kolibri-wheels/` | Kolibri (Education) | PyPI package |
| `go-pmtiles-1.31.2_Darwin_arm64.zip` | Map tile server | Not signed |
| `radio/chirp-20261113-x86_64.app.zip` | CHIRP radio programmer (UV-5R Mini, needs a K1 FTDI cable). Intel build: needs Rosetta | Notarized (CHIRP Software LLC) |
| `radio/Baofeng_UV_5R_Mini_CPS_V1.0.7.zip` | Baofeng's own UV-5R Mini programmer | Windows only |

## Steps

1. **Kiwix:** open the `.dmg`, drag Kiwix to Applications.
2. **Ollama:** open the `.dmg`, drag Ollama to Applications, open it once.
3. **Python:** double-click the `.pkg` and follow the installer.
4. **Kolibri:** in Terminal:
   ```
   python3 -m pip install --user --no-index --find-links "/Volumes/EXTREME PRO/NOMAD/installers/kolibri-wheels" kolibri
   ```
   It installs to `~/Library/Python/3.13/bin/kolibri`. Add that folder to your PATH, or
   edit the `kolibri` line in `Start NOMAD.command` to use the full path.
5. **pmtiles (maps):** unzip, then copy `pmtiles` to `/usr/local/bin/`. Because it isn't signed,
   macOS blocks it the first time: run it once, then go to System Settings → Privacy & Security
   and click **Open Anyway**.
6. **CHIRP (radio programming):** unzip and drag CHIRP to Applications. It's an Intel app, so
   Apple Silicon Macs need Rosetta, and **Rosetta can only be installed online**
   (`softwareupdate --install-rosetta --agree-to-license`). Do that while you still have internet.
7. Double-click `Start NOMAD.command`. The AI models load from the drive (`ollama-models/`).
