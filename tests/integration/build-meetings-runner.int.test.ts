import { promises as fs } from 'fs';
import { google } from 'googleapis';
import os from 'os';
import { resolve } from 'path';

import { runBuildMeetings } from '../../npm/runners/build-meetings-runner';
import { CustomError } from '../../types/errors/CustomError';
import { mockEvents } from '../fixtures/meetingsData';

// Mock googleapis at the module level
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

describe('Integration: build-meetings-runner', () => {
  let tempDir: string;
  let outputPath: string;
  let originalEnv: Record<string, string | undefined>;
  let mockCalendar: jest.Mock;

  beforeAll(() => {
    // Save original environment variables
    originalEnv = {
      CALENDAR_SERVICE_ACCOUNT: process.env.CALENDAR_SERVICE_ACCOUNT,
      CALENDAR_ID: process.env.CALENDAR_ID
    };

    tempDir = resolve(os.tmpdir(), `build-meetings-test-${Date.now()}`);

    // Setup mock calendar
    process.env.CALENDAR_SERVICE_ACCOUNT = JSON.stringify({ key: 'test_key' });
    process.env.CALENDAR_ID = 'test-calendar-id';
    mockCalendar = google.calendar('v3').events.list as jest.Mock;
  });

  beforeEach(async () => {
    await fs.mkdir(tempDir, { recursive: true });
    outputPath = resolve(tempDir, 'meetings.json');
    jest.clearAllMocks();
  });

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  afterAll(() => {
    // Restore original environment variables
    if (originalEnv.CALENDAR_SERVICE_ACCOUNT) {
      process.env.CALENDAR_SERVICE_ACCOUNT = originalEnv.CALENDAR_SERVICE_ACCOUNT;
    }
    if (originalEnv.CALENDAR_ID) {
      process.env.CALENDAR_ID = originalEnv.CALENDAR_ID;
    }
  });

  describe('Successful Execution with Mocked Data', () => {
    it('should successfully run and create meetings.json file', async () => {
      mockCalendar.mockResolvedValue({ data: { items: mockEvents } });

      await runBuildMeetings({ outputPath });

      const fileExists = await fs
        .access(outputPath)
        .then(() => true)
        .catch(() => false);

      expect(fileExists).toBe(true);
    });

    it('should write valid JSON output', async () => {
      mockCalendar.mockResolvedValue({ data: { items: mockEvents } });

      await runBuildMeetings({ outputPath });

      const content = await fs.readFile(outputPath, 'utf-8');

      expect(() => JSON.parse(content)).not.toThrow();
      expect(content.length).toBeGreaterThan(2);
    });

    it('should generate output with correct structure', async () => {
      mockCalendar.mockResolvedValue({ data: { items: mockEvents } });

      await runBuildMeetings({ outputPath });

      const content = await fs.readFile(outputPath, 'utf-8');
      const output = JSON.parse(content);

      expect(Array.isArray(output)).toBe(true);
    });

    it('each meeting item should have required fields', async () => {
      mockCalendar.mockResolvedValue({ data: { items: mockEvents } });

      await runBuildMeetings({ outputPath });

      const content = await fs.readFile(outputPath, 'utf-8');
      const output = JSON.parse(content);

      output.forEach((item: any) => {
        expect(item).toHaveProperty('title');
        expect(item).toHaveProperty('calLink');
        expect(item).toHaveProperty('date');
        expect(item).toHaveProperty('url');
        expect(item).toHaveProperty('banner');
      });
    });

    it('should validate field types in output', async () => {
      mockCalendar.mockResolvedValue({ data: { items: mockEvents } });

      await runBuildMeetings({ outputPath });

      const content = await fs.readFile(outputPath, 'utf-8');
      const output = JSON.parse(content);

      output.forEach((item: any) => {
        expect(typeof item.title).toBe('string');
        expect(typeof item.calLink).toBe('string');
        expect(typeof item.date).toBe('string');
        expect(item.url === null || typeof item.url === 'string').toBe(true);
        expect(item.banner === null || typeof item.banner === 'string').toBe(true);
      });
    });

    it('should handle events without extendedProperties', async () => {
      const mockEventsWithoutExtended = [
        {
          summary: 'Simple Meeting',
          htmlLink: 'https://www.google.com/calendar/event?eid=simple',
          start: { dateTime: '2024-02-20T16:00:00.000Z' }
        }
      ];

      mockCalendar.mockResolvedValue({
        data: { items: mockEventsWithoutExtended }
      });

      await runBuildMeetings({ outputPath });

      const content = await fs.readFile(outputPath, 'utf-8');
      const output = JSON.parse(content);

      expect(output).toEqual([
        {
          title: 'Simple Meeting',
          calLink: 'https://www.google.com/calendar/event?eid=simple',
          url: null,
          banner: null,
          date: '2024-02-20T16:00:00.000Z'
        }
      ]);
    });

    it('should use custom output path when provided', async () => {
      const customPath = resolve(tempDir, 'custom-meetings.json');

      mockCalendar.mockResolvedValue({ data: { items: mockEvents } });

      await runBuildMeetings({ outputPath: customPath });

      const fileExists = await fs
        .access(customPath)
        .then(() => true)
        .catch(() => false);

      expect(fileExists).toBe(true);
    });

    it('should use default output path when not provided', async () => {
      mockCalendar.mockResolvedValue({ data: { items: mockEvents } });

      // Without outputPath, it should use default path
      await expect(runBuildMeetings()).resolves.toBeUndefined();

      // The test passes if no error is thrown
    });
  });

  describe('Export and Type Safety', () => {
    it('should export the runBuildMeetings function', () => {
      expect(typeof runBuildMeetings).toBe('function');
      // Verify it's a Promise-returning function
      expect(runBuildMeetings()).toBeInstanceOf(Promise);
    });
  });

  describe('Error Handling', () => {
    it('should throw error when Google API call fails', async () => {
      mockCalendar.mockRejectedValue(new Error('Google API error'));

      await expect(runBuildMeetings({ outputPath })).rejects.toThrow();
    });

    it('should throw error when API returns invalid data structure', async () => {
      mockCalendar.mockResolvedValue({
        data: {
          items: null // Invalid structure
        }
      });

      await expect(runBuildMeetings({ outputPath })).rejects.toThrow();
    });

    it('should throw error when event missing start.dateTime', async () => {
      mockCalendar.mockResolvedValue({
        data: {
          items: [
            {
              summary: 'Test Event',
              htmlLink: 'http://example.com/event',
              start: {} // Missing dateTime
            }
          ]
        }
      });

      await expect(runBuildMeetings({ outputPath })).rejects.toThrow();
    });

    it('should throw error when CALENDAR_SERVICE_ACCOUNT is missing', async () => {
      const original = process.env.CALENDAR_SERVICE_ACCOUNT;

      delete process.env.CALENDAR_SERVICE_ACCOUNT;

      try {
        await expect(runBuildMeetings({ outputPath })).rejects.toThrow();
      } finally {
        process.env.CALENDAR_SERVICE_ACCOUNT = original;
      }
    });

    it('should throw error when CALENDAR_ID is missing', async () => {
      const original = process.env.CALENDAR_ID;

      delete process.env.CALENDAR_ID;

      try {
        await expect(runBuildMeetings({ outputPath })).rejects.toThrow();
      } finally {
        process.env.CALENDAR_ID = original;
      }
    });

    it('should wrap errors in CustomError with context', async () => {
      mockCalendar.mockRejectedValue(new Error('Test error'));

      await expect(runBuildMeetings({ outputPath: '/test/path.json' })).rejects.toThrow(CustomError);

      // Verify the error has proper context by catching it
      try {
        await runBuildMeetings({ outputPath: '/test/path.json' });
        expect.fail('Expected error to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(CustomError);
        const customError = error as CustomError;

        expect(customError.context.category).toBe('script');
        expect(customError.context.operation).toBe('runBuildMeetings');
        expect(customError.message).toContain('Test error');
        expect(customError.context.detail).toBeDefined();
        expect(customError.context.detail).toContain('output path');
      }
    });

    it('should handle file write errors with invalid path', async () => {
      mockCalendar.mockResolvedValue({ data: { items: mockEvents } });

      const invalidPath = '/root/invalid_dir/meetings.json';

      await expect(runBuildMeetings({ outputPath: invalidPath })).rejects.toThrow();
    });
  });
});
