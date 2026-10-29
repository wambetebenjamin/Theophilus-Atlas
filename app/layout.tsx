import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CookieConsent } from "./components/CookieConsent";
import { FloatingActions } from "./components/FloatingActions";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Preloader } from "./components/Preloader";
import { Providers } from "./components/Providers";
import { SmoothScroll } from "./components/SmoothScroll";
import { site, themeColor } from "./lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.oneLiner,
  applicationName: site.name,
  keywords: [
    "African product websites",
    "100 website challenge",
    "website directory Africa",
    "open playbook",
    "digital showcase Kenya",
    "Next.js 16 showcase",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.oneLiner,
    url: site.url,
    locale: "en_KE",
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "Women from an East African village standing together in patterned dress",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.oneLiner,
    images: ["/images/og.jpg"],
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: true,
  themeColor,
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.oneLiner,
        inLanguage: "en",
      },
      {
        "@type": "CollectionPage",
        "@id": `${site.url}/#collection`,
        name: `${site.name}: ${site.tagline}`,
        description: site.oneLiner,
        isPartOf: { "@id": `${site.url}/#website` },
        about: "One hundred African product websites built in October 2026",
        license: `${site.url}/terms`,
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700,800|Oswald:300,400,500,600,700&display=swap"
        />
        <noscript>
          {/* The template reveal classes start hidden and are switched on by script.
              Without script the content must still be readable. */}
          <style>{`[class*="effect-"]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Providers locale="en">
          <a className="ta-skip" href="#main">
            Skip to content
          </a>
          <Preloader />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <FloatingActions />
          <CookieConsent />
          <SmoothScroll />
        </Providers>
      </body>
    </html>
  );
}
