export type Story = {
  slug: string;
  title: string;
  site: string;
  siteNumber: number;
  image: string;
  imageAlt: string;
  builtOn: string;
  lede: string;
  body: string[];
  quote: string;
  quoteBy: string;
  honest: string;
};

/**
 * Build stories. Every detail below is drawn from what the repository of that
 * build publishes about itself. Nothing is presented as an audited outcome,
 * and no person is quoted as a client because none agreed to be.
 */
export const stories: Story[] = [
  {
    slug: "grace-cathedral-first",
    title: "The first build set the pattern",
    site: "Grace Cathedral Church",
    siteNumber: 1,
    image: "/images/community.jpg",
    imageAlt: "Traders and shoppers moving through a crowded open air market",
    builtOn: "1 October 2026",
    lede:
      "Build one had one job: a visitor on a phone must know when to arrive, where to go and how to give, without scrolling twice.",
    body: [
      "The design source was a church template with a deep purple palette. The structure stayed. The content became a Nairobi congregation: Sunday services at 8:00 and 10:30, Wednesday Bible study at 6:00pm, Friday youth at 5:30pm.",
      "Three decisions from that day repeated across the remaining ninety nine. Service times went into the first screen as a strip rather than a paragraph. Giving became a tap to copy M-Pesa card with a four step guide. The gallery loaded real photographs with empty alt text where they were decoration, and full descriptions where they carried meaning.",
      "It is a small site. It answers the questions a first time visitor actually arrives with, and it left the rest of the church's life to the people who lead it.",
    ],
    quote:
      "The welcome is not the animation. The welcome is the time on the door.",
    quoteBy: "Build note, day one",
    honest:
      "This is a build record, not an attendance or giving result. The congregation named in the build is illustrative for the challenge.",
  },
  {
    slug: "raphael-voice",
    title: "A site you can talk to",
    site: "Raphael Voice",
    siteNumber: 33,
    image: "/images/studio.jpg",
    imageAlt: "A warm wood paneled recording studio with a large analog mixing console",
    builtOn: "8 October 2026",
    lede:
      "The first voice activated interface in the challenge asked a harder question than any visual page: can a person who cannot easily use a mouse still navigate this?",
    body: [
      "Raphael Voice listens through the browser's own speech recognition and moves between pages and sections on command. The visual site stays complete, because voice is an addition, never a replacement.",
      "The build was also the first to treat screen reader order as a design output. Headings follow a single hierarchy, landmarks are named, and the skip link is the first tab stop. Those habits came back into every later build in the set.",
      "The languages offered were English, Kiswahili and Kikuyu, which meant the speech layer had to fail gracefully whenever a voice was missing. It does, with a written fallback and a clear instruction.",
    ],
    quote:
      "Accessibility is not a mode you switch on. It is the order in which you place things.",
    quoteBy: "Build note, day eight",
    honest:
      "Voice accuracy depends on the browser and the device. The build does not claim recognition rates, and no user testing data is published.",
  },
  {
    slug: "raphael-community-health",
    title: "Care that continues beyond the signal",
    site: "Raphael Community Health",
    siteNumber: 44,
    image: "/images/health.jpg",
    imageAlt: "A health worker attending to a patient in a clinic room",
    builtOn: "11 October 2026",
    lede:
      "Community health workers visit households where there is no network. The page had to work before the connection did.",
    body: [
      "The build is an offline first progressive web app: visits, household records, immunisation tracking and maternal follow up are written to the device first and synced when a signal returns.",
      "Design decisions followed the field routine rather than the dashboard. Large touch targets, one record per screen, and a visible sync state that says when the last successful upload happened and what is still waiting.",
      "It also states plainly what it does not do. It is not a diagnosis tool and not a replacement for the ministry's register. The worker still decides, and the record follows.",
    ],
    quote:
      "A sync indicator is not a technical detail. It is the difference between trusting the tool and keeping a paper notebook as well.",
    quoteBy: "Build note, day eleven",
    honest:
      "No patient data is published with this build. The offline behaviour described is the design intent recorded in its repository.",
  },
  {
    slug: "miriam-health",
    title: "Booking that respects a waiting room",
    site: "Miriam Health",
    siteNumber: 76,
    image: "/images/gathering.jpg",
    imageAlt: "Colleagues in a bright meeting room working together around open laptops",
    builtOn: "22 October 2026",
    lede:
      "Maternal care pages are read at odd hours, often by someone who is worried. The build cut the page down to what a mother needs before, between and after visits.",
    body: [
      "Appointment booking sits in the first screen, beside the clinic hours. Support between visits is described in ordinary language, with the emergency path spelled out rather than hidden in a footer.",
      "Photography shows calm, everyday, non clinical scenes. Alt text describes the people and the setting. The build's credit note is explicit that the photographs are illustrative and do not identify patients or staff.",
      "The lesson that carried forward: the smaller the page, the more it has to be right about the phone number.",
    ],
    quote:
      "If a page can only do one thing at two in the morning, let it be the booking.",
    quoteBy: "Build note, day twenty two",
    honest:
      "No clinical outcomes, patient numbers or satisfaction scores are claimed. The service details are illustrative for the challenge.",
  },
  {
    slug: "ubuntu-rising",
    title: "A foundation that shows its work",
    site: "Ubuntu Rising Foundation",
    siteNumber: 12,
    image: "/images/volunteers.jpg",
    imageAlt: "Volunteers packing food and supplies into cardboard boxes",
    builtOn: "2 October 2026",
    lede:
      "Community organisations are asked for proof before they are asked for partnership. The build put the programme, the volunteer path and the partner route on one honest page.",
    body: [
      "Programme cards describe the work in the present tense. Volunteer sign up is a short form with a WhatsApp alternative. Partner enquiries get their own path, with a one line description of what a partnership would involve.",
      "The photographs are real scenes of community work: farmers in a field, a classroom session, volunteers packing boxes, a village gathering. Each file is credited on a public page in the repository.",
      "It is the build that proved a nonprofit page does not need a donation meter to look trustworthy. It needs a named programme and a working contact.",
    ],
    quote:
      "Proof of work is a photograph and a date, not a percentage.",
    quoteBy: "Build note, day two",
    honest:
      "The foundation and its programmes are illustrative for the challenge. No fundraising totals or beneficiary counts are asserted.",
  },
  {
    slug: "hiram-forges",
    title: "The closing run learned to make directories",
    site: "Hiram Forges",
    siteNumber: 92,
    image: "/images/maker.jpg",
    imageAlt: "An artisan working with metal tools in a workshop",
    builtOn: "29 October 2026",
    lede:
      "By the final week the set had learned a repeatable shape: filter, card, contact. Hiram Forges applied it to blacksmiths, welders and metal fabricators.",
    body: [
      "A repair economy depends on being able to find a workshop that still does the work. The directory filters by region and by specialty, then opens a profile with common work, working hours and what to bring.",
      "The saved list lives in the visitor's browser. There is no account wall, no tracking and no enquiry that disappears into a queue: a WhatsApp message carries the detail the workshop needs.",
      "The page also records the harder truth. A directory does not perform the repair and does not hold the money. That sentence sits near the top rather than in the terms.",
    ],
    quote:
      "A directory is a promise that the people inside it exist. Everything else is interface.",
    quoteBy: "Build note, day twenty nine",
    honest:
      "Workshop listings are illustrative for the challenge. No workshop named is claimed as a client or partner.",
  },
];
