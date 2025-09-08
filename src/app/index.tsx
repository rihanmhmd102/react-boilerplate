import { StrictMode } from 'react'

import './index.css'

import { createRoot } from 'react-dom/client'

import { i18n, zodLocaleInstance } from '@/shared'

import { App } from './app'

i18n.init().then(() => {
  zodLocaleInstance.init()
  createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
