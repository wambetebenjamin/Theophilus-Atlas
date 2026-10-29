"use client";

import { signOut, useSession } from "next-auth/react";
import { useI18n } from "./I18nProvider";

export function SessionLabel() {
  const { t } = useI18n();
  const { data, status } = useSession();

  if (status !== "authenticated" || !data?.user?.email) {
    return null;
  }

  return (
    <p className="ta-help" style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
      <span>
        {t("auth.signedIn")} <strong style={{ color: "#3C3B3B" }}>{data.user.email}</strong>
      </span>
      <button
        type="button"
        className="ta-save"
        onClick={() => signOut({ callbackUrl: "/" })}
        aria-label={t("nav.signOut")}
      >
        {t("nav.signOut")}
      </button>
    </p>
  );
}
