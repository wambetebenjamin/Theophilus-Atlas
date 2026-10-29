"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "./I18nProvider";
import { site, whatsappLink } from "../lib/site";

/**
 * The tour script is written in each locale and reads the completion of the
 * challenge, then points to the directory, the atlas and the playbook.
 */
const tour = {
  en: "Theophilus Atlas. One hundred built, wisdom shared. This is the closing site of a one hundred website challenge. Between the first of October and the twenty ninth of October, two thousand and twenty six, one hundred product websites were built and published for African schools, clinics, churches, shops, farms, studios and civic teams. Start with the directory, where every build is listed by cluster and country. Then open the atlas for simple charts on how the hundred divide, and the playbook for the lessons on templates, translation, frugal design and deployment. This showcase is independent. Each original site remains its own project. To build together, message the WhatsApp line.",
  sw: "Theophilus Atlas. Mia moja imejengwa, hekima imeshirikiwa. Hii ni tovuti ya kufunga changamoto ya tovuti mia moja. Kati ya tarehe moja Oktoba na ishirini na tisa Oktoba, elfu mbili na ishirini na sita, tovuti mia moja za bidhaa zilijengwa na kuchapishwa kwa shule, kliniki, makanisa, maduka, mashamba, studio na timu za kiraia za Afrika. Anza na orodha, ambapo kila kazi imeorodheshwa kwa kundi na nchi. Kisha fungua atlasi kwa chati rahisi za jinsi mia moja inavyogawanyika, na mwongozo kwa masomo ya violezo, tafsiri, ubunifu wa gharama ndogo na uwekaji hewani. Maonyesho haya ni huru. Kila tovuti ya awali inabaki mradi wake. Kujenga pamoja, tuma ujumbe kwa WhatsApp.",
  fr: "Theophilus Atlas. Cent construits, le savoir partage. Ceci est le site de cloture d un defi de cent sites. Entre le premier octobre et le vingt neuf octobre deux mille vingt six, cent sites produits ont ete construits et publies pour des ecoles, cliniques, eglises, commerces, fermes, studios et equipes publiques africaines. Commencez par l annuaire, ou chaque construction est listee par groupe et par pays. Ouvrez ensuite l atlas pour des graphiques simples sur la repartition des cent, et le manuel pour les lecons sur les gabarits, la traduction, le design frugal et le deploiement. Cette vitrine est independante. Chaque site d origine reste son propre projet. Pour construire ensemble, ecrivez sur WhatsApp.",
} as const;

export function FloatingActions() {
  const { t, locale } = useI18n();
  const [speaking, setSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggle = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const text = tour[locale] ?? tour.en;
    const utterance = new SpeechSynthesisUtterance(text);
    const target = locale === "sw" ? "sw-KE" : locale === "fr" ? "fr-FR" : "en-KE";
    utterance.lang = target;
    utterance.rate = 0.95;
    utterance.pitch = 1.1;
    utterance.volume = 1;
    const voices = window.speechSynthesis.getVoices();
    const preferred =
      voices.find((voice) => voice.lang === target) ??
      voices.find((voice) => voice.lang?.toLowerCase().startsWith(locale)) ??
      voices.find((voice) => voice.lang === "en-KE") ??
      voices.find((voice) => voice.lang?.toLowerCase().startsWith("en"));
    if (preferred) utterance.voice = preferred;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    utteranceRef.current = utterance;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  return (
    <>
      <a
        className="ta-wa"
        href={whatsappLink("Hello Theophilus Atlas, I would like to talk about the 100 website challenge.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${t("common.whatsapp")}, ${site.whatsappDisplay}`}
        title={t("common.whatsapp")}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
          <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.03-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.19-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.07 2.86 1.22 3.06c.15.2 2.1 3.21 5.08 4.5.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.4-.07-.13-.27-.2-.57-.35z" />
          <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.35-1.4a9.86 9.86 0 0 0 4.68 1.19h.01c5.44 0 9.84-4.4 9.84-9.84C21.88 6.4 17.48 2 12.04 2zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.1.81.83-3.03-.2-.31a8.15 8.15 0 0 1-1.25-4.33c0-4.52 3.68-8.2 8.21-8.2 2.19 0 4.25.85 5.8 2.4a8.14 8.14 0 0 1 2.4 5.8c0 4.53-3.68 8.18-8.2 8.18z" />
        </svg>
      </a>

      <button
        type="button"
        className={`ta-voice${speaking ? " is-playing" : ""}`}
        onClick={toggle}
        aria-pressed={speaking}
        aria-label={speaking ? t("common.voiceStop") : t("common.voiceTour")}
        title={speaking ? t("common.voiceStop") : t("common.voiceTour")}
      >
        <i className={`fa ${speaking ? "fa-stop" : "fa-volume-up"}`} aria-hidden="true" />
        <span>{speaking ? t("common.voiceStop") : t("common.voiceTour")}</span>
      </button>
    </>
  );
}
