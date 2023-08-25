import { mount } from 'cypress/react'
import EventPostItem from '../../../../components/navigation/EventPostItem'
import MockRouter from '../../../utils/router'
describe('EventPostItem', () => {
  it('renders correctly with active status', () => {
    const post =  {
      title: "Spec 3.0 Meeting",
      calLink: "https://www.google.com/calendar/event?eid=djhsdjZvbmRsampvb2tsYzhkZWFyc3FtYTAgY19xOXRzZWlnbG9tZHNqNm5qdWh2YnB0czExY0Bn",
      url: "https://github.com/asyncapi/community/issues/649",
    date: "2023-04-13T15:00:00.000Z"
  };

    mount(
    <MockRouter> <EventPostItem post={ post } className="event-post" id="1" /></MockRouter>
   );
   cy.get('[data-testid="EventPostItem-link"]').should('exist');
   cy.get('[data-testid="EventPostItem-img"]').should('exist');
   cy.get('[data-testid="EventPostItem-post"]').should('exist');
  });

  it('renders correctly with inactive status', () => {
    const post =  {
      title: "Community Meeting",
      calLink: "https://www.google.com/calendar/event?eid=MzgwdmZiMTc4cnBmbTUzdWVlbmM4aWYyM2MgY19xOXRzZWlnbG9tZHNqNm5qdWh2YnB0czExY0Bn",
      url: "https://github.com/asyncapi/community/issues/659",
      banner: "https://user-images.githubusercontent.com/40604284/229763606-c0b6ed3b-e120-427c-b87d-357856d92777.png",
      date: "2023-04-18T16:00:00.000Z"
    };

    mount(<EventPostItem post={ post } className="event-post" id="2" />);
    cy.get('[data-testid="Event-span"]').should('have.text', 'View Recording');
  });
});


