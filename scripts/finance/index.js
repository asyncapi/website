const { promises: { readFile, writeFile, mkdir } } = require('fs');
const { convertToJson } = require('../utils');
const { resolve, dirname } = require('path');

module.exports = async function buildFinanceInfoList() {
    try {
        const currentDir = resolve(__dirname, '../../');

        const expensesPath = resolve(currentDir, 'config', 'finance', '2023', 'Expenses.yml');
        const expensesLinkPath = resolve(currentDir, 'config', 'finance', '2023', 'ExpensesLink.yml');

        const ExpensesContent = await readFile(expensesPath, 'utf-8');
        const ExpensesLinkContent = await readFile(expensesLinkPath, 'utf-8');

        const Expenses = convertToJson(ExpensesContent);
        const ExpensesLink = convertToJson(ExpensesLinkContent);

        // Ensure the directory exists before writing the files
        const jsonDirectory = resolve(currentDir, 'config', 'finance', 'json-data', '2023');
        await mkdir(jsonDirectory, { recursive: true });

        // Write Expenses to a JSON files
        const expensesJsonPath = resolve(jsonDirectory, 'Expenses.json');
        await writeFile(expensesJsonPath, JSON.stringify(Expenses, null, 2));

        const expensesLinkJsonPath = resolve(jsonDirectory, 'ExpensesLink.json');
        await writeFile(expensesLinkJsonPath, JSON.stringify(ExpensesLink, null, 2));

    } catch (err) {
        console.error(err);
        throw err;
    }
};
