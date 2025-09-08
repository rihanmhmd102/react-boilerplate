// <reference types="vite/client" />

// CSS Module declarations
declare module '*.css' {
  const content: any
  export default content
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

// eslint-disable-next-line ts/consistent-type-definitions
interface Window {
  __ENV__: {
    PUBLIC_API_URL: string
  }
}

// eslint-disable-next-line ts/consistent-type-definitions
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly MODE: 'development' | 'production'
  // more env variables...
}

// eslint-disable-next-line ts/consistent-type-definitions
interface ImportMeta {
  readonly env: ImportMetaEnv
}
