import React from 'react';

import type { ExpenseItem, Expenses } from '@/types/FinancialSummary/BarChartComponent';

import ExpensesLinkData from '../../config/finance/json-data/ExpensesLink.json';

/**
 * @description Card component displays expense details for a specific month.
 * @param {Object} props - Props for Card component.
 * @param {string} props.month - Month for which expenses are displayed.
 * @param {ExpenseItem[]} props.data - Expense data for the month.
 */
export default function Card({ month, data }: { month: keyof Expenses; data: ExpenseItem[] }) {
  /**
   * Handles the click event on an expense category.
   * Opens a new window with the corresponding link if available.
   * @param {string} category - The expense category clicked.
   * {void}
   */
  function handleExpenseClick(category: string) {
    const matchedLinkObject = ExpensesLinkData.find((obj) => obj.category === category);

    if (matchedLinkObject) {
      window.open(matchedLinkObject.link, '_blank');
    }
  }

  return (
    <div className='flex h-56 flex-col overflow-hidden rounded-lg bg-slate-100 p-4 shadow-lg'>
      <div className='mb-4 text-lg font-semibold'>{month}</div>
      <div className='flex flex-col overflow-auto'>
        {data.map((item, index) => (
          <div key={index} className='flex justify-between'>
            <div className='m-2 text-sm' onClick={() => handleExpenseClick(item.Category)}>
              {item.Category}
            </div>
            <div className='m-2 text-sm'>${item.Amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
