import { CheckIcon } from '@heroicons/react/24/outline';
import {
  Highlight,
  type Language,
  type PrismTheme,
  type Token,
} from 'prism-react-renderer';
import React, { useState } from 'react';

import Caption from '../Caption';
import IconClipboard from '../icons/Clipboard';

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
}

/** Maps common language aliases/unsupported identifiers to valid Prism language keys. */
const LANGUAGE_ALIASES: Record<string, string> = {
  yml: 'yaml',
  sh: 'bash',
  shell: 'bash',
  js: 'javascript',
  ts: 'typescript',
  py: 'python',
  rb: 'ruby',
  asyncapi: 'yaml',
  'generator-cli': 'bash',
  mermaid: 'plaintext',
  npm: 'bash',
  docker: 'bash',
};

const SUPPORTED_LANGUAGES = new Set<string>([
  'markup',
  'bash',
  'clike',
  'c',
  'cpp',
  'css',
  'javascript',
  'jsx',
  'coffeescript',
  'actionscript',
  'css-extr',
  'diff',
  'git',
  'go',
  'graphql',
  'handlebars',
  'json',
  'less',
  'makefile',
  'markdown',
  'objectivec',
  'ocaml',
  'python',
  'reason',
  'sass',
  'scss',
  'sql',
  'stylus',
  'tsx',
  'typescript',
  'wasm',
  'yaml',
  'plaintext',
  'ruby',
]);

/**
 * @description Normalizes a raw language string to a Prism-supported language key.
 * Falls back to 'plaintext' for unrecognized or missing languages.
 *
 * @param {string | undefined} lang - Raw language identifier from the code fence.
 * @returns {Language} A valid prism-react-renderer Language.
 */
function normalizeLanguage(lang?: string): Language {
  if (!lang) return 'plaintext' as Language;
  const lower = lang.toLowerCase();
  const mapped = LANGUAGE_ALIASES[lower] || lower;

  return (SUPPORTED_LANGUAGES.has(mapped) ? mapped : 'plaintext') as Language;
}

const customTheme: PrismTheme = {
  plain: {
    color: '#c0e2a3',
    backgroundColor: '#252f3f',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: '#797f8c' },
    },
    {
      types: ['punctuation'],
      style: { color: '#d6deeb' },
    },
    {
      types: [
        'property',
        'tag',
        'boolean',
        'number',
        'constant',
        'symbol',
        'deleted',
      ],
      style: { color: '#64a0dc' },
    },
    {
      types: ['selector', 'attr-name', 'string', 'char', 'builtin', 'inserted'],
      style: { color: '#c0e2a3', fontWeight: '500' as const },
    },
    {
      types: ['operator', 'entity', 'url', 'variable'],
      style: { color: '#d6deeb' },
    },
    {
      types: ['atrule', 'attr-value', 'function', 'class-name'],
      style: { color: '#74e287' },
    },
    {
      types: ['keyword'],
      style: { color: '#7edcda' },
    },
    {
      types: ['regex', 'important'],
      style: { color: '#ff6363', fontWeight: 'bold' as const },
    },
    {
      types: ['important', 'bold'],
      style: { fontWeight: 'bold' as const },
    },
    {
      types: ['italic'],
      style: { fontStyle: 'italic' as const },
    },
    {
      types: ['namespace'],
      style: { color: '#797f8c', opacity: 0.7 },
    },
  ],
};

interface CodeLineProps {
  line: Token[];
  lineIndex: number;
  startingLineNumber: number;
  highlightedLines?: number[];
  showLineNumbers: boolean;
  getLineProps: (input: { line: Token[] }) => Record<string, unknown>;
  getTokenProps: (input: { token: Token }) => Record<string, unknown>;
}

/**
 * @description Renders a single highlighted line of code with an optional line number and highlight.
 * Extracted as a named component to satisfy SonarCloud S2004 (max nesting depth).
 *
 * @param {CodeLineProps} props - The props for the CodeLine component.
 */
function CodeLine({
  line,
  lineIndex,
  startingLineNumber,
  highlightedLines,
  showLineNumbers,
  getLineProps,
  getTokenProps,
}: Readonly<CodeLineProps>) {
  const lineNumber = lineIndex + startingLineNumber;
  const isHighlighted = highlightedLines?.includes(lineNumber) ?? false;

  return (
    <div
      {...getLineProps({ line })}
      style={{
        display: 'block',
        paddingRight: '2rem',
        backgroundColor: isHighlighted ? '#3e4d64' : 'transparent',
      }}
    >
      {showLineNumbers && (
        <span
          style={{
            display: 'inline-block',
            marginLeft: '16px',
            paddingRight: '16px',
            minWidth: '2em',
            textAlign: 'right',
            userSelect: 'none',
            backgroundColor: isHighlighted ? '#3e4d64' : '#252f3f',
            color: isHighlighted ? '#A3ACAD' : '#8B9394',
          }}
        >
          {lineNumber}
        </span>
      )}
      {line.map((token, tokenIndex) => (
        <span
          key={`token-${tokenIndex}-${token.content}`}
          {...getTokenProps({ token })}
        />
      ))}
    </div>
  );
}

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
  textSizeClassName = 'text-xs',
}: CodeBlockProps): React.ReactNode {
  const [activeBlock, setActiveBlock] = useState<number>(0);
  const [showIsCopied, setShowIsCopied] = useState<boolean>(false);

  const resolvedBlocks = codeBlocks?.length
    ? codeBlocks
    : [{ code: children.replace(/\n$/, '') }];

  const tabItemsCommonClassNames =
    'inline-block border-teal-300 py-1 px-2 mx-px cursor-pointer hover:text-teal-300 font-bold';
  const tabItemsClassNames = `${tabItemsCommonClassNames} text-gray-300`;
  const tabItemsActiveClassNames = `${tabItemsCommonClassNames} text-teal-300 border-b-2`;

  /**
   * @description Marks the copy action as successful and resets the state after 2 seconds.
   */
  function markCopied() {
    setShowIsCopied(true);
    setTimeout(() => setShowIsCopied(false), 2000);
  }

  /**
   * @description Handles the copy button click event by copying the active code block to the clipboard.
   */
  function onClickCopy() {
    const code = resolvedBlocks[activeBlock]?.code;

    if (!code || !navigator?.clipboard) return;
    navigator.clipboard
      .writeText(code)
      .then(markCopied)
      .catch(() => {});
  }

  /**
   * @description Renders the syntax-highlighted code blocks with optional tab navigation.
   */
  function renderHighlight() {
    const currentBlock = resolvedBlocks[activeBlock];
    const codeLanguage = currentBlock?.language || language;
    const codeContent = currentBlock?.code || '';

    return (
      <div className="h-full max-h-screen">
        {resolvedBlocks.length > 1 && (
          <div className="pb-3 pl-1 pt-0 text-xs">
            <nav>
              <ul>
                {resolvedBlocks.map((block, index) => (
                  <li
                    key={block.title || block.language || `tab-${index}`}
                    className={
                      activeBlock === index
                        ? tabItemsActiveClassNames
                        : tabItemsClassNames
                    }
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
            theme={customTheme}
            code={codeContent}
            language={normalizeLanguage(codeLanguage)}
          >
            {({
              className: codeClassName,
              style,
              tokens,
              getLineProps,
              getTokenProps,
            }) => (
              <pre
                className={`pb-2 pt-px font-medium font-ligatures-contextual mr-8
                  ${showLineNumbers ? 'ml-0' : 'ml-3'} ${textSizeClassName} ${codeClassName}`}
                style={style}
              >
                {tokens.map((line, i) => (
                  <CodeLine
                    key={`line-${i}-${line[0]?.content ?? ''}`}
                    line={line}
                    lineIndex={i}
                    startingLineNumber={startingLineNumber}
                    highlightedLines={highlightedLines}
                    showLineNumbers={showLineNumbers}
                    getLineProps={getLineProps}
                    getTokenProps={getTokenProps}
                  />
                ))}
              </pre>
            )}
          </Highlight>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`relative z-10 my-8 max-w-full overflow-auto rounded bg-code-editor-dark pt-2 ${className}`}
      >
        {hasWindow && (
          <div className="pb-2 pl-4">
            <span className="mr-2 inline-block size-2.5 rounded-full bg-mac-window-close" />
            <span className="mr-2 inline-block size-2.5 rounded-full bg-mac-window-minimize" />
            <span className="mr-2 inline-block size-2.5 rounded-full bg-mac-window-maximize" />
          </div>
        )}
        {showCopy && (
          <div className="z-10">
            <button
              onClick={onClickCopy}
              className="absolute right-2 top-1 z-50 cursor-pointer bg-code-editor-dark text-xs
                text-gray-500 hover:text-gray-300 focus:outline-none"
              title="Copy to clipboard"
              data-test="copy-button"
            >
              <output className="sr-only" aria-live="polite" aria-atomic="true">
                {showIsCopied ? 'Copied to clipboard' : ''}
              </output>
              <span
                className="relative inline-block mt-1 size-4"
                aria-hidden="true"
              >
                {showIsCopied ? (
                  <CheckIcon className="h-full w-full" />
                ) : (
                  <IconClipboard className="h-full w-full" />
                )}
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
