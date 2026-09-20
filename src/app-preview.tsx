import { useRef, useState } from "react";
import { Phone, tabs } from "./phone-preview";
export function Preview() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const copy = [
    [
      "오늘의 공부가 한눈에.",
      "듣기와 독해, 지금 시작할 문제를 가볍게 골라요. 내 페이스대로 하나씩 채우면 충분해요.",
    ],
    [
      "정답 다음에는, 이해.",
      "문제를 풀고 제출하면 한국어 해설을 확인해요. 헷갈린 보기의 이유도 함께 짚어봐요.",
    ],
    [
      "눈에 익은 단어를, 내 단어로.",
      "해설에서 만난 표현을 즐겨찾기에 모아두세요. 원문과 함께 다시 보면 더 오래 남아요.",
    ],
    [
      "조금씩 쌓이는 나의 꾸준함.",
      "학습 달력과 듣기·독해 밸런스로 공부한 날을 돌아봐요. 완료한 문제는 다시 복습할 수 있어요.",
    ],
  ];
  return (
    <section className="preview-section section-wrap" id="preview">
      <div className="preview-copy">
        <p className="eyebrow">TAKE A LITTLE LOOK</p>
        <h2>
          내 손안의
          <br />
          작은 공부방.
        </h2>
        <p className="section-description">
          복잡한 준비 없이, 나에게 필요한 공부만.
          <br />
          TOE-PICK을 미리 만나보세요.
        </p>
        <div
          className="preview-tabs"
          role="tablist"
          aria-label="앱 화면 미리보기"
        >
          {tabs.map((tab, i) => (
            <button
              key={tab}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              id={`tab-${i}`}
              aria-controls="preview-panel"
              aria-selected={active === i}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                let next = active;
                if (e.key === "ArrowRight") next = (active + 1) % 4;
                else if (e.key === "ArrowLeft") next = (active + 3) % 4;
                else if (e.key === "Home") next = 0;
                else if (e.key === "End") next = 3;
                else return;
                e.preventDefault();
                setActive(next);
                refs.current[next]?.focus();
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="preview-detail">
          <span className="step-number">0{active + 1}</span>
          <div>
            <h3>{copy[active][0]}</h3>
            <p>{copy[active][1]}</p>
          </div>
        </div>
        <p className="example-caption">
          * 소개용 예시 화면이며 실제 학습 기록이 아닙니다.
        </p>
      </div>
      <div
        className="preview-stage"
        id="preview-panel"
        role="tabpanel"
        aria-labelledby={`tab-${active}`}
        tabIndex={0}
      >
        <span className="stage-spark" aria-hidden="true">
          ✦
        </span>
        <div className="preview-phone-transition" key={active}>
          <Phone screen={active} />
        </div>
        <span className="stage-label">YOUR PACE. YOUR PICK.</span>
      </div>
    </section>
  );
}
