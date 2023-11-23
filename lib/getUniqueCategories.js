/**
 * Retrieves unique expense categories from the Expenses data.
 *
 * @param {Object} expenses - The expenses data.
 * @returns {string[]} An array of unique expense categories.
 */

import Expenses from '../config/finance/json-data/2025/Expenses.json';

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