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

  // Home page
  const page = await context.newPage();
  await page.goto("http://localhost:5199/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  const homeInfo = await page.evaluate(() => {
    const body = document.body;
    const footer = document.querySelector("footer");
    const header = document.querySelector("header");

    // Check for BGM elements
    const allText = document.body.innerText;
    const allHTML = document.body.innerHTML;

    return {
      hasAudioElement: !!document.querySelector("audio"),
      hasBgmInText: allText.includes("BGM") || allText.includes("背景音乐"),
      hasMusicIcon: allHTML.includes("music") || allHTML.includes("Music"),
      hasVolumeIcon: allHTML.includes("volume") || allHTML.includes("Volume"),
      hasPlayIcon: allHTML.includes("Play") || allHTML.includes("play"),
      footerExists: !!footer,
      footerHTML: footer ? footer.outerHTML.substring(0, 800) : "none",
      bodyScrollHeight: body.scrollHeight,
      windowHeight: window.innerHeight,
      footerInView: footer
        ? (() => {
            const rect = footer.getBoundingClientRect();
            return rect.top < window.innerHeight && rect.bottom > 0;
          })()
        : false,
      headerHTML: header ? header.outerHTML.substring(0, 800) : "none",
    };
  });

  console.log("Home page info:", JSON.stringify(homeInfo, null, 2));

  await page.screenshot({
    path: "/home/wsl-ubuntu24/code/sanguosha-voice/test-screenshots/home-v4.png",
    fullPage: false,
  });
  console.log("home-v4.png saved");

  await page.close();
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
