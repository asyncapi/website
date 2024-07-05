const { google } = require('googleapis');
const { writeFileSync } = require('fs');
const { buildMeetings } = require('../scripts/build-meetings');
const { mockEvents } = require('../tests/fixtures/meetingsData')

jest.mock('fs');
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

    beforeEach(() => {
        jest.clearAllMocks();
        process.env = { ...originalEnv };
        process.env.CALENDAR_SERVICE_ACCOUNT = JSON.stringify({ key: 'test_key' });
        process.env.CALENDAR_ID = 'test_calendar_id';
    });

    afterEach(() => {
        process.env = originalEnv;
    });

    it('should fetch events, process them, and write to a file', async () => {

        google.calendar().events.list.mockResolvedValue({ data: { items: mockEvents } });

        await buildMeetings();

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

        expect(writeFileSync).toHaveBeenCalledWith(
            expect.stringContaining('meetings.json'),
            expect.stringContaining('Community Meeting')
        );
    });

    it('should throw an error if the Google API call fails', async () => {
        google.calendar().events.list.mockRejectedValue(new Error('Google API error'));

        await expect(buildMeetings()).rejects.toThrow('Google API error');
    });

    it('should handle undefined CALENDAR_SERVICE_ACCOUNT', async () => {
        delete process.env.CALENDAR_SERVICE_ACCOUNT;

        const mockEvents = [];
        google.calendar().events.list.mockResolvedValue({ data: { items: mockEvents } });

        await buildMeetings();

        expect(google.auth.GoogleAuth).toHaveBeenCalledWith({
            scopes: ['https://www.googleapis.com/auth/calendar'],
            credentials: undefined,
        });
    });
});