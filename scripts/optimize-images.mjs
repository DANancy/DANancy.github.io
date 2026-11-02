// Writes web-sized WebP copies of heavy images to src/assets/optimized/. Originals are left untouched.
// Usage: node scripts/optimize-images.mjs
import path from "node:path";
import fs from "node:fs";
import sharp from "sharp";

const outputDir = path.resolve("src/assets/optimized");
const maxEdge = 1600; // large enough for the expanded-image lightbox

const sources = [
  "assets/chat_chil.png",
  "assets/book_club_1.jpg",
  "assets/book_club_2_23082026.jpg",
  "assets/workshop_feedback.png",
  "assets/ai_workshop.png",
  "assets/tiktok.jpg",
  "src/assets/donghua-fan-ren.png",
  "src/assets/donghua-mu-shen.png",
  "src/assets/donghua-jian-lai.jpg",
  "src/assets/donghua-guang-yin.jpg",
  "src/assets/map-practical-day-2026.jpg",
  "src/assets/hogwarts_legacy.png",
  "src/assets/it_takes_two.png",
  "src/assets/Split Fiction.png",
  "src/assets/friends/ken-chen.jpg",
];

// The orchard backdrop renders full-width on every page, so keep its width and trade a little quality for size.
const backdrop = { source: "src/assets/web/yangyang-backyard-orchard.webp", quality: 62 };

fs.mkdirSync(outputDir, { recursive: true });

async function write(source, quality, resize) {
  const name = path.basename(source).replace(/\.[^.]+$/, "").replace(/\s+/g, "-").toLowerCase() + ".webp";
  const target = path.join(outputDir, name);
  let pipeline = sharp(source).rotate();
  if (resize) pipeline = pipeline.resize({ width: maxEdge, height: maxEdge, fit: "inside", withoutEnlargement: true });
  await pipeline.webp({ quality }).toFile(target);
  const before = fs.statSync(source).size;
  const after = fs.statSync(target).size;
  console.log(`${String(Math.round(before / 1024)).padStart(5)} KB → ${String(Math.round(after / 1024)).padStart(4)} KB  ${path.relative(process.cwd(), target)}`);
}

for (const source of sources) await write(source, 80, true);
await write(backdrop.source, backdrop.quality, false);
