import type { LazyRouteFunction, RouteObject } from 'react-router'

export const lazyLayout: LazyRouteFunction<RouteObject> = async () => {
  const Component = await import('./layout.tsx').then(module => module.default)
  return { Component }
}
