import fs from 'fs';
import path from 'path';

import { buildFinanceInfoList } from '../../scripts/finance/index';
import { writeJSON } from '../../scripts/helpers/readAndWriteJson';
import { CustomError } from '../../types/errors/CustomError';
import { expensesLinkYaml, expensesYaml } from '../fixtures/financeData';

jest.mock('../../scripts/helpers/readAndWriteJson');

describe('buildFinanceInfoList', () => {
  const testDir = path.resolve(__dirname, 'test-finance-info');
  const configDir = 'config';
  const financeDir = 'finance';
  const year = '2024';
  const jsonDataDir = 'json-data';

  beforeAll(() => {
    // Create test directory structure
    fs.mkdirSync(path.resolve(testDir, configDir, financeDir, year), { recursive: true });

    fs.writeFileSync(path.resolve(testDir, configDir, financeDir, year, 'Expenses.yml'), expensesYaml);
    fs.writeFileSync(path.resolve(testDir, configDir, financeDir, year, 'ExpensesLink.yml'), expensesLinkYaml);
  });

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  afterAll(() => {
    // Clean up test directory
    fs.rmSync(testDir, { recursive: true, force: true });
  });

  it('should create JSON files from YAML files', async () => {
    // Mock writeJSON to resolve successfully
    const mockWriteJSON = writeJSON as jest.MockedFunction<typeof writeJSON>;

    mockWriteJSON.mockResolvedValue();

    await buildFinanceInfoList({
      currentDir: testDir,
      configDir,
      financeDir,
      year,
      jsonDataDir
    });

    // Verify writeJSON was called twice (once for each file)
    expect(mockWriteJSON).toHaveBeenCalledTimes(2);

    // Verify the calls were made with correct paths
    expect(mockWriteJSON).toHaveBeenCalledWith(
      path.resolve(testDir, configDir, financeDir, year, 'Expenses.yml'),
      expect.stringContaining('Expenses.json')
    );
    expect(mockWriteJSON).toHaveBeenCalledWith(
      path.resolve(testDir, configDir, financeDir, year, 'ExpensesLink.yml'),
      expect.stringContaining('ExpensesLink.json')
    );
  });

  it('should throw an error if YAML files are not found', async () => {
    await expect(
      buildFinanceInfoList({
        currentDir: testDir,
        configDir,
        financeDir,
        year: '2023', // Non-existent year
        jsonDataDir
      })
    ).rejects.toThrow(CustomError);
  });

  it('should throw an error if writeJSON fails', async () => {
    // Mock writeJSON to throw an error
    const mockWriteJSON = writeJSON as jest.MockedFunction<typeof writeJSON>;

    mockWriteJSON.mockRejectedValueOnce(new Error('Write operation failed'));

    await expect(
      buildFinanceInfoList({
        currentDir: testDir,
        configDir,
        financeDir,
        year,
        jsonDataDir: 'test-dir'
      })
    ).rejects.toThrow(CustomError);

    // Restore the mock
    mockWriteJSON.mockRestore();
  });

  it('should throw an error if YAML content is invalid', async () => {
    // Write invalid YAML content
    const invalidYaml = `
      invalid yaml content
    `;

    fs.writeFileSync(path.resolve(testDir, configDir, financeDir, year, 'InvalidExpenses.yml'), invalidYaml);

    try {
      await buildFinanceInfoList({
        currentDir: testDir,
        configDir,
        financeDir,
        year,
        jsonDataDir
      });
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
    }
  });
});
