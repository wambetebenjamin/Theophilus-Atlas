import { clusters, clusterById } from "../../data/clusters";
import { sites } from "../../data/sites";

export type Count = { key: string; label: string; value: number; tone?: string };

export const totalSites = sites.length;

export const liveSites = sites.filter((site) => Boolean(site.url)).length;

export const clusterCounts: Count[] = clusters
  .map((cluster) => ({
    key: cluster.id,
    label: cluster.short,
    value: sites.filter((site) => site.cluster === cluster.id).length,
    tone: cluster.tone,
  }))
  .sort((a, b) => b.value - a.value);

/**
 * Countries named across the set. A build may name several countries, so this
 * counts mentions rather than rows, and the chart says so.
 */
export const countryCounts: Count[] = (() => {
  const map = new Map<string, number>();
  sites.forEach((site) => {
    const named = site.reach ?? [site.country];
    new Set(named).forEach((country) => {
      map.set(country, (map.get(country) ?? 0) + 1);
    });
  });
  return Array.from(map.entries())
    .map(([label, value]) => ({ key: label.toLowerCase(), label, value }))
    .sort((a, b) => b.value - a.value);
})();

export const countryMentions = countryCounts.reduce((sum, item) => sum + item.value, 0);

/**
 * Countries named by more than one build, with Kenya held separately because
 * every build in the set starts there. This is what the atlas chart plots,
 * so the ring or the bars are never a single wedge.
 */
export const reachCounts: Count[] = countryCounts.filter((item) => item.key !== "kenya");

export const reachMentions = reachCounts.reduce((sum, item) => sum + item.value, 0);

export const multiCountryBuilds = sites.filter((site) => (site.reach?.length ?? 0) > 1).length;

/**
 * Delivery rhythm. The challenge shipped in its own order, which the dates make
 * visible: a first week of general builds, a wide middle, and a closing run.
 */
export const dayCounts: Count[] = (() => {
  const map = new Map<string, number>();
  sites.forEach((site) => {
    map.set(site.built, (map.get(site.built) ?? 0) + 1);
  });
  return Array.from(map.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, value]) => ({
      key: date,
      label: `${date.slice(8, 10)}/${date.slice(5, 7)}`,
      value,
    }));
})();

export const buildDays = dayCounts.length;

export const busiestDay = dayCounts.reduce(
  (best, item) => (item.value > best.value ? item : best),
  dayCounts[0] ?? { key: "", label: "", value: 0 },
);

export const firstBuild = sites.reduce(
  (first, site) => (site.built < first ? site.built : first),
  sites[0]?.built ?? "",
);

export const lastBuild = sites.reduce(
  (last, site) => (site.built > last ? site.built : last),
  sites[0]?.built ?? "",
);

export function formatBuildDate(value: string): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [year, month, day] = value.split("-");
  return `${Number(day)} ${months[Number(month) - 1]} ${year}`;
}

export const clusterShare = clusterCounts.map((item) => ({
  ...item,
  share: Math.round((item.value / totalSites) * 100),
}));

export const topCluster = clusterShare[0];

export const clusterName = (id: string) => {
  const found = clusters.find((cluster) => cluster.id === id);
  return found?.name ?? id;
};
