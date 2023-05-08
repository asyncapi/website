import GenericLayout from '../../components/layout/GenericLayout'
import GithubButton from '../../components/buttons/GithubButton'
import CodeBlock from '../../components/editor/CodeBlock'
import Heading from '../../components/typography/Heading'
import Paragraph from '../../components/typography/Paragraph'

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
  const image = '/img/social/parsers-card.jpg'

  return (
    <GenericLayout
      title="Parsers"
      description={description}
      image={image}
      wide
    >
      <div className="py-12 overflow-hidden">
        <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
          <div className="relative">
            <Heading level="h1" typeStyle="heading-lg" className="text-center">
              Build your own tools
            </Heading>
            <Paragraph className="mt-4 max-w-3xl mx-auto text-center">
              {description}
            </Paragraph>
          </div>

          <div className="relative mt-12 lg:mt-20 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="relative mb-8 lg:mt-8">
              <Heading level="h4" typeStyle="heading-md-semibold">
                JavaScript parser
              </Heading>
              <Paragraph className="mt-3 lg:pr-4">
                Parse AsyncAPI documents in your JavaScript tooling and products. It works on <strong>Node.js</strong> and <strong>browsers</strong>.
              </Paragraph>
              <CodeBlock language="bash" showLineNumbers={false} className="mt-8" textSizeClassName="text-sm">npm install @asyncapi/parser</CodeBlock>
              {renderButtons()}
            </div>
            
            <CodeBlock language="javascript" hasWindow textSizeClassName="text-sm">{getCode()}</CodeBlock>
          </div>
        </div>
      </div>
    </GenericLayout>
  )
}

function getCode() {
  return `import { parse } from '@asyncapi/parser'

const doc = await parse(\`
  asyncapi: '2.6.0'
  info:
    title: Example
    version: '1.0.0'
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