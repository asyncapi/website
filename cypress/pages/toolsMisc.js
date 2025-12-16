import BaseToolsPage from './BaseToolsPage';

class ToolsMisc extends BaseToolsPage {
  visitCli() {
    return super.visit('/tools/cli');
  }

  visitParsers() {
    return super.visit('/tools/parsers');
  }

  visitGithubActions() {
    return super.visit('/tools/github-actions');
  }

  verifyCliHeader() {
    return this.verifyHeadingExists(
      'Interact with AsyncAPI from the comfort of your CLI',
    );
  }

  verifyCliGithubLink() {
    return super.verifyGithubLink('https://www.github.com/asyncapi/cli');
  }

  verifyCliDocsLink() {
    return super.verifyDocsLink('/docs/tools/cli');
  }

  verifyCliInstallSnippet() {
    return this.verifyCodeSnippet('npm install -g @asyncapi/cli');
  }

  verifyParsersHeader() {
    return this.verifyHeadingExists('Build your own tools');
  }

  verifyParsersGithubLink() {
    return super.verifyGithubLink('https://www.github.com/asyncapi/parser-js');
  }

  verifyParsersInstallSnippet() {
    return this.verifyCodeSnippet('npm install @asyncapi/parser');
  }

  verifyGhActionsHeader() {
    return this.verifyHeadingExists('Automate using GitHub Actions');
  }

  verifyGhActionsGithubLink() {
    return super.verifyGithubLink('https://www.github.com/asyncapi/github-action-for-generator');
  }
}

export default ToolsMisc;
