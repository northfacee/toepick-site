import {
  ArrowUpRight,
  ArrowRight,
  Headphones,
  BookOpen,
  Star,
  Check,
  Play,
  CalendarDays,
  Pause,
} from "lucide-react";
import { HeroShowcase } from "./hero-showcase";
import { Preview } from "./app-preview";
import { Privacy } from "./privacy";
import { BASE } from "./site-config";
import { SupportContact } from "./support-contact";
import { StoreLinks } from "./store-links";

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
function Landing() {
  return (
    <main id="main">
      <section className="hero section-wrap">
        <div className="hero-copy">
          <div className="hero-badge">
            <span /> NOW AVAILABLE · 정식 출시
          </div>
          <p className="hero-kicker">토익 공부에도, 내 취향과 내 페이스.</p>
          <h1>
            매일 듣고,
            <br />
            풀고, <span className="highlight">내 것으로</span>
            <span className="hero-period">.</span>
          </h1>
          <p className="hero-description">
            오늘의 LC부터 RC, 해설과 단어 복습까지.
            <br />
            작은 성취가 쌓이는 나만의 토익 루틴을 시작해요.
          </p>
          <StoreLinks compact />
          <div className="hero-meta">
            <span>
              <Check size={15} /> 회원가입 없이 바로 시작
            </span>
            <span>
              <Check size={15} /> 무료 다운로드
            </span>
          </div>
          <a className="hero-preview-link" href="#preview">
            앱 미리보기 <ArrowRight size={17} />
          </a>
        </div>
        <HeroShowcase />
      </section>
      <div className="routine-strip">
        <div className="section-wrap">
          <span className="strip-label">YOUR DAILY PICK</span>
          <span>
            <Headphones size={18} /> 듣기 <b>Part 2·3·4</b>
          </span>
          <span>
            <BookOpen size={18} /> 독해 <b>Part 5</b>
          </span>
          <span>
            <Star size={18} /> 나만의 단어장
          </span>
          <span>
            <CalendarDays size={18} /> 매일의 학습 기록
          </span>
        </div>
      </div>
      <section className="practice-section section-wrap" id="practice">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / DAILY PRACTICE</p>
            <h2>
              오늘의 토익,
              <br />이 두 장이면 준비 끝.
            </h2>
          </div>
          <p>
            듣고, 읽고, 이해하는 시간.
            <br />
            매일 새로운 문제로 공부의 리듬을 만들어요.
          </p>
        </div>
        <div className="drill-grid">
          <article className="feature-card mint">
            <div className="card-heading">
              <span className="pill">PART 2 · 3 · 4</span>
              <Headphones size={28} />
            </div>
            <p className="feature-name">
              Listening<span>귀가 트이는 오늘의 한 세트.</span>
            </p>
            <p>
              질문·응답부터 대화와 담화까지.
              <br />
              듣고 고른 뒤, 대본과 한국어 해설로 다시 이해해요.
            </p>
            <div className="listening-parts">
              <div>
                <b>02</b>
                <span>
                  질문·응답<small>10문제</small>
                </span>
              </div>
              <div>
                <b>03</b>
                <span>
                  대화<small>3문제</small>
                </span>
              </div>
              <div>
                <b>04</b>
                <span>
                  담화<small>3문제</small>
                </span>
              </div>
            </div>
            <div className="wave-player" aria-hidden="true">
              <span className="player-play">
                <Play size={20} fill="currentColor" />
              </span>
              <div className="wave-bars">
                {Array.from({ length: 33 }, (_, i) => (
                  <i
                    key={i}
                    style={{ height: `${12 + ((i * 17 + 9) % 35)}px` }}
                  />
                ))}
              </div>
              <span className="player-side">SIDE A</span>
            </div>
            <div className="card-bottom">
              <span>30초 미리보기로 Part 3·4도 차근차근.</span>
              <span className="mini-tag">16문제 / DAY</span>
            </div>
          </article>
          <article className="feature-card lime">
            <div className="card-heading">
              <span className="pill">PART 5</span>
              <BookOpen size={28} />
            </div>
            <p className="feature-name">
              Reading<span>빈칸 하나, 확실한 이해 하나.</span>
            </p>
            <p>
              문법·어휘·비즈니스 표현을 한 문장씩.
              <br />
              정답의 근거와 헷갈린 보기까지 해설로 짚어봐요.
            </p>
            <div className="reading-paper">
              <span className="paper-tag">TODAY’S QUESTION</span>
              <p>
                A little practice makes
                <br />a <mark>big difference.</mark>
              </p>
              <div>
                <span>
                  <Check size={16} /> 정답의 이유까지 내 것으로
                </span>
                <span>✓</span>
              </div>
            </div>
            <div className="card-bottom">
              <span>풀고, 이해하고, 기억하고.</span>
              <span className="mini-tag">20문제 / DAY</span>
            </div>
          </article>
        </div>
      </section>
      <section className="review-section section-wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / MAKE IT YOURS</p>
            <h2>풀고 나서가 진짜 공부니까.</h2>
          </div>
          <p>문제 한 세트에서 끝나지 않는 루틴.</p>
        </div>
        <div className="review-grid">
          <article className="review-card pink">
            <Star size={27} />
            <span className="review-index">01</span>
            <h3>기억하고 싶은 단어는 쏙.</h3>
            <p>
              해설에서 만난 표현을 즐겨찾기에.
              <br />
              예문과 함께 내 단어장에 모아요.
            </p>
            <div className="vocab-sticker">
              <span>in advance</span>
              <small>미리, 사전에</small>
              <Star size={19} fill="currentColor" />
            </div>
          </article>
          <article className="review-card lavender">
            <Play size={27} />
            <span className="review-index">02</span>
            <h3>내 속도로, 이어서.</h3>
            <p>
              풀던 문제는 이어풀고, 오답은 다시.
              <br />
              잠깐 쉬어가도 루틴은 이어져요.
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
          <article className="review-card cream">
            <CalendarDays size={27} />
            <span className="review-index">03</span>
            <h3>꾸준함이 눈에 보이게.</h3>
            <p>
              학습 달력과 파트별 정답·오답 기록.
              <br />
              쌓인 공부를 돌아보고 다시 도전해요.
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
          <p className="eyebrow">SMALL STEPS. YOUR OWN PACE.</p>
          <h2>
            오늘의 작은 시작,
            <br />
            TOE-PICK과 함께.
          </h2>
          <p>
            첫 문제를 고르는 순간부터, 나만의 루틴이 시작돼요.
            <br />
            지금 앱에서 만나요.
          </p>
          <StoreLinks />
          <p className="download-note">
            iOS · Android에서 무료 다운로드 · 앱 내 광고 포함
          </p>
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
              앱 다운로드 <ArrowUpRight size={16} />
            </a>
          </nav>
        </div>
      </header>
      {privacy ? <Privacy /> : <Landing />}
      <footer className="site-footer section-wrap">
        <div className="footer-top">
          <Brand />
          <div className="footer-links">
            <a href={`${BASE}privacy/`}>개인정보처리방침</a>
            <SupportContact />
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
