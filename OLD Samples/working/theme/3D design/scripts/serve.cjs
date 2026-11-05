const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const port = Number(process.env.PORT || 4313);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.ttf':'font/ttf','.json':'application/json'};
http.createServer((request, response) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); } catch { response.writeHead(400).end(); return; }
  const relative = pathname === '/' ? 'preview/index.html' : pathname.replace(/^\/+/, '');
  const target = path.resolve(root, relative);
  if (target !== root && !target.startsWith(root + path.sep)) { response.writeHead(403).end(); return; }
  if (!['GET','HEAD'].includes(request.method)) { response.writeHead(405).end(); return; }
  fs.stat(target, (error, stat) => {
    if (error || !stat.isFile()) { response.writeHead(404).end('Not found'); return; }
    response.writeHead(200, {'Content-Type':types[path.extname(target)] || 'application/octet-stream','Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow'});
    if (request.method === 'HEAD') response.end(); else fs.createReadStream(target).pipe(response);
  });
}).listen(port, '127.0.0.1', () => console.log(`Local design review: http://127.0.0.1:${port}/preview/index.html`));
