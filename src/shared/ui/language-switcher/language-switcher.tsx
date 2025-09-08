import { useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import { i18n } from '@/shared/services'

import './language-switcher.css'

export const LanguageSwitcher = observer(() => {
  const { changeLanguage, locale } = i18n

  const handleChangeLocale = useCallback((targetLocale: string) => {
    return () => changeLanguage(targetLocale)
  }, [changeLanguage])

  return (
    <div className="language-switcher">
      <button
        className={`language-button ${locale === 'en' ? 'active' : ''}`}
        onClick={handleChangeLocale('en')}
        type="button"
      >
        EN
      </button>
      <button
        className={`language-button ${locale === 'ru' ? 'active' : ''}`}
        onClick={handleChangeLocale('ru')}
        type="button"
      >
        РУ
      </button>
    </div>
  )
})
