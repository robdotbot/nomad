# Settings for build.sh. Override any of these in config.local.sh (git-ignored) or the environment.
: ${NOMAD:="/Volumes/EXTREME PRO/NOMAD"}     # where the kit is built (a folder on the SSD)
: ${NAS:="/Volumes/HomelabBackups"}          # mounted NAS share, for restore-from-nas.sh
MODELS=(qwen3.8:27b-q8_0 qwen3.5:9b)         # Ollama models: best answers, and light enough for battery
MAP_BUILD=20261113                           # Protomaps daily build date (https://maps.protomaps.com/builds/)
MAP_MAXZOOM=15
KOLIBRI_VERSION=0.19.5
KOLIBRI_CHANNELS=(c9d7f950ab6b5a1199e3d6c10d7f0103)   # Khan Academy (US curriculum), ~61 GB
MAPLIBRE_VERSION=5.6.0
BASEMAPS_VERSION=5.5.1
CYBERCHEF_VERSION=v11.5.0
CYBERCHEF_ZIP=https://github.com/gchq/CyberChef/releases/download/v11.5.0/CyberChef_8cd426dd4f40f1423912d5fad91b578a86a65112.zip
