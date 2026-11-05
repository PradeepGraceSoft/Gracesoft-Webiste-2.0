// Rebuild responsive derivatives from the preserved source images.
const sharp = require('sharp');
const path = require('node:path');
const root = path.resolve(__dirname, '..', 'assets');
(async () => {
  for (const name of ['blog-bnb.jpg', 'blog-ranch.jpg', 'blog-reservations.png']) {
    const base = name.replace(/\.[^.]+$/, '');
    for (const width of [480, 720]) {
      await sharp(path.join(root, name)).resize({ width, withoutEnlargement: true }).webp({ quality: width === 720 ? 78 : 76 }).toFile(path.join(root, base + (width === 480 ? '-480' : '') + '.webp'));
    }
  }
  console.log('Created 480/720px WebP article derivatives. Original source images preserved.');
})().catch(error => { console.error(error); process.exitCode = 1; });
