const { promises: fs } = require('fs');
const { resolve } = require('path');
const buildFinanceInfoList = require('../../scripts/finance/index');
const readAndWriteJson = require('../../scripts/utils/readAndWriteJson');

jest.mock('fs', () => ({
  promises: {
    mkdir: jest.fn(),
  },
}));

jest.mock('../../scripts/utils/readAndWriteJson', () => jest.fn());

describe('buildFinanceInfoList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create the necessary directory and write JSON files', async () => {
    const currentDir = resolve(__dirname, '../../');
    const expensesPath = resolve(currentDir, 'config', 'finance', '2024', 'Expenses.yml');
    const expensesLinkPath = resolve(currentDir, 'config', 'finance', '2024', 'ExpensesLink.yml');
    const jsonDirectory = resolve(currentDir, 'config', 'finance', 'json-data', '2024');
    const expensesJsonPath = resolve(jsonDirectory, 'Expenses.json');
    const expensesLinkJsonPath = resolve(jsonDirectory, 'ExpensesLink.json');

    await buildFinanceInfoList();

    expect(fs.mkdir).toHaveBeenCalledWith(jsonDirectory, { recursive: true });
    expect(readAndWriteJson).toHaveBeenCalledWith(expensesPath, expensesJsonPath);
    expect(readAndWriteJson).toHaveBeenCalledWith(expensesLinkPath, expensesLinkJsonPath);
  });

  test('should log and throw an error if an error occurs', async () => {
    const error = new Error('Test error');
    fs.mkdir.mockRejectedValue(error);

    await expect(buildFinanceInfoList()).rejects.toThrow(`Error: ${error.message}`);

  });
});
