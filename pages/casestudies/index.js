import GenericLayout from "../../components/layout/GenericLayout";
import CaseStudyCard from '../../components/CaseStudyCard';
import Paragraph from '../../components/typography/Paragraph';
import TextLink from '../../components/typography/TextLink';
import Heading from "../../components/typography/Heading";
import CaseStudiesList from "../../config/case-studies.json";
import AdoptersList from "../../config/adopters.json"

export default function Casestudies() {
  const description =
    "Learn about different case studies based on AsyncAPI spec and related tools.";
  const image = "/img/social/case-studies.webp";
  const title = "Case Studies";

  return (
    <GenericLayout
      title={title}
      description={description}
      image={image}
      wide
    >

      <div className="py-10 relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl" data-testid="CaseStudy-main">
        <div className="grid lg:grid-cols-9 lg:gap-8 lg:text-center">
          <div className="col-start-3 col-span-5">
            <Heading level="h1" typeStyle="heading-lg">
              {title}
            </Heading>
            <Paragraph typeStyle="body-md" className="my-4 max-w-4xl" >
              The best way to learn how to use AsyncAPI is not only through documentation that usually is focused on recommendations and best practices.
              It is also good to confront with real-life case studies that explain how people really use AsyncAPI and what are their flows.
            </Paragraph>
            <Paragraph typeStyle="body-md" className="my-4 max-w-4xl">
              Feel free to submit your case study. We have a template for you. For more details
              <TextLink href="https://github.com/asyncapi/website/blob/master/README.md#case-studies" target="_blank">
                read our FAQ
              </TextLink>.
            </Paragraph>
          </div>
        </div>
        <div data-testid="CaseStudy-card">
          <CaseStudyCard studies={CaseStudiesList}
          />
        </div>

        <div className="grid lg:grid-cols-9 lg:gap-8 lg:text-center mt-8">
          <div className="col-start-3 col-span-5">
            <Heading level="h1" typeStyle="heading-lg">
              Adopters
            </Heading>
            <Paragraph typeStyle="body-md" className="my-4 max-w-4xl" >
              Check out how different companies use AsyncAPI and what problems they solve.
            </Paragraph>
            <Paragraph typeStyle="body-md" className="my-4 max-w-4xl">
              Feel free to <a className="underline" href="https://github.com/asyncapi/website/tree/master/config/adopters/adopters.yml">submit a pull request</a> with information about how your company uses AsyncAPI. We know that
              writing an official case study might be time consuming and requires too much internal paper work.
              Let's make sure we can at least capture a use case that is already a great learning information for the
              community.
            </Paragraph>
          </div>
        </div>
      </div>

      <center>
        <table className="border-2 border-collapse">
          <thead>
            <tr>
              <th className="border p-2 font-bold">Company name</th>
              <th className="border-2 p-2 font-bold">Use Case</th>
              <th className="border-2 p-2 font-bold">Resources</th>
            </tr>
          </thead>
          <tbody>
            {AdoptersList.map((entry, index) => (
              <tr key={index}>
                <td className="border-2 p-2">{entry.companyName}</td>
                <td className="border-2 p-2">{entry.useCase}</td>
                <td className="border-2 p-2">
                  <ul>
                    {entry.resources.map((resource, resourceIndex) => (
                      <li className="p-2" key={resourceIndex}>
                        <a className="text-cyan-500 underline" href={resource.link}>
                          {resource.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </center>
    </GenericLayout>
  );
}


