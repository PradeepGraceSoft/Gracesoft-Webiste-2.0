const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const preview = path.resolve(__dirname, '..');
const url = name => pathToFileURL(path.join(preview,name + '.html')).href;
const pages = ['home-v2-atelier-content','Atelier_HTML2','Atelier_HTML3','Atelier_HTML4','Atelier_HTML5','HTML6'];

async function inventory(page) {
  return page.evaluate(() => ({
    links: [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')),
    headings: [...document.querySelectorAll('h1,h2,h3')].map(e => e.textContent.replace(/\s/g,'')),
    paragraphs: [...document.querySelectorAll('main p,main blockquote,main figcaption')].map(e => e.textContent.trim()),
    images: [...document.images].map(e => e.getAttribute('src'))
  }));
}
(async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
    const errors = [];
    page.on('pageerror',e => errors.push(e.message));
    page.on('requestfailed',req => {
      const reason = req.failure()?.errorText;
      if (reason !== 'net::ERR_ABORTED') errors.push([req.url(),reason]);
    });
    const comparison = [];
    let original;
    for (const name of pages) {
      await page.goto(url(name));
      await page.evaluate(() => document.fonts.ready);
      if (!original) original = await inventory(page);
      comparison.push(await page.evaluate(name => ({name,heroHeight:document.querySelector('main>section').clientHeight,sections:document.querySelectorAll('main>section').length,cssFiles:document.querySelectorAll('link[rel=stylesheet]').length}),name));
    }
    const sample = await inventory(page);
    const missing = (a,b) => [...new Set(a)].filter(v => !b.includes(v));
    assert.deepEqual(missing(original.links,sample.links),[]);
    assert.deepEqual(missing(original.headings,sample.headings),[]);
    assert.deepEqual(missing(original.images,sample.images),[]);
    const changedParagraphs = missing(original.paragraphs,sample.paragraphs);
    assert.deepEqual(changedParagraphs,[]);
    await page.evaluate(() => Promise.all([...new Set([...document.images].map(i => i.src))].map(src => { const image = new Image(); image.src = src; return image.decode(); })));
    const images = [];
    for (const [width,height] of [[1920,1080],[1440,900],[1024,768],[820,1180],[390,844],[320,690],[844,390]]) {
      await page.setViewportSize({width,height});
      await page.goto(url('HTML6'));
      await page.evaluate(() => document.fonts.ready);
      const layout = await page.evaluate(() => ({
        overflow:document.documentElement.scrollWidth-innerWidth,
        h1:document.querySelectorAll('h1').length,
        broken:[...document.querySelectorAll('a[href^="#"]')].filter(a => !document.getElementById(a.hash.slice(1))).length,
        unnamed:[...document.querySelectorAll('button,a[href]')].filter(e => !(e.textContent.trim() || e.getAttribute('aria-label') || e.querySelector('img[alt]'))).length
      }));
      assert.deepEqual(layout,{overflow:0,h1:1,broken:0,unnamed:0},String(width));
      if(width===1440 || width===390) await page.screenshot({path:path.join(__dirname,'review-'+width+'.jpg'),quality:83});
      await page.getByRole('button',{name:'Dashboard',exact:true}).click();
      await page.locator('#view-dashboard img').evaluate(i => i.decode());
      assert.match(await page.locator('.inspect-screen').getAttribute('href'),/dashboard.png$/);
      await page.getByRole('button',{name:'Calendar',exact:true}).click();
      await page.locator('#view-calendar img').evaluate(i => i.decode());
      await page.getByRole('button',{name:'Property',exact:true}).click();
      await page.locator('.pin-front').click();
      assert.equal(new URL(page.url()).hash,'#manage-operations');
      for (const widget of await page.locator('[data-tour]').all()) {
        const tabs = widget.getByRole('tab');
        for(let i=0;i<await tabs.count();i++) {
          await tabs.nth(i).click();
          assert.equal(await widget.getByRole('tabpanel').count(),1);
          await widget.getByRole('tabpanel').locator('img').evaluate(i => i.decode());
        }
        await tabs.last().press('Home');
        assert.equal(await tabs.first().getAttribute('aria-selected'),'true');
      }
      if(width===390) {
        await page.locator('[data-menu-button]').click();
        assert.equal(await page.locator('[data-menu-button]').getAttribute('aria-expanded'),'true');
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('[data-menu-button]').getAttribute('aria-expanded'),'false');
      }
      await page.locator('.gs-faq summary').first().click();
      assert.equal(await page.locator('.gs-faq details').first().getAttribute('open'),'');
      if(width===1440) {
        for(const section of await page.locator('main>section, footer').all()) {
          await section.scrollIntoViewIfNeeded();
          const top = await section.evaluate(s => s.getBoundingClientRect().top + scrollY - 68);
          await page.evaluate(top => scrollTo(0,top),top);
          images.push(await page.screenshot({type:'jpeg',quality:62}));
        }
      }
    }
    await page.setViewportSize({width:1200,height:1160});
    await page.setContent('<style>body{margin:0;display:grid;grid-template-columns:repeat(3,1fr);gap:3px}img{display:block;width:100%}</style>'+images.map(buf=>'<img src="data:image/jpeg;base64,'+buf.toString('base64')+'">').join(''));
    await page.screenshot({path:path.join(__dirname,'review-sections.jpg'),quality:80});
    await page.emulateMedia({reducedMotion:'no-preference'});
    await page.goto(url('HTML6'));
    await page.locator('.voice-card').first().scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector('.voice-card').classList.contains('arrives'));
    const fallback = await browser.newPage({javaScriptEnabled:false,viewport:{width:320,height:700}});
    await fallback.goto(url('HTML6'));
    assert.equal(await fallback.locator('[data-tour-panel]:visible').count(),14);
    assert.equal(await fallback.locator('.atelier-navigation a:visible').count()>0,true);
    assert.deepEqual(errors,[]);
    console.table(comparison);
    console.log('PASS: responsive layouts, original destinations/headings/assets, product screens, 14 walkthrough panels, keyboard tabs, chapters, mobile menu, FAQ, motion and no-JS fallback.');
  } finally {await browser.close();}
})().catch(error => {console.error(error);process.exitCode=1;});
