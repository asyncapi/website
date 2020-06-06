import { useState } from 'react'
import Highlight from 'react-syntax-highlighter'
import lowlight from 'lowlight'
import IconClipboard from '../icons/Clipboard'

lowlight.registerLanguage('generator-cli', hljs => ({
  name: 'generator-cli',
  case_insensitive: true,
  contains: [
    {
      className: 'generator-command',
      begin: 'ag',
      end: /[^\\]{1}$/,
      contains: [
        {
          className: 'asyncapi-file',
          begin: / [\.\~\w\d_\/]+/,
          end: ' ',
          contains: [
            {
              className: 'generator-template',
              begin: / [\@\.\~\w\d\-_\/]+/,
              end: '-template',
              contains: [
                {
                  className: 'generator-param',
                  begin: /[\-]{1,2}[\w]+ [\$\{\}\/:\'\"\w\d\.\-_=]+/,
                },
              ]
            },
          ],
        },
        {
          className: 'generator-param',
          begin: /[\-]{1,2}[\w]+ [\$\{\}\/:\'\"\w\d\.\-_=]+/,
        },
      ]
    },
    {
      className: 'generator-docker-command',
      begin: 'docker',
      end: /[^\\]{1}$/,
      contains: [
        {
          className: 'asyncapi-file',
          begin: 'https://bit.ly/asyncapi',
        },
        {
          className: 'generator-template',
          begin: '@asyncapi/',
          end: '-template',
        },
        {
          className: 'generator-param',
          begin: /[\-]{1,2}[\w]+ [\$\{\}\/:\'\"\w\d\-_=]+/,
        },
      ]
    },
  ]
}))

export default function CodeBlock({
  children,
  codeBlocks,
  className = '',
  highlightedLines,
  language = 'yaml',
  hasWindow = false,
  showCopy = true,
  showLineNumbers = true,
  startingLineNumber = 1,
  textSizeClassName = 'text-xs',
}) {
  const [activeBlock, setActiveBlock] = useState(0)
  const [showIsCopied, setShowIsCopied] = useState(false)
  codeBlocks = codeBlocks && codeBlocks.length ? codeBlocks : [{ code: children.replace(/\n$/, '') }]

  const tabItemsCommonClassNames = 'inline-block border-teal-300 py-1 px-2 mx-px cursor-pointer hover:text-teal-300'
  const tabItemsClassNames = `${tabItemsCommonClassNames} text-gray-300`
  const tabItemsActiveClassNames = `${tabItemsCommonClassNames} text-teal-300 font-bold border-b-2`

  function onClickCopy() {
    navigator.clipboard.writeText(codeBlocks[activeBlock].code).then(() => {
      setShowIsCopied(true)
      setTimeout(() => {
        setShowIsCopied(false)
      }, 2000)
    })
  }

  function renderHighlight() {
    return (
      <div>
        {codeBlocks.length > 1 && (
          <div className="text-xs pb-3 pt-0 pl-1">
            <nav>
              <ul>
                {
                  codeBlocks.map((block, index) => (
                    <li key={index} className={activeBlock === index ? tabItemsActiveClassNames : tabItemsClassNames} onClick={() => setActiveBlock(index)}>{block.language}</li>
                  ))
                }
              </ul>
            </nav>
          </div>
        )}
        <div className="pr-8 relative overflow-y-auto">
          <Highlight
            className={`pt-px pb-0 text-sm font-medium font-ligatures-contextual ${showLineNumbers ? 'ml-0' : 'ml-3'} ${textSizeClassName}`}
            language={language}
            style={theme}
            showLineNumbers={showLineNumbers}
            startingLineNumber={startingLineNumber}
            lineNumberContainerProps={{
              className: 'pl-2 float-left left-0 sticky bg-code-editor-dark',
              style: {},
            }}
            lineNumberProps={lineNumber => {
              const isHighlighted = highlightedLines && highlightedLines.includes(lineNumber)
              return {
                className: `${isHighlighted ? 'bg-code-editor-dark-highlight text-gray-500' : 'text-gray-600'} block pl-2 pr-2`
              }
            }}
            wrapLines={true}
            lineProps={lineNumber => {
              const isHighlighted = highlightedLines && highlightedLines.includes(lineNumber)
              return {
                className: `${isHighlighted ? 'bg-code-editor-dark-highlight block ml-4' : ''} pr-8`,
              }
            }}
            codeTagProps={{
              className: 'mr-8'
            }}
          >
            {codeBlocks[activeBlock].code}
          </Highlight>
        </div>
      </div>
    )
  }

  return (
    <div className={`${className} relative max-w-full rounded overflow-y-hidden overflow-x-auto py-2 bg-code-editor-dark`}>
      {hasWindow && (
        <div className="pl-4 pb-2">
          <span className="inline-block rounded-full w-2.5 h-2.5 bg-mac-window-close mr-2"></span>
          <span className="inline-block rounded-full w-2.5 h-2.5 bg-mac-window-minimize mr-2"></span>
          <span className="inline-block rounded-full w-2.5 h-2.5 bg-mac-window-maximize mr-2"></span>
        </div>
      )}
      {
        showCopy && (
          <div className={`${ !showLineNumbers && codeBlocks[activeBlock].code.split('/n').length < 2 ? 'absolute top-0 bottom-0 right-0 pl-5 pr-2 bg-code-editor-dark z-50' : ''}`}>
            <button onClick={onClickCopy} className="absolute bg-code-editor-dark z-50 text-xs text-gray-500 right-2 top-1 cursor-pointer hover:text-gray-300 focus:outline-none" title="Copy to clipboard">
              {showIsCopied && <span className="inline-block pl-2 pt-1 mr-2">Copied!</span>}
              <span className="inline-block pt-1"><IconClipboard className="inline-block w-4 h-4 -mt-0.5" /></span>
            </button>
          </div>
        )
      }
      {renderHighlight()}
    </div>
  )
}

const theme = {
  'hljs': {
    'display': 'block',
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
  },
  'hljs-selector-attr': {
    'color': '#7edcda',
  },
  'hljs-selector-pseudo': {
    'color': '#74e287'
  },
  'hljs-addition': {
    'backgroundColor': 'rgba(163, 190, 140, 0.5)'
  },
  'hljs-deletion': {
    'backgroundColor': 'rgba(191, 97, 106, 0.5)'
  },
  'hljs-built_in': {
    'color': '#7edcda',
  },
  'hljs-type': {
    'color': '#7edcda',
  },
  'hljs-class': {
    'color': '#7edcda',
  },
  'hljs-function': {
    'color': '#74e287'
  },
  'hljs-function > .hljs-title': {
    'color': '#74e287'
  },
  'hljs-keyword': {
    'color': '#64a0dc',
  },
  'hljs-literal': {
    'color': '#64a0dc',
  },
  'hljs-symbol': {
    'color': '#64a0dc',
  },
  'hljs-number': {
    'color': '#d8da68',
  },
  'hljs-regexp': {
    'color': '#EBCB8B'
  },
  'hljs-string': {
    'color': '#c0e2a3',
    'fontWeight': '500',
  },
  'hljs-title': {
    'color': '#7edcda',
  },
  'hljs-params': {
    'color': '#d6deeb'
  },
  'hljs-bullet': {
    'color': '#64a0dc',
  },
  'hljs-code': {
    'color': '#7edcda',
  },
  'hljs-emphasis': {
    'fontStyle': 'italic'
  },
  'hljs-formula': {
    'color': '#7edcda',
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
  },
  'hljs-meta': {
    'color': '#5E81AC'
  },
  'hljs-meta-keyword': {
    'color': '#5E81AC'
  },
  'hljs-meta-string': {
    'color': '#c0e2a3'
  },
  'hljs-attr': {
    'color': '#7edcda',
  },
  'hljs-attribute': {
    'color': '#d6deeb'
  },
  'hljs-builtin-name': {
    'color': '#64a0dc',
  },
  'hljs-name': {
    'color': '#64a0dc',
  },
  'hljs-section': {
    'color': '#74e287'
  },
  'hljs-tag': {
    'color': '#64a0dc',
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
  'yaml .hljs-meta': {
    'color': '#D08770'
  },
}