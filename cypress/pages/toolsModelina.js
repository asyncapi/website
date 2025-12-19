import BasePage from './BasePage';

class ToolsModelina extends BasePage {
    verifyTryItNowLink() {
        return this.verifyCustomLink('Try it now', 'https://modelina.org/playground');
    }

    verifyInstallSnippet() {
        return this.verifyCodeSnippet('npm install @asyncapi/modelina');
    }
}

export default ToolsModelina;