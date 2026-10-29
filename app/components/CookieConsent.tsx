"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "./I18nProvider";
import { site } from "../lib/site";

type Consent = { analytics: boolean; at: string };

function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const raw = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${site.cookieName}=`))
    ?.split("=")[1];
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as Consent;
    return typeof parsed?.analytics === "boolean" ? parsed : null;
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (readConsent()) return undefined;
    const timer = window.setTimeout(() => setVisible(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  const choose = (analytics: boolean) => {
    const value: Consent = { analytics, at: new Date().toISOString() };
    document.cookie = `${site.cookieName}=${encodeURIComponent(
      JSON.stringify(value),
    )}; path=/; max-age=15552000; samesite=lax`;
    setVisible(false);
    window.dispatchEvent(new CustomEvent("ta-consent", { detail: value }));
  };

  if (!visible) return null;

  return (
    <div
      className="ta-cookie"
      role="dialog"
      aria-modal="false"
      aria-labelledby="ta-cookie-title"
      aria-describedby="ta-cookie-text"
    >
      <h2 id="ta-cookie-title">{t("cookie.title")}</h2>
      <p id="ta-cookie-text">
        {t("cookie.text")} <Link href="/privacy">{t("cookie.more")}</Link>.
      </p>
      <div className="ta-cookie-actions">
        <button type="button" className="ta-btn" onClick={() => choose(false)}>
          {t("cookie.essential")}
        </button>
        <button type="button" className="ta-btn ta-btn--solid" onClick={() => choose(true)}>
          {t("cookie.accept")}
        </button>
      </div>
    </div>
  );
}
