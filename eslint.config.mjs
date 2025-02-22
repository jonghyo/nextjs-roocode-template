import js from '@eslint/js'
import vitest from '@vitest/eslint-plugin'
import gitignore from 'eslint-config-flat-gitignore'
import prettier from 'eslint-config-prettier'
import jsdoc from 'eslint-plugin-jsdoc'
import preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions'
import redos from 'eslint-plugin-redos'
import storybook from 'eslint-plugin-storybook'
import unusedImports from 'eslint-plugin-unused-imports'
import tseslint from 'typescript-eslint'

import nextConfig from './config/eslint/eslint-config-next.mjs'

const ignores = [
  'src/env/*',
  'src/common/lib/api-client/types/*.gen.d.ts',
  'src/common/lib/zod-schema/schemas/*.gen.ts',
  'scripts/**/*'
]

const config = tseslint.config(
  gitignore(),
  { name: 'project/ignore', ignores },
  { name: 'js/recommended', rules: js.configs.recommended.rules },
  tseslint.configs.recommended,
  nextConfig.configs.coreWebVitals,
  jsdoc.configs['flat/recommended-typescript-error'],
  storybook.configs['flat/recommended'],
  { name: 'prettier/config', ...prettier },
  {
    name: 'vitest/config',
    files: ['**/*.spec.ts', '**/*.spec.tsx'],
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules,
      'vitest/consistent-test-it': ['error', { fn: 'test' }],
      'vitest/no-duplicate-hooks': 'error',
      'vitest/no-test-return-statement': 'error',
      'vitest/prefer-mock-promise-shorthand': 'error',
      'vitest/require-to-throw-message': 'error',
      'vitest/max-nested-describe': ['error', { max: 2 }]
    }
  },
  {
    name: 'project/config',
    plugins: {
      'prefer-arrow-functions': preferArrowFunctions,
      'unused-imports': unusedImports,
      redos
    },
    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: 'tsconfig.eslint.json'
      }
    },
    rules: {
      'arrow-body-style': ['error', 'as-needed'],
      'func-style': 'error',
      'no-console': 2,
      // NOTE: https://typescript-eslint.io/troubleshooting/faqs/eslint#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'no-implicit-coercion': 'error',
      'no-restricted-syntax': [
        'error',
        { message: "Don't declare enums", selector: 'TSEnumDeclaration' }
      ],

      'jsdoc/require-param': ['error', { checkDestructuredRoots: false }],
      'jsdoc/require-returns': 'off',
      'jsdoc/require-jsdoc': 'error',
      'jsdoc/check-tag-names': ['error', { definedTags: ['knipignore'] }],

      'redos/no-vulnerable': 'error',
      'prefer-arrow-functions/prefer-arrow-functions': 'error',

      eqeqeq: ['error', 'always', { null: 'ignore' }],

      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/require-array-sort-compare': [
        'error',
        { ignoreStringArrays: true }
      ],
      '@typescript-eslint/restrict-plus-operands': [
        'error',
        {
          skipCompoundAssignments: false,
          allowBoolean: false,
          allowNullish: false,
          allowNumberAndString: false,
          allowRegExp: false,
          allowAny: false
        }
      ],

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],

      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        { allowNullableString: true, allowNullableNumber: true }
      ],

      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
          disallowTypeAnnotations: true
        }
      ],

      'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
      'import/no-cycle': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'object',
            'type',
            'index'
          ],
          'newlines-between': 'always',
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: { order: 'asc', caseInsensitive: true }
        }
      ],
      'unused-imports/no-unused-imports': 'warn'
    }
  }
)

export default config
