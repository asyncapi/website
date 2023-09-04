import { mount } from 'cypress/react';
import CodeBlock from '../../../components/editor/CodeBlock';

describe('CodeBlock component', () => {
  beforeEach(() => {
    mount(
      <CodeBlock>
        {`const message = 'Hello, World!';\nconsole.log(message);`}
      </CodeBlock>
    );
  });

  it('should render correctly', () => {
    cy.get('.bg-code-editor-dark').should('exist');
  });

  it('should copy code to clipboard when clicking the copy button', () => {
    const originalText = "const message = 'Hello, World!';\r\nconsole.log(message);";
    const copiedText = originalText.replace(/\r/g, ''); // Remove \r characters

    cy.get('[data-test="copy-button"]').click({ force: true });
    cy.get('[data-testid="clicked-text"]').should('exist');

    cy.window().then((win) => {
      cy.document().then((doc) => {
        win.navigator.clipboard.readText().then((clipboardContent) => {
          const sanitizedClipboardContent = clipboardContent.replace(/\r/g, '');
          expect(sanitizedClipboardContent).to.equal(copiedText);
        });
      });
    });
  });
});