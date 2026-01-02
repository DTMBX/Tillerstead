#!/usr/bin/env node
/**
 * Internal Linking Implementation Script
 * Adds strategic blog post links to Tillerstead pages
 */

const fs = require("fs");
const path = require("path");

const BLOG_URLS = {
  waterproofing: "/blog/waterproofing-redgard-vs-kerdi-vs-hydroban/",
  lft: "/blog/large-format-tile-flatness-mortars-trowels/",
  consultation: "/blog/nj-tile-bath-consultation-guide/",
  homeDepot: "/blog/home-depot-shower-systems-picks/",
};

function updateFile(filepath, replacements) {
  try {
    let content = fs.readFileSync(filepath, "utf-8");
    let updated = false;

    replacements.forEach(({ find, replace, name }) => {
      if (content.includes(find)) {
        content = content.replace(find, replace);
        console.log(`  ✅ Added: ${name}`);
        updated = true;
      } else {
        console.log(`  ⚠️  Could not find: ${name}`);
      }
    });

    if (updated) {
      fs.writeFileSync(filepath, content, "utf-8");
      console.log(`  📝 ${path.basename(filepath)} updated\n`);
    }
  } catch (err) {
    console.error(`  ❌ Error updating ${filepath}:`, err.message);
  }
}

console.log("🔗 Starting Internal Link Implementation...\n");

// Fix services.html waterproofing link (it wasn't added on first pass)
console.log("Fixing services.html waterproofing link...");
try {
  let content = fs.readFileSync("pages/services.html", "utf-8");

  // Try multiple variations of the text to find
  const variations = [
    {
      find: "detailed per the manufacturer's instructions and the specified method.\n        </li>\n\n        <li>\n          <strong>Pre-slope",
      name: "variation 1",
    },
    {
      find: "detailed per the manufacturer's instructions and the specified method.\n        </li>\n\n        <li>",
      name: "variation 2",
    },
    {
      find: "specified method.\n        </li>\n\n        <li>\n          <strong>Pre-slope",
      name: "variation 3",
    },
  ];

  let found = false;
  for (const variation of variations) {
    if (content.includes(variation.find)) {
      const replacement = variation.find.replace(
        "specified method.",
        'specified method. <a href="' +
          BLOG_URLS.waterproofing +
          '">Our detailed waterproofing comparison explains system selection and installation specifics.</a>',
      );
      content = content.replace(variation.find, replacement);
      fs.writeFileSync("pages/services.html", content, "utf-8");
      console.log("  ✅ Waterproofing link added (" + variation.name + ")\n");
      found = true;
      break;
    }
  }

  if (!found) {
    console.log("  ⚠️  Could not find waterproofing section\n");
  }
} catch (err) {
  console.error("  ❌ Error:", err.message, "\n");
}

console.log("✅ Internal linking implementation complete!\n");
console.log("📋 Summary:");
console.log("  ✅ services.html: 2 links (waterproofing + LFT)");
console.log("  ⚠️  Other files: Manual review recommended\n");
console.log("🎯 Next steps:");
console.log("  1. Verify all links in browser");
console.log("  2. Check anchor text reads naturally");
console.log("  3. Test for broken links");
console.log("  4. Deploy to production\n");
