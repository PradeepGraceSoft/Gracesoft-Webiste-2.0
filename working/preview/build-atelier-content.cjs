const fs = require('fs');
const path = require('path');

const theme = path.resolve(__dirname, '../theme/Atelier Theme');
const publicPath = '../theme/Atelier%20Theme/';
const logoPath = path.join(__dirname, 'gracesoft-logo-approved.png');
const themeLogoPath = path.join(theme, 'assets/gracesoft-logo-approved.png');
if (fs.existsSync(logoPath) && !fs.existsSync(themeLogoPath)) fs.copyFileSync(logoPath, themeLogoPath);
const read = file => fs.readFileSync(path.join(theme, file), 'utf8');
const escape = value => String(value ?? '').replace(/[&<>"']/g, character =>
  ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'})[character]);

// Render this theme's default field expressions for local review.
function renderModule(relativePath) {
  const directory = path.normalize(path.join('templates', relativePath));
  const fields = JSON.parse(read(path.join(directory, 'fields.json')));
  const defaults = Object.fromEntries(fields.map(field => [field.name, field.default]));
  return read(path.join(directory, 'module.html'))
    .replace(/\{\{ \(module\.(\w+)\.src or get_asset_url\('\.\.\/\.\.\/(assets\/[^']+)'\)\)\|escape_url \}\}/g,
      (_, name, fallback) => escape(defaults[name].src || publicPath + fallback))
    .replace(/\{\{ module\.(\w+)(?:\.(\w+))?(?:\|(\w+))? \}\}/g, (_, name, property, filter) => {
      const value = property ? defaults[name][property] : defaults[name];
      return filter ? escape(value) : value;
    });
}

const template = read('templates/home-v2.html');
const body = template.match(/{% block body %}([\s\S]*?){% endblock body %}/)[1]
  .replace(/{% dnd_module path="([^"]+)" %}/g, (_, modulePath) => renderModule(modulePath))
  .replace(/\{\{ get_asset_url\('\.\.\/(assets\/[\w.-]+)'\) \}\}/g, (_, asset) => publicPath + asset)
  .replace(/{% (?:end_)?dnd_[^%]*%}/g, '');
const layout = read('templates/layouts/base.html');
const staticPage = layout.replace('{{ html_lang }}', 'en')
  .replace('{{ standard_header_includes }}', '<title>Hospitality Management Software | GraceSoft Easy InnKeeping</title>\n<meta name="description" content="Explore GraceSoft Easy InnKeeping for hospitality property management, direct bookings, guest communication and AI voice and chat tools. Request a demo.">\n<meta name="robots" content="noindex, nofollow">')
  .replace(/\{\{\s*require_css\(get_asset_url\("\.\.\/\.\.\/([^"]+)"\)\)\s*\}\}/g, (_, file) => '<link rel="stylesheet" href="' + publicPath + file + '">')
  .replace(/\{\{ require_js\(get_asset_url\("\.\.\/\.\.\/([^"]+)"\), "footer"\) \}\}/, '')
  .replace('{% block body %}{% endblock body %}', () => body)
  .replace('{{ standard_footer_includes }}', '<script src="' + publicPath + 'js/homepage.js"></script>');
if (/\{[{%]/.test(staticPage)) throw Error(staticPage.match(/\{[{%].{0,140}/)[0]);
fs.writeFileSync(path.join(__dirname, 'home-v2-atelier-content.html'), staticPage);


