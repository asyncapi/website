import assert from 'assert';
import { writeFileSync } from 'fs';
import { google } from 'googleapis';
import { resolve } from 'path';

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
    assert(err instanceof Error);
    throw new Error(`Authentication failed: ${err.message}`);
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

    console.log('The following events got fetched', eventsForHuman);

    writeFileSync(writePath, eventsForHuman);
  } catch (err) {
    assert(err instanceof Error);
    throw new Error(`Failed to fetch or process events: ${err.message}`);
  }
}

/* istanbul ignore next */
if (require.main === module) {
  buildMeetings(resolve(__dirname, '../config', 'meetings.json'));
}

export { buildMeetings };
