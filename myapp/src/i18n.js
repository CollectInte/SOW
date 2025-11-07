import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: require('./locales/en.json') },
      fr: { translation: require('./locales/fr.json') },
      // Add more languages as needed
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;
