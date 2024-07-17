import React from 'react';

interface IContainerProps {
  children: React.ReactNode;
  fluid?: boolean;
  flex?: boolean;
  wide?: boolean;
  padding?: string;
  flexReverse?: boolean;
  cssBreakingPoint?: 'md' | 'lg';
  className?: string;
  as?: React.ElementType;
}

/**
 * @description Container component is a layout component that wraps its children in a container
 * @param {React.ReactNode} props.children - The children of the container
 * @param {Boolean} props.fluid - Whether the container is fluid
 * @param {Boolean} props.flex - Whether the container is flex
 * @param {Boolean} props.wide - Whether the container is wide
 * @param {string} props.padding - The padding of the container
 * @param {Boolean} props.flexReverse - Whether the container is flex reverse
 * @param {string} props.cssBreakingPoint - The CSS breaking point of the container
 * @param {string} props.className - The class name of the container
 * @param {React.ElementType} props.as - The element type of the container
 */
export default function Container({
  children,
  fluid = false,
  flex = false,
  wide = false,
  padding = 'px-4 sm:px-6 lg:px-8',
  flexReverse = false,
  cssBreakingPoint = 'md',
  className = '',
  as
}: IContainerProps) {
  const commonClassNames = `${flex ? `${cssBreakingPoint === 'lg' ? 'lg:flex' : 'md:flex'}` : 'block'} ${
    flexReverse ? `${cssBreakingPoint === 'lg' ? 'lg:flex-row-reverse' : 'md:flex-row-reverse'}` : ''
  } ${className} ${padding}`;
  const wideClassNames = `max-w-screen-xl ${commonClassNames}`;
  const regularClassNames = `max-w-4xl ${commonClassNames}`;
  const normalClassNames = `${wide ? wideClassNames : regularClassNames} mx-auto w-full`;
  const fluidClassNames = `${commonClassNames}`;

  const Tag = as || 'div';

  return (
    <Tag className={fluid ? fluidClassNames : normalClassNames} data-testid='Container-main'>
      {children}
    </Tag>
  );
}
