import BasePage from './BasePage';

class ToolsModelina extends BasePage {
    verifyTryItNowLink() {
        return this.verifyLink('https://modelina.org/playground', 'Try it now', { findByText: true });
    }

    verifyInstallSnippet() {
        return this.verifyElementContainsText('code', 'npm install @asyncapi/modelina');
    }
}

export default ToolsModelina;