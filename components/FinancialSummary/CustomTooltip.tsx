import React from 'react';

import type { CustomTooltipProps } from '@/types/FinancialSummary/BarChartComponent';

/**
 * @description CustomTooltip component displays custom tooltip for BarChart.
 * @param {boolean} props.active - The active state of the tooltip
 * @param {TooltipPayload[]} props.payload - The payload of the tooltip
 */
export default function CustomTooltip({ active, payload }: CustomTooltipProps) {
  /**
   * If the tooltip is active and the payload has data, display the category and amount of the bar
   */
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className='bg-opacity-90/90 rounded-md border border-gray-300 bg-white p-2 shadow-md'>
        <p className='text-14 mb-1 font-bold'>{data.Category}</p>
        <p className='text-12 text-gray-900'>${data.Amount.toFixed(2)}</p>
        <p>Click the bar to learn more</p>
      </div>
    );
  }

  return null;
}
