import { mkdirSync, readFileSync, rmSync } from 'fs';
import { google } from 'googleapis';
import path from 'path';

import { buildMeetings } from '../scripts/build-meetings';
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

  afterEach(() => {
    rmSync(testDir, { recursive: true, force: true });
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

    try {
      await buildMeetings(outputFilePath);
    } catch (err) {
      if (err instanceof Error) {
        expect(err.message).toContain('Google API error');
      } else {
        throw new Error('Unexpected error type');
      }
    }
  });

  it('should throw an error if authentication fails', async () => {
    mockGoogleAuth.mockImplementation(() => {
      throw new Error('Authentication failed');
    });

    try {
      await buildMeetings(outputFilePath);
    } catch (err) {
      if (err instanceof Error) {
        expect(err.message).toContain('Authentication failed');
      }
    }
  });

  it('should handle file write errors', async () => {
    mockGoogleAuth.mockImplementation(() => ({
      getClient: jest.fn()
    }));

    mockCalendar.mockResolvedValue({ data: { items: mockEvents } });

    const invalidPath = '/root/invalid_dir/meetings.json';

    try {
      await buildMeetings(invalidPath);
    } catch (err) {
      if (err instanceof Error) {
        expect(err.message).toMatch(/ENOENT|EACCES/);
      } else {
        throw new Error('Unexpected error type');
      }
    }
  });

  it('should throw an error if the data structure received from Google Calendar API is invalid', async () => {
    mockCalendar.mockResolvedValueOnce({
      data: {
        items: null // or {} or any non-array value to trigger the error
      }
    });

    await expect(buildMeetings('/path/to/write')).rejects.toThrow(
      'Invalid data structure received from Google Calendar API'
    );
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

    await expect(buildMeetings('/path/to/write')).rejects.toThrow('start.dateTime is missing in the event');
  });

  it('should throw an error if CALENDAR_SERVICE_ACCOUNT is not set', async () => {
    // Temporarily remove the environment variable
    const originalServiceAccount = process.env.CALENDAR_SERVICE_ACCOUNT;

    delete process.env.CALENDAR_SERVICE_ACCOUNT;

    try {
      await expect(buildMeetings(outputFilePath)).rejects.toThrow(
        'CALENDAR_SERVICE_ACCOUNT environment variable is not set'
      );
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
      await expect(buildMeetings(outputFilePath)).rejects.toThrow('CALENDAR_ID environment variable is not set');
    } finally {
      // Restore the environment variable for other tests
      process.env.CALENDAR_ID = originalCalendarId;
    }
  });
});
