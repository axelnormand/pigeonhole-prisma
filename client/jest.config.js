module.exports = {
    //preset: '@testing-library/react-native',
    preset: './node_modules/jest-expo/jest-preset.js',
    transform: {
        '^.+\\.(js|ts|tsx)$': 'babel-jest',
    }
}