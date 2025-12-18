import React, { ReactNode } from 'react';
import { useSpecVersion } from '@/context/SpecVersionContext';

type SpecVersion = '2.x' | '3.x';

interface SpecVersionProps {
  when: SpecVersion;
  children: ReactNode;
}

/**
 * SpecVersion component renders its children only when the specified version matches the current selected version.
 * This component is meant to be used in MDX files to show version-specific content.
 * 
 * Usage in MDX:
 * <SpecVersion when="2.x">
 *   ## AsyncAPI 2.x Example
 *   ```yaml
 *   asyncapi: '2.6.0'
 *   ```
 * </SpecVersion>
 * 
 * <SpecVersion when="3.x">
 *   ## AsyncAPI 3.x Example
 *   ```yaml
 *   asyncapi: '3.0.0'
 *   ```
 * </SpecVersion>
 */
export default function SpecVersion({ when, children }: SpecVersionProps) {
  const { version } = useSpecVersion();
  
  if (version !== when) {
    return null;
  }
  
  return <>{children}</>;
}