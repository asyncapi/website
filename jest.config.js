const config = {
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { configFile: './tests/babel.test.config.cts' }],
    '^.+\\.(ts|js)$': ['ts-jest', {
      isolatedModules: true,
    }],
  },
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['text', 'lcov', 'json-summary'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['scripts/**/*.ts'],
  coveragePathIgnorePatterns: ['scripts/compose.ts', 'scripts/tools/categorylist.ts', 'scripts/tools/tags-color.ts'],
  testMatch: ['**/tests/**/*.test.*', '!**/netlify/**/*.test.*'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json']
};

export default config;
