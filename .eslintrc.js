module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    // 'comma-dangle': ['error'],
    'object-curly-spacing': ['error', 'always'],
    'no-void': 'warn',
    'new-cap': [
      'warn',
      {
        newIsCap: true,
        properties: false,
      },
    ],
    'no-plusplus': 'off',
    'no-mixed-operators': [
      'error',
      {
        allowSamePrecedence: true,
      },
    ],
    'no-fallthrough': [
      'error',
      {
        commentPattern: 'break[\\s\\w]*omitted',
      },
    ],
    'no-nested-ternary': 'warn',
    'no-console': 'error',
    'no-param-reassign': 'off',
    eqeqeq: 'error',
    // "react/prop-types": "off",
    'react/forbid-prop-types': 'off',
    'no-script-url': 0,
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true,
      },
    ],
    'no-extend-native': [
      'error',
      {
        exceptions: ['Object', 'String'],
      },
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', 'ts', 'tsx'],
      },
    ],
    'react/jsx-wrap-multilines': 0,
    'react/prop-types': 0,
    'react/jsx-one-expression-per-line': 0,
    // 'import/no-unresolved': [
    //   2,
    //   {
    //     ignore: ['^assets', '^app'],
    //   },
    // ],
    // 'import/no-extraneous-dependencies': [
    //   2,
    //   {
    //     optionalDependencies: false,
    //   },
    // ],
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'linebreak-style': 0,
    'react/no-array-index-key': 0,
    camelcase: 'warn',
    'array-bracket-spacing': 'off',
    'space-before-function-paren': 'off',
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
