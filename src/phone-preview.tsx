import {
  ArrowRight,
  Headphones,
  BookOpen,
  Star,
  Check,
  CalendarDays,
  Home,
  Sparkles,
  Grid2X2,
  Smile,
  RotateCcw,
  Play,
} from "lucide-react";
export const tabs = ["홈", "문제", "단어", "기록"] as const;
const icons = [Home, Star, Grid2X2, Smile];
const navigation = ["홈", "단어", "기록", "마이페이지"];
function HomeScreen() {
  return (
    <>
      <div className="phone-title">
        <strong>
          DAILY QUEST<span>오늘의 작은 도전</span>
        </strong>
        <span className="date-sticker">
          시험일
          <br />
          설정
        </span>
      </div>
      <div className="phone-stats">
        <div>
          <small>LISTENING</small>
          <b>
            0 <span>/ 16</span>
          </b>
        </div>
        <div>
          <small>READING</small>
          <b>
            0 <span>/ 20</span>
          </b>
        </div>
      </div>
      <div className="mini-drill mint">
        <span className="mini-label">Part 2·3·4</span>
        <Headphones className="drill-icon" size={36} />
        <h4>Listening</h4>
        <p>질문·응답, 대화, 담화를 듣고 풀어요.</p>
        <div className="mini-action">
          Listening 열기 <ArrowRight size={15} />
        </div>
      </div>
      <div className="mini-drill lime">
        <span className="mini-label">PART 5</span>
        <BookOpen className="drill-icon" size={36} />
        <h4>Reading</h4>
        <p>문법과 어휘를 채우는 20문제</p>
        <div className="mini-action">
          Part 5 시작하기 <ArrowRight size={15} />
        </div>
      </div>
      <div className="streak">
        <Sparkles size={16} /> 오늘의 나에게, 작은 체크 하나.
      </div>
    </>
  );
}
function QuestionScreen() {
  return (
    <>
      <div className="phone-title">
        <strong>
          READING<span>PART 5 · 문항 예시</span>
        </strong>
        <span className="pill">01 / 20</span>
      </div>
      <div className="example-question">
        <small>빈칸에 알맞은 표현을 골라보세요.</small>
        <h4>
          The team completed the project <span>______</span>.
        </h4>
        {["success", "successful", "successfully", "succeed"].map((word, i) => (
          <div className={`answer ${i === 2 ? "selected" : ""}`} key={word}>
            <b>{"ABCD"[i]}</b>
            {word}
            {i === 2 && <Check size={17} />}
          </div>
        ))}
        <div className="example-explanation">
          <b>제출 후 해설 예시</b>
          <p>동사 completed를 꾸미는 자리에는 부사 successfully가 필요해요.</p>
        </div>
      </div>
    </>
  );
}
function WordsScreen() {
  return (
    <>
      <div className="phone-title">
        <strong>
          MY WORDS<span>다시 만나는 나의 단어</span>
        </strong>
        <Star size={25} />
      </div>
      {[
        [
          "successfully",
          "성공적으로",
          "The team completed the project successfully.",
        ],
        ["in advance", "미리, 사전에", "Please book your tickets in advance."],
        ["colleague", "동료", "I had lunch with a colleague."],
      ].map(([word, meaning, sentence], i) => (
        <article key={word} className={`word-note word-${i}`}>
          <span className="word-star">★</span>
          <small>MY VOCABULARY</small>
          <h4>{word}</h4>
          <b>{meaning}</b>
          <p>{sentence}</p>
        </article>
      ))}
    </>
  );
}
function HistoryScreen() {
  return (
    <>
      <div className="phone-title">
        <strong>
          MY RECORD<span>한눈에 보는 공부 습관</span>
        </strong>
        <CalendarDays size={25} />
      </div>
      <div className="mini-calendar">
        <b>나의 학습 달력</b>
        <div className="calendar-grid">
          {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
            <small key={day}>{day}</small>
          ))}
          {Array.from({ length: 21 }, (_, i) => (
            <span key={i} className={i < 11 ? "studied" : ""}>
              {i < 11 ? <Check size={16} /> : i + 1}
            </span>
          ))}
        </div>
        <small>✓ 학습한 날을 차곡차곡</small>
      </div>
      <div className="record-scores">
        {[
          ["Part 2", "80%"],
          ["Part 3", "67%"],
          ["Part 4", "100%"],
          ["Part 5", "80%"],
        ].map(([part, score], i) => (
          <div key={part} className={`score-part part-${i}`}>
            <b>{part}</b>
            <span
              className="score-ring"
              style={{ "--score": score } as React.CSSProperties}
            >
              {score}
            </span>
            <small>정답 · 오답 기록</small>
          </div>
        ))}
      </div>
      <div className="record-row">
        <span>PART 2 · 완료</span>
        <b>8 / 10</b>
      </div>
      <div className="record-row">
        <span>PART 5 · 완료</span>
        <b>16 / 20</b>
      </div>
    </>
  );
}
function ListeningScreen() {
  return (
    <>
      <div className="phone-title">
        <strong>
          LISTENING MIX<span>PART 2 · 듣기 예시</span>
        </strong>
        <Headphones size={25} />
      </div>
      <div className="listening-static">
        <span className="pill">PART 2 · 01 / 10</span>
        <div className="static-mixtape">
          <b>TOE-PICK MIXTAPE / SIDE A</b>
          <div className="mini-wave">
            <span>
              <Play size={18} fill="currentColor" />
            </span>
            <div>
              {Array.from({ length: 21 }, (_, i) => (
                <i key={i} style={{ height: `${9 + ((i * 13) % 21)}px` }} />
              ))}
            </div>
            <RotateCcw size={20} />
          </div>
        </div>
        <b>듣고, 고르고, 다시 듣고.</b>
      </div>
      <div className="static-answers">
        {["A", "B", "C"].map((answer, i) => (
          <div key={answer} className={i === 1 ? "picked" : ""}>
            <b>{answer}</b>
            <span>{i === 1 ? "MY PICK ✓" : "응답 선택"}</span>
          </div>
        ))}
      </div>
      <p className="static-audio-note">소개용 예시 · 음성은 재생되지 않아요</p>
    </>
  );
}
export function Phone({ screen = 0 }: { screen?: number }) {
  const Screen = [
    HomeScreen,
    QuestionScreen,
    WordsScreen,
    HistoryScreen,
    ListeningScreen,
  ][screen];
  return (
    <div className="phone">
      <div className="phone-status">
        <span>9:41</span>
        <span className="phone-island" />
        <span>▮▮▮ ▰</span>
      </div>
      <div className="phone-content">
        <Screen />
      </div>
      <div className="phone-nav" aria-hidden="true">
        {icons.map((Icon, i) => (
          <span
            className={
              i ===
              (screen === 2 ? 1 : screen === 3 ? 2 : screen === 0 ? 0 : -1)
                ? "active"
                : ""
            }
            key={navigation[i]}
          >
            <Icon size={18} />
            {navigation[i]}
          </span>
        ))}
      </div>
      <div className="phone-home" />
    </div>
  );
}
