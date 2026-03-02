import EventsPage from './pages/events';

describe('Events Page', () => {
  const events = new EventsPage();

  beforeEach(() => {
    events.visit();
  });

  it('should display main sections and action buttons', () => {
    events.verifyMainVisible();
    events.verifyActionButtons();
  });

  it('should display Google Calendar and ICS file button links', () => {
    events.verifyEventButtonsLinks();
  });

  it('should display recordings section with correct link', () => {
    events.verifyRecordingsSection();
    events.verifyRecordingsLinkHref();
  });

  it('should display all event recording links', () => {
    events.verifyEventRecordingLinks();
  });

  it('should display event types section', () => {
    events.verifyEventTypes();
  });

  it('should display FAQ link pointing to correct documentation', () => {
    events.verifyFaqLink();
  });

  it('should display all host profile links', () => {
    events.verifyHostLinks();
  });

  it('should display event cards with valid links on All tab', () => {
    events.verifyEventCards();
  });

  it('should display event cards with valid links on Upcoming tab', () => {
    events.switchToUpcoming();
    events.verifyEventCards();
  });

  it('should display event cards with valid links on Recorded tab', () => {
    events.switchToRecorded();
    events.verifyEventCards();
  });
});
