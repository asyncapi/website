import BaseToolsPage from './BaseToolsPage';

class ToolsModelina extends BaseToolsPage {
  visit() {
    return super.visit('/tools/modelina');
  }

  verifyHeader() {
    return this.verifyHeadingExists('Modelina');
  }

  verifyGithubLink() {
    return super.verifyGithubLink('https://www.github.com/asyncapi/modelina');
  }

  verifyTryItNowLink() {
    return this.verifyCustomLink('Try it now', 'https://modelina.org/playground');
  }

  verifyInstallSnippet() {
    return this.verifyCodeSnippet('npm install @asyncapi/modelina');
  }
}

export default ToolsModelina;