import { checkLastSnapIndex } from '../../../components/newsroom/swiper';

describe('checkLastSnapIndex', () => {
    it('should check the last snap index correctly for different viewport widths', () => {
        cy.viewport(1280, 720); // Set the viewport width to 1280px
        const isLastSnapIndex1 = checkLastSnapIndex(3);
        expect(isLastSnapIndex1).to.be.false;
    
        cy.viewport(640, 480); // Set the viewport width to 640px
        const isLastSnapIndex2 = checkLastSnapIndex(4);
        expect(isLastSnapIndex2).to.be.true;
      });
    });

