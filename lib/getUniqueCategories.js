/**
 * Retrieves unique expense categories from the Expenses data.
 *
 * @param {Object} expenses - The expenses data.
 * @returns {string[]} An array of unique expense categories.
 */


export const getUniqueCategories = (Expenses) => {
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