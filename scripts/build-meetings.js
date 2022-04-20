const { writeFileSync } = require('fs');
const { resolve } = require('path');
const { google } = require('googleapis');

async function buildMeetings() {

  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/calendar'],
    credentials: JSON.parse(process.env.CALENDAR_SERVICE_ACCOUNT)
  });

  const calendar = google.calendar({ version: 'v3', auth });
  let eventsItems;

  try {

      //cron job runs this always on midnight
      //so every day we get refreshed list of meetings for comming 7 days
      const currentTime = new Date(Date.now()).toISOString();
      //we check moday
      const timeTomorrow = new Date(Date.parse(currentTime) + 1 * 24 * 60 * 60 * 1000).toISOString();
      //7 days front
      const timeIn8Days = new Date(Date.parse(currentTime) + 8 * 24 * 60 * 60 * 1000).toISOString();

      const eventsList = await calendar.events.list({
          calendarId: process.env.CALENDAR_ID,
          timeMax: timeIn8Days,
          timeMin: timeTomorrow
      })

      eventsItems = eventsList.data.items.map((e) => {
          return {
              title: e.summary,
              url: `https://github.com/asyncapi/community/issues/${e.extendedProperties.private.ISSUE_ID}`,
              date: new Date(e.start.dateTime).toUTCString()
          }
      })

      const eventsForHuman = JSON.stringify(eventsItems, null, '  ');
      console.log('The following events got fetched', eventsForHuman); 

      writeFileSync(
        resolve(__dirname, '../config', 'meetings.json'),
        eventsForHuman
      );
  } catch (e) {
    console.error(e);
  }
}

buildMeetings();