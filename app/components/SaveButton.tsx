"use client";

import { useI18n } from "./I18nProvider";
import { useSaved } from "../lib/saved";

export function SaveButton({ slug, label }: { slug: string; label: string }) {
  const { t } = useI18n();
  const { slugs, ready, toggle } = useSaved();
  const saved = slugs.includes(slug);

  return (
    <button
      type="button"
      className="ta-save"
      aria-pressed={ready ? saved : false}
      aria-label={`${saved ? t("common.saved") : t("common.save")}: ${label}`}
      onClick={() => toggle(slug)}
      data-slug={slug}
    >
      <i className={`fa ${saved ? "fa-bookmark" : "fa-bookmark-o"}`} aria-hidden="true" />
      {saved ? t("common.saved") : t("common.save")}
    </button>
  );
}
