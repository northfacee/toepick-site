export const BASE = "/";
export const SITE_ORIGIN = "https://toepick.minlabs.app";
export type SiteLocale = "ko" | "en" | "ja";
export const SITE_LOCALES: readonly SiteLocale[] = ["ko", "en", "ja"] as const;

export const STORE_URLS_BY_LOCALE: Record<
  SiteLocale,
  { apple: string; google: string }
> = {
  ko: {
    apple: "https://apps.apple.com/kr/app/id6810698104",
    google: "https://play.google.com/store/apps/details?id=com.toepick&hl=ko",
  },
  en: {
    apple: "https://apps.apple.com/us/app/id6810698104",
    google: "https://play.google.com/store/apps/details?id=com.toepick&hl=en",
  },
  ja: {
    apple: "https://apps.apple.com/jp/app/id6810698104",
    google: "https://play.google.com/store/apps/details?id=com.toepick&hl=ja",
  },
};

export const STORE_URLS = STORE_URLS_BY_LOCALE.ko;

export function isSiteLocale(value: string | undefined): value is SiteLocale {
  return value === "ko" || value === "en" || value === "ja";
}

export function localeHomePath(locale: SiteLocale): string {
  return locale === "ko" ? BASE : `${BASE}${locale}/`;
}

export function localePrivacyPath(locale: SiteLocale): string {
  return locale === "ko" ? `${BASE}privacy/` : `${BASE}${locale}/privacy/`;
}
