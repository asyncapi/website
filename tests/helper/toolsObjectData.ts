import type { Category } from '@/types/scripts/tools';

const createToolRepositoryData = ({
  name = '.asyncapi-tool',
  refId = '61855e7365a881e98c2fe667a658a0005753d873',
  owner = 'asyncapi',
  repoName = 'example-repo',
  description = 'Example repository',
  path = '.asyncapi-tool'
} = {}) => ({
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
  categories = ['Category1' as unknown as Category],
  hasCommercial = false,
  additionalLinks = {},
  additionalFilters = {}
} = {}) => ({
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
  categories = ['Category1' as unknown as Category],
  hasCommercial = false,
  isAsyncAPIOwner = true,
  additionalLinks = {},
  additionalFilters = {}
} = {}) =>
  createToolFileContent({
    title,
    description,
    repoUrl,
    categories,
    hasCommercial,
    additionalLinks,
    additionalFilters: { isAsyncAPIOwner, ...additionalFilters }
  });

type ToolRepositoryDataParams = {
  name?: string;
  refId?: string;
  owner?: string;
  repoName?: string;
  description?: string;
  path?: string;
};

const createMockData = (tools: (string | ToolRepositoryDataParams)[] = []) =>
  tools.map((tool) =>
    typeof tool === 'string'
      ? createToolRepositoryData({ name: `.asyncapi-tool-${tool}`, repoName: tool })
      : createToolRepositoryData(tool)
  );

const createMalformedYAML = ({
  title = 'Malformed Tool',
  description = 'This tool has malformed YAML.',
  repoUrl = 'https://github.com/asyncapi/malformed-repo'
} = {}) => `
  title: ${title}
  description: ${description}
  links:
    repoUrl: ${repoUrl}
  filters:
    categories:
      - Category1
`;

export { createExpectedToolObject, createMalformedYAML, createMockData, createToolFileContent };
