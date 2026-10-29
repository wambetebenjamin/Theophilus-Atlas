import type { DictKey } from "./dictionaries";

export type NavItem = { href: string; key: DictKey };

export const primaryNav: NavItem[] = [
  { href: "/directory", key: "nav.directory" },
  { href: "/atlas", key: "nav.atlas" },
  { href: "/categories", key: "nav.categories" },
  { href: "/stories", key: "nav.stories" },
  { href: "/playbook", key: "nav.playbook" },
  { href: "/about", key: "nav.about" },
  { href: "/contact", key: "nav.contact" },
];

export const footerAtlas: NavItem[] = [
  { href: "/directory", key: "nav.directory" },
  { href: "/atlas", key: "nav.atlas" },
  { href: "/categories", key: "nav.categories" },
  { href: "/stories", key: "nav.stories" },
];

export const footerLearn: NavItem[] = [
  { href: "/playbook", key: "nav.playbook" },
  { href: "/about", key: "nav.about" },
  { href: "/credits", key: "nav.credits" },
  { href: "/contact", key: "nav.contact" },
];

export const footerUse: NavItem[] = [
  { href: "/saved", key: "nav.saved" },
  { href: "/sign-in", key: "nav.signIn" },
  { href: "/privacy", key: "nav.privacy" },
  { href: "/terms", key: "nav.terms" },
];
