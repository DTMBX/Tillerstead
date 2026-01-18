# Jekyll Includes Cleanup Plan

**Generated:** 2026-01-18 11:14:16

## Summary

- **Total files:** 73
- **Exact duplicate groups:** 2
- **Normalized duplicate groups:** 0
- **Same-name conflicts:** 10
- **Total redundant files:** 2
- **References to update:** 2

---

## 📌 Exact Duplicates

Byte-for-byte identical files that can be safely consolidated.

### Duplicate Group
- **Canonical:** `forms\contact-long.html` (score: 110)
- **Total files:** 2

**Redundant files:**
- `forms\contact.html` ✓ No references

### Duplicate Group
- **Canonical:** `schema-combined.js` (score: 120)
- **Total files:** 2

**Redundant files:**
- `schema\schema-combined.js` ⚠️ **2 reference(s)**
  - _layouts\default.html:6
  - _layouts\post.html:6

---

## 🔄 Normalized Duplicates

Same content after normalizing whitespace/line endings.

✅ No normalized duplicates found.

---

## ⚠️ Same Name, Different Paths

Files with the same name in different locations. **Manual review recommended.**

### Filename: `contact-long.html`
- **Suggested canonical:** `forms\contact-long.html` (score: 110)
- **All locations:**
  - `contact-long.html`
  - `forms\contact-long.html` ✅ (recommended)

### Filename: `contact-options.html`
- **Suggested canonical:** `contact-options.html` (score: 90)
- **All locations:**
  - `contact-options.html` ✅ (recommended)
  - `features\contact-options.html`

### Filename: `contact.html`
- **Suggested canonical:** `forms\contact.html` (score: 110)
- **All locations:**
  - `contact.html`
  - `forms\contact.html` ✅ (recommended)

### Filename: `head.html`
- **Suggested canonical:** `layout\head.html` (score: 120)
- **All locations:**
  - `head.html`
  - `layout\head.html` ✅ (recommended)

### Filename: `schema-combined.js`
- **Suggested canonical:** `schema-combined.js` (score: 120)
- **All locations:**
  - `schema-combined.js` ✅ (recommended)
  - `schema\schema-combined.js`

### Filename: `ts-peace-of-mind.html`
- **Suggested canonical:** `components\ts-peace-of-mind.html` (score: 130)
- **All locations:**
  - `ts-peace-of-mind.html`
  - `components\ts-peace-of-mind.html` ✅ (recommended)

### Filename: `ts-plans.html`
- **Suggested canonical:** `components\ts-plans.html` (score: 130)
- **All locations:**
  - `ts-plans.html`
  - `components\ts-plans.html` ✅ (recommended)
  - `content\ts-plans.html`

### Filename: `ts-portfolio.html`
- **Suggested canonical:** `components\ts-portfolio.html` (score: 130)
- **All locations:**
  - `ts-portfolio.html`
  - `components\ts-portfolio.html` ✅ (recommended)
  - `content\ts-portfolio.html`

### Filename: `ts-service-card.html`
- **Suggested canonical:** `components\ts-service-card.html` (score: 130)
- **All locations:**
  - `ts-service-card.html`
  - `components\ts-service-card.html` ✅ (recommended)

### Filename: `ts-services.html`
- **Suggested canonical:** `components\ts-services.html` (score: 130)
- **All locations:**
  - `ts-services.html`
  - `components\ts-services.html` ✅ (recommended)
  - `content\ts-services.html`
  - `sections\ts-services.html`

---

## 🎯 Next Steps

```powershell
# Preview actions
.\tools\includes-audit.ps1 -ArchiveRedundant -FixReferences -WhatIf

# Execute cleanup
.\tools\includes-audit.ps1 -ArchiveRedundant -FixReferences

# Test site
bundle exec jekyll build
bundle exec jekyll serve
```
