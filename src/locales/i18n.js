import { initReactI18next } from 'react-i18next'

import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import { defaultLanguage } from 'config'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: { translations: 'enLocales' },
      vn: { translations: 'vnLocales' },
    },
    lng: localStorage.getItem('i18nextLng') || defaultLanguage.value,
    fallbackLng: defaultLanguage.value,
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
