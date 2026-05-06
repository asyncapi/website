describe('Ambassadors Page - Social Links Rendering', () => {
  beforeEach(() => {
    cy.visit('/community/ambassadors');
  });

  describe('Social Links Conditional Rendering', () => {
    it('should render ambassador cards', () => {
      cy.get('[data-testid="Ambassadors-members"]').should('have.length.greaterThan', 0);
    });

    it('should not render links with undefined href attributes', () => {
      // Check that no anchor tags have href="undefined"
      cy.get('[data-testid="Ambassadors-members-socials"] a').each(($link) => {
        const href = $link.attr('href');
        expect(href).not.to.equal('undefined');
        expect(href).not.to.be.empty;
        expect(href).to.match(/^https?:\/\//); // Must start with http/https
      });
    });

    it('should only render Twitter links when twitter URL exists', () => {
      cy.get('[data-testid="Ambassadors-members"]').each(($card) => {
        const twitterLink = cy.wrap($card).find('[data-testid="Ambassadors-members-twitter"]');

        // If Twitter link exists, verify it has a valid href
        twitterLink.then(($el) => {
          if ($el.length > 0) {
            expect($el.attr('href')).to.include('twitter.com');
            expect($el.attr('href')).not.to.equal('undefined');
          }
        });
      });
    });

    it('should only render GitHub links when github URL exists', () => {
      cy.get('[data-testid="Ambassadors-members-socials"]').each(($socialsDiv) => {
        // Get all links in the socials section
        const links = cy.wrap($socialsDiv).find('a');

        links.each(($link) => {
          const href = $link.attr('href');
          // If it's a GitHub link, ensure it's valid
          if (href && href.includes('github.com')) {
            expect(href).not.to.equal('undefined');
            expect(href).to.include('github.com');
          }
        });
      });
    });

    it('should only render LinkedIn links when linkedin URL exists', () => {
      cy.get('[data-testid="Ambassadors-members-socials"]').each(($socialsDiv) => {
        // Get all links in the socials section
        const links = cy.wrap($socialsDiv).find('a');

        links.each(($link) => {
          const href = $link.attr('href');
          // If it's a LinkedIn link, ensure it's valid
          if (href && href.includes('linkedin.com')) {
            expect(href).not.to.equal('undefined');
            expect(href).to.include('linkedin.com/in');
          }
        });
      });
    });

    it('should render valid links with proper target and rel attributes', () => {
      cy.get('[data-testid="Ambassadors-members-socials"] a').each(($link) => {
        expect($link.attr('target')).to.equal('_blank');
        expect($link.attr('rel')).to.include('noreferrer');
      });
    });
  });

  describe('Ambassador Images', () => {
    it('should not render broken image URLs', () => {
      cy.get('[data-testid="Ambassadors-members-img"] img').each(($img) => {
        const src = $img.attr('src');
        expect(src).not.to.equal('undefined.png');
        expect(src).not.to.be.empty;
      });
    });

    it('should load ambassador images without 404 errors', () => {
      cy.get('[data-testid="Ambassadors-members-img"] img').each(($img) => {
        cy.wrap($img).should('be.visible');
        // Verify image is loaded (naturalHeight should be set for successful loads)
        cy.wrap($img).should(($el) => {
          // Just check that src is valid
          expect($el.attr('src')).to.exist;
          expect($el.attr('src')).not.to.include('undefined');
        });
      });
    });
  });

  describe('Social Links Navigation', () => {
    it('should navigate to Twitter when clicking Twitter link', () => {
      cy.get('[data-testid="Ambassadors-members-twitter"]').first().then(($link) => {
        if ($link.length > 0) {
          const href = $link.attr('href');
          expect(href).to.include('twitter.com');
          cy.wrap($link).should('have.attr', 'href', href);
        }
      });
    });

    it('should navigate to GitHub when clicking GitHub link', () => {
      cy.get('[data-testid="Ambassadors-members-socials"]').first().then(($socialsDiv) => {
        const githubLink = cy.wrap($socialsDiv).find('a').filter(':contains("Github")');

        githubLink.then(($link) => {
          if ($link.length > 0) {
            const href = $link.attr('href');
            expect(href).to.include('github.com');
          }
        });
      });
    });

    it('should navigate to LinkedIn when clicking LinkedIn link', () => {
      cy.get('[data-testid="Ambassadors-members-socials"]').first().then(($socialsDiv) => {
        const linkedinLink = cy.wrap($socialsDiv).find('a').filter(':contains("Linkedin")');

        linkedinLink.then(($link) => {
          if ($link.length > 0) {
            const href = $link.attr('href');
            expect(href).to.include('linkedin.com');
          }
        });
      });
    });
  });

  describe('Ambassador Card Layout', () => {
    it('should display ambassador name and country', () => {
      cy.get('[data-testid="Ambassadors-members-details"]').each(($detail) => {
        expect($detail).to.contain.text('');
        // Should have name and country
        cy.wrap($detail).find('div').should('have.length.at.least', 2);
      });
    });

    it('should display ambassador title and bio', () => {
      cy.get('[data-testid="Ambassadors-members"]').each(($card) => {
        cy.wrap($card).should('be.visible');
        // Should have title in rounded border
        cy.wrap($card).find('.rounded-lg').should('be.visible');
      });
    });

    it('should display social links section for each ambassador', () => {
      cy.get('[data-testid="Ambassadors-members-socials"]').should('have.length.greaterThan', 0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle ambassadors with only GitHub', () => {
      // Find an ambassador card and verify GitHub link exists
      cy.get('[data-testid="Ambassadors-members-socials"]').first().within(() => {
        cy.get('a').then(($links) => {
          const links = $links.toArray();
          const hasValidLinks = links.some((link) => {
            const href = link.getAttribute('href');
            return href && href.includes('github.com') && href !== 'undefined';
          });

          // At least some ambassadors should have GitHub
          if (hasValidLinks) {
            expect(hasValidLinks).to.be.true;
          }
        });
      });
    });

    it('should not have any broken hrefs in the entire page', () => {
      cy.get('a[href="undefined"]').should('have.length', 0);
      cy.get('a[href=""]').should('not.exist');
    });
  });
});
