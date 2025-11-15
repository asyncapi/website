'use client';

import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, YAxis } from 'recharts';

import type { ExpensesLinkItem } from '@/types/FinancialSummary/BarChartComponent';

import CustomTooltip from './CustomTooltip';

interface ChartWrapperProps {
  chartData: { Category: string; Amount: number }[];
  barWidth?: number;
  barHeight?: number;
  ExpensesLinkData: ExpensesLinkItem[];
}

export default function ChartWrapper({ chartData, barWidth, barHeight, ExpensesLinkData }: ChartWrapperProps) {
  return (
    <BarChart width={barWidth} height={barHeight} data={chartData}>
      <CartesianGrid strokeDasharray='3 3' />
      <YAxis tickFormatter={(value: number) => `$${value}`} />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Bar
        dataKey='Amount'
        fill='#7B5DD3FF'
        onClick={(data: any) => {
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
  );
}