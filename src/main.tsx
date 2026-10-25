import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { App } from "./app";
import { isSiteLocale } from "./site-config";

const root = document.getElementById("root");
if (root) {
  const rawLang = document.body.dataset.lang;
  const locale = isSiteLocale(rawLang) ? rawLang : "ko";
  hydrateRoot(
    root,
    <StrictMode>
      <App
        privacy={document.body.dataset.page === "privacy"}
        locale={locale}
      />
    </StrictMode>,
  );
}
