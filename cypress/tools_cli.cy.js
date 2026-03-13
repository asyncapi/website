import BasePage from './pages/BasePage';
import toolsData from './data/toolsPages.json';

describe('Tools - CLI', () => {
 const page = new BasePage();

 beforeEach(() => {
    page.visit(toolsData.cli.path);
 });

 it('should verify if the CLI header is visible', () => {
    page.verifyHeadingExists(toolsData.cli.heading);
 });

 it('should verify if CLI GitHub link works', () => {
    page.verifyButtonLink(toolsData.cli.github, 'View on Github');
 });

 it('should verify if CLI Docs link works', () => {
    page.verifyButtonLink(toolsData.cli.docs, 'View Docs');
 });

 it('should verify if CLI install snippet is visible', () => {
    page.verifyElementContainsText('code', toolsData.cli.install);
 });

});