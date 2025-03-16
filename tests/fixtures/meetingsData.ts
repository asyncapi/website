const mockEvents = [
  {
    summary: 'Community Meeting',
    htmlLink: 'https://www.google.com/calendar/event?eid=example',
    extendedProperties: {
      private: {
        ISSUE_ID: '123',
        BANNER: 'https://example.com/banner.jpg'
      }
    },
    start: { dateTime: '2024-02-20T16:00:00.000Z' }
  }
];

const expectedContent = [
  {
    banner: 'https://example.com/banner.jpg',
    calLink: 'https://www.google.com/calendar/event?eid=example',
    date: '2024-02-20T16:00:00.000Z',
    title: 'Community Meeting',
    url: 'https://github.com/asyncapi/community/issues/123'
  }
];

export { expectedContent, mockEvents };
