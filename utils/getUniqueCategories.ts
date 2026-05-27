import Expenses from '../config/finance/json-data/Expenses.json';

/**
 * Retrieves unique expense categories from the Expenses data.
 *
 * @param {Object} expenses - The expenses data.
 * @returns {string[]} An array of unique expense categories.
 */

// Uncomment below code to implement data of previous years in finance chart.
// export const getUniqueCategories = (expensesData: Record<string, Array<{ Category: string }>>): string[] => {
export const getUniqueCategories = (): string[] => {
  const allCategories: string[] = [];

  // uncomment the block below to switch to a
  // version that accepts arbitrary/combined expense data (e.g., 2023 + 2024).
  // Object.keys(expensesData).forEach((month) => {
  //   expensesData[month].forEach((entry: { Category: string }) => {
  Object.keys(Expenses).forEach((month) => {
    Expenses[month as keyof typeof Expenses].forEach((entry: { Category: string }) => {
      if (!allCategories.includes(entry.Category)) {
        allCategories.push(entry.Category);
      }
    });
  });

  return allCategories;
};
