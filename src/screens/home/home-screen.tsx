import { Link } from 'react-router'
import { observer } from 'mobx-react-lite'

import { routes } from '@/shared'
import { i18n } from '@/shared/services'

const { t } = i18n

const HomeScreen = observer(() => {
  return (
    <div className="hero-content">
      <div className="hero-logo">
        <img src="/assets/logo.svg" alt="Red Stack Logo" />
      </div>

      <h1 className="hero-title">
        {t('hero.title', { defaultMessage: 'Red Stack React Boilerplate' })}
      </h1>

      <p className="hero-subtitle">
        {t('hero.subtitle', { defaultMessage: 'Enterprise-Ready Solution' })}
      </p>

      <p className="hero-description">
        {t('hero.description', {
          defaultMessage: 'A production-ready React boilerplate by Red Stack, designed for building complex, scalable client applications with modern architecture patterns and comprehensive enterprise-grade features.',
        })}
      </p>

      <div className="hero-actions">
        <Link
          to={routes.posts.path}
          className="hero-button primary"
        >
          {t('hero.example', { defaultMessage: 'Example' })}
        </Link>
        <a
          href="./docs"
          className="hero-button secondary"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('hero.documentation', { defaultMessage: 'Documentation' })}
        </a>
        <a
          href="https://github.com/intellectronica/ruler"
          className="hero-button secondary"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('hero.repository', { defaultMessage: 'Repository' })}
        </a>
      </div>
    </div>
  )
})

export default HomeScreen
