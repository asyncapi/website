import type { ExpenseItem, ExpensesLinkItem } from '@/types/FinancialSummary/BarChartComponent';
import expenses2023 from '../config/finance/json-data/2023/Expenses.json';
import expensesLink2023 from '../config/finance/json-data/2023/ExpensesLink.json';
import expenses2024 from '../config/finance/json-data/2024/Expenses.json';
import expensesLink2024 from '../config/finance/json-data/2024/ExpensesLink.json';
import expensesAll from '../config/finance/json-data/All_years/Expenses.json';
import expensesLinkAll from '../config/finance/json-data/All_years/ExpensesLink.json';

interface YearData {
  expenses: { [key: string]: ExpenseItem[] };
  links: ExpensesLinkItem[];
}

const YEAR_DATA_MAP: { [key: string]: YearData } = {
  'All Years': {
    expenses: expensesAll,
    links: expensesLinkAll
  },
  '2023': {
    expenses: expenses2023,
    links: expensesLink2023
  },
  '2024': {
    expenses: expenses2024,
    links: expensesLink2024
  }
};

/**
 * Loads the expense data for the given year.
 * @param year - The year for which to load the data.
 * @returns The expense data for the given year.
 */

export const loadYearData = (year: string): { expensesData: { [key: string]: ExpenseItem[] }, expensesLinkData: ExpensesLinkItem[] } => {
  try {
    const yearData = YEAR_DATA_MAP[year];
    if (!yearData) {
      throw new Error(`No data available for year ${year}`);
    }
    const { expenses: expensesData, links: expensesLinkData } = yearData;
    return { expensesData, expensesLinkData };
  } catch (error) {
    console.error(`Failed to load data for year ${year}:`, error);
    return { expensesData: {}, expensesLinkData: [] };
  }
};