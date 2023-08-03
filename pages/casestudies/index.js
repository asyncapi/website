import GenericLayout from "../../components/layout/GenericLayout";
import CaseStudyCard from '../../components/CaseStudyCard';
import Paragraph from '../../components/typography/Paragraph';
import TextLink from '../../components/typography/TextLink';
import Heading from "../../components/typography/Heading";
import CaseStudiesList from "../../config/case-studies.json";
import {
} from "next-i18next-static-site";

export default function casestudies() {
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

      <div className="py-10 relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
        <div className="grid lg:grid-cols-9 lg:gap-8 lg:text-center">
          <div className="col-start-3 col-span-5">
            <Heading level="h1" typeStyle="heading-lg">
              {title}
            </Heading>
            <Paragraph typeStyle="body-md" className="my-4 max-w-4xl">
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
        <div>
          <CaseStudyCard studies={CaseStudiesList}
          />
        </div>
      </div>
    </GenericLayout>
  );
}
