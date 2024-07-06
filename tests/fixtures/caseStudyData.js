module.exports = {
    caseStudyContentyaml: `
id: adeogroup
company:
  name: Adeo Group
  description: Adeo owns different brands in the retail industry focused on home improvement and DIY markets, like Leroy Merlin.
  customers: 500M
  industry: Retail
`,
    caseStudyContentJson: {
        id: 'adeogroup',
        company: {
            name: 'Adeo Group',
            description: 'Adeo owns different brands in the retail industry focused on home improvement and DIY markets, like Leroy Merlin.',
            customers: '500M',
            industry: 'Retail'
        }
    },malformedYaml: `
    title: "This is a malformed YAML"
    description: "This YAML has several errors"
    items:
      - item1: "Valid item"
      - item2: "Item with unclosed quote
      - item3: Item with missing quotes
    number: 42
    boolean: true
    nested:
      key1: value1
        key2: value2
    array:
      - "item1"
      - "item2"
    -   "item3"
    multiline: >
      This is a multiline
      string that is not
    properly closed
    `
}