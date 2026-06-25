import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");

const LOGO_PATH = join(publicDir, "images/logo-office-image.png");
const SIZE = 1200;
const LOGO_WIDTH = 920;

/** Square OG image — logo centered so WhatsApp square thumbnails stay readable. */
const backgroundSvg = `
<svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="50%" cy="46%" r="58%">
      <stop offset="0%" stop-color="#E07A32" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#111827" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${SIZE}" height="${SIZE}" fill="#111827"/>
  <rect width="${SIZE}" height="${SIZE}" fill="url(#glow)"/>
</svg>`;

const logo = await readFile(LOGO_PATH);
const logoPng = await sharp(logo)
  .resize(LOGO_WIDTH, null, { fit: "inside" })
  .png()
  .toBuffer();

const logoMeta = await sharp(logoPng).metadata();
const left = Math.round((SIZE - logoMeta.width) / 2);
const top = Math.round((SIZE - logoMeta.height) / 2);

const outPath = join(publicDir, "images/og-whatsapp.png");

await sharp(Buffer.from(backgroundSvg))
  .composite([{ input: logoPng, top, left }])
  .png({ compressionLevel: 9 })
  .toFile(outPath);

console.log(`Generated ${outPath} (${SIZE}×${SIZE}, logo from logo-office-image.png)`);
