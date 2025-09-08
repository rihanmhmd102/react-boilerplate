import { createBrowserRouter, Outlet, redirect, RouterProvider, useRouteError } from 'react-router'

import { lazyLayout } from '@/screens/layout'
import { screen404Route } from '@/screens/404'
import { homeScreenRoute } from '@/screens/home'
import { postsScreenRoute } from '@/screens/posts-screen'
import { ErrorHandler, RouterServiceAdapter, routes, Spinner } from '@/shared'

const router = createBrowserRouter([
  {
    hydrateFallbackElement: <Spinner />,
    element: (
      <>
        <RouterServiceAdapter />
        <Outlet />
      </>
    ),
    children: [
      {
        lazy: lazyLayout,
        errorElement: <BubbleError />,
        children: [
          homeScreenRoute,
          postsScreenRoute,
          {
            element: <Outlet />,
            children: [screen404Route],
          },
          {
            path: '*',
            loader: async () => redirect(routes.screen404.path),
          },
        ],
      },
    ],
  },
])

export function Router() {
  return <RouterProvider router={router} />
}

// https://github.com/remix-run/react-router/discussions/10166
function BubbleError() {
  const error = useRouteError()

  let errorInstance: Error
  if (error instanceof Error) {
    errorInstance = error
  }
  else {
    errorInstance = new TypeError(typeof error === 'string' ? error : JSON.stringify(error))
  }

  return <ErrorHandler error={errorInstance} resetErrorBoundary={() => window.location.reload()} />
}
