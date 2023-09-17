import Eventindex from "../../../../../pages/community/events";
import MockApp from "../../../../utils/MockApp";
import meetings from '../../../../../config/meetings.json';
import moment from 'moment';
describe('CommunityIndexPage', () => {
  beforeEach(() => {
    cy.mount(<MockApp><Eventindex /></MockApp>)
  });

  it('displays the basic Events', () => {
    cy.get('[data-testid="Events-main"]').should('exist')
    cy.contains('Join an AsyncAPI event from anywhere in the world.')
    cy.get('[data-testid="Events-Button"]').should('exist')
    cy.get(`[href="https://calendar.google.com/calendar/u/3?cid=Y19xOXRzZWlnbG9tZHNqNm5qdWh2YnB0czExY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t"]`).should('exist');
    cy.get(`[href="https://calendar.google.com/calendar/ical/c_q9tseiglomdsj6njuhvbpts11c%40group.calendar.google.com/public/basic.ics"]`).should('exist');
    cy.get('[data-testid="TextLink-href" ]').should('have.attr', 'href', 'https://github.com/asyncapi/community/blob/master/MEETINGS_ORGANIZATION.md')
  });

  it('displays recording card', () => {
    cy.get('[data-testid="RecordingsCard-img"]').should('exist');
    cy.get('[data-testid="Recordings-Link"]').should('have.attr', 'href', 'https://www.youtube.com/playlist?list=PLbi1gRlP7pijRiA32SU36hD_FW-2qyPhl')
    cy.get('[data-testid="Recordings-text"]').should('exist');
  });

  it('check for Events Filters', () => {
    cy.get('[data-testid="EventFilters-main"]').should('exist');
    cy.get('[data-testid="EventFilter-click"]').contains('All').click({ force: true });
    
    meetings.forEach((event) => {
      cy.contains(event.title).should('be.visible');
    });
    cy.get('[data-testid="EventFilter-click"]').contains('Upcoming').click({ force: true });
    
    const currentDate = moment().format('YYYY-MM-DD');
    meetings.forEach((event) => {
      if (moment(event.date).isAfter(currentDate)) {
        cy.contains(event.title).should('be.visible');
      }
    });
    
    cy.get('[data-testid="EventFilter-click"]').contains('Recorded').click({ force: true });
    const currentDate1 = moment().format('YYYY-MM-DD');
    meetings.forEach((event) => {
      if (moment(event.date).isBefore(currentDate1)) {
        cy.contains(event.title).should('be.visible');
      }
    });
  })

  it('check for Events Post Item', () => {
    cy.get('[data-testid="EventPostItem-main"]').should('exist');
  })

  it('Community Meeting Card', () => {
    cy.get('[data-testid="EventTypesCard"]').should('exist')
    cy.get('[data-testid="Meeting-heading"]').should('exist')
    cy.get('[ data-testid="Meeting-paragraph"]').should('exist')
    cy.get('[ data-testid="Meeting-host"]').should('exist')
    cy.get('[ data-testid="Meeting-link"]').should('exist')
  });


  it('Other Meeting Cards', () => {
    cy.get('[data-testid="EventTypesCard-others"]').should('exist')
    cy.get('[data-testid="Meeting-heading"]').should('exist')
    cy.get('[ data-testid="Meeting-paragraph"]').should('exist')
    cy.get('[ data-testid="Meeting-host"]').should('exist')
    cy.get('[ data-testid="Meeting-link"]').should('exist')
  });
});