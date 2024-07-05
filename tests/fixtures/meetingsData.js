const mockEvents = [
    {
        summary: 'Community Meeting',
        htmlLink: 'https://www.google.com/calendar/event?eid=example',
        extendedProperties: {
            private: {
                ISSUE_ID: '123',
                BANNER: 'https://example.com/banner.jpg',
            },
        },
        start: { dateTime: '2024-02-20T16:00:00.000Z' },
    },
];

module.exports = { mockEvents }