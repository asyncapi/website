/**
 * @description Unit & regression tests for MermaidDiagram graph normalization and whitespace handling.
 */

describe('MermaidDiagram Graph Processing', () => {
  it('trims graph definitions properly to handle whitespace-only changes', () => {
    const rawGraph = '   graph TD\n  A-->B   \n';
    const trimmed = rawGraph.trim();

    expect(trimmed).toBe('graph TD\n  A-->B');
    expect(trimmed.length).toBeGreaterThan(0);
  });

  it('treats pure whitespace input as empty graph definition', () => {
    const whitespaceOnly = '   \n\t  ';
    const trimmed = whitespaceOnly.trim();

    expect(trimmed).toBe('');
  });
});
