import type { RouteObject } from 'react-router'

import { routes } from '@/shared'

export const screen404Route: RouteObject = {
  path: routes.screen404.path,
  lazy: async () => {
    const Component = await import('./screen-404').then(module => module.default)
    return { Component }
  },
}
