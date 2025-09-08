import { makeAutoObservable } from 'mobx'

import type { PersistStorage } from '../services'

import { localStorageService } from '../services'

export type Theme = 'light' | 'dark' | 'system'

export type IThemeService = {
  mode: Theme
  effectiveMode: 'light' | 'dark'
  setMode: (mode: Theme) => void
  toggleMode: () => void
}

class ThemeService implements IThemeService {
  private readonly THEME_MODE_KEY = 'theme-mode'
  private _mode: Theme = 'system'

  constructor(
    private readonly persistStorage: PersistStorage,
  ) {
    makeAutoObservable(this)
    this.loadFromStorage()
    this.watchSystemTheme()
    this.applyThemeToDOM()
  }

  get mode(): Theme {
    return this._mode
  }

  setMode(mode: Theme): void {
    this._mode = mode
    this.saveToStorage()
    this.applyThemeToDOM()
  }

  toggleMode(): void {
    // Simple toggle between light and dark for better UX
    const newMode = this.effectiveMode === 'light' ? 'dark' : 'light'
    this.setMode(newMode)
  }

  get effectiveMode(): 'light' | 'dark' {
    if (this._mode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return this._mode
  }

  private loadFromStorage(): void {
    const saved = this.persistStorage.getAsString(this.THEME_MODE_KEY)
    if (saved && ['light', 'dark', 'system'].includes(saved)) {
      this._mode = saved as Theme
    }
  }

  private saveToStorage(): void {
    this.persistStorage.setPrimitive(this.THEME_MODE_KEY, this._mode)
  }

  private applyThemeToDOM(): void {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', this.effectiveMode)
    }
  }

  private watchSystemTheme(): void {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', () => {
        // Trigger reactivity for system theme changes
        if (this._mode === 'system') {
          this.applyThemeToDOM()
          // Force observable change notification
          this.setMode('system')
        }
      })
    }
  }
}

export const themeService = new ThemeService(localStorageService)
