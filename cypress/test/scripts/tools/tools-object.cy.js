
import { createToolObject } from "../../../../scripts/tools/tools-object";
import { convertTools } from "../../../../scripts/tools/tools-object";
describe('createToolObject', () => {
  const testToolFile = {
    title: 'Test Tool',
    description: 'This is a test tool',
    links: {
      repoUrl: 'https://github.com/testuser/test-repo'
    },
    filters: {
      hasCommercial: true
    }
  };

  it('should create a tool object with provided data', () => {
    cy.wrap(createToolObject(testToolFile)).then(result => {
      expect(result.title).to.equal(testToolFile.title);
      expect(result.description).to.equal(testToolFile.description);
      expect(result.links.repoUrl).to.equal(testToolFile.links.repoUrl);
      expect(result.filters.hasCommercial).to.equal(testToolFile.filters.hasCommercial);
      expect(result.filters.isAsyncAPIOwner).to.equal('');
    });
  });

  it('should create a tool object with default repo description and repository URL', () => {
    const testToolFileWithoutDescription = {
      title: 'Test Tool 2',
      links: {
        repoUrl: 'https://github.com/testuser/test-repo2'
      },
      filters: {
        hasCommercial: false
      }
    };
    const defaultRepoDescription = 'Default description';
    const defaultRepositoryUrl = 'https://github.com/defaultuser/default-repo';

    cy.wrap(createToolObject(testToolFileWithoutDescription, defaultRepositoryUrl, defaultRepoDescription))
      .then(result => {
        expect(result.title).to.equal(testToolFileWithoutDescription.title);
        expect(result.description).to.equal(defaultRepoDescription);
        expect(result.links.repoUrl).to.equal(testToolFileWithoutDescription.links.repoUrl);
        expect(result.filters.hasCommercial).to.equal(testToolFileWithoutDescription.filters.hasCommercial);
        expect(result.filters.isAsyncAPIOwner).to.equal('');
      });
  });

  it('should create a tool object with default isAsyncAPIOwner value', () => {
    const testToolFileWithoutAsyncAPIOwner = {
      title: 'Test Tool 3',
      description: 'This is another test tool',
      links: {
        repoUrl: 'https://github.com/testuser/test-repo3'
      },
      filters: {
        hasCommercial: true
      }
    };
    const isAsyncAPIrepoValue = true;

    cy.wrap(createToolObject(testToolFileWithoutAsyncAPIOwner, '', '', isAsyncAPIrepoValue))
      .then(result => {
        expect(result.title).to.equal(testToolFileWithoutAsyncAPIOwner.title);
        expect(result.description).to.equal(testToolFileWithoutAsyncAPIOwner.description);
        expect(result.links.repoUrl).to.equal(testToolFileWithoutAsyncAPIOwner.links.repoUrl);
        expect(result.filters.hasCommercial).to.equal(testToolFileWithoutAsyncAPIOwner.filters.hasCommercial);
        expect(result.filters.isAsyncAPIOwner).to.equal(isAsyncAPIrepoValue);
      });
  });
});

describe('convertTools function', () => {
  it('should process tools data correctly', () => {
    const mockData = {
      items: [
        {
          name: '.asyncapi-tool',
          url: 'https://api.github.com/repositories/123/contents/.asyncapi-tool?ref=12345',
          repository: {
            full_name: 'mock-user/mock-repo',
            html_url: 'https://github.com/mock-user/mock-repo',
            owner: {
              login: 'asyncapi'
            },
            description: 'Mock Tool Repository 1'
          },
          path: 'tool1.json'
        },
      ]
    };

    // Intercept the axios.get call for each tool and respond with tool data
    for (const tool of mockData.items) {
      const reference_id = tool.url.split("=")[1];
      const download_url = `https://raw.githubusercontent.com/${ tool.repository.full_name }/${ reference_id }/${ tool.path }`;

      cy.intercept('GET', download_url, {
        statusCode: 200,
        body: mockData, // Replace with your desired tool file content
      }).as('getToolContent');
    }
    // Call the function directly with the mocked data
    convertTools(mockData).then((finalToolsObject) => {
      expect(finalToolsObject).to.exist;
    });
  });
});






