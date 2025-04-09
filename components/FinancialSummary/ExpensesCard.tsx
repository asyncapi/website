import React from 'react';

import type { Expenses } from '@/types/FinancialSummary/BarChartComponent';
import { loadYearData } from '@/utils/loadYearData';

import Card from './Card';

/**
 * @description ExpensesCard component displays all expenses for each month.
 * @param {string} year - The year for which expenses are to be displayed.
 */
export default function ExpensesCard({ year }: { year: string }) {
  const { expensesData, expensesLinkData } = loadYearData(year);

  return (
    <div className='overflow-x-auto'>
      <div className='grid auto-cols-max grid-flow-col gap-4 p-4'>
        {Object.entries(expensesData).map(function ([month, data], index) {
          return <Card key={index} month={month as keyof Expenses} data={data} expensesLinkData={expensesLinkData} />;
        })}
      </div>
    </div>
  );
}
