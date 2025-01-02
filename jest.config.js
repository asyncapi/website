// import { createJsWithTsEsmPreset } from 'ts-jest';

// const JsWithTsEsm = createJsWithTsEsmPreset({
//   tsconfig: 'tsconfig.json'
// });
const config = {
  // ...JsWithTsEsm,
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['text', 'lcov', 'json-summary'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['scripts/**/*.ts'],
  coveragePathIgnorePatterns: ['scripts/compose.ts', 'scripts/tools/categorylist.ts', 'scripts/tools/tags-color.ts'],
  testMatch: ['**/tests/**/*.test.*', '!**/netlify/**/*.test.*'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  roots: ['<rootDir>']
};

export default config;
