import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { analyzer } from 'vite-bundle-analyzer'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
  plugins: [
    react({
      tsDecorators: true,
    }),
    tailwindcss(),
    tsconfigPaths(),
    analyzer(),
  ],
  build: {
    target: 'esnext',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'mobx', 'mobx-react-lite'],
          query: ['mobx-tanstack-query', '@tanstack/query-core'],
          i18n: ['react-intl'],
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
  },
})
