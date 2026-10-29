"use client";

import { SessionProvider } from "next-auth/react";
import { I18nProvider } from "./I18nProvider";
import type { Locale } from "../lib/site";
import type { ReactNode } from "react";

export function Providers({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <SessionProvider>
      <I18nProvider initialLocale={locale}>{children}</I18nProvider>
    </SessionProvider>
  );
}
