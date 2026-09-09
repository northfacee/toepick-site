# ToePick 소개 웹사이트

앱 소개와 개인정보처리방침을 제공하는 한국어 정적 웹사이트.

- 소개: https://northfacee.github.io/toepick-site/
- 개인정보처리방침: https://northfacee.github.io/toepick-site/privacy/
- 운영자: northface · jkgjms2@gmail.com

## 수정 및 배포

`npm ci` → `npm run build` → `node scripts/prepare-pages.mjs` → 변경한 소스와 `docs/`를 main에 push한다.
GitHub Pages의 main `/docs` 게시 소스를 사용한다. 내보낸 HTML과 CSS만 게시하며 JavaScript 없이 모든 내용과 탐색 링크를 사용할 수 있다.

## 검증 (2026-09-10)

- 정적 빌드: 홈·개인정보처리방침·404 생성 확인.
- TypeScript 검사와 `oxlint app`: 통과.
- 생성된 HTML의 개인정보 필수 문구·스타일 파일·내부 링크 경로 검사: 통과.
- 전체 lint에는 사용하지 않는 기본 Shadcn 구성 요소의 기존 오류가 있으며 수정하지 않았다.
- 브라우저 화면·모바일 실제 기기 수동 검증은 수행하지 않았다.

현재 서버 보관 기간·정기 삭제 기능은 미설정이다. 방침은 이 상태를 반영한다. 앱 서버 배포 구성·수집 범위·보관 및 삭제 정책 변경 시 방침을 함께 갱신한다.

Sites 초기 등록 뒤 조회·공개 설정 요청이 `project_not_found`로 실패해 GitHub Pages로 배포한다. 로컬 `.openai/hosting.json`은 해당 등록 ID 보존용이며 이 저장소의 배포에는 사용하지 않는다.
