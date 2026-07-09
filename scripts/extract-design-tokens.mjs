import { chromium } from "playwright";
import { writeFileSync } from "fs";

const UI_IMAGE_PATH =
  "/mnt/c/Users/Administrator/Documents/Obsidian Vault/sanguosha-voice/UI-1.png";
const OUTPUT_PATH = "/home/wsl-ubuntu24/code/sanguosha-voice/src/styles/design-token-extract.json";
const SCREENSHOT_PATH = "/home/wsl-ubuntu24/code/sanguosha-voice/src/styles/ui-1-reference.png";

async function extractDesignTokens() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });

  // Navigate to the image file directly
  await page.goto(`file://${UI_IMAGE_PATH}`);
  await page.waitForTimeout(1000);

  // Take full screenshot for reference
  await page.screenshot({ path: SCREENSHOT_PATH, fullPage: true });
  console.log(`Screenshot saved to ${SCREENSHOT_PATH}`);

  // Use canvas to sample colors from the image
  const tokens = await page.evaluate(() => {
    const img = document.querySelector("img");
    if (!img) return null;

    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    function sampleColor(x, y) {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      return `#${pixel[0].toString(16).padStart(2, "0")}${pixel[1].toString(16).padStart(2, "0")}${pixel[2].toString(16).padStart(2, "0")}`;
    }

    const w = img.naturalWidth || img.width;
    const h = img.naturalHeight || img.height;

    return {
      imageWidth: w,
      imageHeight: h,
      sampledColors: {
        pageBackground: sampleColor(w * 0.5, h * 0.15),
        cardBackground: sampleColor(w * 0.3, h * 0.35),
        navBarBackground: sampleColor(w * 0.5, h * 0.03),
        skillBadge: sampleColor(w * 0.15, h * 0.2),
        greenPlayButton: sampleColor(w * 0.2, h * 0.85),
        accentAmber: sampleColor(w * 0.8, h * 0.5),
      },
      note: "Colors sampled from UI-1.png reference via Playwright canvas",
    };
  });

  if (tokens) {
    writeFileSync(OUTPUT_PATH, JSON.stringify(tokens, null, 2));
    console.log("Design tokens extracted:", JSON.stringify(tokens, null, 2));
  } else {
    console.error("Could not find img element on page");
  }

  await browser.close();
}

extractDesignTokens().catch(console.error);
