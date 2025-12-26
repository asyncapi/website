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

  it('User verifies event cards have valid links on All tab', () => {
    events.verifyAllEventCards();
  });

  it('User switches to Upcoming tab and verifies event cards have valid links', () => {
    events.switchToUpcoming();
    events.verifyUpcomingEventCards();
  });

  it('User switches to Recorded tab and verifies event cards have valid links', () => {
    events.switchToRecorded();
    events.verifyRecordedEventCards();
  });
});
