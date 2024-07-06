const { promises: fs } = require('fs');
const { resolve } = require('path');
const buildFinanceInfoList = require('../../scripts/finance/index');
const writeJSON = require('../../scripts/utils/readAndWriteJson');

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
    expect(writeJSON).toHaveBeenCalledWith(expensesPath, expensesJsonPath);
    expect(writeJSON).toHaveBeenCalledWith(expensesLinkPath, expensesLinkJsonPath);
  });

  test('should log and throw an error if an error occurs', async () => {
    const error = new Error('Test error');
    fs.mkdir.mockRejectedValue(error);

    await expect(buildFinanceInfoList()).rejects.toThrow(`Error: ${error.message}`);

  });

  test('should throw an error if directory creation fails', async () => {
    const error = new Error('Cannot create directory');
    fs.mkdir.mockRejectedValue(error);

    await expect(buildFinanceInfoList()).rejects.toThrow(`Error: ${error.message}`);
  });

  test('should throw an error if writing JSON fails due to malformed YAML', async () => {
    const error = new Error('Invalid YAML structure');
    writeJSON.mockRejectedValue(error);

    await expect(buildFinanceInfoList()).rejects.toThrow(`Error: ${error.message}`);
  });

  test('should throw an error if source YAML file is not found', async () => {
    const error = new Error('ENOENT: no such file or directory');
    writeJSON.mockRejectedValue(error);

    await expect(buildFinanceInfoList()).rejects.toThrow(`Error: ${error.message}`);
  });

});
