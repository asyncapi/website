module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['scripts/**/*.js'],
  coveragePathIgnorePatterns: [
    'scripts/compose.js','scripts/dashboard'
  ],
  // To disallow netlify edge function tests from running
  testMatch: ['**/tests/**/*.test.*', '!**/netlify/**/*.test.*'],
};
