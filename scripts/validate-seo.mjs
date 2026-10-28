import fs from "node:fs";
import path from "node:path";

const outputRoot = path.resolve("out");
const htmlFiles = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name === "index.html") htmlFiles.push(file);
  }
}

walk(outputRoot);
const missingLinks = [];
const invalidJsonLd = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  for (const match of html.matchAll(/href="(\/(?!\/|_next)[^"#?]*)/g)) {
    const href = match[1];
    if (/\.[a-z0-9]+$/i.test(href)) continue;
    const target = path.join(outputRoot, href.replace(/^\//, ""), "index.html");
    if (!fs.existsSync(target)) missingLinks.push({ page: path.relative(outputRoot, file), href });
  }
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      invalidJsonLd.push({ page: path.relative(outputRoot, file), error: String(error) });
    }
  }
}

const requiredFiles = ["robots.txt", "sitemap.xml", "llms.txt"];
const missingFiles = requiredFiles.filter((file) => !fs.existsSync(path.join(outputRoot, file)));

console.log(JSON.stringify({ htmlPages: htmlFiles.length, missingLinks, invalidJsonLd, missingFiles }, null, 2));
if (missingLinks.length || invalidJsonLd.length || missingFiles.length) process.exitCode = 1;
