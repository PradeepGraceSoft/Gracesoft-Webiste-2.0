const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

(async () => {
  const root = path.resolve(__dirname,'../..');
  const types = {'.ttf':'font/ttf','.svg':'image/svg+xml','.css':'text/css','.js':'text/javascript','.html':'text/html','.png':'image/png','.jpg':'image/jpeg'};
  const server = http.createServer((req,res) => {
    const target = path.resolve(root,'.' + decodeURIComponent(req.url.split('?')[0]));
    if (!target.startsWith(root+path.sep) || !types[path.extname(target)] || !fs.existsSync(target)) {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200,{'Content-Type':types[path.extname(target)]});
    fs.createReadStream(target).pipe(res);
  });
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  const browser = await chromium.launch();
  try {
    for (let run=1;run<=3;run++) {
      const page = await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
      await page.addInitScript(() => {
        window.sample = {lcp:0,cls:0};
        new PerformanceObserver(list => {
          for (const entry of list.getEntries()) window.sample.lcp = entry.startTime;
        }).observe({type:'largest-contentful-paint',buffered:true});
        new PerformanceObserver(list => {
          for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.sample.cls += entry.value;
        }).observe({type:'layout-shift',buffered:true});
      });
      await page.goto('http://127.0.0.1:'+server.address().port+'/preview/HTML6.html');
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(900);
      console.log(run,await page.evaluate(() => window.sample));
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
})().catch(error => {console.error(error);process.exitCode=1;});
