// temporary file for integration tests so that it doesnt do any harm to exisiting unit tests functionality
const config = {
    transform: {
      '^.+\\.[t|j]sx?$': ['babel-jest', { configFile: './tests/babel.test.config.cts' }]
    },
    verbose: true,
    collectCoverage: false, // usually not needed for integration tests
    testMatch: ['**/npm/integrationTests/**/*.test.*'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json']
  };
  
  export default config;