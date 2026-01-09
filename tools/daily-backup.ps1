[CmdletBinding()]
param(
  [string]$LogPath = "$(Join-Path $PSScriptRoot "logs/daily-backup.log")",
  [switch]$TestRun
)

$ErrorActionPreference = "Stop"

$logDir = Split-Path $LogPath -Parent
if (-not (Test-Path $logDir)) {
  New-Item -ItemType Directory -Path $logDir -Force | Out-Null
}

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$mode = if ($TestRun) { "TEST" } else { "RUN" }

Add-Content -Path $LogPath -Value "[$timestamp] [$mode] Daily backup starting."

# TODO: Replace with real backup logic for your environment.
Start-Sleep -Seconds 1

Add-Content -Path $LogPath -Value "[$timestamp] [$mode] Daily backup completed."
