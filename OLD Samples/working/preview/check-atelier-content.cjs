const {chromium}=require('D:/Playwright/PWTypescript/node_modules/playwright');
const fs=require('fs');
(async()=>{
 const browser=await chromium.launch({headless:true});
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const results=[];
 for(const width of [320,360,390,768,1024,1440]){
  await page.setViewportSize({width,height:1000});
  await page.goto('file:///'+__dirname.replaceAll('\\','/')+'/home-v2-atelier-content.html');
  results.push(await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,h1:document.querySelectorAll('h1').length,brokenFragments:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.querySelector(a.getAttribute('href'))).length})));
  await page.evaluate(async()=>{document.documentElement.style.scrollBehavior="auto";for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,60));}window.scrollTo(0,0)});await page.waitForTimeout(1200);if(width===1440||width===390)await page.screenshot({path:__dirname+`/atelier-content-${width}.png`,fullPage:true});
 }
 await page.setViewportSize({width:390,height:844});
 await page.locator('[data-menu-button]').click();
 const menuOpen=await page.locator('[data-menu-button]').getAttribute('aria-expanded');
 await page.keyboard.press('Escape');
 const menuClosed=await page.locator('[data-menu-button]').getAttribute('aria-expanded');
 await page.locator('summary').first().click();
 const faq=await page.locator('details').first().getAttribute('open');
 await page.close();
 const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});
 await nojs.goto('file:///'+__dirname.replaceAll('\\','/')+'/home-v2-atelier-content.html');
 const noJsMenu=await nojs.locator('#mobile-menu').isVisible();
 const report={results,errors,menuOpen,menuClosed,faqOpens:faq!==null,noJsMenu};
 fs.writeFileSync(__dirname+'/atelier-content-qa.json',JSON.stringify(report,null,2));console.log(report);
 await browser.close();
})();



