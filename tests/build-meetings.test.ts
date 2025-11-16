import { mkdirSync, promises as fs, readFileSync } from 'fs';
import { google } from 'googleapis';
import path from 'path';

import { buildMeetings } from '../scripts/build-meetings';
import { CustomError } from '../types/errors/CustomError';
import { expectedContent, mockEvents } from './fixtures/meetingsData';

jest.mock('googleapis', () => {
  const events = {
    list: jest.fn()
  };
  const calendar = {
    events
  };
  const mockGoogle = {
    calendar: jest.fn(() => calendar),
    auth: {
      GoogleAuth: jest.fn(() => ({
        getClient: jest.fn()
      }))
    }
  };

  return { google: mockGoogle };
});

describe('buildMeetings', () => {
  const testDir = path.join(__dirname, 'testCache');
  const outputFilePath = path.join(testDir, 'meetings.json');
  const mockCalendar = google.calendar('v3').events.list as jest.Mock;
  const mockGoogleAuth = google.auth.GoogleAuth as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.CALENDAR_SERVICE_ACCOUNT = JSON.stringify({ key: 'test_key' });
    process.env.CALENDAR_ID = 'test_calendar_id';

    mkdirSync(testDir, { recursive: true });
  });

  afterEach(async () => {
    try {
      await fs.rm(testDir, { recursive: true, force: true });
    } catch (error) {
      // Ignore errors if directory doesn't exist or is locked
      // This can happen on Windows due to file handle delays
    }
  });

  it('should fetch events, process them, and write to a file', async () => {
    mockCalendar.mockResolvedValue({ data: { items: mockEvents } });

    await buildMeetings(outputFilePath);

    expect(google.auth.GoogleAuth).toHaveBeenCalledWith({
      scopes: ['https://www.googleapis.com/auth/calendar'],
      credentials: { key: 'test_key' }
    });
    expect(google.calendar).toHaveBeenCalled();
    expect(google.calendar('v3').events.list).toHaveBeenCalledWith({
      calendarId: 'test_calendar_id',
      timeMax: expect.any(String),
      timeMin: expect.any(String)
    });

    const fileContent = readFileSync(outputFilePath, 'utf8');
    const parsedContent = JSON.parse(fileContent);

    expect(parsedContent).toEqual(expectedContent);
  });

  it('should throw an error if the Google API call fails', async () => {
    mockCalendar.mockRejectedValue(new Error('Google API error'));

    await expect(buildMeetings(outputFilePath)).rejects.toThrow(CustomError);
  });

  it('should throw an error if authentication fails', async () => {
    mockGoogleAuth.mockImplementation(() => {
      throw new Error('Authentication failed');
    });

    await expect(buildMeetings(outputFilePath)).rejects.toThrow(CustomError);
  });

  it('should handle file write errors', async () => {
    mockGoogleAuth.mockImplementation(() => ({
      getClient: jest.fn()
    }));

    mockCalendar.mockResolvedValue({ data: { items: mockEvents } });

    const invalidPath = '/root/invalid_dir/meetings.json';

    await expect(buildMeetings(invalidPath)).rejects.toThrow(CustomError);
  });

  it('should throw an error if the data structure received from Google Calendar API is invalid', async () => {
    mockCalendar.mockResolvedValueOnce({
      data: {
        items: null // or {} or any non-array value to trigger the error
      }
    });

    await expect(buildMeetings('/path/to/write')).rejects.toThrow(CustomError);
  });

  it('should throw an error if start.dateTime is missing in the event', async () => {
    mockCalendar.mockResolvedValueOnce({
      data: {
        items: [
          {
            summary: 'Test Event',
            htmlLink: 'http://example.com/event',
            // start.dateTime is intentionally missing to trigger the error
            start: {}
          }
        ]
      }
    });

    await expect(buildMeetings('/path/to/write')).rejects.toThrow(CustomError);
  });

  it('should throw an error if start.dateTime is missing and summary is falsy', async () => {
    mockCalendar.mockResolvedValueOnce({
      data: {
        items: [
          {
            summary: null, // falsy summary to test the || 'Unknown event' branch
            htmlLink: 'http://example.com/event',
            // start.dateTime is intentionally missing to trigger the error
            start: {}
          }
        ]
      }
    });

    await expect(buildMeetings('/path/to/write')).rejects.toThrow(CustomError);
  });

  it('should throw an error if CALENDAR_SERVICE_ACCOUNT is not set', async () => {
    // Temporarily remove the environment variable
    const originalServiceAccount = process.env.CALENDAR_SERVICE_ACCOUNT;

    delete process.env.CALENDAR_SERVICE_ACCOUNT;

    try {
      await expect(buildMeetings(outputFilePath)).rejects.toThrow(CustomError);
    } finally {
      // Restore the environment variable for other tests
      process.env.CALENDAR_SERVICE_ACCOUNT = originalServiceAccount;
    }
  });

  it('should throw an error if CALENDAR_ID is not set', async () => {
    // Temporarily remove the environment variable
    const originalCalendarId = process.env.CALENDAR_ID;

    delete process.env.CALENDAR_ID;

    try {
      await expect(buildMeetings(outputFilePath)).rejects.toThrow(CustomError);
    } finally {
      // Restore the environment variable for other tests
      process.env.CALENDAR_ID = originalCalendarId;
    }
  });

  it('should handle events without extendedProperties', async () => {
    const mockEventsWithoutExtended = [
      {
        summary: 'Simple Meeting',
        htmlLink: 'https://www.google.com/calendar/event?eid=simple',
        start: { dateTime: '2024-02-20T16:00:00.000Z' }
        // No extendedProperties
      }
    ];

    mockCalendar.mockResolvedValue({ data: { items: mockEventsWithoutExtended } });

    await buildMeetings(outputFilePath);

    const fileContent = readFileSync(outputFilePath, 'utf8');
    const parsedContent = JSON.parse(fileContent);

    expect(parsedContent).toEqual([
      {
        title: 'Simple Meeting',
        calLink: 'https://www.google.com/calendar/event?eid=simple',
        url: null,
        banner: null,
        date: '2024-02-20T16:00:00.000Z'
      }
    ]);
  });

  it('should handle events with extendedProperties but missing ISSUE_ID or BANNER', async () => {
    const mockEventsWithPartialExtended = [
      {
        summary: 'Partial Extended Meeting',
        htmlLink: 'https://www.google.com/calendar/event?eid=partial',
        start: { dateTime: '2024-02-20T16:00:00.000Z' },
        extendedProperties: {
          private: {
            // ISSUE_ID is missing, BANNER is missing
          }
        }
      }
    ];

    mockCalendar.mockResolvedValue({ data: { items: mockEventsWithPartialExtended } });

    await buildMeetings(outputFilePath);

    const fileContent = readFileSync(outputFilePath, 'utf8');
    const parsedContent = JSON.parse(fileContent);

    expect(parsedContent).toEqual([
      {
        title: 'Partial Extended Meeting',
        calLink: 'https://www.google.com/calendar/event?eid=partial',
        url: null, // Should be null when ISSUE_ID is missing
        banner: null, // Should be null when BANNER is missing
        date: '2024-02-20T16:00:00.000Z'
      }
    ]);
  });

  it('should handle events with null or undefined extendedProperties.private', async () => {
    const mockEventsWithNullPrivate = [
      {
        summary: 'Meeting Without Private Properties',
        htmlLink: 'https://www.google.com/calendar/event?eid=no-private',
        start: { dateTime: '2024-02-20T16:00:00.000Z' },
        extendedProperties: {
          private: null
        }
      }
    ];

    mockCalendar.mockResolvedValue({ data: { items: mockEventsWithNullPrivate } });

    await buildMeetings(outputFilePath);

    const fileContent = readFileSync(outputFilePath, 'utf8');
    const parsedContent = JSON.parse(fileContent);

    expect(parsedContent).toEqual([
      {
        title: 'Meeting Without Private Properties',
        calLink: 'https://www.google.com/calendar/event?eid=no-private',
        url: null,
        banner: null,
        date: '2024-02-20T16:00:00.000Z'
      }
    ]);
  });

  it('should handle events with extendedProperties.private containing falsy ISSUE_ID', async () => {
    const mockEventsWithFalsyIssueId = [
      {
        summary: 'Meeting With Falsy Issue ID',
        htmlLink: 'https://www.google.com/calendar/event?eid=falsy-issue',
        start: { dateTime: '2024-02-20T16:00:00.000Z' },
        extendedProperties: {
          private: {
            ISSUE_ID: '', // falsy but private object exists
            BANNER: 'https://example.com/banner.jpg'
          }
        }
      }
    ];

    mockCalendar.mockResolvedValue({ data: { items: mockEventsWithFalsyIssueId } });

    await buildMeetings(outputFilePath);

    const fileContent = readFileSync(outputFilePath, 'utf8');
    const parsedContent = JSON.parse(fileContent);

    expect(parsedContent).toEqual([
      {
        title: 'Meeting With Falsy Issue ID',
        calLink: 'https://www.google.com/calendar/event?eid=falsy-issue',
        url: null, // Should be null when ISSUE_ID is empty string
        banner: 'https://example.com/banner.jpg',
        date: '2024-02-20T16:00:00.000Z'
      }
    ]);
  });

  it('should handle events with extendedProperties.private containing falsy BANNER', async () => {
    const mockEventsWithFalsyBanner = [
      {
        summary: 'Meeting With Falsy Banner',
        htmlLink: 'https://www.google.com/calendar/event?eid=falsy-banner',
        start: { dateTime: '2024-02-20T16:00:00.000Z' },
        extendedProperties: {
          private: {
            ISSUE_ID: '456',
            BANNER: '' // falsy but private object exists
          }
        }
      }
    ];

    mockCalendar.mockResolvedValue({ data: { items: mockEventsWithFalsyBanner } });

    await buildMeetings(outputFilePath);

    const fileContent = readFileSync(outputFilePath, 'utf8');
    const parsedContent = JSON.parse(fileContent);

    expect(parsedContent).toEqual([
      {
        title: 'Meeting With Falsy Banner',
        calLink: 'https://www.google.com/calendar/event?eid=falsy-banner',
        url: 'https://github.com/asyncapi/community/issues/456',
        banner: null, // Should be null when BANNER is empty string (due to || null)
        date: '2024-02-20T16:00:00.000Z'
      }
    ]);
  });
});
