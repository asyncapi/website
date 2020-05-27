import { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types';
import Editor, { monaco } from '@monaco-editor/react'
import { debounce } from 'lodash'

let editor
let Monaco

const renderHighlightedLines = (highlightedLines) => {
  return editor.deltaDecorations(editor.getModel().getAllDecorations(), highlightedLines.map(lineNumber => ({
    range: new Monaco.Range(lineNumber, 0, lineNumber, 0),
    options: {
      isWholeLine: true,
      className: 'bg-code-editor-dark-highlight',
      marginClassName: 'bg-code-editor-dark-highlight'
    },
  })))
}

export default function MonacoEditorWrapper ({
  language,
  theme,
  onChange = () => {},
  value,
  highlightedLines = [],
  options,
  editorDidMount,
  ...props
}) {
  // Render on the browser only
  if (typeof navigator === 'undefined') return null

  const previousValue = useRef(value);
  const debouncedOnChange = debounce(onChange, 500)

  const handleEditorDidMount = (getValue, ed) => {
    editor = ed
    renderHighlightedLines(highlightedLines)

    editor.onDidChangeModelContent(ev => {
      const currentValue = editor.getValue()
      if (currentValue !== previousValue.current) {
        previousValue.current = currentValue
        const value = debouncedOnChange(ev, currentValue)

        if (typeof value === 'string') {
          if (currentValue !== value) {
            editor.setValue(value)
          }
        }
      }
    });

    editorDidMount(getValue, editor)
  }

  useEffect(() => {
    monaco
      .init()
      .then(monacoInstance => {
        Monaco = monacoInstance
        monacoInstance.editor.defineTheme('asyncapi-theme', {
          base: 'vs-dark',
          inherit: true,
          rules: [],
          colors: {
            'editor.background': '#252f3f',
          },
        })
      })
      .catch(console.error)
  }, [])

  return (
    <Editor
      editorDidMount={handleEditorDidMount}
      language={language}
      theme={theme}
      value={value}
      options={options}
      {...props}
    />
  )
}

MonacoEditorWrapper.propTypes = {
  value: PropTypes.string,
  editorDidMount: PropTypes.func,
  onChange: PropTypes.func,
};

MonacoEditorWrapper.defaultProps = {
  editorDidMount: () => {},
  onChange: () => {},
};
