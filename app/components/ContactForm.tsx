"use client";

import { useCallback, useState } from "react";
import { Captcha } from "./Captcha";
import { useI18n } from "./I18nProvider";
import type { CaptchaProvider } from "../lib/captcha";

const topics = [
  { value: "build", key: "contact.topicBuild" },
  { value: "teach", key: "contact.topicTeach" },
  { value: "reuse", key: "contact.topicReuse" },
  { value: "other", key: "contact.topicOther" },
] as const;

export function ContactForm() {
  const { t } = useI18n();
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [waLink, setWaLink] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [provider, setProvider] = useState<CaptchaProvider>("local");

  const onToken = useCallback((next: string | null, kind: CaptchaProvider) => {
    setToken(next);
    setProvider(kind);
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setState("sending");
    setErrors({});
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          organisation: data.get("organisation"),
          topic: data.get("topic"),
          message: data.get("message"),
          website: data.get("website"),
          captchaToken: token,
          captchaProvider: provider,
        }),
      });
      const result = (await response.json()) as {
        ok: boolean;
        errors?: Record<string, string>;
        error?: string;
        waLink?: string;
      };
      if (!response.ok || !result.ok) {
        setErrors(result.errors ?? { form: result.error ?? "Could not send the message." });
        setState("idle");
        return;
      }
      setWaLink(result.waLink ?? "");
      setState("done");
      form.reset();
    } catch {
      setErrors({ form: "Network problem. Please try again." });
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div className="ta-success" role="status">
        <p style={{ margin: 0 }}>{t("contact.success")}</p>
        {waLink ? (
          <p style={{ margin: "12px 0 0" }}>
            <a className="ta-btn" href={waLink} target="_blank" rel="noopener noreferrer">
              {t("common.whatsapp")}
            </a>
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form className="ta-form" onSubmit={submit} noValidate>
      <div className="ta-form-row">
        <div className="ta-field">
          <label htmlFor="ta-name">
            {t("common.name")} <span aria-hidden="true">*</span>
          </label>
          <input id="ta-name" name="name" type="text" autoComplete="name" required maxLength={100} />
          {errors.name ? <p className="ta-error">{errors.name}</p> : null}
        </div>
        <div className="ta-field">
          <label htmlFor="ta-email">
            {t("common.email")} <span aria-hidden="true">*</span>
          </label>
          <input id="ta-email" name="email" type="email" autoComplete="email" required maxLength={160} />
          {errors.email ? <p className="ta-error">{errors.email}</p> : null}
        </div>
      </div>

      <div className="ta-form-row">
        <div className="ta-field">
          <label htmlFor="ta-organisation">{t("contact.organisation")}</label>
          <input id="ta-organisation" name="organisation" type="text" maxLength={120} />
        </div>
        <div className="ta-field">
          <label htmlFor="ta-topic">{t("contact.topic")}</label>
          <select id="ta-topic" name="topic" defaultValue="build">
            {topics.map((topic) => (
              <option key={topic.value} value={topic.value}>
                {t(topic.key)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="ta-field">
        <label htmlFor="ta-message">
          {t("common.message")} <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="ta-message"
          name="message"
          className="ta-textarea"
          required
          minLength={20}
          maxLength={1200}
        />
        {errors.message ? <p className="ta-error">{errors.message}</p> : null}
      </div>

      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label htmlFor="ta-website">Website</label>
        <input id="ta-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Captcha onToken={onToken} />
      {errors.captcha ? <p className="ta-error">{errors.captcha}</p> : null}
      {errors.form ? <p className="ta-error">{errors.form}</p> : null}

      <div>
        <button type="submit" className="ta-btn ta-btn--solid" disabled={state === "sending"}>
          {state === "sending" ? t("common.sending") : t("common.send")}
        </button>
      </div>
      <p className="ta-help">{t("contact.formText")}</p>
    </form>
  );
}
