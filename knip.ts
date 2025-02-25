import { type KnipConfig } from 'knip'

const config: KnipConfig = {
  next: {
    entry: [
      'next.config.{js,ts,cjs,mjs}',
      'src/{instrumentation,middleware}.{js,ts}',
      'src/app/global-error.{js,jsx,ts,tsx}',
      'src/app/**/{error,layout,loading,not-found,page,template,default}.{js,jsx,ts,tsx}',
      'src/app/**/route.{js,jsx,ts,tsx}',
      'src/app/{manifest,sitemap,robots}.{js,ts}',
      'src/app/**/{icon,apple-icon}.{js,jsx,ts,tsx}',
      'src/app/**/{opengraph,twitter}-image.{js,jsx,ts,tsx}',
      'src/pages/**/*.{js,jsx,ts,tsx}',
      'src/boundary/root/ui/*.{js,jsx,ts,tsx}',
      'src/boundary/**/screen.{js,jsx,ts,tsx}'
    ]
  },
  entry: ['vitest.config.{js,ts}', 'config/**'],
  ignore: [
    '**/*.d.ts',
    'src/**/*.stories.{ts,tsx}',
    'src/__mocks__/**/*',
    'src/__tests__/**/*',
    'src/env/**/*',
    'scripts/**/*',
    'vitest.setup.ts',
    'lefthook.yml',
    'src/lib/utils.ts'
  ],
  ignoreDependencies: [
    '@mswjs/.+',
    '@secretlint/.+',
    '@storybook/.+',
    '@types/.+',
    '@typescript-eslint/.+',
    'better-typescript-lib',
    'class-variance-authority',
    'tailwindcss-animate',
    'tailwind-merge',
    'autoprefixer',
    'lucide-react',
    'clsx'
  ],
  ignoreBinaries: ['lefthook'],
  ignoreExportsUsedInFile: true
}

export default config
