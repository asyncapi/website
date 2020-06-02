import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types';
import Editor, { monaco } from '@monaco-editor/react'
import { debounce } from 'lodash'

let editor
let Monaco

const renderHighlightedLines = (highlightedLines) => {
  return renderHighlightedRanges(highlightedLines.map(lineNumber => ({
    startLine: lineNumber,
    startCol: 0,
    endLine: lineNumber,
    endCol: 0,
    options: {
      isWholeLine: true,
    }
  })))
}

const renderHighlightedRanges = (highlightedRanges) => {
  return editor.deltaDecorations(editor.getModel().getAllDecorations(), highlightedRanges.map(range => ({
    range: new Monaco.Range(range.startLine, range.startCol, range.endLine, range.endCol),
    options: {
      className: 'bg-code-editor-dark-highlight',
      marginClassName: 'bg-code-editor-dark-highlight',
      ...range.options
    },
  })))
}

export default function MonacoEditorWrapper ({
  language,
  theme,
  onChange = () => {},
  value,
  highlightedLines = [],
  highlightedRanges = [],
  updateHighlightOnChange = false,
  options,
  editorDidMount,
  ...props
}) {
  const previousValue = useRef(value);
  const debouncedOnChange = debounce(onChange, 500)

  const handleEditorDidMount = (getValue, ed) => {
    editor = ed
    renderHighlightedLines(highlightedLines)
    renderHighlightedRanges(highlightedRanges)

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

  useEffect(() => {
    if (editor && updateHighlightOnChange) {
      renderHighlightedLines(highlightedLines)
      renderHighlightedRanges(highlightedRanges)
    }
  }, [highlightedLines, highlightedRanges])

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
