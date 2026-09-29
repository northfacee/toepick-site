import { useEffect, useState } from "react";

const supportEmail = "support@minlabs.app";

/** JavaScript나 클립보드 지원 여부와 관계없이 문의 주소를 읽고 선택할 수 있다. */
export function SupportContact() {
  const [ready, setReady] = useState(false);
  const [copying, setCopying] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => setReady(true), []);

  async function copyAddress() {
    if (copying) return;
    setCopying(true);
    setMessage("");
    try {
      await navigator.clipboard.writeText(supportEmail);
      setMessage("이메일 주소를 복사했어요.");
    } catch {
      setMessage("복사하지 못했어요. 주소를 선택해 직접 복사해 주세요.");
    } finally {
      setCopying(false);
    }
  }

  return (
    <div className="footer-contact" aria-label="이메일 문의">
      <div className="contact-address">
        <span className="contact-label">문의</span>
        <span className="contact-email">{supportEmail}</span>
        <button type="button" className="copy-address" aria-label="이메일 주소 복사" disabled={!ready || copying} onClick={() => void copyAddress()}>
          {copying ? "복사 중…" : "주소 복사"}
        </button>
      </div>
      <output className="copy-status" aria-live="polite">{message}</output>
    </div>
  );
}
