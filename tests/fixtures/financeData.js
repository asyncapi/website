module.exports = {
    expensesYaml : 'expenses:\n  - name: Test Expense\n    amount: 100',
    expensesLinkYaml : 'links:\n  - name: Test Link\n    url: http://asyncapi.com',
    expensesJson : { expenses: [{ name: 'Test Expense', amount: 100 }] },
    expensesLinkJson : { links: [{ name: 'Test Link', url: 'http://asyncapi.com' }] }
}