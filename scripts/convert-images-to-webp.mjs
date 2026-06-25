import sharp from "sharp";
import { readdir, unlink, readFile, writeFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");
const assetsDir = join(root, "src", "assets");
const srcDir = join(root, "src");

const PNG_QUALITY = 88;
const JPEG_QUALITY = 82;
const SKIP = new Set([
  "images/logo-office-image.png",
  "images/og-whatsapp.png",
  "favicon.png",
  "favicon-192.png",
  "apple-touch-icon.png",
  "payments/ideal.png",
  "payments/creditcard.png",
  "payments/bancontact.png",
]);

const RASTER_EXT = /\.(png|jpe?g)$/i;

async function walk(dir, files = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, files);
    else if (RASTER_EXT.test(entry.name)) files.push(full);
  }
  return files;
}

async function walkSource(dir, files = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walkSource(full, files);
    else if (/\.(ts|tsx)$/.test(entry.name)) files.push(full);
  }
  return files;
}

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(0)} KB`;
}

function shouldSkip(file, baseDir) {
  const rel = relative(baseDir, file).replace(/\\/g, "/");
  return SKIP.has(rel);
}

async function toWebp(input, isJpeg) {
  const qualities = isJpeg ? [JPEG_QUALITY, 75, 70] : [PNG_QUALITY];
  const { size: inputSize } = await stat(input);

  for (const quality of qualities) {
    const webp = await sharp(input).webp({ quality, effort: 4 }).toBuffer();
    if (!isJpeg || webp.length < inputSize) return { webp, quality, inputSize };
  }

  const webp = await sharp(input).webp({ quality: qualities.at(-1), effort: 4 }).toBuffer();
  return { webp, quality: qualities.at(-1), inputSize };
}

async function convertFile(input) {
  const isJpeg = /\.jpe?g$/i.test(input);
  const output = input.replace(RASTER_EXT, ".webp");
  const { webp, quality, inputSize } = await toWebp(input, isJpeg);

  await sharp(webp).toFile(output);

  try {
    await unlink(input);
  } catch (error) {
    if (error.code === "EBUSY") {
      console.warn(`! Could not delete ${relative(root, input)} (file locked) — remove manually`);
    } else {
      throw error;
    }
  }

  const note = isJpeg ? ` q${quality}` : "";
  return { inputSize, outputSize: webp.length, note };
}

const inputs = [
  ...(await walk(publicDir)).filter((f) => !shouldSkip(f, publicDir)),
  ...(await walk(assetsDir)),
];

let before = 0;
let after = 0;
const converted = [];

for (const input of inputs) {
  const rel = relative(root, input).replace(/\\/g, "/");
  const { inputSize, outputSize, note = "" } = await convertFile(input);
  before += inputSize;
  after += outputSize;
  converted.push(rel);
  console.log(`✓ ${rel} → ${formatKb(inputSize)} → ${formatKb(outputSize)}${note}`);
}

const skipSourcePaths = /\/images\/(?:logo-office-image|og-whatsapp)\./i;

for (const file of await walkSource(srcDir)) {
  const original = await readFile(file, "utf8");
  const updated = original
    .replace(/(\/images\/[^"']+)\.(png|jpe?g)/gi, (match, path) =>
      skipSourcePaths.test(match) ? match : `${path}.webp`,
    )
    .replace(/(@\/assets\/[^"']+)\.(png|jpe?g)/gi, "$1.webp");
  if (updated !== original) await writeFile(file, updated);
}

console.log("\n---");
console.log(`Converted: ${converted.length} files`);
if (converted.length) {
  console.log(`Before: ${(before / 1024 / 1024).toFixed(2)} MB`);
  console.log(`After:  ${(after / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Saved:  ${((1 - after / before) * 100).toFixed(0)}%`);
} else {
  console.log("No raster images left to convert.");
}
