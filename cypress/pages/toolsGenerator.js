import BaseToolsPage from './BaseToolsPage';

class ToolsGenerator extends BaseToolsPage {
  visit() {
    return super.visit('/tools/generator');
  }

  verifyHeader() {
    return this.verifyHeadingExists('Docs, Code, Anything!');
  }

  verifyMainImage() {
    return this.verifyImageVisible('generator diagram');
  }

  verifyGithubLink() {
    return super.verifyGithubLink('https://www.github.com/asyncapi/generator');
  }

  verifyDocsLink() {
    return super.verifyDocsLink('/docs/tools/generator');
  }
}

export default ToolsGenerator;
