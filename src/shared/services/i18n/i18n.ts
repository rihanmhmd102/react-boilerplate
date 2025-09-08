import type { IntlShape, MessageDescriptor } from 'react-intl'

import { makeAutoObservable, runInAction } from 'mobx'
import { createIntl, createIntlCache } from 'react-intl'

import type { LocaleKey } from '@/shared'

import type { PersistStorage } from '../persist-storage'
import type { I18n, LocaleMessages, MessageKey, TranslationFunction } from './types'

import { localStorageService } from '../persist-storage'
import { flattenMessages, importMessages } from './utils'

class I18nService implements I18n<IntlShape> {
  private readonly IntlStorageKey: string = 'i18n_language'
  private intlCache = createIntlCache()
  private messages: Record<string, LocaleMessages> = {}
  public locale: string
  public intl: IntlShape

  constructor(
    private readonly persistStorage: PersistStorage,
  ) {
    const savedLocale = this.persistStorage.getAsString(this.IntlStorageKey)
    this.locale = this.getAvailableLanguages.includes(savedLocale || '')
      ? savedLocale!
      : this.detectBrowserLanguage()
    this.intl = this.createIntlInstance(this.locale)

    document.documentElement.lang = this.locale

    makeAutoObservable(this, {}, { deep: false })
  }

  public async init(): Promise<void> {
    try {
      const messages = await importMessages(this.locale)
      runInAction(() => {
        this.messages[this.locale] = messages
        this.intl = this.createIntlInstance(this.locale)
      })
    }
    catch (error) {
      console.warn(`Error loading initial messages for locale: ${this.locale}`, error)
      runInAction(() => {
        this.messages[this.locale] = null
        this.intl = this.createIntlInstance(this.locale)
      })
    }
  }

  private createIntlInstance(locale: string): IntlShape {
    const messages = this.messages[locale]
    const flattenedMessages = messages ? flattenMessages(messages) : {}

    return createIntl({
      locale,
      messages: flattenedMessages,
      defaultLocale: this.getAvailableLanguages[0],
    }, this.intlCache)
  }

  private detectBrowserLanguage(): string {
    const browserLang = navigator.language.split('-')[0]
    const availableLanguages = this.getAvailableLanguages
    return availableLanguages.includes(browserLang)
      ? browserLang
      : availableLanguages[0]
  }

  public changeLanguage = async (lang: string): Promise<void> => {
    if (!this.getAvailableLanguages.includes(lang)) {
      console.warn(`Language ${lang} is not supported`)
      return
    }

    if (!this.messages[lang]) {
      try {
        const messages = await importMessages(lang as LocaleKey)
        runInAction(() => {
          this.messages[lang] = messages
        })
      }
      catch (error) {
        console.warn(`Error loading messages for locale: ${lang}`, error)
        runInAction(() => {
          this.messages[lang] = null
        })
      }
    }

    runInAction(() => {
      this.locale = lang
      this.intl = this.createIntlInstance(lang)
    })

    this.persistStorage.setPrimitive(this.IntlStorageKey, lang)
    document.documentElement.lang = lang
  }

  public getCurrentLanguage = (): string => {
    return this.locale
  }

  // TODO: сделать массив из enum
  public get getAvailableLanguages() {
    return ['en', 'ru']
  }

  public t: TranslationFunction = <TOptions = Pick<MessageDescriptor, 'description' | 'defaultMessage'>>(
    key: MessageKey,
    options?: TOptions,
  ): string => {
    return this.intl.formatMessage({ id: key, ...options })
  }
}

export const i18n = new I18nService(localStorageService)
