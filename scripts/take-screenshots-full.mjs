import { chromium } from "playwright";

const CHROME_PATH = process.env.HOME + "/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome";

async function main() {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });

  // Select page - full page
  const page = await context.newPage();
  await page.goto("http://localhost:5199/select", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // Check what's visible
  const footerVisible = await page.evaluate(() => {
    const footer = document.querySelector("footer");
    const main = document.querySelector("main");
    const body = document.body;
    return {
      footerExists: !!footer,
      footerHTML: footer ? footer.outerHTML.substring(0, 500) : "no footer",
      mainOverflow: main ? window.getComputedStyle(main).overflowY : "no main",
      bodyScrollHeight: body.scrollHeight,
      windowHeight: window.innerHeight,
      footerInView: footer ? isElementInViewport(footer) : false,
      cards: document.querySelectorAll(".grid > div").length,
      selectedCards: document.querySelectorAll(".grid > div .size-6.rounded-full").length,
      hasGoldBorder: document.querySelector(".border-gold\\/50") ? true : false,
      hasCheckIcon: document.querySelector('[data-lucide="check"]') ? true : false,
      hasBottomBar: footer ? footer.offsetParent !== null : false,
    };
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    }
  });

  console.log("Footer check:", JSON.stringify(footerVisible, null, 2));

  // Take full page screenshot
  await page.screenshot({
    path: "/home/wsl-ubuntu24/code/sanguosha-voice/test-screenshots/select-v4-full.png",
    fullPage: true,
  });
  console.log("select-v4-full.png saved (full page)");

  // Also viewport screenshot
  await page.screenshot({
    path: "/home/wsl-ubuntu24/code/sanguosha-voice/test-screenshots/select-v4.png",
    fullPage: false,
  });
  console.log("select-v4.png saved (viewport)");

  await page.close();
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
