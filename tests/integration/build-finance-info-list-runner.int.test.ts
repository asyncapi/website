import { promises as fs } from 'fs';
import os from 'os';
import { join, resolve } from 'path';

import { runBuildFinanceInfoList } from '../../npm/runners/build-finance-info-list-runner';
import { CustomError } from '../../types/errors/CustomError';

describe('Integration: build-finance-info-list-runner', () => {
  let tempDir: string;
  let configDir: string;
  let financeDir: string;
  let jsonDataDir: string;

  beforeEach(async () => {
    // Create a unique temp directory for each test
    tempDir = resolve(os.tmpdir(), `finance-info-test-${Date.now()}-${Math.random().toString(36).substring(7)}`);
    await fs.mkdir(tempDir, { recursive: true });

    configDir = resolve(tempDir, 'config');
    financeDir = resolve(configDir, 'finance');
    jsonDataDir = resolve(financeDir, 'json-data');

    // Create finance directory structure
    await fs.mkdir(financeDir, { recursive: true });
  });

  afterEach(async () => {
    // Clean up temp files and directory
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  describe('File Creation', () => {
    it('creates JSON files successfully from YAML files', async () => {
      const year = '2024';
      const yearDir = resolve(financeDir, year);

      await fs.mkdir(yearDir, { recursive: true });

      const expensesYaml = `expenses:
  - name: Test Expense 1
    amount: 1000
    category: Marketing
  - name: Test Expense 2
    amount: 2000
    category: Development`;

      const expensesLinkYaml = `links:
  - name: Financial Report
    url: https://example.com/report
  - name: Budget Overview
    url: https://example.com/budget`;

      await fs.writeFile(join(yearDir, 'Expenses.yml'), expensesYaml, 'utf-8');
      await fs.writeFile(join(yearDir, 'ExpensesLink.yml'), expensesLinkYaml, 'utf-8');

      await runBuildFinanceInfoList({
        currentDir: tempDir,
        configDir: 'config',
        financeDir: 'finance',
        year,
        jsonDataDir: 'json-data'
      });

      const expensesJsonPath = resolve(jsonDataDir, 'Expenses.json');
      const expensesLinkJsonPath = resolve(jsonDataDir, 'ExpensesLink.json');

      const expensesExists = await fs
        .access(expensesJsonPath)
        .then(() => true)
        .catch(() => false);
      const expensesLinkExists = await fs
        .access(expensesLinkJsonPath)
        .then(() => true)
        .catch(() => false);

      expect(expensesExists).toBe(true);
      expect(expensesLinkExists).toBe(true);
    });

    it('creates json-data directory if it does not exist', async () => {
      const year = '2024';
      const yearDir = resolve(financeDir, year);

      await fs.mkdir(yearDir, { recursive: true });

      const expensesYaml = 'expenses: []';
      const expensesLinkYaml = 'links: []';

      await fs.writeFile(join(yearDir, 'Expenses.yml'), expensesYaml, 'utf-8');
      await fs.writeFile(join(yearDir, 'ExpensesLink.yml'), expensesLinkYaml, 'utf-8');

      await runBuildFinanceInfoList({
        currentDir: tempDir,
        configDir: 'config',
        financeDir: 'finance',
        year,
        jsonDataDir: 'json-data'
      });

      const jsonDataExists = await fs
        .access(jsonDataDir)
        .then(() => true)
        .catch(() => false);

      expect(jsonDataExists).toBe(true);
    });
  });

  describe('Content Validation', () => {
    it('correctly converts Expenses.yml to Expenses.json', async () => {
      const year = '2024';
      const yearDir = resolve(financeDir, year);

      await fs.mkdir(yearDir, { recursive: true });

      const expensesYaml = `expenses:
  - name: Marketing Campaign
    amount: 5000
    category: Marketing
    date: 2024-01-15
  - name: Development Tools
    amount: 3000
    category: Development`;

      await fs.writeFile(join(yearDir, 'Expenses.yml'), expensesYaml, 'utf-8');
      await fs.writeFile(join(yearDir, 'ExpensesLink.yml'), 'links: []', 'utf-8');

      await runBuildFinanceInfoList({
        currentDir: tempDir,
        configDir: 'config',
        financeDir: 'finance',
        year,
        jsonDataDir: 'json-data'
      });

      const expensesJsonPath = resolve(jsonDataDir, 'Expenses.json');
      const content = await fs.readFile(expensesJsonPath, 'utf-8');
      const expenses = JSON.parse(content);

      expect(expenses).toHaveProperty('expenses');
      expect(Array.isArray(expenses.expenses)).toBe(true);
      expect(expenses.expenses).toHaveLength(2);
      expect(expenses.expenses[0]).toHaveProperty('name', 'Marketing Campaign');
      expect(expenses.expenses[0]).toHaveProperty('amount', 5000);
      expect(expenses.expenses[0]).toHaveProperty('category', 'Marketing');
    });

    it('correctly converts ExpensesLink.yml to ExpensesLink.json', async () => {
      const year = '2024';
      const yearDir = resolve(financeDir, year);

      await fs.mkdir(yearDir, { recursive: true });

      const expensesLinkYaml = `links:
  - name: Annual Report
    url: https://example.com/annual
    description: Full annual financial report
  - name: Quarterly Summary
    url: https://example.com/quarterly`;

      await fs.writeFile(join(yearDir, 'Expenses.yml'), 'expenses: []', 'utf-8');
      await fs.writeFile(join(yearDir, 'ExpensesLink.yml'), expensesLinkYaml, 'utf-8');

      await runBuildFinanceInfoList({
        currentDir: tempDir,
        configDir: 'config',
        financeDir: 'finance',
        year,
        jsonDataDir: 'json-data'
      });

      const expensesLinkJsonPath = resolve(jsonDataDir, 'ExpensesLink.json');
      const content = await fs.readFile(expensesLinkJsonPath, 'utf-8');
      const links = JSON.parse(content);

      expect(links).toHaveProperty('links');
      expect(Array.isArray(links.links)).toBe(true);
      expect(links.links).toHaveLength(2);
      expect(links.links[0]).toHaveProperty('name', 'Annual Report');
      expect(links.links[0]).toHaveProperty('url', 'https://example.com/annual');
      expect(links.links[0]).toHaveProperty('description', 'Full annual financial report');
    });

    it('handles complex nested YAML structures', async () => {
      const year = '2024';
      const yearDir = resolve(financeDir, year);

      await fs.mkdir(yearDir, { recursive: true });

      const expensesYaml = `expenses:
  - name: Project Alpha
    amount: 10000
    breakdown:
      labor: 6000
      materials: 3000
      overhead: 1000
    metadata:
      approved: true
      department: Engineering`;

      await fs.writeFile(join(yearDir, 'Expenses.yml'), expensesYaml, 'utf-8');
      await fs.writeFile(join(yearDir, 'ExpensesLink.yml'), 'links: []', 'utf-8');

      await runBuildFinanceInfoList({
        currentDir: tempDir,
        configDir: 'config',
        financeDir: 'finance',
        year,
        jsonDataDir: 'json-data'
      });

      const expensesJsonPath = resolve(jsonDataDir, 'Expenses.json');
      const content = await fs.readFile(expensesJsonPath, 'utf-8');
      const expenses = JSON.parse(content);

      expect(expenses.expenses[0]).toHaveProperty('breakdown');
      expect(expenses.expenses[0].breakdown).toHaveProperty('labor', 6000);
      expect(expenses.expenses[0]).toHaveProperty('metadata');
      expect(expenses.expenses[0].metadata).toHaveProperty('approved', true);
    });

    it('handles empty arrays in YAML', async () => {
      const year = '2024';
      const yearDir = resolve(financeDir, year);

      await fs.mkdir(yearDir, { recursive: true });

      await fs.writeFile(join(yearDir, 'Expenses.yml'), 'expenses: []', 'utf-8');
      await fs.writeFile(join(yearDir, 'ExpensesLink.yml'), 'links: []', 'utf-8');

      await runBuildFinanceInfoList({
        currentDir: tempDir,
        configDir: 'config',
        financeDir: 'finance',
        year,
        jsonDataDir: 'json-data'
      });

      const expensesJsonPath = resolve(jsonDataDir, 'Expenses.json');
      const expensesLinkJsonPath = resolve(jsonDataDir, 'ExpensesLink.json');

      const expensesContent = await fs.readFile(expensesJsonPath, 'utf-8');
      const linksContent = await fs.readFile(expensesLinkJsonPath, 'utf-8');

      const expenses = JSON.parse(expensesContent);
      const links = JSON.parse(linksContent);

      expect(expenses.expenses).toEqual([]);
      expect(links.links).toEqual([]);
    });
  });

  describe('Year Selection', () => {
    it('finds and uses the latest year when year is not provided', async () => {
      // Create multiple year directories
      await fs.mkdir(resolve(financeDir, '2022'), { recursive: true });
      await fs.mkdir(resolve(financeDir, '2023'), { recursive: true });
      await fs.mkdir(resolve(financeDir, '2024'), { recursive: true });

      // Create YAML files for each year
      await fs.writeFile(join(financeDir, '2022', 'Expenses.yml'), 'expenses: []', 'utf-8');
      await fs.writeFile(join(financeDir, '2022', 'ExpensesLink.yml'), 'links: []', 'utf-8');

      await fs.writeFile(join(financeDir, '2023', 'Expenses.yml'), 'expenses: []', 'utf-8');
      await fs.writeFile(join(financeDir, '2023', 'ExpensesLink.yml'), 'links: []', 'utf-8');

      const expensesYaml = `expenses:
  - name: Latest Year Expense
    amount: 5000`;

      await fs.writeFile(join(financeDir, '2024', 'Expenses.yml'), expensesYaml, 'utf-8');
      await fs.writeFile(join(financeDir, '2024', 'ExpensesLink.yml'), 'links: []', 'utf-8');

      await runBuildFinanceInfoList({
        currentDir: tempDir,
        configDir: 'config',
        financeDir: 'finance',
        jsonDataDir: 'json-data'
      });

      const expensesJsonPath = resolve(jsonDataDir, 'Expenses.json');
      const content = await fs.readFile(expensesJsonPath, 'utf-8');
      const expenses = JSON.parse(content);

      // Should use 2024 (latest year)
      expect(expenses.expenses).toHaveLength(1);
      expect(expenses.expenses[0]).toHaveProperty('name', 'Latest Year Expense');
    });

    it('uses the specified year when provided', async () => {
      await fs.mkdir(resolve(financeDir, '2023'), { recursive: true });
      await fs.mkdir(resolve(financeDir, '2024'), { recursive: true });

      const expensesYaml2023 = `expenses:
  - name: 2023 Expense
    amount: 3000`;

      await fs.writeFile(join(financeDir, '2023', 'Expenses.yml'), expensesYaml2023, 'utf-8');
      await fs.writeFile(join(financeDir, '2023', 'ExpensesLink.yml'), 'links: []', 'utf-8');

      const expensesYaml2024 = `expenses:
  - name: 2024 Expense
    amount: 4000`;

      await fs.writeFile(join(financeDir, '2024', 'Expenses.yml'), expensesYaml2024, 'utf-8');
      await fs.writeFile(join(financeDir, '2024', 'ExpensesLink.yml'), 'links: []', 'utf-8');

      await runBuildFinanceInfoList({
        currentDir: tempDir,
        configDir: 'config',
        financeDir: 'finance',
        year: '2023',
        jsonDataDir: 'json-data'
      });

      const expensesJsonPath = resolve(jsonDataDir, 'Expenses.json');
      const content = await fs.readFile(expensesJsonPath, 'utf-8');
      const expenses = JSON.parse(content);

      // Should use 2023 (specified year)
      expect(expenses.expenses).toHaveLength(1);
      expect(expenses.expenses[0]).toHaveProperty('name', '2023 Expense');
    });

    it('sorts years correctly in descending order', async () => {
      await fs.mkdir(resolve(financeDir, '2021'), { recursive: true });
      await fs.mkdir(resolve(financeDir, '2025'), { recursive: true });
      await fs.mkdir(resolve(financeDir, '2023'), { recursive: true });

      await fs.writeFile(join(financeDir, '2021', 'Expenses.yml'), 'expenses: []', 'utf-8');
      await fs.writeFile(join(financeDir, '2021', 'ExpensesLink.yml'), 'links: []', 'utf-8');

      await fs.writeFile(join(financeDir, '2023', 'Expenses.yml'), 'expenses: []', 'utf-8');
      await fs.writeFile(join(financeDir, '2023', 'ExpensesLink.yml'), 'links: []', 'utf-8');

      const expensesYaml2025 = `expenses:
  - name: 2025 Expense
    amount: 5000`;

      await fs.writeFile(join(financeDir, '2025', 'Expenses.yml'), expensesYaml2025, 'utf-8');
      await fs.writeFile(join(financeDir, '2025', 'ExpensesLink.yml'), 'links: []', 'utf-8');

      await runBuildFinanceInfoList({
        currentDir: tempDir,
        configDir: 'config',
        financeDir: 'finance',
        jsonDataDir: 'json-data'
      });

      const expensesJsonPath = resolve(jsonDataDir, 'Expenses.json');
      const content = await fs.readFile(expensesJsonPath, 'utf-8');
      const expenses = JSON.parse(content);

      // Should use 2025 (latest year)
      expect(expenses.expenses).toHaveLength(1);
      expect(expenses.expenses[0]).toHaveProperty('name', '2025 Expense');
    });
  });

  describe('Default Options', () => {
    it('uses default directory structure with explicit currentDir', async () => {
      // Create structure matching default paths
      const defaultConfigDir = resolve(tempDir, 'config');
      const defaultFinanceDir = resolve(defaultConfigDir, 'finance');
      const defaultYearDir = resolve(defaultFinanceDir, '2024');
      const defaultJsonDataDir = resolve(defaultFinanceDir, 'json-data');

      await fs.mkdir(defaultYearDir, { recursive: true });

      await fs.writeFile(join(defaultYearDir, 'Expenses.yml'), 'expenses: []', 'utf-8');
      await fs.writeFile(join(defaultYearDir, 'ExpensesLink.yml'), 'links: []', 'utf-8');

      // Use explicit currentDir option instead of process.chdir() to avoid mutating global state
      await runBuildFinanceInfoList({
        currentDir: tempDir,
        year: '2024'
      });

      const expensesJsonPath = resolve(defaultJsonDataDir, 'Expenses.json');
      const fileExists = await fs
        .access(expensesJsonPath)
        .then(() => true)
        .catch(() => false);

      expect(fileExists).toBe(true);
    });
  });

  describe('Custom Options', () => {
    it('uses custom directory paths', async () => {
      const customConfigDir = resolve(tempDir, 'custom-config');
      const customFinanceDir = resolve(customConfigDir, 'custom-finance');
      const customYearDir = resolve(customFinanceDir, '2024');
      const customJsonDataDir = resolve(customFinanceDir, 'custom-json-data');

      await fs.mkdir(customYearDir, { recursive: true });

      await fs.writeFile(join(customYearDir, 'Expenses.yml'), 'expenses: []', 'utf-8');
      await fs.writeFile(join(customYearDir, 'ExpensesLink.yml'), 'links: []', 'utf-8');

      await runBuildFinanceInfoList({
        currentDir: tempDir,
        configDir: 'custom-config',
        financeDir: 'custom-finance',
        year: '2024',
        jsonDataDir: 'custom-json-data'
      });

      const expensesJsonPath = resolve(customJsonDataDir, 'Expenses.json');
      const fileExists = await fs
        .access(expensesJsonPath)
        .then(() => true)
        .catch(() => false);

      expect(fileExists).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('throws CustomError when no finance data is found', async () => {
      // Create finance directory but with no year directories
      await fs.mkdir(financeDir, { recursive: true });

      await expect(
        runBuildFinanceInfoList({
          currentDir: tempDir,
          configDir: 'config',
          financeDir: 'finance',
          jsonDataDir: 'json-data'
        })
      ).rejects.toThrow(CustomError);
    });

    it('throws CustomError when Expenses.yml is missing', async () => {
      const year = '2024';
      const yearDir = resolve(financeDir, year);

      await fs.mkdir(yearDir, { recursive: true });
      await fs.writeFile(join(yearDir, 'ExpensesLink.yml'), 'links: []', 'utf-8');

      await expect(
        runBuildFinanceInfoList({
          currentDir: tempDir,
          configDir: 'config',
          financeDir: 'finance',
          year,
          jsonDataDir: 'json-data'
        })
      ).rejects.toThrow(CustomError);
    });

    it('throws CustomError when ExpensesLink.yml is missing', async () => {
      const year = '2024';
      const yearDir = resolve(financeDir, year);

      await fs.mkdir(yearDir, { recursive: true });
      await fs.writeFile(join(yearDir, 'Expenses.yml'), 'expenses: []', 'utf-8');

      await expect(
        runBuildFinanceInfoList({
          currentDir: tempDir,
          configDir: 'config',
          financeDir: 'finance',
          year,
          jsonDataDir: 'json-data'
        })
      ).rejects.toThrow(CustomError);
    });

    it('throws CustomError when specified year does not exist', async () => {
      await fs.mkdir(resolve(financeDir, '2023'), { recursive: true });
      await fs.writeFile(join(financeDir, '2023', 'Expenses.yml'), 'expenses: []', 'utf-8');
      await fs.writeFile(join(financeDir, '2023', 'ExpensesLink.yml'), 'links: []', 'utf-8');

      await expect(
        runBuildFinanceInfoList({
          currentDir: tempDir,
          configDir: 'config',
          financeDir: 'finance',
          year: '2024',
          jsonDataDir: 'json-data'
        })
      ).rejects.toThrow(CustomError);
    });

    it('filters out non-numeric directories when finding latest year', async () => {
      await fs.mkdir(resolve(financeDir, '2024'), { recursive: true });
      await fs.mkdir(resolve(financeDir, 'invalid-year'), { recursive: true });
      await fs.mkdir(resolve(financeDir, 'metadata'), { recursive: true });

      const expensesYaml = `expenses:
  - name: Valid Year Expense
    amount: 1000`;

      await fs.writeFile(join(financeDir, '2024', 'Expenses.yml'), expensesYaml, 'utf-8');
      await fs.writeFile(join(financeDir, '2024', 'ExpensesLink.yml'), 'links: []', 'utf-8');

      await runBuildFinanceInfoList({
        currentDir: tempDir,
        configDir: 'config',
        financeDir: 'finance',
        jsonDataDir: 'json-data'
      });

      const expensesJsonPath = resolve(jsonDataDir, 'Expenses.json');
      const content = await fs.readFile(expensesJsonPath, 'utf-8');
      const expenses = JSON.parse(content);

      // Should use 2024 (only numeric year)
      expect(expenses.expenses).toHaveLength(1);
      expect(expenses.expenses[0]).toHaveProperty('name', 'Valid Year Expense');
    });
  });

  describe('Edge Cases', () => {
    it('handles YAML with special characters', async () => {
      const year = '2024';
      const yearDir = resolve(financeDir, year);

      await fs.mkdir(yearDir, { recursive: true });

      const expensesYaml = `expenses:
  - name: "Expense with 'quotes' and \\"double quotes\\""
    amount: 1000
    description: "Special chars: @#$%^&*()"`;

      await fs.writeFile(join(yearDir, 'Expenses.yml'), expensesYaml, 'utf-8');
      await fs.writeFile(join(yearDir, 'ExpensesLink.yml'), 'links: []', 'utf-8');

      await runBuildFinanceInfoList({
        currentDir: tempDir,
        configDir: 'config',
        financeDir: 'finance',
        year,
        jsonDataDir: 'json-data'
      });

      const expensesJsonPath = resolve(jsonDataDir, 'Expenses.json');
      const content = await fs.readFile(expensesJsonPath, 'utf-8');
      const expenses = JSON.parse(content);

      expect(expenses.expenses[0]).toHaveProperty('name');
      expect(typeof expenses.expenses[0].name).toBe('string');
    });

    it('handles large YAML files', async () => {
      const year = '2024';
      const yearDir = resolve(financeDir, year);

      await fs.mkdir(yearDir, { recursive: true });

      // Create a large expenses array
      const expenses = Array.from({ length: 100 }, (_, i) => ({
        name: `Expense ${i + 1}`,
        amount: (i + 1) * 100
      }));

      const expensesYaml = `expenses:\n${expenses.map((e) => `  - name: ${e.name}\n    amount: ${e.amount}`).join('\n')}`;

      await fs.writeFile(join(yearDir, 'Expenses.yml'), expensesYaml, 'utf-8');
      await fs.writeFile(join(yearDir, 'ExpensesLink.yml'), 'links: []', 'utf-8');

      await runBuildFinanceInfoList({
        currentDir: tempDir,
        configDir: 'config',
        financeDir: 'finance',
        year,
        jsonDataDir: 'json-data'
      });

      const expensesJsonPath = resolve(jsonDataDir, 'Expenses.json');
      const content = await fs.readFile(expensesJsonPath, 'utf-8');
      const parsed = JSON.parse(content);

      expect(parsed.expenses).toHaveLength(100);
    });

    it('overwrites existing JSON files', async () => {
      const year = '2024';
      const yearDir = resolve(financeDir, year);

      await fs.mkdir(yearDir, { recursive: true });
      await fs.mkdir(jsonDataDir, { recursive: true });

      // Create initial JSON files
      await fs.writeFile(resolve(jsonDataDir, 'Expenses.json'), JSON.stringify({ expenses: [] }), 'utf-8');

      const expensesYaml = `expenses:
  - name: New Expense
    amount: 2000`;

      await fs.writeFile(join(yearDir, 'Expenses.yml'), expensesYaml, 'utf-8');
      await fs.writeFile(join(yearDir, 'ExpensesLink.yml'), 'links: []', 'utf-8');

      await runBuildFinanceInfoList({
        currentDir: tempDir,
        configDir: 'config',
        financeDir: 'finance',
        year,
        jsonDataDir: 'json-data'
      });

      const expensesJsonPath = resolve(jsonDataDir, 'Expenses.json');
      const content = await fs.readFile(expensesJsonPath, 'utf-8');
      const expenses = JSON.parse(content);

      expect(expenses.expenses).toHaveLength(1);
      expect(expenses.expenses[0]).toHaveProperty('name', 'New Expense');
    });
  });
});
