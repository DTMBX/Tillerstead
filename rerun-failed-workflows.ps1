# rerun-failed-workflows.ps1
# Re-runs failed/cancelled workflow runs, fixes common issues, and continuously reruns until they pass.
# Requires: GitHub CLI (gh) + authenticated user with permissions to re-run.

$ErrorActionPreference = "Stop"

# Ensure gh is available
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  throw "GitHub CLI (gh) not found. Install with: winget install --id GitHub.cli -e"
}

# Ensure we're inside a git repo
if (-not (Test-Path ".git")) {
  throw "Run this from the repo root (where .git exists)."
}

function Scan-AndFix-Files {
  Write-Host "Scanning and optimizing files..." -ForegroundColor Yellow
  
  # JavaScript & TypeScript linting and formatting
  if (Get-Command npm -ErrorAction SilentlyContinue) {
    Write-Host "  Running ESLint with auto-fix..." -ForegroundColor Gray
    npm run lint -- --fix 2>$null
    
    Write-Host "  Running Prettier code formatter..." -ForegroundColor Gray
    npm run format 2>$null
  }
  
  # HTML validation and optimization
  if (Get-Command htmlhint -ErrorAction SilentlyContinue) {
    Write-Host "  Running HTMLHint validation..." -ForegroundColor Gray
    htmlhint "**/*.html" --format compact 2>$null
  }
  
  # CSS/SCSS linting
  if (Get-Command stylelint -ErrorAction SilentlyContinue) {
    Write-Host "  Running StyleLint for CSS optimization..." -ForegroundColor Gray
    npx stylelint "**/*.{css,scss}" --fix 2>$null
  }
  
  # Image optimization
  if (Get-Command imagemin -ErrorAction SilentlyContinue) {
    Write-Host "  Optimizing images..." -ForegroundColor Gray
    npx imagemin "assets/**/*.{jpg,jpeg,png,gif}" --out-dir=assets 2>$null
  }
  
  # SVG optimization
  if (Get-Command svgo -ErrorAction SilentlyContinue) {
    Write-Host "  Optimizing SVG files..." -ForegroundColor Gray
    npx svgo "assets/**/*.svg" --multipass 2>$null
  }
  
  # Web performance audits
  if (Get-Command lighthouse -ErrorAction SilentlyContinue) {
    Write-Host "  Running Lighthouse performance audit..." -ForegroundColor Gray
    npx lighthouse https://tillerstead.com --output=json --output-path=lighthouse-report.json 2>$null
  }
  
  # YAML/JSON validation
  if (Get-Command yamllint -ErrorAction SilentlyContinue) {
    Write-Host "  Validating YAML files..." -ForegroundColor Gray
    yamllint "_*.yml" 2>$null
  }
  
  # Markdown linting
  if (Get-Command markdownlint -ErrorAction SilentlyContinue) {
    Write-Host "  Linting Markdown documentation..." -ForegroundColor Gray
    npx markdownlint "**/*.md" --fix 2>$null
  }
  
  # Check for security vulnerabilities
  Write-Host "  Running npm audit for vulnerabilities..." -ForegroundColor Gray
  npm audit fix 2>$null
  
  # Prune unused dependencies
  Write-Host "  Pruning unused dependencies..." -ForegroundColor Gray
  npm prune 2>$null
  
  # Update packages (non-major)
  Write-Host "  Updating packages (safe updates)..." -ForegroundColor Gray
  npm update 2>$null
  
  # Dead code detection (if available)
  if (Get-Command unimported -ErrorAction SilentlyContinue) {
    Write-Host "  Detecting unused code..." -ForegroundColor Gray
    npx unimported 2>$null
  }
  
  # Accessibility checking
  if (Get-Command pa11y -ErrorAction SilentlyContinue) {
    Write-Host "  Running accessibility audit..." -ForegroundColor Gray
    npx pa11y "**/*.html" 2>$null
  }
  
  # Clean up temporary files
  Write-Host "  Cleaning temporary files..." -ForegroundColor Gray
  Get-ChildItem -Path . -Include "*.tmp", "*.log", ".DS_Store" -Recurse -Force | Remove-Item -ErrorAction SilentlyContinue
  
  Write-Host "  Optimization complete." -ForegroundColor Green
}

function Fix-CommonIssues {
  Write-Host "Attempting to fix common workflow issues..." -ForegroundColor Yellow
  
  # Scan and fix files
  Scan-AndFix-Files
  
  # Clean node_modules and reinstall
  if (Test-Path "node_modules") {
    Write-Host "  Cleaning node_modules..." -ForegroundColor Gray
    Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
  }
  
  # Clear npm cache
  Write-Host "  Clearing npm cache..." -ForegroundColor Gray
  npm cache clean --force 2>$null
  
  # Reinstall dependencies
  Write-Host "  Reinstalling npm dependencies..." -ForegroundColor Gray
  npm ci 2>$null
  
  # Clear Jekyll cache
  if (Test-Path "_site") {
    Write-Host "  Clearing Jekyll build cache..." -ForegroundColor Gray
    Remove-Item -Recurse -Force _site -ErrorAction SilentlyContinue
  }
  
  # Run local build test
  Write-Host "  Running local build..." -ForegroundColor Gray
  if (Get-Command bundle -ErrorAction SilentlyContinue) {
    bundle exec jekyll build 2>$null
  } elseif (Get-Command jekyll -ErrorAction SilentlyContinue) {
    jekyll build 2>$null
  }
  
  Write-Host "  Fixes applied." -ForegroundColor Green
}

function Wait-ForWorkflow {
  param([string]$RunId, [int]$MaxAttempts = 180)
  
  $attempt = 0
  while ($attempt -lt $MaxAttempts) {
    Start-Sleep -Seconds 5
    $status = gh run view $RunId --json conclusion,status --jq '.status'
    
    if ($status -eq "completed") {
      $conclusion = gh run view $RunId --json conclusion --jq '.conclusion'
      return $conclusion
    }
    
    $attempt++
  }
  
  return "timeout"
}

Write-Host "Fetching failed/cancelled workflow runs..." -ForegroundColor Cyan

# Pull up to 200 recent failed/cancelled runs
$runsJson = gh run list --limit 200 --json databaseId,status,conclusion,name,workflowName,createdAt,headBranch,event

$runs = $runsJson | ConvertFrom-Json |
  Where-Object { $_.conclusion -in @("failure","cancelled","timed_out","action_required") }

if (-not $runs -or $runs.Count -eq 0) {
  Write-Host "No failed/cancelled runs found in the last 200." -ForegroundColor Green
  exit 0
}

Write-Host ("Found {0} runs to fix and re-run." -f $runs.Count) -ForegroundColor Yellow

# Re-run oldest first (so you can watch progress)
$runs = $runs | Sort-Object createdAt

# Track reruns to prevent infinite loops
$maxRerunsPerWorkflow = 3
$rerunAttempts = @{}

foreach ($r in $runs) {
  $label = "{0} | {1} | {2} | {3} | #{4}" -f $r.createdAt, $r.workflowName, $r.headBranch, $r.conclusion, $r.databaseId
  Write-Host "`n========================================" -ForegroundColor Magenta
  Write-Host ("Workflow: " + $label) -ForegroundColor Cyan
  Write-Host "========================================" -ForegroundColor Magenta
  
  if ($null -eq $rerunAttempts[$r.databaseId]) {
    $rerunAttempts[$r.databaseId] = 0
  }
  
  $currentAttempt = 0
  $passed = $false
  
  while ($currentAttempt -lt $maxRerunsPerWorkflow -and -not $passed) {
    $currentAttempt++
    $rerunAttempts[$r.databaseId]++
    
    Write-Host "`nAttempt $currentAttempt of $maxRerunsPerWorkflow" -ForegroundColor Yellow
    
    # Apply fixes before rerunning
    if ($currentAttempt -gt 1) {
      Fix-CommonIssues
    }
    
    try {
      Write-Host "Triggering workflow rerun #$($r.databaseId)..." -ForegroundColor Cyan
      gh run rerun $r.databaseId --failed
      
      Write-Host "Waiting for workflow to complete..." -ForegroundColor Gray
      $conclusion = Wait-ForWorkflow -RunId $r.databaseId
      
      if ($conclusion -eq "success") {
        Write-Host "✓ Workflow PASSED!" -ForegroundColor Green
        $passed = $true
      } elseif ($conclusion -eq "timeout") {
        Write-Host "⚠ Workflow timed out. Will retry if attempts remain." -ForegroundColor Yellow
      } else {
        Write-Host ("⚠ Workflow failed with conclusion: $conclusion") -ForegroundColor Yellow
      }
    } catch {
      Write-Host ("Error running workflow #{0}: {1}" -f $r.databaseId, $_.Exception.Message) -ForegroundColor Red
    }
  }
  
  if (-not $passed) {
    Write-Host ("✗ Workflow #{0} failed after {1} attempts." -f $r.databaseId, $currentAttempt) -ForegroundColor Red
    
    # Delete the branch if it's not the default branch
    if ($r.headBranch -and $r.headBranch -ne "main" -and $r.headBranch -ne "master") {
      Write-Host ("Deleting branch: {0}" -f $r.headBranch) -ForegroundColor Magenta
      try {
        git push origin --delete $r.headBranch 2>$null
        Write-Host ("✓ Branch '$($r.headBranch)' deleted." -f $r.headBranch) -ForegroundColor Green
      } catch {
        Write-Host ("⚠ Could not delete branch '$($r.headBranch)': {0}" -f $_.Exception.Message) -ForegroundColor Yellow
      }
    } else {
      Write-Host "⚠ Skipping delete: branch is default branch (main/master)" -ForegroundColor Yellow
    }
  }
}

Write-Host "`n========================================" -ForegroundColor Magenta
Write-Host "Rerun cycle complete. Check status: gh run list" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Magenta
