import { test, expect } from "@playwright/test";

const origin = `http://127.0.0.1:${process.env.PLAYWRIGHT_PORT || "4173"}/`;

for (const width of [360, 768, 1440]) {
  test(`responsive layout and preview at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const requests: string[] = [];
    page.on("request", (r) => {
      if (!r.url().startsWith(origin)) requests.push(r.url());
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
  await page.goto(`${origin}privacy/`);
  await page.reload();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await expect(
    page.getByRole("heading", { name: "개인정보처리방침", exact: true }),
  ).toBeVisible();
  await expect(page.locator("main")).toContainText("Speechify");
  await expect(page.locator("main")).toContainText("LangSmith");
  await expect(
    page.getByRole("heading", { name: "Privacy Policy", exact: true }),
  ).toBeVisible();
  await expect(page.locator("#privacy-en")).toContainText("Google Mobile Ads");
  await expect(page.locator("#privacy-en")).toContainText(
    "no scheduled automatic deletion",
  );
  await page.getByRole("link", { name: "English", exact: true }).click();
  await expect(page).toHaveURL(/privacy\/#privacy-en$/);
  await page.getByRole("link", { name: "日本語", exact: true }).click();
  await expect(page).toHaveURL(/privacy\/#privacy-ja$/);
  await expect(
    page.getByRole("heading", { name: "プライバシーポリシー", exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "← Back to ToePick" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "매일 듣고",
  );
  await context.close();
});

for (const width of [360, 768, 1440]) {
  test(`English and Japanese responsive layout and preview at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const requests: string[] = [];
    page.on("request", (r) => {
      if (!r.url().startsWith(origin)) requests.push(r.url());
    });

    await page.goto(`${origin}en/`);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Listen daily",
    );
    for (const tab of ["Home", "Question", "Words", "History"]) {
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

    await page.goto(`${origin}jp/`);
    await expect(page.locator("html")).toHaveAttribute("lang", "ja");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "毎日聴いて",
    );
    for (const tab of ["ホーム", "問題", "単語", "記録"]) {
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
  });
}

test("localized language switchers, store links and privacy routes without JS", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.setViewportSize({ width: 390, height: 844 });

  await page.goto(origin);
  await page.locator(".site-header .lang-switch a[lang='en']").click();
  await expect(page).toHaveURL(/\/en\/$/);
  await expect(
    page
      .getByRole("link", {
        name: "Download on the App Store (opens in a new tab)",
        exact: true,
      })
      .first(),
  ).toHaveAttribute("href", "https://apps.apple.com/us/app/id6810698104");
  await expect(
    page
      .getByRole("link", {
        name: "Get it on Google Play (opens in a new tab)",
        exact: true,
      })
      .first(),
  ).toHaveAttribute(
    "href",
    "https://play.google.com/store/apps/details?id=com.toepick&hl=en",
  );

  await page.getByRole("link", { name: "Privacy Policy", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/privacy\/$/);
  await expect(
    page.locator(".policy-language-section").first(),
  ).toHaveAttribute("id", "privacy-en");

  await page.locator(".site-header .lang-switch a[lang='ja']").click();
  await expect(page).toHaveURL(/\/jp\/privacy\/$/);
  await expect(
    page.locator(".policy-language-section").first(),
  ).toHaveAttribute("id", "privacy-ja");
  await page.getByRole("link", { name: "← ToePick 紹介ページへ戻る" }).first().click();
  await expect(page).toHaveURL(/\/jp\/$/);
  await expect(
    page
      .getByRole("link", {
        name: "App Storeからダウンロード（新しいタブ）",
        exact: true,
      })
      .first(),
  ).toHaveAttribute("href", "https://apps.apple.com/jp/app/id6810698104");
  await expect(
    page
      .getByRole("link", {
        name: "Google Playで手に入れよう（新しいタブ）",
        exact: true,
      })
      .first(),
  ).toHaveAttribute(
    "href",
    "https://play.google.com/store/apps/details?id=com.toepick&hl=ja",
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
  await expect(
    page.getByText(/COMING SOON|출시 준비 중|곧 앱에서 만나요/i),
  ).toHaveCount(0);
  const downloads = page.getByRole("link", {
    name: "App Store에서 다운로드 (새 창)",
    exact: true,
  });
  await expect(downloads).toHaveCount(2);
  await expect(downloads.first()).toHaveAttribute(
    "href",
    "https://apps.apple.com/kr/app/id6810698104",
  );
  await expect(
    page
      .getByRole("link", {
        name: "Google Play에서 다운로드 (새 창)",
        exact: true,
      })
      .first(),
  ).toHaveAttribute(
    "href",
    "https://play.google.com/store/apps/details?id=com.toepick&hl=ko",
  );
  await expect(page.locator(".listening-parts")).toContainText("담화");
  await page.getByRole("tab", { name: "기록", exact: true }).click();
  await expect(page.locator(".record-scores")).toContainText("Part 4");
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
