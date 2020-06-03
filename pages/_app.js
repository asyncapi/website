import { MDXProvider } from "@mdx-js/react"
import YouTube from 'react-youtube-embed'
import Highlight from 'react-highlight'
import Layout from '../components/layout/Layout'
import Button from '../components/buttons/Button'
import ChapterSuggestions from '../components/buttons/ChapterSuggestions'
import CodeBlock from '../components/editor/CodeBlock'
import Remember from '../components/Remember'
import Warning from '../components/Warning'
import Sponsors from '../components/Sponsors'
import '../css/styles.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <MDXProvider components={getMDXComponents()}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MDXProvider>
  )
}

function getMDXComponents() {
  return {
    h1: props => <h1 {...props} className={`${props.className || ''} my-4 font-sans antialiased font-medium text-2xl`} />,
    h2: props => <h2 {...props} className={`${props.className || ''} my-4 font-sans antialiased font-medium text-xl`} />,
    h3: props => <h3 {...props} className={`${props.className || ''} my-4 font-sans antialiased font-medium text-lg`} />,
    h4: props => <h4 {...props} className={`${props.className || ''} my-4 font-sans antialiased font-medium text-lg text-gray-500`} />,
    h5: props => <h5 {...props} className={`${props.className || ''} my-4 font-sans antialiased text-md font-bold`} />,
    h6: props => <h6 {...props} className={`${props.className || ''} my-4 font-sans antialiased text-sm font-bold text-gray-500 uppercase`} />,
    blockquote: props => <blockquote {...props} className={`${props.className || ''} italic font-sans antialiased text-gray-400 border-l-4 border-gray-400 pl-4 pt-1 pb-1 pr-1 my-4 bg-white`} />,
    p: props => <p {...props} className={`${props.className || ''} my-4 text-gray-700 font-normal font-sans antialiased`} />,
    strong: props => <strong {...props} className={`${props.className || ''} my-4 text-gray-700 font-semibold font-sans antialiased`} />,
    a: props => <a {...props} className={`${props.className ? props.className : 'text-primary-600 font-medium hover:text-primary-500'} font-sans antialiased`} />,
    ul: props => <ul {...props} className={`${props.className || ''} my-4 ml-4 list-disc list-inside text-gray-700 font-normal font-sans antialiased`} />,
    ol: props => <ol {...props} className={`${props.className || ''} my-4 ml-4 list-decimal list-inside text-gray-700 font-normal font-sans antialiased`} />,
    li: props => <li {...props} className={`${props.className || ''} my-3 text-gray-700 font-normal font-sans antialiased`} />,
    button: Button,
    table: props => (
      <div className={`${props.className || ''} flex flex-col`}>
        <div className="my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="align-middle inline-block w-full shadow overflow-auto sm:rounded-lg border-b border-gray-200">
            <table {...props} className={`${props.className || ''} w-full`} />
          </div>
        </div>
      </div>
    ),
    th: props => <th {...props} className={`${props.className || ''} px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider`} />,
    tr: props => <tr {...props} className={`${props.className || ''} bg-white`} />,
    td: props => <td {...props} className={`${props.className || ''} px-6 py-4 border-b border-gray-200 text-sm leading-5 text-gray-500`} />,
    pre: props => <pre {...props} className={`${props.className || ''} my-8`} />,
    inlineCode: props => <code {...props} className={`${props.className || ''} px-1 py-0.5 bg-primary-700 text-white rounded font-mono text-sm`} />,
    code: props => <Highlight {...props} className={`${props.className || ''} px-3 py-2 rounded`} />,
    hr: props => <hr {...props} className={`${props.className || ''} my-8`} />,
    CodeBlock,
    ChapterSuggestions,
    YouTube,
    Remember,
    Warning,
    Sponsors,
  }
}