import BaseToolsPage from './BaseToolsPage';

class toolsMisc extends BaseToolsPage {
  verifyCliInstallSnippet() {
    return this.verifyCodeSnippet('npm install -g @asyncapi/cli');
  }

  verifyParsersInstallSnippet() {
    return this.verifyCodeSnippet('npm install @asyncapi/parser');
  }
}

export default toolsMisc;
