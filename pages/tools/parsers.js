import GenericLayout from '../../components/layout/GenericLayout'
import GithubButton from '../../components/buttons/GithubButton'
import CodeBlock from '../../components/editor/CodeBlock'

// import Button from '../../components/buttons/Button'
// import IconRocket from '../../components/icons/Rocket'


export default function ParsersPage() {
  function renderButtons () {
    return (
      <div className="mt-8">
        {/* <Button
          text="Learn more"
          href="/docs/tools/parser-js"
          iconPosition="left"
          icon={<IconRocket className="inline-block w-6 h-6 -mt-1" />}
          className="w-full mb-2 sm:w-auto sm:mb-0 sm:mr-2"
        /> */}
        <GithubButton
          className="w-full sm:w-auto"
          href="https://www.github.com/asyncapi/parser-js"
        />
      </div>
    )
  }

  const description = 'Use our parsers to build your own tools or add AsyncAPI support to your product.'
  const image = '/img/social/parsers.png'

  return (
    <GenericLayout
      title="Parsers"
      description={description}
      image={image}
      wide
    >
      <div className="py-16 overflow-hidden lg:py-24">
        <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
          <div className="relative">
            <h3 className="text-center text-3xl leading-8 font-normal tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
              Build your own tools
            </h3>
            <p className="mt-4 max-w-3xl mx-auto text-center text-xl leading-7 text-gray-500">
              {description}
            </p>
          </div>

          <div className="relative mt-12 lg:mt-20 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="relative mb-8 lg:mt-8">
              <h4 className="text-2xl leading-8 font-normal text-gray-900 tracking-tight sm:text-3xl sm:leading-9">
              JavaScript parser
              </h4>
              <p className="mt-3 text-lg leading-7 text-gray-500 lg:pr-4">
                Parse AsyncAPI documents in your JavaScript tooling and products. It works on <strong>Node.js</strong> and <strong>browsers</strong>.
              </p>
              <CodeBlock language="bash" showLineNumbers={false} className="mt-8">npm install @asyncapi/parser</CodeBlock>
              {renderButtons()}
            </div>
            
            <CodeBlock language="javascript" hasWindow>{getCode()}</CodeBlock>
          </div>
        </div>
      </div>
    </GenericLayout>
  )
}

function getCode() {
  return `import { parse } from '@asyncapi/parser'

const doc = await parse(\`
  asyncapi: '2.0.0'
  info:
    title: Example
    version: '0.1.0'
  channels:
    example-channel:
      subscribe:
        message:
          payload:
            type: object
            properties:
              exampleField:
                type: string
              exampleNumber:
                type: number
              exampleDate:
                type: string
                format: date-time
\`)

console.log(doc.info().title())
// => Example`
}