const { writeFileSync } = require('fs');
const { resolve } = require('path');
const { google } = require('googleapis');

async function buildMeetings() {
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/calendar'],
<<<<<<< HEAD
<<<<<<< HEAD
    credentials: JSON.parse(process.env.CALENDAR_SERVICE_ACCOUNT),
=======
    credentials: {
      type: 'service_account',
      project_id: 'my-lorem',
      private_key_id: '62076836c0dc3367e2650de944cdaea2ec868a6f',
      private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC9anrq5do5aO9G\nRVA+ZTsEZogq+j8UG+V1BlNUBwwOt2+KCwf00KPmHtvAgJA/Rk/TiDaCu7tCgNYT\n8sls+OomXJeS/Re9d0DWEpAo2BYwmF7U9KpSRyT3ZeOBxa8e1hGsFDFKpkHVnZoL\n3eZosbIqKrHah+hDyB6ET2DRCX03ThV/E8vMMbjjEFZNQKBG6n5Be6WD0vt2n0V4\nGhQd3hXsok8KeTCSNabHssjG4uztDkyAKKElEwSC73odRGmrDNrfUrQ970xJVbz/\nxZqby3rl3Ro8nK7B5RRi0amBsoNfqMeGEm7qM+9IX0/8DvzP+CRB9yusk8cijB1s\ndHcpH35TAgMBAAECggEATBkO1/dPRHhRhPhM5Dx0SPDObQHLvM72UR0g9iW8pN7y\na1HCOQtnhYjJPZ4JFbqwUGotiDlW4sFzAGGupd6c55uUc8PFuWNDQ54Cl740sAJP\nOxwun06g3dnr3JOopulXATy9juGbmnAuVu0n59DYJNOxT3wBhtXL2NkxKto2mbRO\nuohmFPyNCWHr3000ARrZC03sbaOcbQjAGv2v1mDlE1qNmvM5v9Lv3PE8p2QOj3Hj\n1ib1OlsXRbpFi/wdEYWPz0lEcI6uWyn/ADXUNTisGl9b6VAGKnKvNiMNiAML4+ez\n360fSw/9eaUNQ3zY3DCDe1ppvx9zVnipKNqy4JIV8QKBgQDgoFARq31AC1AJ1nlx\nEsLnDNe7XEJbzsCKIuHGc708tc8B55GUfF/vPlb5vF4k5DxANYSdgzZC5Ym+J1OF\n3uM8Xcz9YydXdyn05jcmw6KLPwmKsHYX3UjOtib0/7aMNGycGK/PIi3kHp9Zrdfn\nxVqBKIqtjbTUy0/TLb4sp5srUQKBgQDX3zIscj68nzturAUmiaAjlXinspt9B+0S\nXYo4hDxcJ8XmDcOLn7bFmhm9kBhchelRLtmEC307anGlomUlfTxCeZjt8QzfkrEA\n8WXEh5eLwz33PGxdxCRkRjfy04ZeGKnP/Td23sv800dXHcx5/8udfY+yzJG2gHD6\nMibDgVZeYwKBgQChPDF9HX1gNT6UcTDmqzLfqmZIBKdVQwkNnpA1ZOqW42Hd2hyz\nWrt5/WNtC3sAPBvLcx7n+UE/r4e5yHy5gQ3XTPVRhJS+wbiKI52+43qPPQZaWOPL\nqXkTd8hq4ApmhVLYkRfRNJWAQ0LammB56z1VrIYuoaMFg5Ke4Ry67OwCoQKBgBmV\nayXXWFYUbP+9xVJ+5wqwkT8WrNTRlqghi9sM2PZ3BD4yjWVDxW5/x+Mua6SzfiZP\n7hl3Hx1mjRd7Oo+J2xVpwdUZR1RL10xsT4pOI4i9198wOwuVzlZP+BuANCF8vMtY\nkDU3TGenRoItlukyhpggpGIlWnONn1YXkX6EGo9PAoGBAIEVQ360MLeLF82DncG2\nGIiAQBnZUWQGRcY+MgX8v+tFRIGEOvLpLqBpaPhgxOoNtDwWURRHU4+ycO/acmHO\nqsTdmDKdVsvAyq+YwAZk2n40Y/GYtbjDo84XjfixEH+u0u1EDRhHt7QmL1Rmuwek\nbT+34XNq0WXKsjgtEJAr+CxQ\n-----END PRIVATE KEY-----\n',
      client_email: 'cal-823@my-lorem.iam.gserviceaccount.com',
      client_id: '104847313452082580465',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url:
        'https://www.googleapis.com/robot/v1/metadata/x509/cal-823%40my-lorem.iam.gserviceaccount.com',
    },
    // credentials: JSON.parse(process.env.CALENDAR_SERVICE_ACCOUNT),
>>>>>>> a817c70 (extended build-meeting script)
=======
    credentials: JSON.parse(process.env.CALENDAR_SERVICE_ACCOUNT),
>>>>>>> 17b3552 (completed meeting script extension)
  });

  const calendar = google.calendar({ version: 'v3', auth });
  let eventsItems;

  try {
    //cron job runs this always on midnight
    const currentTime = new Date(Date.now()).toISOString();
    const timeMin = new Date(
      Date.parse(currentTime) - 100 * 24 * 60 * 60 * 1000
    ).toISOString();
    const timeMax = new Date(
<<<<<<< HEAD
<<<<<<< HEAD
      Date.parse(currentTime) + 8 * 24 * 60 * 60 * 1000
    ).toISOString();
    const eventsList = await calendar.events.list({
      calendarId:  process.env.CALENDAR_ID,
=======
      Date.parse(currentTime) + 50 * 24 * 60 * 60 * 1000
    ).toISOString();
    const eventsList = await calendar.events.list({
      calendarId: 'acebuild404@gmail.com',
      // calendarId:  process.env.CALENDAR_ID,
>>>>>>> a817c70 (extended build-meeting script)
=======
      Date.parse(currentTime) + 8 * 24 * 60 * 60 * 1000
    ).toISOString();
    const eventsList = await calendar.events.list({
      calendarId:  process.env.CALENDAR_ID,
>>>>>>> 17b3552 (completed meeting script extension)
      timeMax: timeMax,
      timeMin: timeMin,
    });

    eventsItems = eventsList.data.items.map((e) => {
      return {
        title: e.summary,
        calLink: e.htmlLink,
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 17b3552 (completed meeting script extension)
        url:
          e.extendedProperties?.private &&
          `https://github.com/asyncapi/community/issues/${e.extendedProperties.private.ISSUE_ID}`,
        banner:
          e.extendedProperties?.private && e.extendedProperties.private.banner,
<<<<<<< HEAD
=======
        url: e.extendedProperties?.private && `https://github.com/asyncapi/community/issues/${e.extendedProperties.private.ISSUE_ID}`,
        banner: e.extendedProperties?.private && e.extendedProperties.private.banner,
>>>>>>> a817c70 (extended build-meeting script)
=======
>>>>>>> 17b3552 (completed meeting script extension)
        date: new Date(e.start.dateTime),
      };
    });

    const eventsForHuman = JSON.stringify(eventsItems, null, '  ');
    // console.log('The following events got fetched', eventsForHuman);

    writeFileSync(
      resolve(__dirname, '../config', 'meetings.json'),
      eventsForHuman
    );
  } catch (e) {
    console.error(e);
  }
}
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> a817c70 (extended build-meeting script)
=======
>>>>>>> 17b3552 (completed meeting script extension)
buildMeetings();
