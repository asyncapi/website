import { writeFileSync } from 'fs';
import { google } from 'googleapis';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { logger } from './utils/logger';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

/**
 * Fetches upcoming meetings from Google Calendar and writes the data to a specified path.
 *
 * @param {string} writePath - The path to write the meeting data.
 * @throws {Error} - Throws an error if there is an issue during the fetch or write process.
 */
async function buildMeetings(writePath: string) {
  let auth;
  let calendar;

  try {
    auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/calendar'],
      credentials: process.env.CALENDAR_SERVICE_ACCOUNT ? JSON.parse(process.env.CALENDAR_SERVICE_ACCOUNT) : undefined
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
