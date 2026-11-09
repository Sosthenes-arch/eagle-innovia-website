// Generates the transparent logo badge, favicons, PWA icons and the default OG image
// from src/assets/logo-source.jpg. Run with `pnpm assets` after replacing the source logo.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = 'src/assets/logo-source.jpg';
const meta = await sharp(SRC).metadata();
const size = Math.min(meta.width, meta.height);

// Circular mask removes the black corners around the round badge.
const mask = Buffer.from(
  `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 2}" fill="#fff"/></svg>`,
);
const badge = await sharp(SRC)
  .resize(size, size)
  .ensureAlpha()
  .composite([{ input: mask, blend: 'dest-in' }])
  .png()
  .toBuffer();

await mkdir('public/images', { recursive: true });

const out = (w, file, bg) => {
  let img = sharp(badge).resize(w, w);
  if (bg) img = img.flatten({ background: bg });
  return img.png({ compressionLevel: 9 }).toFile(file);
};

await out(512, 'src/assets/logo-badge.png');
await out(512, 'public/images/logo.png');
await out(48, 'public/favicon-48.png');
await out(32, 'public/favicon-32.png');
await out(180, 'public/apple-touch-icon.png', '#0D1B1E');
await out(192, 'public/icon-192.png', '#0D1B1E');
await out(512, 'public/icon-512.png', '#0D1B1E');

// 1200x630 default Open Graph image in brand colours.
const og = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0D1B1E"/>
      <stop offset="1" stop-color="#0B4F4C"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="610" width="1200" height="20" fill="#A8D400"/>
  <text x="520" y="250" font-family="Georgia, 'Times New Roman', serif" font-size="64" font-weight="700" fill="#FFFFFF" letter-spacing="2">EAGLE INNOVIA</text>
  <text x="520" y="310" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#A8D400" letter-spacing="4">HEALTH • TECHNOLOGY • EDUCATION</text>
  <text x="520" y="390" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#E6EFEC">Cloud, healthcare and education solutions</text>
  <text x="520" y="432" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#E6EFEC">— built in Abuja, delivered worldwide.</text>
</svg>`);
const badgeOg = await sharp(badge).resize(380, 380).toBuffer();
await sharp(og)
  .composite([{ input: badgeOg, left: 90, top: 125 }])
  .png({ compressionLevel: 9 })
  .toFile('public/images/og-default.png');

console.log('Assets generated.');
