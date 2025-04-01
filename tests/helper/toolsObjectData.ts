import { ToolRepositoryData, ToolFileContent, ExpectedToolObject, MockData, MalformedYAML } from '../../types/tests/helper/tools';

const createToolRepositoryData = ({
  name = '.asyncapi-tool',
  refId = '61855e7365a881e98c2fe667a658a0005753d873',
  owner = 'asyncapi',
  repoName = 'example-repo',
  description = 'Example repository',
  path = '.asyncapi-tool'
}: Partial<ToolRepositoryData> = {}): ToolRepositoryData => ({
  name,
  url: `https://api.github.com/repositories/351453552/contents/${path}?ref=${refId}`,
  repository: {
    full_name: `${owner}/${repoName}`,
    html_url: `https://github.com/${owner}/${repoName}`,
    description,
    owner: { login: owner }
  },
  path
});

const createToolFileContent = ({
  title = 'Example Tool',
  description = 'This is an example tool.',
  repoUrl = null,
  categories = ['Category1'],
  hasCommercial = false,
  additionalLinks = {},
  additionalFilters = {}
}: Partial<ToolFileContent> = {}): ToolFileContent => ({
  title,
  description,
  links: {
    repoUrl: repoUrl || `https://github.com/asyncapi/${encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'))}`,
    ...additionalLinks
  },
  filters: { categories, hasCommercial, ...additionalFilters }
});

const createExpectedToolObject = ({
  title = 'Example Tool',
  description = 'This is an example tool.',
  repoUrl = null,
  categories = ['Category1'],
  hasCommercial = false,
  isAsyncAPIOwner = true,
  additionalLinks = {},
  additionalFilters = {}
}: Partial<ExpectedToolObject> = {}): ExpectedToolObject =>
  createToolFileContent({
    title,
    description,
    repoUrl,
    categories,
    hasCommercial,
    additionalLinks,
    additionalFilters: { isAsyncAPIOwner, ...additionalFilters }
  });

const createMockData = (tools: (string | Partial<ToolRepositoryData>)[] = []): MockData => ({
  items: tools.map((tool) =>
    typeof tool === 'string'
      ? createToolRepositoryData({ name: `.asyncapi-tool-${tool}`, repoName: tool })
      : createToolRepositoryData(tool)
  )
});

const createMalformedYAML = ({
  title = 'Malformed Tool',
  description = 'This tool has malformed YAML.',
  repoUrl = 'https://github.com/asyncapi/malformed-repo'
}: Partial<MalformedYAML> = {}): string => `
  title: ${title}
  description: ${description}
  links:
    repoUrl: ${repoUrl}
  filters:
    categories:
      - Category1
`;

export { createToolFileContent, createExpectedToolObject, createMockData, createMalformedYAML };
