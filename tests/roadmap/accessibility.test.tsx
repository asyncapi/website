import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import RoadmapItem from '../../components/roadmap/RoadmapItem';
import RoadmapPill from '../../components/roadmap/RoadmapPill';

describe('roadmap accessibility', () => {
  test('renders description-only roadmap pills as accessible buttons', () => {
    const markup = renderToStaticMarkup(
      <RoadmapPill
        item={{
          title: 'Accessible roadmap item',
          description: 'Extra details'
        }}
      />
    );

    expect(markup).toContain('<button');
    expect(markup).toContain('type="button"');
    expect(markup).toContain('aria-label="Open details for Accessible roadmap item"');
    expect(markup).toContain('aria-haspopup="dialog"');
    expect(markup).toContain('focus-visible:ring-2');
    expect(markup).not.toContain('<a');
  });

  test('connects collapsible roadmap items to controlled content', () => {
    const markup = renderToStaticMarkup(
      <RoadmapItem
        item={{
          title: 'Expandable roadmap item',
          solutions: [{ title: 'Nested solution' }]
        }}
        colorClass='bg-blue-400'
      />
    );

    const controlsMatch = markup.match(/aria-controls="([^"]+)"/);

    expect(controlsMatch).not.toBeNull();
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain(`id="${controlsMatch?.[1]}"`);
    expect(markup).toContain('aria-label="Expand Expandable roadmap item"');
    expect(markup).toContain('hidden=""');
  });

  test('marks collapsible roadmap items as expanded when children are visible', () => {
    const markup = renderToStaticMarkup(
      <RoadmapItem
        item={{
          title: 'Expanded roadmap item',
          solutions: [{ title: 'Visible child' }]
        }}
        colorClass='bg-blue-400'
        collapsed={false}
      />
    );

    expect(markup).toContain('aria-expanded="true"');
    expect(markup).toContain('aria-label="Collapse Expanded roadmap item"');
    expect(markup).toContain('Visible child');
  });
});
