import { createI18n } from 'vue-i18n'
import en from '@/lang/en.json'
import ger from '@/lang/ger.json'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    ger
  }
})

export default i18n
