import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const SCREENSHOT_DIR = path.resolve("screenshots");
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

test.describe("鱼池中转 V2 视觉锚点与连续滚动剧场验收", () => {
  test("桌面端：零代码块、连续 GSAP 遮罩剧场、图像画廊、Bento 交互与零报错", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(`console.error: ${msg.text()}`);
      }
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });

    // Hard check: zero <pre> or <code> elements on the landing page
    const codeCount = await page.locator("pre, code").count();
    expect(codeCount, "Homepage must contain zero code blocks (<pre>/<code>)").toBe(0);

    // Check all images loaded cleanly
    const imgStatus = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll("img"));
      return imgs.map((img) => ({
        src: img.getAttribute("src"),
        complete: img.complete,
        naturalWidth: img.naturalWidth,
      }));
    });
    expect(imgStatus.length).toBeGreaterThanOrEqual(7);
    for (const img of imgStatus) {
      expect(img.complete, `Image ${img.src} incomplete`).toBe(true);
      expect(img.naturalWidth, `Image ${img.src} naturalWidth=0`).toBeGreaterThan(0);
    }

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "desktop-hero.png"),
      fullPage: false,
    });

    // Click Lyra quote bubble
    const quoteText = page.getByTestId("lyra-quote-text");
    const firstQuote = await quoteText.innerText();
    await page.getByTestId("lyra-quote-btn").click();
    expect(await quoteText.innerText()).not.toBe(firstQuote);

    // Scroll into Twin-Star Arena (Sol act)
    await page.locator("#arena").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const clipBefore = await page
      .getByTestId("arena-astra-layer")
      .evaluate((el) => getComputedStyle(el).clipPath);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "desktop-arena-sol.png"),
      fullPage: false,
    });

    // Click capsule 02 Astra to scrub GSAP timeline smoothly into Act 2
    await page.getByTestId("arena-cap-1").click();
    await page.waitForTimeout(900);
    const clipAfter = await page
      .getByTestId("arena-astra-layer")
      .evaluate((el) => getComputedStyle(el).clipPath);
    expect(clipAfter).not.toBe(clipBefore);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "desktop-arena-astra.png"),
      fullPage: false,
    });

    // Gallery Alpha switcher
    await page.getByTestId("alpha-bg-navy").scrollIntoViewIfNeeded();
    await page.getByTestId("alpha-bg-navy").click();
    await expect(page.getByTestId("alpha-preview-stage")).toHaveAttribute(
      "data-bg-mode",
      "navy"
    );
    await page.getByTestId("alpha-bg-checker").click();

    // Bento: Anti-downgrade slider & CC Switch visual nodes & pricing slider
    await page.getByTestId("downgrade-slider").scrollIntoViewIfNeeded();
    await page.getByTestId("downgrade-slider").fill("30");
    await page.getByTestId("downgrade-slider").dispatchEvent("change");
    const overlayClip = await page
      .getByTestId("anti-downgrade-overlay")
      .evaluate((el) => el.style.clipPath);
    expect(overlayClip).toContain("70%");

    await page.getByTestId("client-node-cherry").click();
    await expect(page.getByTestId("client-punchline")).toContainText("Cherry Studio");

    const beforeSaved = await page.getByTestId("saved-rmb-value").innerText();
    await page.getByTestId("pricing-slider").fill("250");
    await page.getByTestId("pricing-slider").dispatchEvent("change");
    await expect(page.getByTestId("usage-usd-value")).toContainText("$250");
    expect(await page.getByTestId("saved-rmb-value").innerText()).not.toBe(beforeSaved);

    // Full-page screenshot from top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "desktop-full.png"),
      fullPage: true,
    });

    // Footer & Modal
    await page.getByTestId("footer-contact-btn").scrollIntoViewIfNeeded();
    await page.getByTestId("footer-contact-btn").click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.getByTestId("copy-wechat-btn").click();
    await expect(page.getByTestId("copy-wechat-btn")).toContainText("已复制微信号");

    expect(errors, `Console/Page errors: ${errors.join(" | ")}`).toEqual([]);
  });

  test("移动端：390px 无横向溢出并截图", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "networkidle" });

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 2
    );
    expect(overflow).toBe(false);

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "mobile-full.png"),
      fullPage: true,
    });
    expect(errors).toEqual([]);
  });
});
