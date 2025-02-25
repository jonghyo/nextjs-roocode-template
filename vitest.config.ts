import path from 'path'

import react from '@vitejs/plugin-react-swc'
import { defineConfig, type UserConfig } from 'vite'
import { type InlineConfig } from 'vitest/node'

type ViteConfig = UserConfig & { test: InlineConfig }

const config = {
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    passWithNoTests: true,
    watch: false,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['html', 'junit', 'default'],
    outputFile: {
      html: './reports/vitest-report.html',
      junit: './reports/vitest-report.xml'
    },
    testTimeout: 20000,
    coverage: {
      provider: 'v8',
      reporter: [
        'cobertura',
        'lcov',
        'json',
        'html',
        'text',
        'text-summary',
        'json-summary'
      ],
      reportsDirectory: './coverage',
      reportOnFailure: true,
      watermarks: {
        lines: [50, 80],
        functions: [50, 80],
        branches: [50, 80],
        statements: [50, 80]
      },
      all: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.stories.{ts,tsx}',
        'src/**/*.spec.{ts,tsx}',
        'src/**/*.d.ts',
        'src/__mocks__/**/*',
        'src/__tests__/**/*',
        'src/env/*'
      ]
    },
    env: {},
    alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }]
  }
} satisfies ViteConfig

export default defineConfig(config)
