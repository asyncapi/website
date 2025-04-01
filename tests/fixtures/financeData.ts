import { Expense, Link } from '../../types/tests/fixtures/fixtures/tools/finance-data';

export const financeData = {
    expensesYaml: 'expenses:\n  - name: Test Expense\n    amount: 100',
    expensesLinkYaml: 'links:\n  - name: Test Link\n    url: http://asyncapi.com',
    expensesjson: { expenses: [{ name: 'Test Expense', amount: 100 }] as Expense[] },
    expensesLinkjson: { links: [{ name: 'Test Link', url: 'http://asyncapi.com' }] as Link[] }
};
