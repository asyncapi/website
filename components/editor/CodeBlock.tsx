import React, { useState, useEffect } from 'react';

import dynamic from 'next/dynamic';
const Highlight = dynamic(() => import('react-syntax-highlighter'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 h-8 rounded" />
});

import Caption from '../Caption';
import IconClipboard from '../icons/Clipboard';

const languageModules = {
  yaml: () => import('react-syntax-highlighter/dist/esm/languages/hljs/yaml'),
  bash: () => import('react-syntax-highlighter/dist/esm/languages/hljs/bash'),
  javascript: () => import('react-syntax-highlighter/dist/esm/languages/hljs/javascript'),
  js: () => import('react-syntax-highlighter/dist/esm/languages/hljs/javascript'),
  json: () => import('react-syntax-highlighter/dist/esm/languages/hljs/json'),
  html: () => import('react-syntax-highlighter/dist/esm/languages/hljs/xml'),
  typescript: () => import('react-syntax-highlighter/dist/esm/languages/hljs/typescript'),
  ts: () => import('react-syntax-highlighter/dist/esm/languages/hljs/typescript'),
  python: () => import('react-syntax-highlighter/dist/esm/languages/hljs/python'),
  java: () => import('react-syntax-highlighter/dist/esm/languages/hljs/java'),
  cpp: () => import('react-syntax-highlighter/dist/esm/languages/hljs/cpp'),
  c: () => import('react-syntax-highlighter/dist/esm/languages/hljs/c'),
  csharp: () => import('react-syntax-highlighter/dist/esm/languages/hljs/csharp'),
  php: () => import('react-syntax-highlighter/dist/esm/languages/hljs/php'),
  ruby: () => import('react-syntax-highlighter/dist/esm/languages/hljs/ruby'),
  go: () => import('react-syntax-highlighter/dist/esm/languages/hljs/go'),
  rust: () => import('react-syntax-highlighter/dist/esm/languages/hljs/rust'),
  swift: () => import('react-syntax-highlighter/dist/esm/languages/hljs/swift'),
  kotlin: () => import('react-syntax-highlighter/dist/esm/languages/hljs/kotlin'),
  scala: () => import('react-syntax-highlighter/dist/esm/languages/hljs/scala'),
  clojure: () => import('react-syntax-highlighter/dist/esm/languages/hljs/clojure'),
  haskell: () => import('react-syntax-highlighter/dist/esm/languages/hljs/haskell'),
  elixir: () => import('react-syntax-highlighter/dist/esm/languages/hljs/elixir'),
  erlang: () => import('react-syntax-highlighter/dist/esm/languages/hljs/erlang'),
  perl: () => import('react-syntax-highlighter/dist/esm/languages/hljs/perl'),
  r: () => import('react-syntax-highlighter/dist/esm/languages/hljs/r'),
  sql: () => import('react-syntax-highlighter/dist/esm/languages/hljs/sql'),
  xml: () => import('react-syntax-highlighter/dist/esm/languages/hljs/xml'),
  css: () => import('react-syntax-highlighter/dist/esm/languages/hljs/css'),
  scss: () => import('react-syntax-highlighter/dist/esm/languages/hljs/scss'),
  less: () => import('react-syntax-highlighter/dist/esm/languages/hljs/less'),
  dockerfile: () => import('react-syntax-highlighter/dist/esm/languages/hljs/dockerfile'),
  shell: () => import('react-syntax-highlighter/dist/esm/languages/hljs/shell'),
  powershell: () => import('react-syntax-highlighter/dist/esm/languages/hljs/powershell'),
  vim: () => import('react-syntax-highlighter/dist/esm/languages/hljs/vim'),
  diff: () => import('react-syntax-highlighter/dist/esm/languages/hljs/diff'),
  text: () => import('react-syntax-highlighter/dist/esm/languages/hljs/plaintext'),
  plain: () => import('react-syntax-highlighter/dist/esm/languages/hljs/plaintext'),
};

interface CodeBlockProps {
  children?: string;
  codeBlocks?: { code: string; title?: string; language?: string }[];
  className?: string;
  highlightClassName?: string;
  highlightedLines?: number[];
  language?: string;
  hasWindow?: boolean;
  showCopy?: boolean;
  showCaption?: boolean;
  caption?: string;
  showLineNumbers?: boolean;
  startingLineNumber?: number;
  textSizeClassName?: string;
  title?: string;
}

interface Theme {
  [key: string]: {
    display?: string;
    background?: string;
    color?: string;
    fontWeight?: string | number;
    backgroundColor?: string;
    fontStyle?: string;
    textDecoration?: string;
  };
}

const theme: Theme = {
  hljs: {
    display: 'inline-block',
    background: '#252f3f',
    color: '#c0e2a3'
  },
  'hljs-subst': {
    color: '#d6deeb'
  },
  'hljs-selector-tag': {
    color: '#ff6363'
  },
  'hljs-selector-id': {
    color: '#fad430',
    fontWeight: 'bold'
  },
  'hljs-selector-class': {
    color: '#7edcda'
  },
  'hljs-selector-attr': {
    color: '#7edcda'
  },
  'hljs-selector-pseudo': {
    color: '#74e287'
  },
  'hljs-addition': {
    backgroundColor: 'rgba(163, 190, 140, 0.5)'
  },
  'hljs-deletion': {
    backgroundColor: 'rgba(191, 97, 106, 0.5)'
  },
  'hljs-built_in': {
    color: '#7edcda'
  },
  'hljs-type': {
    color: '#7edcda'
  },
  'hljs-class': {
    color: '#7edcda'
  },
  'hljs-function': {
    color: '#74e287'
  },
  'hljs-function > .hljs-title': {
    color: '#74e287'
  },
  'hljs-keyword': {
    color: '#64a0dc'
  },
  'hljs-literal': {
    color: '#64a0dc'
  },
  'hljs-symbol': {
    color: '#64a0dc'
  },
  'hljs-number': {
    color: '#d8da68'
  },
  'hljs-regexp': {
    color: '#EBCB8B'
  },
  'hljs-string': {
    color: '#c0e2a3',
    fontWeight: '500'
  },
  'hljs-title': {
    color: '#7edcda'
  },
  'hljs-params': {
    color: '#d6deeb'
  },
  'hljs-bullet': {
    color: '#64a0dc'
  },
  'hljs-code': {
    color: '#7edcda'
  },
  'hljs-emphasis': {
    fontStyle: 'italic'
  },
  'hljs-formula': {
    color: '#7edcda'
  },
  'hljs-strong': {
    fontWeight: 'bold'
  },
  'hljs-link:hover': {
    textDecoration: 'underline'
  },
  'hljs-quote': {
    color: '#797f8c'
  },
  'hljs-comment': {
    color: '#797f8c'
  },
  'hljs-doctag': {
    color: '#7edcda'
  },
  'hljs-$ref': {
    color: 'yellow'
  },
  'hljs-meta': {
    color: '#5E81AC'
  },
  'hljs-meta-keyword': {
    color: '#5E81AC'
  },
  'hljs-meta-string': {
    color: '#c0e2a3'
  },
  'hljs-attr': {
    color: '#7edcda'
  },
  'hljs-attribute': {
    color: '#d6deeb'
  },
  'hljs-builtin-name': {
    color: '#64a0dc'
  },
  'hljs-name': {
    color: '#64a0dc'
  },
  'hljs-section': {
    color: '#74e287'
  },
  'hljs-tag': {
    color: '#64a0dc'
  },
  'hljs-variable': {
    color: '#d6deeb'
  },
  'hljs-template-variable': {
    color: '#d6deeb'
  },
  'hljs-template-tag': {
    color: '#5E81AC'
  },
  'yaml .hljs-meta': {
    color: '#D08770'
  }
};

/**
 * @description This component displays code snippets with syntax highlighting.
 *
 * @param {CodeBlockProps} props - The component props.
 * @param {string} props.children - The code snippet to be displayed.
 * @param {Array<{ code: string; title?: string; language?: string }>} props.codeBlocks - An array of code blocks
 *  with optional titles and languages.
 * @param {string} props.className - Additional CSS class for styling the CodeBlock component.
 * @param {string} props.highlightClassName - Additional CSS class for styling the code highlighting area.
 * @param {number[]} props.highlightedLines - An array of line numbers to be highlighted.
 * @param {string} props.language - The programming language for syntax highlighting (default is 'yaml').
 * @param {boolean} props.hasWindow - Indicates whether window controls should be displayed.
 * @param {boolean} props.showCopy - Indicates whether the copy-to-clipboard button should be displayed.
 * @param {boolean} props.showCaption - Indicates whether the caption should be displayed.
 * @param {string} props.caption - The caption text to be displayed.
 * @param {boolean} props.showLineNumbers - Indicates whether line numbers should be displayed.
 * @param {number} props.startingLineNumber - The starting line number for line numbering.
 * @param {string} props.textSizeClassName - Additional CSS class for controlling the text size.
 * @param {string} props.title - The title of the code block (default is the specified language).
 */
export default function CodeBlock({
  children = '',
  codeBlocks,
  className = '',
  highlightClassName = '',
  highlightedLines,
  language = 'yaml',
  hasWindow = false,
  showCopy = true,
  showCaption = true,
  caption = '',
  showLineNumbers = true,
  startingLineNumber = 1,
  textSizeClassName = 'text-xs'
}: CodeBlockProps): React.ReactNode {
  const [activeBlock, setActiveBlock] = useState<number>(0);
  const [showIsCopied, setShowIsCopied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedLanguages, setLoadedLanguages] = useState<Set<string>>(new Set());
  // eslint-disable-next-line no-param-reassign
  codeBlocks = codeBlocks && codeBlocks.length ? codeBlocks : [{ code: children.replace(/\n$/, '') }];

  useEffect(() => {
    const loadLanguage = async (lang: string) => {
      if (loadedLanguages.has(lang) || !(lang in languageModules)) return;
      
      try {
        await languageModules[lang as keyof typeof languageModules]();
        setLoadedLanguages(prev => new Set([...prev, lang]));
      } catch (error) {
        console.warn(`Failed to load language: ${lang}`, error);
      }
    };

    const currentLanguage = codeBlocks && codeBlocks[activeBlock].language 
      ? codeBlocks[activeBlock].language 
      : language;

    loadLanguage(currentLanguage).finally(() => setIsLoading(false));
  }, [activeBlock, language, loadedLanguages]);



  const tabItemsCommonClassNames =
    'inline-block border-teal-300 py-1 px-2 mx-px cursor-pointer hover:text-teal-300 font-bold';
  const tabItemsClassNames = `${tabItemsCommonClassNames} text-gray-300`;
  const tabItemsActiveClassNames = `${tabItemsCommonClassNames} text-teal-300 border-b-2`;

  /**
   * @description This function handles the copy button click event by copying the active code block to the clipboard.
   */

  
  function onClickCopy() {
    // check if navigator with clipboard exists (fallback for older browsers)
    if (navigator && navigator.clipboard && codeBlocks && codeBlocks[activeBlock]) {
      navigator.clipboard.writeText(codeBlocks[activeBlock].code).then(() => {
        setShowIsCopied(true);
        setTimeout(() => {
          setShowIsCopied(false);
        }, 2000);
      });
    }
  }

  /**
   * @description This function renders the syntax-highlighted code blocks.
   */
  function renderHighlight() {

    if (isLoading) {
      return (
        <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
          <div className="text-gray-500">Loading syntax highlighting...</div>
        </div>
      );
    }

    return (
      <div className='h-full max-h-screen'>
        {codeBlocks && codeBlocks.length > 1 && (
          <div className='pb-3 pl-1 pt-0 text-xs'>
            <nav>
              <ul>
                {codeBlocks?.map((block, index) => (
                  <li
                    key={index}
                    className={activeBlock === index ? tabItemsActiveClassNames : tabItemsClassNames}
                    onClick={() => setActiveBlock(index)}
                  >
                    {block.title || block.language}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}

        <div className={`relative overflow-y-auto pr-8 ${highlightClassName}`}>
          <Highlight
            className={`pb-2 pt-px text-sm font-medium font-ligatures-contextual
              ${showLineNumbers ? 'ml-0' : 'ml-3'} ${textSizeClassName}`}
            language={codeBlocks && codeBlocks[activeBlock].language ? codeBlocks[activeBlock].language : language}
            style={theme}
            showLineNumbers={showLineNumbers}
            startingLineNumber={startingLineNumber}
            lineNumberContainerStyle={{
              paddingLeft: '0.5em',
              background: '#252f3f'
            }}
            lineNumberStyle={(lineNumber: number) => {
              const isHighlighted = highlightedLines?.includes(lineNumber);

              const styles: React.CSSProperties = {
                display: 'inline-block',
                marginLeft: '16px',
                paddingRight: '16px',
                backgroundColor: isHighlighted ? '#3e4d64' : '#252f3f',
                color: isHighlighted ? '#A3ACAD' : '#8B9394'
              };

              return styles;
            }}
            wrapLines={true}
            lineProps={(lineNumber: number) => {
              const isHighlighted = highlightedLines?.includes(lineNumber);

              const style: React.CSSProperties = {
                paddingRight: '2rem'
              };

              if (isHighlighted) {
                style.display = 'block';
                style.width = '100%';
                style.backgroundColor = '#3e4d64';
              }

              return {
                style
              };
            }}
            codeTagProps={{
              className: 'mr-8'
            }}
          >
            {codeBlocks ? [codeBlocks[activeBlock].code] : ''}
          </Highlight>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`relative z-10 my-8 max-w-full overflow-auto rounded bg-code-editor-dark pt-2 ${className}`}>
        {hasWindow && (
          <div className='pb-2 pl-4'>
            <span className='mr-2 inline-block size-2.5 rounded-full bg-mac-window-close'></span>
            <span className='mr-2 inline-block size-2.5 rounded-full bg-mac-window-minimize'></span>
            <span className='mr-2 inline-block size-2.5 rounded-full bg-mac-window-maximize'></span>
          </div>
        )}
        {showCopy && (
          <div className='z-10'>
            <button
              onClick={onClickCopy}
              className='absolute right-2 top-1 z-50 cursor-pointer bg-code-editor-dark text-xs
                text-gray-500 hover:text-gray-300 focus:outline-none'
              title='Copy to clipboard'
              data-test='copy-button'
            >
              {showIsCopied && (
                <span className='mr-2 inline-block pl-2 pt-1' data-testid='clicked-text'>
                  Copied!
                </span>
              )}
              <span className='inline-block pt-1'>
                <IconClipboard className='-mt-0.5 inline-block size-4' />
              </span>
            </button>
          </div>
        )}
        {renderHighlight()}
      </div>
      {showCaption && caption && <Caption>{caption}</Caption>}
    </>
  );
}
