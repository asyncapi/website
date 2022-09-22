import GenericLayout from '../components/layout/GenericLayout'
import roadmapData from '../roadmap.json'
import RoadmapColumn from '../components/roadmap/RoadmapColumn'
import Warning from '../components/Warning'
import InlineHelp from '../components/InlineHelp'
import YouTubeEmbed from 'react-youtube-embed'
import Paragraph from '../components/typography/Paragraph'
import Heading from '../components/typography/Heading'
import TextLink from '../components/typography/TextLink'

export default function RoadmapPage() {
  const description = 'Long-term vision and plans for the AsyncAPI Initiative.'
  const image = '/img/social/website-card.jpg'

  if (Object.keys(roadmapData).length === 0) {
    return (
      <GenericLayout
        title="Vision & Roadmap"
        description={description}
        image={image}
        wide
      >
      </GenericLayout>
    )
  }

  return (
    <GenericLayout
      title="Vision & Roadmap"
      description={description}
      image={image}
      wide
    >
      <div className="py-12 overflow-hidden">
        <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
          <div className="relative">
            <div className="lg:w-2/3 lg:mx-auto lg:text-center">
              <Paragraph textColor="text-secondary-500" className="text-center uppercase font-bold">
                Vision
              </Paragraph>
              <Heading level="h1" className="text-center">
                AsyncAPI becomes the #1 API specification for defining and developing APIs. <span className="text-secondary-500 block underline">Any kind of APIs.</span>
              </Heading>
              <Paragraph className="mt-10 lg:pr-4">
                It all starts with a vision. <strong>This is where we want to see AsyncAPI by 2026.</strong> To make this vision a reality, we've set some goals below that will help us to get there.
              </Paragraph>
              <Paragraph className="mt-4 lg:pr-4">
                These goals are not necessarily everything we'll have to do to get to that vision but instead, they are manageable objectives we can already anticipate. <strong>Together, vision and goals set the direction of the project.</strong>
              </Paragraph>
            </div>

            <div className="relative mt-20">
              <div className="grid lg:grid-cols-3 lg:gap-8">
                <div>
                  <div className="mb-2 lg:my-0 lg:text-center">
                    <Paragraph typeStyle="body-md" textColor="text-secondary-500" className="uppercase font-semibold inline-block p-1.5 mr-2 lg:block lg:bg-transparent lg:p-0 lg:mr-0 lg:mb-2">
                      Goal
                    </Paragraph>
                    <Heading typeStyle="heading-md-semibold">
                      AsyncAPI unifies all the API specifications
                    </Heading>
                  </div>
                  <Paragraph typeStyle="body-md" className="my-4 lg:text-center">
                    Nobody does only event-driven architectures. Most people complement them with REST (OpenAPI), GraphQL, and/or RPC APIs. <strong>We want people to use the AsyncAPI specification and tooling together with their existing OpenAPI, GraphQL, and gRPC definitions.</strong> For that purpose, our specification and tools will need to understand and leverage many other specifications and tools.
                  </Paragraph>
                  <Paragraph typeStyle="body-md" className="my-4 lg:text-center">
                    This is not about reinventing the wheel or creating yet another spec to solve the same problems but to integrate with the existing tools and specs instead.
                  </Paragraph>
                </div>
                <div>
                  <div className="mt-6 mb-2 lg:my-0 lg:text-center lg:text-2xl">
                    <Paragraph typeStyle="body-md" textColor="text-secondary-500" className="uppercase font-semibold inline-block p-1.5 mr-2 lg:block lg:bg-transparent lg:p-0 lg:mr-0 lg:mb-2">
                      Goal
                    </Paragraph>
                    <Heading typeStyle="heading-md-semibold">
                      API development experience is seamless
                    </Heading>
                  </div>
                  <Paragraph typeStyle="body-md" className="my-4 lg:text-center">
                    We want to make the development experience super seamless, from idea to production. <strong>Users should be able to create their first API within minutes without prior knowledge of AsyncAPI, the communication protocol, or anything else that's not business logic.</strong>
                  </Paragraph>
                  <Paragraph typeStyle="body-md" className="my-4 lg:text-center">
                    Furthermore, making sure production behavior and documentation are always aligned, independently of the programming language or framework of choice.
                  </Paragraph>
                </div>
                <div>
                  <div className="mt-6 mb-2 lg:my-0 lg:text-center lg:text-2xl">
                    <Paragraph typeStyle="body-md" textColor="text-secondary-500" className="uppercase font-semibold inline-block p-1.5 mr-2 lg:block lg:bg-transparent lg:p-0 lg:mr-0 lg:mb-2">
                      Goal
                    </Paragraph>
                    <Heading typeStyle="heading-md-semibold">
                      The AsyncAPI community grows 400%
                    </Heading>
                  </div>
                  <Paragraph typeStyle="body-md" className="my-4 lg:text-center">
                    We are aware that our goals are ambitious. <strong>None of the other goals are possible if we don't have a huge community supporting us. AsyncAPI is and must continue being a community-driven initiative. Now more than ever.</strong>
                  </Paragraph>
                  <Paragraph typeStyle="body-md" className="my-4 lg:text-center">
                    We need people to contribute code, ideas, docs, articles, presentations, and more. The sponsors base should also grow along with the community size and the donated money should serve to give back to the community.
                  </Paragraph>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3 lg:mx-auto lg:text-center">
              <Paragraph className="mt-10 lg:pr-4">
                We'll be regularly setting outcomes or key results that will allow us to accomplish the goals above. You can find a categorization of the outcomes in the roadmap below. They are split by priority and some of them show the related features.
              </Paragraph>
              <Paragraph className="mt-4 mb-14 lg:pr-4">
                Please bear in mind <strong>this is an outcome-based roadmap</strong>. We don't maintain a long-term release plan. If you want to find more specific and actionable items, head to the related repository issues or our 
                <TextLink target="_blank" href="https://shapeup.asyncapi.io">
                  Shape Up dashboard
                </TextLink>.
              </Paragraph>

              <Heading level="h3" typeStyle="heading-lg" className="text-center mt-10">
                Roadmap
              </Heading>
              <Paragraph className="mt-4 max-w-3xl mx-auto text-center">
                The outcomes we want to achieve
              </Paragraph>
            </div>

            <div className="lg:flex lg:justify-center mt-10 max-w-3xl mx-auto text-sm uppercase font-semibold text-gray-800">
              <div className="flex mb-2 justify-center">
                <div className="w-5 my-1 mr-2 bg-green-300 rounded"></div>
                <div className="w-5 my-1 mr-2 bg-yellow-200 rounded"></div>
                <div className="w-5 my-1 mr-2 bg-orange-200 rounded"></div>
                <div className="mr-4">Outcome <InlineHelp text="An outcome is the result of implementing a solution and represents a specific milestone towards our goals and, therefore, our vision. If you're into OKRs, an outcome is a Key Result." /></div>
              </div>
              <div className="flex mb-2 justify-center">
                <div className="w-5 my-1 mr-2 bg-blue-400 rounded"></div>
                <div className="mr-4">Solution <InlineHelp text="A solution is an idea we have to achieve its related outcome. It may produce the outcome partially or totally." /></div>
              </div>
              <div className="flex mb-2 justify-center">
                <div className="w-5 my-1 mr-2 bg-gray-700 rounded"></div>
                <div className="mr-4">Feature <InlineHelp text="A feature talks about specific details to implement a solution. It may implement the solution partially or totally." /></div>
              </div>
            </div>

            <div className="lg:grid lg:grid-cols-3 lg:gap-10">
              <RoadmapColumn
                title="Now"
                description="Our top priority. We're probably working on it right now or starting pretty soon."
                colorClass="bg-green-300"
                items={roadmapData.outcomes.now}
              />
              <RoadmapColumn
                title="Later"
                description="Our next priority. We'll work on this soon if everything goes as planned."
                colorClass="bg-yellow-200"
                items={roadmapData.outcomes.later}
              />
              <RoadmapColumn
                title="Future"
                description="Not a priority. We're considering working on this but it's too early to know when."
                colorClass="bg-orange-200"
                items={roadmapData.outcomes.future}
              />
            </div>

            <Paragraph className="mt-12 mb-4 mx-auto text-center lg:w-1/2">
              If you want to know more about the format of this roadmap, watch this recording from one of our SIG meetings:
            </Paragraph>

            <div className="mx-auto lg:w-1/2">
              <YouTubeEmbed
                id="u83V2gIUGHU"
                appendSrc="?start=86"
              />
            </div>

            <Warning
              className="lg:w-1/2 mt-8 mx-auto"
              title="Warning for Contributors"
              description="This roadmap reflects the priorities of the AsyncAPI Initiative. If you want to contribute a feature from the roadmap, feel free to let us know on the corresponding GitHub issue so we can discuss what's the best way to proceed and implement it yourself."
            />
            <p className="text-xs text-center text-gray-600 mt-8">
              <strong>Attention:</strong> this road map is synchronized with the GitHub issues in the <a href="https://github.com/asyncapi/shape-up-process/issues?q=is%3Aopen+is%3Aissue+label%3AOutcome" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-900">asyncapi/shape-up-process</a> repository.
            </p>
          </div>
        </div>
      </div>
    </GenericLayout>
  )
}
