import { makeAutoObservable } from 'mobx'

import type { NavigateHandler, RouterService } from '../router.service'

/**
 * parameters for initialization
 */
type RouterParams = {
  navigate: NavigateHandler
}

/**
 * RouterService implementation designed to
 * adapt React Router to API version,
 * and have the ability to use router in domain logic
 */
export class AdaptableRouterService implements RouterService {
  private navigateHandler?: NavigateHandler

  private currentPathname: string

  constructor() {
    this.currentPathname = globalThis.location?.pathname ?? ''
    makeAutoObservable(this)
  }

  public navigate: NavigateHandler = (path, params) => {
    this.navigateHandler?.(path, params)
  }

  public init = (params: RouterParams) => {
    this.navigateHandler = params.navigate
  }

  public get pathname() {
    return this.currentPathname
  }

  /**
   * method for setting current address
   */
  public updatePathname = (pathname: string) => {
    this.currentPathname = pathname
  }
}

export const router = new AdaptableRouterService()
