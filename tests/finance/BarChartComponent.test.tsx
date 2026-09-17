import { useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import BarChartComponent from '../../components/FinancialSummary/BarChartComponent';

jest.mock('react', () => {
  const actualReact = jest.requireActual('react');

  return { ...actualReact, useState: jest.fn(actualReact.useState) };
});

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

/** Renders the mobile cards with controlled filter state. */
function renderMobile(selectedCategory: string, selectedMonth: string) {
  (useState as jest.Mock).mockImplementation((initialValue: unknown) => {
    if (initialValue === 'All Categories') return [selectedCategory, jest.fn()];
    if (initialValue === 'All Months') return [selectedMonth, jest.fn()];
    if (initialValue === 0) return [480, jest.fn()];
    if (initialValue === false) return [true, jest.fn()];

    return [initialValue, jest.fn()];
  });

  const markup = renderToStaticMarkup(<BarChartComponent />);
  const mobileCardsStart = markup.indexOf('<div class="overflow-x-auto">');

  expect(mobileCardsStart).toBeGreaterThanOrEqual(0);

  return markup.slice(mobileCardsStart);
}

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
