# Starts the offline NOMAD kit from this drive on Windows 10/11: launcher page and videos, library
# (kiwix-serve), maps, Kolibri, Ollama. Run by "Start NOMAD.bat"; nothing is installed on the PC.
# Press Enter in this window to stop everything it started (closing the window leaves them running).
$N = Split-Path -Parent $PSScriptRoot          # the NOMAD folder on the drive
$W = $PSScriptRoot                             # portable apps (scripts/windows.sh puts them here)
Set-Location $N
$started = @()

function PortUp([int]$port) {
  $c = New-Object Net.Sockets.TcpClient
  try { $c.ConnectAsync('127.0.0.1', $port).Wait(300) -and $c.Connected } catch { $false } finally { $c.Close() }
}
function Q([string]$s) { '"' + $s + '"' }      # quote a path ("EXTREME PRO" has a space)

# Start one app hidden, unless its port is already taken (e.g. Ollama installed on this PC).
function Run([string]$name, [int]$port, [string]$exe, [string[]]$argv, [hashtable]$envs = @{}) {
  if (PortUp $port) { Write-Host "  $name already running on port $port"; return }
  if (-not (Test-Path $exe)) { Write-Host "  $name not found ($exe)" -ForegroundColor Yellow; return }
  foreach ($k in $envs.Keys) { Set-Item "env:$k" $envs[$k] }
  $p = Start-Process -FilePath $exe -ArgumentList ($argv -join ' ') -WorkingDirectory $N -WindowStyle Hidden -PassThru
  $script:started += $p
  Write-Host "  $name on port $port"
}

$py = "$W\python\python.exe"
if (-not (Test-Path $py)) { $py = (Get-Command python.exe -ErrorAction SilentlyContinue).Source }
# Skip macOS "._" sidecar files that exFAT drives pick up.
$zims = Get-ChildItem "$N\zim\*.zim" | Where-Object { $_.Name -notlike '._*' } | ForEach-Object { Q $_.FullName }

Write-Host "Starting NOMAD from $N"
Run 'Launcher + videos' 8090 $py @((Q "$N\serve.py"), '8090')
Run 'Maps' 8091 "$W\pmtiles\pmtiles.exe" @('serve', (Q "$N\maps"), '--port=8091', '--cors=*')
Run 'Education (Kolibri)' 8092 $py @('-m', 'kolibri', 'start', '--foreground', '--port=8092') @{ KOLIBRI_HOME = "$N\kolibri" }
Run 'AI (Ollama)' 11434 "$W\ollama\ollama.exe" @('serve') @{ OLLAMA_MODELS = "$N\ollama-models" }
if ($zims) { Run 'Library (Kiwix)' 80 "$W\kiwix\kiwix-serve.exe" (@('--address=127.0.0.1', '--port=80') + $zims) }

Start-Sleep -Seconds 2
Start-Process 'http://127.0.0.1:8090/'
Write-Host ''
Write-Host 'NOMAD running. Launcher: http://127.0.0.1:8090/   Library: http://127.0.0.1/'
Write-Host 'Kolibri and the library take up to a minute to come up the first time.'
Write-Host ''
try { Read-Host 'Press Enter to stop NOMAD' | Out-Null }
finally {
  $started | Where-Object { -not $_.HasExited } | ForEach-Object { Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue }
}
