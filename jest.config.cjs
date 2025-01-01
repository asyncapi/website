const { createJsWithTsEsmPreset } = require('ts-jest');

const JsWithTsEsm = createJsWithTsEsmPreset();
module.exports = {
  ...JsWithTsEsm,
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['text', 'lcov', 'json-summary'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['scripts/**/*.ts'],
  coveragePathIgnorePatterns: ['scripts/compose.ts', 'scripts/tools/categorylist.ts', 'scripts/tools/tags-color.ts'],
  testMatch: ['**/tests/**/*.test.*', '!**/netlify/**/*.test.*'],
  transformIgnorePatterns: ['node_modules/', '\\.json$']
};
