module.exports = {
    expensesYaml: 'expenses:\n  - name: Test Expense\n    amount: 100',
    expensesLinkYaml: 'links:\n  - name: Test Link\n    url: http://asyncapi.com',
    expensesjson: { expenses: [{ name: 'Test Expense', amount: 100 }] },
    expensesLinkjson: { links: [{ name: 'Test Link', url: 'http://asyncapi.com' }] }
}