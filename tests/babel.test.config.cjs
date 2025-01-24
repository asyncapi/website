// This babel config is to transform the scripts to typescript before running the tests.

module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
  plugins: ['babel-plugin-transform-import-meta']
};
