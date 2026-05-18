import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationAR from './locales/ar/translation.json';
import translationEN from './locales/en/translation.json';
import translationHE from './locales/he/translation.json';

const resources = {
  ar: {
    translation: translationAR
  },
  en: {
    translation: translationEN
  },
  he: {
    translation: translationHE
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar',
    debug: false,
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage']
    }
  });

// Apply initial language properties to the html element
const currentLanguage = i18n.resolvedLanguage || 'ar';
document.documentElement.setAttribute('lang', currentLanguage);
document.documentElement.setAttribute('dir', ['ar', 'he'].includes(currentLanguage) ? 'rtl' : 'ltr');

export default i18n;
