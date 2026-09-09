import Link from 'next/link';
import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: {
    default: 'ToePick — 하루 20문제, 가벼운 영어 습관',
    template: '%s | ToePick',
  },
  description:
    '회원가입 없이 시작하는 TOEIC Part 5 연습. 하루 20문제, 한국어 해설과 나만의 복습 기록.',
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <a className="skip" href="#main">
          본문으로 이동
        </a>
        <header className="nav">
          <Link className="brand" href="/">
            ToePick<span className="brand-dot">.</span>
          </Link>
          <nav aria-label="주 메뉴">
            <Link href="/#practice">앱 소개</Link>
            <Link href="/privacy">개인정보처리방침</Link>
          </nav>
        </header>
        {children}
        <footer>
          <Link className="brand" href="/">
            ToePick.
          </Link>
          <p>매일 조금씩, 영어가 내 편이 되는 시간.</p>
          <div className="footer-links">
            <Link href="/privacy">개인정보처리방침</Link>
            <a href="mailto:jkgjms2@gmail.com">문의하기 ↗</a>
          </div>
          <small>© 2026 northface · ToePick</small>
        </footer>
      </body>
    </html>
  );
}
