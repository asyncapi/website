import { mount } from '@cypress/react'
import SlackMessage from '../../../../components/slack/Message'
describe('SlackMessage component', () => {
  it('renders the SlackMessage component correctly', () => {
    const avatarSrc = '../../../public/img/avatars/dalelane.webp' // Replace 
    const name = 'John Doe'
    const text = 'Hello, world!'
    const reactions = [
      { emoji: '👍', count: 5 },
      { emoji: '❤️', count: 3 },
      // Add more reactions
    ]

    mount(
      <SlackMessage avatar={ avatarSrc } name={ name } text={ text } reactions={ reactions } />
    )


    cy.get('[data-testid="SlackMessage-main-div"]').should('exist')
    cy.get('[ data-testid="SlackMessage-img"]').should('have.attr', 'src', avatarSrc)
    cy.get('[data-testid="SlackMessage-name"]').should('contain', name)
    cy.get('[data-testid="SlackMessage-text"]').should('contain', text)

    // Check the reaction elements
    reactions.forEach((reaction, index) => {
      cy.get('[data-testid="SlackMessage-reaction"]').eq(index).as('reactionElement')

      if (reaction.icon) {
        cy.get('@reactionElement').find('[data-testid="SlackMessage-reactionIcon"]').should('have.attr', 'src', reaction.icon)
      } else {
        cy.get('@reactionElement').find('[data-testid="SlackMessage-span"]').should('contain', reaction.emoji)
      }

      cy.get('@reactionElement').find('[data-testid="SlackMessage-count"]').should('contain', reaction.count)
    })
  })
})
