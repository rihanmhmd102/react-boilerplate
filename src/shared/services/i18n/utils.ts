import type { LocaleMessages } from './types'

export function flattenMessages(nestedMessages: any, prefix = ''): Record<string, string> {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key]
    const prefixedKey = prefix ? `${prefix}.${key}` : key

    if (typeof value === 'string') {
      messages[prefixedKey] = value
    }
    else {
      Object.assign(messages, flattenMessages(value, prefixedKey))
    }

    return messages
  }, {} as Record<string, string>)
}

export async function importMessages(locale: string): Promise<LocaleMessages> {
  switch (locale) {
    case 'en':
      return import(`@/locales/en/common.json`).then(p => p.default)
    case 'ru':
      return import(`@/locales/ru/common.json`).then(p => p.default)
    default:
      return import(`@/locales/en/common.json`).then(p => p.default)
  }
}
