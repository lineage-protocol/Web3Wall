import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import tsconfigPaths from 'vite-tsconfig-paths'
import { VitePWA } from 'vite-plugin-pwa'
import manifestForPlugIn from './manifest'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), VitePWA({ registerType: 'autoUpdate', manifest: manifestForPlugIn })],
  base: process.env.VITE_PUBLIC_URL,
  /*   define: {
    'process.env': {},
    'global': 'globalThis',
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  }, */
})
