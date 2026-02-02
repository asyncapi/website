import BasePage from './BasePageTools';

class EventsPage extends BasePage {
  visit() {
    super.visit('/community/events');
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
    cy.get('[data-testid="EventPostItem-main"]').should('be.visible');
  }

  verifyEventCards() {
    cy.get('[data-testid="EventPostItem-main"]')
      .should('have.length.greaterThan', 0)
      .each(($card) => {
        cy.wrap($card)
          .find('a[data-testid="EventPostItem-link"]')
          .should('have.attr', 'href')
          .and('match', /github\.com\/asyncapi\/community\/issues\/\d+/);
      });
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
        cy.wrap($link)
          .should('have.attr', 'href')
          .and('not.be.empty')
          .and('match', /^https?:\/\/.+/);
      });
  }
}

export default EventsPage;
