import { mount } from 'cypress/react'
import CodeBlock from '../../../components/editor/CodeBlock'

describe('CodeBlock component', () => {
  it('should render correctly', () => {
    mount(
      <CodeBlock>
        {`const message = 'Hello, World!';\nconsole.log(message);`}
      </CodeBlock>
    )
    cy.get('.bg-code-editor-dark').should('exist')
   
  })
})
