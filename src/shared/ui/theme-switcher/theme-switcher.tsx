import { observer, useLocalObservable } from 'mobx-react-lite'

import { createUIStore } from './ui-store'
import './theme-switcher.css'

export const ThemeSwitcher = observer(() => {
  const { toggleTheme, toggleButtonLabel, isDark } = useLocalObservable(createUIStore)

  return (
    <button
      onClick={toggleTheme}
      title={toggleButtonLabel}
      className="theme-switcher"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
})
