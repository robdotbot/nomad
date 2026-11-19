# Changelog

Releases are on GitHub: https://github.com/robdotbot/nomad/releases. Each one has the Command Center
zip (see "Releases" in the README). `scripts/release.sh` uses the section for its version as the notes.

## 1.0.0 (2026-11-18)

First release.

- **Runs on Windows.** `Start NOMAD.bat` starts everything from portable apps in `windows/` (new
  `./build.sh windows` step): the launcher and videos (Python 3.14), the library (kiwix-serve on port 80),
  maps (pmtiles), AI (Ollama) and Khan Academy (Kolibri). The drive must be exFAT; APFS is Mac only.
- `serve.py` serves `/guides/` itself, because exFAT drives have no symlinks. It also sets MIME types
  itself, because Windows takes them from the registry.
- Built-in video player: 603 how-to videos stream straight from the ZIMs, with seeking, chapters,
  Up next and resume. Kiwix isn't needed.
- Switchable light/dark mode on every page, the guides index and the text books.
- Family comms plan for the UV-5R Mini, with a CHIRP channel list.
- Faith: Vietnamese Bible (1925) and religions of Vietnam (Buddhist sutras, Tao Te Ching, Analects,
  Catholic catechism).
- Command Center: emergency checklists, family pages, topics, search, Near Home map, CyberChef, and
  the Watch section.
- Backups skip macOS `._` files, which exFAT drives pick up.
