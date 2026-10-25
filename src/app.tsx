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
import { SITE_COPY } from "./i18n";
import { Privacy } from "./privacy";
import {
  BASE,
  localeHomePath,
  localePrivacyPath,
  type SiteLocale,
} from "./site-config";
import { SupportContact } from "./support-contact";
import { StoreLinks } from "./store-links";

const LANGUAGE_ITEMS: readonly {
  locale: SiteLocale;
  shortLabel: string;
  fullLabel: string;
}[] = [
  { locale: "ko", shortLabel: "KO", fullLabel: "한국어" },
  { locale: "en", shortLabel: "EN", fullLabel: "English" },
  { locale: "ja", shortLabel: "JP", fullLabel: "日本語" },
] as const;

function Brand({ locale }: { locale: SiteLocale }) {
  const copy = SITE_COPY[locale].header;
  return (
    <a
      className="brand"
      href={localeHomePath(locale)}
      aria-label={copy.brandAria}
    >
      <img src={`${BASE}app-icon.png`} alt="" width="38" height="38" />
      <span>
        TOE-PICK<span className="brand-star">✳</span>
      </span>
    </a>
  );
}

function LanguageSwitch({
  locale,
  privacy,
  variant = "compact",
}: {
  locale: SiteLocale;
  privacy: boolean;
  variant?: "compact" | "full";
}) {
  const ariaLabel = SITE_COPY[locale].header.langSwitchAria;
  return (
    <div
      className={`lang-switch lang-switch-${variant}`}
      aria-label={ariaLabel}
    >
      {LANGUAGE_ITEMS.map((item) => {
        const href = privacy
          ? localePrivacyPath(item.locale)
          : localeHomePath(item.locale);
        const active = item.locale === locale;
        return (
          <a
            key={item.locale}
            href={href}
            lang={item.locale}
            title={item.fullLabel}
            className={active ? "active" : undefined}
            aria-current={active ? "page" : undefined}
          >
            {item.shortLabel}
          </a>
        );
      })}
    </div>
  );
}

function Landing({ locale }: { locale: SiteLocale }) {
  const c = SITE_COPY[locale];
  return (
    <main id="main">
      <section className="hero section-wrap">
        <div className="hero-copy">
          <div className="hero-badge">
            <span /> {c.hero.badge}
          </div>
          <p className="hero-kicker">{c.hero.kicker}</p>
          <h1>
            {c.hero.titleLine1}
            <br />
            {c.hero.titleLine2Prefix}
            <span className="highlight">{c.hero.titleHighlight}</span>
            <span className="hero-period">.</span>
          </h1>
          <p className="hero-description">
            {c.hero.descriptionLine1}
            <br />
            {c.hero.descriptionLine2}
          </p>
          <StoreLinks compact locale={locale} />
          <div className="hero-meta">
            <span>
              <Check size={15} /> {c.hero.metaNoSignup}
            </span>
            <span>
              <Check size={15} /> {c.hero.metaFree}
            </span>
          </div>
          <a className="hero-preview-link" href="#preview">
            {c.hero.previewCta} <ArrowRight size={17} />
          </a>
        </div>
        <HeroShowcase locale={locale} />
      </section>
      <div className="routine-strip">
        <div className="section-wrap">
          <span className="strip-label">YOUR DAILY PICK</span>
          <span>
            <Headphones size={18} /> {c.routineStrip.listening}{" "}
            <b>Part 2·3·4</b>
          </span>
          <span>
            <BookOpen size={18} /> {c.routineStrip.reading} <b>Part 5</b>
          </span>
          <span>
            <Star size={18} /> {c.routineStrip.vocab}
          </span>
          <span>
            <CalendarDays size={18} /> {c.routineStrip.history}
          </span>
        </div>
      </div>
      <section className="practice-section section-wrap" id="practice">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / DAILY PRACTICE</p>
            <h2>
              {c.practice.headingLine1}
              <br />
              {c.practice.headingLine2}
            </h2>
          </div>
          <p>
            {c.practice.subLine1}
            <br />
            {c.practice.subLine2}
          </p>
        </div>
        <div className="drill-grid">
          <article className="feature-card mint">
            <div className="card-heading">
              <span className="pill">PART 2 · 3 · 4</span>
              <Headphones size={28} />
            </div>
            <p className="feature-name">
              Listening<span>{c.practice.listeningSub}</span>
            </p>
            <p>
              {c.practice.listeningDescLine1}
              <br />
              {c.practice.listeningDescLine2}
            </p>
            <div className="listening-parts">
              <div>
                <b>02</b>
                <span>
                  {c.practice.part2Name}
                  <small>{c.practice.part2Count}</small>
                </span>
              </div>
              <div>
                <b>03</b>
                <span>
                  {c.practice.part3Name}
                  <small>{c.practice.part3Count}</small>
                </span>
              </div>
              <div>
                <b>04</b>
                <span>
                  {c.practice.part4Name}
                  <small>{c.practice.part4Count}</small>
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
              <span>{c.practice.listeningFooter}</span>
              <span className="mini-tag">{c.practice.listeningTag}</span>
            </div>
          </article>
          <article className="feature-card lime">
            <div className="card-heading">
              <span className="pill">PART 5</span>
              <BookOpen size={28} />
            </div>
            <p className="feature-name">
              Reading<span>{c.practice.readingSub}</span>
            </p>
            <p>
              {c.practice.readingDescLine1}
              <br />
              {c.practice.readingDescLine2}
            </p>
            <div className="reading-paper">
              <span className="paper-tag">TODAY’S QUESTION</span>
              <p>
                A little practice makes
                <br />a <mark>big difference.</mark>
              </p>
              <div>
                <span>
                  <Check size={16} /> {c.practice.readingPaperCheck}
                </span>
                <span>✓</span>
              </div>
            </div>
            <div className="card-bottom">
              <span>{c.practice.readingFooter}</span>
              <span className="mini-tag">{c.practice.readingTag}</span>
            </div>
          </article>
        </div>
      </section>
      <section className="review-section section-wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / MAKE IT YOURS</p>
            <h2>{c.review.heading}</h2>
          </div>
          <p>{c.review.sub}</p>
        </div>
        <div className="review-grid">
          <article className="review-card pink">
            <Star size={27} />
            <span className="review-index">01</span>
            <h3>{c.review.card1Title}</h3>
            <p>
              {c.review.card1DescLine1}
              <br />
              {c.review.card1DescLine2}
            </p>
            <div className="vocab-sticker">
              <span>in advance</span>
              <small>{c.review.card1StickerMeaning}</small>
              <Star size={19} fill="currentColor" />
            </div>
          </article>
          <article className="review-card lavender">
            <Play size={27} />
            <span className="review-index">02</span>
            <h3>{c.review.card2Title}</h3>
            <p>
              {c.review.card2DescLine1}
              <br />
              {c.review.card2DescLine2}
            </p>
            <div className="continue-demo">
              <span>
                <Pause size={18} /> {c.review.card2Pause}
              </span>
              <ArrowRight size={18} />
              <b>
                {c.review.card2Resume} <Play size={14} />
              </b>
            </div>
          </article>
          <article className="review-card cream">
            <CalendarDays size={27} />
            <span className="review-index">03</span>
            <h3>{c.review.card3Title}</h3>
            <p>
              {c.review.card3DescLine1}
              <br />
              {c.review.card3DescLine2}
            </p>
            <div className="week-demo">
              {c.review.weekdays.map((d, i) => (
                <span key={d}>
                  <small>{d}</small>
                  <b>{i < 4 ? "✓" : "·"}</b>
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>
      <Preview locale={locale} />
      <section className="closing" id="release">
        <div className="section-wrap closing-inner">
          <img
            src={`${BASE}app-icon.png`}
            alt={c.closing.iconAlt}
            width="88"
            height="88"
            loading="lazy"
          />
          <p className="eyebrow">SMALL STEPS. YOUR OWN PACE.</p>
          <h2>
            {c.closing.headingLine1}
            <br />
            {c.closing.headingLine2}
          </h2>
          <p>
            {c.closing.descLine1}
            <br />
            {c.closing.descLine2}
          </p>
          <StoreLinks locale={locale} />
          <p className="download-note">{c.closing.downloadNote}</p>
        </div>
        <span className="closing-star" aria-hidden="true">
          ✳
        </span>
      </section>
    </main>
  );
}

export function App({
  privacy = false,
  locale = "ko",
}: {
  privacy?: boolean;
  locale?: SiteLocale;
}) {
  const c = SITE_COPY[locale];
  const homeHref = localeHomePath(locale);
  const privacyHref = localePrivacyPath(locale);
  return (
    <>
      <a className="skip-link" href="#main">
        {c.header.skipToMain}
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Brand locale={locale} />
          <nav aria-label={c.header.navAria}>
            <a href={`${homeHref}#practice`}>{c.header.about}</a>
            <a href={`${homeHref}#preview`}>{c.header.preview}</a>
            <LanguageSwitch locale={locale} privacy={privacy} variant="compact" />
            <a className="nav-status" href={`${homeHref}#release`}>
              {c.header.download} <ArrowUpRight size={16} />
            </a>
          </nav>
        </div>
      </header>
      {privacy ? <Privacy locale={locale} /> : <Landing locale={locale} />}
      <footer className="site-footer section-wrap">
        <div className="footer-top">
          <Brand locale={locale} />
          <div className="footer-links">
            <LanguageSwitch locale={locale} privacy={privacy} variant="full" />
            <a href={privacyHref}>{c.footer.privacyLink}</a>
            <SupportContact locale={locale} />
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            {c.footer.disclaimerLine1}
            <br />
            {c.footer.disclaimerLine2}
          </p>
          <small>© 2026 northface. All rights reserved.</small>
        </div>
      </footer>
    </>
  );
}
