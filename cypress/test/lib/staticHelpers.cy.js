import { mount } from '@cypress/react';

import {
  getStaticPropsHelper,
  getStaticPathsHelper,
  getEvents,
} from '../../../lib/staticHelpers';

describe('getEvents', () => {
  it('should return sorted events in ascending order', () => {
    const events = [
      { date: '2023-07-10' },
      { date: '2023-07-08' },
      { date: '2023-07-09' },
    ];

    cy.wrap(events).as('events'); // Preserve events for further assertions

    // Call the getEvents function
    cy.get('@events').then((events) => {
      const sortedEvents = getEvents(events);

      // Check if the result is an array
      expect(sortedEvents).to.be.an('array');

      // Convert dates to timestamps for comparison
      const sortedTimestamps = sortedEvents.map((event) => event.date.valueOf());

      // Check if the timestamps are sorted in ascending order
      for (let i = 0; i < sortedTimestamps.length - 1; i++) {
        expect(sortedTimestamps[i]).to.be.greaterThan(sortedTimestamps[i + 1]);
      }
    });
  });
});

describe('getStaticPropsHelper', () => {
  it('should return the expected props', () => {
    // Mock the necessary functions
    const getSectionItemsStub = cy.stub().returns([{ title: 'Section Item' }]);
    const getPostBySlugStub = cy.stub().returns({
      title: 'Test Post',
      date: '2023-07-12',
      slug: 'test-post',
      fullSlug: '/test-post',
      author: 'John Doe',
      content: 'Lorem ipsum dolor sit amet',
      ogImage: 'og-image.jpg',
      coverImage: 'cover-image.jpg',
    });

    // Call the getStaticProps function
    const getStaticProps = getStaticPropsHelper('/test-path');
    return getStaticProps({ params: { slug: 'test-slug' } }).then((props) => {
      // Assert the returned props
      expect(props.post.title).to.equal('Test Post');
      expect(props.post.content).to.equal('Lorem ipsum dolor sit amet');
      expect(props.navItems).to.deep.equal([
        {
          title: 'Getting started',
          slug: 'docs/getting-started',
          items: [{ title: 'Section Item' }],
        },
        {
          title: 'Tutorials',
          slug: 'docs/tutorials',
          items: [{ title: 'Section Item' }],
        },
      ]);

      // Assert the stubbed function calls
      expect(getSectionItemsStub).to.be.calledWith('docs/getting-started');
      expect(getPostBySlugStub).to.be.calledWith(
        '/test-path',
        'test-slug',
        [
          'title',
          'date',
          'slug',
          'fullSlug',
          'author',
          'content',
          'ogImage',
          'coverImage',
        ]
      );
    });
  });
});