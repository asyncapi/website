import GenericLayout from '../../components/layout/GenericLayout'
import Heading from '../../components/typography/Heading'
import Paragraph from '../../components/typography/Paragraph'

export default function GSoDPage() {

  return (
      <div className="py-12 overflow-hidden">
        <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
          <div className="relative">
            <Heading level="h1" typeStyle="heading-lg">
              📑 Google Season of Docs at AsyncAPI 
            </Heading>
            <Paragraph>
            All technical writers are welcome to participate with AsyncAPI for GSoD 2022 season, regardless of tech background or years of experience! At AsynAPI, we love mentoring folks who want to get involved in OSS, tech, and Docs.
            </Paragraph>
          </div>
          <br></br>
          <div className="relative">
            <Paragraph>
            Below is the project proposal we've submitted to GSoD 2022 and then we close with a reminder of how to get started as an AsyncAPI Docs contributor:            
            </Paragraph>
          </div>

          <div className="relative mt-12">
            <div className="relative mb-8 lg:mt-8">
              <Heading level="h2" typeStyle="heading-md-semibold">
                🙌🏾 Update Docs Information Architecture - AsyncAPI Initiative
              </Heading>
              <Heading level="h3" typeStyle="heading-md-semibold">
              ❤️ About AsyncAPI
              </Heading> 
              <Paragraph className="mt-4 lg:pr-4">
              AsyncAPI (currently version 2.3.0, first released in 2016) is an Apache License 2.0 library under the Linux Foundation that seeks to improve the current state of Event-Driven Architectures (EDA). The AsyncAPI Initiative is a specification and growing set of open-source tools to help developers define asynchronous APIs, and build and maintain event-driven architectures. Developers familiar with OpenAPI (aka Swagger) for RESTful APIs will see strong similarities when using AsyncAPI. One common use case is generating documentation (HTML or Markdown) of an asynchronous API. The specification is both platform and language agnostic. Current tooling includes support for common message brokers such as Apache Kafka and RabbitMQ, and languages including Python, Java, and Nodejs. Our long-term goal is to make working with EDAs as easy as working with REST APIs. That goes from documentation to code generation, from discovery to event management, and beyond. Our 150+ Open-Source (OSS) contributors are EDA enthusiasts from all around the world.
              </Paragraph>
            </div>

            <div className="relative mb-8 lg:mt-8">
            <Heading level="h3" typeStyle="heading-md-semibold">
             📑 About our Docs project
            </Heading> 
            <Paragraph className="mt-4 lg:pr-4">
            Our current Docs and their Information Architecture (IA) needs a major makeover. The current content buckets are far from ideal and much basic content is missing to help onboard new contributors. Users new to our API spec need /Conceptual docs that explain our spec terminology in more detail with engineering diagrams: people often learn visually! We also have to move our CLI docs under the Docs upcoming new Reference content bucket; currently, we have a README version of CLI docs only. Similarly, we're adding a new and broader /Tools section of documentation for our tools in individual tools' GitHub repositories, under a /docs directory. Those should still remain there and continue to be maintained, but they also need to be documented in our Docs in a less informal way than what you see in a README. In time, we also need to add many more tutorials (i.e. Websocket, Kafka, etc) and Use Cases and Troubleshooting Guides, under a new How-To section. 
            <br></br>
            We also need to re-structure the Generator tool docs. Because this is one of our main tools, it's big enough to be it's own independent project for 2022 GSoD. Currently, our Generator docs need a major update, to better explain every single functionality of the Generator.
            </Paragraph>
            </div>

            <div className="relative mb-8 lg:mt-8">
            <Heading level="h3" typeStyle="heading-md-semibold">
            🎯 Our Docs project's scope
            </Heading> 
            <Paragraph className="mt-4 lg:pr-4">
            We're already invested in utilizing the Diátaxis methodology for determining our content buckets (Concepts, Tutorials, Tools, How-To Guides, Reference). Along with this change, it makes sense to add new landing pages that introduce each content bucket. Each content bucket landing page could include cards featuring requested content from the community that still needs contributions. Then each card will read, "Contributors Needed."
            <br></br>
            AsyncAPI has several CLI and Tools markdown README documentation in miscellaneous GitHub repositories that we plan to migrate over to the main Docs site. This task is part of our goal for finalizing our 2022 AsyncAPI Docs Information Architecture makeover. We explain this in more detail in our previous OSS blog post titled "Change is coming to our AsyncAPI Developer Documentation". It's also extensively documented in our AsyncAPI Docs GitHub Project Board.
            <br></br>
            In addition, we want to also target improving the Generator tool docs that are only READMEs in a repo right now. The Docs for this one tool are a big enough job to merit being our 2nd proposed project for 2022 GSoD.
            <br></br>
            We're also writing voluntary OSS bi-weekly updates via GitHub Gists to speak about the latest updates made in the AsyncAPI Docs Ecosystem. Due to our commitment to investing time in gaining interest in our community and getting Google excited about us, we've made sure to maintain updates about our Google Season of Docs 2022 application too! In fact, you can take a look at the latest three where we made said mentions here in AsyncAPI Docs update (31 Jan - 11 Feb 2022), AsyncAPI Docs update (14 Feb - 25 Feb 2022), and AsyncAPI Docs update (28 Feb - 11 March 2022).
            </Paragraph>
            </div>

            <div className="relative mb-8 lg:mt-8">
            <Heading level="h3" typeStyle="heading-md-semibold">
            📏 Measuring our Docs project's success
            </Heading> 
            <Paragraph className="mt-4 lg:pr-4">
            We will partially measure success in the Docs project by capturing specific feedback about the IA changes via our soon-to-come new Docs Feedback card. We need this specific and granular feedback to make sure we listen and make changes according to what the community requests from Docs. In previous AsyncAPI Docs Gist updates, we've mentioned that Design contributors were teaming with Docs on /websiteissue #453 for the ideation and development of our new feedback card that will be added at the bottom of each Docs page. What the community decided over the last 2 weeks was that the Submit feedback button in the card will publish the feedback anonymously via the AsyncAPI bot and create a new GitHub Discussion with said feedback:
            <br></br>
            The other way we would consider the project successful is the number of our contributors and Docs PRs increased from 3 to 6 community members. Currently, a majority of our OSS contributor community focuses only on contributing code, but we would like to instill a greater interest in contributing to documentation that provides value for everyone.
            </Paragraph>
            </div>

            <div className="relative mb-8 lg:mt-8">
            <Heading level="h3" typeStyle="heading-md-semibold">
            ⌛ Timeline
            </Heading> 
            <Paragraph className="mt-4 lg:pr-4">
            The project itself will take approximately 4-6 months to complete, depending on the different levels of knowledge from diverse technical writers (TW) that might get involved. (At AsyncAPI, we want to work with any TW, regardless of their years of experience. We have a passion for mentorship, and we do not wish to have a bar that would prevent any TW from contributing to our OSS Initiative. In fact, we look forward to potentially mentoring TW(s) who are completely new to tech and making them feel welcome!)
            <br></br>
            For our 2 projects, we would like to request a minimum of 2 TWs, so that we can work on both the CLI/Tools and Generator Docs.
            <br></br>
            The timeline would look as following:
            </Paragraph>
            <ul>
              <li>May: Orientation on how to contribute to AsyncAPI Inititiave, how Docs issues are organized, detail how we're migrating our CLI and Tools Docs, and assign good first-time-tickets to get each new TW contributor started.</li>
              <li>June - August: Each TW goes through designated issues marked for both first time contributors and work set aside for GSoD 2022. Each TW starts creating documentation for their individual issues assigned/selected.</li>
              <li>September - October: We determine if we're going to be able to complete both CLI and Tools Docs plus the Generator Docs, depending on how many TWs are in our group and how much they've been able to complete so far. We re-align priorities as needed and asses what is missing to reach our 2022 IA change goals for AsyncAPI Docs.</li>
              <li>November: Project completion and all contributors receive some swag!</li>
            </ul>
            </div>

            <div className="relative mb-8 lg:mt-8">
            <Heading level="h3" typeStyle="heading-md-semibold">
            💸 Project budget 
            </Heading> 
            <Paragraph className="mt-4 lg:pr-4">
            We have set aside 2 mentors for now, for our 2 projects: improving our IA and re-structuring our Generator Docs. Should we be selected, AsyncAPI would like to request from Google a US $5000 budget for each project. For both projects, the request then totals for a $10,000 budget.
            </Paragraph>

            <table>
              <thead>
                <tr>
                  <th>Budget item</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Technical writer updates, reviews, edits, and publishing new documentation for the IA improvements. </td>
                  <td>$5000</td>
                </tr>
                <tr>
                  <td>Technical writer updates, reviews, migration, and publishing improved Generator tool documentation.</td>
                  <td>$5000</td>
                </tr>
              </tbody>
              </table>
            </div>

            <div className="relative mb-8 lg:mt-8">
            <Heading level="h3" typeStyle="heading-md-semibold">
            👉🏽 Get started contributing to AsyncAPI Docs Today
            </Heading> 
            <Paragraph className="mt-4 lg:pr-4">
            Last but not least, don't forget that code isn't the only way to contribute to OSS; Dev Docs are a huge help that benefit the entire OSS ecosystem. At AsyncAPI, we value Doc contributions as much as every other type of contribution.
            <br></br>
            To get started as a Docs contributor:
            <br></br>
            <ul>
              <li>Familiarize yourself with our project's Contribution Guide and our Code of Conduct.</li>
              <li>Head over to our Docs GH Board here.</li>
              <li>Pick an issue you would like to contribute to and leave a comment introducing yourself. This is also the perfect place to leave any questions you may have on how to get started.</li>
              <li>If there is no work done in that Docs issue yet, feel free to open a PR and get started!</li>
            </ul>       
            </Paragraph>
            </div>

          </div>
        </div>
      </div>
  )
}
