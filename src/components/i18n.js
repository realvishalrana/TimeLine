import i18n from "i18next";

import translationHin from "../locales/hin/translation.json";
import translationGuj from "../locales/guj/translation.json";
import translationEn from "../locales/en/translation.json";

import { initReactI18next } from "react-i18next";
i18n.use(initReactI18next).init({
  debug: true,
  lng: "en",
  fallbackLng: "en",

  keySeparator: false,

  interpolation: {
    escapeValue: false,
  },

  resources: {
    hin: {
      translations: translationHin,
    },
    en: {
      translations: translationEn,
    },
    guj: {
      translations: translationGuj,
    },
  },

  // have a common namespace used around the full app
  defaultNS: "translations",
  ns: "translations",
});

export default i18n;
