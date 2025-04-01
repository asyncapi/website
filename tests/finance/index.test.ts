import fs from 'fs';
import path from 'path';
import { buildFinanceInfoList } from '../../scripts/finance/index';
import { expensesYaml, expensesLinkYaml, expensesjson, expensesLinkjson } from '../fixtures/financeData';

interface BuildFinanceInfoListParams {
  currentDir: string;
  configDir: string;
  financeDir: string;
  year: string;
  jsonDataDir: string;
}

describe('buildFinanceInfoList', () => {
  const testDir: string = path.resolve(__dirname, 'test-finance-info');
  const configDir: string = 'config';
  const financeDir: string = 'finance';
  const year: string = '2024';
  const jsonDataDir: string = 'json-data';

  beforeAll((): void => {
    // Create test directory structure
    fs.mkdirSync(path.resolve(testDir, configDir, financeDir, year), { recursive: true });

    fs.writeFileSync(path.resolve(testDir, configDir, financeDir, year, 'Expenses.yml'), expensesYaml);
    fs.writeFileSync(path.resolve(testDir, configDir, financeDir, year, 'ExpensesLink.yml'), expensesLinkYaml);
  });

  afterAll((): void => {
    // Clean up test directory
    fs.rmSync(testDir, { recursive: true, force: true });
  });

  it('should create JSON files from YAML files', async (): Promise<void> => {
    const params: BuildFinanceInfoListParams = {
      currentDir: testDir,
      configDir,
      financeDir,
      year,
      jsonDataDir
    };

    await buildFinanceInfoList(params);

    const jsonDir: string = path.resolve(testDir, configDir, financeDir, jsonDataDir);

    // Check if JSON directory was created
    expect(fs.existsSync(jsonDir)).toBe(true);

    // Check if JSON files were created
    const expensesJsonPath: string = path.resolve(jsonDir, 'Expenses.json');
    const expensesLinkJsonPath: string = path.resolve(jsonDir, 'ExpensesLink.json');

    expect(fs.existsSync(expensesJsonPath)).toBe(true);
    expect(fs.existsSync(expensesLinkJsonPath)).toBe(true);

    // Check contents of JSON files
    const expensesJson = JSON.parse(fs.readFileSync(expensesJsonPath, 'utf8'));
    const expensesLinkJson = JSON.parse(fs.readFileSync(expensesLinkJsonPath, 'utf8'));

    expect(expensesJson).toEqual(expensesjson);
    expect(expensesLinkJson).toEqual(expensesLinkjson);
  });

  it('should throw an error if YAML files are not found', async (): Promise<void> => {
    const params: BuildFinanceInfoListParams = {
      currentDir: testDir,
      configDir,
      financeDir,
      year: '2023', // Non-existent year
      jsonDataDir
    };

    try {
      await buildFinanceInfoList(params);
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toMatch(/ENOENT/); // Expecting a "no such file or directory" error
    }
  });

  it('should throw an error if JSON directory creation fails', async (): Promise<void> => {
    const params: BuildFinanceInfoListParams = {
      currentDir: testDir,
      configDir,
      financeDir,
      year,
      jsonDataDir: 'nonexistent-dir' // Invalid JSON data directory path
    };

    try {
      await buildFinanceInfoList(params);
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toMatch(/ENOENT/); // Expecting a "no such file or directory" error
    }
  });

  it('should throw an error if YAML content is invalid', async (): Promise<void> => {
    // Write invalid YAML content
    const invalidYaml: string = `
      invalid yaml content
    `;
    fs.writeFileSync(path.resolve(testDir, configDir, financeDir, year, 'InvalidExpenses.yml'), invalidYaml);

    const params: BuildFinanceInfoListParams = {
      currentDir: testDir,
      configDir,
      financeDir,
      year,
      jsonDataDir
    };

    try {
      await buildFinanceInfoList(params);
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toMatch(/YAMLException/); // Expecting a YAML parsing error
    }
  });
});
