import React from 'react';

import { buckets } from '../data/buckets';
import Card from './Card';

/**
 * @description This component renders a grid of cards based on the 'buckets' data.
 */
export default function DocsCards() {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2' data-testid='Docs-main-div' >
      {buckets.map(card => (
        <Card key={card.title} {...card} />
      ))}
    </div>
  );
};
