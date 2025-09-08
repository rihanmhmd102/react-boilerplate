import { Navigate } from 'react-router'

import { i18n } from '@/shared/services'
import { routes } from '@/shared/constants/routes'

type ErrorHandlerProps = {
  error: Error
  resetErrorBoundary?: (...args: any[]) => void
}

const isDevelopment = import.meta.env.MODE === 'development'
const { t } = i18n

export function ErrorHandler(props: ErrorHandlerProps) {
  const { error, resetErrorBoundary } = props

  if ((error as any)?.response?.status === 404) {
    return <Navigate to={routes.screen404.path} replace />
  }

  const errorMessage = isDevelopment
    ? error.message
    : t('error.defaultMessage', { defaultMessage: 'An unexpected error occurred' })

  const errorDescription = isDevelopment
    ? error.stack
    : t('error.defaultDescription', { defaultMessage: 'We apologize for the inconvenience. Please try refreshing the page or contact support if the problem persists.' })

  return (
    <div className="error-hero">
      <div className="app-background">
        <div className="app-background-gradient" />
        <div className="app-background-pattern">
          <svg width="100%" height="100%">
            <pattern
              id="error-tech-pattern"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="2" fill="var(--text-secondary)" />
              <circle cx="30" cy="10" r="1" fill="var(--text-secondary)" />
              <circle cx="50" cy="10" r="2" fill="var(--text-secondary)" />
              <circle cx="10" cy="30" r="1" fill="var(--text-secondary)" />
              <circle cx="30" cy="30" r="2" fill="var(--text-secondary)" />
              <circle cx="50" cy="30" r="1" fill="var(--text-secondary)" />
              <circle cx="10" cy="50" r="2" fill="var(--text-secondary)" />
              <circle cx="30" cy="50" r="1" fill="var(--text-secondary)" />
              <circle cx="50" cy="50" r="2" fill="var(--text-secondary)" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#error-tech-pattern)" />
          </svg>
        </div>
        <div className="app-background-accent" />
      </div>

      <div className="error-content">
        <div className="error-icon">
          ⚠️
        </div>

        <h1 className="error-title">
          {t('error.title', { defaultMessage: 'Something went wrong' })}
        </h1>

        <p className="error-subtitle">
          {errorMessage}
        </p>

        <p className="error-description" title={errorDescription}>
          {errorDescription}
        </p>

        {isDevelopment && error.stack && (
          <details className="error-details">
            <summary className="error-details-summary">
              {t('error.technicalDetails', { defaultMessage: 'Technical Details' })}
            </summary>
            <pre className="error-stack">{error.stack}</pre>
          </details>
        )}

        <div className="error-actions">
          <button
            type="button"
            onClick={resetErrorBoundary}
            className="hero-button primary"
          >
            {t('error.tryAgain', { defaultMessage: 'Try Again' })}
          </button>
        </div>
      </div>
    </div>
  )
}
