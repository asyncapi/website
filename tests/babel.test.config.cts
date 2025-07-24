// This babel config is to transform the scripts to typescript before running the tests.
/*
 * Previously, there were attempts to implement ts-jest, but an error occurred
 * regarding ts-jest not recognizing 'import-meta-url'.
 *
 * This issue is documented on the ts-jest repository: https://github.com/kulshekhar/ts-jest/issues/3888
 * A solution was requested at https://github.com/kulshekhar/ts-jest/issues/3888#issuecomment-2567702191,
 * but the issue persists in ts-jest.
 *
 * Community suggestions included migrating to vitest to support typescript with ESM. However, using Babel
 * was determined to be the most suitable approach, requiring minimal
 * codebase changes.
 */

module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
  plugins: ['babel-plugin-transform-import-meta']
};
