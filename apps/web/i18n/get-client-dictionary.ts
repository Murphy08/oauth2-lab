import type { Locale } from './config'
import zhDict from './dictionaries/client-zh'
import enDict from './dictionaries/client-en'

const clientDictionaries = {
  zh: zhDict,
  en: enDict,
}

export const getClientDictionary = (locale: Locale) => {
  return clientDictionaries[locale] || clientDictionaries.zh
}
