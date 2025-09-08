import { Link } from 'react-router'
import { observer } from 'mobx-react-lite'

import { i18n, routes } from '@/shared'

const { t } = i18n

const Screen404 = observer(() => {
  return (
    <div className="error-404-hero">
      <div className="error-404-content">
        <div className="error-404-number">
          404
        </div>

        <h1 className="error-404-title">
          {t('page404.title')}
        </h1>

        <p className="error-404-description">
          {t('page404.description')}
        </p>

        <div className="error-404-actions">
          <Link
            to={routes.root.path}
            className="hero-button primary"
          >
            {t('page404.goHome')}
          </Link>
        </div>
      </div>
    </div>
  )
})

export default Screen404
