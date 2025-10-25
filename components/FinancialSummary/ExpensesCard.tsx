import React from 'react';

import type { Expenses } from '@/types/FinancialSummary/BarChartComponent';

import ExpensesData from '../../config/finance/json-data/Expenses.json';
import Card from './Card';

/**
 * @description ExpensesCard component displays all expenses for each month.
 */
export default function ExpensesCard() {
  return (
    <div className='overflow-x-auto'>
      <div className='grid auto-cols-max grid-flow-col gap-4 p-4'>
        {Object.entries(ExpensesData).map(([month, data], index) => {
          return <Card key={index} month={month as keyof Expenses} data={data} />;
        })}
      </div>
    </div>
  );
}
