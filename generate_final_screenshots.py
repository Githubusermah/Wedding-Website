import asyncio
from playwright.async_api import async_playwright

async def capture():
    async with async_playwright() as p:
        browser = await p.chromium.launch()

        # Desktop
        page = await browser.new_page(viewport={"width": 1920, "height": 950})
        await page.goto("http://localhost:3000")
        overlay = page.locator("[data-envelope-overlay]")
        if await overlay.is_visible():
            await overlay.click()
        await page.wait_for_timeout(14000)
        await page.screenshot(path="verification/screenshots/hero_desktop_final.png")
        print("Desktop screenshot captured at t=14s post-click")

        # Mobile
        page_m = await browser.new_page(viewport={"width": 390, "height": 844})
        await page_m.goto("http://localhost:3000")
        overlay_m = page_m.locator("[data-envelope-overlay]")
        if await overlay_m.is_visible():
            await overlay_m.click()
        await page_m.wait_for_timeout(14000)
        await page_m.screenshot(path="verification/screenshots/hero_mobile_final.png")
        print("Mobile screenshot captured at t=14s post-click")

        await browser.close()

asyncio.run(capture())
