"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useI18n } from "./I18nProvider";
import { clusterCounts, countryCounts, dayCounts, reachCounts } from "../lib/atlas";

// Token hexes from app/globals.css. Recharts writes these into SVG
// presentation attributes, where var() is not resolved, so the palette is
// repeated here and kept in step with the :root block by hand.
const ink = "#3C3B3B";
const muted = "#999999";
const line = "#ededed";

export const chartInk = {
  accent: "#F7C221",
  accentSoft: "#E9BF66",
  heading: "#3C3B3B",
  slate: "#726C6C",
  muted: "#999999",
  green: "#3FBF79",
  black: "#222222",
  line: "#DDDDDD",
};

const palette = [
  chartInk.accent,
  chartInk.accentSoft,
  chartInk.heading,
  chartInk.slate,
  chartInk.muted,
  chartInk.green,
  chartInk.black,
  chartInk.line,
];

const axisStyle = {
  fontFamily: "Raleway, sans-serif",
  fontSize: 11,
  fill: "#666666",
};

function DataTable({ caption, rows }: { caption: string; rows: { label: string; value: number }[] }) {
  return (
    <table className="sr-only">
      <caption>{caption}</caption>
      <thead>
        <tr>
          <th scope="col">Item</th>
          <th scope="col">Count</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label}>
            <th scope="row">{row.label}</th>
            <td>{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ClusterChart() {
  const { t } = useI18n();
  const data = useMemo(() => clusterCounts, []);

  return (
    <figure style={{ margin: 0 }}>
      <div
        className="ta-chart-wrap ta-chart-wrap--tall"
        role="img"
        aria-label={`${t("atlas.chart1")}: bar chart, from ${data[0]?.label} at ${data[0]?.value} builds to ${data[data.length - 1]?.label} at ${data[data.length - 1]?.value} builds.`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 8, right: 22, bottom: 8, left: 4 }}>
            <CartesianGrid stroke={line} horizontal={false} />
            <XAxis type="number" tick={axisStyle} axisLine={{ stroke: line }} tickLine={false} allowDecimals={false} />
            <YAxis
              type="category"
              dataKey="label"
              width={112}
              tick={axisStyle}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(60, 59, 59, 0.06)" }}
              contentStyle={{
                border: "1px solid #ececec",
                borderRadius: 0,
                fontFamily: "Raleway, sans-serif",
                fontSize: 12,
                color: ink,
              }}
            />
            <Bar dataKey="value" name="Sites" isAnimationActive={false} barSize={16}>
              {data.map((entry, index) => (
                <Cell key={entry.key} fill={palette[index % palette.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <DataTable caption={t("atlas.chart1")} rows={data.map((d) => ({ label: d.label, value: d.value }))} />
      <p className="ta-chart-note">{t("atlas.chartNote")}</p>
    </figure>
  );
}

export function CountryChart() {
  const { t } = useI18n();
  const data = useMemo(() => countryCounts, []);
  const beyond = useMemo(() => reachCounts, []);
  const top = beyond.slice(0, 7);

  return (
    <figure style={{ margin: 0 }}>
      <div
        className="ta-chart-wrap ta-chart-wrap--tall"
        role="img"
        aria-label={`${t("atlas.chart2")}: ${top.length} countries named beyond Kenya, led by ${top[0]?.label} with ${top[0]?.value} mentions. Every one of the ${data.find((d) => d.key === "kenya")?.value ?? 100} builds starts in Kenya.`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={top} layout="vertical" margin={{ top: 8, right: 18, bottom: 8, left: 4 }}>
            <CartesianGrid stroke={line} horizontal={false} />
            <XAxis type="number" tick={axisStyle} axisLine={{ stroke: line }} tickLine={false} allowDecimals={false} />
            <YAxis type="category" dataKey="label" width={92} tick={axisStyle} axisLine={false} tickLine={false} />
            <Tooltip
              cursor={{ fill: "rgba(60,59,59,0.06)" }}
              contentStyle={{
                border: "1px solid #ececec",
                borderRadius: 0,
                fontFamily: "Raleway, sans-serif",
                fontSize: 12,
                color: ink,
              }}
            />
            <Bar dataKey="value" name="Mentions" isAnimationActive={false} barSize={16}>
              {top.map((entry, index) => (
                <Cell key={entry.key} fill={palette[(index + 1) % palette.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <DataTable caption={t("atlas.chart2")} rows={data.map((d) => ({ label: d.label, value: d.value }))} />
      <p className="ta-chart-note">
        All 100 builds start in Kenya. The bars count the other countries a build names, so a build with a wider
        reach counts for each one.
      </p>
    </figure>
  );
}

export function PaceChart() {
  const { t } = useI18n();
  const data = useMemo(() => dayCounts, []);

  return (
    <figure style={{ margin: 0 }}>
      <div
        className="ta-chart-wrap"
        role="img"
        aria-label={`${t("atlas.chart3")}: ${data.length} delivery days from ${data[0]?.label} to ${data[data.length - 1]?.label}, with the heaviest day at ${Math.max(...data.map((d) => d.value))} builds.`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 12, bottom: 4, left: 0 }}>
            <CartesianGrid stroke={line} vertical={false} />
            <XAxis dataKey="label" tick={{ ...axisStyle, fontSize: 10 }} axisLine={{ stroke: line }} tickLine={false} interval={1} />
            <YAxis tick={axisStyle} axisLine={false} tickLine={false} allowDecimals={false} width={28} />
            <Tooltip
              cursor={{ fill: "rgba(60,59,59,0.06)" }}
              contentStyle={{
                border: "1px solid #ececec",
                borderRadius: 0,
                fontFamily: "Raleway, sans-serif",
                fontSize: 12,
                color: ink,
              }}
              labelFormatter={(label) => `Build day ${label}`}
            />
            <Bar dataKey="value" name="Sites" fill={chartInk.accent} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <DataTable caption={t("atlas.chart3")} rows={data.map((d) => ({ label: d.label, value: d.value }))} />
      <p className="ta-chart-note">
        Delivery days only. Gaps between them were weekends, editing passes and the last four builds.
      </p>
    </figure>
  );
}

export function ThemeBars({ rows }: { rows: { label: string; value: number; share: number }[] }) {
  return (
    <ul className="ta-bar-static">
      {rows.map((row) => (
        <li key={row.label}>
          <span className="label">{row.label}</span>
          <span className="track" aria-hidden="true">
            <span className="fill" style={{ width: `${row.share}%` }} />
          </span>
          <b>{row.value}</b>
        </li>
      ))}
    </ul>
  );
}

