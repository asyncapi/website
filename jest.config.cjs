module.exports = {
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['text', 'lcov', 'json-summary'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['scripts/**/*.ts'],
  coveragePathIgnorePatterns: ['scripts/compose.ts'],
  // To disallow netlify edge function tests from running
  testMatch: ['**/tests/**/*.test.*', '!**/netlify/**/*.test.*'],
  transform: {
    "^.+\\.[tj]sx?$": ["ts-jest",{
		"tsconfig": "tsconfig.json"
	}],
  },
};