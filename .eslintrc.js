module.export = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  ignorePatterns: [
    "**/generated/**",  
    "**/build/**",
    "**/public/**",
    "**/coverage/**",
    "**/node_modules/**",
    "**/dist/**",
    "**/web-build/**",
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier/@typescript-eslint",
    "plugin:jest/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:jsdoc/recommended",
  ],
  plugins: [
    "@typescript-eslint",
    "graphql",
    "prettier",
    "jest",
    "jsx-a11y",
    "import",
    "jsdoc",
  ],
  rules: {
    "prettier/prettier": [
      "error",
      {
        trailingComma: "all",
        singleQuote: true,
      },
    ],
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        pathGroups: [
          {
            pattern: "@axelnormand/**",
            group: "external",
            position: "after",
          },
        ],
      },
    ],
    "sort-imports": [
      "error",
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    "import/no-default-export": "error",
    "react/prop-types": "off",
    "jsdoc/require-returns": "off",
    "jsdoc/require-param-description": "off",
    "jsdoc/require-param-type": "off",
    "jsdoc/require-jsdoc": "off",
    "jsdoc/check-param-names": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
