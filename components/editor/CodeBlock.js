import { useState } from 'react'
import IconClipboard from '../icons/Clipboard'
import MonacoEditorWrapper from "./MonacoEditorWrapper"

export default function CodeBlock({
  children,
  className = '',
  highlightedLines,
  highlightedRanges,
  language,
  autoHeight = true,
  hasWindow = false,
  showCopy = true,
  showLineNumbers = true,
}) {
  const [showIsCopied, setShowIsCopied] = useState(false)

  const code = children.replace(/\n$/, '')

  let lineCount
  if (autoHeight) {
    lineCount = (code.match(/\n/g) || []).length + 1
  }

  if (!language) {
    const maybeLanguage = className.match(/language\-([\w]+)/)
    language = maybeLanguage && maybeLanguage.length >= 2 ? maybeLanguage[1] : 'yaml'
  }

  function onClickCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setShowIsCopied(true)
      setTimeout(() => {
        setShowIsCopied(false)
      }, 2000)
    })
  }

  return (
    <div className={`${className} relative rounded overflow-hidden py-2 bg-code-editor-dark`} style={lineCount && { height: `calc(${lineCount * 18}px + 1rem${hasWindow ? ' + 32px' : ''})` }}>
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
      <MonacoEditorWrapper
        value={code}
        theme="asyncapi-theme"
        language={language}
        options={{
          readOnly: true,
          minimap: {
            enabled: false,
          },
          scrollBeyondLastLine: false,
          contextmenu: false,
          scrollbar: {
            alwaysConsumeMouseWheel: false,
          },
          hideCursorInOverviewRuler: true,
          occurrencesHighlight: false,
          matchBrackets: 'never',
          ...(!showLineNumbers && {
            lineNumbers: 'off',
            glyphMargin: false,
            folding: false,
          }),
          parameterHints: {
            enabled: false,
          },
          quickSuggestions: {
            comments: false,
            other: false,
            strings: false,
          },
          snippetSuggestions: 'none'
        }}
        highlightedLines={highlightedLines}
        highlightedRanges={highlightedRanges}
        updateHighlightOnChange={true}
      />
    </div>
  )
}