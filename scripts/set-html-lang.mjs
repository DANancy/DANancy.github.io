// The shared root layout renders <html lang="en">; static Chinese pages need the correct document language for crawlers.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve("out/zh-hans");
let updated = 0;

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name.endsWith(".html")) {
      const html = fs.readFileSync(file, "utf8");
      const next = html.replace(/<html([^>]*?)\slang="en"/, '<html$1 lang="zh-Hans"');
      if (next !== html) {
        fs.writeFileSync(file, next);
        updated += 1;
      }
    }
  }
}

if (fs.existsSync(root)) walk(root);
console.log(`set-html-lang: ${updated} Chinese page(s) set to lang="zh-Hans"`);
