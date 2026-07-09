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

  // Screenshot 1: Home page
  const page1 = await context.newPage();
  await page1.goto("http://localhost:5199/", { waitUntil: "networkidle" });
  await page1.waitForTimeout(1000);
  await page1.screenshot({
    path: "/home/wsl-ubuntu24/code/sanguosha-voice/test-screenshots/home-v4.png",
    fullPage: false,
  });
  console.log("home-v4.png saved");
  await page1.close();

  // Screenshot 2: Select page
  const page2 = await context.newPage();
  await page2.goto("http://localhost:5199/select", { waitUntil: "networkidle" });
  await page2.waitForTimeout(1000);
  await page2.screenshot({
    path: "/home/wsl-ubuntu24/code/sanguosha-voice/test-screenshots/select-v4.png",
    fullPage: false,
  });
  console.log("select-v4.png saved");
  await page2.close();

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
