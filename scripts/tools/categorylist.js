// const categoryList = ["generator", "code-first", "converters", "validators", "directories", "documentation generators", "dls", "frameworks", "ui components", "mocking and testing", "diff", "ci&cd", "editors"]

const categoryList = [
    {
        name: "Code-first tools",
        tag: "code first",
        description: "The following is a list of tools that generate AsyncAPI documents from your code."
    },
    {
        name: "Code Generators",
        tag: "code generator",
        description: "The following is a list of tools that generate code from an AsyncAPI document; not the other way around."
    },
    {
        name: "Converters",
        tag: "converter",
        description: "The following is a list of tools that do not yet belong to any specific category but are also useful for the community."
    },
    {
        name: "Directories",
        tag: "directory",
        description: "The following is a list of directories that index public AsyncAPI documents."
    },
    {
        name: "Documentation Generators",
        tag: "documentation generator",
        description: "The following is a list of tools that generate human-readable documentation from an AsyncAPI document."
    },
    {
        name: "UI components",
        tag: "ui component",
        description: "The following is a list of UI components to view AsyncAPI documents."
    },
    {
        name: "DSL",
        tag: "dsl",
        description: "Writing YAML by hand is no fun, and maybe you don't want a GUI, so use a Domain Specific Language to write AsyncAPI in your language of choice."
    },
    {
        name: "Frameworks",
        tag: "framework",
        description: "The following is a list of API/application frameworks that make use of AsyncAPI."
    },
    {
        name: "GitHub Actions",
        tag: "github-actions",
        description: "The following is a list of GitHub Actions that you can use in your workflows"
    },
    {
        name: "Mocking and Testing",
        tag: "mocking and testing",
        description: "The tools below take specification documents as input, then publish fake messages to broker destinations for simulation purposes. They may also check that publisher messages are compliant with schemas."
    },
    {
        name: "Validators",
        tag: "validator",
        description: "The following is a list of tools that validate AsyncAPI documents."
    },
    {
        name: "Compare tools",
        tag: "compare-tool",
        description: "The following is a list of tools that compare AsyncAPI documents."
    },
    {
        name: "Others",
        tag: "other",
        description: "The following is a list of tools that comes under Other category"
    },
]

module.exports = {categoryList}