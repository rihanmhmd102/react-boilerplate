import type { NavigateHandler, RouterService } from '../router.service'

/**
 * RouterService implementation intended mainly for use in tests
 */
export class MockingRouterService implements RouterService {
  constructor(initPath: string) {
    this.pathname = initPath
  }

  public pathname = '/'

  public navigate: NavigateHandler = (path) => {
    this.pathname = path
  }
}
