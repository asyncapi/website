import moment from 'moment';
import { mount } from '@cypress/react';
import AnnouncementRemainingDays from '../../../components/campaigns/AnnouncementRamainingDays';

describe('AnnouncementRemainingDays', () => {
  it('displays correct countdown text', () => {
    const dateTime = moment().add(2, 'days').toISOString(); // Set the dateTime value as desired
    const eventName = 'Your Event'; // Set the eventName as desired

    mount(<AnnouncementRemainingDays dateTime={dateTime} eventName={eventName} />);

    const date = moment(dateTime);
    const now = moment();
    const days = date.diff(now, 'days');

    let text;
    if (days >= 1) {
      text = `${days} ${days === 1 ? 'day' : 'days'}`;
    } else {
      const hours = date.diff(now, 'hours');
      if (hours > 1) {
        text = 'A few hours';
      } else {
        const minutes = date.diff(now, 'minutes');
        if (minutes > 1) {
          text = 'A few minutes';
        }
      }
    }

    cy.get('[data-testid="AnnouncementRemainingDays-text"]').should('have.text', `${text} until ${eventName}`);

    //check class font-extrabold 
    cy.get('[data-testid="AnnouncementRemainingDays-text"]').should('have.class', 'font-extrabold');
  });
});

/// Make sure to adjust the dateTime and eventName variables as needed for your specific testcase 