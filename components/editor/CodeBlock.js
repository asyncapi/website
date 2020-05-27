import MonacoEditorWrapper from "./MonacoEditorWrapper";

export default function CodeBlock({ children, className, highlightedLines = [], language = 'yaml' }) {
  return (
    <div className={`${className} rounded overflow-hidden py-2 bg-code-editor-dark`}>
      <MonacoEditorWrapper
        value={children}
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
        }}
        highlightedLines={highlightedLines}
      />
    </div>
  )
}