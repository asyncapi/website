/**
 * Retrieves unique expense categories from the Expenses data.
 *
 * @param {Object} expenses - The expenses data.
 * @returns {string[]} An array of unique expense categories.
 */

const currentYear = String(new Date().getFullYear());
const Expenses = require(`../config/finance/json-data/${currentYear}/Expenses.json`);


export const getUniqueCategories = () => {
    const allCategories = [];
    for (const month in Expenses) {
        Expenses[month].forEach(entry => {
            if (!allCategories.includes(entry.Category)) {
                allCategories.push(entry.Category);
            }
        });
    }
    return allCategories;
};