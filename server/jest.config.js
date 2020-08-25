module.exports = {
    rootDir: '.',
    setupFiles: ["<rootDir>/jest.setup.js"],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.json'
        }
    },
    moduleFileExtensions: ['ts', 'js'],
    transform: {
        '^.+\\.(ts)$': 'ts-jest'
    },
    testEnvironment: 'node'
};