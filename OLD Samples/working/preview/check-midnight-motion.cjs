const {chromium}=require('D:/Playwright/PWTypescript/node_modules/playwright');
const fs=require('fs');
(async()=>{const browser=await chromium.launch({headless:true});const results=[];const url='file:///D:/Website%20Hubspot/GraceSoft-Webiste-v2/working/preview/home-v2-midnight.html';
for(const width of [390,1440]){const page=await browser.newPage({viewport:{width,height:900}});await page.goto(url);await page.waitForTimeout(1100);const card=page.locator('.gs-benefits .gs-card').first();const before=await card.evaluate(e=>getComputedStyle(e).opacity);await card.evaluate(e=>{document.documentElement.style.scrollBehavior="auto";window.scrollTo(0,e.getBoundingClientRect().top+window.scrollY-250)});await page.waitForTimeout(250);const during=await card.evaluate(e=>getComputedStyle(e).opacity);await page.waitForTimeout(1100);const after=await card.evaluate(e=>getComputedStyle(e).opacity);await page.evaluate(()=>window.scrollTo(0,0));await page.waitForTimeout(200);const staysVisible=await card.evaluate(e=>getComputedStyle(e).opacity);results.push({width,before,during,after,staysVisible});await page.close();}
const reduced=await browser.newPage({reducedMotion:'reduce'});await reduced.goto(url);results.push({reducedMotionPending:await reduced.locator('.gs-motion-pending').count()});
const nojs=await browser.newPage({javaScriptEnabled:false});await nojs.goto(url);results.push({noJsOpacity:await nojs.locator('.gs-benefits .gs-card').first().evaluate(e=>getComputedStyle(e).opacity)});
const keyboard=await browser.newPage();await keyboard.goto(url);await keyboard.locator('.gs-benefits .gs-card a').first().focus();results.push({focusedCardVisible:await keyboard.locator('.gs-benefits .gs-card').first().evaluate(e=>getComputedStyle(e).opacity)});
console.log(results);fs.writeFileSync('working/preview/midnight-motion-qa.json',JSON.stringify(results,null,2));await browser.close();})();


