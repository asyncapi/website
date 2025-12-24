import React from 'react';

/**
 * Represents a roadmap item that can contain nested roadmap items in solutions or implementations.
 */
export interface RoadmapItem {
  title: string;
  done?: boolean;
  description?: string | React.ReactNode;
  url?: string;
  solutions?: RoadmapItem[];
  implementations?: RoadmapItem[];
}
