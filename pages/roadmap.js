import GenericLayout from '../components/layout/GenericLayout'
import roadmapData from '../roadmap.json'
import RoadmapColumn from '../components/roadmap/RoadmapColumn'
import Warning from '../components/Warning'
import InlineHelp from '../components/InlineHelp'

export default function RoadmapPage() {
  const description = 'Long-term vision and plans for the AsyncAPI Initiative.'
  const image = '/img/social/roadmap.png'

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
      <div className="py-16 overflow-hidden lg:py-24">
        <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
          <div className="relative">
            <div className="lg:w-2/3 lg:mx-auto lg:text-center">
              <p className="text-green-400 text-lg uppercase font-semibold">
                Vision
              </p>
              <p className="text-3xl font-bold text-gray-600 decoration-green-500 lg:text-4xl">
                AsyncAPI becomes the #1 API specification for defining and developing APIs. <span className="text-green-400 block underline">Any kind of APIs.</span>
              </p>
              <p className="mt-10 text-lg leading-7 text-gray-500 lg:pr-4">
                It all starts with a vision. <strong>This is where we want to see AsyncAPI by 2026.</strong> To make this vision a reality, we've set some goals below that will help us to get there.
              </p>
              <p className="mt-4 text-lg leading-7 text-gray-500 lg:pr-4">
                These goals are not necessarily everything we'll have to do to get to that vision but instead, they are manageable objectives we can already anticipate. <strong>Together, vision and goals set the direction of the project.</strong>
              </p>
            </div>

            <div className="relative mt-20">
              <div className="grid lg:grid-cols-3 lg:gap-8">
                <div>
                  <h2 className="font-semibold mb-2 lg:my-0 lg:text-center lg:text-2xl">
                    <div className="uppercase inline-block bg-gray-100 text-green-400 text-xs p-1.5 mr-2 lg:block lg:bg-transparent lg:text-green-400 lg:text-sm lg:p-0 lg:mr-0 lg:mb-2">Goal</div>
                    AsyncAPI unifies all the API specifications
                  </h2>
                  <p className="my-4 text-gray-600 lg:text-center">
                    Nobody does only event-driven architectures. Most people complement them with REST (OpenAPI), GraphQL, and/or RPC APIs. <strong>We want people to use the AsyncAPI specification and tooling together with their existing OpenAPI, GraphQL, and gRPC definitions.</strong> For that purpose, our specification and tools will need to understand and leverage many other specifications and tools.
                  </p>
                  <p className="my-4 text-gray-600 lg:text-center">
                    This is not about reinventing the wheel or creating yet another spec to solve the same problems but to integrate with the existing tools and specs instead.
                  </p>
                </div>
                <div>
                  <h2 className="font-semibold mt-6 mb-2 lg:my-0 lg:text-center lg:text-2xl">
                    <div className="uppercase inline-block bg-gray-100 text-green-400 text-xs p-1.5 mr-2 lg:block lg:bg-transparent lg:text-green-400 lg:text-sm lg:p-0 lg:mr-0 lg:mb-2">Goal</div>
                    API development experience is seamless
                  </h2>
                  <p className="my-4 text-gray-600 lg:text-center">
                    We want to make the development experience super seamless, from idea to production. <strong>Users should be able to create their first API within minutes without prior knowledge of AsyncAPI, the communication protocol, or anything else that's not business logic.</strong>
                  </p>
                  <p className="my-4 text-gray-600 lg:text-center">
                    Furthermore, making sure production behavior and documentation are always aligned, independently of the programming language or framework of choice.
                  </p>
                </div>
                <div>
                  <h2 className="font-semibold mt-6 mb-2 lg:my-0 lg:text-center lg:text-2xl">
                    <div className="uppercase inline-block bg-gray-100 text-green-400 text-xs p-1.5 mr-2 lg:block lg:bg-transparent lg:text-green-400 lg:text-sm lg:p-0 lg:mr-0 lg:mb-2">Goal</div>
                    The AsyncAPI community grows 400%
                  </h2>
                  <p className="my-4 text-gray-600 lg:text-center">
                    We are aware that our goals are ambitious. <strong>None of the other goals are possible if we don't have a huge community supporting us. AsyncAPI is and must continue being a community-driven initiative. Now more than ever.</strong>
                  </p>
                  <p className="my-4 text-gray-600 lg:text-center">
                    We need people to contribute code, ideas, docs, articles, presentations, and more. The sponsors base should also grow along with the community size and the donated money should serve to give back to the community.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3 lg:mx-auto lg:text-center">
              <p className="mt-10 text-lg leading-7 text-gray-500 lg:pr-4">
                We'll be regularly setting outcomes or key results that will allow us to accomplish the goals above. You can find a categorization of the outcomes in the roadmap below. They are split by priority and some of them show the related features.
              </p>
              <p className="mt-4 mb-14 text-lg leading-7 text-gray-500 lg:pr-4">
                Please bear in mind <strong>this is an outcome-based roadmap</strong>. We don't maintain a long-term release plan. If you want to find more specific and actionable items, head to the related repository issues or our <a href="https://shapeup.asyncapi.io" className="text-pink-600 font-semibold hover:text-pink-800">Shape Up dashboard</a>.
              </p>

              <h3 className="text-center mt-10 text-3xl leading-8 font-normal tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
                Roadmap
              </h3>
              <p className="mt-4 max-w-3xl mx-auto text-center text-xl leading-7 text-gray-500">
                The outcomes we want to achieve
              </p>
            </div>

            <div className="lg:flex lg:justify-center mt-10 max-w-3xl mx-auto text-sm uppercase font-semibold text-gray-700">
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
            <Warning
              className="lg:w-1/2 mt-8 mx-auto"
              title="Warning for Contributors"
              description="This road map reflects the priorities of the core team. If you want to contribute a feature that's not a priority, feel free to let us know on the corresponding GitHub issue so we can discuss what's the best way to proceed and implement it yourself." />
            <p className="text-xs text-center text-gray-600 mt-8">
              <strong>Attention:</strong> this road map is synchronized with the GitHub issues in the <a href="https://github.com/asyncapi/shape-up-process/issues?q=is%3Aopen+is%3Aissue+label%3A%22Key+Result%22" target="_blank" className="underline hover:text-gray-900">asyncapi/shape-up-process</a> repository.
            </p>
          </div>
        </div>
      </div>
    </GenericLayout>
  )
}
