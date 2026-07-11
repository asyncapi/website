import { Highlight } from 'prism-react-renderer';
import React from 'react';

const prismLightTheme = {
  plain: {
    color: '#393A34',
    backgroundColor: '#ffffff',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: '#999988', fontStyle: 'italic' as const },
    },
    {
      types: ['namespace'],
      style: { opacity: 0.7 },
    },
    {
      types: ['string', 'attr-value'],
      style: { color: '#669900' },
    },
    {
      types: ['punctuation', 'operator'],
      style: { color: '#393A34' },
    },
    {
      types: [
        'entity',
        'url',
        'symbol',
        'number',
        'boolean',
        'variable',
        'constant',
        'regex',
        'inserted',
      ],
      style: { color: '#36acaa' },
    },
    {
      types: ['atrule', 'keyword', 'attr-name', 'selector'],
      style: { color: '#00a4db' },
    },
    {
      types: ['function', 'deleted', 'tag'],
      style: { color: '#d73a49' },
    },
    {
      types: ['function-variable'],
      style: { color: '#6f42c1' },
    },
    {
      types: ['tag', 'selector', 'keyword'],
      style: { color: '#00009f' },
    },
    {
      types: ['property'],
      style: { color: '#990055' },
    },
  ],
};

interface SyntaxHighlighterProps {
  /** Programming language (Schyma always passes 'json') */
  language?: string;

  /** Theme/style object — ignored in this shim; we use our own theme */
  style?: Record<string, unknown>;

  /** Inline style overrides applied to the outer <pre> */
  customStyle?: React.CSSProperties;

  /** Whether to render line numbers */
  showLineNumbers?: boolean;

  /** The code string to highlight */
  children?: string;
}

/**
 * @description Lightweight syntax highlighting component that replaces react-syntax-highlighter.
 * Acts as a shim backed by prism-react-renderer to reduce bundle size.
 */
function SyntaxHighlighter({
  language = 'json',
  customStyle = {},
  showLineNumbers = false,
  children = '',
}: Readonly<SyntaxHighlighterProps>) {
  return (
    <Highlight theme={prismLightTheme} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{ ...style, ...customStyle, overflowX: 'auto' }}
        >
          {tokens.map((line, i) => (
            <div
              key={`line-${i}-${line[0]?.content || ''}`}
              {...getLineProps({ line })}
            >
              {showLineNumbers && (
                <span
                  style={{
                    display: 'inline-block',
                    width: '2em',
                    textAlign: 'right',
                    paddingRight: '1em',
                    userSelect: 'none',
                    opacity: 0.5,
                    color: '#999',
                  }}
                >
                  {i + 1}
                </span>
              )}
              {line.map((token, tokenIndex) => (
                <span
                  key={`token-${tokenIndex}-${token.content}`}
                  {...getTokenProps({ token })}
                />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

export { SyntaxHighlighter as Prism };
export { prismLightTheme as prism };

export default SyntaxHighlighter;
