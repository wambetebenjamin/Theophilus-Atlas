"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useI18n } from "./I18nProvider";

export function SignInForm() {
  const { t } = useI18n();
  const [state, setState] = useState<"idle" | "working" | "error">("idle");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setState("working");
    const result = await signIn("credentials", {
      email: data.get("email"),
      name: data.get("name"),
      redirect: false,
    });
    if (result?.error) {
      setState("error");
      return;
    }
    window.location.href = "/saved";
  }

  return (
    <form className="ta-form" onSubmit={submit}>
      <div className="ta-field">
        <label htmlFor="ta-signin-email">{t("auth.email")}</label>
        <input id="ta-signin-email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="ta-field">
        <label htmlFor="ta-signin-name">
          {t("auth.name")} <span className="ta-help">({t("common.optional")})</span>
        </label>
        <input id="ta-signin-name" name="name" type="text" autoComplete="name" maxLength={80} />
      </div>
      {state === "error" ? <p className="ta-error">Check the email address and try again.</p> : null}
      <div>
        <button type="submit" className="ta-btn ta-btn--solid" disabled={state === "working"}>
          {state === "working" ? t("auth.working") : t("auth.submit")}
        </button>
      </div>
      <p className="ta-help">{t("auth.note")}</p>
    </form>
  );
}
