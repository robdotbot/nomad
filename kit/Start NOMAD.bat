@echo off
rem Starts NOMAD on Windows: double-click this in File Explorer. Press Enter in its window to stop.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0windows\start-nomad.ps1"
if errorlevel 1 pause
