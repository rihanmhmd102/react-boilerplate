# Application

## Main Concept

The `Application` layer is the only layer that:

- Depends on environment
  - Bundler specifics
  - Working with env
- Depends on framework specifics
- Depends on low-level implementations (used libraries)

The `Application` layer contains:

- Application routing
- Application initialization/configuration and all services

## Motivation

The Application layer isolates framework and environment specific implementation details from other application layers. This allows:

- Easy migration between different frameworks
- Replacing bundlers without changing business logic
- Simplifies testing, as other layers don't depend on environment specifics

## Structure

Example structure for React:

```
├── app/
|    ├── browser-router.tsx
|    └── app.tsx
├── screens/
├── modules/
├── data/
└── shared/
```

Example structure for Nextjs:

```
├── pages/          # pages is the application layer (Nextjs specificity)
|    ├── index.tsx
|    ├── _app.tsx
├── screens/
├── modules/
├── data/
└── shared/
```

## Routing

The Application layer contains application routing configuration. Routing connects URLs with corresponding screens.

Example routing configuration:

```tsx
const router = createBrowserRouter([
  {
    hydrateFallbackElement: <Loader fullscreen overlayClassname="bg-background" />,
    element: (
      <>
        <Overlay />
        <RouterServiceAdapter />
        <Outlet />
      </>
    ),
    children: [
      {
        lazy: lazyLayout,
        errorElement: <BubbleError />,
        children: [
          homePageRoute,
          catalogPageRoute,
          cartPageRoute,
          {
            element: <Outlet />,
            children: [page404Route],
          },
          {
            path: '*',
            loader: async () => redirect(routes.page404.path),
          },
        ],
      },
    ],
  },
])

export function Router() {
  return <RouterProvider router={router} />
}
```

## Application Initialization

The Application layer is responsible for application and all services initialization. This includes:

- DI container configuration
- Stores initialization
- Data services configuration
- Application configuration initialization

Example initialization:

```tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { observer } from 'mobx-react-lite'
import { ErrorBoundary } from 'react-error-boundary'

import { cacheInstance, configService, env, ErrorHandler, logError } from '@/shared'

import { Router } from './browser-router'

configService.init({
  apiUrl: env.get('VITE_API_URL'),
})

export const App = observer(() => {
  const queryClient = cacheInstance.client
  queryClient.mount()
  return (
    <ErrorBoundary FallbackComponent={ErrorHandler} onError={logError}>
      <Router />
      <ReactQueryDevtools client={queryClient} buttonPosition="bottom-right" position="bottom" initialIsOpen={false} />
    </ErrorBoundary>
  )
})
```

## Working with env Variables

All access to env sources should only happen at the application layer level. Working with env only at the application level allows the application not to depend on the bundler or env delivery mechanism.

### ConfigService

Application layers other than application should receive env data through `ConfigService`.

Example usage:

```tsx
// app.tsx
import { ConfigService } from '@/shared'

const configService = new ConfigService({
  apiUrl: process.env.API_URL,
  sentryDsn: process.env.SENTRY_DSN,
})

// Pass configService to application providers
```

```tsx
// In domain or features layers
import { configService } from '@/app/providers'

const apiUrl = configService.get('apiUrl')
```

## Testing

The Application layer is tested as an integration layer that combines all other application layers. When testing the application layer, it's necessary to check:

- Correct routing configuration
- Proper initialization of all services
- Correct configuration passing to other layers
- Error handling during initialization

For testing the application layer, it's recommended to use integration tests that check the work of the entire application as a whole.
