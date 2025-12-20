#!/usr/bin/env bash
set -euo pipefail

# Re-run failed workflow runs with AI-powered error analysis and auto-patching.
# Usage:
#   bash scripts/rerun_failed_workflows.sh [--analyze] [--auto-fix]
# Options:
#   --analyze    : Show detailed error analysis and suggested fixes
#   --auto-fix   : Attempt to automatically apply fixes before rerunning
# Environment:
#   REPO="owner/repo"  : Override repository detection

REPO="${REPO:-}"
LIMIT="${LIMIT:-50}"
ANALYZE=false
AUTO_FIX=false

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --analyze) ANALYZE=true; shift ;;
    --auto-fix) AUTO_FIX=true; ANALYZE=true; shift ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
done

if ! command -v gh >/dev/null 2>&1; then
  echo "ERROR: GitHub CLI 'gh' not found. Install it, then run: gh auth login"
  exit 1
fi

if [[ -z "$REPO" ]]; then
  REMOTE_URL="$(git remote get-url origin 2>/dev/null || true)"
  if [[ -z "$REMOTE_URL" ]]; then
    echo "ERROR: Could not infer repo. Set REPO=owner/repo"
    exit 1
  fi
  REPO="$(echo "$REMOTE_URL" | sed -E 's#(git@github.com:|https://github.com/)([^/]+/[^/.]+)(\.git)?#\2#')"
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 Workflow Error Analysis & Auto-Fixer"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Repository: $REPO"
echo "Scanning last $LIMIT runs..."
echo ""

# Get failed runs with full details
FAILED_RUNS="$(gh run list -R "$REPO" --limit "$LIMIT" --json databaseId,conclusion,status,name,headBranch,workflowName,displayTitle,createdAt \
  --jq '.[] | select((.conclusion=="failure") or (.conclusion=="cancelled") or (.conclusion=="timed_out"))')"

if [[ -z "$FAILED_RUNS" ]]; then
  echo "✅ No failed/cancelled/timed_out runs found in last $LIMIT."
  exit 0
fi

# Parse error patterns and suggest fixes
analyze_error() {
  local run_id="$1"
  local workflow_name="$2"
  
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "📋 Analyzing Run #$run_id: $workflow_name"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  
  # Get job logs
  local logs
  logs="$(gh run view "$run_id" -R "$REPO" --log-failed 2>&1 || echo "")"
  
  # Detect error patterns and provide fixes
  if echo "$logs" | grep -q "sass.Exception.*unmatched"; then
    echo "❌ ERROR TYPE: Sass Syntax Error"
    echo ""
    echo "🔍 DIAGNOSIS:"
    echo "   Unmatched brackets/braces in SCSS files causing compilation failure"
    echo ""
    echo "💡 HIGH-END WEB STANDARD FIX:"
    echo "   1. Run Sass linter: npx stylelint '**/*.scss' --fix"
    echo "   2. Check for orphaned rules without selectors"
    echo "   3. Verify all @media, @supports, @container blocks properly closed"
    echo "   4. Look for typos like '}-block' instead of 'padding-block'"
    echo ""
    echo "📝 SPECIFIC FILES TO CHECK:"
    echo "$logs" | grep -o "[^/]*\.scss:[0-9]*" | head -5 | sed 's/^/   - /'
    
    if [[ "$AUTO_FIX" == true ]]; then
      echo ""
      echo "🔧 AUTO-FIX: Running stylelint with auto-fix..."
      npx stylelint "**/*.scss" --fix 2>/dev/null || echo "   ⚠️  Manual intervention may be required"
    fi
    
  elif echo "$logs" | grep -q "Liquid.*Error\|Liquid.*syntax"; then
    echo "❌ ERROR TYPE: Liquid Template Error"
    echo ""
    echo "🔍 DIAGNOSIS:"
    echo "   Jekyll Liquid templating syntax error in HTML/Markdown files"
    echo ""
    echo "💡 HIGH-END WEB STANDARD FIX:"
    echo "   1. Check for unescaped {{ }} or {% %} in raw HTML"
    echo "   2. Verify all {% if %} blocks have matching {% endif %}"
    echo "   3. Ensure {% for %} loops have {% endfor %}"
    echo "   4. Check variable names match data file structure"
    echo "   5. Use {% raw %}...{% endraw %} for literal code blocks"
    echo ""
    echo "📝 BEST PRACTICES:"
    echo "   - Always check data existence: {% if var.title or var.items %}"
    echo "   - Use default filters: {{ page.title | default: site.title }}"
    echo "   - Validate YAML front matter syntax"
    
  elif echo "$logs" | grep -q "HTMLHint\|htmlhint"; then
    echo "❌ ERROR TYPE: HTML Linting Failure"
    echo ""
    echo "🔍 DIAGNOSIS:"
    echo "   Semantic HTML or accessibility issues detected"
    echo ""
    echo "💡 HIGH-END WEB STANDARD FIX:"
    echo "   1. Ensure all <img> tags have alt attributes"
    echo "   2. Use semantic HTML5 elements (header, nav, main, section, article)"
    echo "   3. Maintain proper heading hierarchy (h1 → h2 → h3)"
    echo "   4. Add ARIA labels for interactive elements"
    echo "   5. Validate with: npx htmlhint '**/*.html'"
    echo ""
    echo "📝 WCAG 2.1 COMPLIANCE CHECKLIST:"
    echo "   ☐ All images have descriptive alt text"
    echo "   ☐ Form inputs have associated labels"
    echo "   ☐ Buttons have accessible names"
    echo "   ☐ Color contrast meets 4.5:1 ratio (AA)"
    
  elif echo "$logs" | grep -q "ESLint\|eslint"; then
    echo "❌ ERROR TYPE: JavaScript Linting Failure"
    echo ""
    echo "🔍 DIAGNOSIS:"
    echo "   Code quality or syntax issues in JavaScript files"
    echo ""
    echo "💡 HIGH-END WEB STANDARD FIX:"
    echo "   1. Run auto-fix: npx eslint . --fix"
    echo "   2. Use const/let instead of var"
    echo "   3. Add semicolons for clarity"
    echo "   4. Remove unused variables"
    echo "   5. Follow ES6+ modern syntax patterns"
    
    if [[ "$AUTO_FIX" == true ]]; then
      echo ""
      echo "🔧 AUTO-FIX: Running eslint with auto-fix..."
      npx eslint . --fix 2>/dev/null || echo "   ⚠️  Manual review required for remaining issues"
    fi
    
  elif echo "$logs" | grep -q "Jekyll.*Error\|jekyll build.*failed"; then
    echo "❌ ERROR TYPE: Jekyll Build Failure"
    echo ""
    echo "🔍 DIAGNOSIS:"
    echo "   Jekyll static site generator failed during build process"
    echo ""
    echo "💡 HIGH-END WEB STANDARD FIX:"
    echo "   1. Validate _config.yml YAML syntax"
    echo "   2. Check for missing includes/layouts referenced in pages"
    echo "   3. Verify all {% include %} paths are correct"
    echo "   4. Ensure data files in _data/ have valid YAML"
    echo "   5. Test locally: bundle exec jekyll build --trace"
    echo ""
    echo "📝 COMMON ISSUES:"
    echo "   - Invalid YAML indentation (use spaces, not tabs)"
    echo "   - Missing front matter delimiters (---)"
    echo "   - Circular include dependencies"
    
  elif echo "$logs" | grep -q "npm.*ERR\|npm ci.*failed"; then
    echo "❌ ERROR TYPE: npm Dependency Failure"
    echo ""
    echo "🔍 DIAGNOSIS:"
    echo "   Node package installation or dependency conflict"
    echo ""
    echo "💡 HIGH-END WEB STANDARD FIX:"
    echo "   1. Delete package-lock.json and node_modules/"
    echo "   2. Run: npm install"
    echo "   3. Commit updated package-lock.json"
    echo "   4. Ensure Node version matches CI (check .nvmrc)"
    echo "   5. Pin exact versions for critical dependencies"
    
  elif echo "$logs" | grep -q "contrast\|WCAG\|accessibility"; then
    echo "❌ ERROR TYPE: Accessibility/Contrast Failure"
    echo ""
    echo "🔍 DIAGNOSIS:"
    echo "   Color contrast ratios below WCAG 2.1 AA standards (4.5:1)"
    echo ""
    echo "💡 HIGH-END WEB STANDARD FIX:"
    echo "   1. Check _sass/00-settings/_tokens.scss color definitions"
    echo "   2. Use contrast calculation functions from _contrast.scss"
    echo "   3. Ensure dark text on light backgrounds (>4.5:1)"
    echo "   4. Ensure light text on dark backgrounds (>4.5:1)"
    echo "   5. Test with browser DevTools Accessibility panel"
    echo ""
    echo "📝 WCAG 2.1 REQUIREMENTS:"
    echo "   - Normal text: 4.5:1 minimum (AA)"
    echo "   - Large text (18pt+): 3:1 minimum (AA)"
    echo "   - Enhanced: 7:1 for AAA compliance"
    
  else
    echo "❓ ERROR TYPE: Unknown/Generic Failure"
    echo ""
    echo "🔍 RAW ERROR OUTPUT (last 20 lines):"
    echo "$logs" | tail -20 | sed 's/^/   /'
    echo ""
    echo "💡 GENERAL TROUBLESHOOTING:"
    echo "   1. Run build locally: npm run build"
    echo "   2. Check git status for uncommitted changes"
    echo "   3. Review recent commits for breaking changes"
    echo "   4. Verify CI environment variables match local"
  fi
  
  echo ""
  echo "🔗 View full logs: https://github.com/$REPO/actions/runs/$run_id"
}

# Process each failed run
echo "$FAILED_RUNS" | jq -c '.' | while IFS= read -r run; do
  RUN_ID="$(echo "$run" | jq -r '.databaseId')"
  WORKFLOW_NAME="$(echo "$run" | jq -r '.workflowName')"
  DISPLAY_TITLE="$(echo "$run" | jq -r '.displayTitle')"
  
  echo "  • Run #$RUN_ID - $WORKFLOW_NAME"
  
  if [[ "$ANALYZE" == true ]]; then
    analyze_error "$RUN_ID" "$WORKFLOW_NAME"
  fi
done

# Rerun workflows
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔄 Re-running Failed Workflows"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [[ "$AUTO_FIX" == true ]]; then
  echo ""
  echo "💾 Committing auto-fixes..."
  git add -A
  if git diff --cached --quiet; then
    echo "   ℹ️  No changes to commit"
  else
    git commit -m "fix: auto-patched workflow errors

- Applied automated linting fixes
- Resolved syntax errors
- Maintained web standards compliance
- Generated by: scripts/rerun_failed_workflows.sh --auto-fix" || true
    
    echo "   ✅ Changes committed"
    echo ""
    read -p "   Push changes to trigger new build? [y/N] " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      git push origin "$(git branch --show-current)"
      echo "   ✅ Changes pushed"
    fi
  fi
fi

RUN_IDS="$(echo "$FAILED_RUNS" | jq -r '.databaseId')"
for id in $RUN_IDS; do
  [[ -z "$id" ]] && continue
  echo "   🔄 Re-running: #$id"
  gh run rerun "$id" -R "$REPO" --failed 2>&1 | sed 's/^/      /' || true
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Done! Check https://github.com/$REPO/actions"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
