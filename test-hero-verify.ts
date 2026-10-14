import { chromium } from '@playwright/test';

async function runTests() {
  console.log('Starting Playwright verification test...');
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop Test (1920x950)
  {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 950 },
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    console.log('Clicking overlay to open envelope on desktop...');
    const overlay = page.locator('[data-envelope-overlay]');
    if (await overlay.count()) {
      await overlay.click();
    }

    console.log('Waiting 14 seconds for video + hero animations to complete...');
    await page.waitForTimeout(14000);

    // Evaluate required assertions
    const assertions = await page.evaluate(() => {
      const namesCount = document.querySelectorAll('.hi-nm').length;
      const bismillahPathsCount = document.querySelectorAll('.hi-bsvg path').length;
      const nmEl = document.querySelector('.hi-nm');
      const nmOpacity = nmEl ? getComputedStyle(nmEl).opacity : '0';
      const rootEl = document.querySelector('.hi-root');
      const hasGoClass = rootEl ? rootEl.classList.contains('hi-go') : false;
      const sbEl = document.querySelector('.sb-root');
      const sbPosition = sbEl ? getComputedStyle(sbEl).position : '';
      const flEl = document.querySelector('.hi-fl');
      const flHeight = flEl ? getComputedStyle(flEl).height : '';

      return {
        namesCount,
        bismillahPathsCount,
        nmOpacity,
        hasGoClass,
        sbPosition,
        flHeight,
      };
    });

    console.log('Desktop DevTools Check Results:', JSON.stringify(assertions, null, 2));

    await page.screenshot({ path: 'hero-desktop-1920x950.png', fullPage: false });
    console.log('Saved screenshot hero-desktop-1920x950.png');
    await context.close();
  }

  // 2. Mobile Test (390x844)
  {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    console.log('Clicking overlay to open envelope on mobile...');
    const overlay = page.locator('[data-envelope-overlay]');
    if (await overlay.count()) {
      await overlay.click();
    }

    console.log('Waiting 14 seconds for mobile video + hero animations to complete...');
    await page.waitForTimeout(14000);

    await page.screenshot({ path: 'hero-mobile-390x844.png', fullPage: false });
    console.log('Saved screenshot hero-mobile-390x844.png');
    await context.close();
  }

  await browser.close();
  console.log('Verification test completed.');
}

runTests().catch((err) => {
  console.error('Error in verification test:', err);
  process.exit(1);
});
