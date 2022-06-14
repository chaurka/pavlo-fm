import {defineConfig} from 'vite'
import solid from 'vite-plugin-solid'

import {resolve} from 'node:path'
const relative = dir => resolve(process.cwd(), dir)

export default defineConfig({
  plugins: [solid()],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
    minify: false,
    sourcemap: true
  },
  resolve: {alias: {$: relative('src/')}}
})
