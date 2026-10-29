"use client";

import Link from "next/link";
import { useState } from "react";
import { useI18n } from "./I18nProvider";
import { useNotes, useSaved } from "../lib/saved";
import { clusterById } from "../../data/clusters";
import { sites } from "../../data/sites";

export function SavedShelf() {
  const { t } = useI18n();
  const { slugs, ready, toggle } = useSaved();
  const { notes, setNote } = useNotes();
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const saved = sites.filter((site) => slugs.includes(site.slug));

  if (!ready) {
    return <p className="ta-help">{t("common.loading")}</p>;
  }

  if (saved.length === 0) {
    return (
      <div className="ta-empty">
        <h3>{t("saved.title")}</h3>
        <p>{t("saved.empty")}</p>
        <p style={{ marginTop: 16 }}>
          <Link className="ta-btn" href="/directory">
            {t("nav.directory")}
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="ta-count" style={{ marginBottom: 16 }}>
        <b>{saved.length}</b> {t("saved.count")}
      </p>
      <ul className="ta-list">
        {saved.map((site) => {
          const cluster = clusterById[site.cluster];
          const draft = drafts[site.slug] ?? notes[site.slug] ?? "";
          return (
            <li className="ta-site" key={site.slug}>
              <div className="ta-site-top">
                <h3>
                  <a href={site.url ?? site.repo} target="_blank" rel="noopener noreferrer">
                    {site.name}
                  </a>
                </h3>
                <span className="ta-site-n">{String(site.n).padStart(3, "0")}</span>
              </div>
              <div className="ta-site-meta">
                <span>{cluster?.short}</span>
                <span>{site.city}</span>
                <span>{site.country}</span>
              </div>
              <p>{site.line}</p>
              <div className="ta-field">
                <label htmlFor={`note-${site.slug}`}>{t("saved.notes")}</label>
                <input
                  id={`note-${site.slug}`}
                  type="text"
                  className="ta-input"
                  value={draft}
                  placeholder={t("saved.notesPlaceholder")}
                  maxLength={280}
                  onChange={(event) =>
                    setDrafts((current) => ({ ...current, [site.slug]: event.target.value }))
                  }
                />
              </div>
              <div className="ta-site-foot">
                <button
                  type="button"
                  className="ta-visit"
                  style={{ background: "none", border: 0, borderBottom: "1px dashed var(--ta-gold)", padding: 0, cursor: "pointer" }}
                  onClick={() => setNote(site.slug, draft)}
                >
                  {t("saved.saveNote")}
                </button>
                <button type="button" className="ta-save" onClick={() => toggle(site.slug)}>
                  <i className="fa fa-times" aria-hidden="true" />
                  {t("saved.remove")}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="ta-help" style={{ marginTop: 18 }}>
        {t("saved.noteText")}
      </p>
    </div>
  );
}
