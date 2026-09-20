import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { App } from "./app";
const root = document.getElementById("root");
if (root)
  hydrateRoot(
    root,
    <StrictMode>
      <App privacy={document.body.dataset.page === "privacy"} />
    </StrictMode>,
  );
