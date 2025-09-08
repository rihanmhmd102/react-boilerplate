const Configuration = {
  /*
   * Resolve and load @commitlint/config-conventional from node_modules.
   * Referenced packages must be installed
   */
  extends: ['@commitlint/config-conventional'],
  /*
   * Any rules defined here will override rules from @commitlint/config-conventional
   */
  rules: {
    // Commit body must start with a blank line
    'body-leading-blank': [2, 'always'],

    // Commit footer must start with a blank line
    'footer-leading-blank': [2, 'always'],

    // Maximum header length
    'header-max-length': [2, 'always', 120],

    // Subject cannot be empty
    'subject-empty': [2, 'never'],

    // Subject must not end with '.'
    'subject-full-stop': [2, 'never', '.'],

    // Type must always be lowercase
    'type-case': [2, 'always', 'lower-case'],

    // Type cannot be empty
    'type-empty': [2, 'never'],

    // List of all possible commit types
    'type-enum': [2, 'always', [
      'feat',
      'bug',
      'wip',
      'refactor',
      'doc',
      'build',
      'chore',
      'revert',
      'style',
      'test',
      'major',
      'story',
    ]],
  },
  /*
   * Whether commitlint uses the default ignore rules
   */
  defaultIgnores: true,
  /*
   * Custom URL to show upon failure
   */
  helpUrl:
    'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
}

export default Configuration
