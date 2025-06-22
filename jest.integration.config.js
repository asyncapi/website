// temporary file for integration tests so that it doesnt do any harm to exisiting unit tests functionality
const config = {
    transform: {
      '^.+\\.[t|j]sx?$': ['babel-jest', { configFile: './tests/babel.test.config.cts' }]
    },
    verbose: true,
    collectCoverage: true,
    coverageDirectory: 'coverage/integration',
    coverageReporters: ['text', 'lcov', 'json-summary'],
    collectCoverageFrom: ['scripts/**/*.ts'],
    testMatch: ['**/npm/integrationTests/**/*.test.*', '**/tests/integrationTests/**/*.test.*'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1'
    }
  };
  
  export default config;