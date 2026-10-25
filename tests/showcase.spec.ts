import { test, expect } from "@playwright/test";

test("2D hero showcase renders immediately without WebGL canvas and switches modes", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  const errors: string[] = [];
  const threeRequests: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("request", (r) => {
    if (r.url().includes("hero-scene-")) threeRequests.push(r.url());
  });

  await page.goto("./");
  const showcase = page.locator(".hero-showcase");
  const fallback = page.locator(".showcase-fallback");
  await expect(showcase).toHaveAttribute("data-state", "static");
  await expect(fallback).toBeVisible();
  await expect(page.locator(".showcase-canvas canvas")).toHaveCount(0);
  await expect(fallback).toContainText("LISTENING MIX");

  const group = page.getByRole("group", { name: "3D 앱 미리보기 모드" });
  const expectedHeaders = ["LISTENING MIX", "READING", "MY WORDS"];
  for (const [index, name] of ["듣기", "독해", "단어"].entries()) {
    const button = group.getByRole("button", { name, exact: true });
    await button.focus();
    await page.keyboard.press("Enter");
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(showcase).toHaveAttribute("data-selected-mode", String(index));
    await expect(fallback).toContainText(expectedHeaders[index]);
  }

  expect(threeRequests).toEqual([]);
  expect(errors).toEqual([]);
});

test("privacy never requests 3D modules or textures", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", (r) => requests.push(r.url()));
  await page.goto("privacy/");
  await expect(
    page.getByRole("heading", { name: "개인정보처리방침", exact: true }),
  ).toBeVisible();
  expect(
    requests.filter(
      (url) => url.includes("hero-scene-") || url.includes("/showcase/"),
    ),
  ).toEqual([]);
});

test("mobile touch scroll works cleanly over the 2D hero showcase", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto("./");
  await expect(page.locator(".showcase-fallback")).toBeVisible();
  await page.evaluate(() => window.scrollTo({ top: 350, behavior: "instant" }));
  const bounds = await page.locator(".showcase-fallback").boundingBox();
  if (!bounds) throw new Error("Missing mobile showcase");
  const client = await context.newCDPSession(page);
  const x = 195,
    y = Math.min(bounds.y + bounds.height * 0.6, 730);
  await client.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x, y }],
  });
  for (let i = 1; i <= 8; i++)
    await client.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x, y: y - i * 25 }],
    });
  await client.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(420);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await context.close();
});

test("English and Japanese 2D hero showcase switches modes cleanly", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });

  await page.goto("en/");
  await expect(page.locator(".hero-showcase")).toHaveAttribute(
    "data-state",
    "static",
  );
  const enGroup = page.getByRole("group", { name: "3D app preview mode" });
  await enGroup.getByRole("button", { name: "Reading", exact: true }).click();
  await expect(page.locator(".hero-showcase")).toHaveAttribute(
    "data-selected-mode",
    "1",
  );
  await expect(page.locator(".showcase-fallback")).toContainText("READING");

  await page.goto("ja/");
  await expect(page.locator(".hero-showcase")).toHaveAttribute(
    "data-state",
    "static",
  );
  const jaGroup = page.getByRole("group", {
    name: "3Dアプリプレビューモード",
  });
  await jaGroup.getByRole("button", { name: "単語", exact: true }).click();
  await expect(page.locator(".hero-showcase")).toHaveAttribute(
    "data-selected-mode",
    "2",
  );
  await expect(page.locator(".showcase-fallback")).toContainText("MY WORDS");
});
