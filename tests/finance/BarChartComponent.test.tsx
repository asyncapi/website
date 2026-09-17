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

describe('BarChartComponent filter boundaries', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    {
      name: 'category',
      category: 'Marketing',
      month: 'All Months',
      desktopIncluded: ['$400.00', 'Marketing: 400'],
      desktopExcluded: ['Travel:', 'Infrastructure:'],
      mobileIncluded: ['January', 'February', '$100', '$300'],
      mobileExcluded: ['March', 'Travel', 'Infrastructure']
    },
    {
      name: 'month',
      category: 'All Categories',
      month: 'February',
      desktopIncluded: ['$700.00', 'Marketing: 300', 'Infrastructure: 400'],
      desktopExcluded: ['Travel:'],
      mobileIncluded: ['February', 'Marketing', 'Infrastructure'],
      mobileExcluded: ['January', 'March']
    },
    {
      name: 'combined category and month',
      category: 'Infrastructure',
      month: 'February',
      desktopIncluded: ['$400.00', 'Infrastructure: 400'],
      desktopExcluded: ['Marketing:', 'Travel:'],
      mobileIncluded: ['February', 'Infrastructure', '$400'],
      mobileExcluded: ['Marketing']
    },
    {
      name: 'All',
      category: 'All Categories',
      month: 'All Months',
      desktopIncluded: ['$1500.00', 'Marketing: 400', 'Travel: 700', 'Infrastructure: 400'],
      desktopExcluded: [],
      mobileIncluded: ['January', 'February', 'March', 'Marketing', 'Travel', 'Infrastructure', '$100', '$500'],
      mobileExcluded: []
    }
  ])(
    'applies $name filters to both desktop and mobile output',
    ({ category, month, desktopIncluded, desktopExcluded, mobileIncluded, mobileExcluded }) => {
      const desktopMarkup = renderDesktop(category, month);
      const mobileMarkup = renderMobile(category, month);

      desktopIncluded.forEach((value) => expect(desktopMarkup).toContain(value));
      desktopExcluded.forEach((value) => expect(desktopMarkup).not.toContain(value));
      mobileIncluded.forEach((value) => expect(mobileMarkup).toContain(value));
      mobileExcluded.forEach((value) => expect(mobileMarkup).not.toContain(value));
    }
  );
});
