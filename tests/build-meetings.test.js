const { google } = require('googleapis');
const path = require("path")
const { readFileSync, mkdirSync, rmSync } = require('fs');
const { buildMeetings } = require('../scripts/build-meetings');
const { mockEvents } = require('../tests/fixtures/meetingsData')

jest.mock('googleapis', () => {
    const events = {
        list: jest.fn(),
    };
    const calendar = {
        events,
    };
    const google = {
        calendar: jest.fn(() => calendar),
        auth: {
            GoogleAuth: jest.fn(() => ({
                getClient: jest.fn(),
            })),
        },
    };
    return { google };
});

describe('buildMeetings', () => {
    const originalEnv = process.env;
    const testDir = path.join(__dirname, 'test_output');

    beforeEach(() => {
        jest.clearAllMocks();
        process.env = { ...originalEnv };
        process.env.CALENDAR_SERVICE_ACCOUNT = JSON.stringify({ key: 'test_key' });
        process.env.CALENDAR_ID = 'test_calendar_id';

        mkdirSync(testDir, { recursive: true });
    });

    afterEach(() => {
        process.env = originalEnv;

        rmSync(testDir, { recursive: true, force: true });
    });

    it('should fetch events, process them, and write to a file', async () => {

        google.calendar().events.list.mockResolvedValue({ data: { items: mockEvents } });

        const outputFilePath = path.join(testDir, 'meetings.json');
        await buildMeetings(outputFilePath);

        expect(google.auth.GoogleAuth).toHaveBeenCalledWith({
            scopes: ['https://www.googleapis.com/auth/calendar'],
            credentials: { key: 'test_key' },
        });
        expect(google.calendar).toHaveBeenCalled();
        expect(google.calendar().events.list).toHaveBeenCalledWith({
            calendarId: 'test_calendar_id',
            timeMax: expect.any(String),
            timeMin: expect.any(String),
        });

        const fileContent = readFileSync(outputFilePath, 'utf8');
        expect(fileContent).toContain('Community Meeting');
    });

    it('should throw an error if the Google API call fails', async () => {
        google.calendar().events.list.mockRejectedValue(new Error('Google API error'));

        await expect(buildMeetings()).rejects.toThrow('Google API error');
    });

    it('should handle undefined CALENDAR_SERVICE_ACCOUNT', async () => {
        delete process.env.CALENDAR_SERVICE_ACCOUNT;

        const mockEvents = [];
        google.calendar().events.list.mockResolvedValue({ data: { items: mockEvents } });

        const outputFilePath = path.join(testDir, 'meetings.json');
        await buildMeetings(outputFilePath);

        expect(google.auth.GoogleAuth).toHaveBeenCalledWith({
            scopes: ['https://www.googleapis.com/auth/calendar'],
            credentials: undefined,
        });

        const fileContent = readFileSync(outputFilePath, 'utf8');
        expect(fileContent).toBe('[]');
    });

    it('should throw an error with incorrect parameters', async () => {
        try {
          await buildMeetings("randomPath");
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toMatch(/ENOENT/);
        }
      });
});