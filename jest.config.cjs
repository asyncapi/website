module.exports = {
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['text', 'lcov', 'json-summary'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['scripts/**/*.ts'],
  coveragePathIgnorePatterns: ['scripts/compose.ts', 'scripts/tools/categorylist.ts', 'scripts/tools/tags-color.ts'],
  // To disallow netlify edge function tests from running
  testMatch: ['**/tests/**/*.test.*', '!**/netlify/**/*.test.*'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          module: 'ESNext'
        }
      }
    ]
  }
};
