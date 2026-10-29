"use client";

import Link from "next/link";
import { useI18n } from "./I18nProvider";
import { footerAtlas, footerLearn, footerUse } from "../lib/nav";
import { site, whatsappLink } from "../lib/site";
import { liveCount, sites } from "../../data/sites";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="ta-footer">
      <div className="container">
        <div className="ta-footer-top">
          <div className="ta-footer-cols">
            <div>
              <Link href="/" className="ta-brand" aria-label={`${site.name}, home`}>
                <strong>Theophilus</strong>
                <span>Atlas</span>
              </Link>
              <p style={{ marginTop: 14, maxWidth: 380 }}>{t("footer.tagline")}</p>
              <p style={{ maxWidth: 380 }}>{t("footer.challenge")}: 100 of 100, {sites.length} sites, {liveCount} public deployments.</p>
              <ul className="ta-footer-contact">
                <li>
                  <i className="fa fa-whatsapp" aria-hidden="true" />
                  <a href={whatsappLink("Hello Theophilus Atlas, I would like to talk about the atlas.")} target="_blank" rel="noopener noreferrer">
                    {site.whatsappDisplay}
                  </a>
                </li>
                <li>
                  <i className="fa fa-envelope-o" aria-hidden="true" />
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
                <li>
                  <i className="fa fa-map-marker" aria-hidden="true" />
                  <span>Nairobi, Kenya</span>
                </li>
              </ul>
            </div>

            <div>
              <h2>{t("nav.footerAtlas")}</h2>
              <ul>
                {footerAtlas.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{t(item.key)}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2>{t("nav.footerLearn")}</h2>
              <ul>
                {footerLearn.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{t(item.key)}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2>{t("nav.footerUse")}</h2>
              <ul>
                {footerUse.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{t(item.key)}</Link>
                  </li>
                ))}
              </ul>
              <div className="ta-footer-mark" aria-label={t("footer.mark")}>
                <b>100</b>
                <span>of 100</span>
              </div>
            </div>
          </div>
        </div>

        <div className="ta-footer-note">
          <p>{t("footer.note")}</p>
        </div>

        <div className="ta-footer-bottom">
          <p>
            {"\u00A9"} {new Date().getFullYear()} {site.name}. {t("footer.rights")}
          </p>
          <div className="ta-foot-links">
            <Link href="/privacy">{t("nav.privacy")}</Link>
            <Link href="/terms">{t("nav.terms")}</Link>
            <Link href="/credits">{t("nav.credits")}</Link>
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
