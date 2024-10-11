import React from 'react';

import communityItems from './communityItems';
import FlyoutMenu from './FlyoutMenu';

/**
 * @description Component representing the community panel.
 */
export default function CommunityPanel() {
  return <FlyoutMenu items={communityItems} />;
}
