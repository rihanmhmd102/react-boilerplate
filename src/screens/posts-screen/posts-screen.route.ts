import type { RouteObject } from 'react-router'

import { routes } from '@/shared'

export const postsScreenRoute: RouteObject = {
  path: routes.posts.path,
  lazy: async () => {
    const { default: PostsScreen } = await import('./posts-screen')
    return { Component: PostsScreen }
  },
}
