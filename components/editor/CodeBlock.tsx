import React, { useState, useEffect, useMemo } from 'react';
import { Highlight, themes,  } from "prism-react-renderer";
import Caption from '../Caption';
import IconClipboard from '../icons/Clipboard';

/**
 * NOTE: import only the prism languages you actually need below.
 * This avoids bundling every language.
 */
// import 'prismjs/components/prism-javascript';
// import 'prismjs/components/prism-jsx';
// import 'prismjs/components/prism-typescript';
// import 'prismjs/components/prism-tsx';
// import 'prismjs/components/prism-python';
// import 'prismjs/components/prism-java';
// import 'prismjs/components/prism-markup'; // html/xml
// import 'prismjs/components/prism-bash';
// import 'prismjs/components/prism-json';
// import 'prismjs/components/prism-css';
/* add more as required, e.g.
   import 'prismjs/components/prism-rust';
*/

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

  // default prop fallback
  codeBlocks = codeBlocks && codeBlocks.length ? codeBlocks : [{ code: children.replace(/\n$/, ''), language }];

  // Ensure language string maps to Prism known languages; fallback to plain text
  const currentLang = (codeBlocks && codeBlocks[activeBlock]?.language) || language || 'text';

  // Prepare code string
  const code = codeBlocks ? codeBlocks[activeBlock].code : '';

  // Provide a memoized numeric set of highlighted lines for fast lookup
  const highlightedSet = useMemo(() => new Set((highlightedLines || []).map(n => Number(n))), [highlightedLines]);

  async function onClickCopy() {
    if (navigator && navigator.clipboard) {
      await navigator.clipboard.writeText(code);
      setShowIsCopied(true);
      setTimeout(() => setShowIsCopied(false), 2000);
    }
  }

  const tabItemsCommonClassNames =
    'inline-block border-teal-300 py-1 px-2 mx-px cursor-pointer hover:text-teal-300 font-bold';
  const tabItemsClassNames = `${tabItemsCommonClassNames} text-gray-300`;
  const tabItemsActiveClassNames = `${tabItemsCommonClassNames} text-teal-300 border-b-2`;

  // Render tokens using prism-react-renderer
  function renderHighlight() {
    const activeCode = codeBlocks?.[activeBlock]?.code || "";
  
    return (
      <div className="h-full max-h-screen">
        {codeBlocks && codeBlocks.length > 1 && (
          <div className="pb-3 pl-1 pt-0 text-xs">
            <nav>
              <ul>
                {codeBlocks.map((block, index) => (
                  <li
                    key={index}
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
  
        <div
          className={`relative overflow-y-auto pr-8 bg-[#252f3f] rounded ${highlightClassName}`}
        >
          <Highlight
            theme={themes.nightOwl}
            code={activeCode.trimEnd()}
            language={
              codeBlocks && codeBlocks[activeBlock].language
                ? codeBlocks[activeBlock].language!
                : language
            }
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={`${className} pb-2 pt-px text-sm font-medium font-ligatures-contextual ${textSizeClassName}`}
                style={{
                  ...style,
                  backgroundColor: "#252f3f",
                  paddingLeft: "0.5em",
                  margin: 0,
                }}
              >
                {tokens.map((line, i) => {
                  const lineNumber = i + startingLineNumber;
                  const isHighlighted = highlightedLines?.includes(lineNumber);
  
                  return (
                    <div
                      key={i}
                      {...getLineProps({
                        line,
                        key: i,
                        style: {
                          display: "block",
                          backgroundColor: isHighlighted ? "#3e4d64" : undefined,
                          width: "100%",
                          paddingRight: "2rem",
                        },
                      })}
                    >
                      {showLineNumbers && (
                        <span
                          style={{
                            display: "inline-block",
                            width: "2em",
                            marginRight: "1em",
                            textAlign: "right",
                            color: isHighlighted ? "#A3ACAD" : "#8B9394",
                          }}
                        >
                          {lineNumber}
                        </span>
                      )}
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  );
                })}
              </pre>
            )}
          </Highlight>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <div className={`relative z-10 my-8 max-w-full overflow-auto rounded bg-code-editor-dark pt-2 ${className}`}>
        {hasWindow && (
          <div className="pb-2 pl-4">
            <span className="mr-2 inline-block size-2.5 rounded-full bg-mac-window-close"></span>
            <span className="mr-2 inline-block size-2.5 rounded-full bg-mac-window-minimize"></span>
            <span className="mr-2 inline-block size-2.5 rounded-full bg-mac-window-maximize"></span>
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
              {showIsCopied && (
                <span className="mr-2 inline-block pl-2 pt-1" data-testid="clicked-text">
                  Copied!
                </span>
              )}
              <span className="inline-block pt-1">
                <IconClipboard className="-mt-0.5 inline-block size-4" />
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
