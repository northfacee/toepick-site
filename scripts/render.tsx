import { mkdir, writeFile } from "node:fs/promises";
import { renderToString } from "react-dom/server";
import { App } from "../src/app";
import { BASE } from "../src/site-config";
await mkdir("privacy", { recursive: true });
for (const privacy of [false, true]) {
  const title = privacy
    ? "개인정보처리방침 | TOE-PICK"
    : "TOE-PICK — 매일 듣고, 풀고, 내 것으로.";
  const description = privacy
    ? "TOE-PICK의 정보 처리, 외부 서비스, 보관 및 삭제 안내."
    : "회원가입 없이 시작하는 토익 루틴. Part 2 듣기 10문제, Part 5 독해 20문제와 한국어 해설, 나만의 단어장과 학습 기록.";
  await writeFile(
    privacy ? "privacy/index.html" : "index.html",
    `<!doctype html>\n<html lang="ko"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><meta name="theme-color" content="#faf9f5"/><title>${title}</title><meta name="description" content="${description}"/><meta property="og:title" content="${title}"/><meta property="og:description" content="${description}"/><meta property="og:type" content="website"/><meta property="og:locale" content="ko_KR"/><link rel="icon" href="${BASE}app-icon.png"/><link rel="stylesheet" href="/src/styles.css"/><link rel="stylesheet" href="/src/showcase.css"/></head><body data-page="${privacy ? "privacy" : "home"}"><div id="root">${renderToString(<App privacy={privacy} />)}</div><script type="module" src="/src/main.tsx"></script></body></html>\n`,
  );
}
