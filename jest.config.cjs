const { createJsWithTsEsmPreset } = require('ts-jest');

const JsWithTsEsm = createJsWithTsEsmPreset({
  tsconfig: {
    resolveJsonModule: true
  }
});
module.exports = {
  ...JsWithTsEsm,
  transform: {
    '^.+\\.json$': ['ts-jest', { useESM: true }],
    ...JsWithTsEsm.transform
  },
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['text', 'lcov', 'json-summary'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['scripts/**/*.ts'],
  coveragePathIgnorePatterns: ['scripts/compose.ts', 'scripts/tools/categorylist.ts', 'scripts/tools/tags-color.ts'],
  testMatch: ['**/tests/**/*.test.*', '!**/netlify/**/*.test.*']
};
