# TOE-PICK 소개 웹사이트

React **19.3.0** · TypeScript · Vite **8.3.0** · Three.js **0.186.0** 기반 한국어 정적 소개 사이트. React와 React DOM은 같은 버전으로 고정한다. 서버 런타임·API·회원가입·방문 분석 없이 동작한다.

## 구현

- 노랑 `#FFD43B`·주황 `#FF873C`·민트·보라를 사용한 비비드 디자인. 실제 토끼 아이콘과 코드로 만든 입체 폰·카세트·별·단어 카드.
- 첫 화면 가로 드래그로 폰을 좌우 최대 25도 회전하고, 듣기·독해·단어 버튼으로 화면과 주변 배치를 변경한다. 마우스와 자연 스크롤에 반응하며 모바일 세로 스크롤을 유지한다.
- 기존 화면 미리보기의 짧은 전환, 마우스 카드 기울기, 버튼 눌림 반응. 자동 음성은 재생하지 않는다.
- Part 2 듣기 10문제·Part 5 독해 20문제, 한국어 해설·단어 즐겨찾기·이어풀기·학습 기록 소개.
- 홈·문제·단어·기록 미리보기 탭. 소개용 예시이며 실제 앱 데이터와 연결되지 않는다.
- iOS·Android 모두 출시 준비 중. 문의: northface · jkgjms2@gmail.com.
- `/`와 `/privacy/`는 빌드 시 React에서 HTML로 생성하므로 JavaScript 없이도 소개와 개인정보 본문을 읽을 수 있다. 미리보기 탭 전환은 JavaScript를 사용한다.
- 개인정보처리방침은 저장된 풀이 시간·기기 설정·Supabase 음성 저장·Speechify/Cartesia·LangSmith 설명을 현재 프로젝트 구현과 대조해 갱신했다. 고정 보관 기간·자동 삭제 정책은 새로 만들지 않았다.

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
- `src/app-preview.tsx`, `src/phone-preview.tsx`: 키보드 접근 가능한 미리보기와 예시 화면.
- `src/hero-showcase.tsx`, `src/three/`: Three.js 지연 로드·렌더링 수명 주기·기본 도형 생성. `public/showcase/`는 로컬 SVG 화면 텍스처다.
- `src/privacy.tsx`, `src/styles.css`, `src/showcase.css`: 개인정보 본문과 반응형·비비드 스타일.
- `dist/`: 정적 빌드. `docs/`: GitHub Pages 게시용 동일 결과물과 `.nojekyll`, 404 페이지.
- `scripts/prepare-pages.mjs`: 정적 본문·하위 경로·이미지/CSS/JS/내부 링크 존재를 검사한 후 `docs/` 갱신.

공개 주소는 `https://toepick.minlabs.app/`, 개인정보 주소는 `https://toepick.minlabs.app/privacy/`다. GitHub Pages의 main `/docs` 게시 설정을 API로 확인했다. 이 저장소의 main에 소스와 `docs/`를 함께 푸시하면 Pages 배포가 실행된다. 상위 프로젝트 안에서 website는 독립 Git 저장소이므로 이 저장소를 먼저 푸시하고 상위 저장소의 참조를 갱신한다. 배포 성공 여부는 GitHub Pages 실행 이력과 공개 페이지로 확인한다.

배포 경로는 `/`이며 다른 경로를 쓰려면 Vite base, `src/site-config.ts`, 배포 검증 스크립트의 경로를 함께 변경해야 한다. HTML을 파일로 직접 열지 말고 HTTP 정적 서버로 확인한다. 이전 Sites 등록 파일은 과거 기록이며 이 사이트의 빌드·배포에서는 사용하지 않는다.

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
