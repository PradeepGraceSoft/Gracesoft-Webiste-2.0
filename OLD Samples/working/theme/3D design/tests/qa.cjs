// Read-only browser proof for the local preview. Never follows external CTAs or submits a form.
// Overrides: PLAYWRIGHT_MODULE, CHROME_PATH and PREVIEW_URL.
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'D:/Playwright/PWTypescript/node_modules/playwright');
const root = path.resolve(__dirname, '..');
const url = process.env.PREVIEW_URL || 'http://127.0.0.1:4313/preview/index.html';
const origin = new URL(url).origin;
if (!['127.0.0.1', 'localhost', '[::1]'].includes(new URL(url).hostname)) throw Error('QA only accepts a localhost preview URL');
const screenshots = path.join(root, 'docs/screenshots');
fs.mkdirSync(screenshots, { recursive: true });
const report = {
  date: '2026-11-05', url, browser: 'Installed Google Chrome via Playwright, headless, SwiftShader allowed',
  scope: 'Static local preview; automated results do not establish full WCAG compliance or HubSpot behavior.',
  checks: [], viewports: [], axe: [], textReview: [], consoleErrors: [], externalRequests: [], localHttpFailures: [],
  limitations: ['200% and 400% tests use 1280px viewport reflow equivalents (640 and 320 CSS pixels), not native browser zoom.', 'Text scan detects geometric clipping and estimates solid-background contrast. Gradient, image, blend, overlapping-element and screen-reader review require manual inspection.', 'No production form submission, analytics, external navigation or HubSpot portal test is performed.']
};
let browser;
const record = (name, pass, detail) => { report.checks.push({ name, result: pass ? 'pass' : 'fail', detail }); if (!pass) console.error('FAIL:', name, JSON.stringify(detail)); };
async function test(name, action) {
  try { await action(); } catch (error) { record(name, false, error.message); }
}
async function pageFor(options = {}, expectedWebglFailure = false) {
  const page = await browser.newPage(options);
  await page.route('**/*', async route => {
    const target = route.request().url();
    if (/^https?:/.test(target) && new URL(target).origin !== origin) {
      report.externalRequests.push(target);
      await route.abort();
    } else await route.continue();
  });
  page.on('pageerror', error => report.consoleErrors.push({ page: page.url(), type: 'uncaught', message: error.message }));
  page.on('console', message => {
    if (message.type() === 'error' && !(expectedWebglFailure && /WebGL|context/i.test(message.text()))) report.consoleErrors.push({ page: page.url(), type: 'console', message: message.text() });
  });
  page.on('response', response => { if (response.status() >= 400 && new URL(response.url()).origin === origin) report.localHttpFailures.push({ url: response.url(), status: response.status() }); });
  return page;
}
async function visit(page, scene = true) {
  const response = await page.goto(url, { waitUntil: 'networkidle' });
  if (response.status() !== 200) throw Error(`Preview returned ${response.status()}`);
  await page.evaluate(() => document.fonts.ready);
  if (scene) await page.waitForFunction(() => ['ready','fallback'].includes(document.querySelector('[data-hotel-scene]')?.dataset.state), { timeout: 20000 });
}
async function scrollPage(page) {
  await page.evaluate(async () => {
    const prior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.8) { scrollTo(0, y); await new Promise(resolve => setTimeout(resolve, 65)); }
    scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = prior;
  });
  await page.waitForTimeout(150);
}
async function inspectText(page, label) {
  const result = await page.evaluate(() => {
    const clipped = [], contrastCandidates = [], samples = [];
    let inspected = 0, complexBackgrounds = 0;
    const rgb = value => { const numbers = value.match(/[\d.]+/g)?.map(Number); return numbers?.length >= 3 ? [...numbers.slice(0,3), numbers[3] ?? 1] : null; };
    const lum = rgb => rgb.slice(0,3).map(value => value / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4).reduce((sum,value,index) => sum + value * [.2126,.7152,.0722][index], 0);
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode, el = node.parentElement;
      if (!node.textContent.trim() || !el || el.closest('script,style,[hidden],[aria-hidden="true"],dialog:not([open])') || !el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) continue;
      const range = document.createRange(); range.selectNodeContents(node);
      const rects = [...range.getClientRects()].filter(rect => rect.width && rect.height);
      if (!rects.length) continue;
      inspected++;
      const text = node.textContent.trim().slice(0,90);
      for (let parent = el; parent && parent !== document.body; parent = parent.parentElement) {
        const css = getComputedStyle(parent), bounds = parent.getBoundingClientRect();
        const xclip = ['hidden','clip'].includes(css.overflowX), yclip = ['hidden','clip'].includes(css.overflowY);
        if (rects.some(rect => (xclip && (rect.left < bounds.left - 2 || rect.right > bounds.right + 2)) || (yclip && (rect.top < bounds.top - 3 || rect.bottom > bounds.bottom + 3)))) {
          clipped.push({ text, element: el.tagName, clippingAncestor: parent.className }); break;
        }
      }
      const css = getComputedStyle(el), fg = rgb(css.color);
      let bg = null, complex = false;
      for (let parent = el; parent; parent = parent.parentElement) {
        const ps = getComputedStyle(parent);
        if (ps.backgroundImage !== 'none' || ps.mixBlendMode !== 'normal' || Number(ps.opacity) < 1) { complex = true; break; }
        const color = rgb(ps.backgroundColor);
        if (color?.[3] === 1) { bg = color; break; }
        if (color && color[3] > 0) { complex = true; break; }
      }
      if (complex) { complexBackgrounds++; continue; }
      if (fg?.[3] === 1 && bg) {
        const a = lum(fg), b = lum(bg), ratio = (Math.max(a,b) + .05) / (Math.min(a,b) + .05);
        const fontSize = parseFloat(css.fontSize), bold = parseInt(css.fontWeight) >= 700;
        const minimum = fontSize >= 24 || (bold && fontSize >= 18.66) ? 3 : 4.5;
        if (samples.length < 100) samples.push({ text, foreground: css.color, background: bg.slice(0,3), fontSize, ratio: +ratio.toFixed(2), minimum });
        if (ratio + .01 < minimum) contrastCandidates.push({ text, ratio: +ratio.toFixed(2), minimum });
      }
    }
    return { inspectedTextNodes: inspected, geometricClipping: clipped, solidBackgroundContrastCandidates: contrastCandidates, complexBackgroundsDeferred: complexBackgrounds, colorSamples: samples };
  });
  report.textReview.push({ label, ...result });
  record(`${label}: text is not geometrically clipped`, !result.geometricClipping.length, result.geometricClipping);
  record(`${label}: sampled solid-background text contrast`, !result.solidBackgroundContrastCandidates.length, result.solidBackgroundContrastCandidates);
}
async function axe(page, label) {
  await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
  const result = await page.evaluate(async () => {
    const { violations, incomplete, passes } = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice'] } });
    const trim = rows => rows.map(row => ({ id: row.id, impact: row.impact, description: row.description, nodes: row.nodes.map(node => ({ target: node.target, summary: node.failureSummary, html: node.html })) }));
    return { violations: trim(violations), incomplete: trim(incomplete), passedRuleCount: passes.length };
  });
  report.axe.push({ label, ...result });
  record(`${label}: axe automated rules`, !result.violations.length, result.violations);
}
async function run() {
  browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', args: ['--enable-unsafe-swiftshader'] });
  const modes = [
    { width: 320, height: 900, name: 'mobile-320' }, { width: 390, height: 844, name: 'mobile-390' },
    { width: 768, height: 1024, name: 'tablet-768' }, { width: 1024, height: 900, name: 'desktop-1024' },
    { width: 1440, height: 1000, name: 'desktop-1440' }, { width: 844, height: 390, name: 'landscape-844' },
    { width: 640, height: 450, name: 'zoom-200-reflow' }, { width: 320, height: 225, name: 'zoom-400-reflow' }
  ];
  for (const mode of modes) await test(mode.name, async () => {
    const page = await pageFor({ viewport: { width: mode.width, height: mode.height }, reducedMotion: 'reduce' });
    try {
      await visit(page); await scrollPage(page);
      const state = await page.evaluate(() => ({
        width: innerWidth, scrollWidth: document.documentElement.scrollWidth, h1: document.querySelectorAll('h1').length,
        unresolvedHubL: /\{[{%]/.test(document.documentElement.innerHTML),
        brokenImages: [...document.images].filter(image => image.hasAttribute('src') && image.checkVisibility() && image.complete && !image.naturalWidth).map(image => image.src),
        missingAlt: [...document.images].filter(image => !image.hasAttribute('alt')).map(image => image.src),
        brokenFragments: [...document.querySelectorAll('a[href^="#"]')].filter(link => !document.getElementById(decodeURIComponent(link.hash.slice(1)))).map(link => link.getAttribute('href')),
        metadata: { title: document.title, description: document.querySelector('meta[name="description"]')?.content, robots: document.querySelector('meta[name="robots"]')?.content, canonicals: document.querySelectorAll('link[rel="canonical"]').length, language: document.documentElement.lang },
        scene: document.querySelector('[data-hotel-scene]')?.dataset.state,
        headingSkips: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(element => Number(element.tagName[1])).filter((level,index,all) => index && level > all[index - 1] + 1),
        forms: document.forms.length
      }));
      report.viewports.push({ ...mode, ...state });
      record(`${mode.name}: responsive page and semantic content`, state.scrollWidth <= state.width + 1 && state.h1 === 1 && !state.unresolvedHubL && !state.brokenImages.length && !state.missingAlt.length && !state.brokenFragments.length && !state.headingSkips.length, state);
      record(`${mode.name}: protected preview metadata`, !!state.metadata.description && state.metadata.language === 'en' && /noindex/.test(state.metadata.robots) && state.metadata.canonicals === 0, state.metadata);
      await inspectText(page, mode.name);
      if ([390,1440].includes(mode.width) && !mode.name.startsWith('zoom')) await axe(page, mode.name);
      await page.screenshot({ path: path.join(screenshots, `${mode.name}.png`), fullPage: true, animations: 'disabled' });
    } finally { await page.close(); }
  });
  await test('keyboard and interactions', async () => {
    const page = await pageFor({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    try {
      await visit(page);
      await page.keyboard.press('Tab');
      record('Skip link is first keyboard stop', await page.locator('.skip-link').evaluate(element => element === document.activeElement));
      await page.keyboard.press('Enter');
      record('Skip link targets main content', new URL(page.url()).hash === '#main-content');
      const toggle = page.locator('[data-menu-button]');
      await toggle.click();
      record('Mobile menu opens and receives focus', await toggle.getAttribute('aria-expanded') === 'true' && await page.locator('#site-navigation').evaluate(element => element.contains(document.activeElement)));
      await page.keyboard.press('Escape');
      record('Mobile menu Escape closes and restores focus', await toggle.getAttribute('aria-expanded') === 'false' && await toggle.evaluate(element => element === document.activeElement));
      await page.setViewportSize({ width: 1440, height: 1000 });
      const roots = page.locator('[data-tabs]');
      for (let index = 0; index < await roots.count(); index++) {
        const tabsRoot = roots.nth(index), tabs = tabsRoot.locator('[role="tab"]'), count = await tabs.count();
        const list = tabsRoot.locator('[role="tablist"]');
        await tabs.first().focus();
        await page.keyboard.press(await list.getAttribute('aria-orientation') === 'vertical' ? 'ArrowDown' : 'ArrowRight');
        record(`Tab set ${index + 1}: arrow selects and focuses next`, await tabs.nth(1).getAttribute('aria-selected') === 'true' && await tabs.nth(1).evaluate(element => element === document.activeElement));
        await page.keyboard.press('End');
        record(`Tab set ${index + 1}: End selects last`, await tabs.last().getAttribute('aria-selected') === 'true');
        await page.keyboard.press('Home');
        record(`Tab set ${index + 1}: Home selects first`, await tabs.first().getAttribute('aria-selected') === 'true');
        for (let tabIndex = 0; tabIndex < count; tabIndex++) {
          await tabs.nth(tabIndex).click();
          record(`Tab set ${index + 1}, panel ${tabIndex + 1}: sole visible panel`, await tabsRoot.locator('[role="tabpanel"]:visible').count() === 1);
          const panel = tabsRoot.locator('[role="tabpanel"]:visible');
          const images = panel.locator('img[src]');
          for (let imageIndex = 0; imageIndex < await images.count(); imageIndex++) await images.nth(imageIndex).evaluate(image => image.decode());
        }
        await tabs.first().click();
      }
      const zoom = page.locator('[data-zoom]:visible').first();
      await zoom.click();
      record('Screenshot zoom opens modal', await page.locator('[data-image-dialog]').evaluate(element => element.open));
      await page.keyboard.press('Escape');
      record('Screenshot zoom Escape restores trigger focus', !(await page.locator('[data-image-dialog]').evaluate(element => element.open)) && await zoom.evaluate(element => element === document.activeElement));
      const faq = page.locator('.faq-list details').first();
      await faq.locator('summary').focus(); await page.keyboard.press('Enter');
      record('FAQ opens from keyboard', await faq.getAttribute('open') !== null);
      await page.keyboard.press('Enter'); record('FAQ closes from keyboard', await faq.getAttribute('open') === null);
      const hrefs = await page.locator('a[href]').evaluateAll(links => links.map(link => link.href));
      record('Existing demo and pricing journeys retained', hrefs.includes('https://www.gracesoft.com/livedemo') && hrefs.includes('https://www.gracesoft.com/pricing'));
    } finally { await page.close(); }
  });
  await test('motion behavior', async () => {
    const page = await pageFor({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' });
    try {
      await visit(page);
      record('Desktop WebGL scene renders', await page.locator('[data-hotel-scene]').getAttribute('data-state') === 'ready' && await page.locator('[data-hotel-scene] canvas').count() === 1);
      const pause = page.locator('[data-scene-pause]');
      await pause.click();
      record('Pause control pauses scene', await pause.getAttribute('aria-pressed') === 'true' && await page.locator('.hero-stage').getAttribute('data-motion') === 'paused');
      await pause.click(); record('Pause control resumes scene', await pause.getAttribute('aria-pressed') === 'false' && await page.locator('.hero-stage').getAttribute('data-motion') === 'playing');
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForTimeout(150);
      record('Reduced motion stops scene and hides animation toggle', await page.locator('.hero-stage').getAttribute('data-motion') === 'paused' && !(await pause.isVisible()));
      const animations = await page.evaluate(() => document.getAnimations().filter(animation => animation.playState === 'running' && animation.effect?.getComputedTiming().iterations === Infinity).length);
      record('Reduced motion has no indefinite running CSS animations', animations === 0, animations);
    } finally { await page.close(); }
  });
  await test('without JavaScript', async () => {
    const page = await pageFor({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    try {
      await visit(page, false); await scrollPage(page);
      const panels = await page.locator('[data-panel]').count();
      const visible = await page.locator('[data-panel]:visible').count();
      record('Without JavaScript all product and screenshot panels remain visible', panels === visible && panels > 0, { panels, visible });
      record('Without JavaScript navigation remains visible', await page.locator('#site-navigation').isVisible());
      record('Without JavaScript core demo link remains usable', await page.locator('.hero a[href="https://www.gracesoft.com/livedemo"]').isVisible());
      record('Without JavaScript fallback visible', await page.locator('[data-scene-fallback]').isVisible());
      record('Without JavaScript no horizontal overflow', await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      await page.screenshot({ path: path.join(screenshots, 'no-javascript-390.png'), fullPage: true });
    } finally { await page.close(); }
  });
  await test('WebGL fallback', async () => {
    const page = await pageFor({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' }, true);
    await page.addInitScript(() => {
      const original = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function(type, ...args) { return /webgl/i.test(type) ? null : original.call(this, type, ...args); };
    });
    try {
      await visit(page);
      record('WebGL unavailable shows fallback and working CTA', await page.locator('[data-hotel-scene]').getAttribute('data-state') === 'fallback' && await page.locator('[data-scene-fallback]').isVisible() && await page.locator('.hero a[href="https://www.gracesoft.com/livedemo"]').isVisible());
      await page.screenshot({ path: path.join(screenshots, 'webgl-fallback-1440.png'), fullPage: false });
    } finally { await page.close(); }
  });
  record('No external subresource requests', report.externalRequests.length === 0, report.externalRequests);
  record('No missing local resources', report.localHttpFailures.length === 0, report.localHttpFailures);
  record('No unexpected console or runtime errors', report.consoleErrors.length === 0, report.consoleErrors);
}
run().catch(error => record('Test runner completed', false, error.stack)).finally(async () => {
  if (browser) await browser.close();
  report.passed = report.checks.length > 0 && report.checks.every(check => check.result === 'pass');
  fs.writeFileSync(path.join(root, 'docs/browser-qa.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ passed: report.passed, checks: report.checks.length, failures: report.checks.filter(check => check.result === 'fail'), screenshots: path.relative(root, screenshots) }, null, 2));
  if (!report.passed) process.exitCode = 1;
});
