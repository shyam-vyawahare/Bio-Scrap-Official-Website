import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import your translation files
import enTranslation from './locales/en/translation.json';
import mrTranslation from './locales/mr/translation.json';
import hiTranslation from './locales/hi/translation.json';

// Initialize i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: localStorage.getItem('language') || 'en', // Load saved language
    debug: import.meta.env.DEV, // Debug in dev only
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    resources: {
      en: { translation: enTranslation },
      mr: { translation: mrTranslation },
      hi: { translation: hiTranslation },
    },
    react: {
      useSuspense: false
    }
  });

// Save language preference
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
  document.documentElement.lang = lng;
});

export default i18n;
