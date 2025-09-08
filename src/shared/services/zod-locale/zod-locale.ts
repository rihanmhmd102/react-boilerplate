import type { IntlShape } from 'react-intl'

import { z } from 'zod/mini'

import type { I18n } from '../i18n/types'

import { i18n } from '../i18n'

class ZodLocaleService {
  constructor(private readonly i18nService: I18n<IntlShape>) { }

  public init(): void {
    this.updateZodLocale(this.i18nService.locale)
  }

  private updateZodLocale(language: string): void {
    const locale = this.getZodLocaleForLanguage(language)
    z.config(locale)
  }

  private getZodLocaleForLanguage(language: string) {
    switch (language) {
      case 'en':
        return z.locales.en()
      case 'ru':
        return z.locales.ru()
      default:
        return z.locales.en()
    }
  }
}

export const zodLocaleInstance = new ZodLocaleService(i18n)
