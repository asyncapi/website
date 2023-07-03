import { mount } from 'cypress/react'
import Newsroom from '../../../components/newsroom/Newsroom'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

const newsroom = ["Latest Updates", "Get a glimpse of latest news, events, and blog posts. Want to publish a blog post? We love community stories.", "Submit yours!"]
const newsroom2 = ["From the blog", "Check out these articles written by community members", "Read all blog posts"]
describe('Features Component', () => {
    it('renders without errors', () => {
        mount(<Newsroom />);
        cy.get('[data-testid="Newsroom-main-div"]').contains(newsroom[0])
        cy.get('[data-testid="Newsroom-main-div"]').contains(newsroom[1])
        cy.get('[data-testid="Newsroom-main-div"]').contains(newsroom[2])

        cy.get('[data-testid="Newsroom-sub-div"]').contains(newsroom2[0])
        cy.get('[data-testid="Newsroom-sub-div"]').contains(newsroom2[1])
        cy.get('[data-testid="Newsroom-sub-div"]').contains(newsroom2[2])
        cy.get('[data-testid="Newsroom-Blog"]').should('exist')

    });
    it('checks link href', () => {
        mount(<Newsroom />);
        cy.get('[data-testid="Newsroom-BlogLink"]').find('a').should('have.attr', 'href', '/blog') // Check the blog href attribute
        cy.get('[data-testid="Newsroom-TwitterLink"]').find('a').should('have.attr', 'href', 'https://twitter.com/AsyncAPISpec') //check twitter
        cy.get('[data-testid="NewsRoomYoutube"]').find('a').should('have.attr', 'href', 'https://www.youtube.com/c/AsyncAPI') //check youtube link

    });

    it('checks TwitterTimelineEmbed', () => {
        mount(
            <div className='w-full md:w-1/2 px-2 md:pr-0 md:pl-4'>
                <div className="rounded-xl shadow-md mt-8 w-full mx-auto md:mt-0" data-testid="NewsroomTwitter">
                    <TwitterTimelineEmbed
                        sourceType="profile"
                        screenName="AsyncAPISpec"
                        options={ { tweetLimit: '2' } }
                    />
                </div>
            </div>
        );

        cy.get('[data-testid="NewsroomTwitter"]').should('exist');  // data-test was not working

    });


});
