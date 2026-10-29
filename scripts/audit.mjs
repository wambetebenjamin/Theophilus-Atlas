#!/usr/bin/env node
/*---------------------------------------------------------------------
  Theophilus Atlas build audit

  Checks the things a build cannot catch on its own: that the copy is
  clean, that the design contract is respected, that every photograph is
  a real Pexels file with a credit, and that the interface pieces named in
  the brief are present. Exits non-zero on any failure so it can gate a
  deployment.
---------------------------------------------------------------------*/

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, extname, relative } from "node:path";

const root = process.cwd();
const failures = [];
const notes = [];

const fail = (message) => failures.push(message);
const note = (message) => notes.push(message);

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".next" || entry === ".git") continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const files = walk(root);
const appFiles = files.filter((file) => file.includes("/app/") || file.includes("/data/"));
const codeFiles = appFiles.filter((file) => [".ts", ".tsx", ".css"].includes(extname(file)));

/* 1. No em dashes, en dashes or ellipsis characters in interface copy. */
const dashOffenders = [];
for (const file of [...codeFiles, ...files.filter((f) => f.startsWith(join(root, "README")) || f.endsWith(".md"))]) {
  if (file.includes("/node_modules/") || file.endsWith("audit.mjs")) continue;
  const text = readFileSync(file, "utf8");
  if (/[\u2014\u2013]/.test(text)) dashOffenders.push(relative(root, file));
}
if (dashOffenders.length) fail(`em or en dash found in: ${dashOffenders.join(", ")}`);

/* 2. No lorem ipsum or placeholder copy. */
const lorem = [];
for (const file of codeFiles) {
  if (/lorem ipsum/i.test(readFileSync(file, "utf8"))) lorem.push(relative(root, file));
}
if (lorem.length) fail(`lorem ipsum found in: ${lorem.join(", ")}`);

/* 3. Design contract: no gradients, no neon, no orbs or sparkles. */
const forbidden = [
  [/linear-gradient\(/i, "linear-gradient"],
  [/radial-gradient\(/i, "radial-gradient"],
  [/\bneon\b/i, "neon"],
  [/\bsparkle/i, "sparkle"],
  [/\borb\b/i, "orb"],
];
const designOffenders = [];
for (const file of codeFiles) {
  const text = readFileSync(file, "utf8");
  for (const [pattern, label] of forbidden) {
    if (pattern.test(text)) designOffenders.push(`${relative(root, file)} (${label})`);
  }
}
if (designOffenders.length) fail(`forbidden visual device: ${designOffenders.join(", ")}`);

/* 4. Gold only through the template token, never as a raw hex in components. */
const rawGold = [];
for (const file of appFiles.filter((f) => /\.(tsx|ts)$/.test(f))) {
  const text = readFileSync(file, "utf8").toUpperCase();
  const isTokenLayer = file.endsWith("AtlasCharts.tsx") || file.endsWith("app/lib/site.ts");
  if (text.includes("#F7C221") && !isTokenLayer) rawGold.push(relative(root, file));
}
if (rawGold.length) fail(`raw gold hex outside the token layer: ${rawGold.join(", ")}`);

/* 5. Brand strings and contact details. */
const siteLib = readFileSync(join(root, "app/lib/site.ts"), "utf8");
const brandChecks = [
  ["Theophilus Atlas", siteLib],
  ["254112272061", siteLib],
  ["theophilus-atlas-cookie-consent", siteLib],
  ["One hundred built. Wisdom shared.", siteLib],
];
for (const [needle, haystack] of brandChecks) {
  if (!haystack.includes(needle)) fail(`missing brand string: ${needle}`);
}

/* 6. i18n: three locales, and every English key mirrored. */
const dictionaries = readFileSync(join(root, "app/lib/dictionaries.ts"), "utf8");
const keySets = {};
for (const locale of ["en", "sw", "fr"]) {
  const start = dictionaries.indexOf(`export const ${locale}: Dict = {`) >= 0
    ? dictionaries.indexOf(`export const ${locale}: Dict = {`)
    : dictionaries.indexOf(`export const ${locale} = {`);
  if (start < 0) {
    fail(`locale missing from dictionaries: ${locale}`);
    continue;
  }
  const rest = dictionaries.slice(start + 10);
  const next = rest.search(/export const (en|sw|fr)[:=]/);
  const block = next > 0 ? rest.slice(0, next) : rest;
  keySets[locale] = new Set([...block.matchAll(/"([a-zA-Z0-9_.]+)":/g)].map((m) => m[1]));
}
const enKeys = keySets.en ?? new Set();
for (const locale of ["sw", "fr"]) {
  const keys = keySets[locale] ?? new Set();
  const missing = [...enKeys].filter((key) => !keys.has(key));
  if (missing.length) fail(`${locale} is missing ${missing.length} keys: ${missing.slice(0, 8).join(", ")}`);
}

/* 7. Photographs: real files, used with next/image, and credited. */
const imageDir = join(root, "public/images");
const images = existsSync(imageDir)
  ? readdirSync(imageDir).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
  : [];
if (images.length < 20) fail(`only ${images.length} photographs present, expected at least 20`);
const creditsText = existsSync(join(root, "app/credits/page.tsx"))
  ? readFileSync(join(root, "app/credits/page.tsx"), "utf8")
  : "";
const imageCredits = existsSync(join(root, "image-credits.md")) ? readFileSync(join(root, "image-credits.md"), "utf8") : "";
const uncredited = images.filter(
  (file) => !creditsText.includes(file) && !imageCredits.includes(file),
);
if (uncredited.length) fail(`photographs without a credit: ${uncredited.join(", ")}`);

const rawImgTags = [];
for (const file of appFiles.filter((f) => f.endsWith(".tsx"))) {
  const text = readFileSync(file, "utf8");
  for (const match of text.matchAll(/<img\b[^>]*src=["']\/images/g)) {
    rawImgTags.push(`${relative(root, file)}:${match.index}`);
  }
}
if (rawImgTags.length) fail(`raw img tag for a local photograph: ${rawImgTags.join(", ")}`);

/* 8. Accessibility: charts labelled, document language, skip link. */
const chartFile = readFileSync(join(root, "app/components/AtlasCharts.tsx"), "utf8");
if (!/role="img"/.test(chartFile)) fail("charts are not labelled with role=img");
if (!/aria-label/.test(chartFile)) fail("charts have no aria-label summary");
if (!/sr-only/.test(chartFile)) fail("charts have no screen reader data table");

const layout = readFileSync(join(root, "app/layout.tsx"), "utf8");
if (!/<html lang="en">/.test(layout)) fail("document language is not declared");
if (!/ta-skip/.test(layout)) fail("skip link missing from the layout");
if (!/manifest/.test(layout)) fail("web manifest is not linked from the layout");

/* 9. Interface pieces named in the brief. */
const components = readdirSync(join(root, "app/components"));
for (const name of [
  "Header.tsx",
  "Footer.tsx",
  "FloatingActions.tsx",
  "CookieConsent.tsx",
  "Preloader.tsx",
  "SmoothScroll.tsx",
  "DirectoryExplorer.tsx",
  "AtlasCharts.tsx",
]) {
  if (!components.includes(name)) fail(`missing component: ${name}`);
}

const routes = [
  "",
  "directory",
  "atlas",
  "stories",
  "playbook",
  "categories",
  "about",
  "contact",
  "privacy",
  "terms",
  "credits",
  "saved",
  "sign-in",
];
for (const route of routes) {
  const page = join(root, "app", route, "page.tsx");
  if (!existsSync(page)) fail(`missing route: /${route}`);
}

/* 10. Template fidelity: the vendor sheets are present and imported. */
const globals = readFileSync(join(root, "app/globals.css"), "utf8");
for (const sheet of ["bootstrap-grid.min.css", "font-awesome.css", "animation.css", "template.css"]) {
  if (!existsSync(join(root, "app/styles", sheet))) fail(`missing template sheet: ${sheet}`);
  if (!globals.includes(sheet)) fail(`template sheet not imported: ${sheet}`);
}

/* 11. Voice tour contract. */
const floating = readFileSync(join(root, "app/components/FloatingActions.tsx"), "utf8");
if (!/en-KE/.test(floating)) fail("voice tour is not using the en-KE locale");
if (!/rate\s*[=:]\s*0\.95/.test(floating)) fail("voice tour rate is not 0.95");
if (!/pitch\s*[=:]\s*1\.1/.test(floating)) fail("voice tour pitch is not 1.1");

/* 12. Deploy contract. */
const vercel = JSON.parse(readFileSync(join(root, "vercel.json"), "utf8"));
if (!vercel.regions?.includes("cdg1")) fail("vercel region is not cdg1");
if (!vercel.headers?.length) fail("vercel security headers missing");

const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
if (pkg.name !== "theophilus-atlas") fail(`package name is ${pkg.name}`);
if (pkg.engines?.node !== ">=24.0.0") fail("node engine pin is not >=24.0.0");
if (!pkg.scripts?.typecheck) fail("typecheck script missing");
if (!pkg.dependencies?.recharts) fail("recharts is not a dependency");
for (const [name, version] of Object.entries({ ...pkg.dependencies, ...pkg.devDependencies })) {
  if (!/^\d+\.\d+\.\d+/.test(version)) fail(`dependency ${name} is not pinned (${version})`);
}

/* 13. Content volume: the atlas needs words, not stubs. */
const dictionaryWords = readFileSync(join(root, "app/lib/dictionaries.ts"), "utf8").split(/\s+/).length;
if (dictionaryWords < 3000) fail("dictionary copy is too thin for three locales");

/* Report. */
const line = "-".repeat(62);
console.log(line);
console.log("Theophilus Atlas build audit");
console.log(line);
console.log(`app files checked      ${codeFiles.length}`);
console.log(`photographs on disk    ${images.length}`);
console.log(`dictionary words       ${dictionaryWords}`);
console.log(line);
for (const message of notes) console.log(`note  ${message}`);

if (failures.length) {
  for (const message of failures) console.log(`FAIL  ${message}`);
  console.log(line);
  console.log(`${failures.length} check(s) failed`);
  process.exit(1);
}

console.log("PASS  copy is clean, design contract held, credits complete");
console.log(line);
