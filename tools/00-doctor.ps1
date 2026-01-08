[CmdletBinding()]
param(
  [string]$RepoRoot = (Resolve-Path ".").Path
)

$ErrorActionPreference = "Stop"

function Say($msg) { Write-Host $msg }
function Bad($msg) { Write-Host "✖ $msg" -ForegroundColor Red }
function Ok($msg)  { Write-Host "✔ $msg" -ForegroundColor Green }
function Warn($msg){ Write-Host "⚠ $msg" -ForegroundColor Yellow }

Set-Location $RepoRoot

$problems = 0

Say "`n== Git Doctor =="

# 1) Repo?
git rev-parse --is-inside-work-tree *> $null
if ($LASTEXITCODE -ne 0) { throw "Not a git repo: $RepoRoot" }
Ok "Git repo detected"

# 2) Clean working tree?
$porcelain = git status --porcelain
if ($porcelain) { Warn "Working tree not clean"; $problems++ } else { Ok "Working tree clean" }

# 3) Branch + upstream
$branch = (git rev-parse --abbrev-ref HEAD).Trim()
Ok "On branch: $branch"
$up = (git rev-parse --abbrev-ref --symbolic-full-name "@{u}" 2>$null)
if (-not $up) { Warn "No upstream configured for $branch"; $problems++ } else { Ok "Upstream: $up" }

# 4) Conflict markers
$conflicts = git grep -n '^(<<<<<<<|=======|>>>>>>>)' -- ':!_site' ':!.jekyll-cache' 2>$null
if ($conflicts) { Bad "Merge conflict markers found"; $problems++ } else { Ok "No merge conflict markers" }

# 5) Stray .bak tracked
$bak = git ls-files | Select-String -Pattern '\.bak$'
if ($bak) { Warn ".bak files tracked by git"; $problems++ } else { Ok "No tracked .bak files" }

# 6) .gitattributes present
if (Test-Path ".gitattributes") { Ok ".gitattributes exists" } else { Warn "Missing .gitattributes"; $problems++ }

# 7) .gitignore basics
if (Test-Path ".gitignore") {
  $gi = Get-Content ".gitignore" -Raw
  $need = @("_site/",".jekyll-cache/",".sass-cache/","*.bak","_backup/")
  foreach ($n in $need) {
    if ($gi -notmatch [regex]::Escape($n)) { Warn "gitignore missing: $n"; $problems++ }
  }
  Ok ".gitignore checked"
} else {
  Warn "Missing .gitignore"; $problems++
}

# 8) Jekyll build sanity (optional fast)
if (Test-Path "Gemfile") {
  Say "`n== Jekyll build check =="
  try {
    bundle exec jekyll clean | Out-Null
    bundle exec jekyll build --strict_front_matter | Out-Null
    Ok "Jekyll build succeeded"
  } catch {
    Bad "Jekyll build failed (see output by running manually)"
    $problems++
  }
} else {
  Warn "No Gemfile found; skipping Jekyll check"
}

Say "`n== Result =="
if ($problems -eq 0) { Ok "Doctor: CLEAN" ; exit 0 }
Bad "Doctor: FOUND $problems ISSUE(S)"
exit 1
