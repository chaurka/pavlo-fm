import {defineConfig} from 'vite'
import solid from 'vite-plugin-solid'

import {resolve} from 'node:path'
const relative = dir => resolve(process.cwd(), dir)

export default defineConfig({
  plugins: [solid()],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false
  },
  resolve: {alias: {$: relative('src/')}}
})
