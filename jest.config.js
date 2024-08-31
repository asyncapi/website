module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['scripts/**/*.js'],
  coverageReporters: ['text', 'lcov', 'json-summary'],
  coverageDirectory: 'coverage'
};