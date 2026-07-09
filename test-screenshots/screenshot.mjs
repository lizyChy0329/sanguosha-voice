import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const context = await browser.newContext({
  viewport: { width: 400, height: 868 },
  deviceScaleFactor: 2,
});
const page = await context.newPage();

// Home page (first screen)
await page.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await page.waitForTimeout(3000); // Wait for fonts/images to load
await page.screenshot({
  path: "/home/wsl-ubuntu24/code/sanguosha-voice/test-screenshots/home-current.png",
  fullPage: false,
});

await browser.close();
console.log("Screenshot saved to test-screenshots/home-current.png");
