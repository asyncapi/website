import { writeFileSync } from 'fs';
import { google } from 'googleapis';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { logger } from './helpers/logger';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

/**
 * Fetches meeting events from Google Calendar within a predefined time window and writes the formatted data to a file.
 *
 * This function authenticates using service account credentials from environment variables and retrieves events from a calendar identified by an environment variable. It computes a time span ranging from 100 days before the current time to 30 days after, then processes each event to extract key details such as the title, calendar link, optional URL and banner, and the event date. If the API response is invalid or an event lacks a start date-time, an error is thrown. The formatted, pretty-printed JSON data is logged and written to the specified file path.
 *
 * @param writePath - The file system path where the output JSON data should be saved.
 *
 * @throws {Error} When authentication fails, the calendar API returns an invalid structure, or required event details are missing.
 */
async function buildMeetings(writePath: string) {
  let auth;
  let calendar;

  // Check if the CALENDAR_SERVICE_ACCOUNT is present in the environment variables
  // Check if required environment variables are present
  if (!process.env.CALENDAR_SERVICE_ACCOUNT) {
    throw new Error('CALENDAR_SERVICE_ACCOUNT environment variable is not set');
  }

  if (!process.env.CALENDAR_ID) {
    throw new Error('CALENDAR_ID environment variable is not set');
  }

  try {
    auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/calendar'],
      credentials: JSON.parse(process.env.CALENDAR_SERVICE_ACCOUNT)
    });

    calendar = google.calendar({ version: 'v3', auth });
  } catch (err) {
    throw new Error(`Authentication failed: ${err}`);
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
      throw new Error('Invalid data structure received from Google Calendar API');
    }

    eventsItems = eventsList.data.items.map((e) => {
      if (!e.start || !e.start.dateTime) {
        throw new Error('start.dateTime is missing in the event');
      }

      return {
        title: e.summary,
        calLink: e.htmlLink,
        url:
          e.extendedProperties?.private &&
          `https://github.com/asyncapi/community/issues/${e.extendedProperties.private.ISSUE_ID}`,
        banner: e.extendedProperties?.private && e.extendedProperties.private.BANNER,
        date: new Date(e.start.dateTime)
      };
    });

    const eventsForHuman = JSON.stringify(eventsItems, null, '  ');

    logger.info(`The following events got fetched: ${eventsForHuman}`);

    writeFileSync(writePath, eventsForHuman);
  } catch (err) {
    throw new Error(`Failed to fetch or process events: ${(err as Error).message}`);
  }
}

/* istanbul ignore next */
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  buildMeetings(resolve(currentDirPath, '../config', 'meetings.json'));
}

export { buildMeetings };
