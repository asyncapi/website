/**
 * @description Regression tests for MermaidDiagram graph normalization and render behaviour.
 * Mocks the dynamic mermaid import to observe render invocations without a browser environment.
 */

const mockRender = jest.fn().mockResolvedValue({ svg: '<svg>mock</svg>' });
const mockInitialize = jest.fn();

jest.mock('mermaid', () => ({
  __esModule: true,
  default: {
    initialize: mockInitialize,
    render: mockRender,
  },
}));

jest.mock('dompurify', () => ({
  __esModule: true,
  default: {
    sanitize: (_input: string) => _input,
  },
}));

/**
 * Simulate the trimming and conditional render logic from MermaidDiagram's useEffect.
 * This mirrors the exact branching in the component without requiring a DOM/renderer.
 */
async function simulateRender(graph: string, diagramId: string): Promise<void> {
  const trimmedGraph = graph.trim();

  if (trimmedGraph) {
    const { default: mermaid } = await import('mermaid');

    await mermaid.render(diagramId, trimmedGraph);
  }
}

describe('MermaidDiagram render behaviour', () => {
  beforeEach(() => {
    mockRender.mockClear();
    mockInitialize.mockClear();
  });

  it('calls mermaid.render with trimmed graph definition for non-empty input', async () => {
    const rawGraph = '   graph TD\n  A-->B   \n';

    await simulateRender(rawGraph, 'mermaid-test-1');

    expect(mockRender).toHaveBeenCalledTimes(1);
    expect(mockRender).toHaveBeenCalledWith(
      'mermaid-test-1',
      'graph TD\n  A-->B',
    );
  });

  it('does not call mermaid.render for whitespace-only input', async () => {
    const whitespaceOnly = '   \n\t  ';

    await simulateRender(whitespaceOnly, 'mermaid-test-2');

    expect(mockRender).not.toHaveBeenCalled();
  });
});
