import { filterExpenses } from '../../utils/filterExpenses';

const expenses = {
  January: [
    { Category: 'Marketing', Amount: '100' },
    { Category: 'Travel', Amount: '200' }
  ],
  February: [
    { Category: 'Marketing', Amount: '300' },
    { Category: 'Infrastructure', Amount: '400' }
  ]
};

describe('filterExpenses', () => {
  it('keeps every month and expense when both filters are set to All', () => {
    expect(filterExpenses(expenses, 'All Categories', 'All Months')).toEqual(expenses);
  });

  it('filters expenses by category while preserving month groups', () => {
    expect(filterExpenses(expenses, 'Marketing', 'All Months')).toEqual({
      January: [{ Category: 'Marketing', Amount: '100' }],
      February: [{ Category: 'Marketing', Amount: '300' }]
    });
  });

  it('returns only the selected month', () => {
    expect(filterExpenses(expenses, 'All Categories', 'February')).toEqual({
      February: [
        { Category: 'Marketing', Amount: '300' },
        { Category: 'Infrastructure', Amount: '400' }
      ]
    });
  });

  it('applies category and month filters together', () => {
    expect(filterExpenses(expenses, 'Infrastructure', 'February')).toEqual({
      February: [{ Category: 'Infrastructure', Amount: '400' }]
    });
  });
});
