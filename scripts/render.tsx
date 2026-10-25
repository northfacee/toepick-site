import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { renderToString } from "react-dom/server";
import { App } from "../src/app";
import { SITE_COPY } from "../src/i18n";
import {
  BASE,
  SITE_LOCALES,
  SITE_ORIGIN,
  localeHomePath,
  localePrivacyPath,
  localeSlug,
} from "../src/site-config";

for (const locale of SITE_LOCALES) {
  const meta = SITE_COPY[locale].meta;
  const slug = localeSlug(locale);
  for (const privacy of [false, true]) {
    const title = privacy ? meta.privacyTitle : meta.homeTitle;
    const description = privacy ? meta.privacyDescription : meta.homeDescription;
    const outPath =
      locale === "ko"
        ? privacy
          ? "privacy/index.html"
          : "index.html"
        : privacy
          ? `${slug}/privacy/index.html`
          : `${slug}/index.html`;
    await mkdir(dirname(outPath), { recursive: true });
    const routeFor = (l: typeof locale) =>
      privacy ? localePrivacyPath(l) : localeHomePath(l);
    const alternates = [
      ...SITE_LOCALES.map(
        (l) =>
          `<link rel="alternate" hreflang="${l}" href="${SITE_ORIGIN}${routeFor(l)}"/>`,
      ),
      `<link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}${routeFor("ko")}"/>`,
    ].join("");
    await writeFile(
      outPath,
      `<!doctype html>\n<html lang="${locale}"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><meta name="theme-color" content="#faf8f5"/><title>${title}</title><meta name="description" content="${description}"/><meta property="og:title" content="${title}"/><meta property="og:description" content="${description}"/><meta property="og:type" content="website"/><meta property="og:locale" content="${meta.ogLocale}"/>${alternates}<link rel="icon" href="${BASE}app-icon.png"/><link rel="stylesheet" href="/src/styles.css"/><link rel="stylesheet" href="/src/showcase.css"/></head><body data-page="${privacy ? "privacy" : "home"}" data-lang="${locale}"><div id="root">${renderToString(<App privacy={privacy} locale={locale} />)}</div><script type="module" src="/src/main.tsx"></script></body></html>\n`,
    );
  }
}
