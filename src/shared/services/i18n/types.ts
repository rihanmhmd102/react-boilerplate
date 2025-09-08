import type * as messages from '@/locales/en/common.json'

export type TranslationFunction = <TOptions>(
  key: MessageKey,
  options?: TOptions
) => string

export type I18n<T = any> = {
  intl: T // provides access to the i18n library API
  changeLanguage: (lang: string) => Promise<void>
  locale: string // get current locale
  getAvailableLanguages: string[]
  t: TranslationFunction
}

export type LocaleMessages = typeof messages | null

type FlattenKeys<T, K extends keyof T = keyof T> = K extends string
  ? T[K] extends Record<string, any>
    ? T[K] extends string
      ? K
      : `${K}.${FlattenKeys<T[K]>}`
    : K
  : never

export type MessageKey = FlattenKeys<typeof messages>

export type FlattenedMessages = Record<MessageKey, string>

declare global {
  // eslint-disable-next-line ts/no-namespace
  namespace FormatjsIntl {
    // eslint-disable-next-line ts/consistent-type-definitions
    interface Message {
      ids: MessageKey
    }
  }
}
