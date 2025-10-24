import dotenv from 'dotenv';
import { writeFileSync } from 'fs';
import { google } from 'googleapis';

import { CustomError } from '@/types/errors/CustomError';

import { logger } from './helpers/logger';

dotenv.config();

/**
 * Fetches meeting events from Google Calendar within a predefined time window and writes the formatted data to a file.
 *
 * This function authenticates using service account credentials from environment variables and retrieves events from a
 * calendar identified by an environment variable. It computes a time span ranging from 100 days before the current time
 * to 30 days after, then processes each event to extract key details such as the title, calendar link, optional URL and
 * banner, and the event date. If the API response is invalid or an event lacks a start date-time, an error is thrown.
 * The formatted, pretty-printed JSON data is logged and written to the specified file path.
 *
 * @param writePath - The file system path where the output JSON data should be saved.
 *
 * @throws {CustomError} When authentication fails, the calendar API returns an invalid structure, or required event details are missing.
 */
export async function buildMeetings(writePath: string) {
  let auth;
  let calendar;

  // Check if the CALENDAR_SERVICE_ACCOUNT is present in the environment variables
  // Check if required environment variables are present
  if (!process.env.CALENDAR_SERVICE_ACCOUNT) {
    throw new CustomError('CALENDAR_SERVICE_ACCOUNT environment variable is not set', {
      category: 'script',
      operation: 'buildMeetings',
      detail: `Environment check failed for writePath: ${writePath}`
    });
  }

  if (!process.env.CALENDAR_ID) {
    throw new CustomError('CALENDAR_ID environment variable is not set', {
      category: 'script',
      operation: 'buildMeetings',
      detail: `Environment check failed for writePath: ${writePath}`
    });
  }

  try {
    auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/calendar'],
      credentials: JSON.parse(process.env.CALENDAR_SERVICE_ACCOUNT)
    });

    calendar = google.calendar({ version: 'v3', auth });
  } catch (err) {
    throw CustomError.fromError(err, {
      category: 'api',
      operation: 'buildMeetings',
      detail: `Google Calendar authentication failed for writePath: ${writePath}`
    });
  }

  let eventsItems;

  try {
    // cron job runs this always on midnight
    const currentTime = new Date(Date.now()).toISOString();
    const timeMin = new Date(Date.parse(currentTime) - 100 * 24 * 60 * 60 * 1000).toISOString();
    const timeMax = new Date(Date.parse(currentTime) + 30 * 24 * 60 * 60 * 1000).toISOString();

    const eventsList = await calendar.events.list({
      calendarId: process.env.CALENDAR_ID,
      timeMax,
      timeMin
    });

    // check if the response is valid and not undefined
    if (!eventsList.data.items || !Array.isArray(eventsList.data.items)) {
      throw new CustomError('Invalid data structure received from Google Calendar API', {
        category: 'api',
        operation: 'buildMeetings',
        detail: `Invalid response structure for calendar events, writePath: ${writePath}`
      });
    }

    eventsItems = eventsList.data.items.map((e) => {
      if (!e.start || !e.start.dateTime) {
        throw new CustomError('start.dateTime is missing in the event', {
          category: 'validation',
          operation: 'buildMeetings',
          detail: `Event missing start.dateTime: ${e.summary || 'Unknown event'}`
        });
      }

      return {
        title: e.summary,
        calLink: e.htmlLink,
        url: e.extendedProperties?.private?.ISSUE_ID
          ? `https://github.com/asyncapi/community/issues/${e.extendedProperties.private.ISSUE_ID}`
          : null,
        banner: e.extendedProperties?.private?.BANNER || null,
        date: new Date(e.start.dateTime)
      };
    });

    const eventsForHuman = JSON.stringify(eventsItems, null, '  ');

    logger.info(`The following events got fetched: ${eventsForHuman}`);

    writeFileSync(writePath, eventsForHuman);
  } catch (err) {
    // Only wrap if it's not already a CustomError
    if (err instanceof CustomError) {
      throw err;
    }

    throw CustomError.fromError(err, {
      category: 'api',
      operation: 'buildMeetings',
      detail: `Failed to fetch or process calendar events for writePath: ${writePath}`
    });
  }
}
