const baseConfig = require('../jest.config.base');

module.exports = {
  ...baseConfig,
  testEnvironment: 'node',
  setupFiles: ['./src/tools/jest/jestSetup.ts'],
  setupFilesAfterEnv: ['./src/tools/jest/jestSetupAfterEnv.ts'],
};
