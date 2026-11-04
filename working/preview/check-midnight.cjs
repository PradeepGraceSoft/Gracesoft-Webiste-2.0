const {chromium}=require('D:/Playwright/PWTypescript/node_modules/playwright');
const fs=require('fs');
(async()=>{
 const browser=await chromium.launch({headless:true});
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const results=[];
 for(const width of [320,360,390,768,1024,1440]){
  await page.setViewportSize({width,height:1000});
  await page.goto('file:///'+__dirname.replaceAll('\\','/')+'/home-v2-midnight.html');
  results.push(await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,h1:document.querySelectorAll('h1').length,brokenFragments:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.querySelector(a.getAttribute('href'))).length})));
  if(width===1440||width===390)await page.screenshot({path:__dirname+`/midnight-${width}.png`,fullPage:true});
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
 await nojs.goto('file:///'+__dirname.replaceAll('\\','/')+'/home-v2-midnight.html');
 const noJsMenu=await nojs.locator('#mobile-menu').isVisible();
 const report={results,errors,menuOpen,menuClosed,faqOpens:faq!==null,noJsMenu};
 fs.writeFileSync(__dirname+'/midnight-qa.json',JSON.stringify(report,null,2));console.log(report);
 await browser.close();
})();
