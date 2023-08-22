module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        'jest',
        'detox',
        'formatjs',
        '@typescript-eslint',
        'simple-import-sort',
        'react',
        'react-native',
    ],
    env: {
        browser: false,
        node: true,
        es6: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:react-hooks/recommended',
        'prettier',
    ],
    overrides: [
        { files: ['./*.js'] },
        {
            files: ['./e2e/**/*.js'],
            env: {
                'detox/detox': true,
                jest: true,
                'jest/globals': true,
            },
        },
    ],
    settings: {
        react: {
            version: 'detect',
        },
        'import/no-cycle': 'error',
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            typescript: {
                project: './',
            },
        },
        'import/ignore': ['react-native', 'lodash'],
    },
    rules: {
        'formatjs/no-offset': 'error',
        eqeqeq: 'error',
        'no-console': ['error', { allow: ['warn', 'error'] }],
        '@typescript-eslint/prefer-as-const': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                args: 'all',
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ],
        '@typescript-eslint/no-explicit-any': 'warn',
        // IMPORTS
        'import/no-unresolved': 'off',
        'sort-imports': 'off',
        'import/extensions': 'off',
        'import/no-named-as-default': 'off',
        'import/order': 'off',
        'import/prefer-default-export': 'off',
        'simple-import-sort/imports': 'error',
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    '**/*.test.ts',
                    '**/*.test.tsx',
                    '**/mocks/**',
                    '**/**/jest-setup.ts',
                    '**/jest.config.ts',
                    '**/**/render.tsx',
                ],
            },
        ],
        // REACT
        'react/jsx-sort-props': 1,
        'react/prop-types': 'off',
        // REACT HOOKS
        'react-hooks/exhaustive-deps': 'warn',
        'react-hooks/rules-of-hooks': 'error',
    },
};