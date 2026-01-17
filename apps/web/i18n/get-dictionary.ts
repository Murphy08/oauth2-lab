import 'server-only'
import type { Locale } from './config'

const dictionaries = {
  en: () => import('./dictionaries/en').then((module) => module.default),
  zh: () => import('./dictionaries/zh').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]()
