import {mount} from '@cypress/react'
import NavBar from '../../../components/navigation/NavBar';
describe('NavBar', () => {
    it('renders the NavBar correctly', () => {
      mount(<NavBar />);
  
  
    });
  
    it('opens and closes the learning dropdown menu', () => {
      mount(<NavBar />);
  
      cy.get('NavItem[text="Docs"]').trigger('mouseenter');
      cy.get('LearningPanel').should('exist');
  
      cy.get('NavItem[text="Docs"]').trigger('mouseleave');
      cy.get('LearningPanel').should('not.exist');
    });
  
    it('opens and closes the tooling dropdown menu', () => {
      mount(<NavBar />);
  
      cy.get('NavItem[text="Tools"]').trigger('mouseenter');
      cy.get('ToolsPanel').should('exist');
  
      cy.get('NavItem[text="Tools"]').trigger('mouseleave');
      cy.get('ToolsPanel').should('not.exist');
    });
  
    it('opens and closes the community dropdown menu', () => {
      mount(<NavBar />);
  
      cy.get('NavItem[text="Community"]').trigger('mouseenter');
      cy.get('CommunityPanel').should('exist');
  
      cy.get('NavItem[text="Community"]').trigger('mouseleave');
      cy.get('CommunityPanel').should('not.exist');
    });
  
    it('opens the mobile navigation menu', () => {
      mount(<NavBar />);
  
      cy.get('button[aria-label="Open Mobile Menu"]').click();
      cy.get('MobileNavMenu').should('exist');
    });
  
    it('closes the mobile navigation menu', () => {
      mount(<NavBar />);
  
      cy.get('button[aria-label="Open Mobile Menu"]').click();
      cy.get('MobileNavMenu').should('exist');
  
      cy.get('button[aria-label="Close Mobile Menu"]').click();
      cy.get('MobileNavMenu').should('not.exist');
    });
  });
  