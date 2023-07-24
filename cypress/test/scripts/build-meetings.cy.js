import { buildMeetings } from '../../../scripts/build-meetings'
const stubbedEvents = {
  data: {
    items: [
      {
        summary: 'Test Event 1',
        htmlLink: 'https://example.com/event1',
        extendedProperties: {
          private: {
            ISSUE_ID: 1,
            BANNER: 'https://example.com/banner1.jpg',
          },
        },
        start: {
          dateTime: new Date().toISOString(),
        },
      },
      {
        summary: 'Test Event 2',
        htmlLink: 'https://example.com/event2',
        extendedProperties: {
          private: {
            ISSUE_ID: 2,
            BANNER: 'https://example.com/banner2.jpg',
          },
        },
        start: {
          dateTime: new Date().toISOString(),
        },
      },

    ],
  },
};

describe('Build Meetings', () => {
  // Stub the Google Calendar API before running the tests
  before(() => {
    cy.intercept(
      {
        method: 'GET',
        url: 'https://www.googleapis.com/calendar/v3/calendars/YOUR_CALENDAR_ID/events*',
      },
      stubbedEvents
    ).as('getEvents');
  });

  it('fetches and saves meetings', () => {
    // Manually trigger the function
    buildMeetings().then(() => {
      // Once the function is complete, the data should be saved in the specified file
      // Assuming the function saves the data in the JSON file as specified in the original function
      cy.readFile('../config/meetings.json').then((eventsForHuman) => {
        expect(eventsForHuman).to.exist;
        // Add more assertions based on the eventsForHuman structure if needed
        // For example, check the length, title, calLink, etc.
      });
    });
  });
});
