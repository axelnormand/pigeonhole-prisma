const baseConfig = require('./jest.config.base');

// use jest and not lint to run all tests as it's better use it's threading
// Means we do not overload your box with lots of separate jest processes in parallel
// In monorepos jest has a `projects` settings to point it at all the diff project tests
module.exports = {
  ...baseConfig,
  projects: ['./client', './server'],
};
