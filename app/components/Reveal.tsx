"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Effect = "fade" | "slide-left" | "slide-right" | "slide-top" | "slide-bottom" | "pop" | "helix";

/**
 * The template reveals sections with the effect-* classes it ships in
 * animation.css. This wrapper adds the .in state at the same moment the
 * template's reveal script would, with no new easing or shape.
 */
export function Reveal({
  effect = "slide-bottom",
  delay = 0,
  className = "",
  children,
  as: Tag = "div",
}: {
  effect?: Effect;
  delay?: number;
  className?: string;
  children: ReactNode;
  as?: "div" | "section" | "li" | "article" | "figure";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`effect-${effect}${shown ? " in" : ""}${className ? ` ${className}` : ""}`}
      style={{
        transitionDelay: `${Math.round(delay * 1000)}ms`,
        animationDelay: `${Math.round(delay * 1000)}ms`,
      }}
    >
      {children}
    </Tag>
  );
}
