import fs from 'fs';
import path from 'path';

import { buildFinanceInfoList } from '../../scripts/finance/index';
import { expensesjson, expensesLinkjson, expensesLinkYaml, expensesYaml } from '../fixtures/financeData';

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

  afterAll(() => {
    // Clean up test directory
    fs.rmSync(testDir, { recursive: true, force: true });
  });

  it('should create JSON files from YAML files', async () => {
    await buildFinanceInfoList({
      currentDir: testDir,
      configDir,
      financeDir,
      year,
      jsonDataDir
    });

    const jsonDir = path.resolve(testDir, configDir, financeDir, jsonDataDir);

    // Check if JSON directory was created
    expect(fs.existsSync(jsonDir)).toBe(true);

    // Check if JSON files were created
    const expensesJsonPath = path.resolve(jsonDir, 'Expenses.json');
    const expensesLinkJsonPath = path.resolve(jsonDir, 'ExpensesLink.json');

    expect(fs.existsSync(expensesJsonPath)).toBe(true);
    expect(fs.existsSync(expensesLinkJsonPath)).toBe(true);

    // Check contents of JSON files
    const expensesJson = JSON.parse(fs.readFileSync(expensesJsonPath, 'utf8'));
    const expensesLinkJson = JSON.parse(fs.readFileSync(expensesLinkJsonPath, 'utf8'));

    expect(expensesJson).toEqual(expensesjson);
    expect(expensesLinkJson).toEqual(expensesLinkjson);
  });

  it('should throw an error if YAML files are not found', async () => {
    try {
      await buildFinanceInfoList({
        currentDir: testDir,
        configDir,
        financeDir,
        year: '2023', // Non-existent year
        jsonDataDir
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toMatch(/ENOENT/); // Expecting a "no such file or directory" error
    }
  });

  it('should throw an error if JSON directory creation fails', async () => {
    try {
      await buildFinanceInfoList({
        currentDir: testDir,
        configDir,
        financeDir,
        year,
        jsonDataDir: 'nonexistent-dir' // Invalid JSON data directory path
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toMatch(/ENOENT/); // Expecting a "no such file or directory" error
    }
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
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toMatch(/YAMLException/); // Expecting a YAML parsing error
    }
  });
});
