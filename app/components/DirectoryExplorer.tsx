"use client";

import { useMemo, useState } from "react";
import { useI18n } from "./I18nProvider";
import { SaveButton } from "./SaveButton";
import { clusters, clusterById } from "../../data/clusters";
import { sites, type Site } from "../../data/sites";

type Sort = "challenge" | "name";

function haystack(site: Site): string {
  const cluster = clusterById[site.cluster];
  return [
    site.name,
    site.line,
    site.country,
    site.city,
    cluster?.name ?? "",
    ...(site.reach ?? []),
    ...site.tags,
  ]
    .join(" ")
    .toLowerCase();
}

function SiteCard({ site }: { site: Site }) {
  const { t } = useI18n();
  const cluster = clusterById[site.cluster];

  return (
    <li className="ta-site">
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
      <div className="ta-site-foot">
        <a
          className="ta-visit"
          href={site.url ?? site.repo}
          target="_blank"
          rel="noopener noreferrer"
        >
          {site.url ? t("common.visit") : t("common.repository")}
          <span className="sr-only">, opens in a new tab</span>
        </a>
        <SaveButton slug={site.slug} label={site.name} />
      </div>
    </li>
  );
}

export function DirectoryExplorer({
  initialQuery = "",
  initialCluster = "all",
}: {
  initialQuery?: string;
  initialCluster?: string;
}) {
  const { t } = useI18n();
  const [query, setQuery] = useState(initialQuery);
  const [cluster, setCluster] = useState(initialCluster);
  const [country, setCountry] = useState("all");
  const [sort, setSort] = useState<Sort>("challenge");

  const countries = useMemo(() => {
    const set = new Set<string>();
    sites.forEach((site) => {
      set.add(site.country);
      (site.reach ?? []).forEach((item) => set.add(item));
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const list = sites.filter((site) => {
      if (cluster !== "all" && site.cluster !== cluster) return false;
      if (country !== "all") {
        const reach = site.reach ?? [];
        if (site.country !== country && !reach.includes(country)) return false;
      }
      if (term && !haystack(site).includes(term)) return false;
      return true;
    });
    return list.sort((a, b) =>
      sort === "name" ? a.name.localeCompare(b.name) : a.n - b.n,
    );
  }, [query, cluster, country, sort]);

  const reset = () => {
    setQuery("");
    setCluster("all");
    setCountry("all");
    setSort("challenge");
  };

  return (
    <div>
      <div className="ta-controls">
        <div className="ta-controls-row">
          <div className="ta-field">
            <label htmlFor="ta-search">{t("directory.searchLabel")}</label>
            <input
              id="ta-search"
              type="search"
              value={query}
              placeholder={t("directory.searchPlaceholder")}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="ta-field">
            <label htmlFor="ta-cluster">{t("directory.clusterLabel")}</label>
            <div className="ta-select-wrap">
            <select
              id="ta-cluster"
              value={cluster}
              onChange={(event) => setCluster(event.target.value)}
            >
              <option value="all">{t("common.allClusters")}</option>
              {clusters.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            </div>
          </div>
          <div className="ta-field">
            <label htmlFor="ta-country">{t("directory.countryLabel")}</label>
            <div className="ta-select-wrap">
            <select
              id="ta-country"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
            >
              <option value="all">{t("common.allCountries")}</option>
              {countries.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            </div>
          </div>
          <div className="ta-field">
            <label htmlFor="ta-sort">{t("directory.sortLabel")}</label>
            <div className="ta-select-wrap">
            <select
              id="ta-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as Sort)}
            >
              <option value="challenge">{t("directory.sortChallenge")}</option>
              <option value="name">{t("directory.sortName")}</option>
            </select>
            </div>
          </div>
        </div>
        <div className="ta-controls-foot">
          <p className="ta-count" aria-live="polite">
            {t("directory.showing")} <b>{filtered.length}</b> {t("directory.of")}{" "}
            <b>{sites.length}</b> {t("common.results")}
          </p>
          <button type="button" className="ta-reset" onClick={reset}>
            {t("common.reset")}
          </button>
        </div>
      </div>

      {filtered.length > 0 ? (
        <ul className="ta-list">
          {filtered.map((site) => (
            <SiteCard key={site.slug} site={site} />
          ))}
        </ul>
      ) : (
        <div className="ta-empty">
          <h3>{t("common.noResults")}</h3>
          <p>{t("common.noResultsHelp")}</p>
          <p style={{ marginTop: 14 }}>
            <button type="button" className="ta-btn" onClick={reset}>
              {t("common.reset")}
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
