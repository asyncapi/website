module.exports = {
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['text', 'lcov', 'json-summary'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['scripts/**/*.js'],
  // To disallow netlify edge function tests from running
  testMatch: ['**/tests/**/*.test.*', '!**/netlify/**/*.test.*'],
};