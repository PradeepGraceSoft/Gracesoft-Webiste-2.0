const {chromium}=require('D:/Playwright/PWTypescript/node_modules/playwright');
const fs=require('fs');const path=require('path');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const url='file:///'+path.join(__dirname,'home-v2-atelier-content.html').replaceAll('\\','/');
 const report={date:'2026-11-05',viewports:[],states:[],errors};
 for(const width of [320,390,768,1024,1440]){
  await page.setViewportSize({width,height:1000});await page.goto(url);await page.evaluate(()=>document.fonts.ready);
  await page.evaluate(async()=>{document.documentElement.style.scrollBehavior='auto';for(let y=0;y<document.body.scrollHeight;y+=800){scrollTo(0,y);await new Promise(r=>setTimeout(r,40));}scrollTo(0,0)});
  await page.waitForTimeout(700);
  await page.addScriptTag({path:path.resolve(__dirname,'../theme/3D design/node_modules/axe-core/axe.min.js')});
  const contrast=await page.evaluate(async()=>(await axe.run(document,{runOnly:['color-contrast']})).violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)})));
  report.viewports.push({width,...await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,h1:document.querySelectorAll('h1').length})),contrast});
  if(width===390||width===1440)await page.screenshot({path:path.join(__dirname,`atelier-premium-${width}.png`),fullPage:true});
 }
 const selectors=['.atelier-demo','.atelier-trial','.gs-hero .gs-button--primary','.gs-hero .gs-button--secondary','.voice-links a:first-child','.voice-links a:last-child','.desk-bar nav a:last-child','#final-demo .gs-button','.tour-controls button[aria-selected=true]','.tour-controls button[aria-selected=false]','.tour-link','.reading-all'];
 for(const selector of selectors){const element=page.locator(selector).first();if(!await element.count())continue;await element.scrollIntoViewIfNeeded();const colors=()=>element.evaluate(e=>({color:getComputedStyle(e).color,background:getComputedStyle(e).backgroundColor,border:getComputedStyle(e).borderColor}));await page.mouse.move(0,0);const normal=await colors();await element.hover();await page.waitForTimeout(250);const hover=await colors();await element.focus();const focus=await element.evaluate(e=>({outline:getComputedStyle(e).outlineStyle,color:getComputedStyle(e).outlineColor}));report.states.push({selector,normal,hover,focus});}
 for(const section of ['manage-operations','sell-direct','guest-assistant']){const tabs=page.locator('#'+section+' [role=tab]');for(let i=0;i<await tabs.count();i++){await tabs.nth(i).click();}report.states.push({section,tabsExercised:await tabs.count()});}
 await page.locator('#faq details').evaluateAll(xs=>xs.forEach(x=>x.open=true));await page.locator('.footer-groups details').evaluateAll(xs=>xs.forEach(x=>x.open=true));
 await page.waitForTimeout(700);
 report.expandedContrast=await page.evaluate(async()=>(await axe.run(document,{runOnly:['color-contrast']})).violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)})));
 await page.setViewportSize({width:390,height:844});await page.locator('[data-menu-button]').click();report.mobileMenuOpen=await page.locator('[data-menu-button]').getAttribute('aria-expanded');await page.keyboard.press('Escape');report.mobileMenuClosed=await page.locator('[data-menu-button]').getAttribute('aria-expanded');
 const before=fs.readFileSync(path.join(__dirname,'atelier-before-premium.html'),'utf8').split('<body')[1];const after=fs.readFileSync(path.join(__dirname,'home-v2-atelier-content.html'),'utf8').split('<body')[1];report.contentUnchanged=before===after;
 fs.writeFileSync(path.join(__dirname,'atelier-premium-complete-qa.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1});
