import Expenses from '../config/finance/json-data/Expenses.json';

/**
 * Retrieves unique expense categories from the Expenses data.
 *
 * @param {Object} expenses - The expenses data.
 * @returns {string[]} An array of unique expense categories.
 */
export const getUniqueCategories = (): string[] => {
  const allCategories: string[] = [];

  Object.keys(Expenses).forEach((month) => {
    Expenses[month as keyof typeof Expenses].forEach((entry: { Category: string }) => {
      if (!allCategories.includes(entry.Category)) {
        allCategories.push(entry.Category);
      }
    });
  });

  return allCategories;
};
