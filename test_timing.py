import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1920, "height": 950})
        await page.goto("http://localhost:3000")

        # Click overlay if present
        overlay = page.locator("[data-envelope-overlay]")
        if await overlay.is_visible():
            btn = overlay.locator("button")
            if await btn.count() > 0:
                await btn.first.click()
                print("Clicked envelope button")
            else:
                await overlay.click()
                print("Clicked overlay directly")

        for t in range(0, 10):
            await page.wait_for_timeout(1000)
            go_class = await page.evaluate("document.querySelector('.hi-root').classList.contains('hi-go')")
            nm_opacity = await page.evaluate("getComputedStyle(document.querySelectorAll('.hi-nm')[0]).opacity")
            dt_opacity = await page.evaluate("getComputedStyle(document.querySelector('.hi-dt')).opacity")
            print(f"t={t+1}s: hi-go={go_class}, nm_opacity={nm_opacity}, dt_opacity={dt_opacity}")

        await page.screenshot(path="verification/screenshots/hero_desktop_10s.png")
        await browser.close()

asyncio.run(main())
