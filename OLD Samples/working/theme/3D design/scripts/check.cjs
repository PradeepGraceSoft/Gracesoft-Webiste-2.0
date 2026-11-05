// Local source checks only. This is not a HubSpot compiler or portal validation.
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const issues = [];
const warnings = [];
const evidence = [];
const rel = file => path.relative(root, file).split(path.sep).join('/');
const read = file => fs.readFileSync(file, 'utf8');
const assert = (test, message) => { if (!test) issues.push(message); };
function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? (['node_modules', '.cache', '.git'].includes(entry.name) ? [] : walk(file)) : [file];
  });
}
function parse(file) {
  try { const value = JSON.parse(read(file)); evidence.push({ file: rel(file), json: 'parsed' }); return value; }
  catch (error) { issues.push(`${rel(file)}: ${error.message}`); return null; }
}
const types = new Set(['text','richtext','url','link','image','group','boolean','number','choice','color','font','spacing','border','alignment','textalignment','backgroundimage','gradient','icon','menu','simplemenu','form','cta']);
function validateFields(fields, location) {
  assert(Array.isArray(fields), `${location}: field list must be an array`);
  if (!Array.isArray(fields)) return;
  const names = new Set();
  fields.forEach(field => {
    assert(typeof field.name === 'string' && !!field.name, `${location}: unnamed field`);
    assert(!names.has(field.name), `${location}: duplicate field ${field.name}`);
    names.add(field.name);
    assert(typeof field.label === 'string' && !!field.label, `${location}: ${field.name} lacks editor label`);
    assert(types.has(field.type), `${location}: review unsupported field type ${field.type}`);
    if (field.type === 'group') validateFields(field.children, `${location}.${field.name}`);
    if (field.type === 'image') assert(field.default && typeof field.default.alt === 'string', `${location}.${field.name}: image default requires alt text field`);
    if (field.type === 'url' && field.default?.href) assert(!/^javascript:/i.test(field.default.href), `${location}.${field.name}: unsafe URL`);
  });
}
const theme = parse(path.join(root, 'theme.json'));
if (theme) {
  assert(!!theme.label, 'theme.json: missing label');
  assert(typeof theme.preview_path === 'string' && fs.existsSync(path.resolve(root, theme.preview_path)), 'theme.json: preview_path does not resolve');
}
validateFields(parse(path.join(root, 'fields.json')), 'fields.json');
const modules = fs.readdirSync(path.join(root, 'modules')).filter(name => name.endsWith('.module'));
for (const name of modules) {
  const directory = path.join(root, 'modules', name);
  for (const file of ['meta.json', 'fields.json', 'module.html']) assert(fs.existsSync(path.join(directory, file)), `${name}: missing ${file}`);
  const meta = parse(path.join(directory, 'meta.json'));
  if (meta) {
    assert(meta.global === false, `${name}: expected isolated local module, not shared global content`);
    assert(meta.content_types?.includes('SITE_PAGE'), `${name}: missing SITE_PAGE content type`);
    assert(!!meta.label, `${name}: missing module label`);
  }
  const fields = parse(path.join(directory, 'fields.json'));
  validateFields(fields, name);
  if (!Array.isArray(fields)) continue;
  const html = read(path.join(directory, 'module.html'));
  const names = new Set(fields.map(field => field.name));
  const used = new Set([...html.matchAll(/\bmodule\.(\w+)/g)].map(match => match[1]));
  for (const field of used) assert(names.has(field), `${name}: references undefined field module.${field}`);
  for (const field of names) if (!used.has(field)) warnings.push(`${name}: editor field ${field} not directly referenced by module.html`);
  for (const match of html.matchAll(/{%\s*for\s+(\w+)\s+in\s+module\.(\w+)\s*%}([\s\S]*?){%\s*endfor\s*%}/g)) {
    const children = new Set(fields.find(field => field.name === match[2])?.children?.map(field => field.name) || []);
    for (const ref of match[3].matchAll(new RegExp(`\\b${match[1]}\\.(\\w+)`, 'g'))) assert(children.has(ref[1]), `${name}: undefined repeated field ${match[2]}.${ref[1]}`);
  }
  evidence.push({ module: name, editableFields: fields.length, referencedFields: used.size });
}
const files = walk(root);
for (const file of files.filter(file => /\.(html|css)$/.test(file) && !rel(file).startsWith('preview/'))) {
  const source = read(file);
  for (const match of source.matchAll(/get_asset_url\(['"]([^'"]+)['"]\)/g)) assert(fs.existsSync(path.resolve(path.dirname(file), match[1])), `${rel(file)}: asset does not resolve: ${match[1]}`);
  for (const match of source.matchAll(/\bpath=['"]([^'"]+)['"]/g)) if (match[1].startsWith('.')) assert(fs.existsSync(path.resolve(path.dirname(file), match[1])), `${rel(file)}: module path does not resolve: ${match[1]}`);
  for (const match of source.matchAll(/{%\s*(?:extends|include)\s+['"]([^'"]+)['"]/g)) assert(fs.existsSync(path.resolve(path.dirname(file), match[1])), `${rel(file)}: template does not resolve: ${match[1]}`);
}
const template = read(path.join(root, 'templates/home.html'));
assert(/templateType:\s*page/.test(template), 'Template lacks page annotation');
assert(/{%\s*dnd_area\b/.test(template), 'Template lacks an editable drag-and-drop area');
const layout = read(path.join(root, 'templates/layouts/base.html'));
for (const tag of ['standard_header_includes', 'standard_footer_includes']) assert(layout.includes(tag), `Layout missing ${tag}`);
assert(!/<title\b|rel=['"]canonical/i.test(layout), 'Shared layout must not hardcode title or canonical');
for (const file of files.filter(file => /\.(cjs|js)$/.test(file) && !rel(file).endsWith('scene.bundle.js'))) {
  const check = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  assert(check.status === 0, `${rel(file)}: JavaScript syntax failed: ${check.stderr || check.error || ''}`);
  evidence.push({ file: rel(file), syntax: check.status === 0 ? 'pass' : 'fail' });
}
const preview = path.join(root, 'preview/index.html');
assert(fs.existsSync(preview), 'Build preview before checking source');
if (fs.existsSync(preview)) {
  const html = read(preview);
  assert(!/\{[{%]/.test(html), 'Preview contains unresolved HubL');
  assert(/noindex/.test(html), 'Preview requires noindex protection');
  assert(!/<link[^>]*rel=['"]canonical['"]/i.test(html), 'Preview must not have production canonical');
  assert((html.match(/<h1\b/gi) || []).length === 1, 'Preview must contain one H1');
}
const report = { date: '2026-11-05', scope: 'Local source validation, not a HubSpot compiler', modules: modules.length, issues, warnings, evidence, passed: !issues.length };
fs.mkdirSync(path.join(root, 'docs'), { recursive: true });
fs.writeFileSync(path.join(root, 'docs/source-check.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ modules: modules.length, issues, warnings, passed: report.passed }, null, 2));
if (issues.length) process.exitCode = 1;
