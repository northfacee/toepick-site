import { useEffect, useState } from "react";
import { BookOpen, Headphones, Star } from "lucide-react";
import { SITE_COPY } from "./i18n";
import { Phone } from "./phone-preview";
import type { SiteLocale } from "./site-config";

const modeDefs = [
  { icon: Headphones, screen: 4 },
  { icon: BookOpen, screen: 1 },
  { icon: Star, screen: 2 },
] as const;

export function HeroShowcase({ locale = "ko" }: { locale?: SiteLocale }) {
  const [mode, setMode] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  const t = SITE_COPY[locale].showcase;

  useEffect(() => {
    setEnhanced(true);
  }, []);

  const selectedCopy = t.modes[mode];
  const selectedDef = modeDefs[mode];

  return (
    <div className="hero-showcase" data-state="static" data-selected-mode={mode}>
      <div className="showcase-stage">
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
        <div className="showcase-fallback">
          <Phone screen={selectedDef.screen} locale={locale} />
          <span className="fallback-star" aria-hidden="true">
            ✦
          </span>
        </div>
        <span className="showcase-side-label" aria-hidden="true">
          PICK YOUR PACE.
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
              onClick={() => setMode(index)}
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
