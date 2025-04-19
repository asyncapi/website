'use client';

import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, YAxis } from 'recharts';

import type { ExpenseItem, ExpensesLinkItem } from '@/types/FinancialSummary/BarChartComponent';
import { loadYearData } from '@/utils/loadYearData';

import ExpensesData from '../../config/finance/json-data/2024/Expenses.json';
import ExpensesLinkData from '../../config/finance/json-data/2024/ExpensesLink.json';
import { getUniqueCategories } from '../../utils/getUniqueCategories';
import CustomTooltip from './CustomTooltip';
import ExpensesCard from './ExpensesCard';

/**
 * @description BarChartComponent component displays a bar chart for expense analysis.
 */
export default function BarChartComponent() {
  const [mounted, setMounted] = useState(false);
  // Setting up state variables using useState hook
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [selectedMonth, setSelectedMonth] = useState<string>('All Months');
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [currentData, setCurrentData] = useState<{
    expensesData: { [key: string]: ExpenseItem[] };
    expensesLinkData: ExpensesLinkItem[];
  }>({
    expensesData: ExpensesData, // Use JSON data as initial value
    expensesLinkData: ExpensesLinkData
  });

  // Extracting unique categories from the data
  const categories: string[] = getUniqueCategories({ selectedYear, selectedMonth });
  const years: string[] = ['2023', '2024']; // Add more years as needed

  // Effect hook to update windowWidth state on resize
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // Effect to load year-specific data when year changes
  useEffect(() => {
    // Load data for the selected year (or All_years)
    const { expensesData, expensesLinkData } = loadYearData(selectedYear === 'All Years' ? 'All Years' : selectedYear);

    if (Object.keys(expensesData).length === 0) {
      // If no data found, fallback to default data
      setCurrentData({
        expensesData: ExpensesData,
        expensesLinkData: ExpensesLinkData
      });
    } else {
      setCurrentData({ expensesData, expensesLinkData });
    }
  }, [selectedYear]);

  // Modify months to use current year's data
  const months: string[] = Object.keys(currentData.expensesData);

  // Filtering data based on selected month, year, and category
  const filteredData: ExpenseItem[] = Object.entries(currentData.expensesData).flatMap(([month, entries]) =>
    selectedMonth === 'All Months' || selectedMonth === month
      ? entries.filter(
          (entry: ExpenseItem) => selectedCategory === 'All Categories' || entry.Category === selectedCategory
        )
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

  // Don't render anything until component is mounted
  if (!mounted) {
    return null;
  }

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
                <select
                  className='m-1 w-full rounded-md border border-gray-600 bg-white p-2 text-xs font-semibold text-violet sm:w-auto md:w-48'
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value='All Years'>All Years</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
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
                const matchedLinkObject: ExpensesLinkItem | undefined = currentData.expensesLinkData.find(
                  (obj) => obj.category === category
                );

                if (matchedLinkObject) {
                  window.open(matchedLinkObject.link, '_blank');
                }
              }}
            />
          </BarChart>
        </div>
        {windowWidth && windowWidth < 900 ? <ExpensesCard year={selectedYear} /> : null}
      </div>
    </div>
  );
}
