import toolsData from '../fixtures/toolsPages.json';
import BasePage from './BasePage';

class ToolsModelina extends BasePage {
  verifyTryItNowLink() {
    return this.verifyLink(toolsData.modelina.tryIt.href, toolsData.modelina.tryIt.text, { findByText: true });
  }

  verifyInstallSnippet() {
    return this.verifyElementContainsText('code', toolsData.modelina.install);
  }
}

export default ToolsModelina;