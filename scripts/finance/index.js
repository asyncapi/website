const { promises: { mkdir } } = require('fs');
const { resolve } = require('path');
const writeJSON = require('../utils/readAndWriteJson.js')

module.exports = async function buildFinanceInfoList() {
    try {
        const currentDir = resolve(__dirname, '../../');

        const expensesPath = resolve(currentDir, 'config', 'finance', '2024', 'Expenses.yml');
        const expensesLinkPath = resolve(currentDir, 'config', 'finance', '2024', 'ExpensesLink.yml');

        // Ensure the directory exists before writing the files
        const jsonDirectory = resolve(currentDir, 'config', 'finance', 'json-data', '2024');
        await mkdir(jsonDirectory, { recursive: true });

        // Write Expenses and ExpensesLink to JSON files
        const expensesJsonPath = resolve(jsonDirectory, 'Expenses.json');
        await writeJSON(expensesPath, expensesJsonPath);

        const expensesLinkJsonPath = resolve(jsonDirectory, 'ExpensesLink.json');
        await writeJSON(expensesLinkPath, expensesLinkJsonPath);

    } catch (err) {
        throw new Error(err);
    }
};
