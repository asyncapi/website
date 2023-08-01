import { mount } from 'cypress/react'
import CodeBlock from '../../../components/editor/CodeBlock'

describe('CodeBlock component', () => {
  beforeEach(() => {
    mount(
      <CodeBlock>
        { `const message = 'Hello, World!';\nconsole.log(message);` }
      </CodeBlock>
    )
  });

  it('should render correctly', () => {
     cy.get('.bg-code-editor-dark').should('exist')

  })
  it('should copy code to clipboard when clicking the copy button', () => {
    const copiedText = "const message = 'Hello, World!';\r\nconsole.log(message);"
   
    cy.get('[data-test="copy-button"]').click({force:true})
    cy.get('[data-testid="clicked-text"]').should('exist');

    cy.window().then((win) => {
      cy.document().then((doc) => {
        cy.wrap(win.navigator.clipboard.readText()).should('eq', copiedText)
      })
    })
  })

})
