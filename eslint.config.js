import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: [
      'CLAUDE.md',
      '.ruler/**/*',
      '.claude/**/*',
      'docs/**/*',
      '*.md',
      '**/*.md',
    ],
  },
  {
    rules: {
      'no-console': ['warn'],
      'ts/no-use-before-define': ['warn'],
      'perfectionist/sort-imports': ['error', {
        type: 'line-length',
        internalPattern: ['^@/.+'],
      }],
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          ignore: ['README.md', 'CLAUDE.md'],
        },
      ],
      'ts/consistent-type-definitions': ['error', 'type'],
    },
  },
)
