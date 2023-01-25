import { useLayoutEffect, useState } from "react";
import { MDXProvider as CoreMDXProvider } from "@mdx-js/react"
import YouTube from 'react-youtube-embed'
import Link from 'next/link'
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import mermaid from 'mermaid';

import Button from '../components/buttons/Button'
import ChapterSuggestions from '../components/buttons/ChapterSuggestions'
import CodeBlock from '../components/editor/CodeBlock'
import Remember from '../components/Remember'
import Warning from '../components/Warning'
import Sponsors from '../components/Sponsors'
import Caption from '../components/Caption'
import Row from '../components/layout/Row'
import Column from '../components/layout/Column'
import Figure from '../components/Figure'
import Profile from '../components/Profile'
import GeneratorInstallation from '../components/GeneratorInstallation'
import NewsletterSubscribe from '../components/NewsletterSubscribe'
import { DocsCards } from '../components/docs/DocsCards'

let mermaidInitialized = false;
initializeMermaid();
const mdxComponents = getMDXComponents();

export default function MDXProvider({ children }) {
  return (
    <CoreMDXProvider components={mdxComponents}>
      {children}
    </CoreMDXProvider>
  );
}

function getMDXComponents() {
  return {
    h1: props => <h1 {...props} className={`${props.className || ''} my-4 font-heading antialiased font-semibold tracking-heading text-gray-900 text-2xl`} />,
    h2: props => <h2 {...props} className={`${props.className || ''} mb-4 mt-6 font-heading antialiased font-semibold tracking-heading text-gray-900 text-2xl`} />,
    h3: props => <h3 {...props} className={`${props.className || ''} mb-4 mt-6 font-heading antialiased font-medium tracking-heading text-gray-900 text-lg`} />,
    h4: props => <h4 {...props} className={`${props.className || ''} my-4 font-heading antialiased font-medium text-md text-gray-900`} />,
    h5: props => <h5 {...props} className={`${props.className || ''} my-4 font-heading antialiased text-md font-bold`} />,
    h6: props => <h6 {...props} className={`${props.className || ''} my-4 font-heading antialiased text-sm font-bold text-gray-900 uppercase`} />,
    blockquote: props => <blockquote {...props} className={`${props.className || ''} italic font-body antialiased text-gray-700 border-l-4 border-gray-400 pl-4 pt-1 pb-1 pr-1 my-4 bg-white`} />,
    p: props => <p {...props} className={`${props.className || ''} my-4 text-gray-700 font-regular font-body antialiased`} />,
    strong: props => <strong {...props} className={`${props.className || ''} my-4 text-gray-800 font-semibold font-body antialiased`} />,
    a: props => <a {...props} className={`${props.className ? props.className : 'text-gray-900 font-semibold border-b border-secondary-400 hover:border-secondary-500 transition ease-in-out duration-300'} font-body antialiased`} />,
    ul: props => <ul {...props} className={`${props.className || ''} my-4 ml-4 list-disc text-gray-700 font-normal font-body antialiased`} />,
    ol: props => <ol {...props} className={`${props.className || ''} my-4 ml-4 list-decimal text-gray-700 font-normal font-body antialiased`} />,
    li: props => <li {...props} className={`${props.className || ''} my-3 text-gray-700 font-regular tracking-tight font-body antialiased`} />,
    button: Button,
    table: props => (
      <div className={`${props.className || ''} flex flex-col`}>
        <div className="my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="align-middle inline-block w-full shadow overflow-auto sm:rounded-lg border-b border-gray-200">
            <table {...props} className={`${props.className || ''} w-full`} />
          </div>
        </div>
      </div>
    ),
    th: props => <th {...props} className={`${props.className || ''} px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium font-body text-gray-900 uppercase tracking-wider`} />,
    tr: props => <tr {...props} className={`${props.className || ''} bg-white`} />,
    td: props => <td {...props} className={`${props.className || ''} px-6 py-4 border-b border-gray-200 text-sm leading-5 text-gray-700 tracking-tight`} />,
    pre: props => <div {...props} className={`${props.className || ''} my-8`} />,
    inlineCode: props => <code {...props} className={`${props.className || ''} px-1 py-0.5 bg-gray-200 text-gray-800 rounded font-mono text-sm`} />,
    code: CodeComponent,
    hr: props => <hr {...props} className={`${props.className || ''} my-8`} />,
    CodeBlock,
    ChapterSuggestions,
    YouTube,
    Remember,
    Warning,
    Sponsors,
    Caption,
    Link,
    Row,
    Column,
    Figure,
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
    Profile
  }
}

function CodeComponent({ children, className = '', metastring = '', ...rest }) {
  let caption
  const meta = metastring.split(/([\w]+=[\w\d\s\-_:><.]+)/) || []
  meta.forEach(str => {
    const params = new URLSearchParams(str)
    caption = params.get('caption') || ''
    if (caption.startsWith("'") && caption.endsWith("'")) caption = caption.substring(1, caption.length - 1)
  })
  const maybeLanguage = className.match(/language\-([\w\d\-_]+)/)
  const language = maybeLanguage && maybeLanguage.length >= 2 ? maybeLanguage[1] : undefined;

  if (language === 'mermaid') {
    return (
      <MermaidDiagram graph={children} />
    )
  }

  return (
    <CodeBlock {...rest} caption={caption} className={`${className || ''} rounded`} language={language} showLineNumbers={children.split('\n').length > 2}>
      {children}
    </CodeBlock>
  )
}

let currentId = 0;
const uuid = () => `mermaid-${(currentId++).toString()}`;

function MermaidDiagram({ graph }) {
  const [svg, setSvg] = useState(null);

  useLayoutEffect(() => {
    if (!graph) {
      return;
    }

    try {
      mermaid.mermaidAPI.render(uuid(), graph, renderedSvg => setSvg(renderedSvg));
    } catch (e) {
      setHtml(null)
      console.error(e);
    }
  }, [graph]);

  return svg ? <div dangerouslySetInnerHTML={{ __html: svg }} /> : null;
}

function initializeMermaid() {
  if (mermaidInitialized) {
    return;
  }

  mermaidInitialized = true;
  mermaid.initialize({
    startOnLoad: true,
    theme: "base",
    securityLevel: "loose",
    themeCSS: ``,
    themeVariables: {
      primaryColor: "#EDFAFF",
      primaryBorderColor: "#47BCEE",
      secondaryColor: "#F4EFFC",
      secondaryBorderColor: "#875AE2",
      fontFamily: "Inter, sans-serif",
      fontSize: "18px",
      primaryTextColor: "#242929",
      tertiaryColor: "#F7F9FA",
      tertiaryBorderColor: "#BFC6C7"
    }
  });
}
