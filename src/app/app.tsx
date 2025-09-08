import { observer } from 'mobx-react-lite'
import { ErrorBoundary } from 'react-error-boundary'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { cacheInstance, configService, ErrorHandler, logError } from '@/shared'

import { Router } from './browser-router'

configService.init({
  apiUrl: window.__ENV__.PUBLIC_API_URL,
  isDevelopment: import.meta.env.DEV,
  useRealAPI: import.meta.env.VITE_USE_REAL_API === 'true',
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
