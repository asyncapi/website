import { useState } from 'react'
import IconClipboard from '../icons/Clipboard'
import Highlight from 'react-syntax-highlighter'

export default function CodeBlock({
  children,
  className = '',
  highlightedLines,
  language = 'yaml',
  hasWindow = false,
  showCopy = true,
  showLineNumbers = true,
  startingLineNumber = 1,
}) {
  const [showIsCopied, setShowIsCopied] = useState(false)
  const code = children.replace(/\n$/, '')

  function onClickCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setShowIsCopied(true)
      setTimeout(() => {
        setShowIsCopied(false)
      }, 2000)
    })
  }

  function renderHighlight() {
    return (
      <div className="pr-8">
        <Highlight
          className="pl-2 pr-4 pt-px pb-0 text-xs"
          language={language}
          style={theme}
          showLineNumbers={showLineNumbers}
          startingLineNumber={startingLineNumber}
          lineNumberContainerProps={{
            className: 'pl-0 pr-2 float-left',
            style: {},
          }}
          lineNumberProps={lineNumber => {
            const isHighlighted = highlightedLines && highlightedLines.includes(lineNumber)
            return {
              className: `${isHighlighted ? 'bg-code-editor-dark-highlight text-gray-500' : 'text-gray-600'} block pl-2`
            }
          }}
          wrapLines={true}
          lineProps={lineNumber => {
            if (highlightedLines && highlightedLines.includes(lineNumber)) return {
              className: 'bg-code-editor-dark-highlight block ml-4',
            }
          }}
        >
          {code}  
        </Highlight>
      </div>
    )
  }

  return (
    <div className={`${className} relative rounded overflow-hidden py-2 bg-code-editor-dark`}>
      { hasWindow && (
        <div className="pl-4 pb-2">
          <span className="inline-block rounded-full w-2.5 h-2.5 bg-mac-window-close mr-2"></span>
          <span className="inline-block rounded-full w-2.5 h-2.5 bg-mac-window-minimize mr-2"></span>
          <span className="inline-block rounded-full w-2.5 h-2.5 bg-mac-window-maximize mr-2"></span>
        </div>
      ) }
      { showCopy && (<button onClick={onClickCopy} className="absolute z-50 text-xs text-gray-500 right-2 top-1 cursor-pointer hover:text-gray-300 focus:outline-none" title="Copy to clipboard">
        {showIsCopied && <span className="inline-block pt-1 mr-2">Copied!</span>}
        <span className="inline-block pt-1"><IconClipboard className="inline-block w-4 h-4 -mt-0.5" /></span>
      </button>) }
      { renderHighlight() }
    </div>
  )
}

const theme = {
  'hljs': {
    'display': 'block',
    'overflowX': 'auto',
    'background': '#252f3f',
    'color': '#d6deeb'
  },
  'hljs-subst': {
    'color': '#d6deeb'
  },
  'hljs-selector-tag': {
    'color': '#ff6363'
  },
  'hljs-selector-id': {
    'color': '#fad430',
    'fontWeight': 'bold'
  },
  'hljs-selector-class': {
    'color': '#7edcda',
    'fontWeight': 'bold',
  },
  'hljs-selector-attr': {
    'color': '#7edcda',
    'fontWeight': 'bold',
  },
  'hljs-selector-pseudo': {
    'color': '#88C0D0'
  },
  'hljs-addition': {
    'backgroundColor': 'rgba(163, 190, 140, 0.5)'
  },
  'hljs-deletion': {
    'backgroundColor': 'rgba(191, 97, 106, 0.5)'
  },
  'hljs-built_in': {
    'color': '#7edcda',
    'fontWeight': 'bold',
  },
  'hljs-type': {
    'color': '#7edcda',
    'fontWeight': 'bold',
  },
  'hljs-class': {
    'color': '#7edcda',
    'fontWeight': 'bold',
  },
  'hljs-function': {
    'color': '#88C0D0'
  },
  'hljs-function > .hljs-title': {
    'color': '#88C0D0'
  },
  'hljs-keyword': {
    'color': '#64a0dc',
    'fontWeight': 'bold',
  },
  'hljs-literal': {
    'color': '#64a0dc',
    'fontWeight': 'bold',
  },
  'hljs-symbol': {
    'color': '#64a0dc',
    'fontWeight': 'bold',
  },
  'hljs-number': {
    'color': '#B48EAD'
  },
  'hljs-regexp': {
    'color': '#EBCB8B'
  },
  'hljs-string': {
    'color': '#A3BE8C'
  },
  'hljs-title': {
    'color': '#7edcda',
    'fontWeight': 'bold',
  },
  'hljs-params': {
    'color': '#d6deeb'
  },
  'hljs-bullet': {
    'color': '#64a0dc',
    'fontWeight': 'bold',
  },
  'hljs-code': {
    'color': '#7edcda',
    'fontWeight': 'bold',
  },
  'hljs-emphasis': {
    'fontStyle': 'italic'
  },
  'hljs-formula': {
    'color': '#7edcda',
    'fontWeight': 'bold',
  },
  'hljs-strong': {
    'fontWeight': 'bold'
  },
  'hljs-link:hover': {
    'textDecoration': 'underline'
  },
  'hljs-quote': {
    'color': '#797f8c'
  },
  'hljs-comment': {
    'color': '#797f8c'
  },
  'hljs-doctag': {
    'color': '#7edcda',
    'fontWeight': 'bold',
  },
  'hljs-meta': {
    'color': '#5E81AC'
  },
  'hljs-meta-keyword': {
    'color': '#5E81AC'
  },
  'hljs-meta-string': {
    'color': '#A3BE8C'
  },
  'hljs-attr': {
    'color': '#7edcda',
    'fontWeight': 'bold',
  },
  'hljs-attribute': {
    'color': '#d6deeb'
  },
  'hljs-builtin-name': {
    'color': '#64a0dc',
    'fontWeight': 'bold',
  },
  'hljs-name': {
    'color': '#64a0dc',
    'fontWeight': 'bold',
  },
  'hljs-section': {
    'color': '#88C0D0'
  },
  'hljs-tag': {
    'color': '#64a0dc',
    'fontWeight': 'bold',
  },
  'hljs-variable': {
    'color': '#d6deeb'
  },
  'hljs-template-variable': {
    'color': '#d6deeb'
  },
  'hljs-template-tag': {
    'color': '#5E81AC'
  },
  'abnf .hljs-attribute': {
    'color': '#88C0D0'
  },
  'abnf .hljs-symbol': {
    'color': '#EBCB8B'
  },
  'apache .hljs-attribute': {
    'color': '#88C0D0'
  },
  'apache .hljs-section': {
    'color': '#64a0dc',
    'fontWeight': 'bold',
  },
  'arduino .hljs-built_in': {
    'color': '#88C0D0'
  },
  'aspectj .hljs-meta': {
    'color': '#D08770'
  },
  'aspectj > .hljs-title': {
    'color': '#88C0D0'
  },
  'bnf .hljs-attribute': {
    'color': '#7edcda',
    'fontWeight': 'bold',
  },
  'clojure .hljs-name': {
    'color': '#88C0D0'
  },
  'clojure .hljs-symbol': {
    'color': '#EBCB8B'
  },
  'coq .hljs-built_in': {
    'color': '#88C0D0'
  },
  'cpp .hljs-meta-string': {
    'color': '#7edcda',
    'fontWeight': 'bold',
  },
  'css .hljs-built_in': {
    'color': '#88C0D0'
  },
  'css .hljs-keyword': {
    'color': '#D08770'
  },
  'diff .hljs-meta': {
    'color': '#7edcda',
    'fontWeight': 'bold',
  },
  'ebnf .hljs-attribute': {
    'color': '#7edcda',
    'fontWeight': 'bold',
  },
  'glsl .hljs-built_in': {
    'color': '#88C0D0'
  },
  'groovy .hljs-meta:not(:first-child)': {
    'color': '#D08770'
  },
  'haxe .hljs-meta': {
    'color': '#D08770'
  },
  'java .hljs-meta': {
    'color': '#D08770'
  },
  'ldif .hljs-attribute': {
    'color': '#7edcda',
    'fontWeight': 'bold',
  },
  'lisp .hljs-name': {
    'color': '#88C0D0'
  },
  'lua .hljs-built_in': {
    'color': '#88C0D0'
  },
  'moonscript .hljs-built_in': {
    'color': '#88C0D0'
  },
  'nginx .hljs-attribute': {
    'color': '#88C0D0'
  },
  'nginx .hljs-section': {
    'color': '#5E81AC'
  },
  'pf .hljs-built_in': {
    'color': '#88C0D0'
  },
  'processing .hljs-built_in': {
    'color': '#88C0D0'
  },
  'scss .hljs-keyword': {
    'color': '#64a0dc',
    'fontWeight': 'bold',
  },
  'stylus .hljs-keyword': {
    'color': '#64a0dc',
    'fontWeight': 'bold',
  },
  'swift .hljs-meta': {
    'color': '#D08770'
  },
  'vim .hljs-built_in': {
    'color': '#88C0D0',
    'fontStyle': 'italic'
  },
  'yaml .hljs-meta': {
    'color': '#D08770'
  }
}