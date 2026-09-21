import {
  ArrowUpRight,
  ArrowRight,
  Headphones,
  BookOpen,
  Star,
  Check,
  Play,
  CalendarDays,
  Volume2,
  MoveUpRight,
  Smartphone,
  Pause,
} from "lucide-react";
import { useRef } from "react";
import { HeroShowcase } from "./hero-showcase";
import { useCardTilt } from "./use-card-tilt";
import { Preview } from "./app-preview";
import { Privacy } from "./privacy";
import { BASE } from "./site-config";

function Brand() {
  return (
    <a className="brand" href={BASE} aria-label="TOE-PICK 홈">
      <img src={`${BASE}app-icon.png`} alt="" width="38" height="38" />
      <span>
        TOE-PICK<span className="brand-star">✳</span>
      </span>
    </a>
  );
}
function Cassette() {
  return (
    <div className="cassette" aria-hidden="true">
      <div className="cassette-top">
        <span>TOE-PICK MIX</span>
        <span>VOL. 02</span>
      </div>
      <div className="cassette-window">
        <span className="reel">✳</span>
        <div className="tape-lines" />
        <span className="reel">✳</span>
      </div>
      <div className="cassette-bottom">
        <span>SIDE A / DAILY LISTENING</span>
        <Volume2 size={16} />
      </div>
    </div>
  );
}
function Landing() {
  const main = useRef<HTMLElement>(null);
  useCardTilt(main);
  return (
    <main id="main" ref={main}>
      <section className="hero section-wrap">
        <div className="hero-copy">
          <div className="hero-badge">
            <span /> A LITTLE EVERY DAY
          </div>
          <h1>
            매일 듣고,
            <br />
            풀고,{" "}
            <span className="highlight">
              내 것으로
              <svg viewBox="0 0 350 20" aria-hidden="true">
                <path d="M5 13 Q170 -2 343 9 M22 19 Q182 4 323 17" />
              </svg>
            </span>
            <span className="hero-period">.</span>
          </h1>
          <p className="hero-description">
            거창한 계획보다, 오늘의 작은 한 문제.
            <br />
            듣기부터 독해까지 나만의 토익 루틴을 만들어봐요.
          </p>
          <a className="button primary" href="#preview">
            앱 미리보기 <ArrowUpRight size={21} />
          </a>
          <div className="hero-meta">
            <span>
              <Check size={15} /> 회원가입 없이
            </span>
            <span>
              <Check size={15} /> 나만의 학습 속도로
            </span>
          </div>
        </div>
        <HeroShowcase />
      </section>
      <div className="ticker" aria-hidden="true">
        <div>
          LISTEN A LITTLE <span>✳</span> LEARN A LITTLE <span>✳</span> LOVE YOUR
          PROGRESS <span>✳</span> LISTEN A LITTLE <span>✳</span> LEARN A LITTLE{" "}
          <span>✳</span>
        </div>
      </div>
      <section className="practice-section section-wrap" id="practice">
        <div className="section-heading">
          <div>
            <p className="eyebrow">TODAY’S LITTLE ROUTINE</p>
            <h2>
              부담은 가볍게.
              <br />
              공부는 알차게.
            </h2>
          </div>
          <p>
            매일 만나는 듣기 10문제, 독해 20문제.
            <br />
            작은 루틴으로 영어와 조금 더 가까워져요.
          </p>
        </div>
        <div className="drill-grid">
          <article className="feature-card mint">
            <div className="card-heading">
              <span className="pill">PART 2 · LISTENING</span>
              <span className="card-count">
                10 <small>QUESTIONS</small>
              </span>
            </div>
            <h3>영어에 귀를 기울이는 시간.</h3>
            <p>
              다양한 억양을 듣고 알맞은 응답을 골라요.
              <br />
              제출 후 대본과 해설로 놓친 표현까지 확인해요.
            </p>
            <Cassette />
            <div className="card-bottom">
              <span>
                <Headphones size={17} /> 듣고, 고르고, 다시 듣고.
              </span>
              <ArrowUpRight size={25} />
            </div>
          </article>
          <article className="feature-card lavender">
            <div className="card-heading">
              <span className="pill">PART 5 · READING</span>
              <span className="card-count">
                20 <small>QUESTIONS</small>
              </span>
            </div>
            <h3>빈칸을 채우며 실력도 채워요.</h3>
            <p>
              문법부터 어휘, 비즈니스 표현까지.
              <br />
              한국어 해설로 정답의 이유를 이해해요.
            </p>
            <div className="paper-demo">
              <div className="paper-holes" />
              <small>ONE SENTENCE AT A TIME</small>
              <p>
                A little practice makes
                <br />a <span>big difference.</span>
              </p>
              <div>
                <span>
                  <Check size={15} /> 한 문장씩
                </span>
                <span>내 것으로!</span>
              </div>
            </div>
            <div className="card-bottom">
              <span>
                <BookOpen size={17} /> 풀고, 이해하고, 기억하고.
              </span>
              <ArrowUpRight size={25} />
            </div>
          </article>
        </div>
      </section>
      <section className="review-section section-wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">MAKE IT YOURS</p>
            <h2>풀고 끝? 내 것이 될 때까지.</h2>
          </div>
          <span className="hand-note">작은 복습의 힘 ↙</span>
        </div>
        <div className="review-grid">
          <article className="review-card pink">
            <Star size={28} />
            <span className="review-index">01</span>
            <h3>마음에 담은 단어</h3>
            <p>
              기억하고 싶은 표현은 별표로 쏙.
              <br />
              나만의 단어장에 차곡차곡 모아요.
            </p>
            <div className="vocab-sticker">
              <span>in advance</span>
              <small>미리, 사전에</small>
              <Star size={19} fill="currentColor" />
            </div>
          </article>
          <article className="review-card yellow">
            <Play size={28} />
            <span className="review-index">02</span>
            <h3>잠깐 쉬어가도 괜찮아</h3>
            <p>
              풀던 문제는 이어서, 끝낸 문제는 다시.
              <br />내 속도로 공부를 이어가요.
            </p>
            <div className="continue-demo">
              <span>
                <Pause size={18} /> 잠깐의 쉼표
              </span>
              <ArrowRight size={18} />
              <b>
                다시 시작 <Play size={14} />
              </b>
            </div>
          </article>
          <article className="review-card orange">
            <CalendarDays size={28} />
            <span className="review-index">03</span>
            <h3>눈에 보이는 꾸준함</h3>
            <p>
              공부한 날과 학습 밸런스를 한눈에.
              <br />
              어제의 노력이 오늘의 자신감으로.
            </p>
            <div className="week-demo">
              {["월", "화", "수", "목", "금"].map((d, i) => (
                <span key={d}>
                  <small>{d}</small>
                  <b>{i < 4 ? "✓" : "·"}</b>
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>
      <Preview />
      <section className="closing" id="release">
        <div className="section-wrap closing-inner">
          <img
            src={`${BASE}app-icon.png`}
            alt="민트 헤드폰을 쓴 TOE-PICK 토끼"
            width="88"
            height="88"
            loading="lazy"
          />
          <p className="eyebrow">YOUR DAILY ENGLISH SIDEKICK</p>
          <h2>
            오늘의 작은 시작,
            <br />
            TOE-PICK과 함께.
          </h2>
          <p>
            매일 조금씩, 영어가 내 편이 되는 시간.
            <br />곧 앱에서 만나요!
          </p>
          <div className="store-status">
            <span>
              <Smartphone size={22} />
              <span>
                <b>App Store</b>
                <small>출시 준비 중</small>
              </span>
            </span>
            <span>
              <Play size={22} />
              <span>
                <b>Google Play</b>
                <small>출시 준비 중</small>
              </span>
            </span>
          </div>
          <a className="contact-link" href="mailto:support@minlabs.app">
            궁금한 점이 있나요? 문의하기 <MoveUpRight size={15} />
          </a>
        </div>
        <span className="closing-star" aria-hidden="true">
          ✳
        </span>
      </section>
    </main>
  );
}
export function App({ privacy = false }: { privacy?: boolean }) {
  return (
    <>
      <a className="skip-link" href="#main">
        본문으로 이동
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <nav aria-label="주 메뉴">
            <a href={`${BASE}#practice`}>앱 소개</a>
            <a href={`${BASE}#preview`}>미리보기</a>
            <a className="nav-status" href={`${BASE}#release`}>
              COMING SOON <ArrowUpRight size={15} />
            </a>
          </nav>
        </div>
      </header>
      {privacy ? <Privacy /> : <Landing />}
      <footer className="site-footer section-wrap">
        <div className="footer-top">
          <Brand />
          <div>
            <a href={`${BASE}privacy/`}>개인정보처리방침</a>
            <a href="mailto:support@minlabs.app">
              문의하기 <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            TOE-PICK은 ETS의 공식 앱이 아닌 독립적인 학습 앱입니다.
            <br />
            AI가 생성한 문항과 해설에는 오류가 있을 수 있습니다.
          </p>
          <small>© 2026 northface. All rights reserved.</small>
        </div>
      </footer>
    </>
  );
}
