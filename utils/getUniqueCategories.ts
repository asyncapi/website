const currentYear = new Date().getFullYear();

/**
 * Retrieves unique expense categories from the Expenses data.
 *
 * @param {Object} expenses - The expenses data.
 * @returns {string[]} An array of unique expense categories.
 */
export const getUniqueCategories = async (): Promise<string[]> => {
  const allCategories: string[] = [];
  const Expenses = (await import(`../config/finance/json-data/${currentYear}/Expenses.json`)).default;

  for (const month in Expenses) {
    Expenses[month as keyof typeof Expenses].forEach((entry: { Category: string }) => {
      if (!allCategories.includes(entry.Category)) {
        allCategories.push(entry.Category);
      }
    });
  }

  return allCategories;
};
