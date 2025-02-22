import nextPlugin from '@next/eslint-plugin-next'
import _import from 'eslint-plugin-import'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'
import hooksPlugin from 'eslint-plugin-react-hooks'
import { config, parser } from 'typescript-eslint'

/**
 * eslint-config-next flatConfig対応
 * @see https://github.com/vercel/next.js/blob/canary/packages/eslint-config-next
 */
const recommended = config(
  {
    name: 'react/recommended',
    ...reactPlugin.configs.flat.recommended,
    settings: {
      react: { version: 'detect' }
    }
  },
  {
    name: 'react-hooks/recommended',
    plugins: { 'react-hooks': { rules: hooksPlugin.rules } },
    rules: { ...hooksPlugin.configs.recommended.rules }
  },
  {
    name: 'plugin:@next/next/recommended',
    plugins: { '@next/next': { rules: nextPlugin.rules } },
    rules: { ...nextPlugin.configs.recommended.rules }
  },
  {
    name: 'next/recommended',
    plugins: {
      'jsx-a11y': jsxA11yPlugin,
      import: _import,
      react: reactPlugin
    },
    rules: {
      'import/no-anonymous-default-export': 'warn',
      'react/no-unknown-property': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-no-target-blank': 'off',
      'jsx-a11y/alt-text': ['warn', { elements: ['img'], img: ['Image'] }],
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-proptypes': 'warn',
      'jsx-a11y/aria-unsupported-elements': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn'
    },
    settings: {
      'import/parsers': {
        [parser]: ['.ts', '.mts', '.cts', '.tsx', '.d.ts']
      },
      'import/resolver': {
        node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        typescript: true
      }
    }
  },
  {
    name: 'ts/settings',
    files: ['**/*.ts?(x)'],
    languageOptions: {
      parser: parser,
      parserOptions: {
        sourceType: 'module'
      }
    }
  }
)

const coreWebVitals = config({
  name: 'next/core-web-vitals',
  extends: [recommended],
  rules: { ...nextPlugin.configs['core-web-vitals'].rules }
})

const plugin = {
  configs: {
    recommended,
    coreWebVitals
  }
}

export default plugin
