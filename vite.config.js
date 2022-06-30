import {defineConfig} from 'vite'
import solid from 'vite-plugin-solid'
import checker from 'vite-plugin-checker'

import {resolve} from 'node:path'
const relative = dir => resolve(process.cwd(), dir)

export default defineConfig({
  plugins: [solid(), checker({typescript: {}})],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
    minify: false,
    sourcemap: true
  },
  resolve: {alias: {$: relative('src/')}}
})
