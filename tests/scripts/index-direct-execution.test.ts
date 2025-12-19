/**
 * @jest-environment node
 */

// This test file specifically tests the direct execution path of scripts/index.ts
// by manipulating the module environment to simulate direct execution.

import fs from 'fs';

// Mock all the imported functions to avoid actual file operations
jest.mock('../../scripts/build-post-list');
jest.mock('../../scripts/build-rss');
jest.mock('../../scripts/casestudies/index');
jest.mock('../../scripts/build-tools');
jest.mock('../../scripts/usecases/index');
jest.mock('../../scripts/finance/index');

describe('scripts/index.ts direct execution', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should execute start function when run directly', async () => {
    // Mock fs.readdirSync to return a valid year directory to avoid the error path
    const readdirSyncSpy = jest.spyOn(fs, 'readdirSync').mockReturnValue(['2023'] as any);
    const statSyncSpy = jest.spyOn(fs, 'statSync').mockReturnValue({ isDirectory: () => true } as any);
    
    // We need to mock console.error to avoid polluting the test output
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    // Set up process.argv to simulate direct execution
    const originalArgv = process.argv;
    const testFilePath = require.resolve('../../scripts/index');
    process.argv = ['', testFilePath];

    // Dynamically import the module to trigger the direct execution
    // Using require to ensure the module is evaluated
    await import('../../scripts/index');

    // Clean up
    process.argv = originalArgv;
    consoleErrorSpy.mockRestore();
    readdirSyncSpy.mockRestore();
    statSyncSpy.mockRestore();
  });
});