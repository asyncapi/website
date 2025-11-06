import EventsPage from './pages/events';

describe('Events Page Tests', () => {
  const events = new EventsPage();

  beforeEach(() => {
    events.visit();
  });

  it('User navigates to the events page and verifies main sections and action buttons', () => {
    events.verifyMainVisible();
    events.verifyActionButtons();
  });

  it('User verifies Google Calendar and ICS file button links', () => {
    events.verifyEventButtonsLinks();
  });

  it('User verifies recordings section with correct link', () => {
    events.verifyRecordingsSection();
    events.verifyRecordingsLinkHref();
  });

  it('User verifies all event recording links from source', () => {
    events.verifyEventRecordingLinks();
  });

  it('User verifies event types section', () => {
    events.verifyEventTypes();
  });

  it('User verifies FAQ link points to correct documentation', () => {
    events.verifyFaqLink();
  });

  it('User verifies all host profile links', () => {
    events.verifyHostLinks();
  });

  it('User verifies first 4 event cards match source data on All tab', () => {
    events.verifyAllEventCards(4);
  });

  it('User switches to Upcoming tab and verifies event cards match source data', () => {
    events.switchToUpcoming();
    events.verifyUpcomingEventCards(1);
  });

  it('User switches to Recorded tab and verifies event cards match source data', () => {
    events.switchToRecorded();
    events.verifyRecordedEventCards(1);
  });
});
