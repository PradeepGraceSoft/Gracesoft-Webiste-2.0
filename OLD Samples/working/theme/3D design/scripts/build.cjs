const fs = require('node:fs');
const path = require('node:path');
const nunjucks = require('nunjucks');
const esbuild = require('esbuild');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const env = new nunjucks.Environment(null, { autoescape: false, throwOnUndefined: true });
const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
['escape_html','escape_attr','escape_url'].forEach(name => env.addFilter(name, escape));
env.addFilter('string', String);
const defaults = fields => Object.fromEntries(fields.map(field => [field.name, field.default ?? (field.children ? defaults(field.children) : '')]));
const localAsset = (from, relative) => '../' + path.relative(root, path.resolve(root, from, relative)).split(path.sep).map(encodeURIComponent).join('/');
function renderModule(modulePath) {
  const directory = path.normalize(path.join('templates', modulePath));
  const fields = JSON.parse(read(path.join(directory, 'fields.json')));
  return env.renderString(read(path.join(directory, 'module.html')), {
    module: defaults(fields), get_asset_url: relative => localAsset(directory, relative)
  });
}
async function build() {
  fs.mkdirSync(path.join(root, 'preview'), { recursive: true });
  await esbuild.build({ entryPoints: [path.join(root, 'src/scene.js')], bundle: true, outfile: path.join(root, 'js/scene.bundle.js'), format: 'iife', target: 'es2020', minify: true, legalComments: 'linked' });
  const source = read('templates/home.html');
  let body = source.match(/{% block body %}([\s\S]*?){% endblock body %}/)[1];
  body = body.replace(/{% (?:dnd_module|module\s+"[^"]+") path="([^"]+)"[^%]*%}/g, (_, file) => renderModule(file));
  body = body.replace(/{% (?:end_)?dnd_[^%]*%}/g, '');
  if (/\{[{%]/.test(body)) throw Error('Unresolved template syntax in preview: ' + body.match(/\{[{%].{0,100}/)[0]);
  const title = 'Hotel Property Management Software | GraceSoft Easy InnKeeping';
  const description = 'Explore GraceSoft Easy InnKeeping for hotel reservations, front desk operations, direct booking and guest communication. Book a personalized demo.';
  const html = `<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><meta name="description" content="${description}"><meta name="robots" content="noindex, nofollow"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:type" content="website"><link rel="stylesheet" href="../css/design.css"><link rel="stylesheet" href="./theme-tokens.css"><script src="../js/site.js" defer></script></head><body>${body}<aside class="preview-notice" aria-label="Local review status">LOCAL DESIGN REVIEW · Static approximation, not a HubSpot HubL render · Not deployed</aside></body></html>`;
  fs.writeFileSync(path.join(root, 'preview/index.html'), html);
  const theme = defaults(JSON.parse(read('fields.json')));
  fs.writeFileSync(path.join(root, 'preview/theme-tokens.css'), env.renderString(read('css/tokens.css'), { theme }));
  fs.copyFileSync(path.join(root, 'node_modules/three/LICENSE'), path.join(root, 'assets/Three-LICENSE.txt'));
  const gsapPackage = JSON.parse(read('node_modules/gsap/package.json'));
  fs.writeFileSync(path.join(root, 'assets/GSAP-LICENSE.txt'), `GSAP ${gsapPackage.version}\nCopyright 2008-2025, GreenSock. All rights reserved.\n${gsapPackage.license}\nThe original license notices are also retained in js/scene.bundle.js.LEGAL.txt.\n`);
  console.log('Built editable module defaults, local preview and bundled 3D scene. No upload.');
}
build().catch(error => { console.error(error); process.exitCode = 1; });
