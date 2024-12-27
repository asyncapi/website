module.exports = {
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['text', 'lcov', 'json-summary'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['scripts/**/*.js'],
  coveragePathIgnorePatterns: ['scripts/compose.js', 'scripts/tools/categorylist.js', 'scripts/tools/tags-color.js'],
  // To disallow netlify edge function tests from running
  testMatch: ['**/tests/**/*.test.*', '!**/netlify/**/*.test.*'],
};