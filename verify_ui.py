import time
from playwright.sync_api import sync_playwright

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos",
            viewport={"width": 1280, "height": 800}
        )
        page = context.new_page()

        page.goto("http://localhost:3000")
        page.wait_for_timeout(1000)

        # Click on intro video screen to play / dismiss video
        page.click("body")
        page.wait_for_timeout(4000)

        # Check scroll position at top
        scroll_y = page.evaluate("window.scrollY")
        print(f"Scroll Y position after intro: {scroll_y}")

        page.screenshot(path="/home/jules/verification/screenshots/hero_top.png")

        # Scroll down to Schedule Timeline section
        page.locator("#event-facts").scroll_into_view_if_needed()
        page.wait_for_timeout(1000)
        page.screenshot(path="/home/jules/verification/screenshots/schedule_pink_blossom.png")

        # Scroll down to Venue Section
        page.locator("#venue").scroll_into_view_if_needed()
        page.wait_for_timeout(1000)
        page.screenshot(path="/home/jules/verification/screenshots/venue_city_star.png")

        # Scroll down to Footer section
        page.evaluate("window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })")
        page.wait_for_timeout(1500)
        page.screenshot(path="/home/jules/verification/screenshots/verification.png")

        context.close()
        browser.close()

if __name__ == "__main__":
    run_verification()
