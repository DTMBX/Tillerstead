[CmdletBinding()]
param(
  [string]$RepoRoot = (Resolve-Path "..").Path,
  [string]$Branch   = "main",
  [string]$Message  = "Automated deploy"
)

$ErrorActionPreference = "Stop"
Set-Location $RepoRoot

Write-Host "`n== DEPLOY PIPELINE =="

# --------------------------------------------------
# 1. Doctor (repo sanity checks)
# --------------------------------------------------
pwsh -NoProfile -ExecutionPolicy Bypass `
  -File "$PSScriptRoot\00-doctor.ps1" `
  -RepoRoot $RepoRoot

# --------------------------------------------------
# 2. Fix (config / excludes / normalization)
# --------------------------------------------------
pwsh -NoProfile -ExecutionPolicy Bypass `
  -File "$PSScriptRoot\10-fix.ps1" `
  -RepoRoot $RepoRoot

# --------------------------------------------------
# 3. FRONT MATTER GUARD  ⬅️ ADDITION (CRITICAL)
# --------------------------------------------------
pwsh -NoProfile -ExecutionPolicy Bypass `
  -File "$PSScriptRoot\05-frontmatter-guard.ps1" `
  -RepoRoot $RepoRoot

# --------------------------------------------------
# 4. Build (hard fail if Liquid breaks)
# --------------------------------------------------
Write-Host "`n== Jekyll build =="

bundle exec jekyll clean
bundle exec jekyll build --trace --strict_front_matter

# --------------------------------------------------
# 5. Commit + push (only if changes exist)
# --------------------------------------------------
if (-not (git diff --quiet)) {
  git add -A
  git commit -m $Message
  git push origin $Branch
  Write-Host "✔ Changes committed and pushed"
} else {
  Write-Host "✔ No changes to commit"
}

Write-Host "`n== DEPLOY COMPLETE =="
