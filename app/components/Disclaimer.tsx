import { site } from "../lib/site";

export function Disclaimer({ compact = false }: { compact?: boolean }) {
  return (
    <div className="ta-disclosure">
      <strong>Independent showcase.</strong>{" "}
      {compact
        ? "Metrics are illustrative or aggregated from public build data. Not an official government or academic evaluation. All original sites remain separate."
        : `Theophilus Atlas is an independent showcase of one hundred separate projects. It is not operated by, endorsed by or affiliated with any government, church, school, business or academic body named in the directory. Headline numbers are illustrative or aggregated from the public build data of the challenge. Nothing here is an official evaluation, audit or accreditation. All original sites remain separate projects with their own owners, terms and futures. Questions about ${site.name} can go to the WhatsApp line.`}
    </div>
  );
}
