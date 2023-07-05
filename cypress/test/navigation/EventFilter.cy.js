import { mount } from 'cypress/react'
import EventPostItem from '../../../components/navigation/EventPostItem'
import moment from 'moment';
describe('EventPostItem', () => {
  it('renders correctly with active status', () => {
    const post = {
      title: 'Community Event',
      url: 'https://example.com',
      banner: '/path/to/banner.jpg',
      date: moment('2023-07-10'),
    };

    mount(<EventPostItem post={ post } className="event-post" id="1" />);

  });

  it('renders correctly with inactive status', () => {
    const post = {
      title: 'Conference Event',
      url: 'https://example.com',
      banner: '/path/to/banner.jpg',
      date: '2023-06-30',
    };

    mount(<EventPostItem post={ post } className="event-post" id="2" />);


    cy.get('[data-testid="Event-span"]').should('have.text', 'View Recording');

  });
});


