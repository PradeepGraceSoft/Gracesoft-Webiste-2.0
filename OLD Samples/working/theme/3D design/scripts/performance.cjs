const path = require('node:path');
const fs = require('node:fs');
const root = path.resolve(__dirname, '..');
(async () => {
  const { default: lighthouse } = await import('lighthouse');
  const chromeLauncher = await import('chrome-launcher');
  const chrome = await chromeLauncher.launch({chromePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', chromeFlags: ['--headless=new', '--enable-unsafe-swiftshader', '--disable-dev-shm-usage']});
  try {
    const result = await lighthouse('http://127.0.0.1:4313/preview/index.html', {port: chrome.port, output: 'json', logLevel: 'error', onlyCategories: ['performance','accessibility','best-practices','seo']}, {extends:'lighthouse:default', settings:{formFactor:'mobile', screenEmulation:{mobile:true,width:390,height:844,deviceScaleFactor:1,disabled:false}, throttlingMethod:'simulate'}});
    fs.writeFileSync(path.join(root, 'docs/lighthouse.json'), result.report);
    const ids = ['first-contentful-paint','largest-contentful-paint','total-blocking-time','cumulative-layout-shift','speed-index','total-byte-weight'];
    const summary = {date:'2026-11-05',url:result.lhr.finalDisplayedUrl,tool:'Lighthouse '+result.lhr.lighthouseVersion,context:'Local static approximation; mobile simulated throttling; headless Chrome using software WebGL. Not HubSpot staging or field Core Web Vitals.',categories:Object.fromEntries(Object.entries(result.lhr.categories).map(([key,value])=>[key,value.score])),metrics:Object.fromEntries(ids.map(id=>[id,{value:result.lhr.audits[id]?.numericValue,display:result.lhr.audits[id]?.displayValue}])),diagnostics:Object.entries(result.lhr.audits).filter(([,v])=>v.score !== null && v.score < 1).map(([key,v])=>({id:key,title:v.title,score:v.score,display:v.displayValue,description:v.description}))};
    fs.writeFileSync(path.join(root,'docs/performance-summary.json'),JSON.stringify(summary,null,2)+'\n');
    console.log(JSON.stringify({categories:summary.categories,metrics:summary.metrics},null,2));
  } finally { await chrome.kill(); }
})().catch(error => {console.error(error);process.exitCode=1;});
