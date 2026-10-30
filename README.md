# Theophilus Atlas

The closing site of the 100 website challenge: a master directory, a light impact atlas and an
open playbook for the one hundred African product websites built between 1 and 29 October 2026.

- Name: **Theophilus Atlas**
- Tagline: **One hundred built. Wisdom shared.**
- One liner: Master directory, light impact atlas and open playbook of the 100 African product
  websites so governments, churches, schools, businesses and builders can learn and reuse.
- Live: https://theophilus-atlas.vercel.app

## What is in here

| Route | What it does |
| --- | --- |
| `/` | Completion statement, headline numbers, featured innovations, how to explore |
| `/directory` | All 100 builds, searchable by name, cluster, country and order |
| `/atlas` | Three light Recharts summaries with lessons and an honest ledger |
| `/categories` | The ten innovation clusters, each with its builds and its lesson |
| `/stories` and `/stories/[slug]` | Six build stories with the limits named |
| `/playbook` | Nine open lessons, recognition pathways and a one page checklist |
| `/about` | Origin, method, timeline and credits |
| `/contact` | Form with honeypot, rate limit and reCAPTCHA, plus WhatsApp and email |
| `/credits` | Every photograph with subject, photographer and Pexels source |
| `/privacy`, `/terms` | Plain language data and use notes |
| `/saved`, `/sign-in` | Light local shelf, optional email sign in, no tracking |

## Stack

- Node >= 24 (`.nvmrc` is 24), Next.js 16.4.2 App Router, React 19.2.0, TypeScript 5.9.2
- Tailwind CSS 4.1.10 for the reset only, the template stylesheet for the design
- Recharts 3.10.1 for the three atlas charts
- NextAuth 5.0.0-beta.28 with a passwordless credentials flow for the saved shelf
- Lenis 1.3.11 for smooth scrolling, honouring reduced motion

Every dependency is pinned. The uploaded Atlas template design is preserved: Raleway and Oswald,
`#F7C221` gold, `#3C3B3B` headings, dashed gold borders, square corners, the same hover
treatments and the same `effect-*` animations.

## Local setup

```bash
nvm use            # Node 24
npm ci
cp .env.example .env.local
npm run dev        # http://localhost:3000
```

### Build gate

```bash
npm run typecheck  # tsc --noEmit
npm run build      # next build
npm run audit      # scripts/audit.mjs
# or all three in order
npm ci && npm run typecheck && npm run build && npm run audit
```

`scripts/audit.mjs` fails the build on an em dash, lorem ipsum, a gradient or orb, a raw gold hex
outside the token layer, a missing credit, an unlabelled chart, a missing route, a stale voice
tour setting or a deploy contract that has drifted.

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used by metadata, sitemap and robots |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number, digits only, 254112272061 |
| `AUTH_SECRET` | Required in production for the session cookie |
| `AUTH_URL` | Set automatically on Vercel |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY` | Optional reCAPTCHA. Without a key the form falls back to a human confirmation checkbox |
| `NEXT_PUBLIC_LOCALES` | `en,sw,fr` |
| `CONTACT_WEBHOOK_URL` | Optional. Where a contact message is posted. Without it the form hands the note to WhatsApp and says so |

## Brand and voice

Reflective, generous, precise, forward looking, humble. No em dashes. No hype. Numbers describe
the work, never its impact. Every page says what it is not: not an official government, church,
school or academic evaluation, and each original site stays a separate project.

Interface copy ships in English, Kiswahili and French. The switcher in the header writes a locale
cookie and updates the visible headings, navigation and form labels without a reload.

## How this closes the hundred

Site 100 is the index of sites 1 to 99. It does not claim their results, it records their shape:
ten clusters, twelve countries named, sixteen delivery days and eighty nine public deployments.
The atlas counts what the repositories show and says plainly what it cannot measure: visitors,
revenue, enrolment, giving, satisfaction and programme outcomes.

## Deploy notes

- Vercel project `theophilus-atlas`, region `cdg1`, security headers in `vercel.json`
- `npm ci && npm run build` is the deploy command, Node 24 is pinned by `engines` and `.nvmrc`
- Photographs are local files in `public/images/`; `images.pexels.com` is allowed in
  `next.config.ts` for future editorial images
- Set `AUTH_SECRET` in the Vercel project before the saved shelf signs anyone in
- Production build: https://theophilus-atlas.vercel.app, deployed to region `cdg1`
- Environment already set on the project: `AUTH_SECRET`, `NEXT_PUBLIC_SITE_URL`,
  `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_WHATSAPP_DISPLAY`, `NEXT_PUBLIC_LOCALES`
- Pull request: https://github.com/wambetebenjamin/Theophilus-Atlas/pull/1
- Follow up fixes merged in pull requests 2 (honest contact confirmation, 24px tap targets)
  and 3 (hero scroll cue lifted clear of the promo band)

## Credits

Photography credits are in `image-credits.md` and on `/credits`. Every photograph is a real,
unwatermarked Pexels image. Template design, fonts and icons belong to their original authors.
