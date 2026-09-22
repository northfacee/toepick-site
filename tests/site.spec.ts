import { test, expect } from "@playwright/test";
for (const width of [360, 768, 1440]) {
  test(`responsive layout and preview at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const requests: string[] = [];
    page.on("request", (r) => {
      if (!r.url().startsWith("http://127.0.0.1:4173/")) requests.push(r.url());
    });
    await page.goto("./");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "매일 듣고",
    );
    for (const tab of ["홈", "문제", "단어", "기록"]) {
      await page.getByRole("tab", { name: tab, exact: true }).click();
      await expect(
        page.getByRole("tab", { name: tab, exact: true }),
      ).toHaveAttribute("aria-selected", "true");
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
    }
    expect(errors).toEqual([]);
    expect(requests).toEqual([]);
    await page.screenshot({
      path: `outputs/home-${width}.png`,
      fullPage: true,
    });
  });
}
test("keyboard tab navigation and reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  const first = page.getByRole("tab", { name: "홈", exact: true });
  await first.focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "문제", exact: true }),
  ).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText("completed");
  await page.keyboard.press("End");
  await expect(
    page.getByRole("tab", { name: "기록", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(first).toBeFocused();
  await page.keyboard.press("ArrowLeft");
  await expect(
    page.getByRole("tab", { name: "기록", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Home");
  await expect(first).toBeFocused();
  expect(
    await page
      .locator(".showcase-fallback > .phone")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  expect(
    await page
      .locator("html")
      .evaluate((el) => getComputedStyle(el).scrollBehavior),
  ).toBe("auto");
});
test("privacy direct navigation and refresh without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto("http://127.0.0.1:4173/privacy/");
  await page.reload();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await expect(
    page.getByRole("heading", { name: "개인정보처리방침", exact: true }),
  ).toBeVisible();
  await expect(page.locator("main")).toContainText("Speechify");
  await expect(page.locator("main")).toContainText("LangSmith");
  await expect(page.getByRole("heading", { name: "Privacy Policy", exact: true })).toBeVisible();
  await expect(page.locator("#privacy-en")).toContainText("Google Mobile Ads");
  await expect(page.locator("#privacy-en")).toContainText("no scheduled automatic deletion");
  await page.getByRole("link", { name: "English", exact: true }).click();
  await expect(page).toHaveURL(/privacy\/#privacy-en$/);
  await page.getByRole("link", { name: "← Back to ToePick" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "매일 듣고",
  );
  await context.close();
});
test("navigation, asset delivery and release status", async ({ page }) => {
  const failures: string[] = [];
  page.on("response", (r) => {
    if (r.status() >= 400) failures.push(r.url());
  });
  await page.goto("./");
  await page.getByRole("link", { name: "앱 미리보기", exact: true }).click();
  await expect(page).toHaveURL(/#preview$/);
  await page
    .getByRole("link", { name: "개인정보처리방침", exact: true })
    .click();
  await expect(page).toHaveURL(/privacy\/$/);
  await page.reload();
  await page.getByRole("link", { name: "← ToePick 소개로 돌아가기" }).click();
  await expect(page.getByText("출시 준비 중", { exact: true })).toHaveCount(2);
  expect(
    await page
      .locator("img")
      .evaluateAll((images) =>
        images.every(
          (i) =>
            i instanceof HTMLImageElement && i.complete && i.naturalWidth > 0,
        ),
      ),
  ).toBe(true);
  expect(failures).toEqual([]);
});
