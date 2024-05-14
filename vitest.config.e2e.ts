import swc from 'unplugin-swc'
import { configDefaults, defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    exclude: [...configDefaults.exclude, '**/data/pg/**'], // resolove error require config to data/pg on tests end-to-end
    globals: true, // makes it unnecessary to import test functions into the test file.
    root: './',
    setupFiles: ['./test/setup-e2e.ts'], // config run this files before runs to tests.
  },
  plugins: [
    tsConfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})
