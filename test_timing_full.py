import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1920, "height": 950})
        await page.goto("http://localhost:3000")

        overlay = page.locator("[data-envelope-overlay]")
        if await overlay.is_visible():
            await overlay.click()
            print("Clicked envelope overlay")

        # Wait 15s total after clicking overlay
        for t in range(0, 15):
            await page.wait_for_timeout(1000)
            go_class = await page.evaluate("document.querySelector('.hi-root').classList.contains('hi-go')")
            dt_opacity = await page.evaluate("getComputedStyle(document.querySelector('.hi-dt')).opacity")
            print(f"t={t+1}s: hi-go={go_class}, dt_opacity={dt_opacity}")

        await page.screenshot(path="verification/screenshots/hero_desktop_full.png")
        await browser.close()

asyncio.run(main())
