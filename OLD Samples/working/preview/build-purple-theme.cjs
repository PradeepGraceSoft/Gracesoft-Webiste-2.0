const fs = require('fs');
const path = require('path');

const theme = path.resolve(__dirname, '../theme/Purple Theme');
const publicPath = '../theme/Purple%20Theme/';
const read = file => fs.readFileSync(path.join(theme, file), 'utf8');
const escape = value => String(value ?? '').replace(/[&<>"']/g, character =>
  ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'})[character]);

const moduleStyles = new Set();
const moduleScripts = new Set();
function renderModule(relativePath) {
  const directory = path.normalize(path.join('templates', relativePath));
  for (const [filename, assets] of [['module.css', moduleStyles], ['module.js', moduleScripts]]) {
    if (fs.existsSync(path.join(theme, directory, filename))) {
      assets.add(publicPath + directory.split(path.sep).join('/') + '/' + filename);
    }
  }
  const fields = JSON.parse(read(path.join(directory, 'fields.json')));
  const defaults = Object.fromEntries(fields.map(field => [field.name, field.default]));
  return read(path.join(directory, 'module.html'))
    .replace(/\{\{ \(module\.(\w+)\.src or get_asset_url\('\.\.\/\.\.\/(assets\/[^']+)'\)\)\|escape_url \}\}/g,
      (_, name, fallback) => escape(defaults[name]?.src || publicPath + fallback))
    .replace(/\{\{ module\.(\w+)(?:\.(\w+))?(?:\|(\w+))? \}\}/g, (_, name, property, filter) => {
      const value = property ? defaults[name]?.[property] : defaults[name];
      return filter ? escape(value) : value;
    });
}

const template = read('templates/home-v2.html');
const match = template.match(/{% block body %}([\s\S]*?){% endblock body %}/);
if (!match) throw new Error('HubSpot template body block was not found');
const body = match[1]
  .replace(/{% dnd_module path="([^"]+)" %}/g, (_, modulePath) => renderModule(modulePath))
  .replace(/\{\{ get_asset_url\('\.\.\/(assets\/[\w.-]+)'\) \}\}/g, (_, asset) => publicPath + asset)
  .replace(/{% (?:end_)?dnd_[^%]*%}/g, '');
const layout = read('templates/layouts/base.html');
const staticPage = layout.replace('{{ html_lang }}', 'en')
  .replace('{{ standard_header_includes }}', '<title>Hotel Property Management Software | GraceSoft Easy InnKeeping</title>\n<meta name="description" content="Explore GraceSoft Easy InnKeeping for reservations, front desk operations, online bookings and guest communication. Request a demo.">\n<meta name="robots" content="noindex, nofollow">')
  .replace(/\{\{\s*require_css\(get_asset_url\("\.\.\/\.\.\/([^"]+)"\)\)\s*\}\}/g, (_, file) => '<link rel="stylesheet" href="' + publicPath + file + '">')
  .replace(/\{\{ require_js\(get_asset_url\("\.\.\/\.\.\/([^"]+)"\), "footer"\) \}\}/, '')
  .replace('{% block body %}{% endblock body %}', () => body)
  .replace('</head>', () => [...moduleStyles].map(url => '<link rel="stylesheet" href="' + url + '">').join('\n') + '\n</head>')
  .replace('{{ standard_footer_includes }}', () => [publicPath + 'js/homepage.js', ...moduleScripts]
    .map(url => '<script src="' + url + '"></script>').join('\n'));
if (/\{[{%]/.test(staticPage)) throw new Error('Unrendered HubL remains: ' + staticPage.match(/\{[{%].{0,140}/)[0]);
if ((staticPage.match(/<style\b/gi) || []).length !== (staticPage.match(/<\/style>/gi) || []).length) throw new Error('Unbalanced style tags in generated preview');
fs.writeFileSync(path.join(__dirname, 'purple-theme.html'), staticPage);
console.log('Built local Purple Theme preview: working/preview/purple-theme.html');
