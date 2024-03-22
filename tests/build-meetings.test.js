// buildMeetings.test.js
const { writeFileSync } = require('fs');
const { google } = require('googleapis');
const { resolve } = require('path');
const { buildMeetings } = require('../scripts/build-meetings');

// Mocking fs.writeFileSync
jest.mock('fs', () => ({
  writeFileSync: jest.fn(),
}));

// Mocking googleapis
jest.mock('googleapis', () => {
  const mockCalendarEventsList = jest.fn();

  return {
    google: {
      auth: {
        GoogleAuth: jest.fn().mockImplementation(() => ({
          
        })),
      },
      calendar: jest.fn().mockImplementation(() => ({
        events: {
          list: mockCalendarEventsList,
        },
      })),
      
    },
    mockCalendarEventsList,
  };
});

describe('buildMeetings', () => {
  it('should fetch events and write them to a file', async () => {
    // Setup
    const mockEvents = [
      {
        summary: 'Meeting 1',
        htmlLink: 'https://meet.google.com/abc',
        extendedProperties: {
          private: {
            ISSUE_ID: '123',
            BANNER: 'banner1.png',
          },
        },
        start: {
          dateTime: new Date().toISOString(),
        },
      },
      
    ];

    // Mocking the response of calendar.events.list
    google.mockCalendarEventsList.mockResolvedValue({
      data: {
        items: mockEvents,
      },
    });

    // Execute
    await buildMeetings();

    // Assert
    expect(google.calendar().events.list).toHaveBeenCalled();
    expect(writeFileSync).toHaveBeenCalledWith(
      expect.any(String), 
      expect.any(String) 
    );
  });
});