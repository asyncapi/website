import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, YAxis } from 'recharts';

import type { ExpenseItem, ExpensesLinkItem } from '@/types/FinancialSummary/BarChartComponent';

import ExpensesData from '../../config/finance/json-data/Expenses.json';
import ExpensesLinkData from '../../config/finance/json-data/ExpensesLink.json';
import { getUniqueCategories } from '../../utils/getUniqueCategories';
import CustomTooltip from './CustomTooltip';
import ExpensesCard from './ExpensesCard';

/**
 * @description BarChartComponent component displays a bar chart for expense analysis.
 */
export default function BarChartComponent() {
  // Setting up state variables using useState hook
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [selectedMonth, setSelectedMonth] = useState<string>('All Months');
  const [windowWidth, setWindowWidth] = useState<number>(0);

  // Extracting unique categories and months from the data
  const categories: string[] = getUniqueCategories();
  const months: string[] = Object.keys(ExpensesData);

  // Effect hook to update windowWidth state on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Initial setup and event listener
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Filtering data based on selected month and category
  const filteredData: ExpenseItem[] = Object.entries(ExpensesData).flatMap(([month, entries]) =>
    selectedMonth === 'All Months' || selectedMonth === month
      ? entries.filter((entry) => selectedCategory === 'All Categories' || entry.Category === selectedCategory)
      : []
  );

  // Calculating total amount of filtered data
  const totalAmount: number = filteredData.reduce((total, entry) => total + parseFloat(entry.Amount), 0);

  // Calculating total amount per category
  const categoryAmounts: { [category: string]: number } = {};

  filteredData.forEach((entry) => {
    if (categoryAmounts[entry.Category]) {
      categoryAmounts[entry.Category] += parseFloat(entry.Amount);
    } else {
      categoryAmounts[entry.Category] = parseFloat(entry.Amount);
    }
  });

  // Formatting data for the chart
  const chartData: { Category: string; Amount: number }[] = Object.keys(categoryAmounts).map((category) => ({
    Category: category,
    Amount: categoryAmounts[category]
  }));

  const barWidth: number | undefined = windowWidth && windowWidth < 900 ? undefined : 800;
  const barHeight: number | undefined = windowWidth && windowWidth < 900 ? undefined : 400;

  return (
    <div className='mt-8 flex items-center justify-center sm:px-6 lg:px-8'>
      <div className='w-full px-4 text-center lg:w-2/3'>
        <div className='mb-5'>
          <h1 id='budget-analysis' className='my-2 mb-4 text-3xl font-semibold'>
            Budget Analysis
          </h1>
          <p>Gain insights into the allocation of funds across different categories through our Budget Analysis</p>
          <div className='my-4 flex flex-col justify-between md:m-8 md:flex-row md:items-center md:justify-between'>
            <div className='my-2'>
              <p className='text-center sm:text-left'>Expenses</p>
              <p className='mt-1 text-center text-xl font-semibold sm:text-left'>${totalAmount.toFixed(2)}</p>
            </div>
            <div className='space-x-4 md:flex'>
              <div className='mx-auto'>
                <select
                  className='m-1 w-full rounded-md border border-gray-600 bg-white p-2 text-xs font-semibold text-violet sm:w-auto md:w-48'
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value='All Categories'>All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <select
                  className='m-1 w-full rounded-md border border-gray-600 bg-violet p-2 pr-8 text-xs font-semibold text-white sm:w-auto md:w-48'
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  <option value='All Months'>All Months</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <BarChart width={barWidth} height={barHeight} data={chartData}>
            <CartesianGrid strokeDasharray='3 3' />
            <YAxis tickFormatter={(value) => `$${value}`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey='Amount'
              fill='#7B5DD3FF'
              onClick={(data) => {
                const category = data.payload.Category;
                const matchedLinkObject: ExpensesLinkItem | undefined = ExpensesLinkData.find(
                  (obj) => obj.category === category
                );

                if (matchedLinkObject) {
                  window.open(matchedLinkObject.link, '_blank');
                }
              }}
            />
          </BarChart>
        </div>
        {windowWidth && windowWidth < 900 ? <ExpensesCard /> : null}
      </div>
    </div>
  );
}
