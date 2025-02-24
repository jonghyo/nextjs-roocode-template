import path from 'path'

import { type StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  refs: {
    '@chakra-ui/react': {
      disable: true
    }
  },
  staticDirs: ['../public'],
  webpackFinal: (config) => {
    config.resolve ??= {}
    config.resolve.alias ??= {}
    config.resolve.alias['@/styled-system'] = path.resolve(__dirname, '../styled-system')
    config.resolve.alias['@'] = path.resolve(__dirname, '../src')
    return config
  }
}
export default config
