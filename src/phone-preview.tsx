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
import { SITE_COPY } from "./i18n";
import type { SiteLocale } from "./site-config";

export const tabs = ["홈", "문제", "단어", "기록"] as const;
const icons = [Home, Star, Grid2X2, Smile];

function HomeScreen({ locale }: { locale: SiteLocale }) {
  const t = SITE_COPY[locale].phone.home;
  return (
    <>
      <div className="phone-title">
        <strong>
          DAILY QUEST<span>{t.subtitle}</span>
        </strong>
        <span className="date-sticker">
          {t.dateLine1}
          <br />
          {t.dateLine2}
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
        <p>{t.listeningDesc}</p>
        <div className="mini-action">
          {t.listeningAction} <ArrowRight size={15} />
        </div>
      </div>
      <div className="mini-drill lime">
        <span className="mini-label">PART 5</span>
        <BookOpen className="drill-icon" size={36} />
        <h4>Reading</h4>
        <p>{t.readingDesc}</p>
        <div className="mini-action">
          {t.readingAction} <ArrowRight size={15} />
        </div>
      </div>
      <div className="streak">
        <Sparkles size={16} /> {t.streak}
      </div>
    </>
  );
}

function QuestionScreen({ locale }: { locale: SiteLocale }) {
  const t = SITE_COPY[locale].phone.question;
  return (
    <>
      <div className="phone-title">
        <strong>
          READING<span>{t.subtitle}</span>
        </strong>
        <span className="pill">01 / 20</span>
      </div>
      <div className="example-question">
        <small>{t.prompt}</small>
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
          <b>{t.explanationTitle}</b>
          <p>{t.explanationBody}</p>
        </div>
      </div>
    </>
  );
}

function WordsScreen({ locale }: { locale: SiteLocale }) {
  const t = SITE_COPY[locale].phone.words;
  return (
    <>
      <div className="phone-title">
        <strong>
          MY WORDS<span>{t.subtitle}</span>
        </strong>
        <Star size={25} />
      </div>
      {t.items.map(([word, meaning, sentence], i) => (
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

function HistoryScreen({ locale }: { locale: SiteLocale }) {
  const t = SITE_COPY[locale].phone.history;
  return (
    <>
      <div className="phone-title">
        <strong>
          MY RECORD<span>{t.subtitle}</span>
        </strong>
        <CalendarDays size={25} />
      </div>
      <div className="mini-calendar">
        <b>{t.calendarTitle}</b>
        <div className="calendar-grid">
          {t.days.map((day) => (
            <small key={day}>{day}</small>
          ))}
          {Array.from({ length: 21 }, (_, i) => (
            <span key={i} className={i < 11 ? "studied" : ""}>
              {i < 11 ? <Check size={16} /> : i + 1}
            </span>
          ))}
        </div>
        <small>{t.calendarNote}</small>
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
            <small>{t.scoreNote}</small>
          </div>
        ))}
      </div>
      <div className="record-row">
        <span>{t.part2Done}</span>
        <b>8 / 10</b>
      </div>
      <div className="record-row">
        <span>{t.part5Done}</span>
        <b>16 / 20</b>
      </div>
    </>
  );
}

function ListeningScreen({ locale }: { locale: SiteLocale }) {
  const t = SITE_COPY[locale].phone.listening;
  return (
    <>
      <div className="phone-title">
        <strong>
          LISTENING MIX<span>{t.subtitle}</span>
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
        <b>{t.headline}</b>
      </div>
      <div className="static-answers">
        {["A", "B", "C"].map((answer, i) => (
          <div key={answer} className={i === 1 ? "picked" : ""}>
            <b>{answer}</b>
            <span>{i === 1 ? "MY PICK ✓" : t.pickOption}</span>
          </div>
        ))}
      </div>
      <p className="static-audio-note">{t.audioNote}</p>
    </>
  );
}

export function Phone({
  screen = 0,
  locale = "ko",
}: {
  screen?: number;
  locale?: SiteLocale;
}) {
  const Screen = [
    HomeScreen,
    QuestionScreen,
    WordsScreen,
    HistoryScreen,
    ListeningScreen,
  ][screen];
  const navigation = SITE_COPY[locale].phone.nav;
  return (
    <div className="phone">
      <div className="phone-status">
        <span>9:41</span>
        <span className="phone-island" />
        <span>▮▮▮ ▰</span>
      </div>
      <div className="phone-content">
        <Screen locale={locale} />
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
