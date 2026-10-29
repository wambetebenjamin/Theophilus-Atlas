"use client";

import { useCallback, useEffect, useState } from "react";
import { site } from "./site";

const EVENT = "ta-saved-change";
const NOTE_EVENT = "ta-notes-change";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(site.savedKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function write(slugs: string[]) {
  window.localStorage.setItem(site.savedKey, JSON.stringify(slugs));
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function useSaved() {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSlugs(read());
    setReady(true);
    const sync = () => setSlugs(read());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((slug: string) => {
    const current = read();
    const next = current.includes(slug)
      ? current.filter((item) => item !== slug)
      : [...current, slug];
    write(next);
    setSlugs(next);
    return next.includes(slug);
  }, []);

  const clear = useCallback(() => {
    write([]);
    setSlugs([]);
  }, []);

  return { slugs, ready, toggle, clear };
}

export type Notes = Record<string, string>;

function readNotes(): Notes {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(site.notesKey);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    const clean: Notes = {};
    Object.entries(parsed as Record<string, unknown>).forEach(([key, value]) => {
      if (typeof value === "string") clean[key] = value.slice(0, 280);
    });
    return clean;
  } catch {
    return {};
  }
}

export function useNotes() {
  const [notes, setNotes] = useState<Notes>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setNotes(readNotes());
    setReady(true);
    const sync = () => setNotes(readNotes());
    window.addEventListener(NOTE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(NOTE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const setNote = useCallback((slug: string, text: string) => {
    const current = readNotes();
    const clean = text.trim().slice(0, 280);
    if (clean) {
      current[slug] = clean;
    } else {
      delete current[slug];
    }
    window.localStorage.setItem(site.notesKey, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent(NOTE_EVENT));
    setNotes(current);
  }, []);

  return { notes, ready, setNote };
}
