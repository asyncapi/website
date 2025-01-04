const config = {
  transform: {
    '^.+\\.[t|j]sx?$': ['babel-jest', { configFile: './tests/babel.test.config.cjs' }]
  },
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['text', 'lcov', 'json-summary'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['scripts/**/*.ts'],
  coveragePathIgnorePatterns: ['scripts/compose.ts', 'scripts/tools/categorylist.ts', 'scripts/tools/tags-color.ts'],
  testMatch: ['**/tests/**/*.test.*', '!**/netlify/**/*.test.*'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};

export default config;
