import { loadYearData } from './loadYearData';

/**
 * Retrieves unique expense categories for a specific month and year.
 * @param {string} selectedYear - The year for which to retrieve the data.
 * @param {string} selectedMonth - The month for which to retrieve the data.
 * @returns {string[]} An array of unique expense categories.
 */
export const getUniqueCategories = ({selectedYear, selectedMonth} : {selectedYear: string; selectedMonth: string}): string[] => {
    const { expensesData } = loadYearData(selectedYear);
    const allCategories: string[] = [];

    // If "All Months" is selected, return categories from all months
    if (selectedMonth === 'All Months') {
        for (const month in expensesData) {
            expensesData[month as keyof typeof expensesData].forEach((entry: { Category: string }) => {
                if (!allCategories.includes(entry.Category)) {
                    allCategories.push(entry.Category);
                }
            });
        }
    } else {
        // Return categories only for the selected month
        const monthData = expensesData[selectedMonth as keyof typeof expensesData] || [];
        monthData.forEach((entry: { Category: string }) => {
            if (!allCategories.includes(entry.Category)) {
                allCategories.push(entry.Category);
            }
        });
    }
    
    return allCategories;
};
