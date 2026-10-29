import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHead } from "../components/PageHead";
import { T } from "../components/T";

export const metadata: Metadata = {
  title: "Credits",
  description:
    "Full photography credits for Theophilus Atlas. Every image is a real, unwatermarked Pexels photograph, listed with its subject and source page.",
  alternates: { canonical: "/credits" },
};

type Credit = {
  file: string;
  subject: string;
  photographer: string;
  source: string;
};

const credits: Credit[] = [
  {
    file: "hero-01.jpg",
    subject: "Women of a village gathering together in patterned dress",
    photographer: "on the Pexels page",
    source: "https://www.pexels.com/photo/33763179/",
  },
  {
    file: "hero-02.jpg",
    subject: "Farmers working a field together",
    photographer: "on the Pexels page",
    source: "https://www.pexels.com/photo/11350430/",
  },
  {
    file: "hero-03.jpg",
    subject: "Two colleagues recording an interview in a studio",
    photographer: "on the Pexels page",
    source: "https://www.pexels.com/photo/7600887/",
  },
  {
    file: "og.jpg",
    subject: "Social preview crop of women gathering in a village",
    photographer: "on the Pexels page",
    source: "https://www.pexels.com/photo/33763179/",
  },
  {
    file: "celebration.jpg",
    subject: "Construction workers collaborating on a project, South Africa",
    photographer: "Jerome Govender",
    source: "https://www.pexels.com/photo/5298215/",
  },
  {
    file: "teamwork.jpg",
    subject: "Construction workers measuring and fitting pipe on site",
    photographer: "Jerome Govender",
    source: "https://www.pexels.com/photo/5298215/",
  },
  {
    file: "builders.jpg",
    subject: "Construction workers on bamboo scaffolding, Nairobi",
    photographer: "MC G'Zay",
    source: "https://www.pexels.com/photo/30661413/",
  },
  {
    file: "survey.jpg",
    subject: "Civil engineer measuring outdoors with a tape measure",
    photographer: "TUBARONES PHOTOGRAPHY",
    source: "https://www.pexels.com/photo/11174202/",
  },
  {
    file: "classroom.jpg",
    subject: "Teacher explaining a lesson to pupils",
    photographer: "on the Pexels page",
    source: "https://www.pexels.com/photo/5905444/",
  },
  {
    file: "learners.jpg",
    subject: "Two learners sharing a laptop",
    photographer: "on the Pexels page",
    source: "https://www.pexels.com/photo/11025029/",
  },
  {
    file: "work.jpg",
    subject: "Developer working at two screens in a Nairobi office",
    photographer: "Naboth Otieno",
    source: "https://www.pexels.com/photo/19805876/",
  },
  {
    file: "craft.jpg",
    subject: "Portrait in vibrant African fabric",
    photographer: "kelly chocola",
    source: "https://www.pexels.com/photo/30971566/",
  },
  {
    file: "print.jpg",
    subject: "Craftsman screen printing in a workshop",
    photographer: "Andrea Piacquadio",
    source: "https://www.pexels.com/photo/3966277/",
  },
  {
    file: "tailor.jpg",
    subject: "Young tailor at work in a workshop",
    photographer: "on the Pexels page",
    source: "https://www.pexels.com/photo/11645428/",
  },
  {
    file: "maker.jpg",
    subject: "Artisan working with metal instruments in a workshop",
    photographer: "Tope J. Asokere",
    source: "https://www.pexels.com/photo/3760958/",
  },
  {
    file: "volunteers.jpg",
    subject: "Volunteers packing food and supplies into boxes",
    photographer: "on the Pexels page",
    source: "https://www.pexels.com/photo/6646947/",
  },
  {
    file: "gathering.jpg",
    subject: "Team in a business training workshop, laptops open",
    photographer: "on the Pexels page",
    source: "https://www.pexels.com/photo/34046709/",
  },
  {
    file: "meeting.jpg",
    subject: "Colleague at a desk in an office, portrait crop",
    photographer: "on the Pexels page",
    source: "https://www.pexels.com/photo/20209020/",
  },
  {
    file: "community.jpg",
    subject: "Open air market with traders selling fabric and shoes",
    photographer: "on the Pexels page",
    source: "https://www.pexels.com/photo/8042460/",
  },
  {
    file: "health.jpg",
    subject: "Health worker with a patient in a clinic room",
    photographer: "on the Pexels page",
    source: "https://www.pexels.com/photo/6303650/",
  },
  {
    file: "land.jpg",
    subject: "Nigerian farmers in a cassava field with protective gear",
    photographer: "on the Pexels page",
    source: "https://www.pexels.com/photo/36846173/",
  },
  {
    file: "studio.jpg",
    subject: "Wood panelled analog tracking and mixing console room",
    photographer: "on the Pexels page",
    source: "https://www.pexels.com/photo/12622097/",
  },
  {
    file: "skyline.jpg",
    subject: "Skyline view of the Nairobi cityscape",
    photographer: "Ken Mwaura",
    source: "https://www.pexels.com/photo/29069344/",
  },
  {
    file: "city-nairobi.jpg",
    subject: "Nairobi, Kenya",
    photographer: "on the Pexels page",
    source: "https://www.pexels.com/photo/29003508/",
  },
  {
    file: "city-lagos.jpg",
    subject: "Lagos, Nigeria",
    photographer: "on the Pexels page",
    source: "https://www.pexels.com/photo/38784175/",
  },
  {
    file: "city-accra.jpg",
    subject: "Accra, Ghana",
    photographer: "on the Pexels page",
    source: "https://www.pexels.com/photo/31782030/",
  },
  {
    file: "city-kampala.jpg",
    subject: "Kampala, Uganda",
    photographer: "on the Pexels page",
    source: "https://www.pexels.com/photo/39554460/",
  },
  {
    file: "city-johannesburg.jpg",
    subject: "Johannesburg, South Africa",
    photographer: "on the Pexels page",
    source: "https://www.pexels.com/photo/33702679/",
  },
  {
    file: "city-dakar.jpg",
    subject: "Dakar, Senegal",
    photographer: "on the Pexels page",
    source: "https://www.pexels.com/photo/33432833/",
  },
];

export default function CreditsPage() {
  return (
    <>
      <PageHead
        eyebrow="Credits"
        title="Real photographs, named sources"
        intro="Every photograph on this site is a real, unwatermarked Pexels photograph used under the Pexels licence. No image was generated by artificial intelligence."
        image="/images/print.jpg"
        imageAlt="A craftsman pulling a screen print across a frame in a print workshop"
        homeLabel={<T k="nav.home" />}
        crumbs={[{ href: "/credits", label: "Credits" }]}
      />

      <section className="ta-section ta-section--white">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="ta-prose" style={{ marginBottom: 26 }}>
                <p>
                  The files below live in <code>public/images/</code>. Images were cropped and resized for the
                  template, and no watermark, overlay or generated element was added. Where a photographer is not
                  named in the Pexels caption, the credit reads &quot;on the Pexels page&quot; and the linked source
                  page carries the attribution.
                </p>
                <p>
                  People pictured are stock photography subjects. They are not presented as staff, clients, patients
                  or beneficiaries of any organisation in the directory.
                </p>
              </div>
              <div className="ta-scroll-x">
                <table className="ta-table">
                  <caption className="sr-only">Photograph credits with subject, photographer and Pexels source</caption>
                  <thead>
                    <tr>
                      <th scope="col">File</th>
                      <th scope="col">Subject</th>
                      <th scope="col">Photographer</th>
                      <th scope="col">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {credits.map((credit) => (
                      <tr key={credit.file}>
                        <th scope="row" style={{ whiteSpace: "nowrap" }}>
                          {credit.file}
                        </th>
                        <td>{credit.subject}</td>
                        <td>{credit.photographer}</td>
                        <td>
                          <a href={credit.source} target="_blank" rel="noopener noreferrer">
                            Pexels
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-md-4">
              <div className="ta-disclosure" style={{ marginBottom: 20 }}>
                <strong>Licence.</strong> Pexels images are free to use under the Pexels licence. Attribution is not
                required but is given here in full as a matter of practice.
              </div>
              <div className="ta-card">
                <h3>Template, fonts and icons</h3>
                <p>
                  Design, layout, colour tokens, typography and animation classes come from the uploaded Atlas
                  template. Raleway and Oswald are served by Google Fonts. Font Awesome 4.1 supplies the icon set,
                  self hosted from the template package.
                </p>
              </div>
              <div className="ta-card" style={{ marginTop: 20 }}>
                <h3>Text and data</h3>
                <p>
                  Build descriptions and dates come from the public repositories of the hundred builds. Cluster
                  groupings and the playbook were written for this atlas.
                </p>
                <Link className="ta-link-arrow" href="/about">
                  Read the method
                </Link>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 34 }} className="ta-grid ta-grid--3">
            {["hero-01.jpg", "builders.jpg", "craft.jpg"].map((file) => (
              <figure key={file} style={{ margin: 0 }}>
                <Image
                  src={`/images/${file}`}
                  alt={credits.find((credit) => credit.file === file)?.subject ?? ""}
                  width={640}
                  height={420}
                  sizes="(max-width: 767px) 100vw, 31vw"
                  style={{ width: "100%", height: "auto" }}
                />
                <figcaption className="ta-help" style={{ marginTop: 8 }}>
                  {file}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
