import { useEffect, useRef, useState } from "react";
import { BookOpen, Headphones, MoveHorizontal, Star } from "lucide-react";
import { Phone } from "./phone-preview";
import type { ShowcaseController } from "./three/hero-scene";

const modes = [
  {
    label: "듣기",
    icon: Headphones,
    screen: 4,
    caption: "듣고, 고르고. 귀가 열리는 작은 루틴.",
    tag: "LISTENING MIX",
  },
  {
    label: "독해",
    icon: BookOpen,
    screen: 1,
    caption: "한 문장씩 이해하고, 내 실력으로.",
    tag: "ONE MORE PICK",
  },
  {
    label: "단어",
    icon: Star,
    screen: 2,
    caption: "오늘 만난 표현, 내일의 자신감.",
    tag: "MAKE IT YOURS",
  },
];
export function HeroShowcase() {
  const [mode, setMode] = useState(0);
  const [state, setState] = useState<
    "static" | "loading" | "ready" | "fallback"
  >("static");
  const [enhanced, setEnhanced] = useState(false);
  const [reduced, setReduced] = useState(true);
  const host = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const controller = useRef<ShowcaseController | null>(null);
  const modeRef = useRef(mode);
  useEffect(() => {
    setEnhanced(true);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    if (reduced) {
      setState("static");
      return;
    }
    const container = host.current,
      target = stage.current;
    if (!container || !target) return;
    let cancelled = false,
      requested = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || requested) return;
        requested = true;
        setState("loading");
        observer.disconnect();
        import("./three/hero-scene")
          .then(({ createShowcase }) => {
            if (cancelled) return;
            controller.current = createShowcase(container, {
              mode: modeRef.current,
              onReady: () => {
                if (!cancelled) setState("ready");
              },
              onFailure: () => {
                if (!cancelled) setState("fallback");
              },
            });
          })
          .catch(() => {
            if (!cancelled) setState("fallback");
          });
      },
      { rootMargin: "80px" },
    );
    observer.observe(target);
    return () => {
      cancelled = true;
      observer.disconnect();
      controller.current?.dispose();
      controller.current = null;
    };
  }, [reduced]);
  function select(next: number) {
    modeRef.current = next;
    setMode(next);
    controller.current?.setMode(next);
  }
  const selected = modes[mode];
  return (
    <div className="hero-showcase" data-state={state} data-selected-mode={mode}>
      <div className="showcase-stage" ref={stage}>
        <div className="showcase-backdrop" aria-hidden="true">
          <span />
          <span />
        </div>
        <span className="showcase-sticker" aria-hidden="true">
          SMALL STEPS.
          <br />
          <b>BIG ENERGY!</b>
          <Star size={20} />
        </span>
        <div className="showcase-canvas" ref={host} aria-hidden="true" />
        {state !== "ready" && (
          <div className="showcase-fallback">
            <Phone screen={selected.screen} />
            <span className="fallback-star" aria-hidden="true">
              ✦
            </span>
          </div>
        )}
        <span className="showcase-side-label" aria-hidden="true">
          YOUR PACE / YOUR PICK
        </span>
        <span className="showcase-drag-hint">
          <MoveHorizontal size={15} />
          {state === "ready"
            ? "드래그해서 돌려보세요"
            : "아래에서 화면을 골라보세요"}
        </span>
      </div>
      <fieldset className="showcase-controls" aria-label="3D 앱 미리보기 모드">
        {modes.map(({ label, icon: Icon }, index) => (
          <button
            key={label}
            type="button"
            aria-pressed={mode === index}
            disabled={!enhanced}
            onClick={() => select(index)}
          >
            <Icon size={17} />
            {label}
            <span className="mode-dot" />
          </button>
        ))}
      </fieldset>
      <div className="showcase-caption" aria-live="polite">
        <b>{selected.tag}</b>
        <span>{selected.caption}</span>
      </div>
      <p className="showcase-disclaimer">
        소개용 예시 화면 · 음성은 재생되지 않아요
      </p>
    </div>
  );
}
