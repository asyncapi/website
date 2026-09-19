import type { Expenses } from '@/types/FinancialSummary/BarChartComponent';

/**
 * Filters expenses while retaining their month grouping for mobile cards.
 */
export function filterExpenses(expenses: Expenses, selectedCategory: string, selectedMonth: string): Expenses {
  return Object.fromEntries(
    Object.entries(expenses)
      .filter(([month]) => selectedMonth === 'All Months' || selectedMonth === month)
      .map(([month, entries]) => {
        const filteredEntries = entries.filter(
          (entry) => selectedCategory === 'All Categories' || entry.Category === selectedCategory
        );

        return [month, filteredEntries] as const;
      })
      .filter(([, entries]) => entries.length > 0)
  );
}
