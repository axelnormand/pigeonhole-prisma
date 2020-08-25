const expoPreset = require('jest-expo/jest-preset')
const jestPreset = require('@testing-library/react-native/jest-preset')

module.exports = Object.assign({}, expoPreset, jestPreset, {
    rootDir: '.',
    setupFiles: [...expoPreset.setupFiles, ...jestPreset.setupFiles],
    preset: '@testing-library/react-native',
    collectCoverage: true,
    collectCoverageFrom: [
        "**/*.{ts,tsx}",
        "!**/coverage/**",
        "!**/node_modules/**",
        "!**/babel.config.js",
        "!**/jest.setup.js"
    ]
})