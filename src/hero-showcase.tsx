import { useEffect, useRef, useState } from "react";
import { BookOpen, Headphones, MoveHorizontal, Star } from "lucide-react";
import { SITE_COPY } from "./i18n";
import { Phone } from "./phone-preview";
import type { SiteLocale } from "./site-config";
import type { ShowcaseController } from "./three/hero-scene";

const modeDefs = [
  { icon: Headphones, screen: 4 },
  { icon: BookOpen, screen: 1 },
  { icon: Star, screen: 2 },
] as const;

export function HeroShowcase({ locale = "ko" }: { locale?: SiteLocale }) {
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
  const t = SITE_COPY[locale].showcase;

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
              locale,
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
  }, [reduced, locale]);

  function select(next: number) {
    modeRef.current = next;
    setMode(next);
    controller.current?.setMode(next);
  }

  const selectedCopy = t.modes[mode];
  const selectedDef = modeDefs[mode];

  return (
    <div className="hero-showcase" data-state={state} data-selected-mode={mode}>
      <div className="showcase-stage" ref={stage}>
        <div className="showcase-backdrop" aria-hidden="true">
          <span />
          <span />
        </div>
        <span className="showcase-sticker" aria-hidden="true">
          <span className="sticker-icon">
            <Headphones size={18} />
          </span>
          <span>
            {t.stickerTitle}
            <small>{t.stickerSub}</small>
          </span>
        </span>
        <div className="showcase-canvas" ref={host} aria-hidden="true" />
        {state !== "ready" && (
          <div className="showcase-fallback">
            <Phone screen={selectedDef.screen} locale={locale} />
            <span className="fallback-star" aria-hidden="true">
              ✦
            </span>
          </div>
        )}
        <span className="showcase-side-label" aria-hidden="true">
          PICK YOUR PACE.
        </span>
        <span className="showcase-drag-hint">
          <MoveHorizontal size={15} />
          {state === "ready" ? t.dragHintReady : t.dragHintStatic}
        </span>
      </div>
      <fieldset className="showcase-controls" aria-label={t.controlsAria}>
        {t.modes.map(({ label }, index) => {
          const Icon = modeDefs[index].icon;
          return (
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
          );
        })}
      </fieldset>
      <div className="showcase-caption" aria-live="polite">
        <b>{selectedCopy.tag}</b>
        <span>{selectedCopy.caption}</span>
      </div>
      <p className="showcase-disclaimer">{t.disclaimer}</p>
    </div>
  );
}
