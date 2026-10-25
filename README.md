# TOE-PICK 소개 웹사이트

React **19.3.0** · TypeScript · Vite **8.3.0** 기반 한국어·영어·일본어 정적 소개 사이트. React와 React DOM은 같은 버전으로 고정한다. 서버 런타임·API·회원가입·방문 분석 없이 동작한다.

## 한국어·영어·일본어 정적 다국어 지원 및 2D 히어로 쇼케이스 전환 (2026-10-25)

- **첫 화면 히어로 쇼케이스를 2D 정적 폰 미리보기로 전환 및 3D 코드 완전 제거 (`src/hero-showcase.tsx`, `tests/showcase.spec.ts`)**:
  - 초기 렌더링 직후 Three.js/WebGL 캔버스로 교체되면서 발생하던 약 0.1초간의 2D→3D 화면 전환 깜빡임을 없애기 위해 `src/three/`, `public/showcase/`, `three` 패키지 의존성 및 3D 캔버스/드래그 스타일을 완전히 제거하고, 첫 화면에서 즉시 선명한 2D 휴대폰 프리뷰(`Phone`)만 표시하도록 단순화했다.
  - 상단 `[듣기] [독해] [단어]` (`Listening` / `Reading` / `Words`, `リスニング` / `リーディング` / `単語`) 모드 전환 버튼은 그대로 유지하며, `독해`·`단어` 화면의 휴대폰 크기(`width`·`height`)도 `듣기` 휴대폰 크기(`250px × 534px`, `.phone-content` `418px`)와 1px 오차 없이 동일하게 맞췄다.
- **언어별 정적 경로 6종 프리렌더링 (`scripts/render.tsx`, `vite.config.ts`, `scripts/prepare-pages.mjs`)**:
  - 한국어(기본): `/` (`index.html`), `/privacy/` (`privacy/index.html`)
  - 영어: `/en/` (`en/index.html`), `/en/privacy/` (`en/privacy/index.html`)
  - 일본어: `/ja/` (`ja/index.html`), `/ja/privacy/` (`ja/privacy/index.html`)
  - 모든 경로는 빌드 시 React SSR(`renderToString`)로 정적 HTML을 생성해 JavaScript 없이도 각 언어의 본문, `<html lang="ko|en|ja">`, `<title>`, `<meta name="description">`, `og:locale`(`ko_KR`/`en_US`/`ja_JP`), `<link rel="alternate" hreflang="...">`를 제공한다.
- **랜딩 페이지·폰 미리보기·스토어 링크 현지화 (`src/i18n.ts`, `src/site-config.ts`)**:
  - 상단 헤더와 하단 푸터에 언어 전환 내비게이션(`KO` / `EN` / `JP`)을 추가했다.
  - 첫 화면, 루틴 스트립, 파트별 소개(Listening Part 2·3·4, Reading Part 5), 복습 카드 3종, 인터랙티브 앱 미리보기(4개 탭 × 폰 화면 5종), 하단 이메일 문의·복사 컴포넌트를 한·영·일 3개 언어로 제공한다.
  - App Store(`kr`/`us`/`jp`)와 Google Play(`hl=ko`/`en`/`ja`) 다운로드 링크를 각 언어에 맞게 연결한다.
- **개인정보처리방침 일본어(`src/privacy-ja.tsx`, `#privacy-ja`) 추가**:
  - 한국어(`#privacy-ko`)·영어(`#privacy-en`)와 동일한 범위의 일본어(`#privacy-ja`, `プライバシーポリシー`) 개인정보처리방침을 추가하고, `/privacy/`, `/en/privacy/`, `/ja/privacy/` 진입 시 해당 언어 섹션을 최상단에 배치한다.
- **검증**: `npm run typecheck`, `npm run lint`, `npm run build`(`prepare-pages.mjs` 6개 경로·에셋·내부 링크·`CNAME`·`app-ads.txt` 검증 포함), Playwright Chromium 테스트 **14개 통과**(`PLAYWRIGHT_PORT=4179 npm test`).

## 구현

- 현행 앱의 핑크·민트·라벤더·라임 팔레트와 토끼 아이콘. 얇은 그래파이트 프레임의 입체 폰, 작은 별, 부드러운 접지 그림자로 정리한 첫 화면.
- 첫 화면 가로 드래그로 폰을 좌우 최대 25도 회전하고, 듣기·독해·단어 버튼으로 화면을 변경한다. 기본 기울기·부유 폭·마우스·스크롤 반응을 줄이고 화면을 가리던 카세트·단어 카드는 제거했다. 마우스와 자연 스크롤에 반응하며 모바일 세로 스크롤을 유지한다.
- 기존 화면 미리보기의 짧은 전환과 버튼 반응. 자동 음성은 재생하지 않는다.
- Part 2 질문·응답 10문제·Part 3 대화 3문제·Part 4 담화 3문제와 Part 5 독해 20문제, 한국어 해설·단어 즐겨찾기·이어풀기·파트별 정답/오답 기록 소개.
- 홈·문제·단어·기록 미리보기 탭. 소개용 예시이며 실제 앱 데이터와 연결되지 않는다.
- iOS·Android 정식 출시 안내와 실제 스토어 다운로드 링크를 첫 화면·하단에 제공한다. 공개 스토어 주소의 HTTP 200과 ToePick 앱 이름을 확인했다(2026-10-20). 공통 하단에서 문의 이메일 support@minlabs.app을 읽고 선택·복사할 수 있다. 소개 영역의 중복 문의 링크는 제거했다.
- `/`와 `/privacy/`는 빌드 시 React에서 HTML로 생성하므로 JavaScript 없이도 소개와 한국어·영어 개인정보 본문을 읽을 수 있다. 언어 링크는 두 본문으로 이동한다. 미리보기 탭 전환은 JavaScript를 사용한다.
- 개인정보처리방침은 사용자가 지정한 App Privacy Policy Generator의 초안 구조를 참고하되, 저장소의 실제 구현에 맞게 한국어 본문을 갱신하고 같은 내용을 영어로 제공한다. 생성기의 임의 보관 기간·AI 개인화·법률상 보장 문구는 사실로 확인되지 않아 사용하지 않았다. 저장된 풀이 시간·기기 설정·Supabase 음성 저장·Speechify/Cartesia·LangSmith와 Google Mobile Ads의 UMP·ATT·광고 식별자 처리를 설명하며 고정 보관 기간·자동 삭제 정책은 새로 만들지 않았다.

## 실행

Node.js 22.13 이상에서 이 디렉터리를 기준으로 실행한다.

```sh
npm ci
npm run dev
```

개발 주소: `http://127.0.0.1:5173/`.

```sh
npm run typecheck
npm run lint
npm run build
npm run preview
```

빌드는 `scripts/render.tsx`로 두 HTML 진입점을 만든 뒤 Vite로 에셋을 번들링한다. 생성된 `index.html`, `privacy/index.html`은 직접 편집하지 않고 `src/`를 수정한다. React 서버 렌더링 모듈은 빌드 도구에서만 사용하며 배포 시 Node 서버는 필요하지 않다.

## 구조와 배포

- `src/app.tsx`: 소개와 공통 헤더·푸터.
- `src/store-links.tsx`, `src/site-config.ts`: 공통 스토어 다운로드 버튼과 플랫폼별 URL.
- `src/support-contact.tsx`: 이메일 주소와 복사 버튼, 성공·실패 안내. JavaScript 없이도 주소는 정적 HTML로 제공한다.
- `src/app-preview.tsx`, `src/phone-preview.tsx`: 키보드 접근 가능한 미리보기와 예시 화면.
- `src/hero-showcase.tsx`, `src/three/`: Three.js 지연 로드·렌더링 수명 주기·기본 도형 생성. `public/showcase/`는 로컬 SVG 화면 텍스처다.
- `src/privacy.tsx`, `src/privacy-en.tsx`, `src/styles.css`, `src/showcase.css`: 한국어·영어 개인정보 본문과 반응형·비비드 스타일.
- `dist/`: 정적 빌드. `docs/`: GitHub Pages 게시용 동일 결과물과 `.nojekyll`, 404 페이지.
- `scripts/prepare-pages.mjs`: 정적 본문·하위 경로·이미지/CSS/JS/내부 링크 존재를 검사한 후 `docs/` 갱신.
- `public/app-ads.txt`: AdMob 계정의 공식 게시자 문구. 빌드 시 `docs/app-ads.txt`로 복사되며 공개 루트 `/app-ads.txt`에 게시한다. 스토어 개발자 웹사이트 주소도 `https://toepick.minlabs.app/`으로 연결해야 AdMob이 확인할 수 있다.

공개 주소는 `https://toepick.minlabs.app/`, 개인정보 주소는 `https://toepick.minlabs.app/privacy/`다. GitHub Pages의 main `/docs` 게시 설정을 API로 확인했다. 이 저장소의 main에 소스와 `docs/`를 함께 푸시하면 Pages 배포가 실행된다. 상위 프로젝트 안에서 website는 독립 Git 저장소이므로 이 저장소를 먼저 푸시하고 상위 저장소의 참조를 갱신한다. 배포 성공 여부는 GitHub Pages 실행 이력과 공개 페이지로 확인한다.

배포 경로는 `/`이며 다른 경로를 쓰려면 Vite base, `src/site-config.ts`, 배포 검증 스크립트의 경로를 함께 변경해야 한다. HTML을 파일로 직접 열지 말고 HTTP 정적 서버로 확인한다. 이전 Sites 등록 파일은 과거 기록이며 이 사이트의 빌드·배포에서는 사용하지 않는다.

## 출시 후 소개 사이트 개편 (2026-10-20)

출시 예정·COMING SOON 문구를 제거하고 첫 화면과 하단에 App Store·Google Play 다운로드를 제공한다. 현재 앱 아이콘, Listening Part 2·3·4와 Reading Part 5, 파트별 기록을 반영하고 핑크·민트·라벤더·라임으로 디자인을 정리했다. 듣기 플레이어는 앱의 MIXTAPE 파형을 사용한다. 3D 전경의 큰 카세트·단어 카드·회전 링을 제거하고 얇은 기기 테두리·작은 별·부드러운 접지 그림자와 작은 움직임으로 조정했다. 3D 지연 로드·모션 줄이기·오류 대체·수명 주기를 유지한다. 미리보기는 소개용 예시이며 실제 개인 기록·음성과 연결되지 않는다.

검증: TypeScript 검사, 정적 빌드·Pages 경로/파일 검사, Chromium Playwright 15개 통과. 360·768·1440px 넘침 없음, 키보드 탭 이동, 다운로드 링크, Part 4 기록, WebGL 드래그 한도/복귀·모바일 세로 스크롤·화면 밖 중단/재개·모션 설정 변경·텍스처/모듈 실패·컨텍스트 손실 대체를 확인했다. 1440px 데스크톱 및 390px 모바일의 실제 렌더링 스크린샷을 시각 확인했다. 기존 Expo Observe 한국어·영어 개인정보 설명의 로컬 수정은 보존했다. iOS Safari·Android 실기기 확인과 실제 스토어 앱 설치는 수행하지 않았다. 3D 분리 번들에 대한 기존 500KB 크기 경고는 남아 있다.

## 검증 (2026-09-21)

실행 완료:

- `npm run typecheck`, `npm run lint`, `npm run build` 통과.
- Playwright Chromium 테스트 **15개 통과** (`npm test`).
- 360·768·1440px에서 네 탭 전환, 가로 넘침 없음, 브라우저 실행 오류·외부 요청 없음 확인.
- 방향키·Home·End 탐색, 선택 탭 포커스, `prefers-reduced-motion` 확인.
- 개인정보 직접 접속·새로고침·홈 복귀를 JavaScript 비활성 상태에서 확인.
- 페이지 링크·이미지 로딩·스토어 출시 준비 표시 확인.
- 실제 WebGL2 장면, 듣기·독해·단어 선택, 양방향 회전 상한·원위치 복귀와 스크롤 반응 확인.
- 화면 밖 렌더링 중단·재개 및 `visibilitychange` 수명 주기 시뮬레이션 통과.
- 모션 줄이기에서는 3D 모듈 요청 없음, 실행 중 설정 변경 시 캔버스 정리와 정적 모드 전환 확인.
- 개인정보에서 3D 모듈·텍스처 요청 없음 확인. WebGL 미지원, 3D 모듈/텍스처 로딩 실패, 실제 컨텍스트 손실에서 정적 폰 대체 확인.
- Google Mobile Ads·UMP·ATT·광고 시도 기록 설명 반영 후 타입 검사·린트·정적 빌드와 Playwright 15개 테스트 통과.
- 2026-09-22: 생성기 초안을 실제 구현에 맞게 보정한 한국어·영어 개인정보처리방침을 같은 `/privacy/` HTML에 게시하도록 구성했다. 360px에서 JavaScript 없이 두 언어 표시·앵커 이동·가로 넘침 없음을 확인했고 타입 검사·린트·빌드·Playwright 15개 테스트를 통과했다. 실제 공개 배포 결과는 별도로 확인한다.
- Chromium 모바일 터치 에뮬레이션으로 캔버스 위 세로 스와이프가 실제 페이지를 스크롤하는지 확인.
- 생성한 모바일·데스크톱 스크린샷으로 화면 구성 확인. `outputs/`는 로컬 검증 자료이며 Git 제외.

최초 브라우저 테스트 준비: `npx playwright install chromium`. 테스트는 4173 포트에서 정적 미리보기를 사용하므로 먼저 빌드한다.

위 목록은 로컬 검증 결과다. 2026-09-21 추가 요청으로 커밋·푸시와 기존 GitHub Pages 배포를 진행한다. iOS Safari/Android 실기기 검증은 수행하지 않았다. 운영 환경의 데이터 보관 정책·외부 제공업체 설정을 새로 검증하거나 변경한 작업은 아니다.

## 3D 성능과 대체 화면

Three.js는 홈 첫 화면이 가까워질 때만 동적으로 로드한다. 기본 HTML에는 정적 폰을 포함하며, 로딩 완료 후 3D로 교체한다. 모션 줄이기 사용자는 처음부터 3D 모듈을 요청하지 않는다. 모든 상태에서 듣기·독해·단어 선택을 사용할 수 있으며 JavaScript 비활성 시 선택 버튼은 비활성화된다.

화면 밖/비활성 문서에서는 requestAnimationFrame을 중단한다. DPR은 1.5 이하, 별도 후처리·외부 3D 모델·CDN 요청은 없다. 해제 시 이벤트·옵서버·geometry·material·texture·renderer를 정리하며, 늦게 완료된 텍스처도 폐기한다.

3D 동적 번들은 현재 약 571 KB, gzip 약 145 KB라 Vite 기본 500 KB 경고가 출력된다. 이 번들은 초기 공통 JS와 분리되어 있으며 개인정보·모션 줄이기 환경에서는 로드되지 않는다. 실제 모바일 기기의 GPU 성능·배터리 소모와 Safari 검증은 미수행이다.

## 커스텀 도메인 연결 (2026-09-21)

`public/CNAME`의 toepick.minlabs.app을 dist와 docs에 복사하고 빌드 검증에서 확인한다. Cloudflare CNAME toepick → northfacee.github.io (DNS only, TTL Auto), GitHub Pages 커스텀 도메인 설정으로 연결한다. 이 절차의 실제 공개 검증 결과는 상위 프로젝트 README의 배포 기록을 따른다.

## 개인정보 설명 갱신 (2026-09-30)
한국어·영어 개인정보처리방침에 Sentry 오류 진단, PostHog 익명 화면·학습·광고 이벤트, Firebase Analytics 자동 앱·광고 지표 처리를 반영했다. 분석 SDK가 적용되지 않았다는 과거 설명을 제거하고 세션 재생·터치 자동 수집 비활성 및 문제·답안·토큰을 이벤트 속성에 넣지 않는 구현을 설명한다. 소스와 기존에 생성된 privacy/index.html·docs/ 게시 산출물을 함께 버전 관리한다. 이번 커밋 정리에서 추가 빌드·브라우저 테스트·공개 페이지 검증은 실행하지 않았다.

## 이메일 연락처·복사 안내 (2026-09-30)

문의 주소는 공통 하단에 텍스트로 표시하고 사용자 동작으로만 복사한다. 복사가 차단되면 직접 선택·복사를 안내한다. JavaScript 비활성 상태에서는 주소를 읽고 선택할 수 있고 복사 버튼은 비활성화된다. 홈페이지의 소개 영역에 있던 중복 문의 링크는 제거했다.

검증: 타입 검사·린트·빌드·기존 Playwright 15개 테스트 통과. 별도 브라우저 확인에서 360·768·1440px 가로 넘침 없음, 실제 클립보드에 정확한 이메일 복사, 복사 실패 안내, 개인정보 페이지 하단 복사, JavaScript 없이 두 페이지의 연락처 표시를 확인했다. 게시용 docs와 정적 HTML을 갱신했다. 공개 반영 여부는 GitHub Pages 실행 결과와 운영 페이지의 이메일 복사 동작으로 확인한다.
