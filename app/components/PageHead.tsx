import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function PageHead({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  crumbs,
  homeLabel = "Home",
  children,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  intro: ReactNode;
  image: string;
  imageAlt: string;
  crumbs?: { href: string; label: string }[];
  homeLabel?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="ta-pagehead">
      <div className="ta-pagehead-media" aria-hidden="true">
        <Image src={image} alt="" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
      </div>
      <div className="homeoverlay" aria-hidden="true" />
      <div className="container ta-pagehead-inner">
        <span className="ta-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{intro}</p>
        {crumbs ? (
          <ul className="ta-crumbs">
            <li>
              <Link href="/">{homeLabel}</Link>
            </li>
            {crumbs.map((crumb) => (
              <li key={crumb.href}>
                <Link href={crumb.href}>{crumb.label}</Link>
              </li>
            ))}
          </ul>
        ) : null}
        {children}
        <span className="sr-only">{imageAlt}</span>
      </div>
    </section>
  );
}
