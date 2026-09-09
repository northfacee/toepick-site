export const dynamic = 'force-static';
export default function Home() {
  return (
    <main id="main">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">A LITTLE PRACTICE, EVERY DAY</p>
          <h1>
            영어 공부,
            <br />
            오늘은 <span>20문제</span>만.
          </h1>
          <p className="lead">
            거창한 계획 대신, 가벼운 시작.
            <br />
            ToePick과 함께 TOEIC Part 5를
            <br className="mobile-break" /> 나만의 속도로 연습해요.
          </p>
          <div className="hero-actions">
            <a className="action" href="#practice">
              어떻게 공부하나요? <span>↗</span>
            </a>
            <span className="release">Google Play 출시 준비 중</span>
          </div>
          <p className="hero-footnote">
            회원가입 없이 · 한국어 해설 · 나만의 학습 기록
          </p>
        </div>
        <div className="study">
          <div className="study-label">
            YOUR DAILY ENGLISH NOTE <span>01 / 20</span>
          </div>
          <article className="question">
            <div className="question-top">
              <span>PART 5 · 학습 예시</span>
              <span>품사</span>
            </div>
            <h2>
              The team completed the project <mark>____</mark>.
            </h2>
            <div className="options">
              <p>
                <span>A</span> success
              </p>
              <p>
                <span>B</span> successful
              </p>
              <p className="correct">
                <span>C</span> successfully <b>✓</b>
              </p>
              <p>
                <span>D</span> succeed
              </p>
            </div>
            <div className="explanation">
              <strong>맞았어요! 왜 정답인지도 함께.</strong>
              <p>
                동사 completed를 꾸미는 자리에는 부사 successfully가 필요해요.
              </p>
            </div>
          </article>
          <div className="note-strip">
            <span>하루의 작은 성취</span>
            <strong>한 문제 더, 한 걸음 더.</strong>
          </div>
        </div>
      </section>
      <section id="practice" className="practice">
        <div className="section-title">
          <p className="eyebrow">YOUR OWN STUDY RHYTHM</p>
          <h2>
            풀고, 이해하고,
            <br />내 것으로 만들어요.
          </h2>
          <p>
            정답을 고르는 순간부터
            <br />
            다시 꺼내 보는 복습까지.
          </p>
        </div>
        <div className="features">
          <article>
            <span className="number">01</span>
            <div>
              <h3>딱 20문제로 시작</h3>
              <p>
                문법부터 어휘, 비즈니스 표현까지.
                <br />
                AI가 만든 중급 Part 5 문제를 연습해요.
              </p>
            </div>
          </article>
          <article>
            <span className="number pink">02</span>
            <div>
              <h3>헷갈렸던 이유까지 이해</h3>
              <p>
                답을 제출하면 한국어 번역과 해설을 확인해요.
                <br />
                다른 보기가 왜 틀렸는지도 짚어줘요.
              </p>
            </div>
          </article>
          <article>
            <span className="number">03</span>
            <div>
              <h3>쌓이는 나만의 공부 기록</h3>
              <p>
                중간에 멈춰도 이어 풀고, 북마크로 다시 보고.
                <br />
                완료한 결과는 저장 후 오프라인에서도 복습해요.
              </p>
            </div>
          </article>
        </div>
      </section>
      <section className="closing">
        <p className="eyebrow">SMALL STEPS. BETTER ENGLISH.</p>
        <h2>
          오늘의 20문제가
          <br />
          내일의 자신감이 되도록.
        </h2>
        <p>ToePick · Android 출시 준비 중</p>
        <a href="mailto:jkgjms2@gmail.com">궁금한 점을 들려주세요 ↗</a>
      </section>
      <p className="disclaimer">
        ToePick은 독립적인 학습 앱이며 ETS의 공식 앱이 아닙니다. AI가 생성한
        문항과 해설에는 오류가 있을 수 있습니다.
      </p>
    </main>
  );
}
