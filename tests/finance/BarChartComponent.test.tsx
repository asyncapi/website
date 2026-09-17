import { useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import BarChartComponent from '../../components/FinancialSummary/BarChartComponent';

jest.mock('react', () => {
  const actualReact = jest.requireActual('react');

  return { ...actualReact, useState: jest.fn(actualReact.useState) };
});

jest.mock('recharts', () => ({
  BarChart: ({ data }: { data: Array<{ Category: string; Amount: number }> }) => (
    <div className='mock-bar-chart'>
      {data.map(({ Category, Amount }) => (
        <span key={Category}>{`${Category}: ${Amount}`}</span>
      ))}
    </div>
  ),
  Bar: () => null,
  CartesianGrid: () => null,
  Legend: () => null,
  Tooltip: () => null,
  YAxis: () => null
}));

jest.mock(
  '../../config/finance/json-data/Expenses.json',
  () => ({
    January: [
      { Category: 'Marketing', Amount: '100' },
      { Category: 'Travel', Amount: '200' }
    ],
    February: [
      { Category: 'Marketing', Amount: '300' },
      { Category: 'Infrastructure', Amount: '400' }
    ],
    March: [{ Category: 'Travel', Amount: '500' }]
  }),
  { virtual: true }
);

jest.mock('../../config/finance/json-data/ExpensesLink.json', () => [], {
  virtual: true
});

/** Renders the component with controlled filter and viewport state. */
function renderWithFilters(selectedCategory: string, selectedMonth: string, windowWidth: number) {
  (useState as jest.Mock).mockImplementation((initialValue: unknown) => {
    if (initialValue === 'All Categories') return [selectedCategory, jest.fn()];
    if (initialValue === 'All Months') return [selectedMonth, jest.fn()];
    if (initialValue === 0) return [windowWidth, jest.fn()];
    if (initialValue === false) return [true, jest.fn()];

    return [initialValue, jest.fn()];
  });

  return renderToStaticMarkup(<BarChartComponent />);
}

/** Renders the mobile cards with controlled filter state. */
function renderMobile(selectedCategory: string, selectedMonth: string) {
  const markup = renderWithFilters(selectedCategory, selectedMonth, 480);
  const mobileCardsStart = markup.indexOf('<div class="overflow-x-auto">');

  expect(mobileCardsStart).toBeGreaterThanOrEqual(0);

  return markup.slice(mobileCardsStart);
}

/** Renders the desktop chart with controlled filter state. */
function renderDesktop(selectedCategory: string, selectedMonth: string) {
  const markup = renderWithFilters(selectedCategory, selectedMonth, 1024);
  const chartStart = markup.indexOf('<div class="finance-chart');

  expect(chartStart).toBeGreaterThanOrEqual(0);

  return markup;
}

describe('BarChartComponent desktop chart', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('applies the category filter to the total and chart data', () => {
    const markup = renderDesktop('Marketing', 'All Months');

    expect(markup).toContain('$400.00');
    expect(markup).toContain('Marketing: 400');
    expect(markup).not.toContain('Travel:');
    expect(markup).not.toContain('Infrastructure:');
  });

  it('applies the month filter to the total and chart data', () => {
    const markup = renderDesktop('All Categories', 'February');

    expect(markup).toContain('$700.00');
    expect(markup).toContain('Marketing: 300');
    expect(markup).toContain('Infrastructure: 400');
    expect(markup).not.toContain('Travel:');
  });

  it('applies combined category and month filters to the total and chart data', () => {
    const markup = renderDesktop('Infrastructure', 'February');

    expect(markup).toContain('$400.00');
    expect(markup).toContain('Infrastructure: 400');
    expect(markup).not.toContain('Marketing:');
    expect(markup).not.toContain('Travel:');
  });

  it('includes every expense in the total and chart data for the All filters', () => {
    const markup = renderDesktop('All Categories', 'All Months');

    expect(markup).toContain('$1500.00');
    expect(markup).toContain('Marketing: 400');
    expect(markup).toContain('Travel: 700');
    expect(markup).toContain('Infrastructure: 400');
  });
});

describe('BarChartComponent mobile expenses', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('passes category-filtered expenses to the mobile cards', () => {
    const markup = renderMobile('Marketing', 'All Months');

    expect(markup).toContain('January');
    expect(markup).toContain('February');
    expect(markup).not.toContain('March');
    expect(markup).toContain('$100');
    expect(markup).toContain('$300');
    expect(markup).not.toContain('Travel');
    expect(markup).not.toContain('Infrastructure');
  });

  it('passes month-filtered expenses to the mobile cards', () => {
    const markup = renderMobile('All Categories', 'February');

    expect(markup).not.toContain('January');
    expect(markup).toContain('February');
    expect(markup).not.toContain('March');
    expect(markup).toContain('Marketing');
    expect(markup).toContain('Infrastructure');
  });

  it('passes combined category and month filters to the mobile cards', () => {
    const markup = renderMobile('Infrastructure', 'February');

    expect(markup).toContain('February');
    expect(markup).toContain('Infrastructure');
    expect(markup).toContain('$400');
    expect(markup).not.toContain('Marketing');
  });

  it('passes every expense to the mobile cards for the All filters', () => {
    const markup = renderMobile('All Categories', 'All Months');

    expect(markup).toContain('January');
    expect(markup).toContain('February');
    expect(markup).toContain('March');
    expect(markup).toContain('Marketing');
    expect(markup).toContain('Travel');
    expect(markup).toContain('Infrastructure');
    expect(markup).toContain('$100');
    expect(markup).toContain('$500');
  });
});
