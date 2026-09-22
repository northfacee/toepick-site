import { cp, readFile, rm, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";
const root = resolve("dist");
for (const page of ["index.html", "privacy/index.html"]) {
  const html = await readFile(join(root, page), "utf8");
  if (
    !html.includes("TOE-PICK") ||
    (page.startsWith("privacy") && (!html.includes("정보의 열람") || !html.includes('id="privacy-en"') || !html.includes("Privacy Policy")))
  )
    throw new Error(`Missing static content: ${page}`);
  for (const [, url] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    if (/^(https?:|mailto:|#)/.test(url)) continue;
    if (!url.startsWith("/") || url.startsWith("//"))
      throw new Error(`Invalid Pages URL: ${url}`);
    let path = url.slice("/".length).split("#")[0];
    if (!path || path.endsWith("/")) path += "index.html";
    await readFile(join(root, path));
  }
}
if ((await readFile(join(root, "CNAME"), "utf8")).trim() !== "toepick.minlabs.app") throw new Error("Missing custom domain");
if ((await readFile(join(root, "app-ads.txt"), "utf8")).trim() !== "google.com, pub-2342703309055057, DIRECT, f08c47fec0942fa0") throw new Error("Missing AdMob app-ads.txt entry");
await writeFile(join(root, ".nojekyll"), "");
await writeFile(
  join(root, "404.html"),
  '<!doctype html><html lang="ko"><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>페이지를 찾을 수 없습니다 | TOE-PICK</title><h1>페이지를 찾을 수 없습니다.</h1><a href="/">TOE-PICK 홈으로</a></html>',
);
await rm("docs", { recursive: true, force: true });
await cp(root, "docs", { recursive: true });
console.log(
  "Static content, Pages paths and local assets verified. Output: dist/ and docs/",
);
