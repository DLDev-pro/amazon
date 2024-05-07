import translationEn from './en/translation.json'
import translationVi from './vi/translation.json'
import translationJp from './jp/translation.json'
import translationCn from './cn/translation.json'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: translationEn,
  },
  vi: {
    translation: translationVi,
  },
  jp: {
    translation: translationJp,
  },
  cn: {
    translation: translationCn,
  },
}

i18next.use(initReactI18next).init({
  resources,
  lng: 'vi',
  debug: true,
})
