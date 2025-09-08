type NavigateHandlerParams = {
  /**
   * query parameters string to add to the address
   */
  search?: string
  /**
   * flag indicating that navigation to the specified address should replace the address in navigation history,
   * instead of adding a new position
   */
  replace?: boolean
  /**
   * state to pass to router
   */
  state?: any
}

/**
 * method for navigation
 */
export type NavigateHandler = (
  /**
   * path for navigation
   */
  path: string,
  /**
   * parameters for navigation
   */
  params?: NavigateHandlerParams,
) => void

/**
 * abstract entity for application navigation
 */
export abstract class RouterService {
  /**
   * method for navigating to specified address
   */
  public abstract navigate: NavigateHandler

  /**
   * current address
   */
  public abstract pathname: string
}
