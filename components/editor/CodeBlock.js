import { useState } from 'react'
import Highlight from 'react-syntax-highlighter'
import lowlight, {  } from 'lowlight'
import IconClipboard from '../icons/Clipboard'
import Caption from '../Caption'

export default function CodeBlock({
  children,
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
  title = language
}) {
  const [activeBlock, setActiveBlock] = useState(0)
  const [showIsCopied, setShowIsCopied] = useState(false)
  codeBlocks = codeBlocks && codeBlocks.length ? codeBlocks : [{ code: children.replace(/\n$/, '') }]

  const tabItemsCommonClassNames = 'inline-block border-teal-300 py-1 px-2 mx-px cursor-pointer hover:text-teal-300 font-bold'
  const tabItemsClassNames = `${tabItemsCommonClassNames} text-gray-300`
  const tabItemsActiveClassNames = `${tabItemsCommonClassNames} text-teal-300 border-b-2`

  function onClickCopy() {
    // check if navigator with clipboard exists (fallback for older browsers) 
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(codeBlocks[activeBlock].code).then(() => {
        setShowIsCopied(true)
        setTimeout(() => {
          setShowIsCopied(false)
        }, 2000);
      })
    }
  }

  function renderHighlight() {
    return (
      <div className="h-full max-h-screen">
        {codeBlocks.length > 1 && (
          <div className="text-xs pb-3 pt-0 pl-1">
            <nav>
              <ul>
                {
                  codeBlocks.map((block, index) => (
                    <li key={index} className={activeBlock === index ? tabItemsActiveClassNames : tabItemsClassNames} onClick={() => setActiveBlock(index)}>{block.title ? block.title : block.language}</li>
                  ))
                }
              </ul>
            </nav>
          </div>
        )}
        <div className={`pr-8 relative overflow-y-auto ${highlightClassName}`}>
          <Highlight
            className={`pt-px pb-2 text-sm font-medium font-ligatures-contextual ${showLineNumbers ? 'ml-0' : 'ml-3'} ${textSizeClassName}`}
            language={codeBlocks[activeBlock].language ? codeBlocks[activeBlock].language : language}
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
                className: `${isHighlighted ? 'bg-code-editor-dark-highlight block ml-10 w-full' : ''} pr-8`,
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
    <>
      <div className={`relative max-w-full rounded overflow-y-auto overflow-x-auto pt-2 bg-code-editor-dark z-10 my-8 ${className}`}>
        {hasWindow && (
          <div className="pl-4 pb-2">
            <span className="inline-block rounded-full w-2.5 h-2.5 bg-mac-window-close mr-2"></span>
            <span className="inline-block rounded-full w-2.5 h-2.5 bg-mac-window-minimize mr-2"></span>
            <span className="inline-block rounded-full w-2.5 h-2.5 bg-mac-window-maximize mr-2"></span>
          </div>
        )}
        {
          showCopy && (
            <div className="z-10">
              <button onClick={onClickCopy} className="absolute bg-code-editor-dark z-50 text-xs text-gray-500 right-2 top-1 cursor-pointer hover:text-gray-300 focus:outline-none" title="Copy to clipboard">
                {showIsCopied && <span className="inline-block pl-2 pt-1 mr-2">Copied!</span>}
                <span className="inline-block pt-1"><IconClipboard className="inline-block w-4 h-4 -mt-0.5" /></span>
              </button>
            </div>
          )
        }
        {renderHighlight()}
      </div>
      { showCaption && caption && (
        <Caption>{caption}</Caption>
      )}
    </>
  )
}

const theme = {
  'hljs': {
    'display': 'inline-block',
    'background': '#252f3f',
    'color': '#c0e2a3'
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
  'hljs-$ref': {
    'color': 'yellow'
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

lowlight.registerLanguage('asyncapi+yaml', hljs => {
  const LITERALS = 'true false yes no null'

  // YAML spec allows non-reserved URI characters in tags.
  const URI_CHARACTERS = '[\\w#/?:@&=+$,.~*\\\'()[\\]]+'

  // Define keys as starting with a word character
  // ...containing word chars, spaces, colons, forward-slashes, hyphens and periods
  // ...and ending with a colon followed immediately by a space, tab or newline.
  // The YAML spec allows for much more than this, but this covers most use-cases.
  const KEY = {
    className: 'attr',
    variants: [
      { begin: '\\w[\\w :\\/.-]*:(?=[ \t]|$)' },
      { begin: '"\\w[\\w :\\/.-]*":(?=[ \t]|$)' }, // double quoted keys
      { begin: '\'\\w[\\w :\\/.-]*\':(?=[ \t]|$)' } // single quoted keys
    ]
  }

  const $REF_KEY = {
    className: '$ref',
    variants: [
      { begin: '\\$\\w[\\w :\\/.-]*:(?=[ \t]|$)' },
      { begin: '"\\$\\w[\\w :\\/.-]*":(?=[ \t]|$)' }, // double quoted keys
      { begin: '\'\\$\\w[\\w :\\/.-]*\':(?=[ \t]|$)' } // single quoted keys
    ]
  }

  const TEMPLATE_VARIABLES = {
    className: 'template-variable',
    variants: [
      { begin: '{{', end: '}}' }, // jinja templates Ansible
      { begin: '%{', end: '}' } // Ruby i18n
    ]
  }
  const STRING = {
    className: 'string',
    relevance: 0,
    variants: [
      { begin: /'/, end: /'/ },
      { begin: /"/, end: /"/ },
      { begin: /\S+/ }
    ],
    contains: [
      hljs.BACKSLASH_ESCAPE,
      TEMPLATE_VARIABLES
    ]
  }

  // Strings inside of value containers (objects) can't contain braces,
  // brackets, or commas
  const CONTAINER_STRING = hljs.inherit(STRING, {
    variants: [
      { begin: /'/, end: /'/ },
      { begin: /"/, end: /"/ },
      { begin: /[^\s,{}[\]]+/ }
    ]
  })

  const DATE_RE = '[0-9]{4}(-[0-9][0-9]){0,2}'
  const TIME_RE = '([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?'
  const FRACTION_RE = '(\\.[0-9]*)?'
  const ZONE_RE = '([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?'
  const TIMESTAMP = {
    className: 'number',
    begin: '\\b' + DATE_RE + TIME_RE + FRACTION_RE + ZONE_RE + '\\b'
  }

  const VALUE_CONTAINER = {
    end: ',',
    endsWithParent: true,
    excludeEnd: true,
    contains: [],
    keywords: LITERALS,
    relevance: 0
  }
  const OBJECT = {
    begin: '{',
    end: '}',
    contains: [VALUE_CONTAINER],
    illegal: '\\n',
    relevance: 0
  }
  const ARRAY = {
    begin: '\\[',
    end: '\\]',
    contains: [VALUE_CONTAINER],
    illegal: '\\n',
    relevance: 0
  }

  const MODES = [
    KEY,
    $REF_KEY,
    {
      className: 'meta',
      begin: '^---\s*$',
      relevance: 10
    },
    { // multi line string
      // Blocks start with a | or > followed by a newline
      //
      // Indentation of subsequent lines must be the same to
      // be considered part of the block
      className: 'string',
      begin: '[\\|>]([0-9]?[+-])?[ ]*\\n( *)[\\S ]+\\n(\\2[\\S ]+\\n?)*'
    },
    { // Ruby/Rails erb
      begin: '<%[%=-]?',
      end: '[%-]?%>',
      subLanguage: 'ruby',
      excludeBegin: true,
      excludeEnd: true,
      relevance: 0
    },
    { // named tags
      className: 'type',
      begin: '!\\w+!' + URI_CHARACTERS
    },
    // https://yaml.org/spec/1.2/spec.html#id2784064
    { // verbatim tags
      className: 'type',
      begin: '!<' + URI_CHARACTERS + ">"
    },
    { // primary tags
      className: 'type',
      begin: '!' + URI_CHARACTERS
    },
    { // secondary tags
      className: 'type',
      begin: '!!' + URI_CHARACTERS
    },
    { // fragment id &ref
      className: 'meta',
      begin: '&' + hljs.UNDERSCORE_IDENT_RE + '$'
    },
    { // fragment reference *ref
      className: 'meta',
      begin: '\\*' + hljs.UNDERSCORE_IDENT_RE + '$'
    },
    { // array listing
      className: 'bullet',
      // TODO: remove |$ hack when we have proper look-ahead support
      begin: '\\-(?=[ ]|$)',
      relevance: 0
    },
    hljs.HASH_COMMENT_MODE,
    {
      beginKeywords: LITERALS,
      keywords: { literal: LITERALS }
    },
    TIMESTAMP,
    // numbers are any valid C-style number that
    // sit isolated from other words
    {
      className: 'number',
      begin: hljs.C_NUMBER_RE + '\\b'
    },
    OBJECT,
    ARRAY,
    STRING
  ]

  const VALUE_MODES = [...MODES]
  VALUE_MODES.pop()
  VALUE_MODES.push(CONTAINER_STRING)
  VALUE_CONTAINER.contains = VALUE_MODES

  return {
    name: 'asyncapi+yaml',
    aliases: ['asyncapi'],
    case_insensitive: true,
    contains: MODES
  }
})

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
