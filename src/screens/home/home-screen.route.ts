import type { RouteObject } from 'react-router'

import { routes } from '@/shared'

export const homeScreenRoute: RouteObject = {
  path: routes.root.path,
  lazy: async () => {
    const Component = await import('./home-screen').then(module => module.default)
    return { Component }
  },
}
