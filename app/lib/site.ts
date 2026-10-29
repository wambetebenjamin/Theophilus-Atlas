export const site = {
  name: "Theophilus Atlas",
  tagline: "One hundred built. Wisdom shared.",
  oneLiner:
    "Master directory, light impact atlas and open playbook of the 100 African product websites so governments, churches, schools, businesses and builders can learn and reuse.",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "254112272061",
  whatsappDisplay: process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY ?? "+254 112 272 061",
  email: "hello@theophilusatlas.org",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://theophilus-atlas.vercel.app",
  locales: ["en", "sw", "fr"] as const,
  cookieName: "theophilus-atlas-cookie-consent",
  localeCookie: "theophilus-atlas-locale",
  savedKey: "theophilus-atlas-saved-sites",
  notesKey: "theophilus-atlas-notes",
  mark: "100 of 100",
} as const;

export type Locale = (typeof site.locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  sw: "Kiswahili",
  fr: "Francais",
};

export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

// Template theme colour, kept in one place so the layout, the manifest
// and the charts agree with the template tokens.
export const themeColor = "#F7C221";
