import { mount } from '@cypress/react';

import {
  getStaticPropsHelper,
  getStaticPathsHelper,
  getEvents,
} from '../../../lib/staticHelpers';

describe('getEvents', () => {
    it('should return sorted events', () => {
      const events = [
        { date: '2023-07-10' },
        { date: '2023-07-08' },
        { date: '2023-07-09' },
      ];
  
      const sortedEvents = getEvents(events);
  
      // Convert dates to JavaScript Date objects for comparison
      const sortedDates = sortedEvents.map((event) => event.date.toDate());
  
      // Assert that the dates are sorted in descending order
      for (let i = 0; i < sortedDates.length - 1; i++) {
        expect(sortedDates[i]).to.be.greaterThan(sortedDates[i + 1]);
      }
    });
  });
  