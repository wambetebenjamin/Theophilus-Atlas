import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "../components/PageHead";
import { SignInForm } from "../components/SignInForm";
import { T } from "../components/T";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Light sign in for the saved shelf. No password, no profile page, no tracking dashboards.",
  alternates: { canonical: "/sign-in" },
  robots: { index: false, follow: true },
};

export default function SignInPage() {
  return (
    <>
      <PageHead
        eyebrow="Your shelf"
        title={<T k="auth.title" />}
        intro={<T k="auth.intro" />}
        homeLabel={<T k="nav.home" />}
        image="/images/city-accra.jpg"
        imageAlt="Modern office buildings beside a highway interchange in Accra"
        crumbs={[{ href: "/sign-in", label: "Sign in" }]}
      />

      <section className="ta-section ta-section--white">
        <div className="container">
          <div className="ta-authbox">
            <h2>
              <T k="auth.title" />
            </h2>
            <p>
              <T k="auth.intro" />
            </p>
            <SignInForm />
            <p className="ta-help" style={{ marginTop: 16 }}>
              Prefer to keep it local? <Link href="/saved">Saved sites</Link> works without signing in, straight from
              this browser.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
