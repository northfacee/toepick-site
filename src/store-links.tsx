import { ArrowUpRight, Smartphone, Play } from "lucide-react";
import { SITE_COPY } from "./i18n";
import { STORE_URLS_BY_LOCALE, type SiteLocale } from "./site-config";

export function StoreLinks({
  compact = false,
  locale = "ko",
}: {
  compact?: boolean;
  locale?: SiteLocale;
}) {
  const urls = STORE_URLS_BY_LOCALE[locale];
  const copy = SITE_COPY[locale].store;
  return (
    <div
      className={`store-links${compact ? " compact" : ""}`}
      aria-label={copy.groupAria}
    >
      <a
        className="store-link store-apple"
        href={urls.apple}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={copy.appleAria}
      >
        <Smartphone size={24} strokeWidth={1.7} />
        <span>
          <small>iPhone · iPad</small>
          <b>App Store</b>
        </span>
        <ArrowUpRight size={17} />
      </a>
      <a
        className="store-link store-google"
        href={urls.google}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={copy.googleAria}
      >
        <Play size={23} strokeWidth={1.7} />
        <span>
          <small>Android</small>
          <b>Google Play</b>
        </span>
        <ArrowUpRight size={17} />
      </a>
    </div>
  );
}
