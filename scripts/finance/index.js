const { promises: { mkdir } } = require('fs');
const { resolve } = require('path');
const writeJSON = require('../utils/readAndWriteJson.js');

module.exports = async function buildFinanceInfoList({
    currentDir,
    configDir,
    financeDir,
    year,
    jsonDataDir
}) {
    try {
        const expensesPath = resolve(currentDir, configDir, financeDir, year, 'Expenses.yml');
        const expensesLinkPath = resolve(currentDir, configDir, financeDir, year, 'ExpensesLink.yml');

        // Ensure the directory exists before writing the files
        const jsonDirectory = resolve(currentDir, configDir, financeDir, jsonDataDir, year);
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