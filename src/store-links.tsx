import { ArrowUpRight, Smartphone, Play } from "lucide-react";
import { STORE_URLS } from "./site-config";

export function StoreLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`store-links${compact ? " compact" : ""}`}
      aria-label="앱 다운로드"
    >
      <a
        className="store-link store-apple"
        href={STORE_URLS.apple}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="App Store에서 다운로드 (새 창)"
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
        href={STORE_URLS.google}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Google Play에서 다운로드 (새 창)"
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
