module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['scripts/**/*.js'],
  // To disallow netlify edge function tests from running
  testMatch: ['**/tests/**/*.test.*', '!**/netlify/**/*.test.*'],
};
