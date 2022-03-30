import GenericLayout from '../../components/layout/GenericLayout'
import Heading from '../../components/typography/Heading'
import Paragraph from '../../components/typography/Paragraph'

export default function GSoCPage() {

  return (
      <div className="py-12 overflow-hidden">
        <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
          <div className="relative">
            <Heading level="h1" typeStyle="heading-lg">
              Google Summer of Code at AsyncAPI 
            </Heading>
            <Paragraph>
            The intention of this page is to list all information that explains how AsyncAPI Initiative participates in Google Summer of Code (GSoC) in 2022.
            </Paragraph>
          </div>

          <div className="relative mb-8 lg:mt-8">
              <Heading level="h2" typeStyle="heading-md-semibold">
              A bit of history
              </Heading> 
              <Paragraph className="mt-4 lg:pr-4">
              AsyncAPI already participated in GSoC in 2021. We were not accepted as organization, but it was also a time when we were not yet part of the Linux Foundation. Therefore some of AsyncAPI maintainers pushed their ideas through Postman (that was accepted for GSoC) because they were Postman employees working on AsyncAPI. So far so good?
              <br></br>
              We mentored 5 mentees. All of them successfully completed GSoC. As a result, all of them became members of our Technical Steering Committee and also presented their solutions at AsyncAPI Conference 2021:
            
              <ul>
                <li>GSoC: Writing the spec document without knowing the specification - Elegbede Azeez W., Individual C.</li>
                <li>GSoC: Visualise your defined EDA using Cupid - Arjun Garg, Individual Contributor</li>
                <li>GSoC: Make your AsyncAPI document shorter with Optimizer - Khuda Dad Nomani, Individual Contributor</li>
                <li>GSoC: Generating diffs using AsyncAPI Diff - Aayush Sahu, Individual Contributor</li>
                <li>Nektarios that created https://github.com/asyncapi/simulator could not, unfortunately, join the conference</li>
              </ul>
        
              We want to repeat history on an even larger scale in 2022.  
              </Paragraph>
          </div>

          <div className="relative mb-8 lg:mt-8">
              <Heading level="h2" typeStyle="heading-md-semibold">
              What about 2022?
              </Heading> 
              <Paragraph className="mt-4 lg:pr-4">
              We already shared some of the details in our live stream dedicated to contributors. We already counted about 8 mentors (AsyncAPI maintainers) that want to join in this GSoC edition and help. The number will grow for sure.
              </Paragraph>
          </div>

          <div className="relative mb-8 lg:mt-8">
              <Heading level="h3" typeStyle="heading-md-semibold">
              How we work on proposals
              </Heading> 
              <Heading level="h4" typeStyle="heading-md-semibold">
              All on GitHub
              </Heading> 
              <Paragraph className="mt-4 lg:pr-4">
              AsyncAPI Initiative is a community-driven organization that puts radical transparency at the core of its values.
              <br></br>
              This means all the work on proposals should take place in GitHub and be fully transparent.
              <br></br>
              Another good reason for this approach is that it is easy to identify duplicates and proposals that have more than one candidate. We do not want to reject candidates just because there are too many for one proposal. Let us discover it sooner and make sure we can enable as many people as possible.
              </Paragraph>
          </div>

          <div className="relative mb-8 lg:mt-8">
              <Heading level="h4" typeStyle="heading-md-semibold">
              Processing Proposals 
              </Heading> 
              <Paragraph className="mt-4 lg:pr-4">
              Proposals can be submitted either as GitHub Discussion or GitHub Issue in AsyncAPI GitHub organization.
              <br></br>
              We label proposals with gsoc label in order to make them easy to discover in the following dashboard: GitHub GSoC Issues. In case you do not have a GitHub account and cannot access the list, try here.
              <br></br>
              Proposal suggestions can be created by anyone. There is no specific template to follow, only common sense. Describe in a detailed way what is it about, what are the requirements and desired outcome. If the proposal suggestion misses some details - do not worry, we will follow up with request for more clarification.
              <br></br>
              We will make sure there are mentors for each proposal.
              </Paragraph>
          </div>

          <div className="relative mb-8 lg:mt-8">
              <Heading level="h3" typeStyle="heading-md-semibold">
              How to connect with us
              </Heading> 
              <Paragraph className="mt-4 lg:pr-4">
                <lu>
                  <li>Join our Slack workspace. Just make sure to follow our Slack etiquette and the code of conduct.</li>
                  <li>Join the dedicated GSoC channel #temp-gsoc-2022 that we will use to coordinate the application process until coding starts. All mentees and mentors are there.</li>
                </lu>

                Happy coding ☮️!
              </Paragraph>
          </div>



        </div>    
      </div>
        
  )
}
