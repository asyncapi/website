export const loadYearData = (year: string) => {
  try {
    const expensesData = require(`../config/finance/${year}/Expenses.json`);
    const expensesLinkData = require(`../config/finance/${year}/ExpensesLink.json`);
    return { expensesData, expensesLinkData };
  } catch (error) {
    console.error(`Failed to load data for year ${year}:`, error);
    return { expensesData: {}, expensesLinkData: [] };
  }
};
