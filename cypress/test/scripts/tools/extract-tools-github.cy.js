import { getData } from "../../../../scripts/tools/extract-tools-github";
describe('Get Data', () => {
    // eslint-disable-next-line cypress/no-async-tests
    it('fetches AsyncAPI tools from Github', async () => {
        // Define the data that the API should return (stubbed response) // this is mock data from tools.schema{}
        const stubbedResponse = {
            "filters": {
                "type": "object",
                "additionalProperties": false,
                "required": [
                    "categories"
                ],
                "properties": {
                    "language": {
                        "description": "The language referred to is the runtime language selected by the user, not the generator or library language. For example, the Generator written in JavaScript generates Python code from the JavaScript template and the result of generation is a Python app, so the language for Generator is specified as Python. But for the Bundler library, users need to know if it can be integrated into their TypeScript codebase, so its language is specified as TypeScript. If some language in the schema's enum is omitted, it can be added through a pull request to the AsyncAPI website repository.",
                        "anyOf": [
                            {
                                "type": "string",
                                "anyOf": [
                                    {
                                        "type": "string",
                                        "enum": [
                                            "Go",
                                            "Java",
                                            "JavaScript",
                                            "HTML",
                                            "C/C++",
                                            "C#",
                                            "Python",
                                            "TypeScript",
                                            "Kotlin",
                                            "Scala",
                                            "Markdown",
                                            "YAML",
                                            "R",
                                            "Rubby",
                                            "Rust",
                                            "Shell",
                                            "Groovy"
                                        ]
                                    },
                                    {
                                        "type": "string"
                                    }
                                ]
                            },
                            {
                                "type": "array",
                                "items": {
                                    "type": "string",
                                    "anyOf": [
                                        {
                                            "type": "string",
                                            "enum": [
                                                "Go",
                                                "Java",
                                                "JavaScript",
                                                "HTML",
                                                "C/C++",
                                                "C#",
                                                "Python",
                                                "TypeScript",
                                                "Kotlin",
                                                "Scala",
                                                "Markdown",
                                                "YAML",
                                                "R",
                                                "Rubby",
                                                "Rust",
                                                "Shell",
                                                "Groovy"
                                            ]
                                        },
                                        {
                                            "type": "string"
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    "technology": {
                        "type": "array",
                        "description": "Provide a list of different technologies used in the tool. Put details useful for tool user and tool contributor.",
                        "items": {
                            "type": "string",
                            "anyOf": [
                                {
                                    "type": "string",
                                    "enum": [
                                        "Node js",
                                        "Hermes",
                                        "React JS",
                                        ".NET",
                                        "ASP.NET",
                                        "Springboot",
                                        "AWS",
                                        "Docker",
                                        "Node-red",
                                        "Maven",
                                        "Saas",
                                        "Kubernetes-native",
                                        "Scala",
                                        "Azure",
                                        "Jenkins",
                                        "Flask"
                                    ]
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "examples": [
                            "Express.js",
                            "Kafka"
                        ]
                    },
                    "categories": {
                        "type": "array",
                        "description": "Categories are used to group tools by different use case, like documentation or code generation. If have a list of fixed categories. If you use different one that your tool lands under \"other\" category. Feel free to add your category through a pull request to AsyncAPI website repository.",
                        "items": {
                            "type": "string",
                            "anyOf": [
                                {
                                    "type": "string",
                                    "enum": [
                                        "api",
                                        "code-first",
                                        "code-generator",
                                        "converter",
                                        "directory",
                                        "documentation-generator",
                                        "editor",
                                        "ui-component",
                                        "dsl",
                                        "framework",
                                        "github-action",
                                        "mocking-and-testing",
                                        "validator",
                                        "compare-tool",
                                        "other",
                                        "cli",
                                        "bundler",
                                        "ide-extension"
                                    ]
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "minItems": 1,
                        "examples": [
                            "api",
                            "code-first",
                            "code-generator",
                            "converter",
                            "directory",
                            "documentation-generator",
                            "editor",
                            "ui-component",
                            "dsl",
                            "framework",
                            "github-action",
                            "mocking-and-testing",
                            "validator",
                            "compare-tool",
                            "other",
                            "cli",
                            "bundler",
                            "ide-extension"
                        ]
                    },
                    "hasCommercial": {
                        "type": "boolean",
                        "description": "Indicate if your tool is open source or commercial offering, like SAAS for example",
                        "default": false
                    }
                }
            }
        };

        // Intercept the API request and stub the response
        cy.intercept('GET', 'https://api.github.com/search/code?q=filename:.asyncapi-tool*', {
            statusCode: 200,
            body: stubbedResponse,
            headers: {
                accept: 'application/vnd.github.text-match+json',
                authorization: `token *`,
            },
        }).as('getData');

        // Manually trigger the function
        await getData().then((response) => {
            expect(response).to.exist;
        });
    });
});