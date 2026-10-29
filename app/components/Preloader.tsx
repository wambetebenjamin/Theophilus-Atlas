"use client";

import { useEffect, useState } from "react";

/**
 * The template ships a full white loading cover. It is kept, shortened and
 * removed on the first paint so it never becomes a wall on a slow phone.
 */
export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setDone(true), 520);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={`ta-loader${done ? " is-done" : ""}`} aria-hidden={done} role="presentation">
      <i />
      <span>Theophilus Atlas</span>
    </div>
  );
}
