import MonacoEditorWrapper from "./MonacoEditorWrapper";

export default function CodeBlock({
  children,
  className = '',
  highlightedLines = [],
  language,
  autoHeight = false,
}) {
  const code = children.replace(/\n$/, '')

  let lineCount
  if (autoHeight) {
    lineCount = (code.match(/\n/g) || []).length + 1
  }

  if (!language) {
    const maybeLanguage = className.match(/language\-([\w]+)/)
    language = maybeLanguage && maybeLanguage.length >= 2 ? maybeLanguage[1] : 'yaml'
  }

  return (
    <div className={`${className} rounded overflow-hidden py-2 bg-code-editor-dark`} style={lineCount && { height: `calc(${lineCount * 18}px + 1rem)` }}>
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
          matchBrackets: 'never',
        }}
        highlightedLines={highlightedLines}
      />
    </div>
  )
}