const themeImages = [
  ['/img/community/github-org-light.webp', '/img/community/github-org-dark.webp'],
  ['/img/community/slack-introductions-light.webp', '/img/community/slack-introductions-dark.webp'],
  ['/img/community/slack-events-light.webp', '/img/community/slack-events-dark.webp']
];

describe('Community page theme images', () => {
  it('shows the dark screenshots when dark theme is stored', () => {
    cy.visit('/community', {
      onBeforeLoad(win) {
        win.localStorage.setItem('theme', 'dark');
      }
    });

    themeImages.forEach(([, darkSrc]) => {
      cy.get(`img[src="${darkSrc}"]`).scrollIntoView().should('be.visible');
    });

    themeImages.forEach(([lightSrc]) => {
      cy.get(`img[src="${lightSrc}"]`).should('not.be.visible');
    });
  });
});
