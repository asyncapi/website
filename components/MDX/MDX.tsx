import { MDXProvider as CoreMDXProvider } from '@mdx-js/react';
import mermaid from 'mermaid';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  TwitterDMButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterMomentShare,
  TwitterOnAirButton,
  TwitterShareButton,
  TwitterTimelineEmbed,
  TwitterTweetEmbed,
  TwitterVideoEmbed
} from 'react-twitter-embed';
import YouTube from 'react-youtube-embed';

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

let mermaidInitialized = false;

/**
 * @description Initializes the Mermaid library if not already initialized.
 */
function initializeMermaid() {
  if (mermaidInitialized) {
    return;
  }

  mermaidInitialized = true;
  mermaid.initialize({
    startOnLoad: true,
    theme: 'base',
    securityLevel: 'loose',
    themeCSS: '',
    themeVariables: {
      primaryColor: '#EDFAFF',
      primaryBorderColor: '#47BCEE',
      secondaryColor: '#F4EFFC',
      secondaryBorderColor: '#875AE2',
      fontFamily: 'Inter, sans-serif',
      fontSize: '18px',
      primaryTextColor: '#242929',
      tertiaryColor: '#F7F9FA',
      tertiaryBorderColor: '#BFC6C7'
    }
  });
}

initializeMermaid();

let currentId = 0;

/**
 * @description Generates a unique identifier.
 * @returns {string} - A unique identifier.
 */
const uuid = (): string => `mermaid-${(currentId++).toString()}`;

interface MermaidDiagramProps {
  graph: string;
}

/**
 * @description This component renders Mermaid diagrams.
 *
 * @param {MermaidDiagramProps} props - The props for the MermaidDiagram component.
 * @param {string} props.graph - The Mermaid graph to render.
 */
function MermaidDiagram({ graph }: MermaidDiagramProps) {
  const [svg, setSvg] = useState<string | null>(null);

  /**
   * @description Renders the Mermaid diagram.
   */
  useEffect(() => {
    if (!graph) {
      return;
    }

    try {
      mermaid.mermaidAPI.render(uuid(), graph, (svgGraph) => {
        setSvg(svgGraph);
      });
    } catch (e) {
      setSvg(null);
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }, [graph]);

  return svg ? <div dangerouslySetInnerHTML={{ __html: svg }} /> : null;
}

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
 * @description This function returns MDX components.
 */
const getMDXComponents = {
  h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h1
      {...props}
      className={`${props.className || ''} my-4 font-heading text-2xl font-semibold tracking-heading text-gray-900 antialiased`}
    />
  ),
  h2: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h2
      {...props}
      className={`${props.className || ''} mb-4 mt-6 font-heading text-2xl font-semibold tracking-heading text-gray-900 antialiased`}
    />
  ),
  h3: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h3
      {...props}
      className={`${props.className || ''} mb-4 mt-6 font-heading text-lg font-medium tracking-heading text-gray-900 antialiased`}
    />
  ),
  h4: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h4
      {...props}
      className={`${props.className || ''} text-md my-4 font-heading font-medium text-gray-900 antialiased`}
    />
  ),
  h5: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h5 {...props} className={`${props.className || ''} text-md my-4 font-heading font-bold antialiased`} />
  ),
  h6: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h6
      {...props}
      className={`${props.className || ''} my-4 font-heading text-sm font-bold uppercase text-gray-900 antialiased`}
    />
  ),
  blockquote: (props: React.HTMLProps<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className={`${props.className || ''} my-4 border-l-4 border-gray-400 bg-white py-1 pl-4 pr-1 font-body italic text-gray-700 antialiased`}
    />
  ),
  p: (props: React.HTMLProps<HTMLParagraphElement>) => (
    <p {...props} className={`${props.className || ''} my-4 font-body font-regular text-gray-700 antialiased`} />
  ),
  strong: (props: React.HTMLProps<HTMLSpanElement>) => (
    <strong {...props} className={`${props.className || ''} my-4 font-body font-semibold text-gray-800 antialiased`} />
  ),
  a: (props: React.HTMLProps<HTMLAnchorElement>) => (
    <a
      {...props}
      className={`${props.className || 'border-b border-secondary-400 font-semibold text-gray-900 transition duration-300 ease-in-out hover:border-secondary-500'} font-body antialiased`}
    />
  ),
  ul: (props: React.HTMLProps<HTMLUListElement>) => (
    <ul
      {...props}
      className={`${props.className || ''} font-normal my-4 ml-4 list-disc font-body text-gray-700 antialiased`}
    />
  ),
  ol: (props: React.HTMLProps<HTMLOListElement>) => (
    <ol
      {...props}
      className={`${props.className || ''} font-normal my-4 ml-4 list-decimal font-body text-gray-700 antialiased`}
      type='1'
    />
  ),
  li: (props: React.HTMLProps<HTMLLIElement>) => (
    <li
      {...props}
      className={`${props.className || ''} my-3 font-body font-regular tracking-tight text-gray-700 antialiased`}
    />
  ),
  button: Button as React.ComponentType<React.ButtonHTMLAttributes<HTMLButtonElement>>,
  table: (props: React.HTMLProps<HTMLTableElement>) => (
    <div className={`${props.className || ''} flex flex-col`}>
      <div className='my-2 overflow-x-auto py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
        <div className='inline-block w-full overflow-auto border-b border-gray-200 align-middle shadow sm:rounded-lg'>
          <table {...props} className={`${props.className || ''} w-full`} />
        </div>
      </div>
    </div>
  ),
  th: (props: React.HTMLProps<HTMLTableCellElement>) => (
    <th
      {...props}
      className={`${props.className || ''} border-b border-gray-200 bg-gray-100 px-6 py-3 text-left font-body text-xs font-medium uppercase leading-4 tracking-wider text-gray-900`}
    />
  ),
  tr: (props: React.HTMLProps<HTMLTableRowElement>) => (
    <tr {...props} className={`${props.className || ''} bg-white`} />
  ),
  td: (props: React.HTMLProps<HTMLTableCellElement>) => (
    <td
      {...props}
      className={`${props.className || ''} border-b border-gray-200 px-6 py-4 text-sm leading-5 tracking-tight text-gray-700`}
    />
  ),
  pre: (props: React.HTMLProps<HTMLPreElement>) => CodeComponent((props.children as React.ReactElement)?.props),
  code: (props: React.HTMLProps<HTMLElement>) => (
    <code
      {...props}
      className={`${props.className || ''} rounded bg-gray-200 px-1 py-0.5 font-mono text-sm text-gray-800`}
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
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton,
  Profiles,
  Visualizer
};

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
  return <CoreMDXProvider components={mdxComponents}>{children}</CoreMDXProvider>;
}
