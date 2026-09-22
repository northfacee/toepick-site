import { test, expect } from "@playwright/test";

test("WebGL scene, modes, drag bounds, return and offscreen pause", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("./");
  const showcase = page.locator(".hero-showcase"),
    host = page.locator(".showcase-canvas");
  await expect(showcase).toHaveAttribute("data-state", "ready");
  await expect(host).toHaveAttribute("data-rendering", "active");
  expect(
    await host
      .locator("canvas")
      .evaluate((el) => !!(el as HTMLCanvasElement).getContext("webgl2")),
  ).toBe(true);
  const group = page.getByRole("group", { name: "3D 앱 미리보기 모드" });
  for (const [index, name] of ["듣기", "독해", "단어"].entries()) {
    const button = group.getByRole("button", { name, exact: true });
    await button.focus();
    await page.keyboard.press("Enter");
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(showcase).toHaveAttribute("data-selected-mode", String(index));
    await expect(host).toHaveAttribute("data-mode", String(index));
  }
  const box = await host.boundingBox();
  if (!box) throw new Error("Missing stage");
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width + 80, box.y + box.height / 2, {
    steps: 15,
  });
  await expect
    .poll(async () => Number(await host.getAttribute("data-drag-rotation")))
    .toBeGreaterThan(0.35);
  expect(Number(await host.getAttribute("data-rotation"))).toBeLessThanOrEqual(
    (Math.PI * 25) / 180 + 0.001,
  );
  await page.mouse.up();
  await expect
    .poll(async () =>
      Math.abs(Number(await host.getAttribute("data-drag-rotation"))),
    )
    .toBeLessThan(0.015);
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x - 100, box.y + box.height / 2, { steps: 12 });
  await expect
    .poll(async () => Number(await host.getAttribute("data-drag-rotation")))
    .toBeLessThan(-0.35);
  expect(
    Number(await host.getAttribute("data-rotation")),
  ).toBeGreaterThanOrEqual((-Math.PI * 25) / 180 - 0.001);
  await page.mouse.up();
  await page.evaluate(() => window.scrollTo({ top: 380, behavior: "instant" }));
  await expect
    .poll(async () => Number(await host.getAttribute("data-scroll")))
    .toBeGreaterThan(0.1);
  await page.evaluate(() =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }),
  );
  await expect(host).toHaveAttribute("data-rendering", "paused");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(host).toHaveAttribute("data-rendering", "active");
  expect(errors).toEqual([]);
});

test("motion preference prevents 3D loading and reacts to live changes", async ({
  page,
}) => {
  const chunks: string[] = [];
  page.on("request", (r) => {
    if (r.url().includes("hero-scene-")) chunks.push(r.url());
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  await expect(page.locator(".showcase-fallback")).toBeVisible();
  await expect(page.locator(".showcase-canvas canvas")).toHaveCount(0);
  await page
    .getByRole("group", { name: "3D 앱 미리보기 모드" })
    .getByRole("button", { name: "단어", exact: true })
    .click();
  await expect(page.locator(".showcase-fallback")).toContainText("MY WORDS");
  expect(chunks).toEqual([]);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator(".hero-showcase")).toHaveAttribute(
    "data-state",
    "ready",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".showcase-canvas canvas")).toHaveCount(0);
  await expect(page.locator(".showcase-fallback")).toContainText("MY WORDS");
});

test("privacy never requests 3D modules or textures", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", (r) => requests.push(r.url()));
  await page.goto("privacy/");
  await expect(page.getByRole("heading", { name: "개인정보처리방침", exact: true })).toBeVisible();
  expect(
    requests.filter(
      (url) => url.includes("hero-scene-") || url.includes("/showcase/"),
    ),
  ).toEqual([]);
});

test("unsupported WebGL keeps the static phone and working controls", async ({
  page,
}) => {
  await page.addInitScript(
    `const original = HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext = function(type, ...args) { if (type === 'webgl2' || type === 'webgl' || type === 'experimental-webgl') return null; return original.call(this, type, ...args); };`,
  );
  await page.goto("./");
  await expect(page.locator(".hero-showcase")).toHaveAttribute(
    "data-state",
    "fallback",
  );
  await page
    .getByRole("group", { name: "3D 앱 미리보기 모드" })
    .getByRole("button", { name: "독해", exact: true })
    .click();
  await expect(page.locator(".showcase-fallback")).toContainText("completed");
});

for (const resource of [
  "**/assets/hero-scene-*.js",
  "**/showcase/listening.svg",
]) {
  test(`failed resource uses static fallback: ${resource}`, async ({
    page,
  }) => {
    await page.route(resource, (route) => route.abort());
    await page.goto("./");
    await expect(page.locator(".hero-showcase")).toHaveAttribute(
      "data-state",
      "fallback",
    );
    await expect(page.locator(".showcase-fallback")).toBeVisible();
    await expect(page.locator(".showcase-canvas canvas")).toHaveCount(0);
  });
}

test("lost WebGL context disposes scene and preserves page navigation", async ({
  page,
}) => {
  await page.goto("./");
  await expect(page.locator(".hero-showcase")).toHaveAttribute(
    "data-state",
    "ready",
  );
  await page.locator(".showcase-canvas canvas").evaluate((el) => {
    const gl = (el as HTMLCanvasElement).getContext("webgl2");
    const lose = gl?.getExtension("WEBGL_lose_context");
    if (!lose) throw new Error("WebGL context loss extension missing");
    lose.loseContext();
  });
  await expect(page.locator(".hero-showcase")).toHaveAttribute(
    "data-state",
    "fallback",
  );
  await expect(page.locator(".showcase-canvas canvas")).toHaveCount(0);
  await page.getByRole("link", { name: "앱 미리보기", exact: true }).click();
  await expect(page).toHaveURL(/#preview$/);
});

test("mobile touch scroll remains native over the 3D canvas", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/");
  await expect(page.locator(".hero-showcase")).toHaveAttribute(
    "data-state",
    "ready",
  );
  await page.evaluate(() => window.scrollTo({ top: 350, behavior: "instant" }));
  const canvas = page.locator(".showcase-canvas canvas");
  expect(await canvas.evaluate((el) => getComputedStyle(el).touchAction)).toBe(
    "pan-y",
  );
  const bounds = await canvas.boundingBox();
  if (!bounds) throw new Error("Missing mobile canvas");
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

test("visibility lifecycle pauses and resumes the render loop", async ({
  page,
}) => {
  await page.goto("./");
  const host = page.locator(".showcase-canvas");
  await expect(host).toHaveAttribute("data-rendering", "active");
  // Deterministic lifecycle simulation: headless tabs need not become hidden.
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(host).toHaveAttribute("data-rendering", "paused");
  await page.evaluate(() => {
    Reflect.deleteProperty(document, "hidden");
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(host).toHaveAttribute("data-rendering", "active");
});
