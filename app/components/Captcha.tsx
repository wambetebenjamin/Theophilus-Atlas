"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "./I18nProvider";
import type { CaptchaProvider } from "../lib/captcha";

type Props = {
  onToken: (token: string | null, provider: CaptchaProvider) => void;
};

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
      render: (
        element: HTMLElement,
        opts: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback": () => void;
          theme?: "light" | "dark";
        },
      ) => number;
    };
  }
}

export function Captcha({ onToken }: Props) {
  const { t } = useI18n();
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";
  const version = process.env.NEXT_PUBLIC_RECAPTCHA_VERSION === "v2" ? "v2" : "v3";
  const [mode, setMode] = useState<CaptchaProvider>(siteKey ? version : "local");
  const [ready, setReady] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const v2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onToken(null, mode);
  }, [mode, onToken]);

  const handleV3 = useCallback(async () => {
    if (!siteKey || !window.grecaptcha) return;
    try {
      const token = await window.grecaptcha.execute(siteKey, { action: "contact" });
      onToken(token, "v3");
    } catch {
      setMode("local");
      onToken(null, "local");
    }
  }, [onToken, siteKey]);

  useEffect(() => {
    if (mode !== "v3" || !ready) return undefined;
    void handleV3();
    const interval = window.setInterval(() => void handleV3(), 100000);
    return () => window.clearInterval(interval);
  }, [mode, ready, handleV3]);

  useEffect(() => {
    if (mode !== "v2" || !ready || !window.grecaptcha || !v2Ref.current) return;
    const container = v2Ref.current;
    container.innerHTML = "";
    window.grecaptcha.ready(() => {
      if (!window.grecaptcha) return;
      window.grecaptcha.render(container, {
        sitekey: siteKey,
        theme: "light",
        callback: (token: string) => onToken(token, "v2"),
        "expired-callback": () => onToken(null, "v2"),
      });
    });
  }, [mode, ready, onToken, siteKey]);

  if (!siteKey) {
    return (
      <div className="ta-captcha">
        <label className="ta-check" htmlFor="ta-human">
          <input
            id="ta-human"
            type="checkbox"
            checked={confirmed}
            onChange={(event) => {
              const next = event.target.checked;
              setConfirmed(next);
              onToken(next ? `local:${Date.now()}` : null, "local");
            }}
          />
          <span>{t("contact.human")}</span>
        </label>
        <p className="ta-help" style={{ marginTop: 8 }}>
          Spam protection uses this short confirmation until a reCAPTCHA key is configured.
        </p>
      </div>
    );
  }

  return (
    <div className="ta-captcha">
      {mode === "v3" ? (
        <p className="ta-help" style={{ margin: 0 }}>
          This form is protected by reCAPTCHA v3. No checkbox is needed.
        </p>
      ) : (
        <div ref={v2Ref} className="ta-recaptcha" />
      )}
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
        strategy="lazyOnload"
        onLoad={() => setReady(true)}
        onError={() => {
          setMode("local");
          onToken(null, "local");
        }}
      />
      {!ready ? <p className="ta-help">Loading the spam check.</p> : null}
    </div>
  );
}
