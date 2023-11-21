const { promises: { readFile, writeFile } } = require('fs');
const { convertToJson } = require('../utils');
const { resolve } = require('path');

module.exports = async function buildFinanceInfoList() {
    try {
        const ExpensesContent = await readFile('config/finance/2023/Expenses.yml', 'utf-8');
        const ExpensesLinkContent = await readFile('config/finance/2023/ExpensesLink.yml', 'utf-8');

        const Expenses = convertToJson(ExpensesContent);
        const ExpensesLink = convertToJson(ExpensesLinkContent);

        // Write Expenses to a JSON file
        await writeFile(
            resolve(__dirname, '../../config/finance/json-data/2023/', 'Expenses.json'),
            JSON.stringify(Expenses, null, 2)
        );

        // Write ExpensesLink to a JSON file
        await writeFile(
            resolve(__dirname, '../../config/finance/json-data/2023/', 'ExpensesLink.json'),
            JSON.stringify(ExpensesLink, null, 2)
        );
    } catch (err) {
        console.error(err);
        throw err;
    }
};
