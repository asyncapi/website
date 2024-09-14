module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['scripts/**/*.js'],
  coverageReporters: ['text', 'lcov', 'json-summary'],
  coverageDirectory: 'coverage',
  // To disallow netlify edge function tests from running
  testMatch: ['**/tests/**/*.test.*', '!**/netlify/**/*.test.*'],
};
