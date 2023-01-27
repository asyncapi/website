import GenericLayout from '../components/layout/GenericLayout'
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
              <Paragraph typeStyle="body-md" textColor="text-secondary-500" className="text-center uppercase font-bold">
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
                    <Paragraph typeStyle="body-md" textColor="text-secondary-500" className="uppercase font-bold inline-block p-1.5 mr-2 lg:block lg:bg-transparent lg:p-0 lg:mr-0 lg:mb-2">
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
                  <div className="mt-6 mb-2 lg:my-0 lg:text-center">
                    <Paragraph typeStyle="body-md" textColor="text-secondary-500" className="uppercase font-bold inline-block p-1.5 mr-2 lg:block lg:bg-transparent lg:p-0 lg:mr-0 lg:mb-2">
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
                  <div className="mt-6 mb-2 lg:my-0 lg:text-center">
                    <Paragraph typeStyle="body-md" textColor="text-secondary-500" className="uppercase font-bold inline-block p-1.5 mr-2 lg:block lg:bg-transparent lg:p-0 lg:mr-0 lg:mb-2">
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
                Please bear in mind <strong>this is an outcome-based roadmap</strong>. We don't maintain a long-term release plan. If you want to find more specific and actionable items, head to the related repository issues or start an issue/discussion at
                <TextLink target="_blank" href="https://github.com/asyncapi/community">
                  github.com/asyncapi/community
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
                <div className="w-5 my-1 mr-2 bg-black rounded"></div>
                <div className="mr-4">Implementation <InlineHelp text="Related repos, issues, or pull requests implementing the solution. They may implement the solution partially or totally." /></div>
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
          </div>
        </div>
      </div>
    </GenericLayout>
  )
}

const solutions = {
  createFramework: {
    title: 'Create a framework',
    done: true,
    description: <>
      <p>We should create a framework that allows users to quickly create a new API. It should provide the following features, among others:</p>
      <ul>
        <li>The user should be able to create an API with just an AsyncAPI file and some files containing the business logic (not counting package.json files or similar).</li>
        <li>Automatically generate documentation.</li>
        <li>Automatically validate messages. This goes both ways, for the outgoing and the incoming messages.</li>
        <li>Handles the main protocols: HTTP, WebSockets, Kafka, AMQP 0-9-1, AMQP 1.0, MQTT, and MQTT5.</li>
        <li>Handles all the supported auth mechanisms.</li>
        <li>In JS, it's able to hot reload when the AsyncAPI file changes or the business logic changes. Even in production! For more information, read <a href="https://twitter.com/ScriptedAlchemy/status/1373743197453656065" target="_blank">this tweet</a> and reach out to @ScriptedAlchemy for collaboration, as he is implementing something similar.</li>
      </ul>
    </>
  },
  createRoadmapLandingPage: {
    title: 'Create a landing page in the website with vision and roadmap',
    done: true,
    description: <p>It's actually this page! :)</p>
  },
  createPluginsForOtherFrameworks: {
    title: 'Create AsyncAPI plugins for most common frameworks',
    description: <>
      <p>Even though we want to create our own framework, some people are already using other frameworks and it's very unlikely they'll switch frameworks in all their codebases. Instead of forcing them to use our framework, we should offer plugins for the most common frameworks (when possible). E.g., Spring Boot, Spring Cloud Streams, Akka, etc.</p><p>The plugin should allow them to get at least the following features, when possible:</p>
      <ul>
        <li>Automatically generate documentation.</li>
        <li>Automatically validate messages. This goes both ways, for the outgoing and the incoming messages.</li>
      </ul>
    </>
  },
  makeGeneratorGenerateModels: {
    title: 'Make Generator provide a way to generate types/models in any language',
    done: true,
    description: <p>Currently, a Generator template author has to do a lot of work to generate types or data models. Translating JSON Schema to a programming language is a tough task. This should be handled by us instead of leaving it to the template author.</p>
  },
  makeGeneratorSupportReact: {
    title: 'Make Generator support React',
    done: true,
    description: <p>By supporting React in the Generator, it will become easier to create better templates, leading to a better user experience.</p>
  },
  createOutstandingDocs: {
    title: 'Create outstanding documentation and tutorials',
    description: <>
      <p>The current documentation and tutorials are good already. However, they're not enough for most people to get started with AsyncAPI. This is usually to the fact that the specification is large and tough to read, there are not many examples of how to use AsyncAPI for your use case (or a similar one), and there's no guide on how to use AsyncAPI with each protocol.</p>
      <p>We should improve our documentation and tutorials to cover a full getting started guide, many different use cases, and examples of how AsyncAPI can be used with different protocols. From beginner to advanced, step by step. Our documentation should start looking a little bit more like a game: enjoyable and interactive.</p>
      <p>Video content would also be super helpful here as new generations tend to use more the video format than the written one. In any case, we need it written so it's easy to copy and paste.</p>
    </>
  },
  createCLI: {
    title: 'Create an AsyncAPI CLI',
    done: true,
    description: <>
      <p>We should have a single CLI tool that's capable of doing multiple things, including but not limited to:</p>
      <ul>
        <li>Generate documentation and code</li>
        <li>Validate an AsyncAPI document</li>
        <li>Create an AsyncAPI file after the user replies to some questions or provides some params.</li>
      </ul>
    </>
  },
  solveChannelReusability: {
    title: 'Solve the channel reusability problem',
    description: <p>Reusing channels across APIs is hard because the publish or subscribe verb is included in the channel definition. We should come up with a way to decouple channel definition from the operation (publish/subscribe).</p>
  },
  solvePublishSubscribe: {
    title: 'Solve the publish/subscribe perspective problem',
    description: <p>Many people get confused with the "perspective" of the publish and subscribe verbs. In many cases, it's really awkward to work with the current definition/perspective.</p>
  },
  createNewParserAPI: {
    title: 'Design a new Parser API resilient to breaking changes',
    done: true,
    description: <p>Our current parser is tightly coupled to the AsyncAPI document structure. We should create a new parser API that represents intents instead of the structure of the document.</p>,
  },
  createOutstandingContributingGuide: {
    title: 'Create an outstanding contributing guide',
    description: <>
      <p>When a new potential contributor comes in, they don't know where to start looking or how to make their first contribution. We should create clear documentation on the website explaining how the project is structured. To mention a few things:</p>
      <ul>
        <li>The different ways they can contribute.</li>
        <li>The repos we have.</li>
        <li>The governance process.</li>
        <li>The vision, goals, and roadmap.</li>
        <li>The communication channels they can use to get in touch with us.</li>
        <li>A list of all the <code>good first issue</code> issues.</li>
      </ul>
      <p>The content must be in written form but videos will make them easy to digest.</p>
      <p><strong>Ideally, each repo/project should have its own contributing guide that would be linked from the main one.</strong></p>
    </>
  },
  createUILibrary: {
    title: 'Create a UI library',
    description: <p>We currently have an HTML template and a React component for rendering HTML documentation from an AsyncAPI document. We should unify both and offer a componentized version of the React component.</p>
  },
  createEventGateway: {
    title: 'Create an event gateway',
    description: <p>One way to prevent incompatible or "wrong-formed" messages arrive in the message broker is to place a proxy or gateway in the middle, between the client and the broker. This broker could leverage AsyncAPI definitions to validate the messages in real-time. It could happen before they're published, received, or both.</p>
  },
  createSupportProgram: {
    title: 'Create a support program to give back to the community',
    description: <>
      <p>We are very fortunate with the support we got at AsyncAPI. There are many people out there creating great stuff. Some of these things power AsyncAPI and others augment it, making it easier for the end-user to adopt AsyncAPI. We should create a program to give support to these community members. It should consist —at least— of the following things:</p>
      <ul>
        <li>Help with development and issue triaging.</li>
        <li>Help with documentation.</li>
        <li>Help with website, logos, and any marketing activities.</li>
        <li>Financial support for conference speakers (trip, hotel, food, training, etc.) *</li>
        <li>Financial support for authors (developers, writers, etc.) *</li>
      </ul>
      <p>(*) In the case of financial support, the TSC must approve the expense.</p>
    </>
  }
}

const outcomes = {
  visionAndRoadmapAreClear: {
    title: 'The vision and roadmap are clear',
    description: <>
      <p>We need to make sure we effectively communicate the road map of the AsyncAPI Initiative:</p>
      <ul>
        <li>It should be an overall view of what we want to achieve.</li>
        <li>We should avoid creating a road map that looks like a set of specific promises like "We're going to implement X" or "We're going to do Y". Instead, we should focus on what the user should be able to do with AsyncAPI once we accomplish a specific goal.</li>
        <li>We should also avoid giving a timeframe or time estimation. AsyncAPI is driven by the community so we can't (and shouldn't) put pressure on contributors to finish something before a specific deadline.</li>
      </ul>
    </>,
    done: true,
    solutions: [
      solutions.createRoadmapLandingPage
    ]
  },
  impossibleUnsyncDocsAndCode: {
    title: 'It\'s impossible to unsync documentation from code',
    description: <>
      <p>One common pain point when creating APIs (and software in general) is having to maintain the documentation up to date. There are lots of people (including myself) preaching design-first is the best approach. However, many people love the code-first approach and I think AsyncAPI should be above this conversation. So what if neither design-first nor code-first? Or what if it's actually a mix? We should find the right balance between the two so documentation and code are both somehow "linked" and impossible to get wrong. Or said another way, if documentation is wrong, code is also wrong.</p>
      <p>Of course, I'm not referring to the human-readable fields of the spec like description or summary but the ones that are machine-readable.</p>
    </>,
    solutions: [
      solutions.createFramework,
      solutions.createPluginsForOtherFrameworks,
    ]
  },
  userIsAbleToFocusOnlyBusinessLogic: {
    title: 'User is able to focus only on business logic',
    description: <>
      <p>Ideally, the user should not be focusing on anything that's not related to their business logic. This includes learning the AsyncAPI specification. Nobody <strong>should be forced</strong> to learn the AsyncAPI spec to create a basic API. However, it doesn't mean the user should not be able to improve or create more complex APIs if they learn AsyncAPI and its tooling.</p>
      <h2>Scope</h2>
      <ul>
        <li>An AsyncAPI file can be created without having to understand AsyncAPI syntax. This can be a CLI tool that asks questions, an application UI, a form, etc.</li>
        <li>Custom logic can be triggered when a message is received on a channel.</li>
        <li>Custom logic that sends a message can be triggered as the result of receiving a message, on startup, or any other application lifecycle event.</li>
        <li>Data models must be handled automatically, meaning the user doesn't have to manually create them.</li>
        <li>Sent and received messages must be validated against an AsyncAPI document.</li>
        <li>Works with the main protocols: HTTP, WebSockets, Kafka, AMQP 0-9-1, AMQP 1.0, MQTT, and MQTT5.</li>
        <li>Works with all the supported security schemes.</li>
        <li>The result is production-ready.</li>
      </ul>
    </>,
    solutions: [
      solutions.makeGeneratorSupportReact,
      solutions.makeGeneratorGenerateModels
    ]
  },
  userIsAbleToCreateAPIInUnder20Minutes: {
    title: 'User is able to create an API in under 20 minutes with no prior knowledge of AsyncAPI',
    description: <p>This outcome is all about the best-in-class user experience. We want people to create APIs without having to understand AsyncAPI and in under 20 minutes. All of this process should —of course— be powered by the AsyncAPI specification as the intermediary language.</p>,
    solutions: [
      solutions.createCLI,
      solutions.createFramework,
      solutions.createOutstandingDocs
    ]
  },
  specificationAndParsersReadyForFuture: {
    title: 'Specification and parsers are ready to accommodate future features',
    description: <>
      <p>The current specification has two big structural problems right now:</p>
      <ol>
        <li>Publish and subscribe verbs are not clear and most people get confused. It's also very probable we end up adding more verbs to accommodate requests, responses, queries, mutations, etc.</li>
        <li>Reusing channels across APIs is hard because the <code>publish</code> or <code>subscribe</code> verb is included in the channel definition.</li>
      </ol>
      <p>Before we proceed with adding more features to the spec, we should fix these structural problems. Otherwise, changing the spec afterward is going to be a mess.</p>
    </>,
    solutions: [
      solutions.createNewParserAPI,
      solutions.solvePublishSubscribe,
      solutions.solveChannelReusability
    ]
  },
  timeFirstContribution1Day: {
    title: 'Time to first contribution goes down to a day',
    description: <p>Currently, it's hard for a developer to make their first contribution. We should make it super easy for anyone to contribute. Ideally, the time to the first contribution goes down to a day or less since they decided to contribute.</p>,
    solutions: [
      solutions.createOutstandingContributingGuide
    ]
  },
  userIsAbleRenderDocsInsideTheirDocs: {
    title: 'User is able to render AsyncAPI documentation inside their existing docs',
    description: <p>We currently provide a way to generate documentation, either via the HTML template or the React component. However, some people want to embed only specific parts of the docs inside their docs as opposed to the full-page docs we offer right now. We should enable users to accomplish this using our tools.</p>,
    solutions: [
      solutions.createUILibrary,
    ]
  },
  reuseOtherSchemaDefsInsideAsyncAPI: {
    title: 'OpenAPI, RAML, Avro, GraphQL, Protobuf, and XSD users reuse their schema/type definitions within AsyncAPI.',
    description: <p>It is common to find the same data structures defined using multiple schema/type definition languages, i.e., JSON Schema, Avro, Protobuf, GraphQL types, etc. If this outcome is achieved, users should be able to link and/or embed their definitions using any of the following languages: OpenAPI Schema, RAML Data Type, Avro, GraphQL Type, Protobuf, and XSD.</p>
  },
  usersCanModifyExistingAppsToWorkWithAsyncAPI: {
    title: 'User can modify their existing APIs to work with AsyncAPI in under an hour with no prior knowledge of AsyncAPI and without leaving their framework of choice',
    description: <p>Even though we're building our own framework, people should not be forced to leave their frameworks of choice to benefit from AsyncAPI features like automatic documentation generation and message validation.</p>,
    solutions: [
      solutions.createPluginsForOtherFrameworks,
    ]
  },
  onlyWellFormedMessagesReachBroker: {
    title: 'User can make sure only well-formed messages reach the broker without having to touch a single line of code',
    description: <>
      <p>When doing EDAs, there is a common problem that repeats across many companies, especially the big ones. People are not able to answer the question "who is subscribing to this topic/channel?". This management problem derives into a more serious one: someone makes a breaking change on the information sent on one channel and others break because they were not aware of this change. Hopefully, the subscribers break in a "noisy" way so you can detect the error and fix it. Other people opt for not pushing breaking changes into an existing channel and decide to create a new one, leading to a pile of unused channels over time.</p>
      <p>The problem I just described actually consists of two parts:</p>
      <ol>
        <li>Lack of discovery tools for EDAs. E.g., being able to answer the question "who is subscribing to this channel?"</li>
        <li>Lack of management tools for EDAs. E.g., making sure only the right data gets into a channel.</li>
      </ol>
      <p>This outcome is about the second part: "Lack of management tools for EDAs".</p>
      <h2>Scope</h2>
      <ol>
        <li>User is able to make sure only well-formed messages reach the broker.</li>
        <li>It should not be needed to change a single line of code.</li>
        <li>It works with the main protocols: HTTP, Kafka, AMQP 0-9-1, AMQP 1.0, WebSockets, MQTT, and MQTT5.</li>
      </ol>
    </>,
    solutions: [
      solutions.createEventGateway
    ]
  },
  numberContributorsAbove100: {
    title: 'Number of contributors go above 100 in top repos',
    description: <p>We make top repos grow to a point where we go over 100 contributors in the whole history of the project.</p>,
    solutions: [
      solutions.createOutstandingContributingGuide
    ]
  },
  numberProjectsAbove100: {
    title: 'The number of community and community-donated projects go above 100',
    description: <p>We already have a bunch of tools and spec-related repos. This outcome will be done when we're over 100. That said, we shouldn't accept projects just for the sake of increasing that number.</p>,
    solutions: [
      solutions.createSupportProgram
    ]
  },
  yearlyNumberPresentersWritersAbove50: {
    title: 'The yearly number of community members presenting and/or writing about AsyncAPI goes above 50',
    description: <p>A community is not made of programmers only. People producing content in form of blog posts, videos, live streams, podcasts, and conference talks are super important as well. We should help to make it grow. The more people speak about the project the more people will hear about us.</p>,
    solutions: [
      solutions.createSupportProgram
    ]
  }
}

const roadmapData = {
  outcomes: {
    now: [
      outcomes.specificationAndParsersReadyForFuture,
      outcomes.userIsAbleToCreateAPIInUnder20Minutes,
      outcomes.userIsAbleToFocusOnlyBusinessLogic,
      outcomes.impossibleUnsyncDocsAndCode,
      outcomes.visionAndRoadmapAreClear
    ],
    later: [
      outcomes.timeFirstContribution1Day,
      outcomes.userIsAbleRenderDocsInsideTheirDocs,
    ],
    future: [
      outcomes.reuseOtherSchemaDefsInsideAsyncAPI,
      outcomes.usersCanModifyExistingAppsToWorkWithAsyncAPI,
      outcomes.onlyWellFormedMessagesReachBroker,
      outcomes.numberContributorsAbove100,
      outcomes.numberProjectsAbove100,
      outcomes.yearlyNumberPresentersWritersAbove50
    ]
  }
}
