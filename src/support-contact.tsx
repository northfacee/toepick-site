import { useEffect, useState } from "react";
import { SITE_COPY } from "./i18n";
import type { SiteLocale } from "./site-config";

const supportEmail = "support@minlabs.app";

/** JavaScript나 클립보드 지원 여부와 관계없이 문의 주소를 읽고 선택할 수 있다. */
export function SupportContact({ locale = "ko" }: { locale?: SiteLocale }) {
  const [ready, setReady] = useState(false);
  const [copying, setCopying] = useState(false);
  const [message, setMessage] = useState("");
  const copy = SITE_COPY[locale].footer;
  useEffect(() => setReady(true), []);

  async function copyAddress() {
    if (copying) return;
    setCopying(true);
    setMessage("");
    try {
      await navigator.clipboard.writeText(supportEmail);
      setMessage(copy.copySuccess);
    } catch {
      setMessage(copy.copyError);
    } finally {
      setCopying(false);
    }
  }

  return (
    <div className="footer-contact" aria-label={copy.contactAria}>
      <div className="contact-address">
        <span className="contact-label">{copy.contactLabel}</span>
        <span className="contact-email">{supportEmail}</span>
        <button
          type="button"
          className="copy-address"
          aria-label={copy.copyAria}
          disabled={!ready || copying}
          onClick={() => void copyAddress()}
        >
          {copying ? copy.copyingButton : copy.copyButton}
        </button>
      </div>
      <output className="copy-status" aria-live="polite">
        {message}
      </output>
    </div>
  );
}
