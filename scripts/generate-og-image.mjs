import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");

const WIDTH = 1200;
const HEIGHT = 630;

const overlaySvg = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="left" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#111827" stop-opacity="1"/>
      <stop offset="62%" stop-color="#111827" stop-opacity="0.98"/>
      <stop offset="100%" stop-color="#111827" stop-opacity="0.55"/>
    </linearGradient>
    <linearGradient id="glow" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#E07A32" stop-opacity="0.22"/>
      <stop offset="55%" stop-color="#E07A32" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#left)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>
  <rect x="72" y="548" width="96" height="4" rx="2" fill="#E07A32"/>
  <text x="72" y="392" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="700" fill="#F8F7F4">
    Hoogwaardige kantoormeubelen
  </text>
  <text x="72" y="446" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#F8F7F4" opacity="0.82">
    Directiemeubelen · Werkplekken · Archiefkasten
  </text>
  <text x="72" y="500" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#F0A060" letter-spacing="2.5">
    SHOWROOM ROTTERDAM · 6 DAGEN OPEN · 4,9 GOOGLE
  </text>
</svg>`;

const [showroom, logo] = await Promise.all([
  readFile(join(publicDir, "images/showroom/showroom-hero.png")),
  readFile(join(publicDir, "images/logo-office-image.png")),
]);

const background = await sharp(showroom)
  .resize(WIDTH, HEIGHT, { fit: "cover", position: "right" })
  .jpeg({ quality: 88 })
  .toBuffer();

const logoPng = await sharp(logo)
  .resize(420, null, { fit: "inside" })
  .png()
  .toBuffer();

await sharp(background)
  .composite([
    { input: Buffer.from(overlaySvg), top: 0, left: 0 },
    { input: logoPng, top: 118, left: 72 },
  ])
  .jpeg({ quality: 92, mozjpeg: true })
  .toFile(join(publicDir, "og-image.jpg"));

console.log("Generated public/og-image.jpg (1200×630)");
