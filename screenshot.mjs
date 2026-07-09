import { chromium } from "playwright";

const browser = await chromium.launch({
  executablePath: "/home/wsl-ubuntu24/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

// Collect console errors
const consoleErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});
page.on("pageerror", (err) => consoleErrors.push(err.message));

console.log("Navigating to http://localhost:5174/...");
const resp = await page.goto("http://localhost:5174/", { waitUntil: "load", timeout: 30000 });
console.log("Status:", resp.status());

// Wait for content to render
await page.waitForTimeout(8000);

// Debug: check what's on the page
const title = await page.title();
console.log("Title:", title);

const html = await page.content();
console.log("HTML length:", html.length);
console.log("HTML snippet:", html.substring(0, 1000));

const bodyText = await page.evaluate(() => document.body?.innerText?.substring(0, 500) || "EMPTY");
console.log("Body text:", bodyText);

// Check for #app content
const appContent = await page.evaluate(() => {
  const app = document.getElementById("app");
  return app ? app.innerHTML.substring(0, 500) : "NO #app found";
});
console.log("App content:", appContent);

await page.screenshot({
  path: "/home/wsl-ubuntu24/code/sanguosha-voice/test-screenshots/home-redesign.png",
  fullPage: true,
});
console.log("Screenshot saved!");

if (consoleErrors.length) console.log("Console errors:", consoleErrors);
await browser.close();
