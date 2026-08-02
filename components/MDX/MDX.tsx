import { MDXProvider as CoreMDXProvider } from '@mdx-js/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useEffect, useId, useState } from 'react';

// Lazy-loaded heavy dependencies via next/dynamic (ssr: false).
// MermaidDiagram: ~1.5MB (isolated in ../MermaidDiagram.tsx)
// react-twitter-embed + react-youtube-embed: ~300KB each
// Only downloaded when a page actually uses diagrams, Twitter embeds,
// or YouTube videos — reducing initial JS bundle by ~1.8MB on typical MDX pages.
// Fixes #5667, #3186.

const MermaidDiagram = dynamic(() => import('./MermaidDiagram').then(mod => ({ default: mod.default })), { ssr: false });

const TwitterTweetEmbed = dynamic(
  () => import('react-twitter-embed').then((mod) => ({ default: mod.TwitterTweetEmbed })),
  { ssr: false }
);

const YouTube = dynamic(() => import('react-youtube-embed'), { ssr: false });

import Asyncapi3ChannelComparison from '../Asyncapi3Comparison/Asyncapi3ChannelComparison';
import Asyncapi3IdAndAddressComparison from '../Asyncapi3Comparison/Asyncapi3IdAndAddressComparison';
import Asyncapi3MetaComparison from '../Asyncapi3Comparison/Asyncapi3MetaComparison';
import Asyncapi3OperationComparison from '../Asyncapi3Comparison/Asyncapi3OperationComparison';
import Asyncapi3ParameterComparison from '../Asyncapi3Comparison/Asyncapi3ParameterComparison';
import Asyncapi3SchemaFormatComparison from '../Asyncapi3Comparison/Asyncapi3SchemaFormatComparison';
import Asyncapi3ServerComparison from '../Asyncapi3Comparison/Asyncapi3ServerComparison';
import Button from '../buttons/Button';
import ChapterSuggestions from '../buttons/ChapterSuggestions';
import Caption from '../Caption';
import DocsCards from '../docs/DocsCards';
import Visualizer from '../docs/Visualizer';
import CodeBlock from '../editor/CodeBlock';
import FAQ from '../faq/FAQ';
import Figure from '../Figure';
import GeneratorInstallation from '../GeneratorInstallation';
import Column from '../layout/Column';
import Row from '../layout/Row';
import NewsletterSubscribe from '../NewsletterSubscribe';
import Profiles from '../Profiles';
import Remember from '../Remember';
import Sponsors from '../sponsors/PlatinumSponsors';
import Warning from '../Warning';
import { Table, TableBody, TableCell, TableHeader, TableRow, Thead } from './MDXTable';


interface CodeComponentProps {
  children: string;
  className?: string;
  metastring?: string;
  [key: string]: any; // For other props
}

/**
 * @description This component renders code blocks.
 *
 * @param {CodeComponentProps} props - The props for the CodeComponent component.
 * @param {string} props.children - The code block content.
 * @param {string} [props.className] - The code block class name.
 * @param {string} [props.metastring] - The code block metastring.
 */
function CodeComponent({ children, className = '', metastring = '', ...rest }: CodeComponentProps) {
  let caption;
  const meta = metastring.split(/([\w]+=[\w\d\s\-_:><.]+)/) || [];

  meta.forEach((str) => {
    const params = new URLSearchParams(str);

    caption = params.get('caption') || '';
    if (caption.startsWith("'") && caption.endsWith("'")) {
      caption = caption.substring(1, caption.length - 1);
    }
  });
  const maybeLanguage = className.match(/language-([\w\d\-_]+)/);
  const language = maybeLanguage && maybeLanguage.length >= 2 ? maybeLanguage[1] : undefined;

  if (language === 'mermaid') {
    return <MermaidDiagram graph={children} />;
  }

  return (
    <CodeBlock
      {...rest}
      caption={caption}
      className={`${className || ''} rounded`}
      language={language}
      showLineNumbers={children.split('\n').length > 2}
    >
      {children}
    </CodeBlock>
  );
}

/**
 * @description This component renders a text for MDX files
 * @param props.content - The content to render.
 * @param props.className - The className to apply to the text.
 */
function Text({ content = '', className = '' }) {
  return <span className={className}>{content}</span>;
}

/**
 * Recursively extracts and concatenates text content from a React node.
 *
 * Handles the common React node types:
 * - null/undefined and boolean: treated as empty strings
 * - string and number: converted to string
 * - arrays: each element is processed and results concatenated
 * - React elements: their `props.children` are recursively processed
 * - any other values: treated as empty string
 *
 * Examples:
 * - extractText("hello") -> "hello"
 * - extractText(123) -> "123"
 * - extractText([ "a", <span>b</span>, null ]) -> "ab"
 *
 * @param {React.ReactNode} node - The React node to extract text from. May be a string, number, boolean, null, array, or a React element.
 * @returns {string} The concatenated text content found within the node and its children.
 */
function extractText(node: React.ReactNode): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (React.isValidElement(node)) return extractText((node.props as { children?: React.ReactNode }).children);

  return '';
}

/**
 * @description Generates a URL-safe slug from text.
 *
 * @param {React.ReactNode} text - The text to convert to a slug.
 * @returns {string} - A URL-safe slug.
 */
function generateSlug(text: React.ReactNode): string {
  return extractText(text)
    .toLowerCase()
    .trim()
    .replaceAll(/\s+/g, '-')
    .replaceAll(/[^\w-]/g, '');
}

/**
 * @description This function returns MDX components.
 */
const getMDXComponents = (reactId: string) => ({
  h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h1
      {...props}
      id={props.id || generateSlug(props.children) || `heading-${reactId}`}
      className={`${props.className || ''} my-4 font-heading text-2xl font-semibold tracking-heading dark:text-dark-heading text-gray-900 antialiased`}
      aria-label={props['aria-label'] ?? (extractText(props.children).trim() ? undefined : 'Section title')}
    >
      {props.children || <span className='sr-only'>Section title</span>}
    </h1>
  ),
  h2: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h2
      {...props}
      id={props.id || generateSlug(props.children) || `heading-${reactId}`}
      className={`${props.className || ''} mb-4 mt-6 font-heading text-2xl font-semibold tracking-heading  dark:text-dark-heading text-gray-900 antialiased`}
      aria-label={props['aria-label'] ?? (extractText(props.children).trim() ? undefined : 'Section title')}
    >
      {props.children || <span className='sr-only'>Section title</span>}
    </h2>
  ),
  h3: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h3
      {...props}
      id={props.id || generateSlug(props.children) || `heading-${reactId}`}
      className={`${props.className || ''} mb-4 mt-6 font-heading text-lg font-medium tracking-heading dark:text-dark-heading text-gray-900 antialiased`}
      aria-label={props['aria-label'] ?? (extractText(props.children).trim() ? undefined : 'Section title')}
    >
      {props.children || <span className='sr-only'>Section title</span>}
    </h3>
  ),
  h4: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h4
      {...props}
      id={props.id || generateSlug(props.children) || `heading-${reactId}`}
      className={`${props.className || ''} text-md my-4 font-heading font-medium dark:text-dark-heading text-gray-900 antialiased`}
      aria-label={props['aria-label'] ?? (extractText(props.children).trim() ? undefined : 'Section title')}
    >
      {props.children || <span className='sr-only'>Section title</span>}
    </h4>
  ),
  h5: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h5
      {...props}
      id={props.id || generateSlug(props.children) || `heading-${reactId}`}
      className={`${props.className || ''} text-md my-4 font-heading dark:text-dark-heading   font-bold antialiased`}
      aria-label={props['aria-label'] ?? (extractText(props.children).trim() ? undefined : 'Section title')}
    >
      {props.children || <span className='sr-only'>Section title</span>}
    </h5>
  ),
  h6: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h6
      {...props}
      id={props.id || generateSlug(props.children) || `heading-${reactId}`}
      className={`${props.className || ''} my-4 font-heading text-sm font-bold uppercase dark:text-dark-heading text-gray-900 antialiased`}
      aria-label={props['aria-label'] ?? (extractText(props.children).trim() ? undefined : 'Section title')}
    >
      {props.children || <span className='sr-only'>Section title</span>}
    </h6>
  ),
  blockquote: (props: React.HTMLProps<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className={`${props.className || ''} my-4 border-l-4 border-gray-400 dark:bg-dark-footer bg-white py-1 pl-4 pr-1 font-body italic dark:text-white text-gray-700 antialiased`}
    />
  ),
  p: (props: React.HTMLProps<HTMLParagraphElement>) => (
    <p
      {...props}
      className={`${props.className || ''} my-4 font-body font-regular dark:text-dark-heading text-gray-700 antialiased`}
    />
  ),
  strong: (props: React.HTMLProps<HTMLSpanElement>) => (
    <strong
      {...props}
      className={`${props.className || ''} my-4 font-body font-semibold text-gray-800 dark:text-white antialiased`}
    />
  ),
  a: (props: React.HTMLProps<HTMLAnchorElement>) => (
    <a
      {...props}
      className={`${props.className || 'border-b border-secondary-400 dark:text-white font-semibold text-gray-900 transition duration-300 ease-in-out hover:border-secondary-500'} font-body antialiased`}
    />
  ),
  ul: (props: React.HTMLProps<HTMLUListElement>) => (
    <ul
      {...props}
      className={`${props.className || ''} font-normal my-4 ml-4 list-disc font-body dark:text-dark-heading text-gray-700 antialiased`}
    />
  ),
  ol: (props: React.HTMLProps<HTMLOListElement>) => (
    <ol
      {...props}
      className={`${props.className || ''} font-normal my-4 ml-4 list-decimal font-body dark:text-dark-heading text-gray-700 antialiased`}
      type='1'
    />
  ),
  li: (props: React.HTMLProps<HTMLLIElement>) => (
    <li
      {...props}
      className={`${props.className || ''} my-3 font-body font-regular tracking-tight dark:text-white text-gray-700 antialiased`}
    />
  ),
  button: Button as React.ComponentType<React.ButtonHTMLAttributes<HTMLButtonElement>>,
  table: (props: React.HTMLProps<HTMLTableElement>) => (
    <div className={`${props.className || ''} flex flex-col`}>
      <div className='my-2 overflow-x-auto py-2'>
        <div className='inline-block min-w-full border-b border-gray-200 dark:border-gray-800 align-middle shadow sm:rounded-lg'>
          <table {...props} className={`${props.className || ''} w-full`} />
        </div>
      </div>
    </div>
  ),
  th: (props: React.HTMLProps<HTMLTableCellElement>) => (
    <th
      {...props}
      className={`${props.className || ''} border-b border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-dark-card px-6 py-3 text-left font-body text-xs font-medium uppercase leading-4 tracking-wider text-gray-900 dark:text-gray-200`}
    />
  ),
  tr: (props: React.HTMLProps<HTMLTableRowElement>) => (
    <tr {...props} className={`${props.className || ''} bg-white dark:bg-transparent`} />
  ),
  td: (props: React.HTMLProps<HTMLTableCellElement>) => (
    <td
      {...props}
      className={`${props.className || ''} border-b border-gray-200 dark:border-gray-800 px-6 py-4 text-sm leading-5 tracking-tight text-gray-700 dark:text-gray-300`}
    />
  ),
  pre: (props: React.HTMLProps<HTMLPreElement>) => CodeComponent((props.children as React.ReactElement)?.props),
  code: (props: React.HTMLProps<HTMLElement>) => (
    <code
      {...props}
      className={`${props.className || ''} rounded bg-gray-200 dark:bg-gray-800 px-1 py-0.5 font-mono text-sm text-gray-800 dark:text-gray-300`}
    />
  ),
  hr: (props: React.HTMLProps<HTMLHRElement>) => <hr {...props} className={`${props.className || ''} my-8`} />,
  Link: ({ href = '/', children, ...props }: React.HTMLProps<HTMLAnchorElement>) => (
    <Link
      href={href as string}
      className='border-b border-secondary-400 font-body font-semibold text-gray-900 antialiased transition duration-300 ease-in-out hover:border-secondary-500'
      {...props}
    >
      {children}
    </Link>
  ),
  Tr: TableRow,
  Td: TableCell,
  Th: TableHeader,
  Tbody: TableBody,
  Thead,
  Table,
  Dl: ({ className, ...props }: React.HTMLProps<HTMLDListElement>) => (
    <dl {...props} className={`${className || ''} my-4 font-body antialiased`} />
  ),
  Dt: ({ className, ...props }: React.HTMLProps<HTMLElement>) => (
    <dt
      {...props}
      className={`${className || ''} mt-6 font-heading text-lg font-semibold dark:text-dark-heading text-gray-900 antialiased [&_a]:border-b [&_a]:border-secondary-400 [&_a]:dark:text-white [&_a]:font-semibold [&_a]:text-gray-900 [&_a]:transition [&_a]:duration-300 [&_a]:ease-in-out [&_a]:hover:border-secondary-500 [&_a]:font-body [&_a]:antialiased [&_code]:rounded [&_code]:bg-gray-200 [&_code]:dark:bg-gray-800 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_code]:text-gray-800 [&_code]:dark:text-gray-300`}
    />
  ),
  Dd: ({ className, ...props }: React.HTMLProps<HTMLElement>) => (
    <dd
      {...props}
      className={`${className || ''} ml-4 font-body dark:text-dark-text text-gray-700 antialiased [&_a]:border-b [&_a]:border-secondary-400 [&_a]:dark:text-white [&_a]:font-semibold [&_a]:text-gray-900 [&_a]:transition [&_a]:duration-300 [&_a]:ease-in-out [&_a]:hover:border-secondary-500 [&_a]:font-body [&_a]:antialiased [&_code]:rounded [&_code]:bg-gray-200 [&_code]:dark:bg-gray-800 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_code]:text-gray-800 [&_code]:dark:text-gray-300`}
    />
  ),
  Asyncapi3ChannelComparison,
  Asyncapi3IdAndAddressComparison,
  Asyncapi3MetaComparison,
  Asyncapi3OperationComparison,
  Asyncapi3ParameterComparison,
  Asyncapi3SchemaFormatComparison,
  Asyncapi3ServerComparison,
  CodeBlock,
  ChapterSuggestions,
  YouTube,
  Remember,
  Text,
  Warning,
  Sponsors,
  Caption,
  Row,
  Column,
  Figure,
  FAQ,
  DocsCards,
  GeneratorInstallation,
  NewsletterSubscribe,
  TwitterTweetEmbed,
  Profiles,
  Visualizer
});

export const mdxComponents = getMDXComponents;

interface MDXProviderProps {
  children: React.ReactNode;
}

/**
 * @description This component provides MDX components.
 *
 * @param {MDXProviderProps} props - The props for the MDXProvider component.
 * @param {React.ReactNode} props.children - The children to render.
 */
export function MDXProvider({ children }: MDXProviderProps) {
  const reactId = useId();

  return <CoreMDXProvider components={mdxComponents(reactId)}>{children}</CoreMDXProvider>;
}
