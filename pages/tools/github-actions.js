import GenericLayout from '../../components/layout/GenericLayout'
import GithubButton from '../../components/buttons/GithubButton'
import CodeBlock from '../../components/editor/CodeBlock'
import Heading from '../../components/typography/Heading'
import Paragraph from '../../components/typography/Paragraph'

export default function GithubActionsPage() {
  function renderButtons () {
    return (
      <div className="mt-8">
        {/* <Button
          text="Learn more"
          href="/docs/tools/github-actions"
          iconPosition="left"
          icon={<IconRocket className="inline-block w-6 h-6 -mt-1" />}
          className="w-full mb-2 sm:w-auto sm:mb-0 sm:mr-2"
        /> */}
        <GithubButton
          className="w-full sm:w-auto"
          href="https://www.github.com/asyncapi/github-action-for-generator"
        />
      </div>
    )
  }

  const description = 'Generate docs and code on your GitHub Actions pipeline.'
  const image = '/img/social/githubactions-card.jpg'

  return (
    <GenericLayout
      title="GitHub Actions"
      description={description}
      image={image}
      wide
    >
      <div className="py-12 overflow-hidden">
        <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
          <div className="relative">
            <Heading level="h1" typeStyle="heading-lg" className="text-center">
              Automate using GitHub Actions
            </Heading>
            <Paragraph className="mt-4 max-w-3xl mx-auto text-center">
              {description}
            </Paragraph>
          </div>

          <div className="relative mt-12 lg:mt-20 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="relative mb-8 lg:mt-8">
              <Heading level="h4" typeStyle="heading-md-semibold">
                Generate docs
              </Heading>
              <Paragraph className="mt-3 lg:pr-4">
                Seamlessly integrate the docs generation process with your GitHub pipeline. Make sure your documentation is always up to date. It will be a gift to your team and your future self.
              </Paragraph>
              {renderButtons()}
            </div>
            
            <CodeBlock hasWindow textSizeClassName="text-sm">{getCode()}</CodeBlock>
          </div>
        </div>
      </div>
    </GenericLayout>
  )
}

function getCode() {
  return `name: AsyncAPI documents processing

on:
  push:
    branches: [ master ]

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v2
      
      - name: Generating HTML from my AsyncAPI document
        uses: asyncapi/github-action-for-generator@v0.2.0
        
      - name: Deploy GH page
        uses: JamesIves/github-pages-deploy-action@3.4.2
        with:
          ACCESS_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          BRANCH: gh-pages
          FOLDER: generated-html`
}