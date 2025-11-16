const config = {
  transform: {
    '^.+\\.[t|j]sx?$': ['babel-jest', { configFile: './tests/babel.test.config.cts' }]
  },
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['text', 'lcov', 'json-summary'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['scripts/**/*.ts'],
  coveragePathIgnorePatterns: [
    'scripts/compose.ts',
    'scripts/tools/categorylist.ts',
    'scripts/tools/tags-color.ts',
    'scripts/helpers/logger.ts'
  ],
  // Default: all tests except integration
  testMatch: [
    '**/tests/**/*.test.*',
    '!**/netlify/**/*.test.*'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  }
};

export default config;
