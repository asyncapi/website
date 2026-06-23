import React from 'react';

import { ComparisonBox, ComponentsGridList, HoverBox } from './ComparisonCommon';

export interface BaseHoverState {
  Info: boolean;
  Servers: boolean;
  Tags: boolean;
  External: boolean;
  Components: boolean;
}

export interface SharedSectionProps<T extends BaseHoverState & { [K in keyof T]: boolean }> {
  hoverState: T;
  setHoverState: React.Dispatch<React.SetStateAction<T>>;
}

/**
 * The "Info" hover box that appears at the top of both spec columns.
 * Hovering on one column highlights the matching box in the other column.
 */
export const SpecInfoSection = <T extends BaseHoverState & { [K in keyof T]: boolean }>({
  hoverState,
  setHoverState
}: SharedSectionProps<T>) => (
  <HoverBox<T>
    label='Info'
    fieldKey='Info'
    hoverState={hoverState}
    setHoverState={setHoverState}
    activeClass='bg-blue-100 dark:bg-blue-900/40'
    defaultClass=''
    borderClass='border-blue-300 dark:border-blue-700'
    useMouseOver
  />
);

/**
 * The "Tags" and "External Docs" row that appears at the bottom of both spec columns.
 * Both boxes share the same hover state so hovering one highlights the other.
 */
export const TagsAndExternalDocsSection = <T extends BaseHoverState & { [K in keyof T]: boolean }>({
  hoverState,
  setHoverState
}: SharedSectionProps<T>) => (
  <div className='flex flex-1 flex-wrap'>
    <HoverBox<T>
      label='Tags'
      fieldKey='Tags'
      hoverState={hoverState}
      setHoverState={setHoverState}
      activeClass='bg-pink-300 dark:bg-pink-900/60'
      defaultClass=''
      borderClass='border-black dark:border-gray-600'
      className='flex flex-1 items-center justify-center'
      useMouseOver
    />
    <HoverBox<T>
      label='External Docs'
      fieldKey='External'
      hoverState={hoverState}
      setHoverState={setHoverState}
      activeClass='bg-green-500 dark:bg-green-900/60'
      defaultClass=''
      borderClass='border-black dark:border-gray-600'
      className='flex flex-1 items-center justify-center'
      useMouseOver
    />
  </div>
);

export interface SpecComponentsSectionProps<
  T extends BaseHoverState & { [K in keyof T]: boolean }
> extends SharedSectionProps<T> {
  // List of component names to display in the two-column grid.
  componentNames: string[];
}

/**
 * The "Components" hover box that wraps a grid of spec component names.
 * Each column passes its own component name list; hover state is still shared.
 */
export const SpecComponentsSection = <T extends BaseHoverState & { [K in keyof T]: boolean }>({
  hoverState,
  setHoverState,
  componentNames
}: SpecComponentsSectionProps<T>) => (
  <HoverBox<T>
    label='Components'
    fieldKey='Components'
    hoverState={hoverState}
    setHoverState={setHoverState}
    activeClass='bg-gray-100 dark:bg-gray-800'
    defaultClass=''
    borderClass='border-black dark:border-gray-600'
    className='flex-1'
    useMouseOver
  >
    <ComponentsGridList items={componentNames} />
  </HoverBox>
);

/**
 * The OpenAPI servers and security section for Column 1.
 */
export const OpenAPIServersSection = <T extends BaseHoverState & { [K in keyof T]: boolean }>({
  hoverState,
  setHoverState,
  testId
}: SharedSectionProps<T> & { testId?: string }) => (
  <div className='flex flex-1 flex-wrap'>
    <HoverBox<T>
      label='Servers'
      fieldKey='Servers'
      hoverState={hoverState}
      setHoverState={setHoverState}
      activeClass='bg-green-100 dark:bg-green-900/40'
      defaultClass=''
      borderClass='border-green-300 dark:border-green-700'
      className='flex-1'
      testId={testId}
      useMouseOver
    />
    <ComparisonBox className='flex-1 hover:bg-gray-200 dark:hover:bg-gray-800'>Security</ComparisonBox>
  </div>
);

/**
 * The AsyncAPI servers section for Column 2.
 */
export const AsyncAPIServersSection = <T extends BaseHoverState & { [K in keyof T]: boolean }>({
  hoverState,
  setHoverState
}: SharedSectionProps<T>) => (
  <div className='flex flex-1 flex-wrap'>
    <HoverBox<T>
      label='Servers (hosts + security)'
      fieldKey='Servers'
      hoverState={hoverState}
      setHoverState={setHoverState}
      activeClass='bg-green-100 dark:bg-green-900/40'
      defaultClass=''
      borderClass='border-green-300 dark:border-green-700'
      className='flex-1'
      useMouseOver
    />
  </div>
);
