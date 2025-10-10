import Expenses from '../config/finance/json-data/Expenses.json';

/**
 * Retrieves unique expense categories from the Expenses data.
 *
 * @param {Object} expenses - The expenses data.
 * @returns {string[]} An array of unique expense categories.
 */
export const getUniqueCategories = (expensesData: Record<string, Array<{ Category: string }>>): string[] => {
  const allCategories: string[] = [];

  Object.keys(expensesData).forEach((month) => {
    expensesData[month].forEach((entry: { Category: string }) => {
      if (!allCategories.includes(entry.Category)) {
        allCategories.push(entry.Category);
      }
    });
  });

  return allCategories;
};
