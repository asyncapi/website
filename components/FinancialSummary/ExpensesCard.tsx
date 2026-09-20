import React from 'react';

import type { Expenses } from '@/types/FinancialSummary/BarChartComponent';

import ExpensesData from '../../config/finance/json-data/Expenses.json';
import Card from './Card';

interface ExpensesCardProps {
  selectedCategory: string;
  selectedMonth: string;
}

/**
 * @description ExpensesCard component displays filtered expenses for each month.
 */
export default function ExpensesCard({ selectedCategory, selectedMonth }: ExpensesCardProps) {
  const filteredExpenses = Object.entries(ExpensesData).filter(
    ([month]) => selectedMonth === 'All Months' || selectedMonth === month
  );

  return (
    <div className='overflow-x-auto'>
      <div className='grid auto-cols-max grid-flow-col gap-4 p-4'>
        {filteredExpenses.map(([month, data]) => {
          const filteredData = data.filter(
            (item) => selectedCategory === 'All Categories' || item.Category === selectedCategory
          );

          return <Card key={month} month={month as keyof Expenses} data={filteredData} />;
        })}
      </div>
    </div>
  );
}
