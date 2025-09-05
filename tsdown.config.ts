import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: 'src/**/*.ts',
  format: ['esm'],
  clean: true,
  sourcemap: true,
  treeshake: true,
  dts: true,
  minify: true,
  platform: 'browser',
  outDir: './dist'
})