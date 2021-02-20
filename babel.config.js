// each project or app can extend this base babel.config
// example usage in each app .babelrc.js
/*
const baseConfig = require('../../jest.config.base');

const baseConfig = require('../../babel.config');

module.exports = {
  ...baseConfig,
};
*/
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-private-methods',
    'babel-plugin-styled-components',
  ],
};
