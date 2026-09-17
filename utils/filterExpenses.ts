import type { Expenses } from '@/types/FinancialSummary/BarChartComponent';

/**
 * Filters expenses while retaining their month grouping for mobile cards.
 */
export function filterExpenses(expenses: Expenses, selectedCategory: string, selectedMonth: string): Expenses {
  return Object.fromEntries(
    Object.entries(expenses)
      .filter(([month]) => selectedMonth === 'All Months' || selectedMonth === month)
      .map(([month, entries]) => [
        month,
        entries.filter((entry) => selectedCategory === 'All Categories' || entry.Category === selectedCategory)
      ])
  );
}
