import React from 'react';

import communityItems from './communityItems';
import FlyoutMenu from './FlyoutMenu';

interface CommunityPanelProps {
  open?: boolean;
}

/**
 * @description Component representing the community panel.
 */
export default function CommunityPanel({ open = false }: CommunityPanelProps) {
  return <FlyoutMenu items={communityItems} open={open} />;
}
