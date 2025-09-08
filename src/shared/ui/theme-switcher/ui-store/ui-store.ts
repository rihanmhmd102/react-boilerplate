import { makeAutoObservable } from 'mobx'

import type { IThemeService, Theme } from '@/shared/stores'

export class UIStore {
  constructor(private readonly themeService: IThemeService) {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  public get currentTheme(): Theme {
    return this.themeService.mode
  }

  public get isDark(): boolean {
    return this.themeService.effectiveMode === 'dark'
  }

  public get isLight(): boolean {
    return this.themeService.effectiveMode === 'light'
  }

  public get toggleButtonLabel(): string {
    return this.isDark ? 'Switch to light theme' : 'Switch to dark theme'
  }

  public toggleTheme = (): void => {
    this.themeService.toggleMode()
  }

  public setTheme = (theme: Theme): void => {
    this.themeService.setMode(theme)
  }
}
