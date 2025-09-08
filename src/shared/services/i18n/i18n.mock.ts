import type { IntlShape, MessageDescriptor } from 'react-intl'

import type { I18n } from './types'

export class MockIntlService implements I18n<IntlShape> {
  private currentLocale = 'en'

  public formatMessage = (descriptor: MessageDescriptor, _values?: Record<string, string | number | boolean>): string => {
    return String(descriptor.defaultMessage || descriptor.id || 'Mock message')
  }

  public t = <TOptions>(key: string, _options?: TOptions): string => {
    return key
  }

  public changeLanguage = async (lang: string): Promise<void> => {
    this.currentLocale = lang
  }

  public get locale(): string {
    return this.currentLocale
  }

  public get getAvailableLanguages(): string[] {
    return ['en', 'ru']
  }

  public get intl(): IntlShape {
    return {
      locale: this.currentLocale,
      messages: {},
      defaultLocale: 'en',
      formatMessage: this.formatMessage as any,
    } as IntlShape
  }
}

export const mockIntlInstance = new MockIntlService()
