import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

export default defineConfig({
  plugins: [
    federation({
      name: 'vueMfe',
      // Exposes: import('vueMfe/AboutPage') in the shell
      exposes: {
        './AboutPage': './src/AboutPageWrapper',
      },
      shared: {
        vue: { singleton: true, requiredVersion: '^3.5.0' },
      },
    }),
    vue(),
    react(),
  ],
  server: { port: 3002 },
  build: {
    target: 'esnext',
    minify: false,
  },
})
