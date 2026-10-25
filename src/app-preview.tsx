import { useRef, useState } from "react";
import { SITE_COPY } from "./i18n";
import { Phone } from "./phone-preview";
import type { SiteLocale } from "./site-config";

export function Preview({ locale = "ko" }: { locale?: SiteLocale }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const t = SITE_COPY[locale].preview;
  return (
    <section className="preview-section section-wrap" id="preview">
      <div className="preview-copy">
        <p className="eyebrow">03 / INSIDE TOE-PICK</p>
        <h2>
          {t.headingLine1}
          <br />
          {t.headingLine2}
        </h2>
        <p className="section-description">
          {t.descLine1}
          <br />
          {t.descLine2}
        </p>
        <div
          className="preview-tabs"
          role="tablist"
          aria-label={t.tablistAria}
        >
          {t.tabs.map((tab, i) => (
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
            <h3>{t.steps[active][0]}</h3>
            <p>{t.steps[active][1]}</p>
          </div>
        </div>
        <p className="example-caption">{t.caption}</p>
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
          <Phone screen={active} locale={locale} />
        </div>
        <span className="stage-label">YOUR PACE. YOUR PICK.</span>
      </div>
    </section>
  );
}
