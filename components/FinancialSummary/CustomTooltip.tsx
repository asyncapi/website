import type { CustomTooltipProps } from '@/types/FinancialSummary/BarChartComponent';

/**
 * CustomTooltip component displays custom tooltip for BarChart.
 * @param {CustomTooltipProps} props - Props for CustomTooltip component.
 * {JSX.Element} CustomTooltip component.
 */
export default function CustomTooltip(props: CustomTooltipProps) {
  const { active, payload } = props;

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
