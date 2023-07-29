import { getFinalTool } from "../../../../scripts/tools/combine-tools";
import {combineTools} from "../../../../scripts/tools/combine-tools";

describe('getFinalTool function', () => {
    it('should update the toolObject with language and technology tags if they exist', () => {
        // Sample tool object with filters for language and technology
        const toolObject = {
            name: 'Sample Tool',
            filters: {
                language: 'JavaScript', // You can also test with an array of languages here
                technology: ['React', 'Cypress'], // Cypress doesn't exist in the initial list
            },
        };

        cy.wrap(toolObject).then(async (tool) => {
            const finalTool = await getFinalTool(tool);

            // Assert that the language tags have been added
            expect(finalTool.filters.language).to.have.length.greaterThan(0);

            // Assert that the technology tags have been added
            expect(finalTool.filters.technology).to.have.length.greaterThan(0);

            // Assert that the technology tags contain the 'Cypress' tag
            expect(finalTool.filters.technology.some((tech) => tech.name === 'Cypress')).to.be.true;
        });
    });

    it('should add a new language tag if it does not exist in the languageList', () => {
        const toolObject = {
            name: 'Another Sample Tool',
            filters: {
                language: 'TypeScript', // TypeScript does not exist in the initial list
            },
        };

        cy.wrap(toolObject).then(async (tool) => {
            const finalTool = await getFinalTool(tool);

            // Assert that the language tags have been added
            expect(finalTool.filters.language).to.have.length.greaterThan(0);

            // Assert that the language tags contain the 'TypeScript' tag
            expect(finalTool.filters.language.some((lang) => lang.name === 'TypeScript')).to.be.true;

            finalTool.filters.language.forEach((lang) => {
                if (lang.name === 'TypeScript') {
                    expect(lang).to.have.property('color', 'bg-[#7DBCFE]');
                    expect(lang).to.have.property('borderColor', 'border-[#2C78C7]');
                }
            });
        });
    });

    it('should add a new technology tag if it does not exist in the technologyList', () => {
        const toolObject = {
            name: 'Yet Another Sample Tool',
            filters: {
                technology: 'React JS', // React JS does not exist in the initial list
            },
        };

        cy.wrap(toolObject).then(async (tool) => {
            const finalTool = await getFinalTool(tool);

            // Assert that the technology tags have been added
            expect(finalTool.filters.technology).to.have.length.greaterThan(0);

            finalTool.filters.technology.forEach((tech) => {
                if (tech.name === 'React JS') {
                    expect(tech).to.have.property('color', 'bg-[#9FECFA]');
                    expect(tech).to.have.property('borderColor', 'border-[#08D8FE]');
                }
            });


        });
    });
});
describe('getFinalTool function', () => {
    it('should update the toolObject with language and technology tags if they exist', () => {
        const automatedTools = {
            "APIs": {
                "description": "The following is a list of APIs that expose functionality related to AsyncAPI.",
                "toolsList": [
                  {
                    "title": "AsyncAPI Server API",
                    "description": "Server API providing official AsyncAPI tools",
                    "links": {
                      "websiteUrl": "https://api.asyncapi.com/v1",
                      "docsUrl": "https://api.asyncapi.com/v1/docs",
                      "repoUrl": "https://github.com/asyncapi/server-api"
                    },
                    "filters": {
                      "technology": [
                        "Node.js",
                        "TypeScript"
                      ],
                      "categories": [
                        "api"
                      ],
                      "hasCommercial": false,
                      "isAsyncAPIOwner": true
                    }
                  },
                  {
                    "title": "SIO-AsyncAPI",
                    "description": "This is code-first approach to generate AsyncAPI specification from Socket.IO server.",
                    "links": {
                      "websiteUrl": "https://github.com/daler-rahimov/sio-asyncapi",
                      "docsUrl": "https://github.com/daler-rahimov/sio-asyncapi",
                      "repoUrl": "https://github.com/daler-rahimov/sio-asyncapi"
                    },
                    "filters": {
                      "language": "Python",
                      "technology": [
                        "Socket.IO",
                        "Flask"
                      ],
                      "categories": [
                        "code-first",
                        "api"
                      ],
                      "hasCommercial": false,
                      "isAsyncAPIOwner": false
                    }
                  }
                ]
              },
        };
        
          
          const manualTools = {
            "APIs": {
                "description": "The following is a list of APIs that expose functionality related to AsyncAPI.",
                "toolsList": [
                    {
                        "title": "AsyncAPI-Directory by APIs.guru",
                        "description": "Directory of asynchronous API specifications in AsyncAPI format.",
                        "links": {
                            "websiteUrl": "https://apis.guru/asyncapi-directory/",
                            "repoUrl": "https://github.com/APIs-guru/asyncapi-directory"
                        },
                        "filters": {
                            "language": "JavaScript",
                            "technology": ["Node.js", "Liquid"],
                            "categories": ["api", "directory"]
                        }
                    },
                    {
                        "title": "API Tracker - AsyncAPI specs",
                        "description": "Explore APIs and companies with public AsyncAPI specifications.",
                        "links": {
                            "websiteUrl": "https://apitracker.io/specifications/asyncapi"
                        },
                        "filters": {
                            "categories": ["api", "directory"]
                        }
                    }
                ]
            },
          };
          combineTools(automatedTools,manualTools).then((finalTools) => {
            expect(finalTools).to.exist;
          });
    });

});
