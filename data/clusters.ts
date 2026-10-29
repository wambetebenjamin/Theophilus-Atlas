import type { ClusterId } from "./sites";

export type Cluster = {
  id: ClusterId;
  name: string;
  short: string;
  blurb: string;
  lesson: string;
  icon: string;
  tone: string;
};

/**
 * The ten innovation clusters. They are groupings of the hundred builds by the
 * job each one does for the people it serves, not by the template it started
 * from. Cluster colours come from the template palette.
 */
export const clusters: Cluster[] = [
  {
    id: "learning",
    name: "Learning and literacy",
    short: "Learning",
    blurb:
      "Schools, a university, tutors, bookshops and early years centres. These builds put a parent, a learner or a teacher at the centre of the page.",
    lesson:
      "Learning sites win on the plain facts a family needs first: term dates, fees, admissions steps and a phone number that a person answers.",
    icon: "fa-book",
    tone: "var(--ta-gold)",
  },
  {
    id: "health",
    name: "Health and care",
    short: "Health",
    blurb:
      "Clinics, pharmacies, maternal care, mental health, blood donation, fitness and animal care. This is the cluster for the moments when clarity matters most.",
    lesson:
      "Health pages are read under stress. Short sentences, opening hours in the first screen and one appointment action beat long service lists.",
    icon: "fa-heartbeat",
    tone: "var(--ta-green)",
  },
  {
    id: "work",
    name: "Work, money and law",
    short: "Work",
    blurb:
      "Jobs, chamas, SACCO savings, insurance, legal documents, help desks and professional practices. Every build here is about earning or protecting income.",
    lesson:
      "Trust is the product. Show who is behind the counter, what a service costs and what happens after a form is sent.",
    icon: "fa-briefcase",
    tone: "var(--ta-heading)",
  },
  {
    id: "trade",
    name: "Trade and craft",
    short: "Trade",
    blurb:
      "Shops, print shops, salons, workshops, auctions, repair and maker directories. The catalogue, the price and the pickup point do the work.",
    lesson:
      "A catalogue is only useful if a buyer can ask a specific question. Every product needs one clear route to WhatsApp or a call.",
    icon: "fa-shopping-basket",
    tone: "var(--ta-gold-soft)",
  },
  {
    id: "hospitality",
    name: "Hospitality and celebration",
    short: "Hospitality",
    blurb:
      "Hotels, restaurants, ticketing, catering, weddings and event styling. Builds for hosting people well and filling a room or a table.",
    lesson:
      "Photography carries hospitality. The job of the page is to make the next step obvious: check a date, see a menu, hold a seat.",
    icon: "fa-cutlery",
    tone: "var(--ta-slate)",
  },
  {
    id: "home",
    name: "Home, land and food",
    short: "Home and land",
    blurb:
      "Property, construction, furniture, solar, rooms, farming, grain and meat supply. The places people live and the food they eat.",
    lesson:
      "Where money is large and trust is thin, be concrete: verified badges, real photos of real work and a plain list of what is not included.",
    icon: "fa-home",
    tone: "var(--ta-slate)",
  },
  {
    id: "mobility",
    name: "Mobility and logistics",
    short: "Mobility",
    blurb:
      "Travel, freight, fleet, car hire, bus booking, bicycle repair and trails. Builds that move people, parcels or both.",
    lesson:
      "Movement sites live or die on schedules. A visible time, a route and a fare save more support calls than any animation.",
    icon: "fa-road",
    tone: "var(--ta-ink)",
  },
  {
    id: "faith",
    name: "Faith and community",
    short: "Faith",
    blurb:
      "Cathedral and community churches, a foundation, giving, family support and farewell care. Builds that hold a community together through the week.",
    lesson:
      "A congregation arrives on a phone on a Sunday morning. Service times, a giving route and one warm sentence do most of the work.",
    icon: "fa-users",
    tone: "#ABABAB",
  },
  {
    id: "media",
    name: "Media and expression",
    short: "Media",
    blurb:
      "Newspapers, radio, podcasts, music, studios, photography, agencies and sport desks. Publishing rhythm sets the design.",
    lesson:
      "Publishing sites need a repeatable card. Once the shape of a story is fixed, a small team can keep the page alive for years.",
    icon: "fa-microphone",
    tone: "var(--ta-gold)",
  },
  {
    id: "civic",
    name: "Civic and resilience",
    short: "Civic",
    blurb:
      "County services, legal aid, impact reporting, recycling, city guides and this atlas. Built for shared problems and shared proof.",
    lesson:
      "Civic work must be honest about its limits. Say what the tool records, what it does not decide and who holds the data.",
    icon: "fa-map-o",
    tone: "#666666",
  },
];

export const clusterById = Object.fromEntries(
  clusters.map((cluster) => [cluster.id, cluster]),
) as Record<ClusterId, Cluster>;
