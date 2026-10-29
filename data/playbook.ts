export type Lesson = {
  n: string;
  title: string;
  summary: string;
  body: string[];
  checks: string[];
};

export const lessons: Lesson[] = [
  {
    n: "01",
    title: "Keep the uploaded design exactly",
    summary:
      "A template is a decision already made. Treat its fonts, tokens, spacing and motion as the brief, then spend your whole budget on words and photographs.",
    body: [
      "Every build in the hundred started from an uploaded template. The first hour was spent reading the stylesheet rather than replacing it: which gold, which heading size, which dashed border, which easing curve. Then the palette, the type scale and the animation classes stayed. That single discipline removed hundreds of small arguments and kept a month of daily shipping possible.",
      "Templates fail when they are half replaced. A new font here and a new radius there leaves a page that belongs to nothing. Keeping the sheet intact and changing only content makes an ordinary template look considered, because nothing fights itself.",
    ],
    checks: [
      "Copy the template stylesheet into the project and import it unchanged.",
      "Add brand tokens in a separate file, never inside the template sheet.",
      "If a rule must change for a phone, add a new breakpoint rule instead of editing the original.",
    ],
  },
  {
    n: "02",
    title: "Write the first screen last",
    summary:
      "The hero is not a poster, it is an answer. Draft it after the service list, the prices and the phone number are settled, then write the smallest sentence that is still true.",
    body: [
      "The strongest first screens in the set are plain: a name, what the organisation does, where it is, and one action. The weakest are adjectives. Builders reach for scale words because the facts are not ready yet. Write the facts page first and the hero writes itself.",
      "Three lines are enough. Who you are for. What you do. What happens when someone taps. Anything longer is read by nobody on a bus.",
    ],
    checks: [
      "Name the audience in the first sentence.",
      "Put one action above the fold and repeat it at the end of the page.",
      "Delete every adjective that cannot be photographed.",
    ],
  },
  {
    n: "03",
    title: "One action per page",
    summary:
      "A page with four primary buttons has none. Choose the single thing a visitor should be able to do on the worst phone on the slowest network, then let every other link be quiet.",
    body: [
      "Clinics needed appointments, shops needed a catalogue enquiry, churches needed giving, schools needed admissions. Everything else on those pages, the history, the team, the gallery, supported that one action. It is easier to defend one action than to rank five.",
      "The hundred also show that the action should be reachable without a form wherever possible. A pre filled WhatsApp message converts on a phone with a weak connection and no patience for validation errors.",
    ],
    checks: [
      "Write the action as a verb and a noun: book a visit, join the chama, see the menu.",
      "Keep the action visible in the first screen and in the closing band.",
      "Offer WhatsApp as a parallel path, never as a hidden fallback.",
    ],
  },
  {
    n: "04",
    title: "Reuse a card, not a framework",
    summary:
      "Frugal design is a small number of shapes repeated with discipline. One card, one heading, one list, one button. Ten pages built from five shapes load fast and stay editable.",
    body: [
      "There is no build in this set that needed a heavier dashboard. Simple public pages, local photographs at sensible sizes, and no third party widgets beyond the ones the brief demanded kept the first paint fast on mobile data.",
      "Frugality also applies to features. A saved list in the browser and a short note field give a visitor more than a login wall does, and cost nothing to run. Where a feature could not be honest, it was left out.",
    ],
    checks: [
      "Cap the interface at five repeating shapes.",
      "Resize and compress every photograph before it enters the repository.",
      "Prefer browser storage over a database until a real need appears.",
    ],
  },
  {
    n: "05",
    title: "Translate the facts, not the poetry",
    summary:
      "English, Kiswahili and French shipped on every build. The translations that worked moved the verbs and numbers, kept the names, and never invented a warmer sentence than the source.",
    body: [
      "The switcher stores a choice in a cookie and the document language attribute follows it, so screen readers pronounce the page correctly. Headline figures, opening hours and service names are translated. Proper nouns stay as the organisation writes them.",
      "Machine translation was used only as a first draft. Every locale was read again for register. Where a phrase had no honest equivalent, the shorter sentence won.",
    ],
    checks: [
      "Translate the interface and the facts, keep the brand names.",
      "Set the document lang attribute on every change.",
      "Never ship a locale you have not read end to end.",
    ],
  },
  {
    n: "06",
    title: "Photograph real people, credit them",
    summary:
      "Every photograph in the set is a real, unwatermarked picture from Pexels. No generated faces, no invented workshops. Credits sit in the repository, next to the file names.",
    body: [
      "A directory of people is a promise that the people exist. Generated imagery breaks that promise quietly and cheaply, and readers can now feel it. The images here show builders, farmers, clinicians, learners, makers and neighbours in ordinary, specific places.",
      "Alt text describes what is happening in the frame, not the mood it is meant to create. Where a photograph is illustrative, the credit page says so plainly.",
    ],
    checks: [
      "Reject generated or watermarked images outright.",
      "Record photographer and source page for every file.",
      "Write alt text about the scene, and empty alt text for decoration.",
    ],
  },
  {
    n: "07",
    title: "Name the limit before the promise",
    summary:
      "Each build says what it is not: not an auditor, not an official rating, not a guarantee of results. The disclaimer is a feature, not a legal afterthought.",
    body: [
      "Health pages said they were not emergency services. The impact recorder said it does not provide assurance. This atlas says it is an independent showcase and does not measure outcomes. Readers forgive a small tool for being small. They do not forgive being misled.",
      "The honest version also protects the next builder. If the page cannot claim an outcome, the team stops optimising for the claim and starts improving the path.",
    ],
    checks: [
      "Write one sentence per page that begins with what it is not.",
      "Separate counts you can see from claims you cannot verify.",
      "Put the disclaimer where a reader meets it, not only in the footer.",
    ],
  },
  {
    n: "08",
    title: "Deploy small, in one region, with headers",
    summary:
      "Every site is a small Next.js project on Vercel, pinned to cdg1, with security headers declared in the repository and a build that fails loudly when a type breaks.",
    body: [
      "One region close to the audience, immutable caching on images and fonts, a content security policy that names the few third parties actually used, and a type check before the build. None of it is clever. All of it prevents the usual failure at the worst moment.",
      "The build gate is the cheapest quality control available: install from the lockfile, type check, build, then read the audit. If that gate is slow, fix the gate rather than skipping it.",
    ],
    checks: [
      "Pin the region and the runtime in the repository.",
      "Declare the security headers in source, not in a dashboard.",
      "Run install, type check, build and audit before every merge.",
    ],
  },
  {
    n: "09",
    title: "Find the route to recognition",
    summary:
      "A working site is not a finished one. Governments need accessibility and plain language, churches need trust and giving clarity, schools need parents and safeguarding, businesses need proof and a route to buy.",
    body: [
      "Recognition rarely arrives because a site is beautiful. It arrives because the site answers the institution's own question. For a county desk that question is whether a resident can find the service without calling. For a church it is whether a visitor knows when to arrive. For a school it is whether a parent can start an application at night. For a business it is whether a buyer can act without a meeting.",
      "The realistic pathways are modest: a listing in a public sector directory, a link from a diocesan or district page, inclusion in a school's admissions pack, or a supplier page on a chamber of commerce site. Each one asks for a clean page, a working contact route and a named owner.",
    ],
    checks: [
      "Match the page to the question the institution already asks.",
      "Give every page a named owner and a review date.",
      "Ask for one listing at a time, with a link and a one line description.",
    ],
  },
];

export const recognition = [
  {
    who: "Governments and county desks",
    needs:
      "Plain language, accessible contrast, a phone number a person answers, and a service list that matches the counter.",
    route:
      "Publish the page as a resident reference, submit it to the county communications desk, and keep a dated change log.",
    caution:
      "No build here claims official status. A government page should link to the site, not adopt it as policy.",
  },
  {
    who: "Churches and faith networks",
    needs:
      "Service times in the first screen, a giving route with receipts, safeguarding for children's ministry, and a warm welcome.",
    route:
      "Share the link in the weekly bulletin and the notice screen, then ask the diocese or network to list it once.",
    caution:
      "Giving pages must state fees and never store card details unless a licensed provider handles them.",
  },
  {
    who: "Schools and colleges",
    needs:
      "Term dates, fee structure, admissions steps, staff contacts and a safeguarding statement.",
    route:
      "Attach the link to the admissions pack and the parents' WhatsApp group, then keep term dates current.",
    caution:
      "No pupil names, photographs or results should appear without written consent and a retention rule.",
  },
  {
    who: "Businesses and cooperatives",
    needs:
      "A working catalogue, honest prices, a delivery or pickup promise, and a way to ask a specific question.",
    route:
      "Put the link in the bio, the Google Business profile and the invoice footer, then track enquiries in one place.",
    caution:
      "Traffic claims and testimonials need evidence. A small page with real photographs beats a large one with invented numbers.",
  },
];

export const checklist = [
  "The organisation name, town and one sentence about who it serves are in the first screen.",
  "One primary action repeats at the top and the bottom of the page.",
  "The phone number and WhatsApp link work on a phone without an account.",
  "Every photograph is real, compressed, credited and has useful alt text.",
  "The three locales read correctly and the page language attribute changes.",
  "Prices, hours and addresses are dated and have a named person responsible.",
  "The page says what it is not, in one honest sentence.",
  "Install, type check, build and audit pass before the merge.",
  "The site is deployed to one region with security headers in the repository.",
];
