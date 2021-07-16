import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { languageData } from '@pi0neerpat/localization'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    ns: ['vault', 'foundation', 'component', 'view', 'dappy'],
    // debug: process.env.NODE_ENV !== 'production',
    defaultNS: 'vault',
    keySeparator: false, // Required else will not work when a period "." is included in a key
    debug: false,
    whitelist: languageData.map((language) => language.id),
    detection: {
      // options for i18next-browser-languagedetector
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    returnEmptyString: false,
    // saveMissing: true, // send not translated keys to endpoint
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      // addPath: "http://localhost:3000/locales/add/{{lng}}/{{ns}}.missing.json",
    },
    load: 'languageOnly',
    function(error) {
      // TODO: Remove eslint-disable
      /* eslint-disable no-console */
      // TODO: Send error to reporting service
      console.log(error)
    },
    interpolation: {
      escapeValue: false, // not needed for react
    },
    react: {
      useSuspense: false, // Suspense causes issues with @apollo/client
    },
  })

export default i18n
