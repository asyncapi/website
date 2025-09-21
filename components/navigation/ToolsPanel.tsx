import React from 'react';

import FlyoutMenu from './FlyoutMenu';
import toolingItems from './toolingItems';

interface ToolsPanelProps {
  open?: boolean;
}

/**
 * @description Renders a panel containing tools using a flyout menu.
 */
export default function ToolsPanel({ open = false }: ToolsPanelProps) {
  return <FlyoutMenu items={toolingItems} open={open} />;
}
