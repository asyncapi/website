import { loadYearData } from './loadYearData';

/**
 * Retrieves unique expense categories from the Expenses data.
 *
 * @param {Object} expenses - The expenses data.
 * @returns {string[]} An array of unique expense categories.
 */
export const getUniqueCategories = ({selectedYear} : {selectedYear: string}): string[] => {
    const { expensesData } = loadYearData(selectedYear);
    const allCategories: string[] = [];
    for (const month in expensesData) {
        expensesData[month as keyof typeof expensesData].forEach((entry: { Category: string }) => {
            if (!allCategories.includes(entry.Category)) {
                allCategories.push(entry.Category);
            }
        });
    }
    return allCategories;
};
