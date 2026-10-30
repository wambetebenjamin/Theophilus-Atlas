"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "./I18nProvider";
import { primaryNav } from "../lib/nav";
import { site, type Locale } from "../lib/site";

const locales: { code: Locale; label: string; full: string }[] = [
  { code: "en", label: "EN", full: "English" },
  { code: "sw", label: "SW", full: "Kiswahili" },
  { code: "fr", label: "FR", full: "Francais" },
];

function Brand() {
  return (
    <Link href="/" className="ta-brand" aria-label={`${site.name}, home`}>
      <strong>Theophilus</strong>
      <span>Atlas</span>
    </Link>
  );
}

function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  return (
    <div className="ta-lang" role="group" aria-label={t("nav.language")}>
      {locales.map((item) => (
        <button
          key={item.code}
          type="button"
          aria-pressed={locale === item.code}
          aria-label={item.full}
          title={item.full}
          lang={item.code}
          onClick={() => setLocale(item.code)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [affix, setAffix] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setAffix(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("ta-sheet-open");
    const first = panelRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("ta-sheet-open");
    };
  }, [open, close]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className={`ta-header${affix ? " is-affix" : ""}`}>
        <div className="container">
          <div className="ta-header-inner">
            <Brand />
            <nav aria-label={t("nav.menu")}>
              <ul className="ta-nav">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
                      {t(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="ta-header-tools">
              <span className="ta-mark" aria-label={site.mark}>
                {site.mark}
              </span>
              <LanguageSwitcher />
              <button
                ref={triggerRef}
                type="button"
                className="ta-menu-btn"
                aria-label={t("nav.menu")}
                aria-expanded={open}
                aria-controls="ta-sheet"
                onClick={() => setOpen(true)}
              >
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {open ? (
        <div className="ta-sheet" role="presentation" onClick={close}>
          <div
            id="ta-sheet"
            ref={panelRef}
            className="ta-sheet-panel"
            role="dialog"
            aria-modal="true"
            aria-label={t("nav.menu")}
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="ta-sheet-close" aria-label={t("nav.close")} onClick={close}>
              <span aria-hidden="true">&#215;</span>
            </button>
            <h2>{t("nav.menu")}</h2>
            <ul>
              <li>
                <Link href="/" aria-current={isActive("/") ? "page" : undefined}>
                  Home
                </Link>
              </li>
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
                    {t(item.key)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/saved">{t("nav.saved")}</Link>
              </li>
              <li>
                <Link href="/sign-in">{t("nav.signIn")}</Link>
              </li>
            </ul>
            <LanguageSwitcher />
          </div>
        </div>
      ) : null}
    </>
  );
}
