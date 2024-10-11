import React from 'react';

import FlyoutMenu from './FlyoutMenu';
import toolingItems from './toolingItems';

/**
 * @description Renders a panel containing tools using a flyout menu.
 */
export default function ToolsPanel() {
  return <FlyoutMenu items={toolingItems} />;
}
