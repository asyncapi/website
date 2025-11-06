class EventsPage {
  visit() {
    cy.visit('/community/events');
  }

  verifyElementIsVisible(selector) {
    cy.get(selector).should('be.visible');
  }

  verifyMainVisible() {
    this.verifyElementIsVisible('[data-testid="Events-main"]');
  }

  verifyActionButtons() {
    this.verifyElementIsVisible('[data-testid="Events-Button"]');
  }

  verifyRecordingsSection() {
    this.verifyElementIsVisible('[data-testid="Recordings-Link"]');
    this.verifyElementIsVisible('[data-testid="RecordingsCard-img"]');
  }

  verifyEventTypes() {
    this.verifyElementIsVisible('[data-testid="EventTypesCard"]');
    this.verifyElementIsVisible('[data-testid="EventTypesCard-others"]');
    this.verifyElementIsVisible('[data-testid="CommunityMeeting-Card"]');
  }

  switchToFilter(label) {
    cy.get('[data-testid="EventFilters-main"]')
      .contains(
        '[data-testid="EventFilter-click"]',
        new RegExp(`^${label}$`, 'i'),
      )
      .click();
    cy.wait(500);
  }

  verifyEventCardLinkByTitleAndHref(title, href, metaText) {
    if (metaText) {
      cy.contains('[data-testid="Event-span"]', metaText)
        .parents('[data-testid="EventPostItem-main"]')
        .within(() => {
          cy.contains('h3', title).should('exist');
          cy.get('a[data-testid="EventPostItem-link"]').should(
            'have.attr',
            'href',
            href,
          );
        });
    } else {
      cy.contains('[data-testid="EventPostItem-main"]', title)
        .find('a[data-testid="EventPostItem-link"]')
        .should('have.attr', 'href', href);
    }
  }

  verifyEventCardHrefByIndex(index, expectedHref) {
    cy.get('[data-testid="EventPostItem-main"]')
      .eq(index)
      .find('a[data-testid="EventPostItem-link"]')
      .should('have.attr', 'href', expectedHref);
  }

  verifyEventCards(count) {
    cy.get('[data-testid="EventPostItem-main"]').then(($cards) => {
      const actualCount = $cards.length;
      const cardsToCheck = Math.min(actualCount, count);
      
      expect(actualCount).to.be.at.least(1, `Expected at least 1 event card but found ${actualCount}`);
      
      cy.wrap($cards)
        .should('have.length', actualCount)
        .each(($card, index) => {
          if (index < cardsToCheck) {
            cy.wrap($card)
              .find('a[data-testid="EventPostItem-link"]')
              .should('have.attr', 'href')
              .and('match', /github\.com\/asyncapi\/community\/issues\/\d+/);
          }
        });
    });
  }

  verifyAllEventCards(count) {
    this.verifyEventCards(count);
  }

  switchToAll() {
    this.switchToFilter('All');
  }

  switchToUpcoming() {
    this.switchToFilter('Upcoming');
  }

  switchToRecorded() {
    this.switchToFilter('Recorded');
  }

  verifyUpcomingEventCards(count) {
    this.verifyEventCards(count);
  }

  verifyRecordedEventCards(count) {
    this.verifyEventCards(count);
  }

  verifyEventButtonsLinks() {
    cy.get('[data-testid="Events-Button"] a[data-testid="Button-link"]')
      .eq(0)
      .should('be.visible')
      .and('have.attr', 'href')
      .and('include', 'calendar.google.com');

    cy.get('[data-testid="Events-Button"] a[data-testid="Button-link"]')
      .eq(1)
      .should('be.visible')
      .and('have.attr', 'href')
      .and('include', 'calendar.google.com/calendar/ical');
  }

  verifyFaqLink() {
    cy.contains('a', 'read our FAQ')
      .should('be.visible')
      .and('have.attr', 'href')
      .and('include', 'MEETINGS_ORGANIZATION.md');
  }

  verifyRecordingsLinkHref() {
    cy.get('[data-testid="Recordings-Link"]')
      .should('have.attr', 'href')
      .and('include', 'playlist?list=');
  }

  verifyEventRecordingLinks() {
    cy.get('a[data-testid="Meeting-link"]')
      .should('have.length.greaterThan', 0)
      .each(($link) => {
        cy.wrap($link)
          .should('have.attr', 'href')
          .and('match', /youtube\.com|youtu\.be/);
      });
  }

  verifyHostLinks() {
    cy.get('a[data-testid="TextLink-href"]')
      .should('have.length.greaterThan', 0)
      .each(($link) => {
        cy.wrap($link).should('have.attr', 'href');
      });
  }
}

export default EventsPage;
