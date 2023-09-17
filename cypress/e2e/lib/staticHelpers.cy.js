import { getEvents } from '../../../lib/staticHelpers';

describe('getEvents', () => {
  it('should return sorted events in ascending order', () => {
    const events = [
      {
        "title": "Community Meeting",
        "calLink": "https://www.google.com/calendar/event?eid=czRmMG5maHRsYjduM2g3dmwxMDM1Z3R0NzAgY19xOXRzZWlnbG9tZHNqNm5qdWh2YnB0czExY0Bn",
        "url": "https://github.com/asyncapi/community/issues/645",
        "date": "2023-04-04T08:00:00.000Z"
      },
      {
        "title": "Spec 3.0 Meeting",
        "calLink": "https://www.google.com/calendar/event?eid=djhsdjZvbmRsampvb2tsYzhkZWFyc3FtYTAgY19xOXRzZWlnbG9tZHNqNm5qdWh2YnB0czExY0Bn",
        "url": "https://github.com/asyncapi/community/issues/649",
        "date": "2023-04-13T15:00:00.000Z"
      },
      {
        "title": "Community Meeting",
        "calLink": "https://www.google.com/calendar/event?eid=MzgwdmZiMTc4cnBmbTUzdWVlbmM4aWYyM2MgY19xOXRzZWlnbG9tZHNqNm5qdWh2YnB0czExY0Bn",
        "url": "https://github.com/asyncapi/community/issues/659",
        "banner": "https://user-images.githubusercontent.com/40604284/229763606-c0b6ed3b-e120-427c-b87d-357856d92777.png",
        "date": "2023-04-18T16:00:00.000Z"
      },
    ];

    cy.wrap(events).as('events'); 

    // Call the getEvents function
    cy.get('@events').then((events) => {
      const sortedEvents = getEvents(events);

      // Check if the result is an array
      expect(sortedEvents).to.be.an('array');

      // Convert dates to timestamps for comparison
      const sortedTimestamps = sortedEvents.map((event) => event.date.valueOf());

      // Check if the timestamps are sorted in ascending order
      for (let i = 0; i < sortedTimestamps.length - 1; i++) {
        expect(sortedTimestamps[i]).to.be.greaterThan(sortedTimestamps[i + 1]);
      }
    });
  });
});
