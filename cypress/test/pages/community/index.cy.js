import MockApp from "../../../utils/MockApp";
import CommunityIndexPage from "../../../../pages/community";

describe('CommunityIndexPage', () => {
  beforeEach(() => {
    cy.mount(<MockApp><CommunityIndexPage /></MockApp>)
  });

  it('displays the page title & check for first Community Home Card', () => {
    cy.contains('AsyncAPI Community Meetings');
    cy.get('[data-testid="CommunityIndex-HomeCard"]').should('exist')
    cy.get('[data-testid="HomeCard-main"]').contains('Thanking our AsyncAPI Ambassadors')
    cy.get('[data-testid="HomeCard-title"]').contains('Ambassador Programs')
    cy.get(`[href="/community/ambassadors"]`).should('exist');
    cy.get('[data-testid="HomeCard-button"]').should('exist');
    cy.get(".bg-ambassador").should('exist')
  });

  it('checks for CommunityIndex Display Card', () => {
    cy.get('[data-testid="CommunityIndex-IssuesCard"]').should('exist')
    cy.get('[data-testid="Card-lg-bg"]').should('have.class', 'bg-code-editor-dark')
    cy.get('[data-testid="Card-lg-tagline"]').should('have.class', 'bg-pink-100')
    cy.get('[data-testid="Card-heading-lg"]').should('exist');
    cy.get('[data-testid="Card-desc-lg"]').should('exist');
    cy.get(`[href="/community/dashboard"]`).should('exist');
  });

  it('should display the Newsroom Card', () => {
    cy.get('[data-testid="CommunityIndex-Newsroom-Card"]').should('exist');
    cy.get('[data-testid="Card-lg-bg"]').should('have.class', 'bg-code-editor-dark');
    cy.get('[data-testid="Card-lg-tagline"]').should('have.class', 'bg-pink-100');
    cy.get('[data-testid="Card-heading-lg"]').should('exist');
    cy.get('[data-testid="Card-desc-lg"]').should('exist');
    cy.get('[href="/community/newsroom"]').should('exist');
  });

  it('should display the Toolings Card', () => {
    cy.get('[data-testid="CommunityIndex-Toolings-Card"]').should('exist');
    cy.get('[data-testid="Card-lg-tagline"]').should('exist')
    cy.get('[data-testid="Card-heading-lg"]').should('exist')
    cy.get('[data-testid="Card-desc-lg"]').should('exist')
    cy.get('[href="/tools"]').should('exist');
  });

  it('should display other cards correctly', () => {
    cy.get('[data-testid="CommunityCards-Goals"]').should('exist');
    cy.get('[href="https://github.com/asyncapi/community/discussions/513"]').should('exist');
    cy.get('[data-testid="CommunityCards-Contributors"]').should('exist');
    cy.get('[href="https://github.com/orgs/asyncapi/discussions/593"]').should('exist');
    cy.get('[data-testid="CommunityCards-TSC"]').should('exist');
    cy.get('[href="/community/tsc"]').should('exist');
  });

  it('should display slack card ', () => {
    cy.get('[data-testid="CommunityCards-Slack"]').should('exist');
    cy.get('[data-testid="CommunityIndex-HomeCard"]').should('exist')
    cy.get('[data-testid="HomeCard-main"]').contains('All community info, tracked')
    cy.get('[data-testid="HomeCard-title"]').contains('AsyncAPI Slack')
    cy.get(`[href="https://asyncapi.com/slack-invite"]`).should('exist');
    cy.get('[data-testid="HomeCard-button"]').should('exist');
    cy.get(".bg-channelCover").should('exist')
  });

  it('should display NewsletterSubscribe', () => {
    cy.get('[data-testid="CommunityCard-subscribe"]').should('exist');
    cy.get('[data-testid="NewsletterSubscribe-main"]').should('exist');
  });
});